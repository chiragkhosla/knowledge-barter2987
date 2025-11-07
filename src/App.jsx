import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./login";
import Signup from "./Signup";
import PostSkill from "./PostSkill"; 
import BrowseSkill from "./BrowseSkill"
import ViewSkill from "./ViewSkill"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/post-skill" element={<PostSkill />} />
      <Route path="/browse-skill" element={<BrowseSkill/>}/>
      <Route path="/view/:id" element={<ViewSkill/>}/>

    </Routes>
  );
};

export default App;
