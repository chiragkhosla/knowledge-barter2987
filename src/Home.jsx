import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleGetStarted = () => {
    if (user) {
      navigate("/post-skill"); 
    } else {
      alert("Please login first to continue!");
      navigate("/login");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 py-4 shadow-sm bg-violet-600 bg-opacity-90">
        <div className="text-white text-3xl font-bold">Knowledge Barter</div>

        <div className="flex items-center space-x-6">
          <Link
            to="/home"
            className="text-white hover:text-gray-300 transition font-semibold"
          >
            Home
          </Link>
          <Link
            to="/browse-skill"
            className="text-white hover:text-gray-300 transition font-semibold"
          >
            Browse Skills
          </Link>
          <Link
            to="/post-skill"
            className="text-white hover:text-gray-300 transition font-semibold"
          >
            Post a Skill
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-gray-300 transition font-semibold"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-gray-300 transition font-semibold"
          >
            Contact
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          {!user ? (
            <Link
              to="/login"
              className="text-white hover:text-gray-300 transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-white text-violet-600 px-3 py-1 rounded hover:bg-gray-200 font-medium"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center mt-32">
        <h1 className="text-4xl font-bold text-white mb-4">
          Swap Skills. Learn & Grow Together
        </h1>
        <p className="text-white mb-6">
          Find Peers. Share Knowledge. No money involved.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-violet-500 text-white px-6 py-3 rounded-full hover:bg-violet-600 transition"
        >
          Get Started
        </button>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 text-center text-white">
        <h2 className="text-3xl font-semibold mb-10 border-b-4 border-violet-400 inline-block pb-1">
          How it works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div>
            <h3 className="text-xl font-bold mb-2">1. Post Your Skill</h3>
            <p>Tell others what you can teach — coding, painting, or anything else!</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">2. Find a Match</h3>
            <p>Browse what others offer and find your perfect learning partner.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">3. Swap & Learn</h3>
            <p>
              Mutually share your knowledge and grow for{" "}
              <span className="font-bold">Free!!!</span>
            </p>
          </div>
        </div>
      </section>

      {/* Popular Skills */}
      <section className="bg-gray-50 py-16 px-6">
        <h2 className="text-3xl font-semibold text-center text-violet-600 mb-10">
          Popular Skills
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h4 className="text-lg font-bold mb-2 text-violet-500">
              Web Development
            </h4>
            <p>HTML, CSS, JavaScript, and more!</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h4 className="text-lg font-bold mb-2 text-violet-500">
              Graphic Design
            </h4>
            <p>Photoshop, Canva, UI/UX basics.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h4 className="text-lg font-bold mb-2 text-violet-500">
              Spoken English
            </h4>
            <p>Practice with fluent speakers and improve your skills.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-violet-600 text-white py-8 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Knowledge Barter</h3>
            <p className="text-sm">© 2025 All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Help
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
