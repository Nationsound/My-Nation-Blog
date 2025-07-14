import React from 'react'
import { Link } from 'react-router-dom'

const SongsUpload = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 bg-gradient-to-b from-white to-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Discover Latest Uploaded Songs</h2>
      <p className="text-gray-600 mb-6 max-w-md text-center">
        Stay tuned to the freshest tracks uploaded by artists. Explore, listen, and enjoy a curated collection updated regularly.
      </p>
      <Link 
        to="/songs" 
        className="bg-[#959A4A] text-white font-semibold rounded-lg text-sm px-6 py-3 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 transition-all duration-300"
      >
        View Songs
      </Link>
    </div>
  )
}

export default SongsUpload