import React, { useState } from 'react';
import { Search, Bell, Menu, User } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

interface TopBarProps {
  onSearch: (query: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const { addHistory } = useAppContext();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addHistory(query.trim());
      onSearch(query.trim());
    }
  };

  return (
    <header className="h-16 bg-nude border-b border-border-theme sticky top-0 z-30 px-8 flex items-center justify-between">
      <div className="flex-1 max-w-2xl relative group">
        <form onSubmit={handleSearch}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-main/30 group-focus-within:text-earth transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Pesquisar projetos de lei, deputados..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-border-theme rounded-full text-sm outline-none focus:ring-1 focus:ring-earth/20 transition-all placeholder:text-text-main/30"
          />
        </form>
      </div>

      <div className="flex items-center gap-4 ml-8">
        <button className="p-2 text-earth/60 hover:text-earth hover:bg-sidebar rounded-full transition-all relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-3 h-3 bg-wine border-2 border-nude rounded-full"></span>
        </button>
        <div className="h-4 w-px bg-border-theme mx-2"></div>
        <div className="w-10 h-10 bg-moss rounded-full flex items-center justify-center text-white">
          <User size={20} />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
