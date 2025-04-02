"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/http/axios";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Comment } from "@/types";
import toast from "react-hot-toast";

interface CommentFormProps {
  postId: string;
  onCommentAdded: (comment: Comment) => void;
}

const TipTapToolbar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-input bg-background rounded-t-md p-1 flex flex-wrap gap-1">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={editor.isActive("bold") ? "bg-muted" : ""}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        Bold
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={editor.isActive("italic") ? "bg-muted" : ""}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        Italic
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={editor.isActive("bulletList") ? "bg-muted" : ""}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        List
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={editor.isActive("orderedList") ? "bg-muted" : ""}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        Numbered
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={editor.isActive("code") ? "bg-muted" : ""}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        Code
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={editor.isActive("blockquote") ? "bg-muted" : ""}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        Quote
      </Button>
    </div>
  );
};

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  onCommentAdded,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Placeholder.configure({
        placeholder: "Write your comment...",
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
        "/comments",
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
    } catch (error: any) {
      console.error("Failed to add comment", error);
      toast.success("Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white shadow-none border-none p-0">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="border border-input rounded-md overflow-hidden">
              <EditorContent
                editor={editor}
                className="min-h-[200px] p-3 outline-none"
              />
              <TipTapToolbar editor={editor} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || !editor?.getText().trim()}
              className="mt-2"
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommentForm;

// https://claude.ai/chat/d0a02589-ea4f-437c-8e68-6734fa2922bc
