import React from 'react';
import { useVFMS } from '../context/VFMSContext';
import { UserCheck, Target, TrendingUp, Calendar, RefreshCw, AlertCircle, Users, Percent } from 'lucide-react';

export const AgentPerformanceView: React.FC = () => {
  const { currentUser, agentVisits, payments, customers } = useVFMS();

  const todayStr = new Date().toISOString().split('T')[0];
  const currentMonthStr = new Date().toISOString().substring(0, 7); // YYYY-MM

  // Target and Visit stats
  const agentVisitsToday = agentVisits.filter(v => v.visitDate === todayStr && v.agentId === currentUser?.uid);
  const todayTargetCount = agentVisitsToday.length;
  const todayCollectionCount = agentVisitsToday.filter(v => v.status === 'Collected').length;

  // Payments collected stats
  const agentPaymentsToday = payments.filter(p => p.paymentDate.startsWith(todayStr) && p.collectorId === currentUser?.uid);
  const todayCollectionAmount = agentPaymentsToday.reduce((sum, p) => sum + p.amount, 0);

  const agentPaymentsMonth = payments.filter(p => p.paymentDate.startsWith(currentMonthStr) && p.collectorId === currentUser?.uid);
  const monthlyCollectionAmount = agentPaymentsMonth.reduce((sum, p) => sum + p.amount, 0);

  // Recovery count (payments categorized as Recovery today)
  const recoveryCount = agentPaymentsToday.filter(p => p.collectionType === 'Recovery').length;

  // Missed customers today (visited but not collected, or locked/refused)
  const missedCustomersCount = agentVisitsToday.filter(v => v.status !== 'Collected' && v.status !== 'Pending').length;

  // Active customers assigned to agent (based on route visit registries)
  const activeCustomersCount = customers.length;

  // Collection percentage today
  const collectionPercentage = todayTargetCount > 0 ? Math.round((todayCollectionCount / todayTargetCount) * 100) : 0;

  const performanceKPIs = [
    { label: "Today's Target", value: `${todayCollectionCount} / ${todayTargetCount} Visited`, desc: "Completed target visits today", icon: <Target className="w-5 h-5 text-red-500" /> },
    { label: "Today's Collection", value: `₹${todayCollectionAmount.toLocaleString()}`, desc: "Total collected today", icon: <TrendingUp className="w-5 h-5 text-red-500" /> },
    { label: "Monthly Collection", value: `₹${monthlyCollectionAmount.toLocaleString()}`, desc: "Cumulative current month total", icon: <Calendar className="w-5 h-5 text-red-500" /> },
    { label: "Recovery Count", value: String(recoveryCount), desc: "Recovery logs completed today", icon: <RefreshCw className="w-5 h-5 text-red-500" /> },
    { label: "Missed Customers", value: String(missedCustomersCount), desc: "Clients marked locked or refused today", icon: <AlertCircle className="w-5 h-5 text-red-500" /> },
    { label: "Active Customers", value: String(activeCustomersCount), desc: "Total customers registered in system", icon: <Users className="w-5 h-5 text-red-500" /> },
    { label: "Collection Percentage", value: `${collectionPercentage}%`, desc: "Today's collection completion rate", icon: <Percent className="w-5 h-5 text-red-500" /> },
  ];

  return (
    <div className="space-y-4 animate-fade-in text-slate-800 text-xs">
      
      {/* Title Card */}
      <div className="bg-white p-5 rounded-[10px] border border-slate-200 shadow-sm flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
          <UserCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">My Performance Portal</h2>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Real-time field officer metrics and collections statistics.</p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {performanceKPIs.map((kpi, idx) => (
          <div key={idx} className="bg-white p-5 rounded-[10px] border border-slate-200 shadow-sm flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{kpi.label}</span>
              <h3 className="text-xl font-black text-slate-900 font-mono tracking-tight pt-1">{kpi.value}</h3>
              <p className="text-[9px] text-slate-400 font-semibold leading-normal pt-1">{kpi.desc}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-red-50/50 flex items-center justify-center shrink-0">
              {kpi.icon}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
