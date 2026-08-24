"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDate, getInitials, getUserName } from "@/lib/format";
import type { TicketComment } from "@/lib/types/ticket";
import { useTicketMutations } from "@/hooks/use-tickets";

export function CommentThread({
  ticketId,
  comments,
}: {
  ticketId: string;
  comments: TicketComment[];
}) {
  const [content, setContent] = useState("");
  const { addComment } = useTicketMutations(ticketId);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!content.trim()) return;

    try {
      await addComment.mutateAsync({ id: ticketId, content: content.trim() });
      setContent("");
      toast.success("Comment added");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to add comment");
    }
  };

  return (
    <div className="grid gap-4">
      <div className="grid gap-4">
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="flex gap-3">
              <Avatar size="sm">
                <AvatarFallback>{getInitials(getUserName(comment.user))}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1 rounded-lg border bg-card p-3">
                <div className="mb-1 flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-medium">{getUserName(comment.user)}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="whitespace-pre-wrap text-sm">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <form className="grid gap-2" onSubmit={handleSubmit}>
        <Textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write a comment..."
          rows={3}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={addComment.isPending || !content.trim()}>
            {addComment.isPending ? "Posting..." : "Post comment"}
          </Button>
        </div>
      </form>
    </div>
  );
}
