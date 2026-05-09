import React, { useEffect, useState } from 'react';
import { fetchRecentBills } from '../services/legislativeApi';
import { Proposicao, Summary } from '../types';
import BillCard from '../components/BillCard';
import BillDetailModal from '../components/BillDetailModal';
import { motion } from 'motion/react';
import { ArrowRight, Activity, TrendingUp, Users, AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [bills, setBills] = useState<Proposicao[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBill, setSelectedBill] = useState<Proposicao | null>(null);

  useEffect(() => {
    async function load() {
      const data = await fetchRecentBills(6);
      setBills(data);
      setLoading(false);
    }
    load();
  }, []);

  const stats = [
    { label: 'Projetos de Lei Ativos', value: '1.284', icon: Activity, color: 'text-moss' },
    { label: 'Votações Recentes', value: '42', icon: TrendingUp, color: 'text-earth' },
    { label: 'Políticos Monitorados', value: '513', icon: Users, color: 'text-wine' },
    { label: 'Alertas Ativados', value: '12', icon: AlertCircle, color: 'text-moss' },
  ];

  return (
    <div className="space-y-10">
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-border-theme pb-2">
          <div>
            <h2 className="serif-italic text-3xl text-earth">Visão Geral do Monitoramento</h2>
          </div>
          <span className="text-xs font-medium text-moss bg-moss/10 px-3 py-1 rounded-full">
            IA Atualizada: Hoje, {new Date().toLocaleTimeString()}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-sidebar p-6 rounded-2xl border border-border-theme flex flex-col justify-between"
            >
              <stat.icon className={`${stat.color} mb-4 opacity-70`} size={24} />
              <div>
                <div className="text-2xl font-bold text-text-main">{stat.value}</div>
                <div className="text-[10px] uppercase font-black tracking-widest text-earth opacity-60">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8 pb-2 border-b border-border-theme">
          <h3 className="serif-italic text-2xl text-earth">Movimentações Recentes</h3>
          <button className="flex items-center gap-2 text-xs font-bold text-wine hover:underline underline-offset-4 decoration-2">
            Ver tudo
            <ArrowRight size={14} />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-64 bg-nude/20 rounded-2xl animate-pulse border border-nude-dark"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {bills.map((bill) => (
              <BillCard key={bill.id} bill={bill} onSelect={setSelectedBill} />
            ))}
          </div>
        )}
      </section>

      {selectedBill && (
        <BillDetailModal 
          bill={selectedBill} 
          summary={null} // We'd fetch or pass summary if already exists
          onClose={() => setSelectedBill(null)} 
        />
      )}
    </div>
  );
};

export default Dashboard;
