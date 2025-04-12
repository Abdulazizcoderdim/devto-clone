import { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/http/axios";
import toast from "react-hot-toast";
import { Comment } from "@/types";
import QuillEditor from "@/components/shared/quil-editor";

interface CommentFormProps {
  postId: string;
  onCommentAdded: (comment: Comment) => void;
}

const CommentForm = ({ postId, onCommentAdded }: CommentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content || content.trim().length === 0) {
      toast.error("Please enter a comment");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post(
        `/comments`,
        {
          text: content,
          postId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setContent("");
      toast.success("Comment added successfully");

      if (onCommentAdded) {
        onCommentAdded(response.data);
      }
    } catch (error) {
      console.error("Failed to add comment", error);
      toast.error("Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
      <form onSubmit={handleSubmit} className="flex flex-col break-words">
        <div className="flex-grow">
          {isPreview ? (
            <div
              className="p-4 min-h-40 prose max-w-none border-b"
              dangerouslySetInnerHTML={{ __html: content || "" }}
            />
          ) : (
            <QuillEditor
              value={content}
              onChange={setContent}
              placeholder="Write your comment..."
            />
          )}
        </div>

        {/* {!isPreview && <TipTapToolbar editor={editor} />} */}
        <div className="p-2 bg-gray-50 flex space-x-2 border-t border-gray-200">
          <Button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsPreview(!isPreview)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded"
          >
            {isPreview ? "Edit" : "Preview"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
