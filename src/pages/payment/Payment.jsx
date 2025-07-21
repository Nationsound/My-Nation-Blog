import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { toast } from 'react-toastify';

// ✅ Use correct Vite env
const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

const Payment = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(''); // in naira
  const [name, setName] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');

  const amountInKobo = parseInt(amount, 10) * 100; // Paystack expects amount in kobo

  // Debug: check publicKey is loaded
  console.log('publicKey:', publicKey);

  const componentProps = {
    email,
    amount: amountInKobo,
    metadata: {
      name,
      bookingMessage,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => {
      toast.success('Payment successful!');
    },
    onClose: () => toast.info('Payment closed'),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#959A4A]">Payment</h1>

      <form 
        className="space-y-4 bg-white max-w-2xl mx-auto p-6 rounded-xl shadow-lg"
        onSubmit={(e) => e.preventDefault()} // ✅ prevent form submit refresh
      >
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount (₦)"
          className="w-full border p-2 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <textarea
          placeholder="Booking message (optional)"
          className="w-full border p-2 rounded"
          value={bookingMessage}
          onChange={(e) => setBookingMessage(e.target.value)}
          rows={3}
        />

        <PaystackButton
          {...componentProps}
          className="w-full bg-[#959A4A] text-white py-2 rounded hover:bg-violet-600"
        />
      </form>
    </div>
  );
};

export default Payment;
