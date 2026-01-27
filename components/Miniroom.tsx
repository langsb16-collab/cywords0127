
import React from 'react';

const Miniroom: React.FC<{ mood: string }> = ({ mood }) => {
  return (
    <div className="relative w-full h-[320px] bg-sky-50 rounded-2xl overflow-hidden border-2 border-white shadow-lg flex flex-col items-center justify-end group">
      {/* 3D Depth Layer 1: Sky/Wall */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 to-white/20" />
      
      {/* 3D Depth Layer 2: Grid/Floor */}
      <div className="absolute bottom-0 w-[140%] h-[180px] bg-orange-50 border-t-2 border-orange-200 transform -rotate-x-45 origin-bottom-center shadow-inner"
           style={{ transform: 'perspective(500px) rotateX(45deg)' }}>
        <div className="w-full h-full bg-[linear-gradient(90deg,rgba(255,107,0,0.05)_1px,transparent_1px),linear-gradient(rgba(255,107,0,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      {/* Characters */}
      <div className="relative z-10 flex items-end justify-center space-x-6 mb-12">
        {/* Main Character */}
        <div className="relative group/minimi cursor-pointer animate-float">
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-2xl text-[10px] shadow-xl border border-orange-100 whitespace-nowrap opacity-0 group-hover/minimi:opacity-100 transition-all transform scale-90 group-hover/minimi:scale-100">
             오늘 기분: {mood} ✨
          </div>
          <div className="w-14 h-20 bg-white rounded-2xl border-2 border-orange-200 overflow-hidden shadow-lg transform group-hover/minimi:rotate-3 transition-transform">
            <img src="https://picsum.photos/seed/avatar1/60/100" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* AI Pet */}
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-md animate-bounce-slow">
          <span className="text-sm">🐱</span>
        </div>
      </div>

      {/* Furniture/Decor (Pixelish) */}
      <div className="absolute bottom-10 left-10 w-16 h-12 bg-orange-200/50 border-2 border-orange-300 rounded shadow-sm flex items-center justify-center">
        <span className="text-lg">📺</span>
      </div>
      <div className="absolute bottom-14 right-12 w-10 h-10 bg-green-200/50 border-2 border-green-300 rounded-full flex items-center justify-center shadow-sm">
        <span className="text-lg">🌵</span>
      </div>

      {/* Floating Info Overlay */}
      <div className="absolute top-4 left-4 flex space-x-2">
        <div className="glass px-3 py-1 rounded-full text-[10px] font-bold text-gray-500 flex items-center">
           <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse" />
           NOW ONLINE
        </div>
      </div>
      <div className="absolute top-4 right-4 text-right">
        <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Digital Room ID</div>
        <div className="text-xs font-black text-gray-700">#2026-CY-001</div>
      </div>
    </div>
  );
};

export default Miniroom;
