import { useState, useEffect, useRef } from "react";
import askQuestion from "../services/chatbot";

export default function Chatbot({ testId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null); // 👈 ref for auto-scroll

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMsgs = [...messages, { role: "user", content: input }];
    setMessages(newMsgs);
    setInput("");

    try {
      const res = await askQuestion(testId, input);
      setMessages([...newMsgs, { role: "assistant", content: res.answer }]);
    } catch (err) {
      setMessages([
        ...newMsgs,
        { role: "assistant", content: "Oops, something went wrong." },
      ]);
      console.log(err);
    }
  };

  // 👇 Auto-greeting when user opens chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { role: "assistant", content: "Hey 👋 How can I help you?" },
      ]);
    }
  }, [isOpen]);

  // 👇 Auto-scroll when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20  right-20 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        💬
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 h-[28rem] bg-white shadow-2xl rounded-2xl border flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 rounded-t-2xl font-semibold flex justify-between items-center">
            <span>Test Assistant</span>
            <button onClick={() => setIsOpen(false)} className="text-white">
              ✖
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] break-words ${m.role === "user"
                  ? "bg-blue-100 self-end ml-auto"
                  : "bg-gray-100 self-start mr-auto"
                  }`}
              >
                {m.content}
              </div>
            ))}
            {/* 👇 Invisible div for scroll target */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about this test..."
              className="flex-1 p-2 outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
