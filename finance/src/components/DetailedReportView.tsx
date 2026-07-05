import React, { useState } from 'react';
import { ArrowLeft, Printer, FileText, Calendar, User, ShieldCheck, MapPin, BadgePercent, TrendingUp } from 'lucide-react';
import { useVFMS } from '../context/VFMSContext';

interface DetailedReportProps {
  customer: {
    id: string;
    customer: string;
    village: string;
    agent: string;
    dailyDue: number;
    paidToday: number;
    type: 'Recovery' | 'Missed' | 'Advance' | 'Partial';
    reason: string;
    remarks: string;
    loanAmount: number;
    time: string;
  };
  onBack: () => void;
}

export const DetailedReportView: React.FC<DetailedReportProps> = ({ customer, onBack }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'history'>('details');

  const handlePrint = () => {
    window.print();
  };

  const { payments } = useVFMS();
  const loanId = customer.id.replace('exc-', '');
  const actualPayments = payments.filter(p => p.loanId === loanId);

  return (
    <div className="space-y-4 print:p-0">
      
      {/* Navigation & Actions Header */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center print:hidden text-xs gap-2">
        <button
          onClick={onBack}
          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Back to Exception List</span>
          <span className="sm:hidden">Back</span>
        </button>
        <button
          onClick={handlePrint}
          className="px-3.5 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-black flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm whitespace-nowrap"
        >
          <Printer className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Print Detailed Report</span>
          <span className="sm:hidden">Print</span>
        </button>
      </div>

      {/* Main Document Body */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 space-y-4 sm:space-y-5 print:border-none print:shadow-none text-xs font-semibold text-slate-700">
        
        {/* Document Header (For print authenticity) */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-3">
          <div>
            <h1 className="text-sm font-black text-slate-900 uppercase tracking-wide">Customer Exception Audit Report</h1>
            <p className="text-[9px] text-slate-400 mt-0.5 font-mono uppercase">Ref: VYFL-EXC-{customer.id.toUpperCase()}-{new Date().toISOString().split('T')[0]}</p>
          </div>
          <div className="text-right text-[9px] font-mono text-slate-400 leading-tight">
            <div>VGot You Finance Ltd</div>
            <div>Branch Office: Main Head Office</div>
            <div>Generated: {new Date().toLocaleString()}</div>
          </div>
        </div>

        {/* On-screen Tab Switcher (hidden when printing) */}
        <div className="flex border-b border-slate-200 text-xs font-bold text-center print:hidden gap-4 pb-1">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-2 px-1 border-b-2 transition-all cursor-pointer ${
              activeTab === 'details' ? 'border-red-650 text-red-650 font-black' : 'border-transparent text-slate-400'
            }`}
          >
            Audit Details
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-2 px-1 border-b-2 transition-all cursor-pointer ${
              activeTab === 'history' ? 'border-red-650 text-red-650 font-black' : 'border-transparent text-slate-400'
            }`}
          >
            Ledger History
          </button>
        </div>

        {/* Tab 1 Content: Single Unified Parameters List */}
        <div className={`${activeTab === 'details' ? 'block' : 'hidden'} print:block`}>
          <div className="bg-slate-50 border border-slate-200 rounded-xl divide-y divide-slate-200/70 overflow-hidden text-[10px]">
            
            <div className="p-3.5 flex justify-between items-center bg-slate-100/50">
              <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                Customer Profile
              </span>
            </div>
            <div className="p-3 flex justify-between items-center bg-white">
              <span className="text-slate-450 uppercase font-bold font-mono text-[8px]">Full Name</span>
              <span className="font-bold text-slate-800 text-xs">{customer.customer}</span>
            </div>
            <div className="p-3 flex justify-between items-center bg-white">
              <span className="text-slate-450 uppercase font-bold font-mono text-[8px]">Location / Village</span>
              <span className="font-bold text-slate-700 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {customer.village}
              </span>
            </div>
            <div className="p-3 flex justify-between items-center bg-white">
              <span className="text-slate-450 uppercase font-bold font-mono text-[8px]">KYC Phone Register</span>
              <span className="font-bold text-slate-700 font-mono">9876543210</span>
            </div>

            <div className="p-3.5 flex justify-between items-center bg-slate-100/50">
              <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                Loan Specifications & Status
              </span>
            </div>
            <div className="p-3 flex justify-between items-center bg-white">
              <span className="text-slate-450 uppercase font-bold font-mono text-[8px]">Disbursed Capital</span>
              <span className="font-bold text-slate-800 font-mono">₹{customer.loanAmount.toLocaleString()}</span>
            </div>
            <div className="p-3 flex justify-between items-center bg-white">
              <span className="text-slate-450 uppercase font-bold font-mono text-[8px]">Daily Installment Due</span>
              <span className="font-bold text-slate-700 font-mono">₹{customer.dailyDue.toLocaleString()}</span>
            </div>
            <div className="p-3 flex justify-between items-center bg-white">
              <span className="text-slate-450 uppercase font-bold font-mono text-[8px]">Paid Today</span>
              <span className="font-black text-slate-900 font-mono text-xs">₹{customer.paidToday.toLocaleString()}</span>
            </div>
            <div className="p-3 flex justify-between items-center bg-white">
              <span className="text-slate-450 uppercase font-bold font-mono text-[8px]">Audit Exception Status</span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[8px] font-black border ${
                customer.type === 'Recovery' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                customer.type === 'Missed' ? 'bg-red-50 text-red-700 border-red-100' :
                customer.type === 'Advance' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                'bg-orange-50 text-orange-700 border-orange-100'
              }`}>
                <span>{customer.type === 'Recovery' ? '🟡' : customer.type === 'Missed' ? '🔴' : customer.type === 'Advance' ? '🔵' : '🟠'}</span>
                <span>{customer.type}</span>
              </span>
            </div>

            <div className="p-3.5 flex justify-between items-center bg-slate-100/50">
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                Field Audit & Remarks
              </span>
            </div>
            <div className="p-3 flex justify-between items-center bg-white">
              <span className="text-slate-450 uppercase font-bold font-mono text-[8px]">Agent Name</span>
              <span className="font-bold text-slate-700">{customer.agent}</span>
            </div>
            <div className="p-3 flex justify-between items-center bg-white">
              <span className="text-slate-450 uppercase font-bold font-mono text-[8px]">Time Registered</span>
              <span className="font-bold text-slate-700 font-mono">{customer.time}</span>
            </div>
            <div className="p-3.5 flex flex-col gap-1 items-start bg-white">
              <span className="text-slate-405 uppercase font-bold font-mono text-[8px]">Underwriting Reason</span>
              <p className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-slate-700 font-medium italic w-full leading-relaxed">
                "{customer.reason || 'No specific reason registered'}"
              </p>
            </div>
            <div className="p-3.5 flex flex-col gap-1 items-start bg-white">
              <span className="text-slate-405 uppercase font-bold font-mono text-[8px]">Audit Remarks</span>
              <p className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-slate-700 font-medium w-full leading-relaxed">
                {customer.remarks || 'No manager remarks registered for this exception.'}
              </p>
            </div>

          </div>
        </div>

        {/* Tab 2 Content: Ledger History Grid */}
        <div className={`${activeTab === 'history' ? 'block' : 'hidden'} print:block space-y-2`}>
          <h3 className="font-black text-[9px] text-slate-500 uppercase tracking-widest flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-450" />
            Recent Ledger History (Previous Collections)
          </h3>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left border-collapse text-[10px] font-medium text-slate-700">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-bold font-mono text-[8px] uppercase border-b border-slate-200">
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Receipt Code</th>
                  <th className="px-3 py-2">Payment Method</th>
                  <th className="px-3 py-2 text-right">Amount</th>
                  <th className="px-3 py-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {actualPayments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-6 text-center text-slate-400 font-bold italic">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  actualPayments.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/50">
                      <td className="px-3 py-2 font-mono">{p.paymentDate}</td>
                      <td className="px-3 py-2 font-mono font-bold text-slate-800">{p.id}</td>
                      <td className="px-3 py-2">{p.paymentMethod || 'Cash'}</td>
                      <td className="px-3 py-2 text-right font-mono font-bold">₹{p.amount.toLocaleString()}</td>
                      <td className="px-3 py-2 text-center">
                        <span className="inline-flex px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-green-50 text-green-700 border border-green-150">
                          Verified
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Signature Line for physical printing */}
        <div className="hidden print:flex justify-between pt-8 text-[9px] font-mono text-slate-500">
          <div>
            <div className="w-40 border-b border-slate-450 mb-1" />
            <div>Field Officer Signature</div>
          </div>
          <div className="text-right">
            <div className="w-40 border-b border-slate-450 mb-1 ml-auto" />
            <div>Branch Manager Signature</div>
          </div>
        </div>

      </div>

    </div>
  );
};
