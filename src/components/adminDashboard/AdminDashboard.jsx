import React from "react";
import SongUploadForm from "./SongUploadForm";
import UploadedSongs from "./Uploadedsongs";


const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Upload New Song</h2>
          <SongUploadForm />
        </div>

        {/* Uploaded Songs */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Uploaded Songs</h2>
          <UploadedSongs />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
