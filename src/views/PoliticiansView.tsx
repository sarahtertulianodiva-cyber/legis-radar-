import React, { useEffect, useState } from 'react';
import { fetchPoliticians } from '../services/legislativeApi';
import { Parlamentar } from '../types';
import PoliticianCard from '../components/PoliticianCard';
import { Search, Loader2, Filter } from 'lucide-react';

const PoliticiansView: React.FC = () => {
  const [politicians, setPoliticians] = useState<Parlamentar[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function load() {
      const data = await fetchPoliticians();
      setPoliticians(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = politicians.filter(p => 
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.siglaPartido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.siglaUf.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="serif text-4xl font-bold text-earth mb-2 underline decoration-wine/30 underline-offset-8">Parlamentares</h2>
            <p className="text-earth/60">Acompanhe de perto quem representa você e as suas pautas no congresso.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-earth/40" size={16} />
              <input 
                type="text" 
                placeholder="Filtrar por nome, partido..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-nude-dark rounded-xl text-sm outline-none focus:border-wine/30 transition-all"
              />
            </div>
            <button className="p-2 bg-white border border-nude-dark rounded-xl text-earth/60 hover:text-earth">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-earth/40">
            <Loader2 size={40} className="animate-spin mb-4" />
            <p className="font-medium">Carregando parlamentares...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.slice(0, 40).map(politician => (
              <PoliticianCard key={politician.id} politician={politician} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full h-64 flex flex-col items-center justify-center bg-nude/10 rounded-3xl border border-dashed border-nude-dark">
                <Search size={48} className="text-earth/20 mb-4" />
                <p className="text-earth/60 font-medium">Nenhum político encontrado com este filtro.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default PoliticiansView;
