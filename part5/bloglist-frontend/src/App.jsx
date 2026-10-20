import axios from "axios";
import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [flashMessage, setFlashMessage] = useState("");
  const [flashStatus, setFlashStatus] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: blogTitle,
      url: blogUrl,
      author: blogAuthor,
    };

    const returnedBlog = await blogService.create(blogObject);
    if (axios.isAxiosError(returnedBlog)) {
      setFlashMessage(returnedBlog.response.data.error);
      setFlashStatus("error");
    } else {
      setBlogs(blogs.concat(returnedBlog));
      setBlogTitle("");
      setBlogUrl("");
      setBlogAuthor("");
      setFlashMessage(`a new blog ${blogTitle} added`);
      setFlashStatus("success");
    }

    setTimeout(() => {
      setFlashMessage(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setFlashMessage("wrong username or password");
      setFlashStatus("error");
      setTimeout(() => {
        setFlashMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedInUser");
    blogService.removeToken();
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <label>
          title
          <input
            type="text"
            name="title"
            value={blogTitle}
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url
          <input
            type="text"
            name="url"
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author
          <input
            type="text"
            name="author"
            value={blogAuthor}
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </label>
      </div>
      <button type="submit">save</button>
    </form>
  );

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={flashMessage} status={flashStatus} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
        </div>
      )}

      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </div>
  );
};

export default App;
