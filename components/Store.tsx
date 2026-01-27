
import React from 'react';
import { StoreItem } from '../types';

const STORE_ITEMS: StoreItem[] = [
  { id: '1', name: '감성 레트로 룸 스킨', price: 15, category: 'skin', icon: '🎨' },
  { id: '2', name: 'Y (Please Tell Me Why) - Freestyle', price: 7, category: 'bgm', icon: '🎵' },
  { id: '3', name: 'AI 추억 복원사 서비스', price: 10, category: 'ai', icon: '🧠' },
  { id: '4', name: '일촌 응원 리액션 스티커', price: 3, category: 'item', icon: '🎁' },
  { id: '5', name: '2005 PC 클래식 테마', price: 20, category: 'skin', icon: '💻' },
  { id: '6', name: '응급실 (classic ver.)', price: 7, category: 'bgm', icon: '💿' },
  { id: '7', name: 'AI 추억 스토리북 PDF', price: 25, category: 'ai', icon: '📖' },
  { id: '8', name: '추억 영상 4K 고화질권', price: 12, category: 'ai', icon: '🎞️' },
];

const Store: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">도토리 상점</h2>
          <p className="text-sm text-gray-400 font-bold mt-2">"당신의 기억을 더 아름답게 장식하는 감성 아이템"</p>
        </div>
        <div className="bg-orange-500 px-6 py-4 rounded-[32px] shadow-2xl shadow-orange-500/30 flex items-center border-4 border-white">
          <span className="text-white font-black text-xs mr-3 uppercase tracking-widest">My Balance</span>
          <span className="text-2xl font-black text-white">1,250 💎</span>
        </div>
      </header>

      {/* Categories */}
      <div className="flex space-x-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
         {['ALL', 'SKIN', 'BGM', 'AI SERVICES', 'STICKERS'].map(cat => (
            <button key={cat} className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all ${
               cat === 'ALL' ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-gray-400 hover:bg-gray-50'
            }`}>
               {cat}
            </button>
         ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {STORE_ITEMS.map((item) => (
          <div key={item.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group flex flex-col">
            <div className="text-5xl mb-6 bg-gray-50 w-20 h-20 flex items-center justify-center rounded-3xl group-hover:bg-orange-50 transition-colors group-hover:rotate-6">
              {item.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-black text-gray-900 mb-1 leading-tight">{item.name}</h4>
              <div className="text-[9px] text-gray-300 uppercase font-black tracking-widest mb-4">
                Category: {item.category}
              </div>
            </div>
            <button className="w-full bg-gray-900 text-white py-3.5 rounded-2xl text-[10px] font-black hover:bg-orange-500 transition-all flex items-center justify-center shadow-lg shadow-gray-900/10 uppercase tracking-widest">
              {item.price} 도토리로 구매
            </button>
          </div>
        ))}
      </div>
      
      {/* Gifting Section */}
      <div className="mt-20 bg-gradient-to-br from-indigo-600 to-purple-700 p-12 rounded-[50px] shadow-3xl shadow-indigo-500/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-16 opacity-10 transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform">
           <span className="text-9xl text-white font-black">GIFT</span>
        </div>
        <div className="relative z-10 max-w-lg">
          <h4 className="text-3xl font-black text-white mb-4">🎁 일촌에게 감성을 선물하세요</h4>
          <p className="text-sm text-indigo-100 font-medium mb-8 leading-relaxed italic opacity-80">
            "가끔은 말보다 도토리 한 알이 더 큰 위로가 됩니다."<br/>
            소중한 친구의 미니룸에 어울리는 새로운 BGM이나 스킨을 선물해보세요.
          </p>
          <div className="flex space-x-4">
             <button className="bg-white text-indigo-600 px-8 py-3.5 rounded-2xl font-black text-xs shadow-xl hover:scale-105 transition-transform">친구 목록 선택하기</button>
             <button className="bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-2xl font-black text-xs hover:bg-white/20 transition-colors">선물함 확인</button>
          </div>
        </div>
      </div>

      <footer className="mt-24 text-center py-10 border-t border-gray-50">
         <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.2em]">Cyworld Dotori Economy System v2.6</p>
      </footer>
    </div>
  );
};

export default Store;
