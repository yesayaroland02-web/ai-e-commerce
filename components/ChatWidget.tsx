"use client";

import { useEffect, useState } from "react";

interface Message {
  role: "user" | "ai";
  text: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const openChat = () => setOpen(true);

    window.addEventListener("open-chat", openChat);

    return () =>
      window.removeEventListener("open-chat", openChat);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "ai", text: data.answer },
    ]);

    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">

      {/* BUTTON OPEN */}
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-4 py-2 rounded-full"
      >
        🤖
      </button>

      {open && (
        <div className="w-80 h-96 bg-white border shadow-xl rounded-lg mt-3 flex flex-col">

          {/* HEADER + CLOSE BUTTON */}
          <div className="p-3 border-b font-bold flex justify-between items-center">
            <span>AI Chat</span>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-red-500 text-lg"
            >
              ✕
            </button>
          </div>

          {/* CHAT AREA */}
          <div className="flex-1 p-2 overflow-y-auto">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 mb-2 text-sm rounded ${
                  m.role === "user"
                    ? "bg-blue-100 ml-auto"
                    : "bg-gray-100"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="p-2 flex gap-2 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border flex-1 px-2 py-1 rounded"
              placeholder="Tanya AI..."
            />

            <button
              onClick={sendMessage}
              className="bg-black text-white px-3 rounded"
            >
              Send
            </button>
          </div>

        </div>
      )}
    </div>
  );
}