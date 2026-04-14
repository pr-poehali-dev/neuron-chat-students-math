import { useState } from "react";
import Icon from "@/components/ui/icon";

const SettingsPage = () => {
  const [difficulty, setDifficulty] = useState("Средний");
  const [notifications, setNotifications] = useState(true);
  const [hints, setHints] = useState(true);
  const [stepByStep, setStepByStep] = useState(true);
  const [topics, setTopics] = useState(["Алгебра", "Анализ"]);

  const allTopics = ["Алгебра", "Геометрия", "Анализ", "Теорвер", "Дискретная математика", "Линейная алгебра"];
  const difficulties = ["Лёгкий", "Средний", "Сложный", "Олимпийский"];

  const toggleTopic = (t: string) => {
    setTopics((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
  };

  return (
    <div className="section-page">
      <div className="section-header">
        <h1 className="section-title">Настройки</h1>
        <p className="section-sub">Персонализируй свой опыт обучения</p>
      </div>

      <div className="settings-group">
        <div className="settings-group-title">
          <Icon name="BarChart2" size={18} /> Уровень сложности
        </div>
        <div className="difficulty-options">
          {difficulties.map((d) => (
            <button
              key={d}
              className={`difficulty-btn ${difficulty === d ? "difficulty-btn--active" : ""}`}
              onClick={() => setDifficulty(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-group">
        <div className="settings-group-title">
          <Icon name="BookOpen" size={18} /> Предпочтительные темы
        </div>
        <div className="topics-checkboxes">
          {allTopics.map((t) => (
            <button
              key={t}
              className={`topic-checkbox ${topics.includes(t) ? "topic-checkbox--active" : ""}`}
              onClick={() => toggleTopic(t)}
            >
              {topics.includes(t) && <Icon name="Check" size={14} />}
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-group">
        <div className="settings-group-title">
          <Icon name="Sliders" size={18} /> Параметры чата
        </div>
        <div className="toggle-list">
          <div className="toggle-item">
            <div className="toggle-info">
              <div className="toggle-label">Подсказки</div>
              <div className="toggle-desc">Показывать подсказки при решении</div>
            </div>
            <button className={`toggle-btn ${hints ? "toggle-btn--on" : ""}`} onClick={() => setHints(!hints)}>
              <span className="toggle-knob" />
            </button>
          </div>
          <div className="toggle-item">
            <div className="toggle-info">
              <div className="toggle-label">Пошаговые решения</div>
              <div className="toggle-desc">Разбивать ответы на шаги</div>
            </div>
            <button className={`toggle-btn ${stepByStep ? "toggle-btn--on" : ""}`} onClick={() => setStepByStep(!stepByStep)}>
              <span className="toggle-knob" />
            </button>
          </div>
          <div className="toggle-item">
            <div className="toggle-info">
              <div className="toggle-label">Уведомления</div>
              <div className="toggle-desc">Напоминания о занятиях</div>
            </div>
            <button className={`toggle-btn ${notifications ? "toggle-btn--on" : ""}`} onClick={() => setNotifications(!notifications)}>
              <span className="toggle-knob" />
            </button>
          </div>
        </div>
      </div>

      <button className="save-settings-btn">
        <Icon name="Save" size={18} />
        Сохранить настройки
      </button>
    </div>
  );
};

export default SettingsPage;
