
import React, { useState } from 'react';
import { AlumniGroup } from '../types';
import FaceMatch from './FaceMatch';
import GroupBand from './GroupBand';

const MOCK_CLUBS: AlumniGroup[] = [
  { id: 'c1', name: '사이좋은 3학년 2반', schoolName: '싸이국민학교', gradYear: '1998', classNumber: '2', memberCount: 24, recentActivity: '방금 전 새로운 사진이 올라왔습니다.', image: 'https://picsum.photos/seed/class1/200/200' },
  { id: 'c2', name: '2026 등산 밴드', schoolName: '취미 소모임', gradYear: '2026', memberCount: 15, recentActivity: '이번주 토요일 관악산 번개가 있습니다.', image: 'https://picsum.photos/seed/hiking/200/200' },
  { id: 'c3', name: '가족 추억 금고', schoolName: '가족 전용', gradYear: 'Infinity', memberCount: 4, recentActivity: '어머니가 10년 전 가족여행 사진을 복원했습니다.', image: 'https://picsum.photos/seed/family/200/200' },
];

const Clubs: React.FC = () => {
  const [activeView, setActiveView] = useState<'hub' | 'alumni' | 'band'>('hub');
  const [selectedGroupName, setSelectedGroupName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAlumniConfirm = (name: string) => {
    alert(`${name}님에게 일촌 신청을 보냈습니다!`);
    setActiveView('hub');
  };

  const openBand = (name: string) => {
    setSelectedGroupName(name);
    setActiveView('band');
  };

  if (activeView === 'alumni') {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <header className="flex items-center space-x-6 mb-12">
           <button onClick={() => setActiveView('hub')} className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-100">
             <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
           </button>
           <h2 className="text-3xl font-black text-gray-900 tracking-tight">동창 매칭 (AI Match)</h2>
        </header>
        <FaceMatch onConfirm={handleAlumniConfirm} />
      </div>
    );
  }

  if (activeView === 'band') {
    return <GroupBand groupName={selectedGroupName} onBack={() => setActiveView('hub')} />;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">감성 클럽 & 밴드</h2>
          <p className="text-sm text-gray-400 font-bold mt-2">"잃어버린 관계를 찾고, 소중한 모임을 영원히 기록하세요."</p>
        </div>
        <button className="bg-cy-orange text-white px-6 py-3 rounded-full text-xs font-black shadow-lg hover:shadow-orange-500/30 transition-all">
          + 새로운 모임 만들기
        </button>
      </header>

      {/* Alumni Search Section (I Love School Vibes) */}
      <section className="bg-orange-50 rounded-[40px] p-10 border border-orange-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
           <span className="text-9xl">🎓</span>
        </div>
        <div className="relative z-10">
          <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center">
            <span className="mr-3">🔍</span> 동창 찾기 (아이러브스쿨 2026)
          </h3>
          <div className="flex flex-col md:flex-row gap-4">
             <input 
               type="text" 
               placeholder="학교명 입력 (예: 싸이초등학교)"
               className="flex-1 px-6 py-4 rounded-2xl border border-orange-200 focus:ring-2 focus:ring-orange-400 outline-none text-sm font-medium"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
             <select className="px-6 py-4 rounded-2xl border border-orange-200 focus:ring-2 focus:ring-orange-400 outline-none text-sm font-medium bg-white">
                <option>졸업연도 선택</option>
                <option>2010</option>
                <option>2005</option>
                <option>2000</option>
                <option>1995</option>
             </select>
             <button onClick={() => setActiveView('alumni')} className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-black transition-colors">AI 매칭하기</button>
          </div>
          <div className="mt-6 flex items-center space-x-4 text-[10px] font-black text-orange-400 uppercase tracking-widest">
             <span>🔥 지금 98학번 동창들이 많이 모이고 있어요!</span>
          </div>
        </div>
      </section>

      {/* Joined Groups Section (Naver Band Vibes) */}
      <section className="space-y-8">
        <h3 className="text-xl font-black text-gray-800 flex items-center px-2">
           <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-3 shadow-lg shadow-green-500/30" />
           나의 프라이빗 밴드
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_CLUBS.map((club) => (
            <div 
              key={club.id} 
              onClick={() => openBand(club.name)}
              className="bg-white rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group overflow-hidden flex flex-col cursor-pointer"
            >
               <div className="h-40 overflow-hidden relative">
                  <img src={club.image} alt={club.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6 text-white">
                     <p className="text-[10px] font-black opacity-70 uppercase tracking-tighter">{club.schoolName}</p>
                     <p className="text-lg font-black">{club.name}</p>
                  </div>
               </div>
               <div className="p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Members: {club.memberCount}</span>
                        <div className="flex -space-x-2">
                           {[1,2,3].map(i => (
                              <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200" />
                           ))}
                        </div>
                     </div>
                     <p className="text-xs text-gray-500 font-medium leading-relaxed italic">
                        "{club.recentActivity}"
                     </p>
                  </div>
                  <button className="mt-8 w-full py-3 bg-gray-50 group-hover:bg-green-500 group-hover:text-white rounded-2xl text-[10px] font-black transition-all uppercase tracking-widest">밴드 입장하기</button>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reconnection Features Map */}
      <section className="bg-gray-900 rounded-[50px] p-12 text-white relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-md">
               <h4 className="text-2xl font-black mb-4">📍 우리 동창들은 지금 어디에?</h4>
               <p className="text-sm text-gray-400 font-medium leading-relaxed">
                  "졸업한 지 20년, 친구들은 각자의 자리에서 어떻게 살고 있을까요?"<br/>
                  동창 지도를 통해 친구들의 소식을 확인하고 가까운 곳에 있는 친구에게 인사를 건네보세요.
               </p>
               <button className="mt-8 bg-white text-black px-8 py-3.5 rounded-full text-xs font-black hover:bg-cy-orange hover:text-white transition-all">지도 모드 켜기</button>
            </div>
            <div className="w-full md:w-64 h-64 bg-white/5 rounded-full border-8 border-white/5 flex items-center justify-center relative animate-pulse-slow">
               <div className="w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(255,107,0,0.8)]" />
               <div className="absolute top-10 right-10 w-2 h-2 bg-blue-400 rounded-full" />
               <div className="absolute bottom-20 left-10 w-2 h-2 bg-green-400 rounded-full" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rounded-full" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full" />
            </div>
         </div>
      </section>
    </div>
  );
};

export default Clubs;
