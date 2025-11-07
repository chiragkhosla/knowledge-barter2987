import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase"; // ✅ Import Firestore instance

export default function ViewSkill() {
  const { id } = useParams(); // skill name passed in URL
  const navigate = useNavigate();
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const skillsRef = collection(db, "skills");
        const q = query(
          skillsRef,
          where("teach", "==", decodeURIComponent(id))
        );
        const querySnapshot = await getDocs(q);

        const skillsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFilteredTeachers(skillsList);
      } catch (error) {
        console.error("❌ Error fetching skills:", error);
        alert("Error loading data from database.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, [id]);

  const handleConnect = (teacherName) => {
    alert(`✅ Connection request sent to ${teacherName}!`);
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
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-violet-600 to-purple-500 text-white py-4 text-center font-bold text-2xl shadow-md">
        Knowledge Barter
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center flex-1 py-10 px-4">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          People teaching "{decodeURIComponent(id)}"
        </h1>

        {loading ? (
          <p className="text-white text-lg">Loading...</p>
        ) : filteredTeachers.length === 0 ? (
          <p className="text-white font-medium text-lg">
            No one has registered to teach this skill yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeachers.map((tutor) => (
              <div
                key={tutor.id}
                className="bg-white w-[300px] p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col gap-3 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                <h2 className="text-xl font-bold text-violet-600">
                  {tutor.name}
                </h2>
                <p>
                  <span className="font-semibold">Teaches:</span> {tutor.teach}
                </p>
                <p>
                  <span className="font-semibold">Level:</span> {tutor.level}
                </p>
                <p>
                  <span className="font-semibold">Wants to Learn:</span>{" "}
                  {tutor.learn}
                </p>
                <button
                  onClick={() => handleConnect(tutor.name)}
                  className="mt-3 bg-gradient-to-r from-violet-600 to-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-90 font-medium transition duration-200"
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate("/browse-skill")}
          className="mt-10 bg-gradient-to-r from-purple-600 to-violet-500 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90"
        >
          ← Back to Browse Skills
        </button>
      </div>

      {/* Footer */}
      <footer className="w-full bg-violet-600 py-4 shadow-inner text-center text-white text-sm">
        © 2025 Knowledge Barter. All rights reserved.
      </footer>
    </div>
  );
}
