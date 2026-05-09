import React, { useEffect, useState } from 'react';
import { searchBills } from '../services/legislativeApi';
import { Proposicao } from '../types';
import BillCard from '../components/BillCard';
import BillDetailModal from '../components/BillDetailModal';
import { Loader2, SearchX } from 'lucide-react';

interface SearchResultViewProps {
  query: string;
}

const SearchResultView: React.FC<SearchResultViewProps> = ({ query }) => {
  const [bills, setBills] = useState<Proposicao[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Proposicao | null>(null);

  useEffect(() => {
    if (!query) return;
    async function performSearch() {
      setLoading(true);
      const data = await searchBills(query);
      setBills(data);
      setLoading(false);
    }
    performSearch();
  }, [query]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="serif text-3xl font-bold text-earth mb-2">
          {query ? `Busca: "${query}"` : 'Explorar Projetos'}
        </h2>
        <p className="text-earth/60">
          {bills.length} resultados encontrados.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 text-earth/40">
          <Loader2 size={40} className="animate-spin mb-4" />
          <p>Buscando nas bases da Câmara e Senado...</p>
        </div>
      ) : (
        <>
          {bills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {bills.map((bill) => (
                <BillCard key={bill.id} bill={bill} onSelect={setSelectedBill} />
              ))}
            </div>
          ) : query ? (
            <div className="flex flex-col items-center justify-center h-64 text-earth/20">
              <SearchX size={64} className="mb-4" />
              <p className="text-earth/60 font-medium">Nenhum projeto encontrado para esta busca.</p>
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center h-64 text-earth/30">
              <p>Digite algo na barra de pesquisa para começar.</p>
            </div>
          )}
        </>
      )}

      {selectedBill && (
        <BillDetailModal 
          bill={selectedBill} 
          summary={null} 
          onClose={() => setSelectedBill(null)} 
        />
      )}
    </div>
  );
};

export default SearchResultView;
