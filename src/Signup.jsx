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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegistration = async () => {
    setMessage("");
    setMessageClass("");

    if (!email || !password || !confirmPassword) {
      setMessage("⚠️ Please fill all the required fields!");
      setMessageClass("text-center mt-2 text-red-600");
      return;
    }

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
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
      setMessage("✅ Registration successful! Redirecting to Login...");
      setMessageClass("text-center mt-2 text-green-600");

      // clear form
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      let errorMsg = "❌ Something went wrong!";
      if (error.code === "auth/email-already-in-use") {
        errorMsg = "⚠️ This email is already registered.";
      } else if (error.code === "auth/invalid-email") {
        errorMsg = "⚠️ Invalid email address.";
      } else if (error.code === "auth/weak-password") {
        errorMsg = "⚠️ Password should be at least 6 characters.";
      }
      setMessage(errorMsg);
      setMessageClass("text-center mt-2 text-red-600");
    } finally {
      setLoading(false);
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

      {/* Form */}
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
              className={`bg-violet-600 text-white rounded py-2 hover:bg-violet-700 transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={handleRegistration}
              disabled={loading}
            >
              {loading ? "Registering..." : "Sign Up"}
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

      {/* Footer */}
      <footer className="w-full bg-violet-600 py-4 shadow-inner mt-auto">
        <p className="text-center text-white text-sm">
          © 2025 Knowledge Barter. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Signup;
