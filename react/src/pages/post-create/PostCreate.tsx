import React, { useState, useEffect } from "react";
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
  Link as LinkIcon,
  List,
  ListOrdered,
  Heading,
  Quote,
  Code,
  FileCode,
  Image as ImageIcon,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  // Fetch current user ID on component mount

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

  const createPost = async (isDraft: boolean = false) => {
    try {
      if (!title.trim()) {
        toast("Error: Title is required");
        return;
      }

      if (!editor?.getHTML() || editor?.isEmpty) {
        toast("Error: Content is required");
        return;
      }

      if (!user?.id) {
        toast("Error: Author ID is required");
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

      toast("Post created successfully");

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
      toast("Error creating post: " + (error as Error).message);
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

      toast("Changes reverted successfully");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pt-16">
      <Card className="border-0 shadow-none">
        <CardContent className="p-0">
          {/* Cover Image Section */}
          <div className="mb-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="cover-image-link" className="text-sm font-medium">
                Cover Image URL
              </label>
              <div className="flex gap-2">
                <Input
                  id="cover-image-link"
                  type="text"
                  value={coverImageLink}
                  onChange={handleCoverImageLinkChange}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1"
                />
                {coverImageLink && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={removeCoverImage}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {coverImageLink && (
              <div className="mt-2 relative w-full h-64 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={coverImageLink}
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
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <Input
              type="text"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyDown}
              placeholder="Add up to 4 tags... (Press Space or Enter to add)"
              disabled={tags.length >= 4}
              className="border-0 p-0 h-auto focus-visible:ring-0 placeholder:text-gray-400 text-sm"
            />
          </div>

          {/* Editor Toolbar */}
          <div className="border-t border-b py-2 mb-6">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={editor?.isActive("bold") ? "bg-gray-100" : ""}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={editor?.isActive("italic") ? "bg-gray-100" : ""}
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
                className={editor?.isActive("link") ? "bg-gray-100" : ""}
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={editor?.isActive("bulletList") ? "bg-gray-100" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor?.chain().focus().toggleOrderedList().run()
                }
                className={editor?.isActive("orderedList") ? "bg-gray-100" : ""}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                  editor?.isActive("heading", { level: 2 }) ? "bg-gray-100" : ""
                }
              >
                <Heading className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                className={editor?.isActive("blockquote") ? "bg-gray-100" : ""}
              >
                <Quote className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                className={editor?.isActive("codeBlock") ? "bg-gray-100" : ""}
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
          <div className="min-h-[300px] mb-8">
            <EditorContent
              editor={editor}
              className="prose max-w-none focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-4">
            <Button
              onClick={handlePublish}
              className="bg-primary text-white hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </Button>
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save draft"}
            </Button>
            <Button
              variant="ghost"
              className="ml-auto"
              onClick={handleRevertChanges}
              disabled={isSubmitting}
            >
              <FileCode className="h-4 w-4 mr-2" />
              Revert new changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostCreate;
