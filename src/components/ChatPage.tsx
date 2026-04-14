import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  time: string;
}

const suggestions = [
  "Объясни теорему Пифагора",
  "Как решить квадратное уравнение?",
  "Что такое производная?",
  "Интегрирование по частям",
];

const sampleResponses: Record<string, string> = {
  default: "Отличный вопрос! 🧮 Давайте разберём это шаг за шагом. Математика — это язык вселенной, и каждая задача имеет своё элегантное решение. Опишите подробнее, что именно вас интересует, и я помогу разобраться!",
};

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "Привет! Я твой математический помощник 🚀 Задай любой вопрос по математике — от школьной программы до высшей математики. Я объясню понятно и с примерами!",
      time: "сейчас",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text, time: now }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: sampleResponses.default,
          time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1800);
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="chat-avatar">∑</div>
        <div>
          <div className="chat-title">МатПомощник</div>
          <div className="chat-status"><span className="status-dot" />Онлайн</div>
        </div>
        <div className="chat-level-badge">Средний</div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`msg-row msg-row--${msg.role}`}>
            {msg.role === "assistant" && <div className="msg-avatar">∑</div>}
            <div className={`msg-bubble msg-bubble--${msg.role}`}>
              <p>{msg.text}</p>
              <span className="msg-time">{msg.time}</span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="msg-row msg-row--assistant">
            <div className="msg-avatar">∑</div>
            <div className="msg-bubble msg-bubble--assistant typing-bubble">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-suggestions">
        {suggestions.map((s) => (
          <button key={s} className="suggestion-chip" onClick={() => sendMessage(s)}>
            {s}
          </button>
        ))}
      </div>

      <div className="chat-input-bar">
        <input
          className="chat-input"
          placeholder="Задай вопрос по математике..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
        />
        <button className="send-btn" onClick={() => sendMessage(input)}>
          <Icon name="Send" size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
