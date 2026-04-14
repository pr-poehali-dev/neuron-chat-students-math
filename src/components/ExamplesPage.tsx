import { useState } from "react";
import Icon from "@/components/ui/icon";

const categories = ["Все", "Алгебра", "Геометрия", "Анализ", "Теорвер"];

const examples = [
  {
    id: 1,
    category: "Алгебра",
    title: "Квадратное уравнение",
    difficulty: "Базовый",
    problem: "Решить: x² - 5x + 6 = 0",
    steps: ["Дискриминант: D = 25 - 24 = 1", "x₁ = (5 + 1) / 2 = 3", "x₂ = (5 - 1) / 2 = 2"],
    answer: "x₁ = 3, x₂ = 2",
    emoji: "📐",
  },
  {
    id: 2,
    category: "Анализ",
    title: "Производная функции",
    difficulty: "Средний",
    problem: "Найти f'(x), если f(x) = x³ + 2x² - 5x + 1",
    steps: ["Дифференцируем каждое слагаемое", "(x³)' = 3x²", "(2x²)' = 4x", "(-5x)' = -5"],
    answer: "f'(x) = 3x² + 4x - 5",
    emoji: "📈",
  },
  {
    id: 3,
    category: "Геометрия",
    title: "Теорема Пифагора",
    difficulty: "Базовый",
    problem: "Катеты прямоугольного треугольника: a = 3, b = 4. Найти гипотенузу c.",
    steps: ["c² = a² + b²", "c² = 9 + 16 = 25", "c = √25"],
    answer: "c = 5",
    emoji: "📏",
  },
  {
    id: 4,
    category: "Теорвер",
    title: "Вероятность события",
    difficulty: "Средний",
    problem: "В урне 5 белых и 3 чёрных шара. Вероятность вытащить белый?",
    steps: ["Общее число шаров: 8", "Число благоприятных: 5", "P = 5/8"],
    answer: "P = 0.625 (62.5%)",
    emoji: "🎲",
  },
  {
    id: 5,
    category: "Алгебра",
    title: "Логарифмическое уравнение",
    difficulty: "Сложный",
    problem: "Решить: log₂(x) + log₂(x-2) = 3",
    steps: ["log₂(x(x-2)) = 3", "x(x-2) = 8", "x² - 2x - 8 = 0", "D = 4 + 32 = 36", "x = (2 ± 6) / 2"],
    answer: "x = 4 (x = -2 не входит в ОДЗ)",
    emoji: "🔢",
  },
  {
    id: 6,
    category: "Анализ",
    title: "Интеграл",
    difficulty: "Сложный",
    problem: "Вычислить: ∫(2x + 3)dx",
    steps: ["∫2x dx + ∫3 dx", "x² + 3x + C"],
    answer: "x² + 3x + C",
    emoji: "∫",
  },
];

const diffColor: Record<string, string> = {
  Базовый: "diff--easy",
  Средний: "diff--medium",
  Сложный: "diff--hard",
};

const ExamplesPage = () => {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = examples.filter(
    (e) => activeCategory === "Все" || e.category === activeCategory
  );

  return (
    <div className="section-page">
      <div className="section-header">
        <h1 className="section-title">Примеры задач</h1>
        <p className="section-sub">Разобранные решения с пошаговым объяснением</p>
      </div>

      <div className="filter-tabs">
        {categories.map((c) => (
          <button
            key={c}
            className={`filter-tab ${activeCategory === c ? "filter-tab--active" : ""}`}
            onClick={() => setActiveCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="examples-list">
        {filtered.map((ex) => (
          <div key={ex.id} className="example-card" onClick={() => setExpandedId(expandedId === ex.id ? null : ex.id)}>
            <div className="example-card-top">
              <span className="example-emoji">{ex.emoji}</span>
              <div className="example-info">
                <div className="example-title">{ex.title}</div>
                <div className="example-meta">
                  <span className="example-category">{ex.category}</span>
                  <span className={`diff-badge ${diffColor[ex.difficulty]}`}>{ex.difficulty}</span>
                </div>
              </div>
              <Icon name={expandedId === ex.id ? "ChevronUp" : "ChevronDown"} size={18} />
            </div>
            <div className="example-problem">{ex.problem}</div>
            {expandedId === ex.id && (
              <div className="example-solution">
                <div className="solution-steps">
                  {ex.steps.map((step, i) => (
                    <div key={i} className="solution-step">
                      <span className="step-num">{i + 1}</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
                <div className="solution-answer">
                  <Icon name="CheckCircle" size={16} />
                  <strong>Ответ:</strong> {ex.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamplesPage;
