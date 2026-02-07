
import React from 'react';
import { useTranslations } from '../i18n.tsx';
import LanguageSwitcher from './LanguageSwitcher.tsx';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const t = useTranslations('common');
  
  const tabs = [
    { id: 'home', label: t('nav.home'), icon: '🏠' },
    { id: 'minihome', label: t('nav.minihome'), icon: '🖼️' },
    { id: 'diary', label: t('nav.diary'), icon: '✍️' },
    { id: 'photo', label: t('nav.photo'), icon: '📸' },
    { id: 'club', label: t('nav.club'), icon: '🏘️' },
    { id: 'guest', label: t('nav.guest'), icon: '⏳' },
    { id: 'jukebox', label: t('nav.jukebox'), icon: '💎' },
  ];

  return (
    <div className="min-h-screen bg-[#8db6cd] flex items-center justify-center p-0 md:p-6 lg:p-10 selection:bg-orange-200 overflow-hidden">
      {/* 2026 Sleek Cyworld Frame */}
      <div className="w-full max-w-7xl h-screen md:h-[92vh] bg-white rounded-none md:rounded-[48px] border-0 md:border-[14px] border-[#222] shadow-[40px_40px_0px_0px_rgba(0,0,0,0.15)] flex flex-col relative overflow-hidden transition-all duration-500">
        
        {/* Responsive Brand Header */}
        <header className="header-gradient h-16 md:h-20 flex items-center px-6 md:px-10 justify-between shrink-0 border-b border-white/5 backdrop-blur-md z-[60]">
          <div className="flex items-center">
            {/* Window Controls (PC only) */}
            <div className="hidden md:flex space-x-2 mr-6">
              <div className="w-3 h-3 bg-rose-500 rounded-full" />
              <div className="w-3 h-3 bg-amber-500 rounded-full" />
              <div className="w-3 h-3 bg-emerald-500 rounded-full" />
            </div>
            {/* Title */}
            <h1 className="brand-title text-white text-lg md:text-xl lg:text-2xl font-bold tracking-widest whitespace-nowrap">
              {t('meta.siteName')}
            </h1>
          </div>

          <div className="flex items-center space-x-6">
            <LanguageSwitcher />
            <div className="flex items-center text-[#7CFC9F] text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
               <span className="hidden sm:inline mr-2 text-white/30 tracking-normal">●</span>
               <span className="hidden sm:inline">LIVE SYNC ACTIVE</span>
               <span className="sm:hidden text-lg">●</span>
            </div>
            <button className="text-white/30 hover:text-white transition-all">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
            </button>
          </div>
        </header>

        {/* Dynamic Responsive Layout Container */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          
          {/* Sidebar / Profile Area (Sticky on PC, Scrollable on Mobile) */}
          <aside className="w-full lg:w-72 bg-gray-50/50 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col backdrop-blur-sm shrink-0 overflow-y-auto max-h-[40vh] lg:max-h-full">
            <div className="p-6 md:p-8 text-center">
              <div className="w-32 h-44 md:w-44 md:h-56 mx-auto bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-white mb-6 relative group transform hover:rotate-1 transition-transform cursor-pointer">
                <img src="https://picsum.photos/seed/profile-2026/200/300" alt="Profile" className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-0.5 rounded-full text-[8px] font-black text-gray-800 shadow-sm">
                  NOW 420
                </div>
              </div>
              <h2 className="font-black text-xl text-gray-800">김싸이</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">@saikim_2026</p>
              
              <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
                <span className="bg-white border border-gray-100 text-gray-500 text-[9px] font-bold px-3 py-1 rounded-full shadow-sm">#추억중독</span>
                <span className="bg-white border border-gray-100 text-gray-500 text-[9px] font-bold px-3 py-1 rounded-full shadow-sm">#2000s</span>
              </div>
            </div>

            <nav className="flex-1 px-4 md:px-6 space-y-1 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-5 py-3 rounded-2xl flex items-center transition-all duration-300 group ${
                    activeTab === tab.id 
                      ? 'bg-gray-900 text-white shadow-lg -translate-y-0.5' 
                      : 'text-gray-400 hover:bg-white hover:text-gray-800'
                  }`}
                >
                  <span className={`mr-4 text-xl ${activeTab === tab.id ? 'scale-110' : ''}`}>{tab.icon}</span>
                  <span className="font-bold text-sm">{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Relationship Stats (Hidden on small mobile if needed, but keeping for now) */}
            <div className="hidden lg:block p-6 mt-auto">
              <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 relative overflow-hidden">
                 <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-3">Relationship Network</p>
                 <div className="flex items-center justify-between">
                   <div className="text-center">
                     <p className="text-sm font-black text-gray-800">128</p>
                     <p className="text-[8px] font-bold text-gray-400">일촌</p>
                   </div>
                   <div className="text-center">
                     <p className="text-sm font-black text-gray-800">1.2K</p>
                     <p className="text-[8px] font-bold text-gray-400">추억</p>
                   </div>
                   <div className="text-center">
                     <p className="text-sm font-black text-gray-800">42</p>
                     <p className="text-[8px] font-bold text-gray-400">클럽</p>
                   </div>
                 </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area (Scrollable) */}
          <main className="flex-1 bg-white overflow-y-auto scroll-smooth pb-32">
            {children}
          </main>

        </div>


      </div>
    </div>
  );
};

export default Layout;