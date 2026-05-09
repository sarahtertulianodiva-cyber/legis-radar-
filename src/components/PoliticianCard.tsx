import React from 'react';
import { Parlamentar } from '../types';
import { User, MapPin, Building2, ExternalLink, Heart } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

interface PoliticianCardProps {
  politician: Parlamentar;
}

const PoliticianCard: React.FC<PoliticianCardProps> = ({ politician }) => {
  const { preferences, followPolitico, unfollowPolitico } = useAppContext();
  const isFollowed = preferences.politicosSeguidos.includes(politician.id);

  const toggleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFollowed) unfollowPolitico(politician.id);
    else followPolitico(politician.id);
  };

  return (
    <div className="bg-white rounded-2xl border border-border-theme overflow-hidden transition-all hover:shadow-md group">
      <div className="h-24 bg-sidebar relative">
        <button 
          onClick={toggleFollow}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all ${
            isFollowed ? 'bg-wine text-white' : 'bg-white/50 text-earth hover:bg-white'
          }`}
        >
          <Heart size={16} fill={isFollowed ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="px-6 pb-6 -mt-12 relative z-10">
        <div className="w-24 h-24 rounded-2xl border-4 border-white bg-sidebar overflow-hidden mb-4 shadow-sm group-hover:scale-105 transition-transform">
          {politician.urlFoto ? (
            <img 
              src={politician.urlFoto} 
              alt={politician.nome} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-earth/20">
              <User size={40} />
            </div>
          )}
        </div>

        <h3 className="serif-italic text-xl text-earth mb-1 leading-tight">{politician.nome}</h3>
        <div className="flex items-center gap-1.5 text-[10px] font-black text-wine uppercase tracking-widest mb-4 opacity-80">
          <Building2 size={12} />
          {politician.siglaPartido} — {politician.siglaUf}
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-xs text-text-main/60">
            <MapPin size={12} />
            Estado: {politician.siglaUf}
          </div>
        </div>

        <button className="w-full py-2 bg-sidebar text-earth text-[10px] uppercase font-black tracking-widest rounded-lg border border-border-theme hover:bg-earth hover:text-white transition-all">
          Ver Atividade
        </button>
      </div>
    </div>
  );
};

export default PoliticianCard;
