import Icon from "@/components/ui/icon";
import { Page } from "@/pages/Index";

interface NavBarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { id: Page; icon: string; label: string }[] = [
  { id: "chat", icon: "MessageCircle", label: "Чат" },
  { id: "examples", icon: "BookOpen", label: "Примеры" },
  { id: "topics", icon: "Grid3X3", label: "Темы" },
  { id: "formulas", icon: "Sigma", label: "Формулы" },
  { id: "profile", icon: "User", label: "Профиль" },
];

const NavBar = ({ activePage, onNavigate }: NavBarProps) => {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? "nav-item--active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <div className="nav-icon-wrap">
              <Icon name={item.icon} size={22} />
            </div>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
