import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatWithXAI = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi, I am **ProfolioPro**, your AI Profolio management assistant. How can I help you! :)",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const base_url = process.env.REACT_APP_API_URL;

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to message list
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput(""); // clear input field
    setIsLoading(true); // start loading animation

    try {
      // call backend API
      const response = await axios.post(`${base_url}/market/chat-with-xai/`, {
        message: input,
      });

      // Add assistant reply to message list
      const assistantMessage = {
        role: "assistant",
        content: response.data.response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error communicating with AI Assistant:", error);
      // Add error message to message list
      const errorMessage = {
        role: "assistant",
        content: "Oops! Something went wrong. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>AI Assistant</h2>
      <div
        style={{
          border: "1px solid #ddd",
          padding: "10px",
          height: "400px",
          overflowY: "scroll",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "flex-start",
              margin: "10px 0",
              flexDirection: msg.role === "user" ? "row-reverse" : "row",
            }}
          >
            {/* Logo */}
            <img
              src={msg.role === "assistant" ? "/AI_logo.png" : "/user_logo.png"}
              alt={`${msg.role} Logo`}
              style={{
                width: "40px",
                height: "40px",
                margin: msg.role === "user" ? "0 0 0 10px" : "0 10px 0 0",
                borderRadius: "50%",
              }}
            />
            {/* Message Content */}
            <div
              style={{
                backgroundColor: msg.role === "user" ? "#e0f7fa" : "#f1f1f1",
                borderRadius: "10px",
                padding: "10px",
                maxWidth: "80%",
                textAlign: "left",
              }}
            >
              <strong>{msg.role === "user" ? "You" : "AI Assistant"}:</strong>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div
            style={{
              textAlign: "left",
              fontStyle: "italic",
              color: "gray",
              margin: "5px 0",
            }}
          >
            AI Assistant is typing...
          </div>
        )}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "80%",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          marginRight: "10px",
        }}
        placeholder="Type your message..."
      />
      <button
        onClick={sendMessage}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default ChatWithXAI;
