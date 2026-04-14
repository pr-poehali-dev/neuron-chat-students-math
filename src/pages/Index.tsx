import { useState } from "react";
import ChatPage from "@/components/ChatPage";
import ProfilePage from "@/components/ProfilePage";
import TopicsPage from "@/components/TopicsPage";
import ExamplesPage from "@/components/ExamplesPage";
import FormulasPage from "@/components/FormulasPage";
import SettingsPage from "@/components/SettingsPage";
import NavBar from "@/components/NavBar";

export type Page = "chat" | "examples" | "topics" | "formulas" | "profile" | "settings";

const Index = () => {
  const [activePage, setActivePage] = useState<Page>("chat");

  const renderPage = () => {
    switch (activePage) {
      case "chat": return <ChatPage />;
      case "examples": return <ExamplesPage />;
      case "topics": return <TopicsPage />;
      case "formulas": return <FormulasPage />;
      case "profile": return <ProfilePage onNavigate={setActivePage} />;
      case "settings": return <SettingsPage />;
    }
  };

  return (
    <div className="app-shell">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <main className="page-content">
        {renderPage()}
      </main>
      <NavBar activePage={activePage} onNavigate={setActivePage} />
    </div>
  );
};

export default Index;
