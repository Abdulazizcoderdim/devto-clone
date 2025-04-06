import { useParams } from "react-router-dom";

const TagPage = () => {
  const { tag } = useParams<{ tag: string }>();

  return <div className="pt-16">TagPage, {tag}</div>;
};

export default TagPage;
