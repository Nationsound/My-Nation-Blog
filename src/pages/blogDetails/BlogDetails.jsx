import React, { useEffect, useState } from 'react';
import './BlogDetails.css';
import { Link, useParams } from 'react-router-dom';
import { blogPosts } from '../../dommyData/blogData';
import { motion } from 'framer-motion';

export default function BlogDetails() {
  const { id } = useParams();
  const blogDetail = blogPosts.find((p) => p.id === parseInt(id));

  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
    comment: '',
    name: '',
    email: '',
    saveInfo: false,
  });

  useEffect(() => {
    const savedName = localStorage.getItem('name');
    const savedEmail = localStorage.getItem('email');
    if (savedName && savedEmail) {
      setFormData((prev) => ({
        ...prev,
        name: savedName,
        email: savedEmail,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.saveInfo) {
      localStorage.setItem('name', formData.name);
      localStorage.setItem('email', formData.email);
    }

    const newComment = {
      id: Date.now(),
      text: formData.comment,
      name: formData.name,
      email: formData.email,
      likes: 0,
      dislikes: 0,
      rating: 0,
    };

    setComments((prev) => [newComment, ...prev]);

    setFormData({
      comment: '',
      name: formData.saveInfo ? formData.name : '',
      email: formData.saveInfo ? formData.email : '',
      saveInfo: formData.saveInfo,
    });
  };

  const handleLike = (id) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  const handleDislike = (id) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, dislikes: c.dislikes + 1 } : c))
    );
  };

  const handleRating = (id, value) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, rating: value } : c))
    );
  };

  if (!blogDetail) return <div>Blog details not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className='blog-details'>
        <div className='blog-details-1'>
          <h1>Single Blog</h1>
        </div>
        <div className='blog-details-2'>
          <Link to="/" className="blog-details-3">Home</Link>
          <h6>Blog</h6>
        </div>
      </div>

      <motion.div className='strt' initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
        <h1>THE VOICE & POWER OF THE COMMON MAN</h1>
      </motion.div>

      <div className="header">
        <h2>My Nation Blog</h2>
        <h6>News, style & Entertainment</h6>
      </div>

      <div className="card">
        <h2>{blogDetail.title}</h2>
        <img src={blogDetail.image} alt={blogDetail.title} className="fakeimg1" />
        <h5>{blogDetail.slug}</h5>
        <h1>{blogDetail.author}</h1>
        <h2>{blogDetail.date}</h2>
        <h5>{blogDetail.categories}</h5>
        <p>{blogDetail.content}</p>
      </div>

      <div className='comment-form'>
        <form onSubmit={handleSubmit}>
          <h1>Leave Us A Comment Here</h1>
          <p>Your email address will not be published. Kindly fill the required fields correctly.</p>
          <textarea name="comment" placeholder='Type Your Comment*' required value={formData.comment} onChange={handleInputChange} />
          <input type="text" name="name" placeholder='Name*' required value={formData.name} onChange={handleInputChange} />
          <input type="text" name="email" placeholder='Email*' required value={formData.email} onChange={handleInputChange} />
          <button type="submit" className="bg-[#959A4A] text-[#ffffff] w-32 font-large rounded-lg text-sm px-5 py-2.5 text-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2 ml-8">Submit</button>
          <div>
            <input type="checkbox" name="saveInfo" checked={formData.saveInfo} onChange={handleInputChange} />
            <label className='save'>Click here to save your name, email for future comments.</label>
          </div>
        </form>

        {/* Comments Display Section */}
        <div className='comments-display mt-10 text-white'>
          <h2 className="text-lg font-semibold underline text-white mb-5">Comments</h2>
          {comments.map((c) => (
            <div key={c.id} className="mb-4 p-4 bg-[#4a3f57] rounded-lg">
              <p><strong>{c.name}:</strong> {c.text}</p>
              <div className="flex items-center gap-4 mt-2">
                <button onClick={() => handleLike(c.id)}>👍 {c.likes}</button>
                <button onClick={() => handleDislike(c.id)}>👎 {c.dislikes}</button>
                <div>
                  Rating:
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRating(c.id, r)}
                      className={`ml-1 ${c.rating >= r ? 'text-yellow-400' : 'text-gray-300'}`}
                    >★</button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
