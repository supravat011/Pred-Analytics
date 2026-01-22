import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import { PageRoute } from '../types';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path
      ? 'text-white text-sm font-medium bg-white/10 px-4 py-1.5 rounded-full transition-all border border-white/5'
      : 'text-zinc-400 text-sm hover:text-white hover:bg-white/5 px-4 py-1.5 rounded-full transition-all';
  };

  return (
    <nav className="fixed w-full z-50 top-6 px-6 flex items-center justify-between pointer-events-none">
      {/* Logo Pill - Left aligned */}
      <div className="glass rounded-full px-5 py-2.5 pointer-events-auto flex items-center gap-3">
        <Link to={PageRoute.HOME} className="flex-shrink-0 flex items-center gap-3 group">
          <div className="p-1.5 bg-orange-500/10 rounded-full group-hover:bg-orange-500/20 transition-colors border border-orange-500/10">
            <BrainCircuit className="h-5 w-5 text-orange-500" />
          </div>
          <span className="font-bold text-base text-zinc-100 tracking-tight group-hover:text-white transition-colors">Pred<span className="text-zinc-500">Analytics</span></span>
        </Link>
      </div>

      {/* Navigation Pill - Centered */}
      <div className="absolute left-1/2 -translate-x-1/2 glass rounded-full px-5 py-2 pointer-events-auto hidden sm:block">
        <div className="flex items-center space-x-1">
          <Link to={PageRoute.HOME} className={isActive(PageRoute.HOME)}>Home</Link>
          <Link to={PageRoute.DASHBOARD} className={isActive(PageRoute.DASHBOARD)}>Dashboard</Link>
          <Link to={PageRoute.VISUALIZATION} className={isActive(PageRoute.VISUALIZATION)}>Visuals</Link>
          <Link to={PageRoute.ABOUT} className={isActive(PageRoute.ABOUT)}>About</Link>
        </div>
      </div>

      {/* Empty div to balance flex if needed, or Auth button later */}
      <div className="w-[140px] hidden sm:block"></div>
    </nav>
  );
};

export default Navbar;