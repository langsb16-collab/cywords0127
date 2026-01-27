
import React from 'react';
import { MemoryItem } from '../types';

const MOCK_MEMORIES: MemoryItem[] = [
  { 
    id: 'm1',
    year: '2026', 
    author: '민지', 
    content: '오늘 진짜 고생 많았어! 푹 쉬어. 우리 담주에 보기로 한 거 잊지마! 2026년형 싸이월드에서 너랑 이렇게 대화하니까 너무 좋다.', 
    type: 'LifeFriend', 
    icon: '🎂',
    subText: '생일 축하 메시지가 도착했습니다.'
  },
  { 
    id: 'm2',
    year: '2025', 
    author: '현우', 
    content: '작년 속초 여행 사진 보는데 또 가고 싶다 ㅠㅠ AI가 복원해준 고화질 사진 대박임. 도토리 모아서 상점에서 추억 영상 고화질권 사야겠어.', 
    type: 'MemoryFriend',
    image: 'https://picsum.photos/seed/travel-2025/600/300'
  },
  { 
    id: 'm3',
    year: '2024', 
    author: '동창회', 
    content: '다들 졸업하고 잘 지내지? 10주년 모임 한번 하자! 감성 클럽에 투표 올렸으니까 확인들 해~', 
    type: 'Ilchon',
    icon: '🎓'
  },
];

const MemoryTimeline: React.FC = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto animate-in slide-in-from-right-8 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          <h3 className="text-3xl font-black text-gray-900 tracking-tight">추억 타임머신</h3>
          <p className="text-sm text-gray-400 font-bold mt-2 italic">"당신의 모든 기억은 데이터 그 이상의 감동입니다."</p>
        </div>
        <div className="flex space-x-3">
           <button className="bg-gray-100 text-gray-500 px-5 py-2.5 rounded-full text-xs font-black hover:bg-gray-200 transition-colors">데이터 아카이브</button>
           <button className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-xs font-black hover:bg-orange-500 transition-all shadow-lg hover:shadow-orange-500/20">전체 앨범 다운로드</button>
        </div>
      </div>

      <div className="space-y-16 relative">
         {/* Vertical Timeline Line */}
         <div className="absolute top-0 left-7 w-1.5 h-full bg-gradient-to-b from-orange-400 via-gray-100 to-gray-50 rounded-full" />
         
         {MOCK_MEMORIES.map((item) => (
           <div key={item.id} className="relative pl-20 group">
              {/* Timeline Node */}
              <div className="absolute left-4 top-2 w-8 h-8 rounded-full bg-white border-[6px] border-orange-400 shadow-xl z-10 group-hover:scale-125 transition-transform duration-500" />
              
              <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 group-hover:shadow-2xl transition-all group-hover:-translate-y-2 relative overflow-hidden">
                {/* Background Grade Label (Large & Subtle) */}
                <div className="absolute -bottom-6 -right-6 text-7xl font-black text-gray-50 opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                   {item.type}
                </div>

                <div className="flex justify-between items-center mb-6">
                   <div className="flex flex-col">
                      <span className="text-4xl font-black text-gray-100 tracking-tighter group-hover:text-orange-100 transition-colors leading-none">{item.year}</span>
                   </div>
                   <div className="flex items-center space-x-3">
                      <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-sm ${
                        item.type === 'LifeFriend' ? 'bg-indigo-50 text-indigo-500' : 
                        item.type === 'MemoryFriend' ? 'bg-orange-50 text-orange-500' : 'bg-gray-50 text-gray-400'
                      }`}>
                        {item.type}
                      </span>
                      {item.icon && <span className="text-xl animate-bounce-slow">{item.icon}</span>}
                   </div>
                </div>
                
                <div className="flex items-center space-x-4 mb-6">
                   <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden shadow-inner group-hover:rotate-3 transition-transform">
                      <img src={`https://picsum.photos/seed/mem-${item.author}/48/48`} alt={item.author} className="w-full h-full object-cover" />
                   </div>
                   <div>
                      <p className="font-black text-gray-900">{item.author}</p>
                      <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">Digital Connection Verified</p>
                   </div>
                </div>

                {item.subText && (
                  <div className="flex items-center text-[10px] text-orange-500 font-black mb-4 bg-orange-50/50 w-fit px-3 py-1 rounded-lg">
                    <span className="mr-2">✨</span> {item.subText}
                  </div>
                )}
                
                <p className="text-base text-gray-600 leading-relaxed mb-6 font-medium">{item.content}</p>

                {item.image && (
                   <div className="rounded-[32px] overflow-hidden mb-6 border border-gray-100 shadow-xl transform group-hover:scale-[1.02] transition-transform duration-500">
                      <img src={item.image} alt="Memory" className="w-full h-56 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                   </div>
                )}

                <div className="mt-8 pt-8 border-t border-gray-50 flex flex-wrap items-center gap-6">
                  <button className="text-[11px] font-black text-orange-500 hover:scale-105 transition-transform">답장하기</button>
                  <button className="text-[11px] font-black text-indigo-500 hover:scale-105 transition-transform flex items-center">
                    <span className="mr-1.5">🎬</span> 추억 영상 보기
                  </button>
                  <button className="ml-auto text-[11px] font-black text-gray-300 hover:text-gray-900 transition-colors">공개 설정</button>
                </div>
              </div>
           </div>
         ))}
      </div>

      {/* Footer Decoration */}
      <div className="mt-32 py-20 text-center border-t border-dashed border-gray-200">
         <div className="text-5xl mb-6 opacity-30">⌛</div>
         <p className="text-lg font-black text-gray-800">우리의 시간은 여기서 멈추지 않습니다.</p>
         <p className="text-sm text-gray-400 mt-2 font-medium">Cyworld 2026: 관계를 보관하는 가장 완벽한 방법</p>
         <div className="mt-12 flex justify-center space-x-4">
            <button className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 hover:text-orange-500 transition-colors">X</button>
            <button className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 hover:text-orange-500 transition-colors">IG</button>
            <button className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 hover:text-orange-500 transition-colors">SC</button>
         </div>
      </div>
    </div>
  );
};

export default MemoryTimeline;
