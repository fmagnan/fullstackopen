const Blog = ({ blog }) => (
  <div>
    <a href={blog.url}>{blog.title}</a> -- <strong>{blog.author}</strong>
  </div>
);

export default Blog;
