import React from 'react';
import { Proposicao, Summary } from '../types';
import { X, Sparkles, AlertCircle, Bookmark, Share2, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface BillDetailModalProps {
  bill: Proposicao;
  summary: Summary | null;
  onClose: () => void;
}

const BillDetailModal: React.FC<BillDetailModalProps> = ({ bill, summary, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth/20 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-nude flex items-center justify-between bg-bg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-moss flex items-center justify-center text-white">
              <Info size={20} />
            </div>
            <div>
              <h2 className="serif text-xl font-bold text-earth">Detalhes da Proposição</h2>
              <p className="text-xs text-earth/50">{bill.siglaTipo} {bill.numero}/{bill.ano}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-earth/10 rounded-full transition-colors text-earth/50 hover:text-earth">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <section className="mb-10">
            <h3 className="serif text-2xl font-bold text-earth mb-4 leading-tight">{bill.ementa}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-earth/60">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-nude rounded-full">
                <Bookmark size={14} className="text-earth" />
                Presente em: {new Date(bill.dataApresentacao).toLocaleDateString('pt-BR')}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-moss/10 text-moss rounded-full">
                <AlertCircle size={14} />
                Em Tramitação
              </div>
            </div>
          </section>

          {summary ? (
            <div className="space-y-10">
              <section className="p-8 bg-moss/5 border border-moss/20 rounded-2xl">
                <div className="flex items-center gap-2 text-moss mb-4">
                  <Sparkles size={20} />
                  <h4 className="font-bold uppercase tracking-widest text-xs">Resumo Simplificado IA</h4>
                </div>
                <div className="prose prose-earth max-w-none">
                  <p className="text-earth/90 leading-relaxed text-lg italic">
                    {summary.resumoSimples}
                  </p>
                </div>
              </section>

              <section>
                <h4 className="font-bold uppercase tracking-widest text-xs text-earth/40 mb-6 flex items-center gap-2">
                  <div className="w-8 h-px bg-nude-dark"></div>
                  Impacto no Dia a Dia
                  <div className="w-8 h-px bg-nude-dark"></div>
                </h4>
                <p className="text-earth/80 leading-relaxed bg-nude/20 p-6 rounded-2xl border border-nude-dark">
                  {summary.impacto}
                </p>
              </section>

              <div className="grid md:grid-cols-2 gap-8">
                <section>
                  <h4 className="font-bold uppercase tracking-widest text-xs text-earth/40 mb-4">Pontos Chave</h4>
                  <ul className="space-y-3">
                    {summary.pontosChave.map((ponto, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-earth/80">
                        <div className="w-5 h-5 rounded-full bg-moss/10 flex items-center justify-center shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-moss"></div>
                        </div>
                        {ponto}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="font-bold uppercase tracking-widest text-xs text-earth/40 mb-4">Glossário Cidadão</h4>
                  <div className="space-y-4">
                    {summary.traducaoJuridica.map((item, i) => (
                      <div key={i} className="group">
                        <p className="text-xs font-bold text-wine mb-1 uppercase tracking-tighter">{item.termo}</p>
                        <p className="text-sm text-earth/70 bg-bg p-3 rounded-lg border border-nude-dark group-hover:border-wine/20 transition-all italic">
                          "{item.significado}"
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-earth/30">
              <Sparkles size={48} className="mb-4 opacity-20" />
              <p className="text-sm">Clique em "Resumir com IA" no card para ver a análise completa.</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-nude bg-bg flex justify-between items-center">
          <button className="flex items-center gap-2 text-earth/60 hover:text-earth transition-colors">
            <Share2 size={18} />
            <span className="text-sm font-medium">Compartilhar Análise</span>
          </button>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-earth text-white rounded-full text-sm font-bold shadow-lg hover:bg-earth/90 transition-all">
              Seguir este Projeto
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BillDetailModal;
