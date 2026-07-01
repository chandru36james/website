import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { History, Search, Filter, RefreshCw, Layers } from 'lucide-react';

export const AuditView: React.FC = () => {
  const { auditLogs } = useVFMS();

  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (log.reason && log.reason.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (log.newValue && log.newValue.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesModule = moduleFilter === 'All' || log.module === moduleFilter;
    return matchesSearch && matchesModule;
  });

  return (
    <div className="space-y-4">
      
      {/* Search Header */}
      <div className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex-1 flex gap-3 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search audit trail by operator or specific action details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-[10px] text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-[10px] text-xs font-bold text-slate-600 focus:outline-none focus:ring-1 focus:ring-red-500"
          >
            <option value="All">All Modules</option>
            <option value="Customer Registry">Customer Registry</option>
            <option value="Loan Contract">Loan Contract</option>
            <option value="Repayment Entry">Repayment Entry</option>
            <option value="Collateral Vault">Collateral Vault</option>
            <option value="Cash Book Module">Cash Book Module</option>
            <option value="Finance Rules">Finance Rules</option>
          </select>
        </div>
      </div>

      {/* Main Audit Trail Card */}
      <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-red-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Immutable Chronological Trace</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 font-bold">Total Logs: {filteredLogs.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-white text-slate-400 font-bold text-[10px] uppercase border-b border-slate-100">
                <th className="px-4 py-2.5">Timestamp</th>
                <th className="px-4 py-2.5">Module Category</th>
                <th className="px-4 py-2.5">Active Operator</th>
                <th className="px-4 py-2.5">Assigned Role</th>
                <th className="px-4 py-2.5">Audit Details / Old Values</th>
                <th className="px-4 py-2.5 text-right">Updated Values / Reasons</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">No chronological operational audit logs found.</td>
                </tr>
              ) : (
                filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-2.5 font-mono text-[10px] text-slate-400">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2.5 font-bold text-slate-700">
                      {log.module}
                    </td>
                    <td className="px-4 py-2.5 font-medium">
                      {log.userName}
                    </td>
                    <td className="px-4 py-2.5 font-mono uppercase text-[10px] text-slate-500 font-bold">
                      {log.userRole}
                    </td>
                    <td className="px-4 py-2.5 text-slate-500 max-w-xs truncate">
                      {log.oldValue || 'None (Created / Booked)'}
                    </td>
                    <td className="px-4 py-2.5 text-right text-slate-800 font-bold max-w-xs truncate">
                      {log.reason || log.newValue}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
