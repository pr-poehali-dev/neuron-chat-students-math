import { useState } from "react";
import Icon from "@/components/ui/icon";

const formulaGroups = [
  {
    id: 1,
    title: "Алгебра",
    emoji: "📐",
    formulas: [
      { name: "Квадратный трёхчлен", formula: "ax² + bx + c = 0", note: "Общая форма" },
      { name: "Дискриминант", formula: "D = b² - 4ac", note: "Для квадратного уравнения" },
      { name: "Формула корней", formula: "x = (-b ± √D) / 2a", note: "При D ≥ 0" },
      { name: "Теорема Виета", formula: "x₁+x₂ = -b/a,  x₁·x₂ = c/a", note: "" },
      { name: "Бином Ньютона", formula: "(a+b)ⁿ = Σ Cₙᵏ aⁿ⁻ᵏ bᵏ", note: "" },
    ],
  },
  {
    id: 2,
    title: "Тригонометрия",
    emoji: "🔄",
    formulas: [
      { name: "Основное тождество", formula: "sin²x + cos²x = 1", note: "" },
      { name: "Тангенс", formula: "tg x = sin x / cos x", note: "" },
      { name: "Синус двойного угла", formula: "sin 2x = 2 sin x cos x", note: "" },
      { name: "Косинус двойного угла", formula: "cos 2x = cos²x - sin²x", note: "" },
      { name: "Формула сложения", formula: "sin(α±β) = sinα cosβ ± cosα sinβ", note: "" },
    ],
  },
  {
    id: 3,
    title: "Производные",
    emoji: "📈",
    formulas: [
      { name: "Степенная функция", formula: "(xⁿ)' = n·xⁿ⁻¹", note: "" },
      { name: "Синус", formula: "(sin x)' = cos x", note: "" },
      { name: "Косинус", formula: "(cos x)' = -sin x", note: "" },
      { name: "Экспонента", formula: "(eˣ)' = eˣ", note: "" },
      { name: "Логарифм", formula: "(ln x)' = 1/x", note: "x > 0" },
      { name: "Произведение", formula: "(uv)' = u'v + uv'", note: "" },
      { name: "Частное", formula: "(u/v)' = (u'v - uv') / v²", note: "v ≠ 0" },
    ],
  },
  {
    id: 4,
    title: "Интегралы",
    emoji: "∫",
    formulas: [
      { name: "Степень", formula: "∫xⁿ dx = xⁿ⁺¹/(n+1) + C", note: "n ≠ -1" },
      { name: "Единица / x", formula: "∫(1/x) dx = ln|x| + C", note: "" },
      { name: "Экспонента", formula: "∫eˣ dx = eˣ + C", note: "" },
      { name: "Синус", formula: "∫sin x dx = -cos x + C", note: "" },
      { name: "Косинус", formula: "∫cos x dx = sin x + C", note: "" },
    ],
  },
  {
    id: 5,
    title: "Геометрия",
    emoji: "📏",
    formulas: [
      { name: "Площадь круга", formula: "S = πr²", note: "" },
      { name: "Длина окружности", formula: "C = 2πr", note: "" },
      { name: "Теорема Пифагора", formula: "c² = a² + b²", note: "Прямоугольный треугольник" },
      { name: "Площадь треугольника", formula: "S = ½ · a · h", note: "" },
      { name: "Формула Герона", formula: "S = √(p(p-a)(p-b)(p-c))", note: "p = (a+b+c)/2" },
      { name: "Объём шара", formula: "V = (4/3)πr³", note: "" },
    ],
  },
  {
    id: 6,
    title: "Теория вероятностей",
    emoji: "🎲",
    formulas: [
      { name: "Классическая вероятность", formula: "P(A) = m / n", note: "m — благоприятные, n — все" },
      { name: "Условная вероятность", formula: "P(A|B) = P(AB) / P(B)", note: "" },
      { name: "Формула полной вероятности", formula: "P(A) = Σ P(Hᵢ)·P(A|Hᵢ)", note: "" },
      { name: "Сочетания", formula: "Cₙᵏ = n! / (k!(n-k)!)", note: "" },
      { name: "Размещения", formula: "Aₙᵏ = n! / (n-k)!", note: "" },
    ],
  },
];

const FormulasPage = () => {
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (formula: string) => {
    navigator.clipboard.writeText(formula);
    setCopied(formula);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="section-page">
      <div className="section-header">
        <h1 className="section-title">Справочник формул</h1>
        <p className="section-sub">Все ключевые формулы и теоремы в одном месте</p>
      </div>

      <div className="formulas-groups">
        {formulaGroups.map((group) => (
          <div key={group.id} className="formula-group">
            <button
              className={`formula-group-header ${activeGroup === group.id ? "formula-group-header--open" : ""}`}
              onClick={() => setActiveGroup(activeGroup === group.id ? null : group.id)}
            >
              <span>{group.emoji} {group.title}</span>
              <div className="formula-group-meta">
                <span className="formula-count">{group.formulas.length}</span>
                <Icon name={activeGroup === group.id ? "ChevronUp" : "ChevronDown"} size={18} />
              </div>
            </button>
            {activeGroup === group.id && (
              <div className="formula-list">
                {group.formulas.map((f) => (
                  <div key={f.name} className="formula-item">
                    <div className="formula-item-info">
                      <span className="formula-name">{f.name}</span>
                      {f.note && <span className="formula-note">{f.note}</span>}
                    </div>
                    <div className="formula-value-wrap">
                      <span className="formula-value">{f.formula}</span>
                      <button className="copy-btn" onClick={() => handleCopy(f.formula)}>
                        <Icon name={copied === f.formula ? "Check" : "Copy"} size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormulasPage;
