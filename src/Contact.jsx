import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const testimonials = [
    {
      text: `"Knowledge Barter made learning so easy! The interface is smooth and I actually enjoyed every second."`,
      author: "— Aisha Verma",
    },
    {
      text: `"Absolutely love the mentorship sessions. I got my first project through them!"`,
      author: "— Rohan Mehta",
    },
    {
      text: `"Great platform for both learners and experts. Highly recommend for anyone wanting to grow."`,
      author: "— Sneha Kapoor",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validateForm = () => {
    const { name, email, message } = formData;
    const newErrors = {};
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;

    if (!name.trim()) newErrors.name = "Please enter your name.";
    if (!email.match(emailPattern)) newErrors.email = "Please enter a valid email.";
    if (!message.trim()) newErrors.message = "Message cannot be empty.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, "contactMessages"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: new Date(),
      });

      alert("✅ Thank you for your feedback! Your message has been submitted.");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("❌ Error submitting message:", error);
      alert("Something went wrong while submitting your message. Try again!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/10 backdrop-blur-md border-b border-white/20 shadow-md"
            : "bg-gradient-to-r from-violet-600 to-purple-500"
        } text-white py-4 px-6 flex justify-between items-center`}
      >
        <h1 className="font-bold text-2xl">Knowledge Barter</h1>
      </header>


      <section className="bg-white text-center py-4 px-6 shadow-md rounded-b-xl mt-20">
        <h2 className="text-4xl font-bold text-purple-700 mb-4">Get in Touch</h2>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          We'd love to hear from you! Drop us a message and we'll get back to you soon.
        </p>
      </section>


      <section className="flex-1 flex flex-col md:flex-row items-start justify-center gap-10 px-6 md:px-10 py-12">

        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition ${
                submitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? "Submitting..." : "Send Message"}
            </button>
          </form>
        </div>


        <div
          id="testimonial"
          className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 text-center transition-opacity duration-700"
        >
          <p className="text-lg italic text-gray-700 mb-4">
            {testimonials[testimonialIndex].text}
          </p>
          <h3 className="text-xl font-semibold text-purple-600">
            {testimonials[testimonialIndex].author}
          </h3>
        </div>
      </section>

      <footer className="bg-violet-600/90 backdrop-blur-md border-t border-white/20 py-6 text-center text-white text-sm">
        © 2025 <span className="font-semibold">Knowledge Barter.</span> All rights reserved.
      </footer>
    </div>
  );
};

export default Contact;
