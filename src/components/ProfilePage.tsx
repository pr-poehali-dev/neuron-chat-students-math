import Icon from "@/components/ui/icon";
import { Page } from "@/pages/Index";

interface ProfilePageProps {
  onNavigate: (page: Page) => void;
}

const stats = [
  { label: "Задач решено", value: "47", icon: "CheckCircle", color: "stat--green" },
  { label: "Серия дней", value: "12", icon: "Flame", color: "stat--orange" },
  { label: "Тем изучено", value: "8", icon: "BookOpen", color: "stat--violet" },
  { label: "Формул сохранено", value: "23", icon: "Sigma", color: "stat--cyan" },
];

const recentActivity = [
  { topic: "Производные", task: "Нашёл f'(x) = 3x² + 4x", time: "2 ч назад", emoji: "📈" },
  { topic: "Теорвер", task: "Вычислил P(A) = 0.625", time: "5 ч назад", emoji: "🎲" },
  { topic: "Алгебра", task: "Квадратное уравнение x²-5x+6=0", time: "вчера", emoji: "📐" },
];

const progressData = [
  { topic: "Алгебра", progress: 72 },
  { topic: "Геометрия", progress: 45 },
  { topic: "Анализ", progress: 58 },
  { topic: "Теорвер", progress: 30 },
];

const ProfilePage = ({ onNavigate }: ProfilePageProps) => {
  return (
    <div className="section-page">
      <div className="profile-hero">
        <div className="profile-avatar">А</div>
        <div className="profile-info">
          <h2 className="profile-name">Алексей Иванов</h2>
          <p className="profile-role">Студент · 2 курс</p>
          <div className="profile-level">
            <span className="level-badge">⭐ Уровень: Средний</span>
          </div>
        </div>
        <button className="settings-btn" onClick={() => onNavigate("settings")}>
          <Icon name="Settings" size={20} />
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <Icon name={s.icon} size={22} />
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="profile-section">
        <h3 className="profile-section-title">Прогресс по темам</h3>
        <div className="progress-list">
          {progressData.map((p) => (
            <div key={p.topic} className="progress-item">
              <div className="progress-item-top">
                <span>{p.topic}</span>
                <span className="progress-pct">{p.progress}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${p.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="profile-section">
        <h3 className="profile-section-title">Недавняя активность</h3>
        <div className="activity-list">
          {recentActivity.map((a, i) => (
            <div key={i} className="activity-item">
              <span className="activity-emoji">{a.emoji}</span>
              <div className="activity-info">
                <div className="activity-topic">{a.topic}</div>
                <div className="activity-task">{a.task}</div>
              </div>
              <span className="activity-time">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
