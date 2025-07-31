import React, { useState } from "react";
import { motion } from "framer-motion";

const DisplayData = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center mb-4">What People Are Saying About Us</h2>

      {data.length === 0 ? (
        <p className="text-gray-500 text-center">No reviews yet.</p>
      ) : (
        <>
          {currentItems.map((item, index) => {
            const initial = item.name?.charAt(0).toUpperCase() || "U";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-4 p-4 rounded-xl shadow-md bg-[#959A4A] text-white"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white text-[#959A4A] font-bold flex items-center justify-center text-lg shadow">
                  {initial}
                </div>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-base">{item.message}</p>
                </div>
              </motion.div>
            );
          })}

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#7e823c] text-white hover:bg-[#666a32]"
                }`}
              >
                Prev
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#7e823c] text-white hover:bg-[#666a32]"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DisplayData;
