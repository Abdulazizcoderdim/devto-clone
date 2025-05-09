import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  RefObject,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/hooks/auth-store";
import api from "@/http/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "@/hooks/use-onclick-outside";
import QuillEditor from "@/components/shared/quil-editor";
import { FileCode, Loader2, TagIcon, X } from "lucide-react";

const PostCreate: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [coverImageLink, setCoverImageLink] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [tagSuggestions, setTagSuggestions] = useState<
    { id: string; name: string }[]
  >([]);
  const [isLoadingTags, setIsLoadingTags] = useState<boolean>(false);
  const tagTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");

  // const editor = useEditor({
  //   extensions: [
  //     StarterKit,
  //     Link,
  //     Image,
  //     Placeholder.configure({
  //       placeholder: "Write your post content here...",
  //     }),
  //   ],
  //   content: "",
  // });

  const handleClickOutside = () => {
    if (isTagDropdownOpen) {
      setIsTagDropdownOpen(false);
    }
  };

  const tagDropdownRef = useOnClickOutside(handleClickOutside);

  useEffect(() => {
    if (tagTimeoutRef.current) {
      clearTimeout(tagTimeoutRef.current);
    }

    // Fetch suggestions even when input is empty (to show top tags)
    tagTimeoutRef.current = setTimeout(() => {
      fetchTagSuggestions(tagInput);
    }, 300);

    return () => {
      if (tagTimeoutRef.current) {
        clearTimeout(tagTimeoutRef.current);
      }
    };
  }, [tagInput]);

  const fetchTagSuggestions = async (query: string) => {
    try {
      setIsLoadingTags(true);
      const response = await api.get(`/posts/tags/filter`, {
        params: { query },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setTagSuggestions(response.data.tags || []);
    } catch (error) {
      console.error("Error fetching tag suggestions:", error);
    } finally {
      setIsLoadingTags(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInput(value);

    if (!isTagDropdownOpen) {
      setIsTagDropdownOpen(true);
    }
  };

  const handleTagSelect = (tagName: string) => {
    if (tags.length < 4 && !tags.includes(tagName)) {
      setTags([...tags, tagName]);
    }
    setTagInput("");
    setIsTagDropdownOpen(false);

    // Return focus to input after selection
    setTimeout(() => {
      tagInputRef.current?.focus();
    }, 0);
  };

  const handleTagInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Add tag on Enter key
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
      setIsTagDropdownOpen(false);
    }

    // Close dropdown on Escape
    if (e.key === "Escape") {
      setIsTagDropdownOpen(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleInputFocus = () => {
    setIsTagDropdownOpen(true);

    if (!tagInput.trim()) {
      fetchTagSuggestions("");
    }
  };

  const handleCoverImageLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCoverImageLink(e.target.value);
  };

  const removeCoverImage = () => {
    setCoverImageLink("");
  };

  const createPost = async () => {
    try {
      if (!title.trim()) {
        toast.error("Title is required");
        return;
      }

      if (!content || content.trim().length === 0) {
        toast.error("Content is required");
        return;
      }

      setIsSubmitting(true);

      // Prepare the post data based on backend requirements
      const postData = {
        title: title.trim(),
        content,
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
      setContent("");

      // Redirect to the post or dashboard
      if (result.data?.slug) {
        navigate(`/${user?.name}/${result.data.slug}`);
      } else {
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create post");
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublish = () => createPost();
  // const handleSaveDraft = () => createPost();

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
      setContent("");

      toast.success("Changes reverted successfully");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pt-16 mb-3 px-4 md:px-0">
      <Card className="border shadow-sm bg-white overflow-auto h-[calc(100vh-140px)]">
        <CardContent className="px-6">
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
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="New post title here..."
              className="w-full p-0 text-4xl font-bold h-16 focus-visible:ring-0 outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Tags Input with custom dropdown */}
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
            <div
              className="relative"
              ref={tagDropdownRef as RefObject<HTMLDivElement>}
            >
              <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ring-offset-background">
                <TagIcon className="h-4 w-4 ml-3 text-gray-400" />
                <Input
                  ref={tagInputRef}
                  type="text"
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagInputKeyDown}
                  onFocus={handleInputFocus}
                  placeholder="Add up to 4 tags..."
                  disabled={tags.length >= 4}
                  className="border-0 text-sm focus-visible:ring-0"
                />
              </div>

              {/* Custom tag dropdown */}
              {isTagDropdownOpen && (
                <div className="absolute top-full left-0 w-[300px] mt-1 border rounded-md bg-white shadow-md z-10">
                  <div className="p-2 border-b bg-gray-50">
                    <h3 className="text-sm font-medium">Top Tags</h3>
                  </div>
                  <div className="max-h-[200px] overflow-y-auto">
                    {isLoadingTags ? (
                      <div className="flex items-center justify-center p-4">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <span className="text-sm text-gray-500">
                          Loading tags...
                        </span>
                      </div>
                    ) : tagSuggestions.length === 0 ? (
                      <div className="p-4 text-center text-sm text-gray-500">
                        No matching tags found
                      </div>
                    ) : (
                      <ul className="py-1">
                        {tagSuggestions.map((tag) => (
                          <li
                            key={tag.id}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            onClick={() => handleTagSelect(tag.name)}
                          >
                            <TagIcon className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm">{tag.name}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
            {tags.length >= 4 && (
              <p className="text-xs text-muted-foreground mt-1">
                Maximum of 4 tags reached
              </p>
            )}
          </div>

          <Separator className="my-6" />

          {/* Editor Content */}
          <h2 className="text-sm font-medium text-gray-500 mb-2">Content</h2>

          <QuillEditor
            value={content}
            onChange={setContent}
            placeholder="Write your post here..."
          />
        </CardContent>
      </Card>
      <div className="flex flex-wrap gap-4 mt-6">
        <Button
          onClick={handlePublish}
          className="bg-emerald-600 text-white hover:bg-emerald-700"
          disabled={isSubmitting}
          size="lg"
        >
          {isSubmitting ? "Publishing..." : "Publish Post"}
        </Button>
        {/* <Button
          variant="outline"
          onClick={handleSaveDraft}
          disabled={isSubmitting}
          size="lg"
        >
          {isSubmitting ? "Saving..." : "Save as Draft"}
        </Button> */}
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
    </div>
  );
};

export default PostCreate;
