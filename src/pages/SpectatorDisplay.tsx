import React, { useState, useEffect } from 'react';
import { useMatch } from '../context/MatchContext';
import { SpectatorCricket } from '../components/spectator/SpectatorCricket';
import { SpectatorFootball } from '../components/spectator/SpectatorFootball';
import { SpectatorBasketball } from '../components/spectator/SpectatorBasketball';
import { SpectatorVolleyball } from '../components/spectator/SpectatorVolleyball';
import { SpectatorHandball } from '../components/spectator/SpectatorHandball';
import { EventSplashBanner } from '../components/common/EventSplashBanner';
import { Maximize2, Minimize2, Radio, AlertCircle } from 'lucide-react';

export const SpectatorDisplay: React.FC = () => {
  const { activeMatch, eventBanner, setActiveTab } = useMatch();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  if (!activeMatch) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-slate-500" />
        <h2 className="text-3xl font-extrabold text-slate-100">No Live Scoreboard Signal</h2>
        <p className="text-slate-400 max-w-md text-sm">
          No live match is currently active. Open Referee Control or create a new match to stream the live scoreboard.
        </p>
        <button
          onClick={() => setActiveTab('create')}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-500"
        >
          Create Match
        </button>
      </div>
    );
  }

  const renderSportSpectator = () => {
    switch (activeMatch.sport) {
      case 'cricket': return <SpectatorCricket match={activeMatch} />;
      case 'football': return <SpectatorFootball match={activeMatch} />;
      case 'basketball': return <SpectatorBasketball match={activeMatch} />;
      case 'volleyball': return <SpectatorVolleyball match={activeMatch} />;
      case 'handball': return <SpectatorHandball match={activeMatch} />;
      default: return <SpectatorFootball match={activeMatch} />;
    }
  };

  return (
    <div className={`relative min-h-[calc(100vh-80px)] bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden select-none ${
      isFullscreen ? 'fixed inset-0 z-50 min-h-screen p-4 md:p-8' : ''
    }`}>
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Control Bar */}
      <div className="absolute top-4 right-4 z-40 flex items-center gap-3">
        <button
          onClick={() => setActiveTab('referee')}
          className="px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-xs font-bold transition-all backdrop-blur-md flex items-center gap-2"
        >
          <Radio className="w-3.5 h-3.5 text-emerald-400" />
          <span>Referee Control</span>
        </button>

        <button
          onClick={toggleFullscreen}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg flex items-center gap-2"
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="w-4 h-4" />
              <span>Exit Full Screen</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-4 h-4" />
              <span>FULL SCREEN</span>
            </>
          )}
        </button>
      </div>

      {/* Animated Splash Banners */}
      {eventBanner && (
        <EventSplashBanner
          title={eventBanner.title}
          subtitle={eventBanner.subtitle}
          type={eventBanner.type}
        />
      )}

      {/* Main Sport Spectator Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col justify-center">
        {renderSportSpectator()}
      </div>
    </div>
  );
};
