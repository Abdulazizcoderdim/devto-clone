export interface ChildProps {
  children: React.ReactNode;
}

export interface IError extends Error {
  response: { data: { message: string } };
}

export interface User {
  id: string;
  name?: string;
  email: string;
  password: string;
  isVerified: boolean;
  posts: Post[];
  token: Token[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  user: User;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  postId: string;
  post: Post;
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
