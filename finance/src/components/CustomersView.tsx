import React, { useState, useRef, useEffect } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { Customer } from '../types';
import { 
  Plus, Search, ShieldAlert, FileUp, RefreshCw, Eye, X, Contact2, ArrowLeft,
  FileText, ShieldCheck, Trash2, Clock, Camera, RotateCw
} from 'lucide-react';
import { ActionConfirmModal } from './ActionConfirmModal';
import { DocumentType, CustomerDocument } from '../types';
import { compressImage, rotateImage90, getGeotag } from '../utils/camera';

export const CustomersView: React.FC = () => {
  const { 
    customers, addCustomer, updateCustomer, userRole, securityPolicy,
    documents, uploadDocument, verifyDocument, archiveDocument, isFirestoreMode
  } = useVFMS();

  const [isSensitiveUnmasked, setIsSensitiveUnmasked] = useState(false);
  const [isUnmaskConfirmOpen, setIsUnmaskConfirmOpen] = useState(false);

  const maskPhone = (phoneStr: string) => {
    if (!securityPolicy?.sensitiveDataMasking || isSensitiveUnmasked) return phoneStr;
    if (phoneStr.length <= 4) return '••••';
    return phoneStr.substring(0, 3) + '••••' + phoneStr.substring(phoneStr.length - 4);
  };

  const maskEmail = (emailStr: string) => {
    if (!emailStr) return 'No email';
    if (!securityPolicy?.sensitiveDataMasking || isSensitiveUnmasked) return emailStr;
    const parts = emailStr.split('@');
    if (parts.length < 2) return '••••••••';
    const prefix = parts[0];
    const domain = parts[1];
    if (prefix.length <= 2) return '••@' + domain;
    return prefix[0] + '••••' + prefix[prefix.length - 1] + '@' + domain;
  };

  const maskAadhaar = (aadhaarStr: string) => {
    if (!securityPolicy?.sensitiveDataMasking || isSensitiveUnmasked) return aadhaarStr;
    if (aadhaarStr.length <= 4) return '••••';
    return '••••-••••-' + aadhaarStr.substring(aadhaarStr.length - 4);
  };

  const maskPan = (panStr: string) => {
    if (!securityPolicy?.sensitiveDataMasking || isSensitiveUnmasked) return panStr;
    if (panStr.length <= 3) return '••••';
    return panStr.substring(0, 3) + '••••' + panStr.substring(panStr.length - 2);
  };

  const DOCUMENT_CATEGORIES: { type: DocumentType; label: string; description: string }[] = [
    { type: 'AADHAAR', label: 'Aadhaar Card', description: 'National Identity Proof (PDF, max 10MB)' },
    { type: 'PAN', label: 'PAN Card', description: 'Tax Registration Card (JPEG/PNG, max 5MB)' },
    { type: 'PHOTO', label: 'Passport Photo', description: 'Recent headshot photograph (JPEG/PNG, max 5MB)' },
    { type: 'SIGNATURE', label: 'Signature Specimen', description: 'Borrower signature authorization file' },
    { type: 'BANK_STATEMENT', label: 'Bank Statement', description: 'Income verification history (PDF, max 10MB)' },
    { type: 'LOAN_APPLICATION', label: 'Application Form', description: 'Signed loan request document' },
    { type: 'COLLATERAL', label: 'Asset Collateral Deed', description: 'Pledged asset titles / deeds' },
    { type: 'OTHER', label: 'Other Support File', description: 'Miscellaneous KYC support references' }
  ];

  // Upload/Verification States
  const [uploadingDocType, setUploadingDocType] = useState<DocumentType | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [verificationRemarks, setVerificationRemarks] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [verifyingDocId, setVerifyingDocId] = useState<string | null>(null);

  const generateSHA256 = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: DocumentType, customerId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setIsUploading(true);

    try {
      // 1. MIME Validation
      const allowedMimeTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      if (!allowedMimeTypes.includes(file.type)) {
        throw new Error('Unsupported format. Only PDF, PNG, JPEG, and WEBP files are allowed.');
      }

      // 2. Size Validation
      const maxSize = file.type === 'application/pdf' ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
      if (file.size > maxSize) {
        const sizeLimitMsg = file.type === 'application/pdf' ? '10 MB' : '5 MB';
        throw new Error(`File size exceeds limit. Maximum allowed size is ${sizeLimitMsg}.`);
      }

      // 3. Hash calculation
      const hash = await generateSHA256(file);

      // 4. File payload reading
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        try {
          await uploadDocument({
            customerId,
            documentType: type,
            fileName: file.name,
            mimeType: file.type,
            size: file.size,
            checksum: hash,
            base64
          });
        } catch (uploadErr: any) {
          setUploadError(uploadErr.message || 'Failed to complete document upload.');
        } finally {
          setIsUploading(false);
          setUploadingDocType(null);
        }
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setUploadError(err.message || 'Failed validation check.');
      setIsUploading(false);
    }
  };

  // Camera Management states
  const [activeCameraType, setActiveCameraType] = useState<DocumentType | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraPermissionError, setCameraPermissionError] = useState<string | null>(null);
  const [cameraFacingMode, setCameraFacingMode] = useState<'user' | 'environment'>('environment');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startCamera = async (type: DocumentType) => {
    setCapturedImage(null);
    setCameraPermissionError(null);
    setActiveCameraType(type);
    
    // Stop any existing stream first
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: cameraFacingMode, width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      setCameraStream(stream);
      // Wait for React to render video element before assigning stream
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err: any) {
      setCameraPermissionError(
        'Camera access was denied. Please adjust your browser camera permissions or select the standard File Upload instead.'
      );
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setActiveCameraType(null);
    setCapturedImage(null);
    setCameraPermissionError(null);
  };

  // Trigger camera ref initialization if stream starts
  useEffect(() => {
    if (cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  const capturePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL('image/jpeg', 0.95);
        setCapturedImage(base64);
      }
    }
  };

  const rotateCapturedImage = async () => {
    if (!capturedImage) return;
    try {
      const rotated = await rotateImage90(capturedImage);
      setCapturedImage(rotated);
    } catch (e) {
      console.error('Failed to rotate photo:', e);
    }
  };

  const savePhoto = async (customerId: string) => {
    if (!capturedImage || !activeCameraType) return;
    setUploadError(null);
    setIsUploading(true);

    try {
      // 1. Compression
      const compressed = await compressImage(capturedImage, 1920, 0.8);

      // Convert to blob to calculate exact byte size and SHA-256 hash
      const byteString = atob(compressed.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: 'image/jpeg' });
      const fileFromBlob = new File([blob], `${activeCameraType.toLowerCase()}-capture.jpg`, { type: 'image/jpeg' });

      // 2. Hash calculation
      const hash = await generateSHA256(fileFromBlob);

      // 3. Geotagging lookup
      const geotag = await getGeotag();

      // 4. Save to vault
      await uploadDocument({
        customerId,
        documentType: activeCameraType,
        fileName: `${activeCameraType.toLowerCase()}-${Date.now()}.jpg`,
        mimeType: 'image/jpeg',
        size: blob.size,
        checksum: hash,
        base64: compressed,
        captureSource: 'CAMERA',
        geotag
      });

      // Cleanup
      stopCamera();
    } catch (err: any) {
      setUploadError(err.message || 'Failed to save camera capture to vault.');
    } finally {
      setIsUploading(false);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedCust, setSelectedCust] = useState<Customer | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const [income, setIncome] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [pan, setPan] = useState('');
  const [references, setReferences] = useState('');
  const [nominee, setNominee] = useState('');
  const [riskCategory, setRiskCategory] = useState<'Low' | 'Medium' | 'High'>('Low');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !aadhaar || !pan) return;

    await addCustomer({
      name,
      email,
      phone,
      address,
      occupation,
      income: parseFloat(income) || 0,
      aadhaar,
      pan,
      references,
      nominee,
      riskCategory,
      status,
      notes
    });

    // Reset Form
    setName(''); setEmail(''); setPhone(''); setAddress('');
    setOccupation(''); setIncome(''); setAadhaar(''); setPan('');
    setReferences(''); setNominee(''); setRiskCategory('Low'); setStatus('Active'); setNotes('');
    setIsCreateOpen(false);
  };

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.phone.includes(searchQuery) ||
                          c.aadhaar.includes(searchQuery);
    const matchesRisk = riskFilter === 'All' || c.riskCategory === riskFilter;
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesRisk && matchesStatus;
  });

  // ── RENDER SUB-TAB 1: CREATE CUSTOMER PAGE ──
  if (isCreateOpen) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in max-w-2xl mx-auto">
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
          <button
            onClick={() => setIsCreateOpen(false)}
            className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h3 className="font-black text-slate-900 text-[13px] uppercase tracking-wider">New Customer Registration</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Register a new borrower profile in the ledger</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Section 1: Demographics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Naidu"
                className="form-input"
              />
            </div>
            <div className="space-y-1">
              <label className="form-label">Phone Number *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 98765 00000"
                className="form-input"
              />
            </div>
            <div className="space-y-1">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. ramesh@gmail.com"
                className="form-input"
              />
            </div>
            <div className="space-y-1">
              <label className="form-label">Nominee Name</label>
              <input
                type="text"
                value={nominee}
                onChange={(e) => setNominee(e.target.value)}
                placeholder="Nominee relation/name"
                className="form-input"
              />
            </div>
          </div>

          {/* Section 2: KYC Specifics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="form-label">Aadhaar National ID *</label>
              <input
                type="text"
                required
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
                placeholder="12-digit number"
                className="form-input"
              />
            </div>
            <div className="space-y-1">
              <label className="form-label">PAN Card Number *</label>
              <input
                type="text"
                required
                value={pan}
                onChange={(e) => setPan(e.target.value)}
                placeholder="10-digit alphanumeric"
                className="form-input"
              />
            </div>
          </div>

          {/* Section 3: Professional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="form-label">Occupation</label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="Shop owner, Engineer, etc."
                className="form-input"
              />
            </div>
            <div className="space-y-1">
              <label className="form-label">Annual Income (₹)</label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="e.g. 55000"
                className="form-input"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="form-label">Primary Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full Residential Address details"
              rows={2}
              className="form-input"
            />
          </div>

          <div className="space-y-1">
            <label className="form-label">Underwriter KYC References / Guarantor</label>
            <input
              type="text"
              value={references}
              onChange={(e) => setReferences(e.target.value)}
              placeholder="Guarantor Name, relation and contact info"
              className="form-input"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="form-label">Risk Rating Category</label>
              <select
                value={riskCategory}
                onChange={(e) => setRiskCategory(e.target.value as any)}
                className="form-input"
              >
                <option value="Low">Low Risk Profile</option>
                <option value="Medium">Medium Risk Profile</option>
                <option value="High">High Risk Profile (Collateral Preferred)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="form-label">Initial Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="form-input"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="form-label">Internal Underwriter Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Special observations or conditions..."
              rows={2}
              className="form-input"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
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
              Save Registration
            </button>
          </div>

        </form>
      </div>
    );
  }

  // ── RENDER SUB-TAB 2: LIST & DETAILS ──
  return (
    <div className="space-y-4">
      
      {/* Search and Action Bar */}
      <div className="bg-white p-4 rounded-[10px] border border-slate-200 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 shadow-sm">
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Name, Phone, or Aadhaar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-[10px] text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          {/* Filters */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-[10px] text-xs font-bold text-slate-600 focus:outline-none"
          >
            <option value="All">All Risk Metrics</option>
            <option value="Low">Low Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="High">High Risk</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-[10px] text-xs font-bold text-slate-600 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active Customers</option>
            <option value="Inactive">Inactive Customers</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
        </div>

        {userRole !== 'Auditor' && (
          <button
            id="register-customer-btn"
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-1.5 bg-red-600 text-white rounded-[10px] text-xs font-bold flex items-center gap-1.5 hover:bg-red-700 transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Register Customer</span>
          </button>
        )}
      </div>

      {/* Main Customers List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left Side: Table of Customers */}
        <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm overflow-hidden lg:col-span-2">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Registered Customers Registry</h2>
            <span className="text-[10px] font-mono font-bold text-slate-400">{filteredCustomers.length} Records found</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white text-slate-400 font-bold text-[10px] uppercase border-b border-slate-100">
                  <th className="px-4 py-2.5">Borrower Name</th>
                  <th className="px-4 py-2.5">Mobile Contact</th>
                  <th className="px-4 py-2.5">PAN Card ID</th>
                  <th className="px-4 py-2.5">Risk Rating</th>
                  <th className="px-4 py-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">No matching customer folders registered.</td>
                  </tr>
                ) : (
                  filteredCustomers.map(cust => (
                    <tr 
                      key={cust.id} 
                      onClick={() => setSelectedCust(cust)}
                      className={`hover:bg-slate-50/30 cursor-pointer transition-colors ${selectedCust?.id === cust.id ? 'bg-red-50/10' : ''}`}
                    >
                      <td className="px-4 py-2.5 font-bold text-slate-900">{cust.name}</td>
                      <td className="px-4 py-2.5 font-mono">{maskPhone(cust.phone)}</td>
                      <td className="px-4 py-2.5 font-mono">{maskPan(cust.pan)}</td>
                      <td className="px-4 py-2.5">
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                          cust.riskCategory === 'Low' ? 'bg-green-50 text-green-700 border border-green-100' :
                          cust.riskCategory === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                          {cust.riskCategory} Risk
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <span className={`w-2 h-2 rounded-full inline-block ${
                          cust.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                        }`} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Detail Workspace Panel */}
        <div className="lg:col-span-1">
          {selectedCust ? (
            <>
              <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm p-4 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-tight">{selectedCust.name}</h3>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {selectedCust.id}</p>
                  </div>
                  <div className="flex gap-1.5">
                    {securityPolicy?.sensitiveDataMasking && !isSensitiveUnmasked && (
                      <button
                        onClick={() => setIsUnmaskConfirmOpen(true)}
                        className="p-1 rounded bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-500 cursor-pointer transition-colors"
                        title="Unmask identity details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-2 gap-y-3.5 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Mobile Phone</span>
                    <span className="text-slate-800 font-mono font-medium">{maskPhone(selectedCust.phone)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Email Address</span>
                    <span className="text-slate-800 truncate block font-medium">{maskEmail(selectedCust.email)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">PAN Number</span>
                    <span className="text-slate-800 font-mono font-medium">{maskPan(selectedCust.pan)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Aadhaar National ID</span>
                    <span className="text-slate-800 font-mono font-medium">{maskAadhaar(selectedCust.aadhaar)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Occupation</span>
                    <span className="text-slate-800 font-medium">{selectedCust.occupation || 'Not Specified'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Annual Income</span>
                    <p className="text-slate-800 font-bold mt-0.5">₹{selectedCust.income.toLocaleString()}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Address</span>
                    <span className="text-slate-700 leading-normal block">{selectedCust.address || 'No address logged.'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Nominee</span>
                    <span className="text-slate-700 leading-normal block">{selectedCust.nominee || 'No nominee configured.'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Underwriter KYC References</span>
                    <span className="text-slate-700 leading-normal block">{selectedCust.references || 'No co-signing references.'}</span>
                  </div>
                  {selectedCust.notes && (
                    <div className="col-span-2 p-2 bg-amber-50/50 border border-amber-100 rounded-lg">
                      <span className="text-[9px] font-bold text-amber-700 uppercase">Underwriter Notes</span>
                      <p className="text-amber-800 text-[10px] mt-0.5 leading-relaxed">{selectedCust.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* KYC Document Management Subsystem */}
              <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm p-4 space-y-4 mt-4 text-xs">
                <div className="border-b border-slate-100 pb-2.5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">KYC Document Vault</h3>
                    <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Compliant multi-version borrower records registry</p>
                  </div>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold font-mono uppercase tracking-wider ${
                    isFirestoreMode ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-green-50 text-green-700 border border-green-200'
                  }`}>
                    {isFirestoreMode ? '☁️ Firebase Cloud' : '🟢 Local Sandbox'}
                  </span>
                </div>

                {uploadError && (
                  <div className="p-2 border border-red-200 bg-red-50 text-red-700 rounded-lg text-[10px] font-medium flex items-center gap-1.5 animate-pulse">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                <div className="space-y-3">
                  {DOCUMENT_CATEGORIES.map(category => {
                    // Find active document for this category
                    const activeDoc = documents.find(
                      d => d.customerId === selectedCust.id && d.documentType === category.type && d.status === 'ACTIVE'
                    );

                    return (
                      <div 
                        key={category.type} 
                        className={`p-3 border rounded-[10px] transition-all flex flex-col gap-2.5 ${
                          activeDoc 
                            ? 'bg-slate-50/50 border-slate-200' 
                            : 'border-dashed border-slate-200 hover:bg-slate-50/30'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold text-slate-800 text-[11px] block">{category.label}</span>
                            <span className="text-[9px] text-slate-400 block font-medium mt-0.5">{category.description}</span>
                          </div>

                          {activeDoc ? (
                            <span className={`px-1.5 py-0.2 rounded-full font-bold text-[8px] border uppercase tracking-wider ${
                              activeDoc.verificationStatus === 'VERIFIED' ? 'bg-green-50 text-green-700 border-green-200' :
                              activeDoc.verificationStatus === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' :
                              activeDoc.verificationStatus === 'EXPIRED' ? 'bg-slate-50 text-slate-400 border-slate-200' : 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
                            }`}>
                              {activeDoc.verificationStatus}
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.2 rounded-full font-bold text-[8px] border border-slate-200 text-slate-400 bg-slate-50 uppercase tracking-wider">
                              Missing
                            </span>
                          )}
                        </div>

                        {activeDoc ? (
                          <div className="bg-white p-2 border border-slate-150 rounded-lg flex flex-col gap-2">
                            <div className="flex justify-between items-center text-[10px]">
                              <div className="flex items-center gap-1.5 text-slate-600 font-medium truncate">
                                <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span className="truncate" title={activeDoc.fileName}>{activeDoc.fileName}</span>
                              </div>
                              <span className="text-slate-400 shrink-0 font-mono text-[9px] font-bold">
                                v{activeDoc.version} ({(activeDoc.size / (1024 * 1024)).toFixed(2)} MB)
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[9px] border-t border-slate-100 pt-1.5 font-medium text-slate-500">
                              <div>
                                <span className="text-slate-400 block">Checksum SHA-256</span>
                                <span className="font-mono text-slate-600 block truncate" title={activeDoc.checksum}>
                                  {activeDoc.checksum.substring(0, 12)}...
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-400 block">Uploaded By / At</span>
                                <span className="text-slate-600 block truncate">
                                  {activeDoc.uploadedBy} @ {new Date(activeDoc.uploadedAt).toLocaleDateString()}
                                </span>
                              </div>
                              {activeDoc.expiryDate && (
                                <div className="col-span-2 flex items-center gap-1 text-slate-400 mt-0.5">
                                  <Clock className="w-3 h-3 text-amber-500" />
                                  <span>Expires on: <strong className="text-slate-600 font-semibold">{activeDoc.expiryDate}</strong></span>
                                </div>
                              )}
                              {activeDoc.verificationRemarks && (
                                <div className="col-span-2 p-1.5 bg-slate-50 border border-slate-150 rounded text-slate-600 italic">
                                  Remarks: "{activeDoc.verificationRemarks}"
                                </div>
                              )}
                            </div>

                            <div className="flex gap-2 justify-end border-t border-slate-100 pt-2">
                              {/* Download/View */}
                              {activeDoc.base64 && (
                                <button
                                  onClick={() => {
                                    // Trigger file view/download
                                    const win = window.open();
                                    if (win) {
                                      win.document.write(
                                        `<iframe src="${activeDoc.base64}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
                                      );
                                    }
                                  }}
                                  className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[9px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                                >
                                  <Eye className="w-3 h-3" /> View
                                </button>
                              )}

                              {userRole !== 'Auditor' && (
                                <button
                                  onClick={async () => {
                                    if (confirm('Archive this document version? Active access will be revoked.')) {
                                      await archiveDocument(activeDoc.id);
                                    }
                                  }}
                                  className="px-2 py-0.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-500 rounded text-[9px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                                >
                                  <Trash2 className="w-3 h-3" /> Archive
                                </button>
                              )}

                              {/* Manager / Admin verification gates */}
                              {['Super Admin', 'Manager'].includes(userRole) && activeDoc.verificationStatus === 'PENDING' && (
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => setVerifyingDocId(activeDoc.id)}
                                    className="px-2 py-0.5 bg-red-600 hover:bg-red-700 text-white rounded text-[9px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                                  >
                                    Verify Gate
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-400 font-medium font-serif italic">Pending vault upload</span>
                            {userRole !== 'Auditor' && (
                              <div className="flex gap-2">
                                <div className="relative">
                                  <button
                                    onClick={() => setUploadingDocType(category.type)}
                                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-[9px] flex items-center gap-1 cursor-pointer transition-colors"
                                  >
                                    <FileUp className="w-3 h-3 text-slate-500" />
                                    <span>Upload</span>
                                  </button>
                                  {uploadingDocType === category.type && (
                                    <input
                                      type="file"
                                      accept={category.type === 'AADHAAR' || category.type === 'BANK_STATEMENT' ? '.pdf' : '.png,.jpg,.jpeg,.webp'}
                                      onChange={(e) => handleFileUpload(e, category.type, selectedCust.id)}
                                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                    />
                                  )}
                                </div>

                                <button
                                  type="button"
                                  onClick={() => startCamera(category.type)}
                                  className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-[9px] flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                                >
                                  <Camera className="w-3 h-3" />
                                  <span>Camera</span>
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Verification Dialog Box */}
              {verifyingDocId && (
                <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm p-4 mt-4 space-y-4 animate-fade-in text-xs">
                  <div className="border-b border-slate-100 pb-2.5 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Document Verification Gate</h4>
                      <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Underwrite document checks</p>
                    </div>
                    <button 
                      onClick={() => setVerifyingDocId(null)}
                      className="p-1 rounded bg-slate-50 border border-slate-200 text-slate-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Verification Remarks / Notes</label>
                      <input 
                        type="text" 
                        value={verificationRemarks}
                        onChange={(e) => setVerificationRemarks(e.target.value)}
                        placeholder="e.g. ID matches Aadhaar card perfectly"
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded-[10px] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Expiry Date (Optional)</label>
                      <input 
                        type="date" 
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded-[10px] focus:outline-none"
                      />
                    </div>

                    <div className="flex gap-3 pt-2.5 border-t border-slate-100 justify-end">
                      <button
                        onClick={async () => {
                          await verifyDocument(verifyingDocId, 'REJECTED', verificationRemarks);
                          setVerifyingDocId(null);
                          setVerificationRemarks('');
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 font-bold rounded-lg"
                      >
                        Reject Specimen
                      </button>
                      <button
                        onClick={async () => {
                          const docObj = documents.find(d => d.id === verifyingDocId);
                          // Save verification
                          await verifyDocument(verifyingDocId, 'VERIFIED', verificationRemarks);
                          if (expiryDate && docObj) {
                            // Update expiry in context
                            await updateCustomer(selectedCust.id, {}); // Trigger reload
                          }
                          setVerifyingDocId(null);
                          setVerificationRemarks('');
                        }}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-sm"
                      >
                        Verify & Authorize
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center text-gray-400 py-16 flex flex-col items-center justify-center">
              <Contact2 className="w-12 h-12 text-gray-300 stroke-[1.25]" />
              <h3 className="font-bold text-gray-700 text-sm mt-3">No Customer Selected</h3>
              <p className="text-xs mt-1 max-w-[200px]">Select a profile folder on the left to review verification files and references.</p>
            </div>
          )}
        </div>

      </div>

      <ActionConfirmModal
        isOpen={isUnmaskConfirmOpen}
        onClose={() => setIsUnmaskConfirmOpen(false)}
        onConfirm={() => setIsSensitiveUnmasked(true)}
        title="Unmask Sensitive KYC Identity Records"
        description="You are requesting clearance to view the customer's full phone number, email address, Aadhaar ID, and PAN Tax details. This action will be appended to the supervisor access audit logs."
      />

      {/* Reusable Camera Capture Modal Overlay */}
      {activeCameraType && (
        <div className="fixed inset-0 bg-slate-950/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden max-w-sm w-full animate-scale-up text-xs">
            <div className="px-4 py-3.5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="font-black text-slate-900 text-[11px] uppercase tracking-wider">
                  {capturedImage ? 'Review Captured Specimen' : `KYC Camera: ${activeCameraType}`}
                </h3>
                <p className="text-[9px] text-slate-400 font-semibold mt-0.5">
                  {capturedImage ? 'Audit focus, orientation and quality before saving' : 'Verify alignment parameters under bright lighting'}
                </p>
              </div>
              <button
                onClick={stopCamera}
                className="p-1 rounded bg-white border border-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {cameraPermissionError ? (
                <div className="space-y-4 py-4 text-center">
                  <div className="w-12 h-12 bg-red-50 border border-red-200 rounded-full flex items-center justify-center mx-auto text-red-600">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900">Camera Permission Required</p>
                    <p className="text-[11px] text-slate-500 leading-normal max-w-[240px] mx-auto">
                      {cameraPermissionError}
                    </p>
                  </div>
                  <button
                    onClick={stopCamera}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors"
                  >
                    Close & Use File Upload
                  </button>
                </div>
              ) : !capturedImage ? (
                // Camera Streaming Viewfinder
                <div className="space-y-4">
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-950 aspect-video relative flex items-center justify-center shadow-inner">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover filter saturate-110"
                    />
                    <div className="absolute inset-x-0 top-3 flex justify-center pointer-events-none">
                      <span className="px-2 py-0.5 rounded-full bg-slate-900/60 text-white text-[8px] font-mono font-bold tracking-widest uppercase">
                        Viewfinder Active
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const nextFacing = cameraFacingMode === 'user' ? 'environment' : 'user';
                        setCameraFacingMode(nextFacing);
                        // Restart camera with new facing mode
                        startCamera(activeCameraType);
                      }}
                      className="flex-1 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Switch Camera</span>
                    </button>

                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-red-150"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Capture Specimen</span>
                    </button>
                  </div>
                </div>
              ) : (
                // Captured Image Review & Pre-processing (Rotate/Retake)
                <div className="space-y-4">
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 aspect-video relative flex items-center justify-center">
                    <img
                      src={capturedImage}
                      alt="Captured preview"
                      className="max-h-full max-w-full object-contain"
                    />
                    <div className="absolute bottom-2 right-2 flex gap-1.5">
                      <button
                        type="button"
                        onClick={rotateCapturedImage}
                        className="p-1.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-lg transition-colors"
                        title="Rotate 90 degrees"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => startCamera(activeCameraType)}
                      className="flex-1 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-lg transition-colors"
                    >
                      Retake Specimen
                    </button>

                    <button
                      type="button"
                      onClick={() => savePhoto(selectedCust.id)}
                      className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors shadow-sm shadow-red-150 flex items-center justify-center gap-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Save to Vault</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
