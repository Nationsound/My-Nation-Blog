import React from "react";
import SongUploadForm from "./SongUploadForm";
import ArtistUploadForm from "./ArtistsUploadForm";
import CreatePost from "./createPost/CreatePost";


const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 2xl:px-96">Welcome to Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
        {/* Upload Form */}
        <div>
          <SongUploadForm />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 mt-5">Upload New Artist</h3>
        <ArtistUploadForm />
      </div>
      <div>
        <CreatePost />
      </div>
    </div>
  );
};

export default AdminDashboard;
