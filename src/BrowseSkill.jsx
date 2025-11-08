import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export default function BrowseSkills() {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "skills"));
        const skills = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCards(skills);
        setFilteredCards(skills);
      } catch (error) {
        console.error("❌ Error fetching skills:", error);
        alert("Error fetching skills from database!");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [location.key]);

  // 🔹 Show suggestions (no filtering here)
  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(e.target.value);

    if (value === "") {
      setSuggestions([]);
      return;
    }

    const filtered = cards
      .filter((card) => card.teach.toLowerCase().includes(value))
      .map((card) => card.teach);

    setSuggestions(filtered.slice(0, 5));
  };


  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    setSuggestions([]); // hide dropdown
  };

  const handleSearch = () => {
    const value = searchValue.toLowerCase();
    const filtered = cards.filter((c) =>
      c.teach.toLowerCase().includes(value)
    );
    setFilteredCards(filtered);
  };

  const filterByCategory = (cat) => {
    if (!cat) setFilteredCards(cards);
    else setFilteredCards(cards.filter((c) => c.category === cat));
  };

  return (
    <section
      id="Browse_skills"
      className="flex flex-col flex-grow min-h-screen"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <div className="w-full flex justify-between items-center bg-gradient-to-r from-violet-600 to-purple-500 text-white py-4 px-6 shadow-md">
        <h1
          className="font-bold text-2xl cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Knowledge Barter
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/post-skill")}
            className="bg-white text-violet-600 font-semibold px-3 py-1 rounded-lg hover:bg-violet-100 transition"
          >
            Post Skill
          </button>
          <button
            onClick={() => navigate("/browse-skill")}
            className="bg-white text-violet-600 font-semibold px-3 py-1 rounded-lg hover:bg-violet-100 transition"
          >
            Browse Skills
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col flex-grow pt-5 px-4">
        <div className="relative w-full sm:w-[470px]">
          <input
            type="text"
            id="inp"
            value={searchValue}
            onChange={handleInputChange}
            className="border-2 w-full sm:w-[470px] rounded-md mx-2 border-purple-300 px-4 bg-white"
            placeholder="Search by Skill"
          />
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white border border-purple-200 rounded-md mt-1 shadow-md z-10">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => handleSuggestionClick(s)}
                  className="px-4 py-2 cursor-pointer hover:bg-purple-100"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={handleSearch}
          className="px-10 py-2 mt-2 text-md rounded-md font-bold text-white bg-violet-500 hover:bg-violet-600"
        >
          Search
        </button>

        <div className="flex gap-4 mt-2 text-violet-500 font-bold">
          <button
            onClick={() => filterByCategory("")}
            className="rounded-lg bg-white border-2 border-violet-300 p-3 hover:bg-violet-500 hover:text-white"
          >
            All
          </button>
          <button
            onClick={() => filterByCategory("UI Design")}
            className="rounded-lg bg-white border-2 border-violet-300 p-3 hover:bg-violet-500 hover:text-white"
          >
            UI Design
          </button>
          <button
            onClick={() => filterByCategory("DSA")}
            className="rounded-lg bg-white border-2 border-violet-300 p-3 hover:bg-violet-500 hover:text-white"
          >
            DSA
          </button>
          <button
            onClick={() => filterByCategory("Web Dev")}
            className="rounded-lg bg-white border-2 border-violet-300 p-3 hover:bg-violet-500 hover:text-white"
          >
            Web Dev
          </button>
          <button
            onClick={() => filterByCategory("Creative Skill")}
            className="rounded-lg bg-white border-2 border-violet-300 p-3 hover:bg-violet-500 hover:text-white"
          >
            Creative Skill
          </button>
        </div>

        {loading ? (
          <p className="text-white text-lg mt-6">Loading skills...</p>
        ) : (
          <div
            id="cardsContainer"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-6"
          >
            {filteredCards.map((card, index) => (
              <div
                key={index}
                className="skill-card h-[180px] w-full sm:w-[300px] p-5  rounded-lg flex flex-col gap-3 bg-white 
                shadow-md transition-transform duration-300 ease-out 
                hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.04]"
              >
                <h1 className="font-bold text-xl text-violet-500">{card.teach}</h1>
                <p className="text-gray-700">{card.learn}</p>
                <p className="text-sm text-gray-500">{card.category}</p>
                <button
                  onClick={() => navigate(`/view/${encodeURIComponent(card.teach)}`)} 
                  className="w-[100px] py-1 font-bold bg-violet-500 rounded-lg text-white hover:bg-violet-600"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredCards.length === 0 && (
          <p id="noResults" className="text-purple-300 font-bold text-lg mt-5">
            No results found.
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full bg-violet-600 py-4 shadow-inner text-center text-white text-sm">
        © 2025 Knowledge Barter. All rights reserved.
      </footer>
    </section>
  );
}