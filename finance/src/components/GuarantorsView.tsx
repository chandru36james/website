import React, { useState, useRef, useEffect } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { 
  Plus, Users, Eye, ShieldCheck, RefreshCw, X, Search, 
  Trash2, Phone, MapPin, Award, PenTool, Check, FileText, ArrowLeft
} from 'lucide-react';
import { Guarantor, Loan } from '../types';

export const GuarantorsView: React.FC = () => {
  const { 
    guarantors, 
    loans, 
    customers,
    addGuarantor, 
    updateGuarantor, 
    deleteGuarantor, 
    userRole,
    logAudit 
  } = useVFMS();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuarantor, setSelectedGuarantor] = useState<Guarantor | null>(null);
  
  // Create / Edit states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [name, setName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [relationship, setRelationship] = useState('Relative');
  const [selectedLoanIds, setSelectedLoanIds] = useState<string[]>([]);
  const [signatureType, setSignatureType] = useState<'draw' | 'type'>('draw');
  
  // Drawing canvas refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState('');
  const [typedSignature, setTypedSignature] = useState('');

  // Auto select first guarantor
  useEffect(() => {
    if (guarantors.length > 0 && !selectedGuarantor) {
      setSelectedGuarantor(guarantors[0]);
    }
  }, [guarantors, selectedGuarantor]);

  // Set up signature canvas context
  useEffect(() => {
    if (isModalOpen && signatureType === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#0F172A'; // Slate 900
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [isModalOpen, signatureType]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    let x, y;
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    let x, y;
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
      setSignatureDataUrl(canvas.toDataURL());
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setSignatureDataUrl('');
    }
  };

  const handleToggleLoanSelection = (loanId: string) => {
    if (selectedLoanIds.includes(loanId)) {
      setSelectedLoanIds(prev => prev.filter(id => id !== loanId));
    } else {
      setSelectedLoanIds(prev => [...prev, loanId]);
    }
  };

  const openCreateMode = () => {
    setEditingId(null);
    setName('');
    setNationalId('');
    setMobile('');
    setAddress('');
    setRelationship('Relative');
    setSelectedLoanIds([]);
    setSignatureType('draw');
    setSignatureDataUrl('');
    setTypedSignature('');
    setIsModalOpen(true);
  };

  const openEditMode = (guar: Guarantor) => {
    setEditingId(guar.id);
    setName(guar.name);
    setNationalId(guar.nationalId);
    setMobile(guar.mobile);
    setAddress(guar.address || '');
    setRelationship(guar.relationship);
    setSelectedLoanIds(guar.loanIds || []);
    
    const isDrawn = guar.signature.startsWith('data:image/');
    if (isDrawn) {
      setSignatureType('draw');
      setSignatureDataUrl(guar.signature);
      setTypedSignature('');
    } else {
      setSignatureType('type');
      setTypedSignature(guar.signature);
      setSignatureDataUrl('');
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !nationalId || !mobile) return;

    const signatureFinalData = signatureType === 'draw' ? signatureDataUrl : typedSignature;
    if (!signatureFinalData) {
      alert('Guarantor signature authorization is required.');
      return;
    }

    if (editingId) {
      await updateGuarantor(editingId, {
        name,
        nationalId,
        mobile,
        address,
        relationship,
        loanIds: selectedLoanIds,
        signature: signatureFinalData
      });
    } else {
      await addGuarantor({
        name,
        nationalId,
        mobile,
        address,
        relationship,
        loanIds: selectedLoanIds,
        signature: signatureFinalData
      });
    }

    setIsModalOpen(false);
    setSelectedGuarantor(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to release this guarantor from active co-signer obligations?')) {
      await deleteGuarantor(id);
      setSelectedGuarantor(null);
    }
  };

  const filteredGuarantors = guarantors.filter(g => {
    const term = searchQuery.toLowerCase();
    return g.name.toLowerCase().includes(term) || g.nationalId.includes(term) || g.mobile.includes(term);
  });

  const totalCoSignedPortfolioValue = selectedGuarantor
    ? loans.filter(l => selectedGuarantor.loanIds.includes(l.id)).reduce((sum, l) => sum + l.principal, 0)
    : 0;

  // ── RENDER SUB-TAB 1: CREATE CO-SIGNER PAGE ──
  if (isModalOpen) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in max-w-xl mx-auto">
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h3 className="font-black text-slate-900 text-[13px] uppercase tracking-wider">
              {editingId ? 'Modify Guarantor Dossier' : 'Register New Co-Signer'}
            </h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Verify original physical ID documents prior to ledger enrollment</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="form-label">Full Legal Name *</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter co-signer name"
                className="form-input"
              />
            </div>

            <div className="space-y-1">
              <label className="form-label">National ID / Aadhaar *</label>
              <input 
                type="text" 
                required
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                placeholder="Enter National Identity code"
                className="form-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="form-label">Mobile Contact *</label>
              <input 
                type="text" 
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+91 or local cell number"
                className="form-input"
              />
            </div>

            <div className="space-y-1">
              <label className="form-label">Relationship to Borrower</label>
              <select 
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="form-input"
              >
                <option value="Spouse">Spouse</option>
                <option value="Parent">Parent</option>
                <option value="Sibling">Sibling</option>
                <option value="Relative">Relative</option>
                <option value="Business Partner">Business Partner</option>
                <option value="Employer">Employer / Supervisor</option>
                <option value="Friend">Close Friend</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="form-label">Residential Address</label>
            <textarea 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street address, city, district"
              rows={2}
              className="form-input"
            />
          </div>

          {/* Linked Loans selection lists */}
          <div className="space-y-1.5">
            <label className="form-label">Assign / Co-Sign Portfolios</label>
            <div className="border border-slate-200 rounded-[10px] p-2 max-h-32 overflow-y-auto space-y-1.5 bg-slate-50/50">
              {loans.length === 0 ? (
                <span className="text-[10px] text-slate-400 font-medium block p-2 text-center">No active loans exist to co-sign.</span>
              ) : (
                loans.map(loan => {
                  const isChecked = selectedLoanIds.includes(loan.id);
                  return (
                    <div 
                      key={loan.id}
                      onClick={() => handleToggleLoanSelection(loan.id)}
                      className={`p-2 rounded-lg border text-[10px] flex items-center justify-between cursor-pointer transition-colors ${
                        isChecked 
                          ? 'bg-red-50/30 border-red-200 text-slate-900 font-bold' 
                          : 'border-slate-150 bg-white text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-red-600 border-red-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-2.5 h-2.5" />}
                        </div>
                        <div>
                          <span className="font-mono">{loan.loanNumber}</span>
                          <span className="text-slate-400 font-medium ml-1">({loan.customerName})</span>
                        </div>
                      </div>
                      <span className="font-bold">₹{loan.principal.toLocaleString()}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Secure Signature execution panel */}
          <div className="border border-slate-200 rounded-[10px] overflow-hidden bg-slate-50/50">
            <div className="px-3 py-2 bg-slate-150 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <span className="text-[10px] font-bold font-mono text-slate-600 uppercase tracking-wider flex items-center gap-1">
                <PenTool className="w-3.5 h-3.5 text-red-600" />
                Digital Ledger Co-Sign *
              </span>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSignatureType('draw')}
                  className={`px-2 py-0.5 rounded text-[9px] font-bold ${signatureType === 'draw' ? 'bg-red-100 text-red-600' : 'text-slate-500'}`}
                >
                  Draw Pad
                </button>
                <button
                  type="button"
                  onClick={() => setSignatureType('type')}
                  className={`px-2 py-0.5 rounded text-[9px] font-bold ${signatureType === 'type' ? 'bg-red-100 text-red-600' : 'text-slate-500'}`}
                >
                  Keyboard Style
                </button>
              </div>
            </div>

            <div className="p-3 bg-white">
              {signatureType === 'draw' ? (
                <div className="space-y-2">
                  <div className="border border-dashed border-slate-300 rounded-[10px] h-32 relative bg-slate-50 overflow-hidden cursor-crosshair">
                    <canvas
                      ref={canvasRef}
                      width={440}
                      height={128}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="w-full h-full"
                    />
                    {!signatureDataUrl && (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-300 pointer-events-none select-none text-[10px] font-mono">
                        Draw co-signer signature here
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-slate-400 font-mono">Stroke captured in SVG vector format</span>
                    <button
                      type="button"
                      onClick={clearCanvas}
                      className="px-2 py-1 text-slate-500 hover:text-red-600 rounded text-[9px] font-bold bg-slate-100 hover:bg-slate-200"
                    >
                      Wipe & Re-draw
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <input 
                    type="text" 
                    value={typedSignature}
                    onChange={(e) => setTypedSignature(e.target.value)}
                    placeholder="Type full legal name for stylized digital representation"
                    className="form-input"
                  />
                  {typedSignature && (
                    <div className="border border-slate-200 p-4 h-20 rounded-[10px] flex items-center justify-center bg-slate-50">
                      <span className="font-serif italic text-xl text-slate-700 tracking-wider font-bold select-none">
                        {typedSignature}
                      </span>
                    </div>
                  )}
                  <span className="text-[9px] text-slate-400 font-mono block">Creates a secured, legally co-signed digital glyph of typed string.</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions Footer */}
          <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="btn btn-secondary px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary px-4 py-2"
            >
              {editingId ? 'Save Changes' : 'Confirm & Register'}
            </button>
          </div>

        </form>
      </div>
    );
  }

  // ── RENDER SUB-TAB 2: LIST VIEW ──
  return (
    <div className="space-y-4">
      {/* Upper search and action controller bar */}
      <div className="bg-white p-4 rounded-[10px] border border-slate-200 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search co-signers by name, Aadhaar card or cell number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-[10px] text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>

        {userRole !== 'Auditor' && (
          <button 
            onClick={openCreateMode}
            className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-[10px] text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Link Guarantor</span>
          </button>
        )}
      </div>

      {/* Main split workdesk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left pane: Registry index list */}
        <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm overflow-hidden lg:col-span-2">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Co-Signer Registry Index</h3>
            <span className="text-[10px] font-mono font-bold text-slate-400">{filteredGuarantors.length} Profiles loaded</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-white text-slate-400 font-bold text-[10px] uppercase border-b border-slate-100">
                  <th className="px-4 py-2.5">Guarantor Name</th>
                  <th className="px-4 py-2.5">Aadhaar ID</th>
                  <th className="px-4 py-2.5">Mobile Cell</th>
                  <th className="px-4 py-2.5">Obligations</th>
                  <th className="px-4 py-2.5 text-right">Relationship</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredGuarantors.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">No matching guarantor dossiers found.</td>
                  </tr>
                ) : (
                  filteredGuarantors.map(guar => (
                    <tr 
                      key={guar.id}
                      onClick={() => setSelectedGuarantor(guar)}
                      className={`hover:bg-slate-50/50 cursor-pointer ${selectedGuarantor?.id === guar.id ? 'bg-red-50/10' : ''}`}
                    >
                      <td className="px-4 py-2.5 font-bold text-slate-900">{guar.name}</td>
                      <td className="px-4 py-2.5 font-mono text-slate-500">{guar.nationalId}</td>
                      <td className="px-4 py-2.5 font-mono">{guar.mobile}</td>
                      <td className="px-4 py-2.5">
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {guar.loanIds.length} Loans
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium text-slate-600">{guar.relationship}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right pane: Selected details workspace */}
        <div className="lg:col-span-1">
          {selectedGuarantor ? (
            <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm p-4 space-y-4">
              
              <div className="flex justify-between items-start border-b border-slate-150 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-tight">{selectedGuarantor.name}</h3>
                  <span className="text-[9px] font-mono text-slate-400">Dossier: {selectedGuarantor.id}</span>
                </div>
                
                {userRole !== 'Auditor' && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openEditMode(selectedGuarantor)}
                      className="p-1 rounded bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 cursor-pointer"
                      title="Edit Dossier"
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(selectedGuarantor.id)}
                      className="p-1 rounded bg-slate-50 border border-slate-200 hover:bg-red-50 hover:text-red-600 text-slate-400 cursor-pointer"
                      title="Delete profile"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Data parameters */}
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center gap-2 text-slate-500">
                  <Award className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span>National ID: <strong className="text-slate-800 font-mono">{selectedGuarantor.nationalId}</strong></span>
                </div>

                <div className="flex items-center gap-2 text-slate-500">
                  <Phone className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span>Mobile: <strong className="text-slate-800 font-mono">{selectedGuarantor.mobile}</strong></span>
                </div>

                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span className="truncate">Address: <strong className="text-slate-700 font-medium">{selectedGuarantor.address || 'No Address Logged'}</strong></span>
                </div>
              </div>

              {/* Co-signed obligations */}
              <div className="border-t border-slate-150 pt-3 space-y-2">
                <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider block">Co-Signed Obligations</span>
                <span className="text-xl font-bold text-slate-900 mt-1 block">₹{totalCoSignedPortfolioValue.toLocaleString()}</span>
                
                <div className="space-y-1.5 mt-2 max-h-36 overflow-y-auto">
                  {loans.filter(l => selectedGuarantor.loanIds.includes(l.id)).map(loan => (
                    <div key={loan.id} className="p-2 border border-slate-150 rounded-lg flex items-center justify-between bg-slate-50/50 text-[10px]">
                      <div>
                        <span className="font-bold text-slate-800 block">₹{loan.principal.toLocaleString()}</span>
                        <span className="text-slate-400 font-mono">{loan.loanNumber} ({loan.customerName})</span>
                      </div>
                      <span className={`px-1.5 py-0.2 rounded-full font-bold text-[8px] border uppercase tracking-wider ${
                        loan.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' :
                        loan.status === 'Overdue' ? 'bg-red-50 text-red-700 border-red-200 animate-pulse' : 'bg-slate-50 text-slate-500 border-slate-200'
                      }`}>
                        {loan.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Digital Signature Audit */}
              <div className="border-t border-slate-150 pt-3">
                <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider block">Cryptographic Signature Proof</span>
                <div className="border border-dashed border-slate-200 rounded-[10px] p-2 mt-1.5 h-16 flex items-center justify-center bg-slate-50">
                  {selectedGuarantor.signature.startsWith('data:image/') ? (
                    <img 
                      src={selectedGuarantor.signature} 
                      alt={`${selectedGuarantor.name} signature`}
                      className="max-h-full max-w-full object-contain filter dark:invert"
                    />
                  ) : (
                    <span className="font-serif italic text-lg text-slate-600 font-bold select-none tracking-wider">
                      {selectedGuarantor.signature}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-2 justify-center text-emerald-600 text-[9px] font-bold font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>VERIFIED BY LEDGER EXECUTION SYSTEM</span>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center text-gray-400 py-16 flex flex-col items-center justify-center">
              <Users className="w-12 h-12 text-gray-300 stroke-[1.25]" />
              <h3 className="font-bold text-gray-700 text-sm mt-3">No Guarantor Folder Selected</h3>
              <p className="text-xs mt-1 max-w-[200px]">Select a profile index folder on the left to audit digital legal signature files.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
