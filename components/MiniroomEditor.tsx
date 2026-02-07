
import React, { useState } from 'react';

interface Item {
  id: number;
  x: number;
  y: number;
  type: string;
  emoji: string;
}

interface MiniroomEditorProps {
  onClose: () => void;
}

const MiniroomEditor: React.FC<MiniroomEditorProps> = ({ onClose }) => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, x: 100, y: 150, type: 'tv', emoji: '📺' },
    { id: 2, x: 300, y: 200, type: 'plant', emoji: '🌵' },
  ]);
  const [dragId, setDragId] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDragId(id);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (dragId === null) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 24;
    const y = e.clientY - rect.top - 24;

    setItems(prev => prev.map(item => 
      item.id === dragId ? { ...item, x, y } : item
    ));
    setDragId(null);
  };

  const saveLayout = async () => {
    try {
      await fetch('/api/room/save-layout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      });
      alert('레이아웃이 저장되었습니다');
      onClose();
    } catch (error) {
      alert('저장 실패');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-4xl w-full space-y-6" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-black text-gray-900">미니룸 편집</h2>
        
        <div 
          className="relative w-full h-[400px] bg-sky-50 rounded-2xl border-2 border-gray-200"
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
        >
          {items.map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={e => handleDragStart(e, item.id)}
              className="absolute w-12 h-12 bg-white rounded-lg border-2 border-orange-200 flex items-center justify-center text-2xl cursor-move hover:shadow-lg transition-shadow"
              style={{ left: item.x, top: item.y }}
            >
              {item.emoji}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button 
            onClick={saveLayout}
            className="flex-1 bg-cy-orange text-white py-3 rounded-xl font-black hover:bg-orange-600 transition-colors"
          >
            저장하기
          </button>
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-black hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniroomEditor;
