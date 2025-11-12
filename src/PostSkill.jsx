import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

export default function PostSkill() {
  const [name, setName] = useState("");
  const [teach, setTeach] = useState("");
  const [learn, setLearn] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const API_URL =
    "https://firestore.googleapis.com/v1/projects/knowledge-barter-99eaa/databases/(default)/documents/skills?key=AIzaSyALqQrKm5fR0qEZ89jmaq3ulfhWZMwuce4";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePost = async () => {
    if (!name || !teach || !learn || !level || !category) {
      alert("⚠ Please fill all fields including category!");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("⚠ You must be logged in to post a skill!");
      navigate("/login");
      return;
    }

    const newSkill = {
      fields: {
        name: { stringValue: name },
        teach: { stringValue: teach },
        learn: { stringValue: learn },
        level: { stringValue: level },
        category: { stringValue: category },
        createdAt: { timestampValue: new Date().toISOString() },
        posterUid: { stringValue: user.uid },
        posterEmail: { stringValue: user.email },
      },
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSkill),
      });

      if (!res.ok) throw new Error("Failed to post skill");

      alert("✅ Skill posted successfully!");
      navigate("/browse-skill");
    } catch (error) {
      console.error("❌ Error posting skill:", error);
      alert("Error saving skill to database. Please try again!");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🔹 Scroll-based Header */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/10 backdrop-blur-md border-b border-white/20 shadow-md"
            : "bg-violet-600"
        } py-4 px-6 flex justify-between items-center`}
      >
        <h1
          className="font-bold text-2xl text-white cursor-pointer drop-shadow-md"
          onClick={() => navigate("/home")}
        >
          Knowledge Barter
        </h1>
      </div>


      <div className="flex flex-1 justify-center items-center mt-20">
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg w-[350px] border border-gray-200">
          <h1 className="text-2xl font-bold mb-4 text-violet-600 text-center">
            Post a Skill
          </h1>
          <div className="flex flex-col gap-3 w-full">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <input
              value={teach}
              onChange={(e) => setTeach(e.target.value)}
              placeholder="Skill you teach"
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
            <input
              value={learn}
              onChange={(e) => setLearn(e.target.value)}
              placeholder="Skill you want to learn"
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Select Category</option>
              <option value="UI Design">UI Design</option>
              <option value="DSA">DSA</option>
              <option value="Web Dev">Web Dev</option>
              <option value="Creative Skill">Creative Skill</option>
            </select>

            <button
              onClick={handlePost}
              className="mt-3 bg-gradient-to-r from-violet-600 to-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-90 font-medium transition duration-200"
            >
              Post Skill
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-violet-600 py-4 shadow-inner text-center text-white text-sm">
        © 2025 Knowledge Barter. All rights reserved.
      </footer>
    </div>
  );
}
