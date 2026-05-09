import React, { useState } from 'react';
import { Proposicao, Summary } from '../types';
import { Calendar, Tag, ChevronRight, Sparkles, Loader2 } from 'lucide-react';
import { summarizeBill } from '../services/aiSummary';
import { motion, AnimatePresence } from 'motion/react';

interface BillCardProps {
  bill: Proposicao;
  onSelect: (bill: Proposicao) => void;
}

const BillCard: React.FC<BillCardProps> = ({ bill, onSelect }) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);

  const handleSummarize = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (summary) return;
    setLoading(true);
    const result = await summarizeBill(bill);
    setSummary(result);
    setLoading(false);
  };

  return (
    <div 
      onClick={() => onSelect(bill)}
      className="bg-white p-6 rounded-2xl border border-border-theme shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="bg-nude text-earth text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
            {bill.siglaTipo} {bill.numero}/{bill.ano}
          </span>
          <h3 className="text-lg font-bold mt-3 text-text-main leading-tight group-hover:text-earth transition-colors">
            {bill.ementa}
          </h3>
        </div>
        <span className="bg-moss/10 text-moss text-xs px-3 py-1 rounded-full border border-moss/20 font-medium whitespace-nowrap">
          Em Tramitação
        </span>
      </div>

      <AnimatePresence>
        {summary && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 overflow-hidden"
          >
            <div className="bg-nude rounded-xl p-5 border-l-4 border-earth">
              <div className="flex items-center gap-2 mb-2 text-earth">
                <Sparkles size={14} />
                <span className="text-[10px] uppercase font-black tracking-widest">Resumo da IA</span>
              </div>
              <p className="text-sm leading-relaxed text-text-main/80 italic">
                {summary.resumoSimples}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 pt-4 border-t border-border-theme flex items-center justify-between">
        <div className="flex gap-4 text-[10px] text-text-main/50">
          <span>Autor: <span className="font-bold text-text-main">Câmara Federal</span></span>
        </div>
        <button 
          onClick={handleSummarize}
          disabled={loading}
          className="text-wine font-bold underline decoration-wine/30 underline-offset-4 text-xs hover:decoration-wine transition-all"
        >
          {loading ? 'Processando...' : (summary ? 'Ver Detalhes' : 'Resumir com IA')}
        </button>
      </div>
    </div>
  );
};

export default BillCard;
