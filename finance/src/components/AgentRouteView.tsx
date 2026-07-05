import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { MapPin, Users, Plus, Trash2, ArrowDown, ArrowUp, Calendar, CheckCircle } from 'lucide-react';
import { AgentVisit, UserProfile, Customer } from '../types';

export const AgentRouteView: React.FC = () => {
  const { customers, userProfiles, agentVisits, createAgentRoute, logAudit } = useVFMS();

  const [selectedAgentId, setSelectedAgentId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [routeVisits, setRouteVisits] = useState<Omit<AgentVisit, 'id' | 'createdAt' | 'companyId' | 'branchId'>[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const agents = userProfiles.filter(u => u.role === 'Loan Officer');

  // Filter customers not yet added to the route
  const availableCustomers = customers.filter(c => 
    c.status === 'Active' && 
    !routeVisits.some(rv => rv.customerId === c.id) &&
    (c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     (c.village && c.village.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const handleAddCustomerToRoute = (customer: Customer) => {
    const newVisit: Omit<AgentVisit, 'id' | 'createdAt' | 'companyId' | 'branchId'> = {
      agentId: selectedAgentId,
      customerId: customer.id,
      customerName: customer.name,
      village: customer.village || '',
      street: customer.address || '',
      visitOrder: routeVisits.length + 1,
      status: 'Pending',
      visitDate: selectedDate
    };
    setRouteVisits([...routeVisits, newVisit]);
  };

  const handleRemoveCustomerFromRoute = (customerId: string) => {
    const filtered = routeVisits.filter(v => v.customerId !== customerId);
    // Re-index visitOrder
    const reordered = filtered.map((v, index) => ({
      ...v,
      visitOrder: index + 1
    }));
    setRouteVisits(reordered);
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === routeVisits.length - 1) return;

    const newVisits = [...routeVisits];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap
    const temp = newVisits[index];
    newVisits[index] = newVisits[targetIndex];
    newVisits[targetIndex] = temp;

    // Correct visitOrder
    const final = newVisits.map((v, idx) => ({
      ...v,
      visitOrder: idx + 1
    }));
    setRouteVisits(final);
  };

  const handleSaveRoute = async () => {
    if (!selectedAgentId) {
      alert("Please select a Loan Agent.");
      return;
    }
    if (routeVisits.length === 0) {
      alert("Please add at least one customer to the route.");
      return;
    }

    try {
      await createAgentRoute(selectedAgentId, selectedDate, routeVisits);
      alert("Agent route saved successfully!");
      setRouteVisits([]);
    } catch (err: any) {
      alert(err.message || "Failed to save route.");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-600" />
            Agent Route & Visit Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Organize daily field collection routes by assigning and ordering borrower visits.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Route Builder Settings & Current Route */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <div className="h-8 w-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Route Builder</h3>
                <p className="text-[10px] text-slate-400">Configure agent assignments and daily order.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">1. Select Field Agent</label>
                <select
                  value={selectedAgentId}
                  onChange={e => setSelectedAgentId(e.target.value)}
                  className="form-input bg-slate-50"
                >
                  <option value="">Select Agent...</option>
                  {agents.map(a => <option key={a.uid} value={a.uid}>{a.displayName}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">2. Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="form-input bg-slate-50"
                />
              </div>
            </div>

            {/* Route List */}
            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2 flex justify-between items-center">
                <span>Visits Ordered List</span>
                <span className="text-[10px] text-slate-400">{routeVisits.length} visits configured</span>
              </h4>

              <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto min-h-[100px] bg-slate-50/50 rounded-lg border border-slate-200/50">
                {routeVisits.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs font-bold h-32 flex items-center justify-center">
                    No routes assigned.
                  </div>
                ) : (
                  routeVisits.map((v, index) => (
                    <div key={v.customerId} className="p-3 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="font-bold font-mono text-slate-400 text-[10px]">{v.visitOrder}.</span>
                        <div>
                          <p className="font-bold text-slate-900">{v.customerName}</p>
                          <p className="text-[9px] text-slate-400">{v.village} - {v.street}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveOrder(index, 'up')}
                          disabled={index === 0}
                          className="p-1 hover:bg-slate-100 rounded disabled:opacity-30 cursor-pointer text-slate-500"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveOrder(index, 'down')}
                          disabled={index === routeVisits.length - 1}
                          className="p-1 hover:bg-slate-100 rounded disabled:opacity-30 cursor-pointer text-slate-500"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleRemoveCustomerFromRoute(v.customerId)}
                          className="p-1 hover:bg-red-50 text-red-600 rounded ml-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button
              onClick={handleSaveRoute}
              disabled={routeVisits.length === 0 || !selectedAgentId}
              className="btn btn-primary w-full py-2.5 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Confirm & Assign Route</span>
            </button>
          </div>
        </div>

        {/* Right Side: Select Customers */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <div className="h-8 w-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Customer Directory</h3>
                <p className="text-[10px] text-slate-400">Search and add customers to the route.</p>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search name or village..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="form-input pl-3"
              />
            </div>

            <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto border border-slate-100 rounded-lg">
              {availableCustomers.length === 0 ? (
                <div className="p-8 text-center text-slate-400 font-mono">
                  No match found.
                </div>
              ) : (
                availableCustomers.map(c => (
                  <div key={c.id} className="p-3 flex justify-between items-center hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="font-bold text-slate-900">{c.name}</p>
                      <p className="text-[9px] text-slate-400 font-medium">{c.village} - {c.address}</p>
                    </div>
                    <button
                      onClick={() => handleAddCustomerToRoute(c)}
                      disabled={!selectedAgentId}
                      className="p-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg border border-indigo-100 cursor-pointer transition-colors disabled:opacity-55 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
