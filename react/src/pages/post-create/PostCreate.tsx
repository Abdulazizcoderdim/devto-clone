"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Heading,
  Quote,
  Code,
  FileCode,
  ImageIcon,
  MoreVertical,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { useAuthStore } from "@/hooks/auth-store";
import api from "@/http/axios";

const PostCreate: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [coverImageLink, setCoverImageLink] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { user } = useAuthStore();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image,
      Placeholder.configure({
        placeholder: "Write your post content here...",
      }),
    ],
    content: "",
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Add tag on Enter or Space key
    if (
      (e.key === "Enter" || e.key === " ") &&
      tagInput.trim() &&
      tags.length < 4
    ) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleCoverImageLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCoverImageLink(e.target.value);
  };

  const removeCoverImage = () => {
    setCoverImageLink("");
  };

  const createPost = async (isDraft = false) => {
    try {
      if (!title.trim()) {
        toast.error("Title is required");
        return;
      }

      if (!editor?.getHTML() || editor?.isEmpty) {
        toast.error("Content is required");
        return;
      }

      if (!user?.id) {
        toast.error("Author ID is required");
        return;
      }

      setIsSubmitting(true);

      // Prepare the post data based on backend requirements
      const postData = {
        title: title.trim(),
        content: editor.getHTML(),
        authorId: user.id,
        tags,
        coverImageLink: coverImageLink.trim() || null,
        // isDraft: isDraft,
      };

      // Send API request
      const res = await api.post("/posts", postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.data) {
        throw new Error("Failed to create post");
      }

      const result = res.data;

      toast.success("Post created successfully");

      // Clear the form
      setTitle("");
      setTags([]);
      setTagInput("");
      setCoverImageLink("");
      editor?.commands.clearContent();

      // Redirect to the post or dashboard
      if (result.data?.slug) {
        window.location.href = `/${user.name}/${result.data.slug}`;
      } else {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Error creating post: " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublish = () => createPost(false);
  const handleSaveDraft = () => createPost(true);

  const handleRevertChanges = () => {
    if (
      confirm(
        "Are you sure you want to revert all changes? This cannot be undone."
      )
    ) {
      setTitle("");
      setTags([]);
      setTagInput("");
      setCoverImageLink("");
      editor?.commands.clearContent();

      toast.success("Changes reverted successfully");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pt-8 px-4 md:px-0">
      <Card className="border shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6">
          {/* Cover Image Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Cover Image</h2>
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2">
                <Input
                  id="cover-image-link"
                  type="text"
                  value={coverImageLink}
                  onChange={handleCoverImageLinkChange}
                  placeholder="Paste an image URL here..."
                  className="flex-1"
                />
                {coverImageLink && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={removeCoverImage}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {coverImageLink && (
              <div className="mt-4 relative w-full h-[300px] bg-gray-50 rounded-md overflow-hidden border">
                <img
                  src={coverImageLink || "/placeholder.svg"}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://placehold.co/600x400?text=Invalid+Image+URL";
                  }}
                />
              </div>
            )}
          </div>

          <Separator className="my-6" />

          {/* Title Input */}
          <div className="mb-6">
            <Input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="New post title here..."
              className="border-0 p-0 text-4xl font-bold h-auto focus-visible:ring-0 placeholder:text-gray-400"
            />
          </div>

          {/* Tags Input */}
          <div className="mb-8">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-3 py-1 text-sm font-normal"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            <Input
              type="text"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyDown}
              placeholder="Add up to 4 tags... (Press Space or Enter to add)"
              disabled={tags.length >= 4}
              className="border-dashed text-sm"
            />
            {tags.length >= 4 && (
              <p className="text-xs text-muted-foreground mt-1">
                Maximum of 4 tags reached
              </p>
            )}
          </div>

          <Separator className="my-6" />

          {/* Editor Toolbar */}
          <div className="bg-gray-50 border rounded-md mb-4">
            <div className="flex items-center gap-1 p-1 flex-wrap">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`rounded-md ${
                  editor?.isActive("bold") ? "bg-gray-200" : ""
                }`}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`rounded-md ${
                  editor?.isActive("italic") ? "bg-gray-200" : ""
                }`}
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const url = window.prompt("URL");
                  if (url) {
                    editor?.chain().focus().setLink({ href: url }).run();
                  }
                }}
                className={`rounded-md ${
                  editor?.isActive("link") ? "bg-gray-200" : ""
                }`}
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={`rounded-md ${
                  editor?.isActive("bulletList") ? "bg-gray-200" : ""
                }`}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor?.chain().focus().toggleOrderedList().run()
                }
                className={`rounded-md ${
                  editor?.isActive("orderedList") ? "bg-gray-200" : ""
                }`}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={`rounded-md ${
                  editor?.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""
                }`}
              >
                <Heading className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                className={`rounded-md ${
                  editor?.isActive("blockquote") ? "bg-gray-200" : ""
                }`}
              >
                <Quote className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                className={`rounded-md ${
                  editor?.isActive("codeBlock") ? "bg-gray-200" : ""
                }`}
              >
                <Code className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const url = window.prompt("Image URL");
                  if (url) {
                    editor?.chain().focus().setImage({ src: url }).run();
                  }
                }}
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <div className="ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => editor?.chain().focus().undo().run()}
                    >
                      Undo
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => editor?.chain().focus().redo().run()}
                    >
                      Redo
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        editor
                          ?.chain()
                          .focus()
                          .clearNodes()
                          .unsetAllMarks()
                          .run()
                      }
                    >
                      Clear formatting
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Editor Content */}
          <div className="min-h-[300px] mb-8 border rounded-md p-4">
            <EditorContent
              editor={editor}
              className="prose max-w-none focus:outline-none min-h-[300px]"
            />
          </div>

          <Separator className="my-6" />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <Button
              onClick={handlePublish}
              className="bg-emerald-600 text-white hover:bg-emerald-700"
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? "Publishing..." : "Publish Post"}
            </Button>
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? "Saving..." : "Save as Draft"}
            </Button>
            <Button
              variant="ghost"
              className="ml-auto text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleRevertChanges}
              disabled={isSubmitting}
            >
              <FileCode className="h-4 w-4 mr-2" />
              Discard Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostCreate;
