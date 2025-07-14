import React from 'react'
import './Post.css'
import {useState, useEffect} from 'react'



const Post = ()=> {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchPosts = async ()=>{
            try{
           const response = await fetch('http://localhost:1990/mnb/api/posts', {
            credentials: 'include',
           });
           const data = await response.json()
           setPosts(data)
            }catch(error){
                console.log(error);
            }finally{
              setLoading(false)
            }
        }
        fetchPosts(); 
    }, []);
    if (loading){
      return <p>loading...</p>
    }
    if (error){
      return <p>{error}</p>
    }
  return (
    <div>
      {posts.map((post)=>(
        <div key={post.id} className='my-post'>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}
export default Post;