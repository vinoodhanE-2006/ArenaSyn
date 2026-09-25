import React from 'react';
import { MatchProvider, useMatch } from './context/MatchContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { Toast } from './components/common/Toast';
import { Home } from './pages/Home';
import { CreateMatch } from './pages/CreateMatch';
import { RefereeControl } from './pages/RefereeControl';
import { SpectatorDisplay } from './pages/SpectatorDisplay';
import { MatchSummary } from './pages/MatchSummary';
import { MatchHistory } from './pages/MatchHistory';
import { Settings } from './pages/Settings';

const MainLayout: React.FC = () => {
  const { activeTab, toast } = useMatch();

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'create':
        return <CreateMatch />;
      case 'referee':
        return <RefereeControl />;
      case 'spectator':
        return <SpectatorDisplay />;
      case 'summary':
        return <MatchSummary />;
      case 'history':
        return <MatchHistory />;
      case 'settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  // If viewing spectator in full display tab without sidebar clutter
  if (activeTab === 'spectator') {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100">
        {toast && <Toast message={toast.message} type={toast.type} />}
        <SpectatorDisplay />
        <BottomNav />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      {toast && <Toast message={toast.message} type={toast.type} />}
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8 overflow-x-hidden">
          {renderContent()}
        </main>
      </div>

      <BottomNav />
    </div>
  );
};

export function App() {
  return (
    <MatchProvider>
      <MainLayout />
    </MatchProvider>
  );
}

export default App;
