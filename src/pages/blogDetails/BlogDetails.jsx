import React from 'react'
import './BlogDetails.css'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { blogPosts } from '../../dommyData/blogData';


export default function BlogDetails() {
  const { id } = useParams();
  const blogDetail = blogPosts.find((p) => p.id === parseInt(id));

  if (!blogDetail) return <div>Blog details not found</div>;
  return (
    <div>
      <div className='blog-details'>
        <div className='blog-details-1'>
          <h1>Single Blog</h1>
        </div>
        <div className='blog-details-2'>
          <Link to="/" className="blog-details-3">Home</Link>
          <h6>Blog</h6>
        </div>
      </div>
      <div className='strt'>
        <h1>THE VOICE & POWER OF THE COMMON MAN</h1>

      </div>
      <div className="header">
        <h2>My Nation Blog</h2>
        <h6>News, style & Entertainment</h6>
      </div>
      <div className="card">
        <h2>{blogDetail.title}</h2>
        <img src={blogDetail.image} alt={blogDetail.i} className="fakeimg1" />
        <h5>{blogDetail.slug}</h5>
        <h1>{blogDetail.author}</h1>
        <h2>{blogDetail.date}</h2>
        <h5>{blogDetail.categories}</h5>
        <p>{blogDetail.content}</p>
      </div>
      <div className='comment-form'>
        <form action="">
          <h1>Leave Us A Comment Here</h1>
          <p>Your email address will not be published. Kindly fill the required fields correctly.</p>
          <textarea name="comment" placeholder='Type Your Comment*' required/>
          <input type="text" placeholder='Name*' required/>
          <input type="text" placeholder='Email*' required/>
          <button className="bg-[#959A4A] text-[#ffffff] w-32 focus:outline-none font-large rounded-lg  text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2 ml-8">Submit</button>
          <input type="checkbox" value='yes' /><label htmlFor="" className='save'>click here to save your name, email for future comments.</label>
        </form>

      </div>
    </div>
  )
}
