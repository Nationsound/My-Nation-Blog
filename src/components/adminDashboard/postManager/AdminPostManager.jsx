import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/axios";
import { toast } from "react-toastify";

const AdminPostManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/mnb/api/getAllPosts");
      setPosts(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Delete post
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/mnb/api/deletePost/${id}`);
      toast.success("Post deleted successfully");
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Blog Posts</h1>

      {loading && <p>Loading posts...</p>}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Author</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td className="border border-gray-300 p-2">{post.title}</td>
              <td className="border border-gray-300 p-2">{post.author}</td>
              <td className="border border-gray-300 p-2">
                {new Date(post.createdAt).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 p-2 flex gap-2">
                <Link
                  to={`/admin/edit-post/${post._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {posts.length === 0 && !loading && (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No posts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPostManager;
