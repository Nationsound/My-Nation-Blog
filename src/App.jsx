import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import './App.css'
import Header from './components/header/Header'
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Service from "./pages/service/Service";
import About from "./pages/about/About";
import Login from "./pages/login/Login";
import Footer from "./components/footer/Footer";
import Blog from "./pages/blog/Blog";
import SignUp from "./components/signup/SignUp";
import BlogDetails from "./pages/blogDetails/BlogDetails";
import AboutDataDetails from "./pages/aboutDataDetails/AboutDataDetails";
import Post from "./pages/post/Post";
import ServiceDataDetails from "./pages/serviceDataDetails/ServiceDataDetails";
import ContainerComponent from "./pages/containerComponent/ContainerComponent";
import HeaderA from "./components/header1/HeaderA";
import AdminDashboard from "./components/adminDashboard/AdminDashboard";
import AdminLogin from "./components/auth/AdminLogin";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MusicLinkAggregator from "./pages/musiclinkaggregator/MusicLinkAggregator";
import SmartLinkPage from "./pages/smartlink/SmartLinkPage";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import BrandGuideline from "./pages/brandGuidline/BrandGuideline";
import License from "./pages/license/License";
import PrivacyPolicy from "./pages/privacyPolicy/Privacypolicy";
import TermsAndConditions from "./pages/termsAndConditions/TermsAndconditions";
import ResetPassword from "./components/resetPassword/ResetPassword";
import Profile from "./components/userProfile/Profile";
import Booking from "./pages/bookings/Booking";
import BookingSuccess from "./pages/bookingSuccess/BookingSuccess";
import StyleSpotlight from "./pages/styleSpotlight/StyleSpotlight";
import PreHome from "./components/preHome/PreHome";
import Payment from "./pages/payment/Payment";

// import HeroSection from "./components/herosection/HeroSection";

function App() {

  return (
    <div>
      <Router>
        <HeaderA />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/post/:id" element={<BlogDetails />}/>
          <Route path="/about/:id" element={<AboutDataDetails />}/>
          <Route path="/service/:id" element={<ServiceDataDetails/>}/>
          <Route path="/containercomponent/:id" element={<ContainerComponent/>}/>
          <Route path="/post" element={<Post />}/>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/music-links" element={<MusicLinkAggregator />} />
          <Route path="/smartlink/:id" element={<SmartLinkPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/license" element={<License />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/brand-guideline" element={<BrandGuideline />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/style-spotlight" element={<StyleSpotlight />} /> 
          <Route path="/pre-home" element={<PreHome />} /> 
          <Route path="/payment" element={<Payment />} />
          <Route
          
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        </Routes>
        {/* <HeroSection /> */}
        <Footer />
      </Router>
    </div>
    
  );
};

export default App
