import React, { useState } from 'react';
import { useTranslations } from '../i18n.tsx';

const Photos: React.FC = () => {
  const t = useTranslations('common');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const handleUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('photo', file);

      try {
        const res = await fetch('/api/photos/upload', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        alert(`업로드 완료: ${data.url}`);
      } catch (error) {
        alert('업로드 실패: ' + error);
      }
    };
    input.click();
  };

  const handleVideoCreate = async () => {
    try {
      const res = await fetch('/api/memory/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoKey: 'sample-photo' })
      });
      const data = await res.json();
      if (data.success) {
        window.open(data.videoUrl, '_blank');
      }
    } catch (error) {
      alert('영상 생성 중...');
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12">
      <header className="text-center py-20 bg-gray-50 rounded-[60px] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-20 opacity-5">
          <span className="text-9xl">📸</span>
        </div>
        <span className="text-7xl mb-8 block">🎞️</span>
        <h2 className="text-4xl font-black text-gray-900">AI 추억 복원 시스템 3.0</h2>
        <p className="text-base text-gray-400 mt-4 font-bold">"빛바랜 사진부터 흐릿한 기억까지, AI가 선명하게 되살립니다."</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <button 
          onClick={handleUpload}
          className="bg-white p-12 rounded-[50px] border-4 border-dashed border-gray-100 flex flex-col items-center justify-center space-y-8 hover:border-orange-300 transition-all group cursor-pointer hover:shadow-3xl"
        >
          <div className="w-24 h-24 bg-orange-50 rounded-[40px] flex items-center justify-center text-5xl group-hover:scale-110 transition-transform shadow-inner">➕</div>
          <div className="text-center">
            <p className="font-black text-xl text-gray-900">과거 사진 업로드</p>
            <p className="text-xs text-gray-400 mt-2 font-bold uppercase">AI Super Resolution 4K</p>
          </div>
        </button>

        <button 
          onClick={handleVideoCreate}
          className="bg-white p-12 rounded-[50px] border-4 border-dashed border-gray-100 flex flex-col items-center justify-center space-y-8 hover:border-blue-300 transition-all group cursor-pointer hover:shadow-3xl"
        >
          <div className="w-24 h-24 bg-blue-50 rounded-[40px] flex items-center justify-center text-5xl group-hover:scale-110 transition-transform shadow-inner">🎬</div>
          <div className="text-center">
            <p className="font-black text-xl text-gray-900">추억 하이라이트</p>
            <p className="text-xs text-gray-400 mt-2 font-bold uppercase">AI Cinematic Video Editor</p>
          </div>
        </button>
      </div>

      <div className="bg-gray-900 rounded-[60px] p-16 text-white mt-12 relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h4 className="text-2xl font-black mb-8 flex items-center">
            <span className="w-3 h-3 bg-orange-500 rounded-full mr-4 animate-pulse" />
            최근 복원된 갤러리
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div 
                key={i} 
                onClick={() => setSelectedImage(`https://picsum.photos/seed/hist-res-${i}/800/800`)}
                className="aspect-square bg-white/5 rounded-3xl border border-white/10 overflow-hidden group cursor-pointer relative"
              >
                <img src={`https://picsum.photos/seed/hist-res-${i}/300/300`} alt="History" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-[10px] font-black uppercase">Enhanced by AI</span>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => alert('전체 갤러리 보기 기능 준비중입니다!')}
            className="mt-12 w-full py-4 border border-white/20 rounded-2xl text-xs font-black hover:bg-white/10 transition-all uppercase"
          >
            전체 갤러리 보기
          </button>
        </div>
      </div>

      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        >
          <img src={selectedImage} alt="Full size" className="max-w-full max-h-full rounded-3xl" />
        </div>
      )}
    </div>
  );
};

export default Photos;
