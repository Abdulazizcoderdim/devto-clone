export async function generateMetadata({
  params,
}: {
  params: { author: string };
}) {
  return {
    title: `${params.author} - Dev.to Clone`,
    description: `Profile of ${params.author}`,
    openGraph: {
      title: `${params.author}`,
      description: `Profile of ${params.author}`,
      // url: `https://example.com/${params.author}`,
      locale: "uz_UZ",
      type: "article",
      authors: [params.author],
    },
    twitter: {
      card: "summary_large_image",
      title: `${params.author}`,
      description: `Profile of ${params.author}`,
      // url: `https://example.com/${params.author}`,
      creator: params.author,
    },
    alternates: {
      // canonical: `https://example.com/${params.author}`,
    },
  };
}

const ProfilePage = ({ params }: { params: { author: string } }) => {
  return <div className="pt-14">ProfilePage</div>;
};

export default ProfilePage;
