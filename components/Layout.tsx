import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: '홈', icon: '🏠' },
    { id: 'minihome', label: '미니홈피', icon: '🖼️' },
    { id: 'diary', label: '다이어리', icon: '✍️' },
    { id: 'photo', label: '사진첩', icon: '📸' },
    { id: 'club', label: '클럽', icon: '🏘️' },
    { id: 'guest', label: '추억', icon: '⏳' },
    { id: 'jukebox', label: '상점', icon: '💎' },
  ];

  return (
    <div className="min-h-screen bg-[#8db6cd] flex items-center justify-center p-4 md:p-10 selection:bg-orange-200">
      {/* 2026 Sleek Cyworld Frame */}
      <div className="w-full max-w-6xl h-[90vh] bg-white rounded-[40px] border-[12px] border-[#222] shadow-[24px_24px_0px_0px_rgba(0,0,0,0.1)] flex relative overflow-hidden">
        
        {/* Top Header Bar - Optimized for "추억과 낭만월드" */}
        <div className="absolute top-0 left-0 w-full h-14 md:h-16 lg:h-20 header-gradient flex items-center px-6 md:px-10 lg:px-14 justify-between z-50 border-b border-white/5 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            {/* Mac-style Buttons */}
            <div className="hidden sm:flex space-x-1.5 mr-4">
              <div className="w-2.5 h-2.5 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
              <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
            </div>
            {/* New Platform Name: 추억과 낭만월드 */}
            <h1 className="brand-title text-white text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
              추억과 낭만월드
            </h1>
          </div>

          <div className="flex space-x-4 md:space-x-8 items-center">
             <div className="flex items-center text-[#7CFC9F] text-[10px] md:text-xs font-black uppercase tracking-widest">
                <span className="hidden sm:inline mr-2 text-white/40">●</span>
                <span className="hidden sm:inline">LIVE SYNC ACTIVE</span>
                <span className="sm:hidden text-lg">●</span>
             </div>
             <button className="text-white/30 hover:text-white transition-all duration-300">
               <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
               </svg>
             </button>
          </div>
        </div>

        {/* Sidebar Navigation - Adjusted margin-top to match header height */}
        <div className="w-72 bg-gray-50/50 border-r border-gray-100 mt-14 md:mt-16 lg:mt-20 flex flex-col backdrop-blur-sm">
          <div className="p-8 text-center">
            <div className="w-40 h-52 mx-auto bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-white mb-6 relative group transform hover:rotate-1 transition-transform cursor-pointer">
              <img src="https://picsum.photos/seed/profile-2026/200/300" alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white text-[10px] font-bold text-left">추억을 잇는 중...</p>
              </div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-0.5 rounded-full text-[8px] font-black text-gray-800 shadow-sm">
                NOW 420
              </div>
            </div>
            <h2 className="font-black text-xl text-gray-800">김싸이</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">@saikim_2026</p>
            
            <div className="mt-6 flex flex-wrap gap-1.5 justify-center px-4">
              <span className="bg-white border border-gray-100 text-gray-500 text-[9px] font-bold px-3 py-1 rounded-full shadow-sm">#추억중독</span>
              <span className="bg-white border border-gray-100 text-gray-500 text-[9px] font-bold px-3 py-1 rounded-full shadow-sm">#2000s</span>
            </div>
          </div>

          <nav className="flex-1 px-6 space-y-1.5 overflow-y-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-5 py-3.5 rounded-2xl flex items-center transition-all duration-300 group ${
                  activeTab === tab.id 
                    ? 'bg-gray-900 text-white shadow-lg -translate-y-0.5' 
                    : 'text-gray-400 hover:bg-white hover:text-gray-800 hover:shadow-sm'
                }`}
              >
                <span className={`mr-4 text-xl transition-transform group-hover:scale-110 ${activeTab === tab.id ? 'scale-110' : ''}`}>
                  {tab.icon}
                </span>
                <span className="font-bold text-sm">{tab.label}</span>
                {activeTab === tab.id && (
                   <div className="ml-auto w-1.5 h-1.5 bg-orange-400 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Social Stats Mini Card */}
          <div className="p-6">
            <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-10">
                 <span className="text-4xl">🔗</span>
               </div>
               <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-3">Relationship Network</p>
               <div className="flex items-center justify-between">
                 <div className="text-center">
                   <p className="text-sm font-black text-gray-800">128</p>
                   <p className="text-[8px] font-bold text-gray-400">일촌</p>
                 </div>
                 <div className="h-6 w-px bg-gray-100" />
                 <div className="text-center">
                   <p className="text-sm font-black text-gray-800">1.2K</p>
                   <p className="text-[8px] font-bold text-gray-400">추억</p>
                 </div>
                 <div className="h-6 w-px bg-gray-100" />
                 <div className="text-center">
                   <p className="text-sm font-black text-gray-800">42</p>
                   <p className="text-[8px] font-bold text-gray-400">클럽</p>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - Adjusted margin-top to match header height */}
        <div className="flex-1 mt-14 md:mt-16 lg:mt-20 bg-white overflow-y-auto scroll-smooth">
          {children}
          
          {/* Floating Player (Glassmorphic) */}
          <div className="fixed bottom-10 left-[50%] -translate-x-1/2 md:translate-x-0 md:left-auto md:right-10 bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/40 rounded-full px-5 py-3 flex items-center space-x-5 z-[100] hover:scale-105 transition-transform cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center animate-spin-slow">
                <span className="text-white text-xs">💿</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white" />
            </div>
            <div className="min-w-[120px]">
              <div className="text-[10px] font-black text-gray-800 truncate leading-tight uppercase tracking-tight">Y (Please Tell Me Why)</div>
              <div className="text-[8px] text-gray-400 font-bold">Freestyle / Classic Remix 2026</div>
            </div>
            <div className="flex items-center space-x-3 text-gray-400">
              <button className="hover:text-gray-900 transition-colors">⏮️</button>
              <button className="hover:text-gray-900 transition-colors">⏸️</button>
              <button className="hover:text-gray-900 transition-colors">⏭️</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;