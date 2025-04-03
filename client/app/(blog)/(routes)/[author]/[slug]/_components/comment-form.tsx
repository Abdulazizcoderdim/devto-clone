import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/http/axios";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import toast from "react-hot-toast";
import { Comment } from "@/types";

interface CommentFormProps {
  postId: string;
  onCommentAdded: (comment: Comment) => void;
}

// TipTap toolbar that matches the image
const TipTapToolbar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 p-2 flex items-center gap-1">
      <button
        type="button"
        className={`p-2 rounded ${
          editor.isActive("bold") ? "bg-gray-100" : ""
        }`}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <span className="font-bold">B</span>
      </button>
      <button
        type="button"
        className={`p-2 rounded ${
          editor.isActive("italic") ? "bg-gray-100" : ""
        }`}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <span className="italic">I</span>
      </button>
      <button
        type="button"
        className="p-2 rounded"
        onClick={() => editor.chain().focus().toggleLink().run()}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      </button>
      <button
        type="button"
        className={`p-2 rounded ${
          editor.isActive("bulletList") ? "bg-gray-100" : ""
        }`}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <button
        type="button"
        className={`p-2 rounded ${
          editor.isActive("orderedList") ? "bg-gray-100" : ""
        }`}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 8h10M7 12h10M7 16h10M3 8h.01M3 12h.01M3 16h.01"
          />
        </svg>
      </button>
      <button
        type="button"
        className="p-2 rounded"
        onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
      >
        <span className="font-bold">H</span>
      </button>
      <button
        type="button"
        className={`p-2 rounded ${
          editor.isActive("blockquote") ? "bg-gray-100" : ""
        }`}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
          />
        </svg>
      </button>
      <button
        type="button"
        className={`p-2 rounded ${
          editor.isActive("code") ? "bg-gray-100" : ""
        }`}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      </button>
      <button className="p-2 rounded">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </button>
      <button className="p-2 rounded">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>
      <button className="p-2 rounded ml-auto">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </button>
    </div>
  );
};

const CommentForm = ({ postId, onCommentAdded }: CommentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Placeholder.configure({
        placeholder: "Add to the discussion",
      }),
    ],
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editor || !editor.getText().trim()) {
      toast.error("Please enter a comment");
      return;
    }

    const content = editor.getHTML();

    setIsSubmitting(true);
    try {
      const response = await api.post(`/posts/${postId}/comments`, {
        text: content,
      });

      editor.commands.setContent("");
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
      <form onSubmit={handleSubmit}>
        <EditorContent
          editor={editor}
          className="p-4 min-h-32 focus:outline-none"
        />
        <TipTapToolbar editor={editor} />
        <div className="p-2 bg-gray-50 flex space-x-2 border-t border-gray-200">
          <Button
            type="submit"
            disabled={isSubmitting || !editor?.getText().trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </Button>
          <Button
            type="button"
            variant="outline"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded"
          >
            Preview
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
