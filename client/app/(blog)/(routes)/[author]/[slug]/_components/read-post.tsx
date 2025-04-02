"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import api from "@/http/axios";
import { Post } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ReadPost = () => {
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const { slug } = params as { slug: string };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/posts/${slug}`);
      setPost(res.data);
    } catch (error) {
      console.error("Failed to fetch post", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full flex justify-center items-center min-h-[60vh]">
        <p>Post not found</p>
      </div>
    );
  }
  return (
    <Card className="w-full rounded-md bg-white shadow-md overflow-hidden">
      <CardHeader className="space-y-6 pb-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.author.name}`}
            />
            <AvatarFallback>
              {post.author.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-lg font-semibold">{post.author.name}</h4>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
          <div className="flex gap-2 mt-4">
            {post.tags.map(({ tag }) => (
              <Badge key={tag.id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">{post.content}</p>
        </div>

        <div className="space-y-6" id="comments">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <h3 className="text-xl font-semibold">
              Comments ({post.comments.length})
            </h3>
          </div>
          <Separator />
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.user.name}`}
                    />
                    <AvatarFallback>
                      {comment?.user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{comment.user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-sm">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadPost;
