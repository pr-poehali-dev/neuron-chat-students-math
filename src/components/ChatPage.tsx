import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Mode = "explainer" | "teacher";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  time: string;
}

const MOCK_REPLIES: Record<Mode, Record<string, string>> = {
  explainer: {
    "Что такое производная?": `Производная — это скорость изменения функции в точке 📈

Представь, что ты едешь на машине. Функция f(x) — это твой путь, а производная f'(x) — это спидометр, показывающий скорость прямо сейчас.

Формально: f'(x) = lim (f(x+h) - f(x)) / h при h→0

Пример: если f(x) = x², то f'(x) = 2x
• При x=3: скорость изменения = 6
• При x=0: функция в минимуме, скорость = 0

Производная используется везде: физика, экономика, машинное обучение.`,
    "Объясни интеграл": `Интеграл — это площадь под графиком функции 📊

Если производная — это «разбить на мгновения», то интеграл — «собрать всё обратно».

∫f(x)dx — неопределённый интеграл (находим семейство функций)
∫ₐᵇ f(x)dx — определённый интеграл (конкретное число = площадь)

Пример: ∫2x dx = x² + C
Проверка: берём производную x² → получаем 2x ✅

Таблица базовых интегралов:
• ∫xⁿ dx = xⁿ⁺¹/(n+1) + C
• ∫eˣ dx = eˣ + C
• ∫sin x dx = −cos x + C`,
    "Теорема Пифагора": `Теорема Пифагора — основа геометрии 📐

В прямоугольном треугольнике:
a² + b² = c²
где c — гипотенуза (сторона напротив прямого угла)

Пример: катеты a=3, b=4
→ c² = 9 + 16 = 25
→ c = 5

Тройка (3, 4, 5) — «египетский треугольник», самая известная.

Другие пифагоровы тройки: (5,12,13), (8,15,17)

Применяется в навигации, строительстве, компьютерной графике.`,
    "Формула дискриминанта": `Дискриминант определяет количество корней квадратного уравнения 🔢

Для уравнения ax² + bx + c = 0:
D = b² − 4ac

• D > 0 → два различных корня: x = (−b ± √D) / 2a
• D = 0 → один корень (двойной): x = −b / 2a
• D < 0 → корней нет (в ℝ)

Пример: x² − 5x + 6 = 0
D = 25 − 24 = 1 > 0
x₁ = (5+1)/2 = 3
x₂ = (5−1)/2 = 2`,
    default: `Отличный вопрос! Давай разберём по шагам 🧮

1. Сначала определим, к какому разделу относится задача
2. Вспомним нужные формулы и теоремы
3. Решим пример и проверим ответ

Уточни вопрос подробнее — и я объясню максимально понятно!`,
  },
  teacher: {
    "Помоги решить x²-5x+6=0": `Хорошо, давай думать вместе. Это квадратное уравнение.

Скажи мне: какие методы решения квадратных уравнений ты знаешь? 🤔`,
    "Не понимаю пределы": `Интересно. А что именно вызывает затруднение?

Попробуй своими словами ответить: что, на твой взгляд, пытается «сделать» предел функции при x→a? К чему он стремится?`,
    "Задача на вероятность": `Прежде чем решать — давай разберём условие.

Ты можешь сформулировать: что в этой задаче является «благоприятным исходом» и сколько всего возможных исходов? 🎲`,
    "Как брать производную?": `Хороший вопрос. Начнём с основ.

Как ты думаешь: если функция f(x) = x², то в точке x=2 она растёт быстро или медленно? Как бы ты это описал числом? 📈`,
    default: `Понял тебя. Прежде чем двигаться дальше — ответь на вопрос:

Что ты уже знаешь по этой теме? Даже если кажется, что ничего — попробуй сформулировать своё предположение. Это важный шаг 🎓`,
  },
};

const getReply = (mode: Mode, text: string): string => {
  const replies = MOCK_REPLIES[mode];
  const key = Object.keys(replies).find((k) => k !== "default" && text.toLowerCase().includes(k.toLowerCase().slice(0, 10)));
  return replies[key ?? "default"] ?? replies["default"];
};

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

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;
    const now = new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text, time: now }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        text: getReply(mode, text),
        time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      }]);
    }, 1200 + Math.random() * 600);
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