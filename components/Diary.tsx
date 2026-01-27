
import React, { useState } from 'react';
import { analyzeDiaryAndMood, generateDiaryDraft } from '../services/geminiService';

const Diary: React.FC = () => {
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [entries, setEntries] = useState([
    {
      id: '1',
      date: '2026.05.20',
      title: '비오는 날의 산책',
      content: '창밖을 보니 비가 내리고 있었다. 옛날 생각이 많이 나는 날이었다. 2005년 그 때 그 시절 감성이 다시 살아나는 느낌...',
      aiSummary: '비 오는 날, 과거의 향수에 젖어든 촉촉한 하루였습니다.',
      mood: 'Nostalgic 🌧️',
      sentimentTag: '#비오는날 #추억 #2005'
    }
  ]);

  const handleSave = async () => {
    if (!content.trim()) return;
    setIsAnalyzing(true);
    
    const result = await analyzeDiaryAndMood(content);
    
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('ko-KR'),
      title: content.slice(0, 15) + '...',
      content: content,
      aiSummary: result.summary,
      mood: result.mood,
      sentimentTag: result.tags?.map((tag: string) => tag.startsWith('#') ? tag : `#${tag}`).join(' ') || '#일상'
    };

    setEntries([newEntry, ...entries]);
    setContent('');
    setIsAnalyzing(false);
  };

  const handleAIDraft = async () => {
    const hint = prompt("오늘 어떤 일이 있었나요? (예: 한강 소풍, 맛있는 피자)");
    if (!hint) return;
    
    setIsDrafting(true);
    const draft = await generateDiaryDraft(hint);
    setContent(draft);
    setIsDrafting(false);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white border-2 border-orange-100 rounded-[32px] p-8 shadow-xl shadow-orange-500/5 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-rose-400" />
        <h3 className="text-xl font-black mb-6 flex items-center justify-between">
          <span className="flex items-center"><span className="mr-2">✍️</span> AI Memory Book</span>
          <button 
            onClick={handleAIDraft}
            disabled={isDrafting}
            className="text-[10px] font-black bg-gray-900 text-white px-3 py-1.5 rounded-full hover:bg-cy-orange transition-colors disabled:opacity-50"
          >
            {isDrafting ? 'AI 작성 중...' : '🤖 AI 초안 만들기'}
          </button>
        </h3>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="오늘의 소중한 시간을 기록해보세요... AI의 도움을 받을 수도 있습니다."
          className="w-full h-40 p-5 bg-orange-50/30 rounded-2xl border border-orange-100 focus:ring-2 focus:ring-orange-200 outline-none resize-none text-sm leading-relaxed"
        />
        <div className="mt-6 flex justify-between items-center">
          <div className="flex space-x-3">
            <button className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors">📷</button>
            <button className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors">📍</button>
            <button className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors">🏷️</button>
          </div>
          <button
            onClick={handleSave}
            disabled={isAnalyzing}
            className={`px-8 py-3 bg-gray-900 text-white rounded-2xl font-black text-sm transition-all shadow-lg hover:shadow-orange-500/20 active:scale-95 ${
              isAnalyzing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cy-orange'
            }`}
          >
            {isAnalyzing ? 'AI 분석 중...' : '기억 저장하기'}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {entries.map((entry) => (
          <div key={entry.id} className="relative bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-all group overflow-hidden">
            <div className="absolute top-8 right-8 text-[10px] font-black text-orange-500 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100 uppercase tracking-widest">
              {entry.mood}
            </div>
            <div className="text-[10px] text-gray-300 font-black mb-4 uppercase tracking-tighter">{entry.date}</div>
            <p className="text-base text-gray-700 font-medium leading-relaxed mb-6 whitespace-pre-wrap">{entry.content}</p>
            
            <div className="bg-blue-50/40 border-l-4 border-blue-400 p-4 rounded-r-2xl">
              <p className="text-[10px] text-blue-400 font-black mb-1 uppercase tracking-widest">✨ AI Time Capsule Summary</p>
              <p className="text-xs text-blue-900 font-medium italic">"{entry.aiSummary}"</p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {entry.sentimentTag.split(' ').map((tag, i) => (
                   <span key={i} className="text-[10px] text-orange-400 bg-orange-50/50 px-2.5 py-1 rounded-md font-bold">{tag}</span>
                ))}
              </div>
              <div className="flex space-x-4 text-[10px] font-bold text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="hover:text-gray-900">일촌 공개</button>
                <button className="hover:text-rose-500">삭제</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Diary;
