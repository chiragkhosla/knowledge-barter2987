import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

import Home from "./Home";
import Login from "./login";
import Signup from "./Signup";
import PostSkill from "./PostSkill";
import BrowseSkill from "./BrowseSkill";
import ViewSkill from "./ViewSkill";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import ChatRoom from "./ChatRoom";
import ChatList from "./ChatList";

const App = () => {

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            name: user.displayName || "User",
            createdAt: Date.now(),
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/post-skill" element={<PostSkill />} />
      <Route path="/browse-skill" element={<BrowseSkill />} />
      <Route path="/view/:id" element={<ViewSkill />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/chat/:chatId" element={<ChatRoom />} />
      <Route path="/chat-list" element={<ChatList />} />
    </Routes>
  );
};

export default App;
