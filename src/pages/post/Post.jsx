import React, { useState, useEffect } from 'react';
import './Post.css';
import api from '../../utils/axios'; // ✅ import your configured axios instance

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/mnb/api/posts', {
          withCredentials: true, // ✅ keep credentials if needed
        });
        setPosts(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load posts'); // ✅ set error message
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="my-post">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Post;
