import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Payment = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });
  const [proofOfPayment, setProofOfPayment] = useState(null);

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleProofUpload = (e) => {
    if (e.target.files) {
      setProofOfPayment(e.target.files[0]);
    }
  };

  const handlePaymentVerification = () => {
    // Simulating payment verification
    setTimeout(() => {
      setIsVerified(true);
      toast.success('Payment successfully verified!');
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate a payment processing delay
    setTimeout(() => {
      if (isVerified) {
        toast.success('Booking successful!');
      } else {
        toast.error('Payment verification failed, please try again.');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#959A4A]">Payment</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white max-w-2xl mx-auto p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Enter Payment Details</h2>
        
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleCardChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
          <input
            type="text"
            id="cardExpiry"
            name="cardExpiry"
            value={cardDetails.cardExpiry}
            onChange={handleCardChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cardCVC" className="block text-sm font-medium text-gray-700">CVC</label>
          <input
            type="text"
            id="cardCVC"
            name="cardCVC"
            value={cardDetails.cardCVC}
            onChange={handleCardChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="proofOfPayment" className="block text-sm font-medium text-gray-700">Upload Proof of Payment</label>
          <input
            type="file"
            id="proofOfPayment"
            onChange={handleProofUpload}
            className="w-full border p-2 rounded"
            accept="image/*"
            required
          />
        </div>

        <button
          type="button"
          onClick={handlePaymentVerification}
          className="w-full bg-blue-500 text-white py-2 rounded mt-4"
        >
          Verify Payment
        </button>

        {isVerified && (
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded mt-4"
          >
            Submit Booking
          </button>
        )}
      </form>
    </div>
  );
};

export default Payment;
