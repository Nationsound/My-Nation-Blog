import React from 'react'
import { FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const ContactInfo = () => {
  return (
    <div className="flex items-center gap-6">
      <a href="https://wa.me/1234567890" className="flex items-center gap-2 text-gray-900 hover:text-blue-500">
        <FaWhatsapp />
        <span>+123 0701 808 5755</span>
      </a>
      <a href="mailto:your-email@gmail.com" className="flex items-center gap-2 text-gray-900 hover:text-blue-500">
        <MdEmail />
        <span>mynationblog305@gmail.com</span>
      </a>
    </div>
  );
};

export default ContactInfo;