
import React, { useState } from 'react';
import { ChatMessage } from '../types';

const MOCK_MESSAGES: ChatMessage[] = [
  { id: '1', senderId: 'u1', senderName: '민지', content: '이번주 토요일 모임 잊지 않았지? 우리 반 다 모여야 해!', time: '오전 10:20', type: 'text' },
  { id: '2', senderId: 'me', senderName: '나', content: '당연하지! 내가 추억 영상 고화질로 복원해올게 ㅋㅋ', time: '오전 10:25', type: 'text' },
  { id: '3', senderId: 'u2', senderName: '현우', content: '벌써 설렌다. 도토리 상점에서 스티커 좀 더 사둬야겠어.', time: '오전 10:30', type: 'text' },
];

const GroupBand: React.FC<{ groupName: string; onBack: () => void }> = ({ groupName, onBack }) => {
  const [view, setView] = useState<'chat' | 'feed' | 'album'>('chat');
  const [input, setInput] = useState('');

  return (
    <div className="h-full flex flex-col bg-gray-50 animate-in fade-in duration-500">
      {/* Group Header */}
      <header className="bg-white px-8 py-6 border-b border-gray-100 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="w-10 h-10 rounded-full hover:bg-gray-50 flex items-center justify-center transition-colors">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div>
            <h3 className="text-xl font-black text-gray-800">{groupName}</h3>
            <p className="text-[10px] text-green-500 font-black uppercase tracking-widest">Active Now • 24 Members</p>
          </div>
        </div>
        <div className="flex space-x-2">
           <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-orange-50 hover:text-orange-500 transition-colors">📅</button>
           <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-orange-50 hover:text-orange-500 transition-colors">⚙️</button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="bg-white px-8 flex space-x-8 border-b border-gray-50 shadow-sm z-10">
        {['chat', 'feed', 'album'].map(t => (
          <button 
            key={t}
            onClick={() => setView(t as any)}
            className={`py-4 text-xs font-black uppercase tracking-[0.2em] relative transition-colors ${
              view === t ? 'text-gray-900' : 'text-gray-300 hover:text-gray-500'
            }`}
          >
            {t}
            {view === t && <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-900 rounded-full" />}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {view === 'chat' && (
          <div className="space-y-6">
            {MOCK_MESSAGES.map(m => (
              <div key={m.id} className={`flex ${m.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${m.senderId === 'me' ? 'items-end' : 'items-start'} flex flex-col`}>
                  {m.senderId !== 'me' && <span className="text-[10px] font-black text-gray-400 mb-1 ml-2">{m.senderName}</span>}
                  <div className={`px-5 py-3 rounded-[24px] text-sm shadow-sm ${
                    m.senderId === 'me' ? 'bg-gray-900 text-white rounded-tr-none' : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                  }`}>
                    {m.content}
                  </div>
                  <span className="text-[8px] text-gray-300 font-bold mt-1 px-1">{m.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'feed' && (
          <div className="max-w-xl mx-auto space-y-6">
             <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-xl">📢</div>
                  <div>
                    <p className="text-xs font-black text-gray-800">모임 공지</p>
                    <p className="text-[9px] text-gray-400">방장 • 2시간 전</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">이번주 토요일 7시, 강남역 '그 시절 카페'에서 만나요. 못 오는 사람은 도토리 5알 벌금입니다!</p>
             </div>
             {[1,2].map(i => (
                <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                   <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
                        <img src={`https://picsum.photos/seed/p-${i}/40/40`} alt="User" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-800">민지</p>
                        <p className="text-[9px] text-gray-400">오후 2시</p>
                      </div>
                   </div>
                   <p className="text-sm text-gray-600 mb-4 font-medium">졸업앨범 스캔한 거 드디어 다 올렸다! 우리 진짜 앳되다 ㅋㅋ</p>
                   <div className="grid grid-cols-2 gap-2">
                      <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden"><img src="https://picsum.photos/seed/y1/200/200" className="w-full h-full object-cover" /></div>
                      <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden"><img src="https://picsum.photos/seed/y2/200/200" className="w-full h-full object-cover" /></div>
                   </div>
                </div>
             ))}
          </div>
        )}

        {view === 'album' && (
          <div className="grid grid-cols-3 gap-4">
             {[1,2,3,4,5,6,7,8,9].map(i => (
                <div key={i} className="aspect-square bg-white rounded-3xl border border-gray-100 overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all">
                  <img src={`https://picsum.photos/seed/alb-${i}/300/300`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
             ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      {view === 'chat' && (
        <div className="bg-white p-6 border-t border-gray-100 flex items-center space-x-4">
          <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-orange-50 transition-colors">➕</button>
          <input 
            type="text" 
            placeholder="메시지를 입력하세요..."
            className="flex-1 bg-gray-50 border-none px-6 py-3 rounded-full text-sm focus:ring-2 focus:ring-orange-100 transition-all outline-none font-medium"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-orange-500 transition-all shadow-lg">🚀</button>
        </div>
      )}
    </div>
  );
};

export default GroupBand;
