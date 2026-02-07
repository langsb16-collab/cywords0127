
import React, { useState, useEffect } from 'react';
import { generateDailyQuote } from '../services/geminiService';
import { FeedItem } from '../types';
import { useTranslations } from '../i18n.tsx';

const MOCK_FEED: FeedItem[] = [
  { id: '1', user: '민지', avatar: 'https://picsum.photos/seed/mj/40/40', content: '오늘 날씨가 너무 좋네요! 다들 산책 다녀오셨나요? 2026년 봄은 참 따뜻해요.', time: '2분 전', type: 'diary', likes: 12, comments: 4 },
  { id: '2', user: '현우', avatar: 'https://picsum.photos/seed/hw/40/40', content: '작년 이맘때 우리 속초 갔던 거 기억나? AI가 복원해준 사진 보니까 진짜 대박임 ㅋㅋ', time: '1시간 전', type: 'photo', likes: 45, comments: 12 },
  { id: '3', user: '지수', avatar: 'https://picsum.photos/seed/js/40/40', content: '새로운 BGM 샀는데 너무 제 스타일이에요! 놀러오세요.', time: '3시간 전', type: 'club', likes: 8, comments: 2 },
];

const Home: React.FC = () => {
  const t = useTranslations('common');
  const [quote, setQuote] = useState('오늘의 감성을 불러오는 중...');

  useEffect(() => {
    generateDailyQuote().then(setQuote);
  }, []);

  return (
    <div className="p-6 md:p-8 lg:p-10 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Header Info */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex-1 space-y-3">
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-none">
            {t('home.greeting')}, <span className="text-cy-orange">김싸이</span>님!
          </h2>
          <div className="inline-flex items-center text-xs font-bold text-orange-500 bg-orange-50 px-5 py-2.5 rounded-2xl border border-orange-100 shadow-sm">
            <span className="mr-2 text-base">🌤</span> {quote}
          </div>
        </div>
        <div className="flex items-center space-x-4 bg-white p-2.5 pr-6 rounded-full border border-gray-100 shadow-sm">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm hover:z-10 transition-all cursor-pointer">
                <img src={`https://picsum.photos/seed/fr-${i}/40/40`} alt="Friend" />
              </div>
            ))}
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] whitespace-nowrap">+12 Online</span>
        </div>
      </header>

      {/* Main 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left/Center Combined: Main Feed (8 cols on PC) */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Featured Memory Card */}
          <section className="bg-gradient-to-br from-gray-900 to-black p-8 md:p-12 rounded-[48px] text-white shadow-3xl relative overflow-hidden group cursor-pointer transition-all hover:scale-[1.01]">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
               <span className="text-[160px] leading-none">📸</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-orange-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-orange-500/40">5 Years Ago Today</div>
                <span className="text-xs text-white/40 font-bold">2021.05.22</span>
              </div>
              <h4 className="text-2xl md:text-4xl font-black leading-tight mb-6 max-w-lg">
                "한강에서 처음으로 자전거를 배웠던 날..."
              </h4>
              <p className="text-sm md:text-base text-gray-400 mb-10 max-w-md leading-relaxed">
                당시 작성했던 일기와 12장의 사진이 보관되어 있습니다. AI가 이 기억을 바탕으로 특별한 추억 영상을 제작했습니다.
              </p>
              <button className="bg-white text-black px-8 py-4 rounded-full text-xs font-black hover:bg-orange-500 hover:text-white transition-all transform hover:translate-x-3 flex items-center shadow-2xl">
                기억 복원하여 영상 보기 <span className="ml-2">🎞️</span>
              </button>
            </div>
          </section>

          {/* Friends Activity Feed */}
          <section className="space-y-8">
            <div className="flex items-center justify-between px-2">
               <h3 className="text-2xl font-black text-gray-900 flex items-center tracking-tight">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-4 shadow-lg shadow-blue-500/30" />
                  {t('home.friendsActivity')}
               </h3>
               <button className="text-[10px] font-black text-gray-400 hover:text-orange-500 tracking-widest uppercase transition-colors">{t('home.viewAll')}</button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {MOCK_FEED.map((item) => (
                <div key={item.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group">
                   <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                         <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-50 overflow-hidden shadow-inner">
                            <img src={item.avatar} alt={item.user} className="w-full h-full object-cover" />
                         </div>
                         <div>
                            <p className="text-base font-black text-gray-900">{item.user}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{item.time}</p>
                         </div>
                      </div>
                      <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-sm ${
                        item.type === 'diary' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'
                      }`}>
                        {item.type}
                      </span>
                   </div>
                   <p className="text-base text-gray-600 leading-relaxed mb-8 font-medium">{item.content}</p>
                   <div className="flex items-center space-x-8 border-t border-gray-50 pt-6">
                      <button className="flex items-center text-xs font-black text-gray-400 hover:text-orange-500 transition-colors">
                        <span className="mr-2 text-lg">🧡</span> 공감 {item.likes}
                      </button>
                      <button className="flex items-center text-xs font-black text-gray-400 hover:text-blue-500 transition-colors">
                        <span className="mr-2 text-lg">💬</span> 댓글 {item.comments}
                      </button>
                      <button className="ml-auto text-xs font-black text-gray-300 hover:text-gray-900 transition-colors">공유</button>
                   </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar: Logs & Stats (4 cols on PC) */}
        <div className="lg:col-span-4 space-y-10">
          
          {/* Visitor Logs */}
          <section className="bg-white rounded-[48px] border border-gray-100 p-8 shadow-2xl shadow-gray-200/30 transition-all hover:shadow-gray-200/50">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center justify-between">
              <span>👣 Visitor Logs</span>
              <span className="text-orange-500 font-black">TODAY 42</span>
            </h4>
            <div className="space-y-8">
              {[
                { name: '지수', action: '다이어리에 공감했어요.', time: '방금 전', color: 'orange' },
                { name: '현우', action: '미니룸을 구경했어요.', time: '12분 전', color: 'blue' },
                { name: '영희', action: '선물을 보냈어요!', time: '1시간 전', color: 'indigo' },
              ].map((v, i) => (
                <div key={i} className="flex items-start space-x-4 group cursor-pointer transition-all">
                  <div className="w-12 h-12 rounded-[20px] bg-gray-50 flex-shrink-0 border border-gray-100 overflow-hidden group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm">
                    <img src={`https://picsum.photos/seed/v-${v.name}/48/48`} alt={v.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <p className="text-sm leading-tight font-medium text-gray-700">
                      <span className="font-black text-gray-900">{v.name}</span>님이 {v.action}
                    </p>
                    <p className="text-[10px] text-gray-300 mt-1 font-black uppercase tracking-tighter">{v.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 bg-gray-50 text-gray-400 rounded-2xl text-[10px] font-black hover:bg-gray-100 hover:text-gray-900 transition-all uppercase tracking-widest">See Full Log history</button>
          </section>

          {/* AI Mood Indicator */}
          <section className="bg-orange-50 border border-orange-100 rounded-[48px] p-8 lg:sticky lg:top-24">
            <h4 className="text-[10px] font-black text-orange-400 uppercase tracking-[0.3em] mb-8">Weekly Mood Flow</h4>
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-4xl animate-bounce-slow">😊</span>
              <div>
                 <p className="text-sm font-black text-gray-800 leading-none">대체로 '행복함'</p>
                 <p className="text-[10px] text-orange-400 font-black mt-2 uppercase">Analysis: 15% Higher than last week</p>
              </div>
            </div>
            <div className="h-28 w-full bg-white/60 rounded-[32px] border border-orange-100 flex items-end p-5 space-x-2.5 shadow-inner">
              {[40, 65, 35, 100, 80, 55, 90].map((h, i) => (
                <div key={i} className="flex-1 bg-orange-400 rounded-t-xl group relative cursor-help" style={{ height: `${h}%` }}>
                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-2 py-1 rounded-md font-black opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100">
                      {h}%
                   </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-orange-300 mt-6 text-center font-black leading-relaxed italic">"AI Memory Engine is constantly tracking your emotional growth."</p>
          </section>
        </div>

      </div>
    </div>
  );
};

export default Home;