import { useEffect, useState } from "react";
import type { CommentType } from "../types/comment";
import { getCommentsByTicketId } from "../api/ticket.api";

const Comments = ({ id }: { id: string | undefined }) => {
    const [comments, setComments] = useState<(CommentType | null)[]>();

    useEffect(() => {
        const fetchTicket = async () => {
            const data = await getCommentsByTicketId(id);
            setComments(data.data);
        };

        fetchTicket();
    }, [id]);

    return (
        <div className="border-t border-neutral-200 pt-4 space-y-4">
            <h1 className="font-semibold">Comments</h1>
            {comments?.length === 0 &&
                <p className="text-neutral-400">No Comments</p>
            }
            {comments?.map((comment) => (
                <div key={comment?.id}>
                    <div className="flex items-center gap-4 text-sm text-neutral-400">
                        <h5>{comment?.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "-"}</h5>
                        <h5>{comment?.commenter}</h5>
                    </div>

                    <p className="text-sm sm:text-base">{comment?.comment}</p>
                </div>
            ))}

            
        </div>
    )
}

export default Comments;