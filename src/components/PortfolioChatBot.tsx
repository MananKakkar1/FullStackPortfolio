import { useState, useRef, useEffect } from "react";
import "./css_files/PortfolioChatBot.css";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/v1/chat/completions";

const systemPrompt = `
You are a helpful chatbot assistant for Manan Kakkar's portfolio website. 
You know everything about Manan's skills, projects, experience, and GitHub repositories. 
Answer questions about Manan, his work, and his background.
`;

const PortfolioChatBot = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Manan's portfolio assistant. Ask me anything about Manan, his projects, or his experience!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { role: "user", content: input }]);
    setLoading(true);

    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "mixtral-8x7b-32768",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.slice(1),
            { role: "user", content: input },
          ],
          max_tokens: 512,
        }),
      });
      const data = await response.json();
      const botReply =
        data.choices?.[0]?.message?.content ||
        "Sorry, I couldn't process that.";
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: botReply },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        {
          role: "assistant",
          content: "Sorry, there was an error connecting to the assistant.",
        },
      ]);
    }
    setInput("");
    setLoading(false);
  };

  // Scroll to bottom of chat when messages update
  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Hide chat on scroll down, show on scroll up (like navbar, but for bottom)
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setVisible(false); // scrolling down, hide
      } else {
        setVisible(true); // scrolling up, show
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <button
        className={`chatbot-fab${visible ? "" : " chatbot-fab-hide"}`}
        aria-label="Open AI Chatbot"
        onClick={() => setOpen(true)}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle
            cx="14"
            cy="14"
            r="13"
            stroke="#4f46e5"
            strokeWidth="2"
            fill="#fff"
          />
          <path
            d="M9 12a5 5 0 1 1 10 0c0 2.5-2.5 4-5 4s-5-1.5-5-4z"
            fill="#4f46e5"
          />
          <ellipse cx="12" cy="13" rx="1" ry="1.5" fill="#fff" />
          <ellipse cx="16" cy="13" rx="1" ry="1.5" fill="#fff" />
          <path
            d="M12 17c.5.5 1.5.5 2 0"
            stroke="#4f46e5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {open && (
        <div className="chatbot-modal-overlay" onClick={() => setOpen(false)}>
          <div className="chatbot-modal" onClick={(e) => e.stopPropagation()}>
            <div className="chatbot-modal-header">
              <span>AI Chatbot Assistant</span>
              <button
                className="chatbot-close-btn"
                onClick={() => setOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="chatbot-messages">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chatbot-msg chatbot-msg-${msg.role}`}
                >
                  {msg.content}
                </div>
              ))}
              {loading && (
                <div className="chatbot-msg chatbot-msg-assistant">...</div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="chatbot-input-bar">
              <input
                type="text"
                value={input}
                placeholder="Ask me anything about Manan or his projects..."
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                disabled={loading}
              />
              <button onClick={sendMessage} disabled={loading || !input.trim()}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioChatBot;
