import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SongUploadForm from "./SongUploadForm";
import ArtistUploadForm from "./ArtistsUploadForm";
import CreatePost from "./createPost/CreatePost";
import AdminBookings from "./AdminBookings";
import { motion } from 'framer-motion';
import { FaUpload, FaNewspaper, FaUsers, FaCalendarCheck } from 'react-icons/fa';
import NominateArtist from "./NominateArtist";
import PartnershipAdmin from "./ourPartners/PartnershipAdmin";
import AdminForm from "./adminForm/AdminForm";
import AdminList from "./adminList/AdminList";
import TeamDashboard from "./teamMembers/teamDashboard/TeamDashboard";
import SubscribersList from "./subscribersList/SubscribersList";
import AdminAdverts from "./adminAdverts/AdminAdverts";
import AdminSpotlightManager from "./spotlightManager/AdminSpotlightManager";
import AdminPostManager from "./postManager/AdminPostManager";
import SongUpdateDelete from "./songUpdateAndDelete/SongUpdateDelete";
import WorkerList from "./workers/WorkerList";
import WorkersForm from "./workers/WorkersForm";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded token in AdminDashboard:', decoded);
        if (!decoded.isAdmin) {
          navigate('/login'); // not an admin, redirect to user login
        }
      } catch (error) {
        console.error('Failed to decode token', error);
        navigate('/login'); // invalid token, redirect
      }
    } else {
      navigate('/login'); // no token, redirect
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 xl:p-10">
      <motion.h1 
        className="text-3xl font-bold text-center text-[#959A4A] mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to Admin Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <motion.div 
          className="bg-white rounded-xl shadow p-6 hover:shadow-md transition"
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <FaUpload className="text-[#959A4A]" title="Upload Song" />
            <h2 className="text-xl font-semibold text-[#959A4A]">Upload Song</h2>
          </div>
          <SongUploadForm />
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow p-6 hover:shadow-md transition"
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <FaNewspaper className="text-[#959A4A]" title="Create Post" />
            <h2 className="text-xl font-semibold text-[#959A4A]">Create Post</h2>
          </div>
          <CreatePost />
        </motion.div>
      </div>

      <motion.div 
        className="mt-8 bg-white rounded-xl shadow p-6 max-w-7xl mx-auto hover:shadow-md transition"
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <FaUsers className="text-[#959A4A]" title="Manage Admins" />
          <h2 className="text-xl font-semibold text-[#959A4A]">Manage Posts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminPostManager />
        </div>
      </motion.div>

      <motion.div 
        className="mt-8 bg-white rounded-xl shadow p-6 max-w-7xl mx-auto hover:shadow-md transition"
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <FaUsers className="text-[#959A4A]" title="Manage Admins" />
          <h2 className="text-xl font-semibold text-[#959A4A]">Manage Workers Identity</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WorkersForm />
          <WorkerList />
        </div>
      </motion.div>

      <motion.div 
        className="mt-8 bg-white rounded-xl shadow p-6 max-w-7xl mx-auto hover:shadow-md transition"
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <FaUsers className="text-[#959A4A]" title="Manage Admins" />
          <h2 className="text-xl font-semibold text-[#959A4A]">Manage Uploaded Songs</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SongUpdateDelete />
        </div>
      </motion.div>

      <motion.div 
        className="mt-8 bg-white rounded-xl shadow p-6 max-w-7xl mx-auto hover:shadow-md transition"
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <FaUsers className="text-[#959A4A]" title="Manage Admins" />
          <h2 className="text-xl font-semibold text-[#959A4A]">Manage Team Members</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TeamDashboard />
        </div>
      </motion.div>

      <motion.div 
        className="mt-8 bg-white rounded-xl shadow p-6 max-w-7xl mx-auto hover:shadow-md transition"
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <FaUsers className="text-[#959A4A]" title="Manage Admins" />
          <h2 className="text-xl font-semibold text-[#959A4A]">View Our Subscribers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SubscribersList />
        </div>
      </motion.div>
      <motion.div 
        className="mt-8 bg-white rounded-xl shadow p-6 max-w-7xl mx-auto hover:shadow-md transition"
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <FaUsers className="text-[#959A4A]" title="Manage Admins" />
          <h2 className="text-xl font-semibold text-[#959A4A]">Manage Admins</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminForm />
          <AdminList />
        </div>
      </motion.div>

      <motion.div 
        className="mt-8 bg-white rounded-xl shadow p-6 max-w-7xl mx-auto hover:shadow-md transition"
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <FaCalendarCheck className="text-[#959A4A]" title="Manage Bookings" />
          <h2 className="text-xl font-semibold text-[#959A4A]">Manage Bookings</h2>
        </div>
        <AdminBookings />
      </motion.div>

      <motion.div 
        className="mt-8 bg-white rounded-xl shadow p-6 max-w-7xl mx-auto hover:shadow-md transition"
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <FaCalendarCheck className="text-[#959A4A]" title="Our Partners" />
          <h2 className="text-xl font-semibold text-[#959A4A]">Our Partners</h2>
        </div>
        <PartnershipAdmin />
      </motion.div>

      <motion.div 
        className="mt-8 bg-white rounded-xl shadow p-6 max-w-7xl mx-auto hover:shadow-md transition"
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <FaCalendarCheck className="text-[#959A4A]" title="Our Partners" />
          <h2 className="text-xl font-semibold text-[#959A4A]">Manage Adverts</h2>
        </div>
        <AdminAdverts />
      </motion.div>

      <motion.div 
        className="mt-8 bg-white rounded-xl shadow p-6 max-w-4xl mx-auto hover:shadow-md transition"
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <FaUsers className="text-[#959A4A]" title="Artist Spotlight" />
          <h2 className="text-xl font-semibold text-[#959A4A]">Celebrities To Feature In Our Spotlight</h2>
        </div>
        <NominateArtist />
      </motion.div>
      <motion.div 
        className="mt-8 bg-white rounded-xl shadow p-6 max-w-4xl mx-auto hover:shadow-md transition"
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <FaUsers className="text-[#959A4A]" title="Artist Spotlight" />
          <h2 className="text-xl font-semibold text-[#959A4A]">Manage Spotlight</h2>
        </div>
        <AdminSpotlightManager />
      </motion.div>

      <motion.div 
        className="mt-8 bg-white rounded-xl shadow p-6 max-w-4xl mx-auto hover:shadow-md transition"
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <FaUsers className="text-[#959A4A]" title="Upload New Artist" />
          <h2 className="text-xl font-semibold text-[#959A4A]">Upload New Artist</h2>
        </div>
        <ArtistUploadForm /> 
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
