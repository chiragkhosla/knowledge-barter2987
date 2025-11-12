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
      setMessage("Required fields not filled");
      setMessageClass("text-center mt-2 text-red-600");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Password Mismatch");
      setMessageClass("text-center mt-2 text-red-600");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be of 8 characters");
      setMessageClass("text-center mt-2 text-red-600");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
      setMessage("Registration Successful. Redirecting.....");
      setMessageClass("text-center mt-2 text-green-600");

  
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => navigate("/login"), 500);
    } catch (error) {
      let errorMsg = "Something is wrong";
      if (error.code === "auth/email-already-in-use") {
        errorMsg = "Email already registered";
      } else if (error.code === "auth/invalid-email") {
        errorMsg = "Email not valid";
      } else if (error.code === "auth/weak-password") {
        errorMsg = "Password must be atleast 8 characters";
      }
      setMessage(errorMsg);
      setMessageClass("text-center mt-2 text-red-600");
    } finally {
      setLoading(false);
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
      {/* Header */}
      <header className="absolute top-0 w-full py-5 bg-violet-600 bg-opacity-90 text-center text-white text-3xl font-extrabold shadow-md">
        Knowledge<span className="text-violet-200">Barter</span>
      </header>

      {/* Signup Form */}
      <main className="flex-grow flex justify-center items-center">
        <div className="bg-white/95 p-8 rounded-2xl shadow-lg w-[350px] border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-6 text-violet-600">
            Create an Account 
          </h2>

          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter Email"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Create Password"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              onClick={handleRegistration}
              disabled={loading}
              className={`mt-3 bg-gradient-to-r from-violet-600 to-purple-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </div>

          {message && <p className={messageClass}>{message}</p>}

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-600 hover:underline font-semibold">
              Log In
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full bg-violet-600 bg-opacity-90 text-white text-center text-sm py-4">
        © 2025 <span className="font-semibold">KnowledgeBarter</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default Signup;
