import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase";

export default function ChatRoom() {
  const { chatId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();   

  const receiverUid = location.state?.receiverUid;
  const receiverName = location.state?.receiverName;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const msgEndRef = useRef(null);

  const user = auth.currentUser;

  const scrollToBottom = () => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      scrollToBottom();
    });

    return () => unsub();
  }, [chatId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
      text: input,
      senderUid: user.uid,
      receiverUid,
      timestamp: new Date(),
    });

    setInput("");
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div className="fixed top-0 w-full bg-white/20 backdrop-blur-lg shadow-md text-white py-4 px-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Chat with {receiverName}</h2>

        {/* ✅ RECENT CHATS BUTTON FIXED */}
        <button
          className="bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-md hover:bg-white/30"
          onClick={() => navigate("/chat-list")}
        >
          Recent Chats
        </button>
      </div>

      <div className="flex-1 mt-20 px-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-3 flex ${
              msg.senderUid === user.uid ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-[70%] shadow-md ${
                msg.senderUid === user.uid
                  ? "bg-violet-600 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={msgEndRef}></div>
      </div>

      <div className="bg-white/80 backdrop-blur-lg p-4 flex gap-3 shadow-inner">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
