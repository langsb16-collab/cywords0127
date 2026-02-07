
import React, { useState } from 'react';
import Layout from './components/Layout.tsx';
import Home from './components/Home.tsx';
import Diary from './components/Diary.tsx';
import Store from './components/Store.tsx';
import MemoryTimeline from './components/MemoryTimeline.tsx';
import Miniroom from './components/Miniroom.tsx';
import Clubs from './components/Clubs.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userMood, setUserMood] = useState('포근함 ☁️');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'minihome':
        return <Miniroom />;
      case 'diary':
        return <Diary />;
      case 'photo':
        return (
          <div className="p-8 max-w-5xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-700">
             <header className="text-center py-20 bg-gray-50 rounded-[60px] relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-20 opacity-5 grayscale group-hover:grayscale-0 transition-all">
                  <span className="text-9xl">📸</span>
               </div>
               <span className="text-7xl mb-8 block animate-bounce-slow">🎞️</span>
               <h2 className="text-4xl font-black text-gray-900 tracking-tight">AI 추억 복원 시스템 3.0</h2>
               <p className="text-base text-gray-400 mt-4 font-bold italic">"빛바랜 사진부터 흐릿한 기억까지, AI가 선명하게 되살립니다."</p>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="bg-white p-12 rounded-[50px] border-4 border-dashed border-gray-100 flex flex-col items-center justify-center space-y-8 hover:border-orange-300 transition-all group cursor-pointer hover:shadow-3xl hover:shadow-orange-500/5">
                  <div className="w-24 h-24 bg-orange-50 rounded-[40px] flex items-center justify-center text-5xl group-hover:scale-110 transition-transform group-hover:rotate-3 shadow-inner">➕</div>
                  <div className="text-center">
                    <p className="font-black text-xl text-gray-900">과거 사진 업로드</p>
                    <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-widest">AI Super Resolution 4K</p>
                  </div>
               </div>
               <div className="bg-white p-12 rounded-[50px] border-4 border-dashed border-gray-100 flex flex-col items-center justify-center space-y-8 hover:border-blue-300 transition-all group cursor-pointer hover:shadow-3xl hover:shadow-blue-500/5">
                  <div className="w-24 h-24 bg-blue-50 rounded-[40px] flex items-center justify-center text-5xl group-hover:scale-110 transition-transform group-hover:-rotate-3 shadow-inner">🎬</div>
                  <div className="text-center">
                    <p className="font-black text-xl text-gray-900">추억 하이라이트</p>
                    <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-widest">AI Cinematic Video Editor</p>
                  </div>
               </div>
             </div>
             
             <div className="bg-gray-900 rounded-[60px] p-16 text-white mt-12 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-16 opacity-10 group-hover:opacity-20 transition-opacity">
                   <span className="text-[200px] leading-none font-black select-none">RESTORE</span>
                </div>
                <div className="relative z-10">
                  <h4 className="text-2xl font-black mb-8 flex items-center">
                    <span className="w-3 h-3 bg-orange-500 rounded-full mr-4 animate-pulse" />
                    최근 복원된 갤러리
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                     {[1,2,3,4].map(i => (
                        <div key={i} className="aspect-square bg-white/5 rounded-3xl border border-white/10 overflow-hidden group cursor-pointer relative">
                           <img src={`https://picsum.photos/seed/hist-res-${i}/300/300`} alt="History" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                              <span className="text-[10px] font-black uppercase tracking-widest">Enhanced by AI</span>
                           </div>
                        </div>
                     ))}
                  </div>
                  <button className="mt-12 w-full py-4 border border-white/20 rounded-2xl text-xs font-black hover:bg-white/10 transition-all uppercase tracking-widest">전체 갤러리 보기</button>
                </div>
             </div>
          </div>
        );
      case 'minihome':
        return (
          <div className="p-8 max-w-4xl mx-auto space-y-10">
            <header className="flex justify-between items-center mb-6">
               <h3 className="text-2xl font-black text-gray-800 tracking-tight">나의 미니홈피 Reborn 3.0</h3>
               <div className="flex space-x-2">
                 <button className="px-4 py-2 bg-gray-100 rounded-full text-[10px] font-black hover:bg-orange-500 hover:text-white transition-all">공간 편집</button>
                 <button className="px-4 py-2 bg-gray-100 rounded-full text-[10px] font-black hover:bg-orange-500 hover:text-white transition-all">방문자 관리</button>
               </div>
            </header>
            <Miniroom mood={userMood} />
            <div className="grid grid-cols-3 gap-6">
               <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
                  <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Total Visitors</p>
                  <p className="text-2xl font-black text-gray-800">1,254,020</p>
               </div>
               <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
                  <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Memory Grade</p>
                  <p className="text-2xl font-black text-orange-500">LEGENDARY</p>
               </div>
               <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
                  <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Active Friends</p>
                  <p className="text-2xl font-black text-gray-800">128</p>
               </div>
            </div>
          </div>
        );
      case 'jukebox':
        return <Store />;
      case 'guest':
        return <MemoryTimeline />;
      case 'club':
        return <Clubs />;
      default:
        return null;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
