import { useParams } from "react-router-dom";
import LikesPost from "./likes-post";
import ReadPost from "./read-post";
import PostAuthor from "./post-author";

const SlugPost = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="pt-16 min-h-screen container mx-auto px-4">
      <div className="flex justify-between gap-4">
        <div className="flex gap-5 w-full">
          <div className="fixed md:h-screen max-md:z-50 max-md:bg-white max-md:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] max-md:bottom-0 max-md:left-0 max-md:right-0 md:max-w-24 w-full p-4">
            <LikesPost />
          </div>
          <div className="flex gap-5 w-full md:ml-24 max-md:mb-24">
            <ReadPost slug={slug} />
          </div>
        </div>

        <PostAuthor />
      </div>
    </div>
  );
};

export default SlugPost;
