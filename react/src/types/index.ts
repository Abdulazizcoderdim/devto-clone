export interface ChildProps {
  children: React.ReactNode;
}

export interface IError extends Error {
  response: { data: { message: string } };
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  posts: Post[];
  token: Token[];
  createdAt: string; // ISO format datetime (String)
}

export interface Post {
  id: string;
  title: string;
  content: string;
  coverImageLink: string;
  slug: string;
  authorId: string;
  createdAt: string; // ISO format datetime (String)
  updatedAt: string; // ISO format datetime (String)
  author: Author;
  comments: Comment[]; // Agar commentlar bo'lsa, alohida interface yozish kerak
  tags: PostTag[];
}

export interface Comment {
  id: string;
  text: string;
  postId: string;
  post: Post;
  userId: string;
  user: User;
  createdAt: string; // ISO format datetime (String)
  updatedAt: string; // ISO format datetime (String)
}

export interface Otp {
  id: string;
  email: string;
  otp: string;
  expireAt?: Date;
  createdAt: Date;
}

export interface Token {
  id: string;
  userId: string;
  refreshToken: string;
  user: User;
}

export interface Author {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface PostTag {
  id: string;
  postId: string;
  tagId: string;
  tag: Tag;
}
