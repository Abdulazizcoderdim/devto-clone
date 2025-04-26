import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import LoadingPost from "./loading-post";
import { useEffect, useState } from "react";

const FollowingPosts = ({ activeTab }: { activeTab: string }) => {
  const [pagination, setPagination] = useState({
    number: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });

  console.log("FollowingPosts rendered");

  const { data, error, isLoading } = useSWR(
    `/posts/following?page=${pagination.number}&size=${pagination.size}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setPagination(data.page);
    }
  }, [data]);

  if (error) return <div>Error</div>;
  if (isLoading) return <LoadingPost />;

  console.log(data);
  console.log("er>>>>>>>>>>>>>>>", error);

  return (
    <div>
      {/* {data.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))} */}
    </div>
  );
};

export default FollowingPosts;
