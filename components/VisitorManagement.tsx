
import React, { useState, useEffect } from 'react';

interface Visitor {
  id: number;
  name: string;
  visitedAt: string;
  message?: string;
}

interface VisitorManagementProps {
  onClose: () => void;
}

const VisitorManagement: React.FC<VisitorManagementProps> = ({ onClose }) => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const res = await fetch('/api/visitors');
      const data = await res.json();
      setVisitors(data);
    } catch (error) {
      console.error('방문자 목록 로딩 실패:', error);
      setVisitors([
        { id: 1, name: '김친구', visitedAt: '2026-02-07 14:30', message: '반가워요!' },
        { id: 2, name: '이동창', visitedAt: '2026-02-07 12:15', message: '추억 남기고 갑니다' },
        { id: 3, name: '박싸이', visitedAt: '2026-02-06 18:45' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const blockVisitor = async (visitorId: number) => {
    if (!confirm('이 방문자를 차단하시겠습니까?')) return;
    
    try {
      await fetch('/api/visitors/block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId })
      });
      alert('차단되었습니다');
      fetchVisitors();
    } catch (error) {
      alert('차단 실패');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-3xl w-full space-y-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center sticky top-0 bg-white pb-4">
          <h2 className="text-2xl font-black text-gray-900">방문자 관리</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto" />
          </div>
        ) : (
          <div className="space-y-4">
            {visitors.length === 0 ? (
              <p className="text-center text-gray-400 py-12">아직 방문자가 없습니다</p>
            ) : (
              visitors.map(visitor => (
                <div key={visitor.id} className="bg-gray-50 rounded-2xl p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                      👤
                    </div>
                    <div>
                      <p className="font-black text-gray-800">{visitor.name}</p>
                      <p className="text-xs text-gray-400">{visitor.visitedAt}</p>
                      {visitor.message && (
                        <p className="text-sm text-gray-600 mt-1 italic">"{visitor.message}"</p>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => blockVisitor(visitor.id)}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-full text-xs font-black hover:bg-red-200 transition-colors"
                  >
                    차단
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorManagement;
