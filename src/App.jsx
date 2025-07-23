import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/header/Header';
import HeaderA from "./components/header1/HeaderA";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Service from "./pages/service/Service";
import Contact from "./pages/contact/Contact";
import Blog from "./pages/blog/Blog";
import BlogDetails from "./pages/blogDetails/BlogDetails";
import AboutDataDetails from "./pages/aboutDataDetails/AboutDataDetails";
import ServiceDataDetails from "./pages/serviceDataDetails/ServiceDataDetails";
import ContainerComponent from "./pages/containerComponent/ContainerComponent";
import Post from "./pages/post/Post";
import Login from "./pages/login/Login";
import SignUp from "./components/signup/Signup";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./components/resetPassword/ResetPassword";
import Profile from "./components/userProfile/Profile";
import Booking from "./pages/bookings/Booking";
import BookingSuccess from "./pages/bookingSuccess/BookingSuccess";
import StyleSpotlight from "./pages/styleSpotlight/StyleSpotlight";
import PreHome from "./components/preHome/PreHome";
import Payment from "./pages/payment/Payment";
import MusicLinkAggregator from "./pages/musiclinkaggregator/MusicLinkAggregator";
import SmartLinkPage from "./pages/smartlink/SmartLinkPage";
import BrandGuideline from "./pages/brandGuidline/BrandGuideline";
import License from "./pages/license/License";
import AdminLogin from "./components/auth/AdminLogin";
import AdminDashboard from "./components/adminDashboard/AdminDashboard";
import UploadedSongs from "./components/adminDashboard/UploadedSongs";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./pages/termsAndConditions/TermsAndConditions";


function App() {
  return (
    <div>
      <Router>
        <HeaderA />
        <Header />

        <Routes>
          <Route path="/" element={<Navigate to="/pre-home" />} />
          <Route path="/pre-home" element={<PreHome />} />

          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/:id" element={<AboutDataDetails />} />
          <Route path="/service" element={<Service />} />
          <Route path="/service/:id" element={<ServiceDataDetails />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/:id" element={<BlogDetails />} />
          <Route path="/containercomponent/:id" element={<ContainerComponent />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/booking" element={<Booking />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/payment" element={<Payment />} />

          <Route path="/music-links" element={<MusicLinkAggregator />} />
          <Route path="/smartlink/:id" element={<SmartLinkPage />} />

          <Route path="/style-spotlight" element={<StyleSpotlight />} />

          <Route path="/license" element={<License />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/brand-guideline" element={<BrandGuideline />} /> 

          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/songs" element={<UploadedSongs />} />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </Router>

      {/* Toast notifications container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
