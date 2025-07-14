import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';
import { blogPosts } from '../../dommyData/blogData';

const Blog = () => {
  const [posts, setPosts] = useState([]);       // backend posts
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:1990/mnb/api/getAllPosts');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load posts. Showing dummy posts only.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // merge backend posts + dummy posts (new first)
  const combinedPosts = [...posts, ...blogPosts];

  return (
    <div>
      <div className='blog'>
        <div className='blog-1'>
          <h1>Blog</h1>
        </div>
        <div className='blog-2'>
          <Link to="/" className="blog-3">Home</Link>
          <h6>Blog</h6>
        </div>
      </div>

      {loading && <p className="text-center">Loading posts...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="row">
        {combinedPosts.map((post) => {
          // image logic
          const imageSrc =
            post._id && post.image               // backend post: has _id and filename
              ? `http://localhost:1990/uploads/${post.image}`
              : post.image || post.imageUrl;     // dummy post: imported image

          return (
            <div key={post._id || post.id}>
              <div className="leftcolumn">
                <div className="card">
                  <h2>{post.title}</h2>
                  <img
                    src={imageSrc}
                    alt={post.title}
                    className="fakeimg1"
                  />
                  <h5>{post.slug}</h5>
                  <h1>{post.author}</h1>
                  <h4>{post.date || (post.createdAt && new Date(post.createdAt).toLocaleDateString())}</h4>
                  <h5>{Array.isArray(post.categories) ? post.categories.join(", ") : post.categories}</h5>
                  <p>{truncateText(post.content, 75)}</p>
                  <Link
                    to={`/post/${post._id || post.id}`}
                    className="bg-[#4527a0] text-[#ffffff] w-32 focus:outline-none font-large rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              <div className="rightcolumn">
                <div className="card">
                  <h2>{post.title}</h2>
                  <img
                    src={imageSrc}
                    alt={post.title}
                    className="fakeimg"
                  />
                  <h5>{post.slug}</h5>
                  <h1>{post.author}</h1>
                  <h4>{post.date || (post.createdAt && new Date(post.createdAt).toLocaleDateString())}</h4>
                  <h5>{Array.isArray(post.categories) ? post.categories.join(", ") : post.categories}</h5>
                  <p>{truncateText(post.content, 75)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="header">
        <h2>My Nation Blog</h2>
        <h6>News, style & Entertainment</h6>
      </div>
    </div>
  );
};

export default Blog;
