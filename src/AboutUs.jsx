import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const About = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col text-white"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/10 backdrop-blur-sm border-b border-white/20 shadow-md"
            : "bg-violet-600 bg-opacity-90"
        }`}
      >
        <div className="text-2xl font-bold">
          Knowledge<span className="text-violet-200">Barter</span>
        </div>
        <div className="flex space-x-6 font-medium">
          <Link to="/home" className="hover:text-gray-300">Home</Link>
          <Link to="/browse-skill" className="hover:text-gray-300">Browse Skills</Link>
          <Link to="/post-skill" className="hover:text-gray-300">Post Skill</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
        </div>
      </nav>

      {/* About Section */}
      <section className="flex flex-col items-center justify-center text-center pt-28 pb-16 px-6">
        <div className="bg-white/20 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-lg max-w-3xl">
          <h1 className="text-4xl font-bold mb-4 text-white">About Us</h1>
          <p className="text-gray-200">
            At <span className="font-semibold text-violet-200">Knowledge Barter</span>, we believe in the
            power of skill sharing. Our goal is to create a space where learners and teachers connect, 
            exchange knowledge, and grow together — without money being a barrier.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-6 text-center">
        <div className="bg-white/20 backdrop-blur-sm border border-white/20 rounded-3xl max-w-4xl mx-auto p-8 shadow-lg">
          <h2 className="text-3xl font-semibold mb-4 text-violet-200">Our Mission</h2>
          <p className="text-gray-200 max-w-3xl mx-auto">
            We aim to make learning accessible and interactive. Whether you’re a coder, designer, or artist,
            Knowledge Barter gives you the chance to share your expertise and learn from others. 
            Together, we make learning simple, fun, and valuable.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="text-center px-6 pb-16">
        <h2 className="text-3xl font-semibold mb-10 text-violet-200">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {["Jashan Mukheja", "Bhimanshu Singh", "Aryan Sanghi", "Chirag Khosla"].map(
            (name, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:shadow-lg transition"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    name
                  )}&background=7c3aed&color=fff`}
                  alt={name}
                  className="w-20 h-20 mx-auto rounded-full border-4 border-violet-300 mb-3"
                />
                <h3 className="text-lg font-semibold text-white">{name}</h3>
              </div>
            )
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-violet-700/90 backdrop-blur-sm text-white py-6 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="text-lg font-bold">Knowledge Barter</h3>
            <p className="text-sm opacity-90">© 2025 All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-sm mt-4 md:mt-0">
            <a href="#" className="hover:underline opacity-90 hover:opacity-100">Privacy</a>
            <a href="#" className="hover:underline opacity-90 hover:opacity-100">Terms</a>
            <a href="#" className="hover:underline opacity-90 hover:opacity-100">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
