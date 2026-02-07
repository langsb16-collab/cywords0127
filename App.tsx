
import React, { useState } from 'react';
import Layout from './components/Layout.tsx';
import Home from './components/Home.tsx';
import Diary from './components/Diary.tsx';
import Store from './components/Store.tsx';
import MemoryTimeline from './components/MemoryTimeline.tsx';
import Miniroom from './components/Miniroom.tsx';
import Clubs from './components/Clubs.tsx';
import Photos from './components/Photos.tsx';
import MiniroomEditor from './components/MiniroomEditor.tsx';
import VisitorManagement from './components/VisitorManagement.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userMood, setUserMood] = useState('포근함 ☁️');
  const [showRoomEditor, setShowRoomEditor] = useState(false);
  const [showVisitorMgmt, setShowVisitorMgmt] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'diary':
        return <Diary />;
      case 'photo':
        return <Photos />;
      case 'minihome':
        return (
          <div className="p-8 max-w-4xl mx-auto space-y-10">
            <header className="flex justify-between items-center mb-6">
               <h3 className="text-2xl font-black text-gray-800 tracking-tight">나의 미니홈피 Reborn 3.0</h3>
               <div className="flex space-x-2">
                 <button className="px-4 py-2 bg-gray-100 rounded-full text-[10px] font-black hover:bg-orange-500 hover:text-white transition-all">공간 편집</button>
                 <button className="px-4 py-2 bg-gray-100 rounded-full text-[10px] font-black hover:bg-orange-500 hover:text-white transition-all">방문자 관리</button>
               </div>
            </header>
            <Miniroom mood={userMood} />
            <div className="grid grid-cols-3 gap-6">
               <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
                  <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Total Visitors</p>
                  <p className="text-2xl font-black text-gray-800">1,254,020</p>
               </div>
               <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
                  <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Memory Grade</p>
                  <p className="text-2xl font-black text-orange-500">LEGENDARY</p>
               </div>
               <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
                  <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Active Friends</p>
                  <p className="text-2xl font-black text-gray-800">128</p>
               </div>
            </div>
          </div>
        );
      case 'jukebox':
        return <Store />;
      case 'guest':
        return <MemoryTimeline />;
      case 'club':
        return <Clubs />;
      default:
        return null;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
      {showRoomEditor && <MiniroomEditor onClose={() => setShowRoomEditor(false)} />}
      {showVisitorMgmt && <VisitorManagement onClose={() => setShowVisitorMgmt(false)} />}
    </Layout>
  );
};

export default App;
