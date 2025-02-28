import React from "react";

const DisplayData = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.length === 0 ? (
        <p>No data submitted yet.</p>
      ) : (
        data.map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded shadow-md bg-gray-50"
          >
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Message:</strong> {item.message}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default DisplayData;