import React from 'react';
import { 
  Home, 
  Search, 
  Users, 
  Tags, 
  History, 
  Bell, 
  ChevronRight,
  User,
  Hash
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { motion } from 'motion/react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const { preferences } = useAppContext();

  const navItems = [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'search', label: 'Explorar', icon: Search },
    { id: 'politicians', label: 'Políticos', icon: Users },
    { id: 'alerts', label: 'Alertas', icon: Bell },
  ];

  return (
    <aside className="w-64 bg-sidebar h-screen overflow-y-auto border-r border-border-theme sticky top-0 z-40 flex flex-col">
      <div className="p-6 border-b border-border-theme flex items-center gap-3">
        <div className="w-8 h-8 bg-moss rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full opacity-60"></div>
        </div>
        <h1 className="text-earth font-bold text-lg tracking-tight">LegisLink <span className="text-moss">IA</span></h1>
      </div>

      <nav className="flex-1 px-4 py-2">
        <div className="space-y-1 my-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === item.id 
                ? 'bg-border-theme text-earth border-l-4 border-moss' 
                : 'text-text-main/70 hover:bg-border-theme/50'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 px-3 mb-2 text-[10px] uppercase tracking-widest text-earth font-bold opacity-60">
            Temas Seguidos
          </div>
          <div className="space-y-1">
            {preferences.temasSeguidos.map((tema) => (
              <div key={tema} className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-main/80 hover:text-text-main cursor-pointer group">
                <Hash size={14} className="text-moss opacity-50" />
                {tema}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 px-3 mb-2 text-[10px] uppercase tracking-widest text-earth font-bold opacity-60">
            Políticos Seguidos
          </div>
          <div className="space-y-1">
            {preferences.politicosSeguidos.length === 0 ? (
              <p className="px-3 text-xs text-text-main/40 italic">Nenhum seguido</p>
            ) : (
              preferences.politicosSeguidos.map((id) => (
                <div key={id} className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-main/80 hover:text-text-main cursor-pointer group">
                  <User size={14} className="text-wine opacity-50" />
                  ID: {id}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 px-3 mb-2 text-[10px] uppercase tracking-wider text-earth/50 font-bold">
            <History size={12} />
            Histórico
          </div>
          <div className="space-y-1">
            {preferences.historicoPesquisa.map((h, i) => (
              <div key={i} className="px-3 py-1 text-xs text-earth/60 hover:text-earth cursor-pointer truncate">
                {h}
              </div>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-nude-dark bg-nude/50">
        <p className="text-[10px] text-earth/40 text-center">© 2024 Vigília Cidadã</p>
      </div>
    </aside>
  );
};

export default Sidebar;
