import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where, doc, setDoc } from "firebase/firestore";
import { db, auth } from "./firebase";

export default function ViewSkill() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const skillName = decodeURIComponent(id).replace(/-/g, " ");
        const skillsRef = collection(db, "skills");
        const q = query(skillsRef, where("teach", "==", skillName));
        const querySnapshot = await getDocs(q);

        const skillsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFilteredTeachers(skillsList);
      } catch (error) {
        console.error("Error fetching skills:", error);
        alert("Error loading data from database.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, [id]);

  const handleConnect = async (tutorUid, tutorName) => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    if (!tutorUid) {
      alert("Chat cannot start because this user has no UID saved.");
      return;
    }

    const chatId =
      user.uid < tutorUid ? `${user.uid}_${tutorUid}` : `${tutorUid}_${user.uid}`;

    await setDoc(doc(db, "users", user.uid, "chatList", chatId), {
      chatId,
      otherUserUid: tutorUid,
      otherUserName: tutorName,
      updatedAt: Date.now(),
    });

    await setDoc(doc(db, "users", tutorUid, "chatList", chatId), {
      chatId,
      otherUserUid: user.uid,
      otherUserName: user.email,
      updatedAt: Date.now(),
    });

    navigate(`/chat/${chatId}`, {
      state: {
        receiverUid: tutorUid,
        receiverName: tutorName,
      },
    });
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
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/10 backdrop-blur-md border-b border-white/20 shadow-md"
            : "bg-gradient-to-r from-violet-600 to-purple-500"
        } text-white py-4 px-6 flex justify-between items-center`}
      >
        <h1
          className="font-bold text-2xl cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Knowledge Barter
        </h1>
      </div>

      <div className="flex flex-col items-center flex-1 py-10 px-4 mt-20">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          People teaching “{decodeURIComponent(id).replace(/-/g, " ")}”
        </h1>

        {loading ? (
          <p className="text-white text-lg">Loading...</p>
        ) : filteredTeachers.length === 0 ? (
          <p className="text-white font-medium text-lg text-center">
            No one has registered to teach this skill yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeachers.map((tutor) => (
              <div
                key={tutor.id}
                className="bg-white w-[300px] p-6 rounded-2xl shadow-md border border-gray-200 
                           flex flex-col gap-3 hover:-translate-y-2 hover:shadow-2xl 
                           transition-all duration-300"
              >
                <h2 className="text-xl font-bold text-violet-600">{tutor.name}</h2>
                <p><span className="font-semibold">Teaches:</span> {tutor.teach}</p>
                <p><span className="font-semibold">Level:</span> {tutor.level}</p>
                <p><span className="font-semibold">Wants to Learn:</span> {tutor.learn}</p>

                <button
                  onClick={() => handleConnect(tutor.posterUid, tutor.name)}
                  className="mt-3 bg-gradient-to-r from-violet-600 to-purple-500 text-white px-4 py-2 
                             rounded-lg hover:opacity-90 font-medium transition duration-200"
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate("/browse-skill")}
          className="mt-10 bg-gradient-to-r from-purple-600 to-violet-500 text-white px-6 py-2 
                     rounded-lg font-medium hover:opacity-90 transition duration-200"
        >
          ← Back to Browse Skills
        </button>
      </div>

      <footer className="w-full bg-violet-600/90 backdrop-blur-md border-t border-white/20 py-4 
                         text-center text-white text-sm mt-auto">
        © 2025 <span className="font-semibold">Knowledge Barter.</span> All rights reserved.
      </footer>
    </div>
  );
}
