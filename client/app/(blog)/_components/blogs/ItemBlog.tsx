import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark, Heart, MessageCircle } from "lucide-react";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
}

interface BlogPostProps {
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  title: string;
  tags: string[];
  reactions: number;
  comments: Comment[];
  readingTime: string;
}

export function ItemBlog({
  author,
  date,
  title,
  tags,
  reactions,
  comments,
  readingTime,
}: BlogPostProps) {
  return (
    <Card className="border rounded-lg overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{author.name}</p>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-3">{title}</h2>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-sm">
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span className="text-sm">{reactions} Reactions</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">{comments.length} Comments</span>
            </div>
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
                  <AvatarImage
                    src={comment.author.avatar}
                    alt={comment.author.name}
                  />
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
