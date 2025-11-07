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
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      setMessage("✅ Login successful! Redirecting...");
      setMessageClass("text-center mt-2 text-green-600");
      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      setMessage(`${error.message}`);
      setMessageClass("text-center mt-2 text-red-600");
    }
  };

  return (
    <div
      className="bg-gray-100 flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('bg.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <header className="w-full bg-violet-600 py-4 shadow-md">
        <h1 className="text-center text-3xl font-bold text-white">
          Knowledge Barter
        </h1>
      </header>

      {/* Login form */}
      <main className="flex-grow flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col gap-4 w-80">
          <p className="text-2xl font-bold text-center">Log In</p>

          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter Email"
              className="border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="border p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-violet-600 text-white rounded py-2 hover:bg-violet-700"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>

          {message && <p className={messageClass}>{message}</p>}

          <div className="flex justify-center gap-2 text-sm">
            <p>Don't have an account?</p>
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-violet-600 py-4 shadow-inner mt-auto">
        <p className="text-center text-white text-sm">
          © 2025 Knowledge Barter. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Login;
