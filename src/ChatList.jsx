import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function ChatList() {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const chatRef = collection(db, "users", user.uid, "chatList");
    const q = query(chatRef, orderBy("updatedAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs
        .map((doc) => doc.data())
        .filter(
          (c) =>
            c.chatId &&
            c.otherUserUid &&
            c.otherUserName &&
            typeof c.chatId === "string"
        ); // ❗ removes broken docs

      setChats(list);
    });

    return unsubscribe;
  }, []);

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-white text-3xl font-bold mb-6">Recent Chats</h1>

      {chats.length === 0 ? (
        <p className="text-white text-lg">No chats yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {chats.map((c, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow cursor-pointer hover:bg-white"
              onClick={() =>
                navigate(`/chat/${c.chatId}`, {
                  state: {
                    receiverUid: c.otherUserUid,
                    receiverName: c.otherUserName,
                  },
                })
              }
            >
              <p className="text-lg font-bold text-violet-700">
                {c.otherUserName}
              </p>
              <p className="text-sm text-gray-600">Tap to continue chat →</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
