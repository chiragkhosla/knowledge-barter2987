import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; 

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async () => {
    if (password !== confirmPassword) {
      setMessage("⚠️ Passwords do not match!");
      setMessageClass("text-center mt-2 text-red-600");
      return;
    }

    if (password.length < 8) {
      setMessage("⚠️ Password must be at least 8 characters.");
      setMessageClass("text-center mt-2 text-red-600");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
      setMessage("✅ Registration successful! Redirecting to Login...");
      setMessageClass("text-center mt-2 text-green-600");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage(`❌ ${error.message}`);
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

      <header className="w-full bg-violet-600 py-4 shadow-md">
        <h1 className="text-center text-3xl font-bold text-white">
          Knowledge Barter
        </h1>
      </header>


      <main className="flex-grow flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col gap-4 w-80">
          <p className="text-2xl font-bold text-center">Sign Up</p>

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
              placeholder="Create Password"
              className="border p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="border p-2 rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="bg-violet-600 text-white rounded py-2 hover:bg-violet-700"
              onClick={handleRegistration}
            >
              Sign Up
            </button>
          </div>

          {message && <p className={messageClass}>{message}</p>}

          <div className="flex justify-center gap-2 text-sm">
            <p>Already have an account?</p>
            <Link to="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </main>


      <footer className="w-full bg-violet-600 py-4 shadow-inner mt-auto">
        <p className="text-center text-white text-sm">
          © 2025 Knowledge Barter. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Signup;
