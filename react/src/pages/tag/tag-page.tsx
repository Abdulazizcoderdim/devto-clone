import LoadingPost from "@/components/shared/loading-post";
import { fetcher } from "@/lib/fetcher";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

const TagPage = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });
  const { tag } = useParams<{ tag: string }>();

  const { data, isLoading, error } = useSWR(
    `/posts/tags/${tag}?page=${pagination.page}&size=${pagination.size}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setPagination(data.page);
    }
  }, [data]);

  if (error) {
    return <div className="pt-16">Error: {error.message}</div>;
  }

  if (isLoading) {
    return <LoadingPost className="pt-16 w-full h-72" />;
  }

  return <div className="pt-16">TagPage, {tag}</div>;
};

export default TagPage;
