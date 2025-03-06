import ItemBlog from './blogs/ItemBlog';

const fakeBlogs = [{}];
console.log(fakeBlogs);

const Blogs = () => {
  return (
    <div className="flex flex-col gap-3">
      <ItemBlog />
    </div>
  );
};

export default Blogs;
