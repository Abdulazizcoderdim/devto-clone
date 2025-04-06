import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import api from "@/http/axios";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import toast from "react-hot-toast";
import { Comment } from "@/types";

interface CommentFormProps {
  postId: string;
  onCommentAdded: (comment: Comment) => void;
}

interface ToolbarProps {
  editor: Editor | null;
}

// TipTap toolbar with proper hover effects and fixed buttons
const TipTapToolbar = ({ editor }: ToolbarProps) => {
  if (!editor) {
    return null;
  }

  const addImage = useCallback(() => {
    const url = window.prompt("Image URL (https://)");
    if (!url) {
      return;
    }
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
  }, [editor]);

  const buttonBaseClass =
    "p-2 rounded transition-colors duration-200 hover:bg-gray-200";
  const buttonActiveClass = "bg-gray-200";

  return (
    <div className="border-t border-gray-200 p-2 flex items-center gap-1 flex-wrap">
      <button
        type="button"
        className={`${buttonBaseClass} ${
          editor.isActive("bold") ? buttonActiveClass : ""
        }`}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold"
      >
        <span className="font-bold">B</span>
      </button>
      <button
        type="button"
        className={`${buttonBaseClass} ${
          editor.isActive("italic") ? buttonActiveClass : ""
        }`}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic"
      >
        <span className="italic">I</span>
      </button>
      <button
        type="button"
        className={`${buttonBaseClass} ${
          editor.isActive("link") ? buttonActiveClass : ""
        }`}
        onClick={setLink}
        title="Link"
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
        className={`${buttonBaseClass} ${
          editor.isActive("bulletList") ? buttonActiveClass : ""
        }`}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="Bullet List"
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
        className={`${buttonBaseClass} ${
          editor.isActive("orderedList") ? buttonActiveClass : ""
        }`}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="Ordered List"
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
        className={`${buttonBaseClass} ${
          editor.isActive("heading", { level: 2 }) ? buttonActiveClass : ""
        }`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        title="Heading"
      >
        <span className="font-bold">H</span>
      </button>
      <button
        type="button"
        className={`${buttonBaseClass} ${
          editor.isActive("blockquote") ? buttonActiveClass : ""
        }`}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        title="Quote"
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
        className={`${buttonBaseClass} ${
          editor.isActive("code") ? buttonActiveClass : ""
        }`}
        onClick={() => editor.chain().focus().toggleCode().run()}
        title="Code"
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
      <button
        type="button"
        className={`${buttonBaseClass}`}
        onClick={() => editor.chain().focus().setHardBreak().run()}
        title="Line Break"
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </button>
      <button
        type="button"
        className={`${buttonBaseClass}`}
        onClick={addImage}
        title="Add Image"
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
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>
      <button
        type="button"
        className={`${buttonBaseClass} ml-auto`}
        onClick={() => {
          // Additional options menu - you can implement dropdown if needed
          toast("More options");
        }}
        title="More options"
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
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </button>
    </div>
  );
};

const CommentForm = ({ postId, onCommentAdded }: CommentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: "Add to the discussion",
      }),
      Image.configure({
        inline: true,
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
      <form onSubmit={handleSubmit} className="flex flex-col break-words">
        <div className="flex-grow">
          {isPreview ? (
            <div
              className="p-4 min-h-40 prose max-w-none border-b"
              dangerouslySetInnerHTML={{ __html: editor?.getHTML() || "" }}
            />
          ) : (
            <EditorContent
              editor={editor}
              className="p-4 min-h-40 focus:outline-none break-words prose-sm"
            />
          )}
        </div>
        {!isPreview && <TipTapToolbar editor={editor} />}
        <div className="p-2 bg-gray-50 flex space-x-2 border-t border-gray-200">
          <Button
            type="submit"
            disabled={isSubmitting || !editor?.getText().trim()}
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
