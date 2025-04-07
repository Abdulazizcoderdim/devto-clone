import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const formatTag = (tag: string) => {
    return tag
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const formatDate = (date: string) => {
    // Mar 30
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "2-digit",
    };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    return formattedDate;
  };

  return (
    <Card key={id} className="border rounded-lg overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Avatar
            className="h-10 w-10 cursor-pointer"
            onClick={() => navigate(`/${author.name}`)}
          >
            <AvatarImage
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${author?.name}`}
              alt={author.name}
            />
            <AvatarFallback>
              {author?.name?.charAt(0).toLocaleUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p
              onClick={() => navigate(`/${author.name}`)}
              className="font-medium hover:underline cursor-pointer"
            >
              {author.name}
            </p>
            <p className="text-sm text-muted-foreground">{formatDate(date)}</p>
          </div>
        </div>

        <Link
          to={`/${author.name}/${slug}`}
          className="text-2xl break-words font-bold mb-3 hover:text-blue-800 transition-colors duration-200"
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
              <Link to={`/blog/tag/${formatTag(tag)}`} className="text-sm">
                #{tag}
              </Link>
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate(`/${author.name}/${slug}`)}
              variant="ghost"
              className="flex items-center gap-2"
            >
              <Heart className="h-5 w-5 text-red-500" />
              <span className="text-sm">{reactions} Reactions</span>
            </Button>
            <Button
              onClick={() => navigate(`/${author.name}/${slug}#comments`)}
              variant="ghost"
              className="flex items-center gap-2"
            >
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
                <Avatar
                  onClick={() => navigate(`/${comment.author.name}`)}
                  className="h-8 w-8 cursor-pointer"
                >
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment?.author.name}`}
                    alt={comment.author.name}
                  />
                  <AvatarFallback>
                    {comment.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      onClick={() => navigate(`/${comment.author.name}`)}
                      className="font-medium hover:underline cursor-pointer"
                    >
                      {comment.author.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(comment.date)}
                    </span>
                  </div>
                  <div
                    className="text-sm mt-1 break-words"
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                  />
                </div>
              </div>
            ))}

            {comments.length > 2 && (
              <Button
                onClick={() => navigate(`/${author.name}/${slug}#comments`)}
                variant="ghost"
                className="text-sm w-fit justify-start hover:bg-gray-100 transition-colors duration-200"
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
