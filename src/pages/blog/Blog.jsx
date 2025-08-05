import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/axios';
import './Blog.css';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/mnb/api/getAllPosts`);
        setPosts(res.data || []);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Clean image URL handler (Cloudinary or fallback)
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl; // Cloudinary
    const cleaned = imageUrl.replace(/\\/g, '/').replace(/^\/+/, '');
    return `${baseURL.replace(/\/$/, '')}/${cleaned}`;
  };

  return (
    <div>
      <div className="blog">
        <div className="blog-1">
          <h1>Blog</h1>
        </div>
        <div className="blog-2">
          <Link to="/" className="blog-3">Home</Link>
          <h6>Blog</h6>
        </div>
      </div>

      {loading && <p className="text-center">Loading posts...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="row">
        {posts.map((post) => {
          const imageSrc = getImageUrl(post.imageUrl); // ✅ Use imageUrl from Cloudinary
          const postDate = post.date || (post.createdAt && new Date(post.createdAt).toLocaleDateString());
          const categories = Array.isArray(post.categories)
            ? post.categories.join(', ')
            : post.categories;

          return (
            <div key={post._id}>
              {/* Left Column */}
              <div className="leftcolumn">
                <div className="card">
                  <h2>{post.title}</h2>
                  <img src={imageSrc} alt={post.title} className="fakeimg1" />
                  <h5>{post.slug}</h5>
                  <h1>{post.author}</h1>
                  <h4>{postDate}</h4>
                  <h5>{categories}</h5>
                  <p>{truncateText(post.content, 75)}</p>
                  <Link
                    to={`/post/${post._id}`}
                    className="bg-[#4527a0] text-white w-32 focus:outline-none font-large rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* Right Column */}
              <div className="rightcolumn">
                <div className="card">
                  <h2>{post.title}</h2>
                  <img src={imageSrc} alt={post.title} className="fakeimg" />
                  <h5>{post.slug}</h5>
                  <h1>{post.author}</h1>
                  <h4>{postDate}</h4>
                  <h5>{categories}</h5>
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
