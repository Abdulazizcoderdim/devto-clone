import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

interface Comment {
  id: string;
  author: {
    name: string;
  };
  content: string;
  date: string;
}

interface BlogPostProps {
  id: string;
  slug: string;
  author: {
    name?: string;
  };
  date: string;
  title: string;
  tags: string[];
  reactions: number;
  comments: Comment[];
  readingTime: string;
}

export function ItemBlog({
  id,
  slug,
  author,
  date,
  title,
  tags,
  reactions,
  comments,
  readingTime,
}: BlogPostProps) {
  // tags lowercase qilish va maxsus belgilarni olib tashlash
  const formatTag = (tag: string) => {
    return tag
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  return (
    <Card key={id} className="border rounded-lg overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={""} alt={author.name} />
            <AvatarFallback>
              {author?.name?.charAt(0).toLocaleUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{author.name}</p>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
        </div>

        <Link
          href={`/blog/${slug}`}
          className="text-2xl font-bold mb-3 hover:text-blue-800 transition-colors duration-200"
        >
          {title}
        </Link>

        <div className="flex flex-wrap gap-2 mb-4 mt-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <Link href={`/blog/tag/${formatTag(tag)}`} className="text-sm">
                #{tag}
              </Link>
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span className="text-sm">{reactions} Reactions</span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">{comments.length} Comments</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {readingTime} read
            </span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bookmark className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>

      {comments.length > 0 && (
        <CardFooter className="flex flex-col gap-4 p-0">
          <div className="w-full h-px bg-border" />
          <div className="px-6 pb-4 space-y-4 w-full">
            {comments.slice(0, 2).map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={""} alt={comment.author.name} />
                  <AvatarFallback>
                    {comment.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{comment.author.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {comment.date}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{comment.content}</p>
                </div>
              </div>
            ))}

            {comments.length > 2 && (
              <Button
                variant="ghost"
                className="text-sm w-full justify-start px-0 hover:bg-transparent"
              >
                See all {comments.length} comments
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
