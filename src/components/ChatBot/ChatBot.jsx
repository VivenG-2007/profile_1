import React, { useRef, useState, useEffect } from "react";
import "./ChatBot.scss";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const SYSTEM_PROMPT = `You are an AI assistant embedded in Viven Gorantla's personal portfolio website. 
Your job is to help visitors learn about Viven in a friendly, concise, and enthusiastic way.

Key facts about Viven:
- Name: Viven Gorantla
- Location: Hyderabad, India
- Status: CS Freshman (2024 batch)
- Tagline: "Turning Logic into Magic"
- GitHub: https://github.com/VivenG-2007
- LinkedIn: https://www.linkedin.com/in/viven-gorantla-19a73b3ab

Skills:
- Frontend: React, Next.js, TypeScript, GSAP, Three.js, Tailwind CSS, SCSS
- Backend: Node.js, Express, Python, REST APIs
- Database: MongoDB, PostgreSQL, Firebase
- AI: Groq API, Gemini AI
- Tools: Docker, Git, Vite

Notable Projects:
1. Final Hackathon — TypeScript full-stack, production-optimized
2. Job Portal — Full MERN stack with auth and admin dashboard
3. Disaster Management Platform — AI-powered with Groq & Gemini
4. AI Mentor Platform — Next.js with 3D avatars and XP leveling

Achievements:
- 136+ DSA problems solved
- 20+ projects built
- 1+ year of coding experience

Answer visitor questions about Viven's work, skills, projects, and how to contact him. Keep answers short (2-4 sentences max). Be friendly and professional.`;

const BotIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4"/>
    <line x1="8" y1="16" x2="8" y2="16"/>
    <line x1="16" y1="16" x2="16" y2="16"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const WELCOME = {
  role: "assistant",
  content: "Hi! 👋 I'm Viven's AI assistant. Ask me anything about his skills, projects, or how to get in touch!",
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      if (!GROQ_API_KEY) {
        // Fallback if no API key
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "⚠️ The Groq API key isn't set yet. Add your key to the .env file as VITE_GROQ_API_KEY. For now, feel free to explore Viven's portfolio!",
            },
          ]);
          setLoading(false);
        }, 600);
        return;
      }

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...newMessages.map(({ role, content }) => ({ role, content })),
          ],
          max_tokens: 256,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Groq API Error:", response.status, errorData);
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response. Try again!";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("ChatBot Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops! Something went wrong. Please check your connection or API key." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    // Stop propagation so no parent scroll handler steals spacebar or other keys
    e.stopPropagation();
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-wrapper" aria-label="AI Chat Assistant">
      {/* Toggle Button */}
      <button
        id="chatbot-toggle"
        className={`chatbot-fab ${open ? "is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat assistant"}
        aria-expanded={open}
        aria-controls="chatbot-panel"
      >
        <span className="fab-icon fab-bot"><BotIcon /></span>
        <span className="fab-icon fab-close"><CloseIcon /></span>
        {!open && <span className="fab-pulse" aria-hidden="true" />}
      </button>

      {/* Chat Panel */}
      <div
        id="chatbot-panel"
        className={`chatbot-panel ${open ? "is-visible" : ""}`}
        role="dialog"
        aria-modal="false"
        aria-label="Chat with Viven's AI assistant"
      >
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar"><BotIcon /></div>
            <div>
              <p className="chatbot-name">Viven's Assistant</p>
              <p className="chatbot-status">
                <span className="status-dot" aria-hidden="true" />
                Online
              </p>
            </div>
          </div>
          <button
            className="chatbot-close-btn"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="chatbot-messages" role="log" aria-live="polite" aria-label="Chat messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg chat-msg--${msg.role}`}>
              <div className="chat-bubble">{msg.content}</div>
            </div>
          ))}
          {loading && (
            <div className="chat-msg chat-msg--assistant">
              <div className="chat-bubble chat-bubble--typing">
                <span className="dot" /><span className="dot" /><span className="dot" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="chatbot-input-row">
          <textarea
            ref={inputRef}
            className="chatbot-input"
            placeholder="Ask me anything about Viven…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            aria-label="Chat input"
            disabled={loading}
          />
          <button
            className="chatbot-send-btn"
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
