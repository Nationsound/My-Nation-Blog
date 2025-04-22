import React from 'react'
import { Link } from 'react-router-dom';
import './Blog.css'
import { blogPosts } from '../../dommyData/blogData'

export default function Blog() {

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

      <div className="row">
  {blogPosts.map((post) => (
    <div key={post.id}>
      <div className="leftcolumn">
        <div className="card">
          <h2>{post.title}</h2>
          <img src={post.image} alt={post.title} className="fakeimg1" />
          <h5>{post.slug}</h5>
          <h1>{post.author}</h1>
          <h4>{post.date}</h4>
          <h5>{Array.isArray(post.categories) ? post.categories.join(", ") : post.categories}</h5>
          <p>{post.content}</p>
          <Link
            to={`/post/${post.id}`}
            className="bg-[#4527a0] text-[#ffffff] w-32 focus:outline-none font-large rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2"
          >
            View Details
          </Link>
        </div>
      </div>

      <div className="rightcolumn">
        <div className="card">
          <h2>{post.title}</h2>
          <img src={post.image} alt={post.title} className="fakeimg" />
          <h5>{post.slug}</h5>
          <h1>{post.author}</h1>
          <h4>{post.date}</h4>
          <h5>{Array.isArray(post.categories) ? post.categories.join(", ") : post.categories}</h5>
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  ))}
</div>

      <div className="header">
        <h2>My Nation Blog</h2>
        <h6>News, style & Entertainment</h6>
      </div>

    </div>
  )
}