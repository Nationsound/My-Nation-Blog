import React, { useState } from 'react';
import './CreatePost.css';

const CreatePost = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [categories, setCategories] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !author) {
      alert('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('author', author);

      // Always send categories as comma-separated string; backend handles array conversion
      formData.append('categories', categories);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:1990/mnb/api/addPost', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add post');
      }

      // add locally to preview if needed
      onAddPost && onAddPost({
        id: Date.now(),
        title,
        content,
        author,
        categories: categories.split(',').map(c => c.trim()),
        imageUrl: imagePreview,
        date: new Date().toISOString().split('T')[0],
        slug: title.toLowerCase().replace(/\s+/g, '-')
      });

      alert('✅ Post added successfully!');
      setTitle('');
      setContent('');
      setAuthor('');
      setCategories('');
      setImageFile(null);
      setImagePreview('');

    } catch (error) {
      console.error(error);
      alert(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-semibold">Create New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title*"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#959A4A]"
          required
        />

        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded px-3 py-2 min-h-[150px] resize-y focus:ring-2 focus:ring-[#959A4A]"
          required
        ></textarea>

        <input
          type="text"
          placeholder="Author*"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#959A4A]"
          required
        />

        <input
          type="text"
          placeholder="Categories (comma separated)"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#959A4A]"
        />

        <div>
          <label className="block mb-1 text-sm font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                       file:rounded file:border-0 file:text-sm file:font-semibold
                       file:bg-[#959A4A] file:text-white hover:file:bg-violet-600"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 max-h-48 rounded border"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#959A4A] hover:bg-violet-600 text-white w-full py-2 rounded font-semibold"
        >
          {loading ? 'Adding...' : 'Add Post'}
        </button>
      </form>

      <div className="mt-6">
        <h3 className="font-semibold">📄 Live Preview:</h3>
        <div className="p-3 border rounded bg-gray-50 whitespace-pre-wrap">{content}</div>
      </div>
    </div>
  );
};

export default CreatePost;
