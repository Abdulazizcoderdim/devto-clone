import { useParams } from "react-router-dom";

const AuthorPage = () => {
  const { author } = useParams();

  return <div className="p-16">AuthorPage {author}</div>;
};

export default AuthorPage;
