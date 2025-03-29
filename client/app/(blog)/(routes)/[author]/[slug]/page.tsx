import type { Metadata } from "next";

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

  return <div className="pt-14">PostPage</div>;
};

export default PostPage;
