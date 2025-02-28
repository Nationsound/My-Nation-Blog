import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        </Routes>
        {/* <HeroSection /> */}
        <Footer />
      </Router>
    </div>
  )
}

export default App
