import React, { useState, useRef, useEffect } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { Customer } from '../types';
import { 
  Plus, Search, ShieldAlert, FileUp, RefreshCw, Eye, X, Contact2, ArrowLeft,
  FileText, ShieldCheck, Trash2, Clock, Camera, RotateCw, Edit
} from 'lucide-react';
import { ActionConfirmModal } from './ActionConfirmModal';
import { DocumentType, CustomerDocument } from '../types';
import { compressImage, rotateImage90, getGeotag } from '../utils/camera';
import { useToast } from './ToastProvider';

export const CustomersView: React.FC = () => {
  const { 
    customers, addCustomer, updateCustomer, deleteCustomer, userRole, securityPolicy,
    documents, uploadDocument, verifyDocument, archiveDocument, isFirestoreMode,
    loans, payments, expenses, auditLogs, setSelectedCustomerIdForNewLoan, setDashboardAction,
    agentVisits, currentUser, schedules, setSelectedLoanIdForCollection
  } = useVFMS();
  const { toast } = useToast();

  const [editingCustId, setEditingCustId] = useState<string | null>(null);
  const [activeProfileTab, setActiveProfileTab] = useState<'overview' | 'loans' | 'calendar' | 'payments' | 'kyc' | 'expenses' | 'audit'>('overview');
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
  const [status, setStatus] = useState<'Active' | 'Inactive' | 'Blacklisted'>('Active');
  const [notes, setNotes] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [village, setVillage] = useState('');
  const [area, setArea] = useState('');
  const [referencePhone, setReferencePhone] = useState('');

  // Validation state
  const [errors, setErrors] = useState<{
    phone?: string;
    aadhaar?: string;
    pan?: string;
    email?: string;
  }>({});

  const validateField = (fieldName: string, value: string) => {
    let err = '';
    if (fieldName === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      if (!value) {
        err = 'Phone number is required.';
      } else if (digitsOnly.length !== 10) {
        err = 'Phone number must be exactly 10 digits.';
      }
    } else if (fieldName === 'aadhaar') {
      const digitsOnly = value.replace(/\D/g, '');
      if (!value) {
        err = 'Aadhaar ID is required.';
      } else if (digitsOnly.length !== 12) {
        err = 'Aadhaar number must be exactly 12 digits.';
      }
    } else if (fieldName === 'pan') {
      if (!value) {
        err = 'PAN Number is required.';
      } else {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
        if (value.length !== 10) {
          err = 'PAN must be exactly 10 characters.';
        } else if (!panRegex.test(value)) {
          err = 'Invalid PAN format. 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F).';
        }
      }
    } else if (fieldName === 'email') {
      if (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          err = 'Invalid email format.';
        }
      }
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: err || undefined
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    // Phone validation
    const phoneDigits = phone.replace(/\D/g, '');
    if (!phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (phoneDigits.length !== 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    // Aadhaar validation
    const aadhaarDigits = aadhaar.replace(/\D/g, '');
    if (!aadhaar) {
      newErrors.aadhaar = 'Aadhaar ID is required.';
    } else if (aadhaarDigits.length !== 12) {
      newErrors.aadhaar = 'Aadhaar number must be exactly 12 digits.';
    }

    // PAN validation
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
    if (!pan) {
      newErrors.pan = 'PAN Number is required.';
    } else if (pan.length !== 10) {
      newErrors.pan = 'PAN must be exactly 10 characters.';
    } else if (!panRegex.test(pan)) {
      newErrors.pan = 'Invalid PAN format. 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F).';
    }

    // Email validation
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Invalid email format.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [wantsNewLoanRequest, setWantsNewLoanRequest] = useState(false);

  const handleEditClick = (cust: Customer) => {
    setEditingCustId(cust.id);
    setName(cust.name);
    setEmail(cust.email);
    setPhone(cust.phone);
    setAddress(cust.address || '');
    setOccupation(cust.occupation || '');
    setIncome(String(cust.income));
    setAadhaar(cust.aadhaar);
    setPan(cust.pan);
    
    const refParts = (cust.references || '').split('|');
    setReferences(refParts[0] || '');
    setReferencePhone(refParts[1] || '');

    setNominee(cust.nominee || '');
    setRiskCategory(cust.riskCategory);
    setStatus(cust.status);
    setNotes(cust.notes || '');
    setPhoto(cust.photo || null);
    setVillage(cust.village || '');
    setArea(cust.area || '');
    
    setErrors({});
    setIsCreateOpen(true);
  };

  const handleCloseForm = () => {
    setName(''); setEmail(''); setPhone(''); setAddress('');
    setOccupation(''); setIncome(''); setAadhaar(''); setPan('');
    setReferences(''); setNominee(''); setRiskCategory('Low'); setStatus('Active'); setNotes('');
    setPhoto(null); setVillage(''); setArea(''); setReferencePhone('');
    setErrors({});
    setEditingCustId(null);
    setIsCreateOpen(false);
  };

  const handleDeleteCustomer = async (id: string) => {
    if (confirm('Are you sure you want to permanently delete this customer record? This will also delete all associated loan data, repayment histories, documents, and collateral vault files.')) {
      try {
        await deleteCustomer(id);
        toast.success('Customer Profile Deleted', 'The customer profile has been successfully deleted.');
        setSelectedCust(null);
      } catch (err: any) {
        console.error('Delete customer error:', err);
        toast.error('Deletion Failed', err.message || 'Could not delete the customer profile.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !aadhaar || !pan) return;

    if (!validateForm()) {
      toast.error('Validation Failed', 'Please resolve all validation errors before saving.');
      return;
    }

    try {
      const combinedReferences = `${references}|${referencePhone}`;
      let newCustId = '';

      if (editingCustId) {
        await updateCustomer(editingCustId, {
          name,
          email,
          phone,
          address,
          occupation,
          income: parseFloat(income) || 0,
          aadhaar,
          pan,
          references: combinedReferences,
          nominee,
          riskCategory,
          status,
          notes,
          photo: photo || "",
          village,
          area
        });
        toast.success('Update Successful', `${name}'s profile details have been updated.`);
        newCustId = editingCustId;
      } else {
        newCustId = await addCustomer({
          name,
          email,
          phone,
          address,
          occupation,
          income: parseFloat(income) || 0,
          aadhaar,
          pan,
          references: combinedReferences,
          nominee,
          riskCategory,
          status,
          notes,
          photo: photo || "",
          village,
          area
        });
        toast.success('Registration Successful', `${name} has been registered as a customer.`);
      }

      handleCloseForm();

      if (wantsNewLoanRequest) {
        setSelectedCustomerIdForNewLoan(newCustId);
        setDashboardAction('create_loan');
        const btn = document.getElementById('nav-link-loans');
        if (btn) btn.click();
      }
    } catch (err: any) {
      console.error('Customer save error:', err);
      toast.error('Save Failed', err.message || 'An unexpected error occurred.');
    }
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
            onClick={handleCloseForm}
            className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h3 className="font-black text-slate-900 text-[13px] uppercase tracking-wider">
              {editingCustId ? 'Edit Customer Details' : 'New Customer Registration'}
            </h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
              {editingCustId ? 'Modify profile data for this borrower' : 'Register a new borrower profile in the ledger'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Section 1: Photo & Identity */}
          <div className="bg-slate-50 p-4 rounded-[10px] border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Photo & Identity</h4>
            
            <div className="space-y-1">
              <label className="form-label font-bold text-slate-700">Customer Photo (Optional)</label>
              <div className="flex items-center gap-3">
                {photo ? (
                  <div className="relative w-16 h-16 rounded-[10px] border border-slate-200 overflow-hidden bg-slate-50 shadow-sm">
                    <img src={photo} alt="Customer Photo" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => setPhoto(null)} 
                      className="absolute top-0.5 right-0.5 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 cursor-pointer flex items-center justify-center"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-[10px] border-2 border-dashed border-slate-200 flex items-center justify-center bg-white text-slate-400">
                    <Camera className="w-5 h-5" />
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => setPhoto(reader.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                    id="customer-photo-upload"
                  />
                  <label 
                    htmlFor="customer-photo-upload"
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-[10px] text-[10px] font-bold text-slate-655 hover:bg-slate-55 cursor-pointer shadow-2xs"
                  >
                    Upload Photo
                  </label>
                </div>
              </div>
            </div>

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
                <label className="form-label">Mobile Number *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    validateField('phone', e.target.value);
                  }}
                  onBlur={(e) => validateField('phone', e.target.value)}
                  placeholder="e.g. 9876500000"
                  className={`form-input ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.phone && (
                  <p className="text-[10px] text-red-500 font-semibold mt-0.5">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Location & Address */}
          <div className="bg-slate-50 p-4 rounded-[10px] border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Location Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="form-label">Village *</label>
                <input
                  type="text"
                  required
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="e.g. Rampur"
                  className="form-input"
                />
              </div>
              <div className="space-y-1">
                <label className="form-label">Area *</label>
                <input
                  type="text"
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Sector-3"
                  className="form-input"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="form-label">Street / Address *</label>
              <textarea
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address details"
                rows={2}
                className="form-input"
              />
            </div>
          </div>

          {/* Section 3: Identity & Professional */}
          <div className="bg-slate-50 p-4 rounded-[10px] border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">KYC & Professional Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="form-label">Aadhaar Number *</label>
                <input
                  type="text"
                  required
                  value={aadhaar}
                  onChange={(e) => {
                    setAadhaar(e.target.value);
                    validateField('aadhaar', e.target.value);
                  }}
                  onBlur={(e) => validateField('aadhaar', e.target.value)}
                  placeholder="12-digit number"
                  className={`form-input ${errors.aadhaar ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.aadhaar && (
                  <p className="text-[10px] text-red-500 font-semibold mt-0.5">{errors.aadhaar}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="form-label">PAN Number *</label>
                <input
                  type="text"
                  required
                  value={pan}
                  onChange={(e) => {
                    setPan(e.target.value);
                    validateField('pan', e.target.value);
                  }}
                  onBlur={(e) => validateField('pan', e.target.value)}
                  placeholder="10-digit alphanumeric"
                  className={`form-input ${errors.pan ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.pan && (
                  <p className="text-[10px] text-red-500 font-semibold mt-0.5">{errors.pan}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="form-label">Occupation</label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="e.g. Shop owner"
                  className="form-input"
                />
              </div>
              <div className="space-y-1">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateField('email', e.target.value);
                  }}
                  onBlur={(e) => validateField('email', e.target.value)}
                  placeholder="e.g. ramesh@gmail.com"
                  className={`form-input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-[10px] text-red-500 font-semibold mt-0.5">{errors.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Nominee & Reference */}
          <div className="bg-slate-50 p-4 rounded-[10px] border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Nominee & References</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="form-label">Nominee Name</label>
                <input
                  type="text"
                  value={nominee}
                  onChange={(e) => setNominee(e.target.value)}
                  placeholder="Nominee name & relationship"
                  className="form-input"
                />
              </div>
              <div className="space-y-1">
                <label className="form-label">Reference Person</label>
                <input
                  type="text"
                  value={references}
                  onChange={(e) => setReferences(e.target.value)}
                  placeholder="Reference/Guarantor Name"
                  className="form-input"
                />
              </div>
              <div className="space-y-1">
                <label className="form-label">Reference Phone</label>
                <input
                  type="text"
                  value={referencePhone}
                  onChange={(e) => setReferencePhone(e.target.value)}
                  placeholder="Reference Phone number"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-1">
            <label className="form-label">Remarks / Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special remarks or details..."
              rows={2}
              className="form-input"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-2 w-full">
            <button
              type="button"
              onClick={handleCloseForm}
              className="btn btn-secondary w-full sm:w-auto px-4 py-2 text-slate-700 border border-slate-200"
            >
              Cancel
            </button>
            {editingCustId ? (
              <button
                type="submit"
                onClick={() => setWantsNewLoanRequest(false)}
                className="btn btn-primary w-full sm:w-auto px-4 py-2"
              >
                Save Changes
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  onClick={() => setWantsNewLoanRequest(false)}
                  className="btn btn-secondary w-full sm:w-auto px-4 py-2 text-slate-700 border border-slate-200"
                >
                  Save Customer
                </button>
                <button
                  type="submit"
                  onClick={() => setWantsNewLoanRequest(true)}
                  className="btn btn-primary w-full sm:w-auto px-4 py-2"
                >
                  Save & Create Loan Request
                </button>
              </>
            )}
          </div>

        </form>
      </div>
    );
  }


  const renderDetailPanel = () => {
    if (!selectedCust) return null;
    return (
      <>
        {/* Header */}
        <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm p-4 space-y-3">
          <div className="flex justify-between items-start border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm leading-tight">{selectedCust.name}</h3>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {selectedCust.id}</p>
            </div>
            <div className="flex gap-1.5">
              {userRole !== 'Auditor' && (
                <button
                  onClick={() => handleEditClick(selectedCust)}
                  className="p-1 rounded bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-500 cursor-pointer transition-colors"
                  title="Edit customer details"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
              )}
              {(userRole === 'Super Admin' || userRole === 'Manager') && (
                <button
                  onClick={() => handleDeleteCustomer(selectedCust.id)}
                  className="p-1 rounded bg-slate-50 border border-slate-200 hover:bg-red-50 hover:text-red-600 text-slate-500 cursor-pointer transition-colors"
                  title="Delete customer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'loans', label: 'Loans' },
              { id: 'calendar', label: 'Calendar' },
              { id: 'payments', label: 'Payments' },
              { id: 'kyc', label: 'KYC Vault' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveProfileTab(tab.id as any)}
                className={`px-2.5 py-1 rounded-[10px] font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer ${
                  activeProfileTab === tab.id
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm p-4 min-h-[200px] text-xs space-y-3">
          {activeProfileTab === 'overview' && (
            <div className="space-y-3">
              <div className="flex gap-3 items-center">
                {selectedCust.photo ? (
                  <img src={selectedCust.photo} alt={selectedCust.name} className="w-14 h-14 rounded-[10px] object-cover border border-slate-200" />
                ) : (
                  <div className="w-14 h-14 rounded-[10px] bg-slate-50 border border-slate-200 flex items-center justify-center font-bold text-slate-400 text-sm">
                    {selectedCust.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-black text-slate-900">{selectedCust.name}</p>
                  <p className="text-[10px] text-slate-400">{selectedCust.village || 'No Village'} | {selectedCust.area || 'No Area'}</p>
                  <p className="text-[10px] text-slate-400">{selectedCust.address || 'No Address'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <span className="text-[9px] text-slate-400 block font-semibold uppercase">Mobile</span>
                  <span className="font-bold text-slate-800 font-mono">{securityPolicy?.sensitiveDataMasking && !isSensitiveUnmasked ? maskPhone(selectedCust.phone) : selectedCust.phone}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-semibold uppercase">Aadhaar</span>
                  <span className="font-bold text-slate-800 font-mono">{securityPolicy?.sensitiveDataMasking && !isSensitiveUnmasked ? maskAadhaar(selectedCust.aadhaar) : selectedCust.aadhaar}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-semibold uppercase">PAN</span>
                  <span className="font-bold text-slate-800 font-mono">{securityPolicy?.sensitiveDataMasking && !isSensitiveUnmasked ? maskPan(selectedCust.pan) : selectedCust.pan}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-semibold uppercase">Occupation</span>
                  <span className="font-bold text-slate-800">{selectedCust.occupation || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-semibold uppercase">Income</span>
                  <span className="font-bold text-slate-800 font-mono">{'₹' + selectedCust.income.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-semibold uppercase">Nominee</span>
                  <span className="font-bold text-slate-800">{selectedCust.nominee || 'None'}</span>
                </div>
              </div>
              {!isSensitiveUnmasked && securityPolicy?.sensitiveDataMasking && (
                <button onClick={() => setIsUnmaskConfirmOpen(true)} className="flex items-center gap-1 text-[9px] text-slate-500 hover:text-red-600 font-bold mt-2 cursor-pointer">
                  <Eye className="w-3 h-3" /> Unmask Sensitive Details
                </button>
              )}
              {selectedCust.notes && (
                <div className="border-t border-slate-100 pt-3 space-y-1">
                  <span className="text-[9px] text-slate-400 block font-semibold uppercase">Remarks</span>
                  <p className="text-[10px] text-slate-600 italic">{selectedCust.notes}</p>
                </div>
              )}
            </div>
          )}
          {activeProfileTab === 'loans' && (
            <div className="space-y-3">
              {loans.filter(l => l.customerId === selectedCust.id).length === 0 ? (
                <p className="text-center text-slate-400 py-8 font-bold">No loan history.</p>
              ) : (
                loans.filter(l => l.customerId === selectedCust.id).map(loan => {
                  const lPmts = payments.filter(p => p.loanId === loan.id);
                  const paid = lPmts.reduce((s, p) => s + p.amount, 0);
                  const outstanding = Math.max(0, (loan.loanBookAmount || loan.principal) - paid);
                  return (
                    <div key={loan.id} className="p-3 bg-slate-50 border border-slate-200 rounded-[10px] space-y-1.5">
                      <div className="flex justify-between">
                        <span className="font-bold text-slate-800">{loan.loanNumber}</span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${loan.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : loan.status === 'Overdue' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>{loan.status}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-[9px] font-mono text-slate-500">
                        <span>Book: {'₹' + (loan.loanBookAmount || loan.principal)}</span>
                        <span>Paid: {'₹' + paid}</span>
                        <span className="col-span-2 font-bold text-slate-800">Outstanding: {'₹' + outstanding}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
          {activeProfileTab === 'calendar' && (
            <div className="space-y-3">
              <p className="text-center text-slate-400 text-[10px] py-4">Schedule overview coming soon.</p>
            </div>
          )}
          {activeProfileTab === 'payments' && (
            <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
              {payments.filter(p => loans.find(l => l.id === p.loanId)?.customerId === selectedCust.id).length === 0 ? (
                <p className="text-center text-slate-400 py-8 font-bold">No payments logged.</p>
              ) : (
                payments.filter(p => loans.find(l => l.id === p.loanId)?.customerId === selectedCust.id).map(pmt => (
                  <div key={pmt.id} className="py-2.5 flex justify-between items-center">
                    <div>
                      <span className="font-mono font-bold text-slate-800">{pmt.receiptNumber}</span>
                      <span className="text-[9px] text-slate-400 block">{new Date(pmt.paymentDate).toLocaleString()} | {pmt.paymentMethod}</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-600">{'₹' + pmt.amount.toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>
          )}
          {activeProfileTab === 'kyc' && (
            <div className="space-y-3">
              {[
                { type: 'AADHAAR' as DocumentType, label: 'Aadhaar Card' },
                { type: 'PAN' as DocumentType, label: 'PAN Card' },
                { type: 'PHOTO' as DocumentType, label: 'Photograph' },
                { type: 'SIGNATURE' as DocumentType, label: 'Signature' }
              ].map(cat => {
                const doc = documents.find(d => d.customerId === selectedCust.id && d.documentType === cat.type);
                return (
                  <div key={cat.type} className="p-3 bg-slate-50 border border-slate-200 rounded-[10px] flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-800">{cat.label}</span>
                      {doc && <span className={`ml-2 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${doc.verificationStatus === 'VERIFIED' ? 'bg-emerald-50 text-emerald-700' : doc.verificationStatus === 'REJECTED' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>{doc.verificationStatus}</span>}
                    </div>
                    {!doc && userRole !== 'Auditor' && (
                      <div className="flex gap-2 relative">
                        <button type="button" className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded text-[9px] flex items-center gap-1 cursor-pointer relative">
                          <FileUp className="w-3 h-3" /> Upload
                          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileUpload(e, cat.type, selectedCust.id)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                        </button>
                        <button type="button" onClick={() => startCamera(cat.type)} className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded text-[9px] flex items-center gap-1 cursor-pointer">
                          <Camera className="w-3 h-3" /> Camera
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </>
    );
  };



  const renderAgentCustomersView = () => {
    const todayStr = new Date().toISOString().split('T')[0];

    const getCustomerTodayStatus = (custId: string) => {
      const visit = agentVisits.find(v => v.visitDate === todayStr && v.customerId === custId && v.agentId === currentUser?.uid);
      if (!visit) return 'Pending';
      if (visit.status === 'Collected') {
        const pmts = payments.filter(p => p.paymentDate.startsWith(todayStr) && p.loanId && loans.find(l => l.id === p.loanId)?.customerId === custId);
        if (pmts.length > 0) {
          return pmts[0].collectionType || 'Paid';
        }
        return 'Paid';
      }
      if (visit.status === 'Visited' || visit.status === 'Not Available' || visit.status === 'Refused') return 'Missed';
      return 'Pending';
    };

    const getCustomerLoanDetails = (custId: string) => {
      const custLoan = loans.find(l => l.customerId === custId && (l.status === 'Active' || l.status === 'Overdue'));
      if (!custLoan) {
        return { loanNumber: 'No Active Loan', outstanding: 0, todayDue: 0, loanId: null };
      }
      const loanPmts = payments.filter(p => p.loanId === custLoan.id);
      const paid = loanPmts.reduce((sum, p) => sum + p.amount, 0);
      const bookAmt = custLoan.loanBookAmount || custLoan.principal;
      const outstanding = Math.max(0, bookAmt - paid);

      const loanSchedules = schedules[custLoan.id] || [];
      const todayInst = loanSchedules.find(s => s.dueDate === todayStr);
      const todayDue = todayInst ? (todayInst.principalDue + todayInst.interestDue + todayInst.penaltyDue) : 0;

      return {
        loanNumber: custLoan.loanNumber,
        outstanding,
        todayDue,
        loanId: custLoan.id
      };
    };

    const isCustomerAssigned = (cust: Customer) => {
      return agentVisits.some(v => v.customerId === cust.id && v.agentId === currentUser?.uid);
    };

    const agentFilteredCustomers = customers.filter(c => {
      if (!isCustomerAssigned(c)) return false;
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            c.phone.includes(searchQuery) ||
                            c.aadhaar.includes(searchQuery);
      const todayStatus = getCustomerTodayStatus(c.id);
      const matchesStatus = statusFilter === 'All' || todayStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });

    const handleReceivePaymentClick = (loanId: string) => {
      setSelectedLoanIdForCollection(loanId);
      const btn = document.getElementById('nav-link-collections');
      if (btn) btn.click();
    };

    if (selectedCust) {
      return (
        <div className="space-y-4 text-xs animate-fade-in pb-16">
          <div className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-sm flex items-center justify-between">
            <button 
              onClick={() => setSelectedCust(null)}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-[10px] font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Customers</span>
            </button>
            <h3 className="font-black text-slate-900 uppercase tracking-wider">{selectedCust.name}'s Profile</h3>
          </div>
          {renderDetailPanel()}
        </div>
      );
    }

    return (
      <div className="space-y-4 text-xs animate-fade-in pb-16">
        {/* Search and Action Bar */}
        <div className="bg-white p-4 rounded-[10px] border border-slate-200 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 shadow-sm">
          <div className="flex-1 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search My Customers by Name, Phone, Aadhaar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-[10px] text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-[10px] text-xs font-bold text-slate-650 focus:outline-none cursor-pointer"
            >
              <option value="All">All Visit Statuses</option>
              <option value="Pending">Pending Collection</option>
              <option value="Paid">Paid (Normal)</option>
              <option value="Recovery">Recovery</option>
              <option value="Missed">Missed Visit</option>
              <option value="Partial">Partial Collection</option>
              <option value="Advance">Advance Paid</option>
            </select>
          </div>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-1.5 bg-red-600 text-white rounded-[10px] text-xs font-bold flex items-center gap-1.5 hover:bg-red-700 transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Register Customer</span>
          </button>
        </div>

        {/* Customer Cards Grid */}
        {agentFilteredCustomers.length === 0 ? (
          <div className="bg-white p-12 text-center text-slate-400 font-bold border border-slate-200 rounded-[10px]">
            No assigned customers found matching filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agentFilteredCustomers.map(cust => {
              const loanDetails = getCustomerLoanDetails(cust.id);
              const todayStatus = getCustomerTodayStatus(cust.id);
              
              const statusBadges: { [key: string]: string } = {
                Pending: 'bg-slate-100 text-slate-600 border border-slate-200',
                Paid: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
                Recovery: 'bg-green-50 text-green-700 border border-green-100',
                Missed: 'bg-red-50 text-red-700 border border-red-100',
                Partial: 'bg-amber-50 text-amber-700 border border-amber-100',
                Advance: 'bg-blue-50 text-blue-700 border border-blue-100',
              };

              return (
                <div 
                  key={cust.id} 
                  className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-red-200 hover:shadow-sm transition-all"
                >
                  <div className="flex gap-3 cursor-pointer" onClick={() => setSelectedCust(cust)}>
                    {cust.photo ? (
                      <img src={cust.photo} alt={cust.name} className="w-12 h-12 rounded-[10px] object-cover border border-slate-200 shrink-0" />
                    ) : (
                      <div className="w-12 h-12 rounded-[10px] bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-450 font-bold shrink-0">
                        {cust.name.substring(0,2).toUpperCase()}
                      </div>
                    )}
                    <div className="space-y-0.5 truncate">
                      <h4 className="font-black text-slate-900 text-sm truncate">{cust.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold truncate">{cust.village || 'No Village'} | {cust.area || 'No Area'} | {cust.address || 'No Address'}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{cust.phone}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-t border-b border-slate-100 py-2.5 text-[10px] font-semibold text-slate-500">
                    <div>
                      <span>Loan: </span>
                      <strong className="text-slate-800 font-mono">{loanDetails.loanNumber}</strong>
                    </div>
                    <div className="text-right">
                      <span>Today's Due: </span>
                      <strong className="text-slate-950 font-mono">₹{loanDetails.todayDue.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span>Outstanding: </span>
                      <strong className="text-emerald-700 font-mono">₹{loanDetails.outstanding.toLocaleString()}</strong>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${statusBadges[todayStatus] || statusBadges.Pending}`}>
                        {todayStatus}
                      </span>
                    </div>
                  </div>

                  {loanDetails.loanId && todayStatus === 'Pending' ? (
                    <button
                      onClick={() => handleReceivePaymentClick(loanDetails.loanId!)}
                      className="w-full py-2 bg-red-650 hover:bg-red-750 text-white rounded-[10px] font-bold text-xs cursor-pointer shadow-xs transition-colors"
                    >
                      Receive Payment
                    </button>
                  ) : (
                    <div className="text-center text-[10px] text-slate-450 font-bold py-1 bg-slate-50 border border-slate-150 rounded-[10px] font-mono select-none uppercase tracking-wider">
                      {todayStatus === 'Pending' ? 'No Active Loan' : `Logged: ${todayStatus}`}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const isAgent = userRole === 'Loan Officer';
  if (isAgent) {
    return renderAgentCustomersView();
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
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-[10px] text-xs font-bold text-slate-650 focus:outline-none"
          >
            <option value="All">All Risk Metrics</option>
            <option value="Low">Low Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="High">High Risk</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-[10px] text-xs font-bold text-slate-650 focus:outline-none"
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
                    <td colSpan={5} className="py-12 text-center text-slate-450 font-bold">No customers found.</td>
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
        <div className="lg:col-span-1 space-y-4">
          {selectedCust ? renderDetailPanel() : (
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
