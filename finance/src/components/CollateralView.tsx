import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { Plus, Landmark, Eye, ShieldCheck, RefreshCw, X, ArrowLeft, Camera, FileUp, Trash2, Maximize2 } from 'lucide-react';
import { CollateralStatus, Collateral } from '../types';
import { useToast } from './ToastProvider';

export const CollateralView: React.FC = () => {
  const { collaterals, loans, addCollateral, updateCollateralStatus, updateCollateral, userRole } = useVFMS();
  const { toast } = useToast();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [loanId, setLoanId] = useState('');
  const [type, setType] = useState('Gold');
  const [description, setDescription] = useState('');
  const [estimatedValue, setEstimatedValue] = useState('');
  const [storageLocation, setStorageLocation] = useState('');

  // New image states
  const [formImages, setFormImages] = useState<string[]>([]);
  const [selectedCollateralId, setSelectedCollateralId] = useState<string | null>(null);
  const [zoomedImageUrl, setZoomedImageUrl] = useState<string | null>(null);

  const selectedCollateral = collaterals.find(c => c.id === selectedCollateralId);

  const selectedLoan = loans.find(x => x.id === loanId);
  const calculatedLtv = selectedLoan && parseFloat(estimatedValue) > 0
    ? Math.round((selectedLoan.principal / parseFloat(estimatedValue)) * 100 * 100) / 100
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loanId || !estimatedValue || !description) return;

    try {
      await addCollateral({
        loanId,
        type,
        description,
        estimatedValue: parseFloat(estimatedValue) || 0,
        storageLocation,
        status: 'Deposited',
        ltv: calculatedLtv,
        images: formImages
      });
      toast.success('Collateral Added', 'The collateral has been successfully added to the vault.');

      setLoanId('');
      setType('Gold');
      setDescription('');
      setEstimatedValue('');
      setStorageLocation('');
      setFormImages([]);
      setIsCreateOpen(false);
    } catch (err: any) {
      console.error('Collateral add error:', err);
      toast.error('Failed to Add Collateral', err.message || 'An unexpected error occurred.');
    }
  };

  // ── RENDER SUB-TAB 1: CREATE COLLATERAL PAGE ──
  if (isCreateOpen) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in max-w-lg mx-auto">
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
          <button
            onClick={() => setIsCreateOpen(false)}
            className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h3 className="font-black text-slate-900 text-[13px] uppercase tracking-wider">Pledge Asset Against Loan</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Register tomorrow's vault deposit assets</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="form-label">Select Active Contract *</label>
            <select
              required
              value={loanId}
              onChange={(e) => setLoanId(e.target.value)}
              className="form-input"
            >
              <option value="">-- Choose Loan Portfolio --</option>
              {loans.filter(l => ['Active', 'Approved', 'Overdue'].includes(l.status)).map(l => (
                <option key={l.id} value={l.id}>{l.customerName} ({l.loanNumber}) - Principal: ₹{l.principal}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="form-label">Asset Classification</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="form-input"
              >
                <option value="Gold">Gold Ornaments</option>
                <option value="Vehicle">Vehicle Book (Asset backed)</option>
                <option value="Property">Property Deed / Land Title</option>
                <option value="Equipment">Machinery / Equipment</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="form-label">Estimated Market Value (₹) *</label>
              <input
                type="number"
                required
                value={estimatedValue}
                onChange={(e) => setEstimatedValue(e.target.value)}
                placeholder="e.g. 5000"
                className="form-input"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="form-label">Storage Location Details</label>
            <input
              type="text"
              value={storageLocation}
              onChange={(e) => setStorageLocation(e.target.value)}
              placeholder="e.g. Branch Locker B, Vault 1"
              className="form-input"
            />
          </div>

          <div className="space-y-1">
            <label className="form-label">Condition & Particular Description *</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. 24 karat gold chains, total weight 35g, mint condition"
              rows={3}
              className="form-input"
            />
          </div>

          {selectedLoan && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/50 text-[11px] font-medium text-slate-700 space-y-1">
              <p className="font-bold text-[10px] text-slate-500 uppercase">Calculated Loan-to-Value (LTV)</p>
              <div className="flex justify-between">
                <span className="text-slate-400">Loan Principal:</span>
                <span className="font-bold text-slate-800">₹{selectedLoan.principal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Collateral Value:</span>
                <span className="font-bold text-slate-800">₹{parseFloat(estimatedValue) || 0}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200/50 pt-1.5 mt-1">
                <span className="font-bold text-slate-600">LTV Ratio:</span>
                <span className={`font-black ${calculatedLtv > 80 ? 'text-red-600' : 'text-green-600'}`}>
                  {calculatedLtv}% {calculatedLtv > 80 ? '(High Risk Overdue)' : '(Safe Cover)'}
                </span>
              </div>
            </div>
          )}

          {/* Section 4: Collateral Images Upload */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <label className="form-label block font-semibold text-slate-700">Pledged Photos & Supporting Documents</label>
            
            <div className="flex gap-2 items-center">
              <div className="relative">
                <button
                  type="button"
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-[10px] flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200"
                >
                  <FileUp className="w-3.5 h-3.5 text-slate-500" />
                  <span>Upload Photos</span>
                </button>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (!files) return;
                    for (let i = 0; i < files.length; i++) {
                      const file = files[i];
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const base64 = event.target?.result as string;
                        setFormImages(prev => [...prev, base64]);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {formImages.length} images added
              </span>
            </div>

            {formImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-2 border border-slate-150 p-2 rounded-lg bg-slate-50/50">
                {formImages.map((img, idx) => (
                  <div key={idx} className="relative group aspect-square rounded border border-slate-200 overflow-hidden bg-white">
                    <img src={img} alt="preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormImages(prev => prev.filter((_, i) => i !== idx))}
                      className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full shadow cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="btn btn-secondary px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary px-4 py-2"
            >
              Register Vault Deposit
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ── RENDER SUB-TAB 2: LIST VIEW ──
  return (
    <div className="space-y-4">
      {/* Search and Action Bar */}
      <div className="bg-white p-4 rounded-[10px] border border-slate-200 flex justify-between items-center shadow-sm">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Physical Vault Registry</h2>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Track and audit pledged physical assets and LTV ratios</p>
        </div>

        {userRole !== 'Auditor' && (
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-[10px] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Deposit Collateral</span>
          </button>
        )}
      </div>

      {/* Main split-screen grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left Side: Table of Collaterals */}
        <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm overflow-hidden lg:col-span-2">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-white text-slate-400 font-bold text-[10px] uppercase border-b border-slate-100">
                <th className="px-4 py-2.5">Owner Client</th>
                <th className="px-4 py-2.5">Asset Type</th>
                <th className="px-4 py-2.5">Storage Location</th>
                <th className="px-4 py-2.5">Vault Valuation</th>
                <th className="px-4 py-2.5">LTV Ratio</th>
                <th className="px-4 py-2.5 text-right">Status Option</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {collaterals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-bold">No records found.</td>
                </tr>
              ) : (
                collaterals.map(col => {
                  const linkedLoan = loans.find(l => l.id === col.loanId);
                  const ltv = linkedLoan ? Math.round((linkedLoan.principal / col.estimatedValue) * 100) : 0;
                  return (
                    <tr 
                      key={col.id} 
                      onClick={() => setSelectedCollateralId(col.id)}
                      className={`hover:bg-slate-50/50 cursor-pointer transition-colors ${selectedCollateralId === col.id ? 'bg-red-50/10' : ''}`}
                    >
                      <td className="px-4 py-2.5 font-bold text-slate-900">
                        {linkedLoan ? linkedLoan.customerName : 'N/A Owner'}
                      </td>
                      <td className="px-4 py-2.5 font-medium">{col.type}</td>
                      <td className="px-4 py-2.5 text-slate-500">{col.storageLocation || 'Vault Core Locker'}</td>
                      <td className="px-4 py-2.5 font-bold text-slate-800">₹{col.estimatedValue.toLocaleString()}</td>
                      <td className="px-4 py-2.5">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          ltv > 80 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'
                        }`}>
                          {ltv}% LTV
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right" onClick={(e) => e.stopPropagation()}>
                        {userRole !== 'Auditor' ? (
                          <select
                            value={col.status}
                            onChange={async (e) => {
                              const newStatus = e.target.value as CollateralStatus;
                              try {
                                await updateCollateralStatus(col.id, newStatus);
                                toast.success('Collateral Updated', `Status changed to ${newStatus} successfully.`);
                              } catch (err: any) {
                                console.error('Collateral update error:', err);
                                toast.error('Update Failed', err.message || 'Could not update collateral status.');
                              }
                            }}
                            className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 focus:outline-none"
                          >
                            <option value="Deposited">Deposited</option>
                            <option value="Returned">Returned</option>
                            <option value="Liquidated">Liquidated</option>
                          </select>
                        ) : (
                          <span className={`px-2 py-0.5 rounded-[10px] text-[10px] font-bold border ${
                            col.status === 'Deposited' ? 'bg-green-50 text-green-700 border-green-200' :
                            col.status === 'Returned' ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-red-50 text-red-700 border-red-200'
                          }`}>
                            {col.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Right Side: Selected Collateral Details Workspace */}
        <div className="lg:col-span-1">
          {selectedCollateral ? (
            <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm p-4 space-y-4 text-xs">
              <div className="flex justify-between items-start border-b border-slate-150 pb-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-tight">
                    {loans.find(l => l.id === selectedCollateral.loanId)?.customerName || 'N/A Owner'}
                  </h3>
                  <span className="text-[9px] font-mono text-slate-400">Vault ID: {selectedCollateral.id}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[11px]">
                <div>
                  <span className="text-[9px] text-slate-400 block font-semibold uppercase">Asset Type</span>
                  <span className="font-bold text-slate-800">{selectedCollateral.type}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-semibold uppercase">Storage Location</span>
                  <span className="font-bold text-slate-800">{selectedCollateral.storageLocation || 'Vault Core Locker'}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-semibold uppercase">Valuation</span>
                  <span className="font-bold text-slate-800">₹{selectedCollateral.estimatedValue.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-semibold uppercase">LTV Cover</span>
                  <span className={`font-bold ${selectedCollateral.ltv > 80 ? 'text-red-600' : 'text-green-700'}`}>
                    {selectedCollateral.ltv}% LTV
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-[9px] text-slate-400 block font-semibold uppercase">Description</span>
                  <span className="text-slate-700 block mt-0.5 leading-relaxed">{selectedCollateral.description}</span>
                </div>
              </div>

              {/* Pledged Photos Vault Gallery */}
              <div className="border-t border-slate-150 pt-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider block">Pledged Photos & Documents</span>
                  {userRole !== 'Auditor' && (
                    <div className="relative">
                      <button className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 font-bold border border-red-100 rounded text-[9px] flex items-center gap-1 cursor-pointer transition-colors">
                        <Plus className="w-3 h-3" /> Add Photo
                      </button>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = async (event) => {
                            const base64 = event.target?.result as string;
                            try {
                              const updatedImages = [...(selectedCollateral.images || []), base64];
                              await updateCollateral(selectedCollateral.id, { images: updatedImages });
                              toast.success('Photo Added', 'Supporting document/photo saved successfully.');
                            } catch (err: any) {
                              toast.error('Upload Failed', err.message || 'Could not save photo.');
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                    </div>
                  )}
                </div>

                {selectedCollateral.images && selectedCollateral.images.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 mt-2 max-h-48 overflow-y-auto p-1 bg-slate-50 rounded-lg border border-slate-150">
                    {selectedCollateral.images.map((img, idx) => (
                      <div key={idx} className="relative group aspect-square rounded border border-slate-200 overflow-hidden bg-white shadow-sm flex items-center justify-center">
                        <img src={img} alt="pledged item" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            onClick={() => setZoomedImageUrl(img)}
                            className="p-1 bg-white/90 rounded text-slate-700 hover:bg-white cursor-pointer"
                            title="Zoom image"
                          >
                            <Maximize2 className="w-3 h-3" />
                          </button>
                          {userRole !== 'Auditor' && (
                            <button
                              onClick={async () => {
                                if (confirm('Are you sure you want to remove this pledged photo?')) {
                                  try {
                                    const updatedImages = selectedCollateral.images!.filter((_, i) => i !== idx);
                                    await updateCollateral(selectedCollateral.id, { images: updatedImages });
                                    toast.success('Photo Removed', 'The photo has been removed from records.');
                                  } catch (err: any) {
                                    toast.error('Deletion Failed', err.message || 'Could not delete photo.');
                                  }
                                }
                              }}
                              className="p-1 bg-white/90 rounded text-red-600 hover:bg-white cursor-pointer"
                              title="Delete image"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-[10px] text-slate-400 font-bold block p-4 text-center border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
                    No uploaded documents.
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-[10px] border border-slate-200 shadow-sm text-center text-slate-400 py-16 flex flex-col items-center justify-center">
              <Landmark className="w-12 h-12 text-slate-300 stroke-[1.25] animate-pulse" />
              <h3 className="font-bold text-slate-700 text-sm mt-3">No Collateral Selected</h3>
              <p className="text-xs mt-1 max-w-[200px]">Select a collateral vault folder on the left to view pledged assets and upload photos.</p>
            </div>
          )}
        </div>

      </div>

      {/* Full-screen zoomed image viewer */}
      {zoomedImageUrl && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-2 animate-zoom-in">
            <button
              onClick={() => setZoomedImageUrl(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer shadow z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={zoomedImageUrl} alt="Collateral Zoomed" className="w-full max-h-[80vh] object-contain rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};
