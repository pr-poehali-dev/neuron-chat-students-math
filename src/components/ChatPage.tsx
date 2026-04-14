import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Mode = "explainer" | "teacher";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  time: string;
}

const CHAT_URL = "https://functions.poehali.dev/83731913-a646-4d03-9d18-f055ecf8f355";

const MODE_CONFIG: Record<Mode, {
  label: string;
  icon: string;
  desc: string;
  avatarGrad: string;
  statusText: string;
  placeholder: string;
  welcome: string;
}> = {
  explainer: {
    label: "Объяснитель",
    icon: "BookOpen",
    desc: "Понятные объяснения с примерами",
    avatarGrad: "linear-gradient(135deg, #7c3aed, #06b6d4)",
    statusText: "Готов объяснять",
    placeholder: "Задай вопрос по математике...",
    welcome: "Привет! Я объясню любую математическую тему понятно и с примерами 🚀 Что хочешь разобрать?",
  },
  teacher: {
    label: "Преподаватель",
    icon: "GraduationCap",
    desc: "Наводящие вопросы для глубокого понимания",
    avatarGrad: "linear-gradient(135deg, #f97316, #ec4899)",
    statusText: "Задаёт вопросы",
    placeholder: "Опиши задачу или тему...",
    welcome: "Хорошо, давай подумаем вместе 🎓 Расскажи, с какой задачей или темой ты работаешь — и мы разберём её через диалог. Я буду задавать вопросы, а не давать готовые ответы.",
  },
};

const suggestions: Record<Mode, string[]> = {
  explainer: ["Что такое производная?", "Объясни интеграл", "Теорема Пифагора", "Формула дискриминанта"],
  teacher: ["Помоги решить x²-5x+6=0", "Не понимаю пределы", "Задача на вероятность", "Как брать производную?"],
};

const ChatPage = () => {
  const [mode, setMode] = useState<Mode>("explainer");
  const [showModePanel, setShowModePanel] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "assistant", text: MODE_CONFIG.explainer.welcome, time: "сейчас" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const cfg = MODE_CONFIG[mode];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const switchMode = (newMode: Mode) => {
    if (newMode === mode) { setShowModePanel(false); return; }
    setMode(newMode);
    setShowModePanel(false);
    const now = new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" });
    setMessages([{ id: Date.now(), role: "assistant", text: MODE_CONFIG[newMode].welcome, time: now }]);
    setInput("");
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    const now = new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = { id: Date.now(), role: "user", text, time: now };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);
    try {
      const history = updatedMessages.map((m) => ({ role: m.role, content: m.text }));
      const res = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, mode }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        text: data.reply || "Произошла ошибка. Попробуй ещё раз.",
        time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      }]);
    } catch {
      setMessages((prev) => [...prev, {
        id: Date.now() + 1, role: "assistant",
        text: "Нет связи с сервером. Проверь соединение.", time: now,
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="chat-avatar" style={{ background: cfg.avatarGrad }}>
          {mode === "explainer" ? "∑" : "?"}
        </div>
        <div style={{ flex: 1 }}>
          <div className="chat-title">МатПомощник</div>
          <div className="chat-status">
            <span className={`status-dot ${mode === "teacher" ? "status-dot--orange" : ""}`} />
            {cfg.statusText}
          </div>
        </div>
        <button className={`mode-toggle-btn mode-toggle-btn--${mode}`} onClick={() => setShowModePanel(!showModePanel)}>
          <Icon name={cfg.icon} size={14} />
          {cfg.label}
          <Icon name={showModePanel ? "ChevronUp" : "ChevronDown"} size={12} />
        </button>
      </div>

      {showModePanel && (
        <div className="mode-panel">
          <div className="mode-panel-title">Выбери режим помощника</div>
          <div className="mode-options">
            {(Object.keys(MODE_CONFIG) as Mode[]).map((m) => (
              <button
                key={m}
                className={`mode-option mode-option--${m} ${m === mode ? "mode-option--active" : ""}`}
                onClick={() => switchMode(m)}
              >
                <div className={`mode-option-icon mode-option-icon--${m}`}>
                  <Icon name={MODE_CONFIG[m].icon} size={22} />
                </div>
                <div className="mode-option-info">
                  <div className="mode-option-label">{MODE_CONFIG[m].label}</div>
                  <div className="mode-option-desc">{MODE_CONFIG[m].desc}</div>
                </div>
                {m === mode && (
                  <div className="mode-option-check">
                    <Icon name="Check" size={14} />
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="mode-panel-hint">
            {mode === "teacher"
              ? "🎓 Преподаватель не даёт готовые ответы — только наводит вопросами"
              : "💡 Объяснитель разбирает тему по шагам с примерами и аналогиями"}
          </div>
        </div>
      )}

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`msg-row msg-row--${msg.role}`}>
            {msg.role === "assistant" && (
              <div className="msg-avatar" style={{ background: cfg.avatarGrad }}>
                {mode === "explainer" ? "∑" : "?"}
              </div>
            )}
            <div className={`msg-bubble msg-bubble--${msg.role} ${msg.role === "assistant" && mode === "teacher" ? "msg-bubble--teacher" : ""}`}>
              <p style={{ whiteSpace: "pre-wrap" }}>{msg.text}</p>
              <span className="msg-time">{msg.time}</span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="msg-row msg-row--assistant">
            <div className="msg-avatar" style={{ background: cfg.avatarGrad }}>
              {mode === "explainer" ? "∑" : "?"}
            </div>
            <div className="msg-bubble msg-bubble--assistant typing-bubble">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-suggestions">
        {suggestions[mode].map((s) => (
          <button key={s} className={`suggestion-chip suggestion-chip--${mode}`} onClick={() => sendMessage(s)}>
            {s}
          </button>
        ))}
      </div>

      <div className="chat-input-bar">
        <input
          className={`chat-input chat-input--${mode}`}
          placeholder={cfg.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
          disabled={isTyping}
        />
        <button
          className={`send-btn send-btn--${mode}`}
          onClick={() => sendMessage(input)}
          disabled={isTyping || !input.trim()}
        >
          <Icon name="Send" size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
