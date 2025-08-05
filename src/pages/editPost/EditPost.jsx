import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/axios';
import { toast } from 'react-toastify';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/mnb/api/getPost/${id}`);
        setPost(res.data);
      } catch (err) {
        toast.error('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('content', post.content);
      formData.append('author', post.author || 'Admin');
      formData.append('categories', post.categories);
      if (imageFile) formData.append('image', imageFile);

      await api.put(`/mnb/api/updatePost/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Post updated successfully!');
      navigate('/admin/manage-posts');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update post');
    }
  };

  if (loading) return <p className="p-6">Loading post...</p>;
  if (!post) return <p className="p-6 text-red-500">Post not found</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-[#959A4A]">Edit Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Content</label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            rows="6"
            className="w-full border p-2 rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold">Categories (comma-separated)</label>
          <input
            type="text"
            name="categories"
            value={Array.isArray(post.categories) ? post.categories.join(', ') : post.categories}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Replace Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full"
          />
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="Current"
              className="mt-2 h-40 rounded shadow object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-[#959A4A] text-white px-6 py-2 rounded hover:bg-violet-600"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
