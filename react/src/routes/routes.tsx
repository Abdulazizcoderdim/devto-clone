import Layout from "@/layout/layout";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import AuthorPage from "@/pages/author/author-page";
import Home from "@/pages/home/home";
import SlugPost from "@/pages/slug-post/slug-post";
import TagPage from "@/pages/tag/tag-page";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/:author",
        element: <AuthorPage />, // Faqat author ma'lumotlari
      },
      {
        path: "/:author/:slug",
        element: <SlugPost />, // Faqat post ma'lumotlari
      },
      {
        path: "/t/:tag",
        element: <TagPage />, // Faqat post ma'lumotlari
      },
    ],
  },
]);
