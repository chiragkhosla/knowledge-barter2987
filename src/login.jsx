import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setMessage("");
    if (!email || !password) {
      setMessage("Fill all the required fields");
      setMessageClass("text-red-600 text-center");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      setMessage("Login Successful....");
      setMessageClass("text-green-600 text-center");
      setTimeout(() => navigate("/home"), 500);
    } catch {
      setMessage("Credentials are not valid");
      setMessageClass("text-red-600 text-center");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className="absolute top-0 w-full py-5 bg-violet-600 bg-opacity-90 text-center text-white text-3xl font-extrabold shadow-md">
        Knowledge<span className="text-violet-200">Barter</span>
      </header>

      <div className="bg-white/95 p-8 rounded-2xl shadow-lg w-[350px] border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6 text-violet-600">Welcome Back </h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full mb-3 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full mb-3 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-violet-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:opacity-90"
        >
          Log In
        </button>

        {message && <p className={messageClass}>{message}</p>}

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-violet-600 hover:underline font-semibold">
            Sign Up
          </Link>
        </p>
      </div>

      <footer className="absolute bottom-0 w-full bg-violet-600 bg-opacity-90 text-white text-center text-sm py-4">
        © 2025 <span className="font-semibold">KnowledgeBarter</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
