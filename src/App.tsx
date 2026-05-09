import React, { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './views/Dashboard';
import PoliticiansView from './views/PoliticiansView';
import SearchResultView from './views/SearchResultView';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const [activeView, setActiveView] = useState('dashboard');
  const [globalSearch, setGlobalSearch] = useState('');

  const onSearch = (query: string) => {
    setGlobalSearch(query);
    setActiveView('search');
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'politicians':
        return <PoliticiansView />;
      case 'search':
        return <SearchResultView query={globalSearch} />;
      case 'alerts':
        return (
          <div className="bg-wine/5 p-12 rounded-3xl border border-wine/10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-wine/10 rounded-full flex items-center justify-center text-wine mb-6">
              <span className="text-2xl font-bold">!</span>
            </div>
            <h2 className="serif text-2xl font-bold text-earth mb-4">Meus Alertas Gerados por IA</h2>
            <p className="text-earth/60 max-w-lg">Configuramos automaticamente alertas baseados nos seus temas e políticos seguidos. Você receberá notificações resumidas assim que novas movimentações ocorrerem.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-bg relative">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onSearch={onSearch} />
        
        <main className="flex-1 p-8 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
