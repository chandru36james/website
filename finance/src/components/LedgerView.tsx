import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { BookOpen, Search, Download, ShieldCheck, ArrowDownLeft, ArrowUpRight, Scale } from 'lucide-react';

export const LedgerView: React.FC = () => {
  const { ledgers, loans } = useVFMS();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredLedgers = ledgers.filter(led => {
    const matchesSearch = led.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (led.loanId && led.loanId.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === 'All' || led.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const exportCSV = () => {
    if (filteredLedgers.length === 0) return;
    const headers = 'ID,LoanID,Type,Amount,Description,Date\n';
    const rows = filteredLedgers.map(l => 
      `"${l.id}","${l.loanId || ''}","${l.type}",${l.amount},"${l.description.replace(/"/g, '""')}","${l.createdAt}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `VY_Immutable_Ledger_${new Date().toISOString().split('T')[0]}.csv`);
    a.click();
  };

  return (
    <div className="space-y-4">
      
      {/* Search and export head */}
      <div className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex-1 flex gap-3 w-full">
          
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search ledger by transaction description or Loan ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-[10px] text-xs text-slate-700 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-[10px] text-xs font-bold text-slate-600 focus:outline-none"
          >
            <option value="All">All Transactions</option>
            <option value="Disbursement">Disbursement</option>
            <option value="Collection">Collections</option>
            <option value="Interest Accrual">Interest Accruals</option>
            <option value="Penalty">Penalties Charged</option>
            <option value="Processing Fee">Processing Fees</option>
            <option value="Waiver">Waivers Applied</option>
            <option value="Write-off">Write-off Items</option>
          </select>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-[10px] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export Ledger (CSV)</span>
        </button>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-red-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Immutable Double-Entry Ledger Book</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 font-bold">Section VY-COMP-101</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-white text-slate-400 font-bold text-[10px] uppercase border-b border-slate-100">
                <th className="px-4 py-2.5">Timestamp</th>
                <th className="px-4 py-2.5">Transaction Code</th>
                <th className="px-4 py-2.5">Type</th>
                <th className="px-4 py-2.5">Audit Narrative</th>
                <th className="px-4 py-2.5 text-right">Credit/Debit Tally</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLedgers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">No matching immutable ledger entries recorded.</td>
                </tr>
              ) : (
                filteredLedgers.map(led => {
                  const isDebit = led.type === 'Disbursement' || led.type === 'Waiver' || led.type === 'Write-off';
                  return (
                    <tr key={led.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-2.5 font-mono text-[10px] text-slate-400">
                        {new Date(led.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[10px] text-slate-400">
                        {led.id.substring(0, 8)}
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={`px-1.5 py-0.5 rounded-[10px] text-[9px] font-bold ${
                          led.type === 'Disbursement' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                          led.type === 'Collection' ? 'bg-green-50 text-green-700 border border-green-100' :
                          led.type === 'Processing Fee' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          led.type === 'Waiver' ? 'bg-purple-50 text-purple-700 border border-purple-100' : 'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                          {led.type}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-slate-500 font-medium max-w-sm">
                        {led.description}
                      </td>
                      <td className={`px-4 py-2.5 text-right font-mono font-bold ${isDebit ? 'text-red-600' : 'text-green-600'}`}>
                        {isDebit ? '-' : '+'}₹{led.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
