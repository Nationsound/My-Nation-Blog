import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // or use Next.js Link if using Next

const AdvertiseSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col items-center justify-center text-center p-8 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white rounded-2xl shadow-lg px-5 py-4">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-bold mb-4"
      >
        Advertise With Us. Reach Millions in Style.
      </motion.h1>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-[#959A4A] hover:bg-violet-600 text-white font-semibold py-3 px-6 rounded-full mt-4 shadow-md"
        onClick={() => navigate('/advertise')}
      >
        Get Started
      </motion.button>
    </section>
  );
};

export default AdvertiseSection;
