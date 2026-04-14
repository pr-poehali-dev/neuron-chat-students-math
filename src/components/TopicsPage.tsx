import { useState } from "react";
import Icon from "@/components/ui/icon";

const topics = [
  {
    id: 1,
    icon: "📐",
    title: "Алгебра",
    desc: "Уравнения, неравенства, функции, многочлены",
    color: "topic--violet",
    count: 42,
    subtopics: ["Линейные уравнения", "Квадратные уравнения", "Системы уравнений", "Функции", "Прогрессии"],
  },
  {
    id: 2,
    icon: "📏",
    title: "Геометрия",
    desc: "Планиметрия, стереометрия, тригонометрия",
    color: "topic--cyan",
    count: 38,
    subtopics: ["Треугольники", "Окружности", "Четырёхугольники", "Объёмные тела", "Тригонометрия"],
  },
  {
    id: 3,
    icon: "📈",
    title: "Математический анализ",
    desc: "Пределы, производные, интегралы, ряды",
    color: "topic--orange",
    count: 56,
    subtopics: ["Пределы", "Производная", "Интеграл", "Ряды Тейлора", "Дифференциальные уравнения"],
  },
  {
    id: 4,
    icon: "🎲",
    title: "Теория вероятностей",
    desc: "Вероятность, случайные величины, статистика",
    color: "topic--green",
    count: 29,
    subtopics: ["Классическая вероятность", "Условная вероятность", "Случайные величины", "Распределения", "Статистика"],
  },
  {
    id: 5,
    icon: "🔢",
    title: "Дискретная математика",
    desc: "Комбинаторика, теория графов, логика",
    color: "topic--pink",
    count: 31,
    subtopics: ["Комбинаторика", "Теория графов", "Математическая логика", "Множества", "Индукция"],
  },
  {
    id: 6,
    icon: "🧮",
    title: "Линейная алгебра",
    desc: "Векторы, матрицы, определители, пространства",
    color: "topic--yellow",
    count: 44,
    subtopics: ["Матрицы", "Определители", "СЛАУ", "Собственные значения", "Векторные пространства"],
  },
];

const TopicsPage = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="section-page">
      <div className="section-header">
        <h1 className="section-title">Математические темы</h1>
        <p className="section-sub">Выбери раздел и изучай с примерами и объяснениями</p>
      </div>

      <div className="topics-grid">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className={`topic-card ${topic.color}`}
            onClick={() => setExpandedId(expandedId === topic.id ? null : topic.id)}
          >
            <div className="topic-card-head">
              <span className="topic-icon">{topic.icon}</span>
              <div className="topic-count">{topic.count} тем</div>
            </div>
            <div className="topic-title">{topic.title}</div>
            <div className="topic-desc">{topic.desc}</div>
            {expandedId === topic.id && (
              <div className="topic-subtopics">
                {topic.subtopics.map((s) => (
                  <div key={s} className="subtopic-item">
                    <Icon name="ChevronRight" size={14} />
                    {s}
                  </div>
                ))}
              </div>
            )}
            <div className="topic-arrow">
              <Icon name={expandedId === topic.id ? "ChevronUp" : "ArrowRight"} size={18} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsPage;
