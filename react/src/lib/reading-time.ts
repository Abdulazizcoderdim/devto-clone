import { Post } from "@/types";

export const readingTime = (post: Post) => {
  const wordCount = Number(post?.content?.split(/\s+/).length);
  return `${Math.ceil(wordCount / 200)} min`;
};
