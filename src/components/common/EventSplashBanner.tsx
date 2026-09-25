import React from 'react';

interface EventSplashBannerProps {
  title: string;
  subtitle?: string;
  type?: string;
}

export const EventSplashBanner: React.FC<EventSplashBannerProps> = ({ title, subtitle, type = 'goal' }) => {
  const getGradient = () => {
    switch (type) {
      case 'goal':
        return 'from-emerald-600 via-teal-500 to-emerald-600 text-white border-emerald-400';
      case 'wicket':
        return 'from-red-600 via-rose-600 to-amber-600 text-white border-red-400';
      default:
        return 'from-blue-600 via-indigo-600 to-purple-600 text-white border-blue-400';
    }
  };

  return (
    <div className="fixed inset-x-0 top-1/4 z-50 flex items-center justify-center p-4 pointer-events-none animate-splash">
      <div className={`relative px-12 py-8 rounded-3xl bg-gradient-to-r ${getGradient()} border-4 shadow-[0_0_80px_rgba(16,185,129,0.5)] text-center transform scale-110 backdrop-blur-lg`}>
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter uppercase drop-shadow-lg animate-pulse">
          {title}
        </h1>
        {subtitle && (
          <p className="text-2xl md:text-3xl font-bold mt-2 text-white/90 tracking-wide">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
