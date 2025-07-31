import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import DisplayData from "../contactMessages/ContactMessages";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await api.get("/mnb/api/contacts");
        setReviews(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center text-[#959A4A]">
        ⭐ What People Are Saying About Us
      </h2>
      {loading ? (
        <p className="text-center">Loading reviews...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews yet.</p>
      ) : (
        <DisplayData data={reviews} />
      )}
    </div>
  );
};

export default Reviews;
