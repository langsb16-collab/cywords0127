
import React, { useState, useEffect } from 'react';
import { FaceMatchCandidate } from '../types';
import { analyzeFaceMatch } from '../services/geminiService';

const MOCK_CANDIDATES: FaceMatchCandidate[] = [
  { id: 'f1', name: '이진수', schoolInfo: '싸이국민학교 98년 졸업', similarity: 98, oldPhoto: 'https://picsum.photos/seed/old1/100/100', currentPhoto: 'https://picsum.photos/seed/curr1/100/100' },
  { id: 'f2', name: '박영희', schoolInfo: '싸이국민학교 98년 졸업', similarity: 82, oldPhoto: 'https://picsum.photos/seed/old2/100/100', currentPhoto: 'https://picsum.photos/seed/curr2/100/100' },
];

const FaceMatch: React.FC<{ onConfirm: (name: string) => void }> = ({ onConfirm }) => {
  const [step, setStep] = useState<'upload' | 'processing' | 'results'>('upload');
  const [progress, setProgress] = useState(0);
  const [aiReport, setAiReport] = useState('');

  const startAnalysis = () => {
    setStep('processing');
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStep('results');
      }
    }, 100);
  };

  useEffect(() => {
    if (step === 'results') {
      analyzeFaceMatch('이진수', '싸이국민학교 졸업앨범').then(setAiReport);
    }
  }, [step]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {step === 'upload' && (
        <div className="bg-white p-12 rounded-[50px] border-4 border-dashed border-gray-100 flex flex-col items-center text-center space-y-6 hover:border-orange-300 transition-all cursor-pointer" onClick={startAnalysis}>
          <div className="text-6xl mb-2">🎞️</div>
          <div>
            <h4 className="text-xl font-black text-gray-800">졸업앨범 사진 업로드</h4>
            <p className="text-sm text-gray-400 mt-2">AI가 얼굴을 인식하여 동창을 찾아드립니다.</p>
          </div>
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full text-xs font-black shadow-lg">파일 선택하기</button>
        </div>
      )}

      {step === 'processing' && (
        <div className="bg-white p-16 rounded-[50px] border border-gray-100 flex flex-col items-center text-center space-y-10">
          <div className="relative w-32 h-32">
             <div className="absolute inset-0 rounded-full border-4 border-orange-100" />
             <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
             <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-orange-500">{progress}%</div>
          </div>
          <div>
            <h4 className="text-xl font-black text-gray-800 animate-pulse">AI 얼굴 분석 중...</h4>
            <p className="text-sm text-gray-400 mt-2">추억의 조각을 현재의 얼굴과 매칭하고 있습니다.</p>
          </div>
        </div>
      )}

      {step === 'results' && (
        <div className="space-y-8">
           <div className="bg-orange-50 p-8 rounded-[40px] border border-orange-100">
              <h4 className="text-sm font-black text-orange-400 uppercase tracking-widest mb-4 flex items-center">
                <span className="mr-2">🧠</span> AI Matching Report
              </h4>
              <p className="text-gray-800 font-bold leading-relaxed italic">"{aiReport}"</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_CANDIDATES.map(c => (
                <div key={c.id} className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden">
                   <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-black text-orange-500 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-tighter">Similarity {c.similarity}%</span>
                      <button className="text-gray-400 hover:text-gray-900">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                      </button>
                   </div>
                   <div className="flex items-center space-x-4 mb-6">
                      <div className="relative">
                        <img src={c.oldPhoto} className="w-16 h-16 rounded-2xl border-2 border-gray-100 grayscale" alt="Old" />
                        <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full border border-gray-100 text-[10px]">⏪</div>
                      </div>
                      <div className="w-4 h-px bg-gray-100" />
                      <div className="relative">
                        <img src={c.currentPhoto} className="w-16 h-16 rounded-2xl border-2 border-orange-200" alt="Current" />
                        <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full border border-gray-100 text-[10px]">✨</div>
                      </div>
                   </div>
                   <h5 className="font-black text-gray-800">{c.name}</h5>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{c.schoolInfo}</p>
                   <button 
                     onClick={() => onConfirm(c.name)}
                     className="mt-6 w-full py-3 bg-gray-900 text-white rounded-2xl text-[10px] font-black hover:bg-orange-500 transition-all uppercase tracking-widest"
                   >
                     이 친구 맞아요 🤝
                   </button>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default FaceMatch;
