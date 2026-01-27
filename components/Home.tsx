
import React, { useState, useEffect } from 'react';
import { generateDailyQuote } from '../services/geminiService';
import { FeedItem } from '../types';

const MOCK_FEED: FeedItem[] = [
  { id: '1', user: '민지', avatar: 'https://picsum.photos/seed/mj/40/40', content: '오늘 날씨가 너무 좋네요! 다들 산책 다녀오셨나요? 2026년 봄은 참 따뜻해요.', time: '2분 전', type: 'diary', likes: 12, comments: 4 },
  { id: '2', user: '현우', avatar: 'https://picsum.photos/seed/hw/40/40', content: '작년 이맘때 우리 속초 갔던 거 기억나? AI가 복원해준 사진 보니까 진짜 대박임 ㅋㅋ', time: '1시간 전', type: 'photo', likes: 45, comments: 12 },
  { id: '3', user: '지수', avatar: 'https://picsum.photos/seed/js/40/40', content: '새로운 BGM 샀는데 너무 제 스타일이에요! 놀러오세요.', time: '3시간 전', type: 'club', likes: 8, comments: 2 },
];

const Home: React.FC = () => {
  const [quote, setQuote] = useState('오늘의 감성을 불러오는 중...');

  useEffect(() => {
    generateDailyQuote().then(setQuote);
  }, []);

  return (
    <div className="p-8 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Upper Section: AI Quote & Friends */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">좋은 하루예요, <span className="text-cy-orange">김싸이</span>님!</h2>
          <div className="mt-2 flex items-center text-sm font-bold text-orange-400 bg-orange-50 px-4 py-2 rounded-2xl border border-orange-100 w-fit">
            <span className="mr-2">🌤</span> {quote}
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-white p-2 pr-4 rounded-full border border-gray-100 shadow-sm">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm hover:z-10 transition-all cursor-pointer">
                <img src={`https://picsum.photos/seed/fr-${i}/40/40`} alt="Friend" />
              </div>
            ))}
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">+12 FRIENDS ONLINE</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Feed Column */}
        <div className="lg:col-span-2 space-y-10">
          {/* Memory Card (5 Years Ago) */}
          <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
               <span className="text-9xl">📸</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-orange-500/40">5 Years Ago Today</div>
                <span className="text-xs text-gray-400 font-bold">2021.05.22</span>
              </div>
              <h4 className="text-2xl font-black leading-tight mb-4">"한강에서 처음으로 자전거를 배웠던 날..."</h4>
              <p className="text-sm text-gray-400 mb-8 max-w-md">당시 작성했던 일기와 12장의 사진이 보관되어 있습니다. AI가 이 기억을 바탕으로 특별한 추억 영상을 제작했습니다.</p>
              <button className="bg-white text-black px-6 py-3 rounded-full text-xs font-black hover:bg-orange-500 hover:text-white transition-all transform group-hover:translate-x-2">기억 복원하여 영상 보기 🎞️</button>
            </div>
          </section>

          {/* Friends Feed */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
               <h3 className="text-xl font-black text-gray-800 flex items-center">
                  <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-3 shadow-lg shadow-blue-500/30" />
                  일촌들의 실시간 소식
               </h3>
               <button className="text-[10px] font-black text-gray-400 hover:text-orange-500 tracking-widest uppercase">View All</button>
            </div>
            
            <div className="space-y-4">
              {MOCK_FEED.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                   <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                         <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-50 overflow-hidden">
                            <img src={item.avatar} alt={item.user} />
                         </div>
                         <div>
                            <p className="text-sm font-black text-gray-800">{item.user}</p>
                            <p className="text-[10px] text-gray-400 font-bold">{item.time}</p>
                         </div>
                      </div>
                      <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-widest ${
                        item.type === 'diary' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'
                      }`}>
                        {item.type}
                      </span>
                   </div>
                   <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium">{item.content}</p>
                   <div className="flex items-center space-x-6 border-t border-gray-50 pt-4">
                      <button className="flex items-center text-[11px] font-black text-gray-400 hover:text-orange-500 transition-colors">
                        <span className="mr-1.5">🧡</span> 공감 {item.likes}
                      </button>
                      <button className="flex items-center text-[11px] font-black text-gray-400 hover:text-blue-500 transition-colors">
                        <span className="mr-1.5">💬</span> 댓글 {item.comments}
                      </button>
                      <button className="ml-auto text-[11px] font-black text-gray-300 hover:text-gray-900 transition-colors">공유하기</button>
                   </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Dashboard Column */}
        <div className="space-y-8">
          {/* Visitor Log Widget */}
          <section className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-xl shadow-gray-200/20">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center justify-between">
              <span>👣 Visitor Logs</span>
              <span className="text-orange-500">TODAY 42</span>
            </h4>
            <div className="space-y-6">
              {[
                { name: '지수', action: '다이어리에 공감했어요.', time: '방금 전' },
                { name: '현우', action: '미니룸을 구경했어요.', time: '12분 전' },
                { name: '영희', action: '선물을 보냈어요!', time: '1시간 전' },
              ].map((v, i) => (
                <div key={i} className="flex items-start space-x-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 flex-shrink-0 border border-orange-100 overflow-hidden group-hover:scale-105 transition-transform">
                    <img src={`https://picsum.photos/seed/v-${v.name}/40/40`} alt={v.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-tight font-medium text-gray-700">
                      <span className="font-black text-gray-900">{v.name}</span>님이 {v.action}
                    </p>
                    <p className="text-[9px] text-gray-300 mt-1 font-bold">{v.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-gray-50 text-gray-400 rounded-2xl text-[10px] font-black hover:bg-gray-100 hover:text-gray-600 transition-colors uppercase tracking-widest">See Full Log</button>
          </section>

          {/* Relationship Goal Card */}
          <section className="bg-indigo-600 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20 group">
             <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
             <h4 className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-6">Relational Depth</h4>
             <div className="flex justify-between items-end mb-4">
                <div>
                   <p className="text-3xl font-black tracking-tighter">Life Friend</p>
                   <p className="text-[10px] text-indigo-200 font-medium mt-1">민지님과 1,250일째 함께하는 중</p>
                </div>
                <div className="text-4xl animate-pulse">🤝</div>
             </div>
             <div className="h-1.5 w-full bg-indigo-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-400 to-rose-400 w-[85%] rounded-full" />
             </div>
             <button className="w-full mt-6 py-2.5 bg-white/10 backdrop-blur rounded-xl text-[10px] font-black hover:bg-white/20 transition-colors border border-white/10 uppercase tracking-widest">Check Connection</button>
          </section>

          {/* AI Sentiment Analysis Mini */}
          <section className="bg-orange-50 border border-orange-100 rounded-[40px] p-8">
            <h4 className="text-xs font-black text-orange-400 uppercase tracking-widest mb-6">Weekly Mood Flow</h4>
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl">😊</span>
              <div>
                 <p className="text-xs font-black text-gray-800">대체로 '행복함'</p>
                 <p className="text-[9px] text-orange-400 font-bold">지난주보다 15% 상승</p>
              </div>
            </div>
            <div className="h-24 w-full bg-white/60 rounded-3xl border border-orange-100 flex items-end p-4 space-x-2">
              {[40, 65, 30, 95, 75, 50, 85].map((h, i) => (
                <div key={i} className="flex-1 bg-orange-400 rounded-t-lg group relative" style={{ height: `${h}%` }}>
                   <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">{h}%</div>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-orange-300 mt-4 text-center font-bold">AI가 분석한 나의 감성 건강 지표입니다.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
