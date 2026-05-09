import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserPreferences, Proposicao, Parlamentar } from '../types';

interface AppContextType {
  preferences: UserPreferences;
  followTema: (tema: string) => void;
  unfollowTema: (tema: string) => void;
  followPolitico: (politicoId: number) => void;
  unfollowPolitico: (politicoId: number) => void;
  addHistory: (query: string) => void;
  followedPoliticiansData: Parlamentar[];
  setFollowedPoliticiansData: React.Dispatch<React.SetStateAction<Parlamentar[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('vigilia_prefs');
    return saved ? JSON.parse(saved) : {
      temasSeguidos: ['Educação', 'Saúde', 'Meio Ambiente'],
      politicosSeguidos: [],
      historicoPesquisa: []
    };
  });

  const [followedPoliticiansData, setFollowedPoliticiansData] = useState<Parlamentar[]>([]);

  useEffect(() => {
    localStorage.setItem('vigilia_prefs', JSON.stringify(preferences));
  }, [preferences]);

  const followTema = (tema: string) => {
    if (!preferences.temasSeguidos.includes(tema)) {
      setPreferences(prev => ({ ...prev, temasSeguidos: [...prev.temasSeguidos, tema] }));
    }
  };

  const unfollowTema = (tema: string) => {
    setPreferences(prev => ({ ...prev, temasSeguidos: prev.temasSeguidos.filter(t => t !== tema) }));
  };

  const followPolitico = (id: number) => {
    if (!preferences.politicosSeguidos.includes(id)) {
      setPreferences(prev => ({ ...prev, politicosSeguidos: [...prev.politicosSeguidos, id] }));
    }
  };

  const unfollowPolitico = (id: number) => {
    setPreferences(prev => ({ ...prev, politicosSeguidos: prev.politicosSeguidos.filter(i => i !== id) }));
  };

  const addHistory = (query: string) => {
    setPreferences(prev => {
      const filtered = prev.historicoPesquisa.filter(h => h !== query);
      return { ...prev, historicoPesquisa: [query, ...filtered].slice(0, 10) };
    });
  };

  return (
    <AppContext.Provider value={{ 
      preferences, 
      followTema, 
      unfollowTema, 
      followPolitico, 
      unfollowPolitico, 
      addHistory,
      followedPoliticiansData,
      setFollowedPoliticiansData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
