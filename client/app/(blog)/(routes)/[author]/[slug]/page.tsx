import type { Metadata } from "next";
import LikesPost from "./_components/likes-post";
import PostUser from "./_components/post-user";
import ReadPost from "./_components/read-post";

export async function generateMetadata({
  params,
}: {
  params: { author: string; slug: string };
}): Promise<Metadata> {
  return {
    title: `${params.author} - ${params.slug} - Dev.to Clone`,
    description: `Post by ${params.author} with slug ${params.slug}`,
    openGraph: {
      title: `${params.author} - ${params.slug}`,
      description: `Post by ${params.author} with slug ${params.slug}`,
      // url: `https://example.com/${params.author}/${params.slug}`,
      locale: "uz_UZ",
      type: "article",
      authors: [params.author],
    },
    twitter: {
      card: "summary_large_image",
      title: `${params.author} - ${params.slug}`,
      description: `Post by ${params.author} with slug ${params.slug}`,
      // url: `https://example.com/${params.author}/${params.slug}`,
      creator: params.author,
    },
    alternates: {
      // canonical: `https://example.com/${params.author}/${params.slug}`,
    },
  };
}

const PostPage = ({ params }: { params: { author: string; slug: string } }) => {
  const { author, slug } = params;
  console.log(author, slug);

  return (
    <div className="pt-16 min-h-screen container mx-auto px-4">
      <div className="flex justify-between gap-4">
        <div className="flex gap-5 w-full">
          <div className="fixed h-screen max-w-24 w-full p-4">
            <LikesPost />
          </div>
          <div className="flex gap-5 w-full ml-24">
            <ReadPost />
          </div>
        </div>

        <PostUser />
      </div>
    </div>
  );
};

export default PostPage;
