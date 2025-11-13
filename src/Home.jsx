import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

const Home = () => {
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);


  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setMenuOpen(false);
    navigate("/login");
  };

  const handleGetStarted = () => {
    if (user) navigate("/browse-skill");
    else {
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
        backgroundPosition: "center",
      }}
    >

      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/10 backdrop-blur-md border-b border-white/20 text-white shadow-md"
            : "bg-violet-600 text-white"
        }`}
      >

        <div className="text-3xl font-bold cursor-pointer" onClick={() => navigate("/home")}>
          Knowledge<span className="text-white"> Barter</span>
        </div>


        <div className="flex items-center space-x-6 font-semibold">
          <Link to="/home" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/browse-skill" className="hover:text-gray-300">
            Browse Skills
          </Link>
          <Link to="/post-skill" className="hover:text-gray-300">
            Post a Skill
          </Link>
          <Link to="/aboutus" className="hover:text-gray-300">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>
          <Link to="/chat-list" className="hover:text-gray-300">
            Recent Chats
          </Link>
        </div>


        <div className="relative" ref={dropdownRef}>
          {!user ? (
            <Link to="/login" className="hover:text-gray-300 font-semibold">
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <div
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 cursor-pointer bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition"
              >
               
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-white"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white text-violet-600 flex items-center justify-center font-bold">
                    {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
                <span className="font-semibold text-sm truncate max-w-[100px]">
                  {user.displayName || user.email}
                </span>
              </div>

 
              {menuOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 animate-fade-in">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-violet-600 truncate">
                      {user.displayName || user.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-violet-100 font-medium text-violet-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>


      <section className="flex flex-col items-center justify-center text-center flex-1 px-4 py-24 text-white mt-20">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 shadow-lg max-w-2xl">
          <h1 className="text-5xl font-extrabold mb-4">
            Swap Skills. Learn & Grow Together.
          </h1>
          <p className="mb-6 text-lg text-gray-100">
            Find peers. Share knowledge. No money involved just pure learning.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-violet-500 text-white px-8 py-3 rounded-full hover:bg-violet-600 transition font-semibold"
          >
            Get Started
          </button>
        </div>
      </section>


      <section className="py-16 px-6 text-center text-gray-900 bg-white/70 backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-10 text-violet-700 border-b-4 border-violet-300 inline-block pb-1">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 rounded-xl bg-white/90 shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-2 text-violet-600">
              1. Post Your Skill
            </h3>
            <p>Tell others what you can teach — coding, painting, or anything else!</p>
          </div>
          <div className="p-6 rounded-xl bg-white/90 shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-2 text-violet-600">2. Find a Match</h3>
            <p>Browse what others offer and find your perfect learning partner.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/90 shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-2 text-violet-600">3. Swap & Learn</h3>
            <p>Mutually share your knowledge and grow for <b>Free!</b></p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-violet-50 bg-opacity-80 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-center text-violet-700 mb-10">
          Popular Skills
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white/90 p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-200">
            <h4 className="text-lg font-bold mb-2 text-violet-600">Web Development</h4>
            <p>Learn HTML, CSS, JavaScript, and frameworks like React.</p>
          </div>
          <div className="bg-white/90 p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-200">
            <h4 className="text-lg font-bold mb-2 text-violet-600">Graphic Design</h4>
            <p>Photoshop, Canva, Figma — unleash your creativity visually.</p>
          </div>
          <div className="bg-white/90 p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-200">
            <h4 className="text-lg font-bold mb-2 text-violet-600">Spoken English</h4>
            <p>Practice and boost your communication confidence with peers.</p>
          </div>
        </div>
      </section>

      <footer className="bg-violet-600 text-white py-6 text-center text-sm">
        © 2025 <span className="font-semibold">KnowledgeBarter</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
