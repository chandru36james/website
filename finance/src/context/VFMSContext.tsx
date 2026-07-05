import React, { createContext, useContext, useState, useEffect } from 'react';
import { signOut, createUserWithEmailAndPassword, getAuth, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { initializeApp, deleteApp } from 'firebase/app';
import firebaseConfig from '../../firebase-applet-config.json';
import bcrypt from 'bcryptjs';
import { 
  UserProfile, Customer, Loan, LoanSchedule, Payment, 
  LedgerEntry, Collateral, CashBook, AuditLog, FinanceRule, 
  Company, Branch, UserRole, ScheduleStatus, PaymentMethod,
  SecurityPolicy, Guarantor, CustomerDocument, DocumentType,
  Expense, Notification, AgentVisit, LoanSettlement, ExpenseCategory, PinResetAudit, PinApprovalAudit
} from '../types';
import { generateSchedule, evaluatePenalties, allocatePayment } from '../utils/finance';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { 
  doc, setDoc, getDoc, getDocs, collection, query, 
  where, onSnapshot, writeBatch, serverTimestamp, updateDoc,
  deleteDoc
} from 'firebase/firestore';

interface VFMSContextType {
  // Current session configuration
  currentUser: UserProfile | null;
  currentCompany: Company;
  currentBranch: Branch;
  userRole: UserRole;
  isFirestoreMode: boolean;
  isLoading: boolean;
  
  // Lists of Entities
  companies: Company[];
  branches: Branch[];
  customers: Customer[];
  loans: Loan[];
  schedules: { [loanId: string]: LoanSchedule[] };
  payments: Payment[];
  ledgers: LedgerEntry[];
  collaterals: Collateral[];
  cashBooks: CashBook[];
  auditLogs: AuditLog[];
  financeRules: FinanceRule[];
  userProfiles: UserProfile[];
  guarantors: Guarantor[];
  documents: CustomerDocument[];
  expenses: Expense[];
  expenseCategories: ExpenseCategory[];
  notifications: Notification[];
  agentVisits: AgentVisit[];
  settlements: LoanSettlement[];
  pinResetAudits: PinResetAudit[];
  dashboardAction: string | null;
  setDashboardAction: (action: string | null) => void;
  selectedLoanIdForCollection: string | null;
  setSelectedLoanIdForCollection: (loanId: string | null) => void;
  selectedCustomerIdForNewLoan: string | null;
  setSelectedCustomerIdForNewLoan: (custId: string | null) => void;
  
  // Actions
  switchRole: (role: UserRole) => void;
  switchBranch: (branchId: string) => void;
  toggleStorageMode: () => void;
  login: (profile: UserProfile) => void;
  logout: () => Promise<void>;
  updateUserAccess: (uid: string, role: UserRole, branchId: string) => Promise<void>;
  
  // Entity Operations
  addCustomer: (cust: Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'companyId' | 'branchId'>) => Promise<string>;
  updateCustomer: (id: string, cust: Partial<Customer>) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  createLoan: (loanData: Omit<Loan, 'id' | 'loanNumber' | 'status' | 'formulaVersion' | 'companyId' | 'branchId' | 'createdAt' | 'updatedAt' | 'disbursedAmount'>) => Promise<string>;
  approveLoan: (loanId: string, remarks?: string) => Promise<void>;
  rejectLoan: (loanId: string, remarks?: string) => Promise<void>;
  disburseLoan: (loanId: string) => Promise<void>;
  submitPayment: (paymentData: { loanId: string; amount: number; paymentMethod: string; receiptNumber: string }) => Promise<void>;
  waiveInstallment: (loanId: string, scheduleId: string, amount: number, reason: string) => Promise<void>;
  writeOffLoan: (loanId: string, reason: string) => Promise<void>;
  addCollateral: (collateral: Omit<Collateral, 'id' | 'createdAt' | 'companyId' | 'branchId'>) => Promise<void>;
  updateCollateralStatus: (id: string, status: 'Deposited' | 'Returned' | 'Liquidated') => Promise<void>;
  updateCollateral: (id: string, partial: Partial<Collateral>) => Promise<void>;
  submitCashBookClosing: (closingData: { collections: number; expenses: number; bankDeposit: number; variance: number; notes?: string }) => Promise<void>;
  verifyCashBook: (id: string) => Promise<void>;
  updateFinanceRules: (rules: Partial<FinanceRule>) => Promise<void>;
  addGuarantor: (guar: Omit<Guarantor, 'id' | 'createdAt' | 'companyId' | 'branchId'>) => Promise<void>;
  updateGuarantor: (id: string, updated: Partial<Guarantor>) => Promise<void>;
  deleteGuarantor: (id: string) => Promise<void>;
  uploadDocument: (docData: Omit<CustomerDocument, 'id' | 'storageMode' | 'uploadedBy' | 'uploadedAt' | 'companyId' | 'branchId' | 'status' | 'version' | 'verificationStatus' | 'isEncrypted'>, options?: { previousDocumentId?: string }) => Promise<void>;
  verifyDocument: (id: string, status: 'VERIFIED' | 'REJECTED' | 'EXPIRED', remarks?: string) => Promise<void>;
  archiveDocument: (id: string) => Promise<void>;
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt' | 'status' | 'agentId' | 'agentName' | 'companyId' | 'branchId'>) => Promise<void>;
  approveExpense: (id: string) => Promise<void>;
  rejectExpense: (id: string, reason: string) => Promise<void>;
  addExpenseCategory: (cat: Omit<ExpenseCategory, 'id' | 'companyId' | 'branchId' | 'createdAt'>) => Promise<void>;
  deleteExpenseCategory: (id: string) => Promise<void>;
  addNotification: (title: string, message: string, recipientRole: UserRole | 'all', category: 'Collections' | 'Loans' | 'Expenses' | 'Cash' | 'System', recipientId?: string, priority?: 'low' | 'medium' | 'high') => Promise<void>;
  markNotificationAsRead: (id: string) => Promise<void>;
  createAgentRoute: (agentId: string, date: string, visits: Omit<AgentVisit, 'id' | 'createdAt' | 'companyId' | 'branchId'>[]) => Promise<void>;
  updateVisitStatus: (visitId: string, status: AgentVisit['status'], notes?: string) => Promise<void>;
  requestSettlement: (loanId: string, discount: number, notes?: string) => Promise<void>;
  approveSettlement: (settlementId: string) => Promise<void>;
  rejectSettlement: (settlementId: string) => Promise<void>;

  // Security properties
  isAppLocked: boolean;
  lockApp: () => void;
  unlockApp: (pin: string) => boolean;
  approvalPin: string;
  updateApprovalPin: (newPin: string) => void;
  setupUserApprovalPin: (newPin: string) => Promise<void>;
  changeUserApprovalPin: (currentPin: string, newPin: string) => Promise<void>;
  forgotApprovalPinRequestOTP: (method: 'mobile' | 'email') => Promise<{ success: boolean; otp?: string; message?: string }>;
  verifyOTPAndResetPin: (otp: string, newPin: string) => Promise<void>;
  adminResetUserPin: (targetUserId: string, adminVerifySecret: string) => Promise<void>;
  securityPolicy: SecurityPolicy;
  updateSecurityPolicy: (policy: Partial<SecurityPolicy>) => void;
  logAudit: (action: string, module: string, oldVal: string, newVal: string, reason?: string) => Promise<void>;
  registerNewUser: (displayName: string, email: string, password?: string, role?: UserRole, branchId?: string) => Promise<void>;
  wipeDatabase: () => Promise<void>;
  seedDatabase: () => Promise<void>;

  // Enterprise PIN Redesign additions
  pinApprovalAudits: PinApprovalAudit[];
  activeApprovalRequest: { actionId: string; action: string; module: string; description: string; customerName?: string; onConfirm: () => void } | null;
  setActiveApprovalRequest: (req: any | null) => void;
  approvalSessionActiveUntil: string | null;
  requestSupervisorApproval: (req: { actionId: string; action: string; module: string; description: string; customerName?: string; onConfirm: () => void }) => void;
  verifySupervisorPinSecure: (pinCode: string) => Promise<{ success: boolean; message?: string }>;
  toggleUserPinDisabled: (uid: string) => Promise<void>;
  updateUserProfileFields: (uid: string, fields: Partial<UserProfile>) => Promise<void>;
  updateAdminCredentials: (displayName: string, email: string, password?: string) => Promise<void>;
  addBranch: (name: string, code: string) => Promise<void>;
  deleteBranch: (id: string) => Promise<void>;
  isSystemInitialized: boolean;
  initializeSystem: (companyName: string, branchName: string, branchCode: string, adminName: string, adminEmail: string, adminPassword: string, adminPin: string) => Promise<void>;
}

const VFMSContext = createContext<VFMSContextType | undefined>(undefined);

// Core default company & branch structures
const defaultCompany: Company = {
  id: 'vgot-you-finance',
  name: 'VGY Finance Ltd',
  code: 'VYFL',
  address: '101 Trust Tower, Financial District'
};

const defaultBranches: Branch[] = [
  { id: 'main-branch', companyId: 'vgot-you-finance', name: 'Main Head Office', code: 'VY-M01' },
  { id: 'city-branch', companyId: 'vgot-you-finance', name: 'City Center Branch', code: 'VY-C02' },
  { id: 'east-branch', companyId: 'vgot-you-finance', name: 'East Plaza Branch', code: 'VY-E03' }
];

// Initial pre-populated sandbox data for elegant live preview (Demo Mode)
const initialRules: FinanceRule[] = [
  {
    id: 'default-rule',
    version: '1.0',
    interestRateMin: 5,
    interestRateMax: 36,
    gracePeriodDays: 5,
    penaltyValue: 50,
    penaltyRate: 2,
    penaltyType: 'Flat Amount',
    processingFeeFixed: 500,
    processingFeePercent: 1.5,
    allocationPriority: ['Penalty', 'Interest', 'Principal'],
    loanNumberPrefix: 'VY-LN-',
    companyId: 'vgot-you-finance',
    branchId: 'main-branch',
    createdAt: new Date().toISOString()
  }
];

const initialCustomers: Customer[] = [];

const initialLoans: Loan[] = [];

// Helper to pre-populate exact historical loan schedules
const initialSchedules: { [loanId: string]: LoanSchedule[] } = {};

const initialPayments: Payment[] = [];

const initialLedgers: LedgerEntry[] = [];

const initialCollaterals: Collateral[] = [];

const initialCashBooks: CashBook[] = [];

const initialAuditLogs: AuditLog[] = [
  { 
    id: 'aud-init', 
    userId: 'system', 
    userName: 'VYFL System Core', 
    userRole: 'Super Admin', 
    action: 'SYSTEM_INITIALIZATION', 
    module: 'Core', 
    oldValue: '', 
    newValue: 'VGY Finance Platform clean instance booted successfully.', 
    companyId: 'vgot-you-finance', 
    branchId: 'main-branch', 
    createdAt: new Date().toISOString() 
  }
];

const initialUsers: UserProfile[] = [
  {
    uid: 'admin-1',
    displayName: 'VGY Super Admin',
    email: 'admin@vfms.com',
    role: 'Super Admin',
    password: 'vgotyou2026',
    branchId: 'main-branch',
    companyId: 'vgot-you-finance',
    createdAt: new Date().toISOString(),
    phone: '9876543210',
    approvalPin: bcrypt.hashSync('1234', 10),
    approvalPinLastChanged: new Date().toISOString(),
    approvalPinLastChangedBy: 'System Seeding'
  }
];

export const VFMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFirestoreMode, setIsFirestoreMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('vfms_database_mode');
    return savedMode === null ? true : savedMode === 'cloud';
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<UserRole>(() => {
    try {
      const savedUser = localStorage.getItem('vfms_logged_in_user');
      if (savedUser) return JSON.parse(savedUser).role;
    } catch {}
    return 'Super Admin';
  });
  const [currentBranch, setCurrentBranch] = useState<Branch>(() => {
    try {
      const savedUser = localStorage.getItem('vfms_logged_in_user');
      if (savedUser) {
        const u = JSON.parse(savedUser);
        const b = defaultBranches.find(x => x.id === u.branchId);
        if (b) return b;
      }
    } catch {}
    return defaultBranches[0];
  });
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const savedUser = localStorage.getItem('vfms_logged_in_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);

  // Security properties state
  const [isAppLocked, setIsAppLocked] = useState<boolean>(false);
  const [approvalPin, setApprovalPin] = useState<string>(() => {
    try {
      const pin = localStorage.getItem('vfms_approval_pin');
      return pin || '1234';
    } catch {
      return '1234';
    }
  });
  const [securityPolicy, setSecurityPolicy] = useState<SecurityPolicy>(() => {
    try {
      const savedPolicy = localStorage.getItem('vfms_security_policy');
      if (savedPolicy) {
        const parsed = JSON.parse(savedPolicy);
        return {
          pinRequiredForActions: true,
          autoLockTimeoutMinutes: 5,
          sensitiveDataMasking: true,
          ipGeofencingSimulation: false,
          disableRightClick: false,
          preventDevTools: false,
          antiDebuggerShield: false,
          domIntegrityCheck: false,
          approvalSessionTimeoutMinutes: 3,
          ...parsed
        };
      }
    } catch {}
    return {
      pinRequiredForActions: true,
      autoLockTimeoutMinutes: 5,
      sensitiveDataMasking: true,
      ipGeofencingSimulation: false,
      disableRightClick: false,
      preventDevTools: false,
      antiDebuggerShield: false,
      domIntegrityCheck: false,
      approvalSessionTimeoutMinutes: 3
    };
  });

  const [activeOTP, setActiveOTP] = useState<{
    otp: string;
    expiresAt: number;
    method: 'mobile' | 'email';
    target: string;
    failedAttempts: number;
  } | null>(null);

  const lockApp = () => {
    setIsAppLocked(true);
    logAudit('SESSION_LOCK', 'Security', 'Unlocked', 'Locked', 'System manually locked by operator.');
  };

  const [pinApprovalAudits, setPinApprovalAudits] = useState<PinApprovalAudit[]>([]);
  const [activeApprovalRequest, setActiveApprovalRequest] = useState<{
    actionId: string;
    action: string;
    module: string;
    description: string;
    customerName?: string;
    onConfirm: () => void;
  } | null>(null);
  const [approvalSessionActiveUntil, setApprovalSessionActiveUntil] = useState<string | null>(null);

  const unlockApp = (pin: string) => {
    const userPin = currentUser?.approvalPin || approvalPin;
    if (pin === userPin) {
      setIsAppLocked(false);
      logAudit('SESSION_UNLOCK', 'Security', 'Locked', 'Unlocked', 'System unlocked with supervisor pin.');
      return true;
    } else {
      logAudit('SECURITY_THREAT', 'Security', 'Failed PIN Attempt', pin, 'Suspicious access attempt: Incorrect security passcode entered.');
      return false;
    }
  };

  const updateApprovalPin = (newPin: string) => {
    setApprovalPin(newPin);
    localStorage.setItem('vfms_approval_pin', newPin);
    logAudit('UPDATE_PIN', 'Security', '••••', '••••', 'Supervisor authorization passcode updated.');
  };

  const validatePinStrength = (pin: string) => {
    if (pin.length < 4 || pin.length > 8) {
      throw new Error('PIN must be between 4 and 8 digits.');
    }
    if (/^(\d)\1+$/.test(pin)) {
      throw new Error('PIN cannot consist of repeating numbers (e.g. 1111).');
    }
    const seq = '0123456789012345';
    const revSeq = '9876543210987654';
    if (seq.includes(pin) || revSeq.includes(pin)) {
      throw new Error('PIN cannot be a simple sequence (e.g. 1234 or 4321).');
    }
  };

  const updateUserProfileFields = async (uid: string, fields: Partial<UserProfile>) => {
    let userExists = userProfiles.some(u => u.uid === uid);
    let updatedProfiles: UserProfile[];

    if (userExists) {
      updatedProfiles = userProfiles.map(u => {
        if (u.uid === uid) {
          const up = { ...u, ...fields };
          if (currentUser && currentUser.uid === uid) {
            setCurrentUser(up);
            if (!isFirestoreMode) {
              localStorage.setItem('vfms_logged_in_user', JSON.stringify(up));
            }
          }
          return up;
        }
        return u;
      });
    } else {
      const baseUser = (currentUser && currentUser.uid === uid)
        ? currentUser
        : {
            uid,
            displayName: 'System User',
            email: '',
            role: 'Loan Officer' as UserRole,
            branchId: 'main-branch',
            companyId: 'vgot-you-finance',
            createdAt: new Date().toISOString()
          };
      const up = { ...baseUser, ...fields } as UserProfile;
      if (currentUser && currentUser.uid === uid) {
        setCurrentUser(up);
        if (!isFirestoreMode) {
          localStorage.setItem('vfms_logged_in_user', JSON.stringify(up));
        }
      }
      updatedProfiles = [...userProfiles, up];
    }
    setUserProfiles(updatedProfiles);

    if (isFirestoreMode) {
      try {
        const targetProfile = updatedProfiles.find(u => u.uid === uid);
        if (targetProfile) {
          await setDoc(doc(db, 'users', uid), targetProfile);
        }
      } catch (err) {
        console.error("Failed to update user profile in Firestore:", err);
      }
    } else {
      localStorage.setItem('vfms_user_profiles', JSON.stringify(updatedProfiles));
    }
  };

  const updateAdminCredentials = async (displayName: string, email: string, password?: string) => {
    if (!currentUser) throw new Error('Not authenticated.');

    // 1. If Firestore Mode, update Firebase Auth
    if (isFirestoreMode && auth.currentUser) {
      try {
        if (displayName !== auth.currentUser.displayName) {
          await updateProfile(auth.currentUser, { displayName });
        }
        if (email.toLowerCase() !== auth.currentUser.email?.toLowerCase()) {
          await updateEmail(auth.currentUser, email.toLowerCase());
        }
        if (password && password.trim()) {
          await updatePassword(auth.currentUser, password);
        }
      } catch (err: any) {
        console.error("Firebase Auth credential update error:", err);
        throw new Error(err.message || 'Firebase Auth update failed.');
      }
    }

    // 2. Update user profile document in database
    const fieldsToUpdate: Partial<UserProfile> = {
      displayName,
      email: email.toLowerCase(),
    };
    if (password && password.trim()) {
      fieldsToUpdate.password = password;
    }

    await updateUserProfileFields(currentUser.uid, fieldsToUpdate);
  };

  const addBranch = async (name: string, code: string) => {
    const newB: Branch = {
      id: `branch-${Date.now()}`,
      companyId: defaultCompany.id,
      name,
      code
    };
    const updated = [...branches, newB];
    setBranches(updated);
    if (isFirestoreMode) {
      await setDoc(doc(db, 'branches', newB.id), newB);
    } else {
      localStorage.setItem('vfms_branches', JSON.stringify(updated));
    }
    logAudit('ADD_BRANCH', 'Security', '', name, `Added new branch: ${name} (${code})`);
  };

  const deleteBranch = async (id: string) => {
    if (branches.length <= 1) {
      throw new Error('Cannot delete the only remaining branch.');
    }
    const updated = branches.filter(b => b.id !== id);
    setBranches(updated);
    if (isFirestoreMode) {
      await deleteDoc(doc(db, 'branches', id));
    } else {
      localStorage.setItem('vfms_branches', JSON.stringify(updated));
    }
    logAudit('DELETE_BRANCH', 'Security', id, '', `Deleted branch ID: ${id}`);
  };

  const initializeSystem = async (
    companyName: string,
    branchName: string,
    branchCode: string,
    adminName: string,
    adminEmail: string,
    adminPassword: string,
    adminPin: string
  ) => {
    setIsLoading(true);
    try {
      // 1. Setup First Company
      const newCompany = {
        id: 'vgot-you-finance',
        name: companyName
      };

      // 2. Setup First Branch
      const firstBranch = {
        id: 'branch-main',
        companyId: newCompany.id,
        name: branchName,
        code: branchCode
      };

      // 3. Create Admin profile fields
      const adminUid = isFirestoreMode ? `admin-${Date.now()}` : 'admin-local';
      
      // If in Firestore Mode, create the Auth user
      let authUid = adminUid;
      if (isFirestoreMode) {
        try {
          const cred = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
          authUid = cred.user.uid;
        } catch (authErr: any) {
          throw new Error(`Auth account creation failed: ${authErr.message}`);
        }
      }

      const pinHash = bcrypt.hashSync(adminPin, 10);
      const adminProfile: UserProfile = {
        uid: authUid,
        displayName: adminName,
        email: adminEmail,
        role: 'Super Admin',
        password: adminPassword,
        branchId: firstBranch.id,
        companyId: newCompany.id,
        createdAt: new Date().toISOString(),
        approvalPin: pinHash,
        approvalPinLastChanged: new Date().toISOString(),
        approvalPinLastChangedBy: 'System Initialization'
      };

      // 4. Save to Database
      if (isFirestoreMode) {
        await setDoc(doc(db, 'companies', newCompany.id), newCompany);
        await setDoc(doc(db, 'branches', firstBranch.id), firstBranch);
        await setDoc(doc(db, 'users', authUid), adminProfile);
        
        // Seed default finance rule
        const defaultRule = {
          id: 'default-rule',
          version: '1.0',
          interestRateMin: 5,
          interestRateMax: 36,
          gracePeriodDays: 5,
          penaltyValue: 50,
          penaltyRate: 2,
          penaltyType: 'Flat Amount',
          processingFeeFixed: 500,
          processingFeePercent: 1.5,
          waiveOffLimitMax: 5000,
          requirePinForActions: true,
          lockoutAttemptsMax: 5,
          lockoutDurationMinutes: 5,
          autoLockTimeoutMinutes: 15
        };
        await setDoc(doc(db, 'financeRules', defaultRule.id), defaultRule);
      } else {
        localStorage.setItem('vfms_companies', JSON.stringify([newCompany]));
        localStorage.setItem('vfms_branches', JSON.stringify([firstBranch]));
        localStorage.setItem('vfms_user_profiles', JSON.stringify([adminProfile]));
        localStorage.setItem('vfms_rules', JSON.stringify([{
          id: 'default-rule',
          version: '1.0',
          interestRateMin: 5,
          interestRateMax: 36,
          gracePeriodDays: 5,
          penaltyValue: 50,
          penaltyRate: 2,
          penaltyType: 'Flat Amount',
          processingFeeFixed: 500,
          processingFeePercent: 1.5,
          waiveOffLimitMax: 5000,
          requirePinForActions: true,
          lockoutAttemptsMax: 5,
          lockoutDurationMinutes: 5,
          autoLockTimeoutMinutes: 15
        }]));
        // Log in immediately in Sandbox Mode
        setCurrentUser(adminProfile);
        setUserRole('Super Admin');
        setCurrentBranch(firstBranch);
        localStorage.setItem('vfms_logged_in_user', JSON.stringify(adminProfile));
      }

      // 5. Update initialization state
      setIsSystemInitialized(true);
    } catch (err: any) {
      console.error("System initialization failed:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logPinAudit = async (action: 'Created' | 'Changed' | 'Reset', method: PinResetAudit['method'], targetUser: UserProfile, operatorName: string) => {
    const id = `pin-aud-${Date.now()}`;
    const auditRecord: PinResetAudit = {
      id,
      userId: targetUser.uid,
      userName: targetUser.displayName,
      userEmail: targetUser.email,
      action,
      method,
      updatedBy: operatorName,
      createdAt: new Date().toISOString(),
      device: navigator.userAgent || 'Web Browser',
      ipAddress: '127.0.0.1 (Local Terminal)',
      companyId: defaultCompany.id
    };

    if (isFirestoreMode) {
      try {
        await setDoc(doc(db, 'pinResetAudits', id), auditRecord);
      } catch (err) {
        console.error("Failed to write pin reset audit to Firestore:", err);
      }
    } else {
      setPinResetAudits(prev => [auditRecord, ...prev]);
    }
  };

  const setupUserApprovalPin = async (newPin: string) => {
    if (!currentUser) throw new Error('Not authenticated.');
    validatePinStrength(newPin);
    const hashedPin = bcrypt.hashSync(newPin, 10);
    await updateUserProfileFields(currentUser.uid, {
      approvalPin: hashedPin,
      approvalPinLastChanged: new Date().toISOString(),
      approvalPinLastChangedBy: currentUser.displayName,
      approvalPinResetRequired: false
    });
    await logPinAudit('Created', 'Direct', currentUser, currentUser.displayName);
  };

  const changeUserApprovalPin = async (currentPin: string, newPin: string) => {
    if (!currentUser) throw new Error('Not authenticated.');
    if (!currentUser.approvalPin) {
      await setupUserApprovalPin(newPin);
      return;
    }
    if (!bcrypt.compareSync(currentPin, currentUser.approvalPin)) {
      throw new Error('Current PIN is incorrect.');
    }
    if (newPin === currentPin) {
      throw new Error('New PIN must be different from your current PIN.');
    }
    validatePinStrength(newPin);
    const hashedPin = bcrypt.hashSync(newPin, 10);
    await updateUserProfileFields(currentUser.uid, {
      approvalPin: hashedPin,
      approvalPinLastChanged: new Date().toISOString(),
      approvalPinLastChangedBy: currentUser.displayName
    });
    await logPinAudit('Changed', 'Direct', currentUser, currentUser.displayName);
  };

  const forgotApprovalPinRequestOTP = async (method: 'mobile' | 'email') => {
    if (!currentUser) throw new Error('Not authenticated.');
    const target = method === 'mobile' ? (currentUser.phone || '9876543210') : currentUser.email;
    if (!target) {
      throw new Error(`No registered ${method === 'mobile' ? 'mobile number' : 'email address'} found.`);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setActiveOTP({
      otp,
      expiresAt: Date.now() + 60000,
      method,
      target,
      failedAttempts: 0
    });

    console.log(`[SECURITY OTP] Sent OTP ${otp} to ${target} via ${method}`);
    return {
      success: true,
      otp,
      message: `OTP sent successfully to your registered ${method === 'mobile' ? 'Mobile Number' : 'Email Address'} (${target}).`
    };
  };

  const verifyOTPAndResetPin = async (otp: string, newPin: string) => {
    if (!currentUser) throw new Error('Not authenticated.');
    if (!activeOTP) {
      throw new Error('No active OTP process. Please request a new OTP.');
    }
    if (Date.now() > activeOTP.expiresAt) {
      setActiveOTP(null);
      throw new Error('OTP has expired (60 seconds limit). Please request a new one.');
    }
    if (otp !== activeOTP.otp) {
      const attempts = activeOTP.failedAttempts + 1;
      if (attempts >= 3) {
        setActiveOTP(null);
        throw new Error('Maximum failed OTP attempts exceeded. Process cancelled.');
      }
      setActiveOTP(prev => prev ? { ...prev, failedAttempts: attempts } : null);
      throw new Error(`Invalid OTP. ${3 - attempts} attempts remaining.`);
    }

    validatePinStrength(newPin);
    setActiveOTP(null);

    const hashedPin = bcrypt.hashSync(newPin, 10);
    await updateUserProfileFields(currentUser.uid, {
      approvalPin: hashedPin,
      approvalPinLastChanged: new Date().toISOString(),
      approvalPinLastChangedBy: currentUser.displayName,
      approvalPinResetRequired: false
    });

    await logPinAudit('Reset', activeOTP.method === 'mobile' ? 'OTP-Mobile' : 'OTP-Email', currentUser, currentUser.displayName);
    await logout();
  };

  const adminResetUserPin = async (targetUserId: string, adminVerifySecret: string) => {
    if (!currentUser) throw new Error('Not authenticated.');
    if (userRole !== 'Super Admin') {
      throw new Error('Only Super Admin is authorized to reset user PINs.');
    }

    const isAdminPassValid = currentUser.password === adminVerifySecret;
    const isAdminPinValid = currentUser.approvalPin && bcrypt.compareSync(adminVerifySecret, currentUser.approvalPin);
    if (!isAdminPassValid && !isAdminPinValid) {
      throw new Error('Super Admin verification failed. Incorrect password or PIN.');
    }

    const targetUser = userProfiles.find(u => u.uid === targetUserId);
    if (!targetUser) throw new Error('Target user not found.');

    await updateUserProfileFields(targetUserId, {
      approvalPin: '',
      approvalPinResetRequired: true
    });

    await logPinAudit('Reset', 'Admin-Reset', targetUser, currentUser.displayName);
  };

  const verifySupervisorPinSecure = async (pinCode: string): Promise<{ success: boolean; message?: string }> => {
    if (!currentUser) throw new Error('Not authenticated.');

    // 1. Check if current user is locked out
    if (currentUser.lockedUntil && new Date() < new Date(currentUser.lockedUntil)) {
      const remSecs = Math.round((new Date(currentUser.lockedUntil).getTime() - Date.now()) / 1000);
      return { 
        success: false, 
        message: `PIN verification is locked. Please try again in ${Math.ceil(remSecs / 60)} minutes.` 
      };
    }

    // 2. Find matching supervisor by comparing hashed PIN
    const supervisors = userProfiles.filter(u => 
      (u.role === 'Super Admin' || u.role === 'Manager') && 
      u.companyId === currentUser.companyId && 
      !u.pinDisabled
    );

    let matchedSupervisor: UserProfile | undefined = undefined;
    for (const supervisor of supervisors) {
      if (supervisor.approvalPin && bcrypt.compareSync(pinCode, supervisor.approvalPin)) {
        matchedSupervisor = supervisor;
        break;
      }
    }

    const nowStr = new Date().toISOString();
    const id = `pin-appr-${Date.now()}`;
    const userAgent = navigator.userAgent || 'Web Browser';
    const browser = userAgent.split(' ').pop() || 'Unknown Browser';
    const device = userAgent.includes('Mobi') ? 'Mobile Terminal' : 'Desktop Workstation';

    if (matchedSupervisor) {
      if (matchedSupervisor.lockedUntil && new Date() < new Date(matchedSupervisor.lockedUntil)) {
        return { 
          success: false, 
          message: `The supervisor account (${matchedSupervisor.displayName}) is currently locked out.` 
        };
      }

      // Success: Reset failed attempts for active user and matching supervisor
      await updateUserProfileFields(currentUser.uid, {
        failedPinAttempts: 0,
        lockedUntil: '',
        lastFailedAttempt: ''
      });
      if (matchedSupervisor.uid !== currentUser.uid) {
        await updateUserProfileFields(matchedSupervisor.uid, {
          failedPinAttempts: 0,
          lockedUntil: '',
          lastFailedAttempt: ''
        });
      }

      // Configure temporary approval session
      const timeout = securityPolicy.approvalSessionTimeoutMinutes || 3;
      setApprovalSessionActiveUntil(new Date(Date.now() + timeout * 60000).toISOString());

      // Write PinApprovalAudit log to DB
      const auditRecord: PinApprovalAudit = {
        id,
        createdAt: nowStr,
        actionId: activeApprovalRequest?.actionId || `action-${Date.now()}`,
        action: activeApprovalRequest?.action || 'Sensitive Transaction',
        module: activeApprovalRequest?.module || 'Security',
        approvedBy: matchedSupervisor.displayName,
        approverRole: matchedSupervisor.role as 'Super Admin' | 'Manager',
        requestedBy: currentUser.displayName,
        requesterRole: currentUser.role,
        branchId: currentBranch.id,
        branchName: currentBranch.name,
        companyId: currentUser.companyId,
        status: 'Success',
        device,
        browser,
        ipAddress: '127.0.0.1 (Secured LAN)',
        approvalMethod: 'PIN'
      };

      if (isFirestoreMode) {
        await setDoc(doc(db, 'pinApprovalAudits', id), auditRecord);
      } else {
        setPinApprovalAudits(prev => [auditRecord, ...prev]);
      }

      return { success: true };
    } else {
      // Failed verification: increment attempts on currentUser
      const currentAttempts = (currentUser.failedPinAttempts || 0) + 1;
      const fieldsToUpdate: Partial<UserProfile> = {
        failedPinAttempts: currentAttempts,
        lastFailedAttempt: nowStr
      };

      let lockoutMessage = '';
      if (currentAttempts >= 5) {
        const lockUntilTime = new Date(Date.now() + 300000).toISOString(); // 5 minutes
        fieldsToUpdate.lockedUntil = lockUntilTime;
        lockoutMessage = ' Verification locked for 5 minutes.';
      }

      await updateUserProfileFields(currentUser.uid, fieldsToUpdate);

      // Write Failed PinApprovalAudit log to DB
      const auditRecord: PinApprovalAudit = {
        id,
        createdAt: nowStr,
        actionId: activeApprovalRequest?.actionId || `failed-action-${Date.now()}`,
        action: activeApprovalRequest?.action || 'Sensitive Transaction',
        module: activeApprovalRequest?.module || 'Security',
        approvedBy: 'INVALID_PIN',
        approverRole: 'Manager',
        requestedBy: currentUser.displayName,
        requesterRole: currentUser.role,
        branchId: currentBranch.id,
        branchName: currentBranch.name,
        companyId: currentUser.companyId,
        status: 'Failed',
        device,
        browser,
        ipAddress: '127.0.0.1 (Secured LAN)',
        approvalMethod: 'PIN',
        remarks: `Failed PIN attempt entered by ${currentUser.displayName}. Attempts: ${currentAttempts}/5.${lockoutMessage}`
      };

      if (isFirestoreMode) {
        await setDoc(doc(db, 'pinApprovalAudits', id), auditRecord);
      } else {
        setPinApprovalAudits(prev => [auditRecord, ...prev]);
      }

      throw new Error(`Invalid Approval PIN.${lockoutMessage}`);
    }
  };

  const requestSupervisorApproval = (req: {
    actionId: string;
    action: string;
    module: string;
    description: string;
    customerName?: string;
    onConfirm: () => void;
  }) => {
    // Check if there is an active valid session
    if (approvalSessionActiveUntil && new Date() < new Date(approvalSessionActiveUntil)) {
      req.onConfirm();
      return;
    }
    setActiveApprovalRequest(req);
  };

  const toggleUserPinDisabled = async (uid: string) => {
    const user = userProfiles.find(u => u.uid === uid);
    if (!user) throw new Error('User not found.');
    const newStatus = !user.pinDisabled;
    await updateUserProfileFields(uid, { pinDisabled: newStatus });
    logAudit('TOGGLE_PIN_STATUS', 'Security', user.pinDisabled ? 'Disabled' : 'Enabled', newStatus ? 'Disabled' : 'Enabled', `Approval PIN capabilities status updated for ${user.displayName}.`);
  };

  const updateSecurityPolicy = (policy: Partial<SecurityPolicy>) => {
    const updated = { ...securityPolicy, ...policy };
    setSecurityPolicy(updated);
    localStorage.setItem('vfms_security_policy', JSON.stringify(updated));
    logAudit('UPDATE_POLICY', 'Security', 'Policy Update', Object.keys(policy).join(', '), `Security compliance policies updated: ${Object.keys(policy).map(k => `${k}=${(policy as any)[k]}`).join(', ')}`);
  };

  const [isSystemInitialized, setIsSystemInitialized] = useState<boolean>(true);

  // Storage entities (Synced with Firestore in Firestore mode, or localStorage in sandbox mode)
  const [companies] = useState<Company[]>([defaultCompany]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [schedules, setSchedules] = useState<{ [loanId: string]: LoanSchedule[] }>({});
  const [payments, setPayments] = useState<Payment[]>([]);
  const [ledgers, setLedgers] = useState<LedgerEntry[]>([]);
  const [collaterals, setCollaterals] = useState<Collateral[]>([]);
  const [cashBooks, setCashBooks] = useState<CashBook[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [financeRules, setFinanceRules] = useState<FinanceRule[]>([]);
  const [guarantors, setGuarantors] = useState<Guarantor[]>([]);
  const [documents, setDocuments] = useState<CustomerDocument[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [agentVisits, setAgentVisits] = useState<AgentVisit[]>([]);
  const [settlements, setSettlements] = useState<LoanSettlement[]>([]);
  const [pinResetAudits, setPinResetAudits] = useState<PinResetAudit[]>([]);
  const [dashboardAction, setDashboardAction] = useState<string | null>(null);
  const [selectedLoanIdForCollection, setSelectedLoanIdForCollection] = useState<string | null>(null);
  const [selectedCustomerIdForNewLoan, setSelectedCustomerIdForNewLoan] = useState<string | null>(null);

  const toggleStorageMode = () => {
    const newMode = !isFirestoreMode;
    setIsFirestoreMode(newMode);
    localStorage.setItem('vfms_database_mode', newMode ? 'cloud' : 'sandbox');
    window.location.reload();
  };

  // Switch role helper
  const switchRole = (newRole: UserRole) => {
    setUserRole(newRole);
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        role: newRole
      };
      setCurrentUser(updatedUser);
      if (!isFirestoreMode) {
        localStorage.setItem('vfms_logged_in_user', JSON.stringify(updatedUser));
      }
    }
    logAudit('SWITCH_ROLE', 'Auth', userRole, newRole, `Switched RBAC role to ${newRole}`);
  };

  // Switch branch helper
  const switchBranch = (branchId: string) => {
    const b = branches.find(x => x.id === branchId);
    if (b) {
      setCurrentBranch(b);
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          branchId: b.id
        };
        setCurrentUser(updatedUser);
        if (!isFirestoreMode) {
          localStorage.setItem('vfms_logged_in_user', JSON.stringify(updatedUser));
        }
      }
      logAudit('SWITCH_BRANCH', 'Auth', currentBranch.name, b.name, `Switched active branch to ${b.name}`);
    }
  };

  // Login helper
  const login = (profile: UserProfile) => {
    setCurrentUser(profile);
    setUserRole(profile.role);
    const b = branches.find(x => x.id === profile.branchId);
    if (b) setCurrentBranch(b);
    
    if (!isFirestoreMode) {
      localStorage.setItem('vfms_logged_in_user', JSON.stringify(profile));
      
      // Update our user profiles if not present or role modified
      const exists = userProfiles.some(x => x.uid === profile.uid);
      if (!exists) {
        const updated = [...userProfiles, profile];
        setUserProfiles(updated);
        localStorage.setItem('vfms_user_profiles', JSON.stringify(updated));
      }
    }
    logAudit('LOGIN', 'Auth', '', profile.email, `Logged in successfully as ${profile.displayName}`);
  };

  // Logout helper
  const logout = async () => {
    setCurrentUser(null);
    localStorage.removeItem('vfms_logged_in_user');
    if (isFirestoreMode) {
      try {
        await signOut(auth);
      } catch (err) {
        console.error("Firebase SignOut failed:", err);
      }
    }
    logAudit('LOGOUT', 'Auth', currentUser?.email || '', '', 'Logged out successfully');
  };

  // Update User Access helper
  const updateUserAccess = async (uid: string, role: UserRole, branchId: string) => {
    const target = userProfiles.find(x => x.uid === uid);
    const oldRole = target?.role || 'N/A';
    const oldBranch = target?.branchId || 'N/A';

    if (isFirestoreMode) {
      try {
        await updateDoc(doc(db, 'users', uid), { role, branchId });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `users/${uid}`);
      }
    } else {
      const updated = userProfiles.map(u => u.uid === uid ? { ...u, role, branchId } : u);
      setUserProfiles(updated);
      localStorage.setItem('vfms_user_profiles', JSON.stringify(updated));
    }

    if (currentUser && currentUser.uid === uid) {
      const updatedProfile = { ...currentUser, role, branchId };
      setCurrentUser(updatedProfile);
      setUserRole(role);
      const b = branches.find(x => x.id === branchId);
      if (b) setCurrentBranch(b);
      
      if (!isFirestoreMode) {
        localStorage.setItem('vfms_logged_in_user', JSON.stringify(updatedProfile));
      }
    }

    logAudit('UPDATE_USER_ACCESS', 'Security', `Role: ${oldRole}, Branch: ${oldBranch}`, `Role: ${role}, Branch: ${branchId}`, `Super Admin modified access control for ${target?.displayName || uid}`);
  };

  // Helper to log audit actions locally/to firestore
  const logAudit = async (action: string, module: string, oldVal: string, newVal: string, reason = '') => {
    const log: AuditLog = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId: currentUser?.uid || 'anonymous-demo',
      userName: currentUser?.displayName || `Guest ${userRole}`,
      userRole: userRole,
      action,
      module,
      oldValue: oldVal,
      newValue: newVal,
      reason,
      companyId: defaultCompany.id,
      branchId: currentBranch.id,
      createdAt: new Date().toISOString()
    };

    if (isFirestoreMode) {
      try {
        await setDoc(doc(db, 'auditLogs', log.id), log);
      } catch (err) {
        console.error("Audit log Firestore write failed, saving locally:", err);
      }
    }
    
    setAuditLogs(prev => [log, ...prev]);
  };

  // Load state
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);

      // Force a one-time clean reset of cached legacy sandbox data in the browser
      const isProdCleaned = localStorage.getItem('vfms_prod_clean_v2');
      if (!isProdCleaned) {
        localStorage.clear();
        localStorage.setItem('vfms_prod_clean_v2', 'true');
      }

      // Check system initialization
      if (isFirestoreMode) {
        try {
          const usersSnap = await getDocs(collection(db, 'users'));
          const isDbEmpty = usersSnap.empty;
          setIsSystemInitialized(!isDbEmpty);
        } catch (e) {
          console.error("Failed to check if system is initialized:", e);
          setIsSystemInitialized(true); // fallback to prevent blocking
        }
      } else {
        const localUserProfiles = localStorage.getItem('vfms_user_profiles');
        setIsSystemInitialized(!!localUserProfiles && JSON.parse(localUserProfiles).length > 0);
      }
      
      // 1. Set up initial user model and profiles list listener
      let unsubUsers: (() => void) | undefined = undefined;
      let unsubBranches: (() => void) | undefined = undefined;

      const unsubAuth = auth.onAuthStateChanged(async (user) => {
        if (user) {
          if (isFirestoreMode) {
            try {
              const userRef = doc(db, 'users', user.uid);
              const snap = await getDoc(userRef);
              if (snap.exists()) {
                const profile = snap.data() as UserProfile;
                setCurrentUser(profile);
                setUserRole(profile.role);
                const b = defaultBranches.find(x => x.id === profile.branchId);
                if (b) setCurrentBranch(b);
              } else {
                let profile: UserProfile | null = null;
                if (user.email === 'admin@vfms.com') {
                  const seededAdminRef = doc(db, 'users', 'admin-1');
                  const seededAdminSnap = await getDoc(seededAdminRef);
                  if (seededAdminSnap.exists()) {
                    const seededData = seededAdminSnap.data() as UserProfile;
                    profile = {
                      ...seededData,
                      uid: user.uid
                    };
                    await setDoc(userRef, profile);
                    try {
                      await deleteDoc(seededAdminRef);
                    } catch (e) {}
                  }
                }

                if (!profile) {
                  const usersSnap = await getDocs(collection(db, 'users'));
                  const isFirst = usersSnap.empty;
                  profile = {
                    uid: user.uid,
                    displayName: user.displayName || user.email?.split('@')[0] || 'Google User',
                    email: user.email || '',
                    role: (isFirst || user.email === 'admin@vfms.com') ? 'Super Admin' : 'Loan Officer',
                    branchId: defaultBranches[0].id,
                    companyId: defaultCompany.id,
                    createdAt: new Date().toISOString()
                  };
                  await setDoc(userRef, profile);
                }
                setCurrentUser(profile);
                setUserRole(profile.role);
              }
            } catch (err) {
              console.error("Failed to sync user auth profile in Firestore:", err);
            }
          } else {
            // Google auth in Sandbox Mode
            const profile: UserProfile = {
              uid: user.uid,
              displayName: user.displayName || user.email?.split('@')[0] || 'Google User',
              email: user.email || '',
              role: 'Super Admin',
              branchId: defaultBranches[0].id,
              companyId: defaultCompany.id,
              createdAt: new Date().toISOString()
            };
            setCurrentUser(profile);
            setUserRole('Super Admin');
            localStorage.setItem('vfms_logged_in_user', JSON.stringify(profile));
          }
        } else {
          if (isFirestoreMode) {
            setCurrentUser(null);
          }
        }
      });

      if (!isFirestoreMode) {
        // Load user profiles
        const localUserProfiles = localStorage.getItem('vfms_user_profiles');
        if (localUserProfiles) {
          setUserProfiles(JSON.parse(localUserProfiles));
        } else {
          setUserProfiles(initialUsers);
          localStorage.setItem('vfms_user_profiles', JSON.stringify(initialUsers));
        }

        // Load other sandbox entities
        const localCust = localStorage.getItem('vfms_customers');
        const localLoans = localStorage.getItem('vfms_loans');
        const localSchedules = localStorage.getItem('vfms_schedules');
        const localPayments = localStorage.getItem('vfms_payments');
        const localLedgers = localStorage.getItem('vfms_ledgers');
        const localCollaterals = localStorage.getItem('vfms_collaterals');
        const localCash = localStorage.getItem('vfms_cashbooks');
        const localAudits = localStorage.getItem('vfms_audit_logs');
        const localRules = localStorage.getItem('vfms_rules');
        const localGuar = localStorage.getItem('vfms_guarantors');
        const localDocs = localStorage.getItem('vfms_documents');
        const localExpenses = localStorage.getItem('vfms_expenses');
        const localExpenseCategories = localStorage.getItem('vfms_expense_categories');
        const localNotifications = localStorage.getItem('vfms_notifications');
        const localVisits = localStorage.getItem('vfms_visits');
        const localSettlements = localStorage.getItem('vfms_settlements');
        const localPinAudits = localStorage.getItem('vfms_pin_reset_audits');
        const localPinApprovalAudits = localStorage.getItem('vfms_pin_approval_audits');

        if (localCust !== null) {
          setCustomers(JSON.parse(localCust || '[]'));
          setLoans(JSON.parse(localLoans || '[]'));
          setSchedules(JSON.parse(localSchedules || '{}'));
          setPayments(JSON.parse(localPayments || '[]'));
          setLedgers(JSON.parse(localLedgers || '[]'));
          setCollaterals(JSON.parse(localCollaterals || '[]'));
          setCashBooks(JSON.parse(localCash || '[]'));
          setAuditLogs(JSON.parse(localAudits || '[]'));
          setFinanceRules(JSON.parse(localRules || '[]'));
          setGuarantors(JSON.parse(localGuar || '[]'));
          setDocuments(JSON.parse(localDocs || '[]'));
          setExpenses(JSON.parse(localExpenses || '[]'));
          setNotifications(JSON.parse(localNotifications || '[]'));
          setAgentVisits(JSON.parse(localVisits || '[]'));
          setSettlements(JSON.parse(localSettlements || '[]'));
          setPinResetAudits(JSON.parse(localPinAudits || '[]'));
          setPinApprovalAudits(JSON.parse(localPinApprovalAudits || '[]'));
          
          const localBranches = localStorage.getItem('vfms_branches');
          if (localBranches) {
            setBranches(JSON.parse(localBranches));
          } else {
            setBranches(defaultBranches);
            localStorage.setItem('vfms_branches', JSON.stringify(defaultBranches));
          }

          if (localExpenseCategories) {
            setExpenseCategories(JSON.parse(localExpenseCategories));
          } else {
            const defaults: ExpenseCategory[] = [
              { id: 'cat-1', name: 'Petrol Expense', amount: 200, companyId: defaultCompany.id, branchId: currentBranch.id, createdAt: new Date().toISOString() },
              { id: 'cat-2', name: 'Food Expense', amount: 150, companyId: defaultCompany.id, branchId: currentBranch.id, createdAt: new Date().toISOString() },
              { id: 'cat-3', name: 'Beta/Batta Allowance', amount: 300, companyId: defaultCompany.id, branchId: currentBranch.id, createdAt: new Date().toISOString() }
            ];
            setExpenseCategories(defaults);
            localStorage.setItem('vfms_expense_categories', JSON.stringify(defaults));
          }
        } else {
          const localBranches = localStorage.getItem('vfms_branches');
          if (localBranches) {
            setBranches(JSON.parse(localBranches));
          } else {
            setBranches(defaultBranches);
            localStorage.setItem('vfms_branches', JSON.stringify(defaultBranches));
          }
          setCustomers([]);
          setLoans([]);
          setSchedules({});
          setPayments([]);
          setLedgers([]);
          setCollaterals([]);
          setCashBooks([]);
          setAuditLogs(initialAuditLogs);
          setFinanceRules(initialRules);
          setGuarantors([]);
          setDocuments([]);
          setExpenses([]);
          setNotifications([]);
          setAgentVisits([]);
          setSettlements([]);
          setPinResetAudits([]);
          setPinApprovalAudits([]);
          const defaults: ExpenseCategory[] = [
            { id: 'cat-1', name: 'Petrol Expense', amount: 200, companyId: defaultCompany.id, branchId: currentBranch.id, createdAt: new Date().toISOString() },
            { id: 'cat-2', name: 'Food Expense', amount: 150, companyId: defaultCompany.id, branchId: currentBranch.id, createdAt: new Date().toISOString() },
            { id: 'cat-3', name: 'Beta/Batta Allowance', amount: 300, companyId: defaultCompany.id, branchId: currentBranch.id, createdAt: new Date().toISOString() }
          ];
          setExpenseCategories(defaults);

          localStorage.setItem('vfms_customers', JSON.stringify([]));
          localStorage.setItem('vfms_loans', JSON.stringify([]));
          localStorage.setItem('vfms_schedules', JSON.stringify({}));
          localStorage.setItem('vfms_payments', JSON.stringify([]));
          localStorage.setItem('vfms_ledgers', JSON.stringify([]));
          localStorage.setItem('vfms_collaterals', JSON.stringify([]));
          localStorage.setItem('vfms_cashbooks', JSON.stringify([]));
          localStorage.setItem('vfms_audit_logs', JSON.stringify(initialAuditLogs));
          localStorage.setItem('vfms_rules', JSON.stringify(initialRules));
          localStorage.setItem('vfms_guarantors', JSON.stringify([]));
          localStorage.setItem('vfms_documents', JSON.stringify([]));
          localStorage.setItem('vfms_expenses', JSON.stringify([]));
          localStorage.setItem('vfms_expense_categories', JSON.stringify(defaults));
          localStorage.setItem('vfms_notifications', JSON.stringify([]));
          localStorage.setItem('vfms_visits', JSON.stringify([]));
          localStorage.setItem('vfms_settlements', JSON.stringify([]));
          localStorage.setItem('vfms_pin_reset_audits', JSON.stringify([]));
          localStorage.setItem('vfms_pin_approval_audits', JSON.stringify([]));
        }
        setIsLoading(false);
      } else {
        // Live Firebase Firestore Mode
        try {
          // Listen to users
          unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
            const list: UserProfile[] = [];
            snapshot.forEach(doc => list.push(doc.data() as UserProfile));
            setUserProfiles(list);
          }, (err) => handleFirestoreError(err, OperationType.LIST, 'users'));
          // Listen to branches
          unsubBranches = onSnapshot(collection(db, 'branches'), (snapshot) => {
            const list: Branch[] = [];
            snapshot.forEach(doc => list.push(doc.data() as Branch));
            if (list.length === 0) {
              // Seed default branches in Firestore
              defaultBranches.forEach(b => {
                setDoc(doc(db, 'branches', b.id), b).catch(console.error);
              });
              setBranches(defaultBranches);
            } else {
              setBranches(list);
            }
          }, (err) => handleFirestoreError(err, OperationType.LIST, 'branches'));
          // Listen to collections
          const unsubCust = onSnapshot(collection(db, 'customers'), (snapshot) => {
            const list: Customer[] = [];
            snapshot.forEach(doc => list.push(doc.data() as Customer));
            setCustomers(list);
          }, (err) => handleFirestoreError(err, OperationType.LIST, 'customers'));

          const unsubLoans = onSnapshot(collection(db, 'loans'), (snapshot) => {
            const list: Loan[] = [];
            snapshot.forEach(doc => list.push(doc.data() as Loan));
            setLoans(list);
          }, (err) => handleFirestoreError(err, OperationType.LIST, 'loans'));

          const unsubPayments = onSnapshot(collection(db, 'payments'), (snapshot) => {
            const list: Payment[] = [];
            snapshot.forEach(doc => list.push(doc.data() as Payment));
            setPayments(list);
          }, (err) => handleFirestoreError(err, OperationType.LIST, 'payments'));

          const unsubLedgers = onSnapshot(collection(db, 'ledgers'), (snapshot) => {
            const list: LedgerEntry[] = [];
            snapshot.forEach(doc => list.push(doc.data() as LedgerEntry));
            setLedgers(list);
          }, (err) => handleFirestoreError(err, OperationType.LIST, 'ledgers'));

          const unsubCollaterals = onSnapshot(collection(db, 'collaterals'), (snapshot) => {
            const list: Collateral[] = [];
            snapshot.forEach(doc => list.push(doc.data() as Collateral));
            setCollaterals(list);
          }, (err) => handleFirestoreError(err, OperationType.LIST, 'collaterals'));

          const unsubCash = onSnapshot(collection(db, 'cashBooks'), (snapshot) => {
            const list: CashBook[] = [];
            snapshot.forEach(doc => list.push(doc.data() as CashBook));
            setCashBooks(list);
          }, (err) => handleFirestoreError(err, OperationType.LIST, 'cashBooks'));

          const unsubAudits = onSnapshot(collection(db, 'auditLogs'), (snapshot) => {
            const list: AuditLog[] = [];
            snapshot.forEach(doc => list.push(doc.data() as AuditLog));
            // Sort by Date descending
            list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setAuditLogs(list);
          }, (err) => handleFirestoreError(err, OperationType.LIST, 'auditLogs'));

          const unsubRules = onSnapshot(collection(db, 'financeRules'), (snapshot) => {
            const list: FinanceRule[] = [];
            snapshot.forEach(doc => list.push(doc.data() as FinanceRule));
            if (list.length === 0) {
              // Seed rule in Firestore
              setDoc(doc(db, 'financeRules', 'default-rule'), initialRules[0]).catch(console.error);
              setFinanceRules(initialRules);
            } else {
              setFinanceRules(list);
            }
          }, (err) => handleFirestoreError(err, OperationType.LIST, 'financeRules'));

          const unsubGuar = onSnapshot(collection(db, 'guarantors'), (snapshot) => {
            const list: Guarantor[] = [];
            snapshot.forEach(doc => list.push(doc.data() as Guarantor));
            setGuarantors(list);
          }, (err) => handleFirestoreError(err, OperationType.LIST, 'guarantors'));

          const unsubDocs = onSnapshot(collection(db, 'documents'), (snapshot) => {
            const list: CustomerDocument[] = [];
            snapshot.forEach(doc => list.push(doc.data() as CustomerDocument));
            setDocuments(list);
          }, (err) => handleFirestoreError(err, OperationType.LIST, 'documents'));

          const unsubExpenses = onSnapshot(collection(db, 'expenses'), (snapshot) => {
            const list: Expense[] = [];
            snapshot.forEach(doc => list.push(doc.data() as Expense));
            setExpenses(list);
          }, (err) => handleFirestoreError(err, OperationType.LIST, 'expenses'));

          const unsubExpenseCategories = onSnapshot(collection(db, 'expenseCategories'), (snapshot) => {
            const list: ExpenseCategory[] = [];
            snapshot.forEach(doc => list.push(doc.data() as ExpenseCategory));
            setExpenseCategories(list);
          }, (err) => handleFirestoreError(err, OperationType.LIST, 'expenseCategories'));

          const unsubNotifications = onSnapshot(collection(db, 'notifications'), (snapshot) => {
            const list: Notification[] = [];
            snapshot.forEach(doc => list.push(doc.data() as Notification));
            list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setNotifications(list);
          }, (err) => handleFirestoreError(err, OperationType.LIST, 'notifications'));

          const unsubVisits = onSnapshot(collection(db, 'agentVisits'), (snapshot) => {
            const list: AgentVisit[] = [];
            snapshot.forEach(doc => list.push(doc.data() as AgentVisit));
            setAgentVisits(list);
          }, (err) => handleFirestoreError(err, OperationType.LIST, 'agentVisits'));

          const unsubSettlements = onSnapshot(collection(db, 'settlements'), (snapshot) => {
            const list: LoanSettlement[] = [];
            snapshot.forEach(doc => list.push(doc.data() as LoanSettlement));
            setSettlements(list);
          }, (err) => handleFirestoreError(err, OperationType.LIST, 'settlements'));

          const unsubPinAudits = onSnapshot(collection(db, 'pinResetAudits'), (snapshot) => {
            const list: PinResetAudit[] = [];
            snapshot.forEach(doc => list.push(doc.data() as PinResetAudit));
            list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setPinResetAudits(list);
          }, (err) => handleFirestoreError(err, OperationType.LIST, 'pinResetAudits'));

          const unsubPinApprovalAudits = onSnapshot(collection(db, 'pinApprovalAudits'), (snapshot) => {
            const list: PinApprovalAudit[] = [];
            snapshot.forEach(doc => list.push(doc.data() as PinApprovalAudit));
            list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setPinApprovalAudits(list);
          }, (err) => handleFirestoreError(err, OperationType.LIST, 'pinApprovalAudits'));

          setIsLoading(false);
          return () => {
            unsubAuth(); unsubCust(); unsubLoans(); unsubPayments();
            unsubLedgers(); unsubCollaterals(); unsubCash(); unsubAudits(); unsubRules(); unsubGuar(); unsubDocs();
            unsubExpenses(); unsubExpenseCategories(); unsubNotifications(); unsubVisits(); unsubSettlements();
            unsubPinAudits();
            unsubPinApprovalAudits();
            if (unsubUsers) unsubUsers();
            if (unsubBranches) unsubBranches();
          };
        } catch (e) {
          console.error("Firestore loading error:", e);
          setIsLoading(false);
        }
      }
    };
    init();
  }, [isFirestoreMode]);

  // Sync sandbox state with localStorage whenever changes occur
  useEffect(() => {
    if (!isFirestoreMode && !isLoading) {
      localStorage.setItem('vfms_customers', JSON.stringify(customers));
      localStorage.setItem('vfms_loans', JSON.stringify(loans));
      localStorage.setItem('vfms_schedules', JSON.stringify(schedules));
      localStorage.setItem('vfms_payments', JSON.stringify(payments));
      localStorage.setItem('vfms_ledgers', JSON.stringify(ledgers));
      localStorage.setItem('vfms_collaterals', JSON.stringify(collaterals));
      localStorage.setItem('vfms_cashbooks', JSON.stringify(cashBooks));
      localStorage.setItem('vfms_audit_logs', JSON.stringify(auditLogs));
      localStorage.setItem('vfms_rules', JSON.stringify(financeRules));
      localStorage.setItem('vfms_guarantors', JSON.stringify(guarantors));
      localStorage.setItem('vfms_documents', JSON.stringify(documents));
      localStorage.setItem('vfms_expenses', JSON.stringify(expenses));
      localStorage.setItem('vfms_expense_categories', JSON.stringify(expenseCategories));
      localStorage.setItem('vfms_notifications', JSON.stringify(notifications));
      localStorage.setItem('vfms_visits', JSON.stringify(agentVisits));
      localStorage.setItem('vfms_settlements', JSON.stringify(settlements));
      localStorage.setItem('vfms_pin_reset_audits', JSON.stringify(pinResetAudits));
      localStorage.setItem('vfms_pin_approval_audits', JSON.stringify(pinApprovalAudits));
    }
  }, [customers, loans, schedules, payments, ledgers, collaterals, cashBooks, auditLogs, financeRules, guarantors, documents, expenses, expenseCategories, notifications, agentVisits, settlements, pinResetAudits, pinApprovalAudits, isFirestoreMode, isLoading]);

  // Manual Seeding & Wiping Operations
  const seedDatabase = async () => {
    setIsLoading(true);
    try {
      if (isFirestoreMode) {
        await setDoc(doc(db, 'financeRules', 'default-rule'), initialRules[0]);
        for (const u of initialUsers) {
          await setDoc(doc(db, 'users', u.uid), u);
        }
      }
    } catch (err) {
      // ignore / log silently in production
    } finally {
      setIsLoading(false);
    }
  };

  const wipeDatabase = async () => {
    setIsLoading(true);
    try {
      if (isFirestoreMode) {
        console.log("Wiping Firestore cloud documents...");
        for (const c of customers) {
          await deleteDoc(doc(db, 'customers', c.id));
        }
        for (const l of loans) {
          await deleteDoc(doc(db, 'loans', l.id));
          const subSch = schedules[l.id] || [];
          for (const s of subSch) {
            await deleteDoc(doc(db, 'loans', l.id, 'schedules', s.id));
          }
        }
        for (const p of payments) {
          await deleteDoc(doc(db, 'payments', p.id));
        }
        for (const led of ledgers) {
          await deleteDoc(doc(db, 'ledgers', led.id));
        }
        for (const exp of expenses) {
          await deleteDoc(doc(db, 'expenses', exp.id));
        }
        for (const cbRecord of cashBooks) {
          await deleteDoc(doc(db, 'cashBooks', cbRecord.id));
        }
        for (const v of agentVisits) {
          await deleteDoc(doc(db, 'visits', v.id));
        }
      }
      
      localStorage.clear();
      
      setCustomers([]);
      setLoans([]);
      setSchedules({});
      setPayments([]);
      setLedgers([]);
      setExpenses([]);
      setCashBooks([]);
      setAgentVisits([]);
      
      console.log("Database collections successfully wiped!");
    } catch (err) {
      console.error("Database collections wipe failed: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  // CUSTOMER OPERATIONS
  const addCustomer = async (cust: Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'companyId' | 'branchId'>) => {
    const id = `cust-${Date.now()}`;
    const newCustomer: Customer = {
      ...cust,
      id,
      companyId: defaultCompany.id,
      branchId: currentBranch.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (isFirestoreMode) {
      try {
        await setDoc(doc(db, 'customers', id), newCustomer);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `customers/${id}`);
      }
    } else {
      setCustomers(prev => [...prev, newCustomer]);
    }

    logAudit('CREATE_CUSTOMER', 'Customers', '', newCustomer.name, `Created profile for ${newCustomer.name}`);
    return id;
  };

  const updateCustomer = async (id: string, partialCust: Partial<Customer>) => {
    const target = customers.find(x => x.id === id);
    if (!target) return;

    const updated: Customer = {
      ...target,
      ...partialCust,
      updatedAt: new Date().toISOString()
    };

    if (isFirestoreMode) {
      try {
        await updateDoc(doc(db, 'customers', id), partialCust as any);
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `customers/${id}`);
      }
    } else {
      setCustomers(prev => prev.map(c => c.id === id ? updated : c));
    }

    logAudit('UPDATE_CUSTOMER', 'Customers', target.name, updated.name, `Updated customer metadata for ${updated.name}`);
  };

  const deleteCustomer = async (id: string) => {
    const target = customers.find(x => x.id === id);
    if (!target) return;

    if (isFirestoreMode) {
      try {
        const batch = writeBatch(db);

        // 1. Delete customer document
        batch.delete(doc(db, 'customers', id));

        // 2. Query and delete customer KYC documents
        const docSnap = await getDocs(query(collection(db, 'documents'), where('customerId', '==', id)));
        docSnap.forEach(d => {
          batch.delete(doc(db, 'documents', d.id));
        });

        // 3. Find and cascade delete all customer loans
        const loanSnap = await getDocs(query(collection(db, 'loans'), where('customerId', '==', id)));
        const loanIds: string[] = [];
        
        for (const lDoc of loanSnap.docs) {
          const loanId = lDoc.id;
          loanIds.push(loanId);

          // Delete loan document
          batch.delete(doc(db, 'loans', loanId));

          // Delete loan schedules
          const schedSnap = await getDocs(collection(db, 'loans', loanId, 'schedules'));
          schedSnap.forEach(s => {
            batch.delete(doc(db, 'loans', loanId, 'schedules', s.id));
          });

          // Delete payments linked to loan
          const paySnap = await getDocs(query(collection(db, 'payments'), where('loanId', '==', loanId)));
          paySnap.forEach(p => {
            batch.delete(doc(db, 'payments', p.id));
          });

          // Delete ledger entries linked to loan
          const ledSnap = await getDocs(query(collection(db, 'ledgers'), where('loanId', '==', loanId)));
          ledSnap.forEach(l => {
            batch.delete(doc(db, 'ledgers', l.id));
          });

          // Delete collateral linked to loan
          const colSnap = await getDocs(query(collection(db, 'collaterals'), where('loanId', '==', loanId)));
          colSnap.forEach(c => {
            batch.delete(doc(db, 'collaterals', c.id));
          });
        }

        // 4. Update or delete linked guarantors
        const guarSnap = await getDocs(collection(db, 'guarantors'));
        guarSnap.forEach(gDoc => {
          const gData = gDoc.data() as Guarantor;
          const remainingLoans = gData.loanIds.filter(lid => !loanIds.includes(lid));
          if (remainingLoans.length === 0) {
            batch.delete(doc(db, 'guarantors', gDoc.id));
          } else {
            batch.update(doc(db, 'guarantors', gDoc.id), { loanIds: remainingLoans });
          }
        });

        // Commit batch execution
        await batch.commit();

      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `customers/${id}`);
      }
    } else {
      // Sandbox mode: get all loan IDs to filter
      const customerLoans = loans.filter(l => l.customerId === id);
      const loanIds = customerLoans.map(l => l.id);

      setCustomers(prev => prev.filter(c => c.id !== id));
      setLoans(prev => prev.filter(l => l.customerId !== id));
      setSchedules(prev => {
        const next = { ...prev };
        loanIds.forEach(lid => {
          delete next[lid];
        });
        return next;
      });
      setPayments(prev => prev.filter(p => !loanIds.includes(p.loanId)));
      setLedgers(prev => prev.filter(l => !loanIds.includes(l.loanId)));
      setCollaterals(prev => prev.filter(c => !loanIds.includes(c.loanId)));
      setDocuments(prev => prev.filter(d => d.customerId !== id));
      setGuarantors(prev => prev.map(g => ({
        ...g,
        loanIds: g.loanIds.filter(lid => !loanIds.includes(lid))
      })).filter(g => g.loanIds.length > 0));
    }

    logAudit('DELETE_CUSTOMER', 'Customers', target.name, '', `Deleted customer profile and cascade-deleted all associated loans, payments, collaterals, and document records for ${target.name}`);
  };

  // LOAN OPERATIONS
  const createLoan = async (loanData: Omit<Loan, 'id' | 'loanNumber' | 'status' | 'formulaVersion' | 'companyId' | 'branchId' | 'createdAt' | 'updatedAt' | 'disbursedAmount'>) => {
    const id = `loan-${Date.now()}`;
    const numSeq = loans.length + 101;
    const loanNumber = `VY-LN-${numSeq}`;
    
    const processingFee = loanData.processingFee;
    const disbursedAmount = loanData.principal - processingFee;

    const newLoan: Loan = {
      ...loanData,
      id,
      loanNumber,
      disbursedAmount,
      status: 'Pending Approval',
      formulaVersion: '1.0',
      companyId: defaultCompany.id,
      branchId: currentBranch.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (isFirestoreMode) {
      try {
        await setDoc(doc(db, 'loans', id), newLoan);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `loans/${id}`);
      }
    } else {
      setLoans(prev => [...prev, newLoan]);
    }

    logAudit('CREATE_LOAN', 'Loans', '', loanNumber, `Created loan application of ${newLoan.principal} for ${newLoan.customerName}`);
    
    // Send notifications to Admin and Manager roles
    try {
      await addNotification(
        'New Loan Request',
        `Agent ${currentUser?.displayName || 'Loan Officer'} submitted loan application ${loanNumber} of ₹${newLoan.principal.toLocaleString()} for ${newLoan.customerName}.`,
        'Manager',
        'Loans',
        undefined,
        'medium'
      );
      await addNotification(
        'New Loan Request',
        `Agent ${currentUser?.displayName || 'Loan Officer'} submitted loan application ${loanNumber} of ₹${newLoan.principal.toLocaleString()} for ${newLoan.customerName}.`,
        'Super Admin',
        'Loans',
        undefined,
        'medium'
      );
    } catch (notifErr) {
      console.warn("Failed to create notifications for loan request:", notifErr);
    }

    return id;
  };

  const approveLoan = async (loanId: string, remarks = 'Approved') => {
    const loan = loans.find(x => x.id === loanId);
    if (!loan) return;

    const updated: Loan = {
      ...loan,
      status: 'Approved',
      remarks,
      updatedAt: new Date().toISOString()
    };

    if (isFirestoreMode) {
      try {
        await updateDoc(doc(db, 'loans', loanId), { status: 'Approved', remarks, updatedAt: new Date().toISOString() });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `loans/${loanId}`);
      }
    } else {
      setLoans(prev => prev.map(l => l.id === loanId ? updated : l));
    }

    logAudit('APPROVE_LOAN', 'Loans', 'Pending Approval', 'Approved', `Approved loan ${loan.loanNumber}. ${remarks}`);

    try {
      await addNotification(
        'Loan Request Approved',
        `Loan request ${loan.loanNumber} for ${loan.customerName} has been APPROVED. Next step is loan disbursement.`,
        'Loan Officer',
        'Loans',
        undefined,
        'high'
      );
    } catch (notifErr) {
      console.warn("Failed to create approved notification:", notifErr);
    }
  };

  const rejectLoan = async (loanId: string, remarks = 'Rejected') => {
    const loan = loans.find(x => x.id === loanId);
    if (!loan) return;

    const updated: Loan = {
      ...loan,
      status: 'Rejected',
      remarks,
      updatedAt: new Date().toISOString()
    };

    if (isFirestoreMode) {
      try {
        await updateDoc(doc(db, 'loans', loanId), { status: 'Rejected', remarks, updatedAt: new Date().toISOString() });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `loans/${loanId}`);
      }
    } else {
      setLoans(prev => prev.map(l => l.id === loanId ? updated : l));
    }

    logAudit('REJECT_LOAN', 'Loans', 'Pending Approval', 'Rejected', `Rejected loan ${loan.loanNumber}. ${remarks}`);

    try {
      await addNotification(
        'Loan Request Rejected',
        `Loan request ${loan.loanNumber} for ${loan.customerName} has been REJECTED. Remarks: ${remarks}`,
        'Loan Officer',
        'Loans',
        undefined,
        'high'
      );
    } catch (notifErr) {
      console.warn("Failed to create rejected notification:", notifErr);
    }
  };

  const disburseLoan = async (loanId: string) => {
    const loan = loans.find(x => x.id === loanId);
    if (!loan) return;

    // 1. Set status to Disbursed -> Active
    const updated: Loan = {
      ...loan,
      status: 'Active',
      updatedAt: new Date().toISOString()
    };

    // 2. Generate EMI Schedule
    const scheds = generateSchedule(updated);

    // 3. Create Ledger Entries (Disbursement + Processing Fee)
    const led1: LedgerEntry = {
      id: `led-${Date.now()}-1`,
      loanId,
      type: 'Disbursement',
      amount: loan.principal,
      description: `Disbursed principal of loan ${loan.loanNumber} to ${loan.customerName}`,
      companyId: defaultCompany.id,
      branchId: currentBranch.id,
      createdAt: new Date().toISOString()
    };

    const led2: LedgerEntry = {
      id: `led-${Date.now()}-2`,
      loanId,
      type: 'Processing Fee',
      amount: loan.processingFee,
      description: `Processing fee for loan ${loan.loanNumber}`,
      companyId: defaultCompany.id,
      branchId: currentBranch.id,
      createdAt: new Date().toISOString()
    };

    if (isFirestoreMode) {
      try {
        const batch = writeBatch(db);
        batch.update(doc(db, 'loans', loanId), { status: 'Active', updatedAt: new Date().toISOString() });
        
        // Write schedules
        scheds.forEach(s => {
          batch.set(doc(db, 'loans', loanId, 'schedules', s.id), s);
        });

        // Write ledger entries
        batch.set(doc(db, 'ledgers', led1.id), led1);
        batch.set(doc(db, 'ledgers', led2.id), led2);

        await batch.commit();
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `loans/${loanId}`);
      }
    } else {
      setLoans(prev => prev.map(l => l.id === loanId ? updated : l));
      setSchedules(prev => ({
        ...prev,
        [loanId]: scheds
      }));
      setLedgers(prev => [led1, led2, ...prev]);
    }

    logAudit('DISBURSE_LOAN', 'Loans', 'Approved', 'Active', `Disbursed loan ${loan.loanNumber} for customer ${loan.customerName}`);

    try {
      await addNotification(
        'Loan Disbursed & Active',
        `Loan ${loan.loanNumber} for ${loan.customerName} has been DISBURSED. It is now active and on the collections route.`,
        'Loan Officer',
        'Loans',
        undefined,
        'high'
      );
    } catch (notifErr) {
      console.warn("Failed to create disbursed notification:", notifErr);
    }
  };

  // REPAYMENT / PAYMENT OPERATIONS
  const submitPayment = async (paymentData: { loanId: string; amount: number; paymentMethod: string; receiptNumber: string }) => {
    const loan = loans.find(x => x.id === paymentData.loanId);
    if (!loan) return;

    // Load active schedule for this loan
    let activeScheds: LoanSchedule[] = [];
    if (isFirestoreMode) {
      try {
        const q = query(collection(db, 'loans', paymentData.loanId, 'schedules'));
        const snap = await getDocs(q);
        snap.forEach(d => activeScheds.push(d.data() as LoanSchedule));
        // sort by installment number
        activeScheds.sort((a, b) => a.installmentNumber - b.installmentNumber);
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, `loans/${paymentData.loanId}/schedules`);
      }
    } else {
      activeScheds = [...(schedules[paymentData.loanId] || [])];
    }

    if (activeScheds.length === 0) return;

    // Rule Allocation Priorities (Defaults)
    const rule = financeRules[0] || initialRules[0];
    const priority = Array.isArray(rule.allocationPriority) 
      ? rule.allocationPriority.join(' > ')
      : rule.allocationPriority; // e.g. "Penalty > Interest > Principal"


    let remAmount = paymentData.amount;
    let totalPrincipalPaid = 0;
    let totalInterestPaid = 0;
    let totalPenaltyPaid = 0;

    const updatedScheds = activeScheds.map(sched => {
      if (remAmount <= 0 || sched.status === 'Paid' || sched.status === 'Waived') {
        return sched;
      }

      const allocation = allocatePayment(remAmount, sched, priority);
      remAmount = allocation.remainingAmount;
      totalPrincipalPaid += allocation.principalPaid;
      totalInterestPaid += allocation.interestPaid;
      totalPenaltyPaid += allocation.penaltyPaid;

      return allocation.newSchedule;
    });

    // Check if entire loan is now completed and collateral returned
    const allPaid = updatedScheds.every(s => s.status === 'Paid' || s.status === 'Waived');
    const loanCollaterals = collaterals.filter(c => c.loanId === loan.id);
    const allCollateralReturned = loanCollaterals.every(c => c.status === 'Returned');
    const shouldCloseLoan = allPaid && allCollateralReturned;

    // Create payment entry
    const paymentId = `pay-${Date.now()}`;
    const pRecord: Payment = {
      id: paymentId,
      loanId: loan.id,
      loanNumber: loan.loanNumber,
      customerName: loan.customerName,
      amount: paymentData.amount,
      paymentMethod: paymentData.paymentMethod as PaymentMethod,
      principalPaid: Math.round(totalPrincipalPaid * 100) / 100,
      interestPaid: Math.round(totalInterestPaid * 100) / 100,
      penaltyPaid: Math.round(totalPenaltyPaid * 100) / 100,
      receiptNumber: paymentData.receiptNumber,
      collectorId: currentUser?.uid || 'demo-collector',
      collectorName: currentUser?.displayName || 'Demo Officer',
      paymentDate: new Date().toISOString().split('T')[0],
      companyId: defaultCompany.id,
      branchId: currentBranch.id
    };

    // Create ledger transaction for collection
    const led: LedgerEntry = {
      id: `led-${Date.now()}`,
      loanId: loan.id,
      paymentId: paymentId,
      type: 'Collection',
      amount: paymentData.amount,
      description: `Collection of ${paymentData.amount} (P:${pRecord.principalPaid} I:${pRecord.interestPaid} Pen:${pRecord.penaltyPaid}) on loan ${loan.loanNumber}`,
      companyId: defaultCompany.id,
      branchId: currentBranch.id,
      createdAt: new Date().toISOString()
    };

    if (isFirestoreMode) {
      try {
        const batch = writeBatch(db);
        
        // Update loan status if closed
        if (shouldCloseLoan) {
          batch.update(doc(db, 'loans', loan.id), { status: 'Closed', updatedAt: new Date().toISOString() });
        }

        // Update installment schedules
        updatedScheds.forEach(s => {
          batch.set(doc(db, 'loans', loan.id, 'schedules', s.id), s);
        });

        // Set payment transaction
        batch.set(doc(db, 'payments', paymentId), pRecord);
        batch.set(doc(db, 'ledgers', led.id), led);

        await batch.commit();
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `payments/${paymentId}`);
      }
    } else {
      if (shouldCloseLoan) {
        setLoans(prev => prev.map(l => l.id === loan.id ? { ...l, status: 'Closed', updatedAt: new Date().toISOString() } : l));
      }
      setSchedules(prev => ({
        ...prev,
        [loan.id]: updatedScheds
      }));
      setPayments(prev => [pRecord, ...prev]);
      setLedgers(prev => [led, ...prev]);
    }

    logAudit('COLLECT_PAYMENT', 'Collections', `Unpaid EMIs`, `Paid Amount: ${paymentData.amount}`, `Collection of EMI on Loan ${loan.loanNumber}. Receipt: ${paymentData.receiptNumber}`);
  };

  // WAIVE INSTALLMENT (Super Admin Action)
  const waiveInstallment = async (loanId: string, scheduleId: string, amount: number, reason: string) => {
    let schedsList: LoanSchedule[] = [];
    if (isFirestoreMode) {
      // Load schedules from firestore
      const snap = await getDocs(query(collection(db, 'loans', loanId, 'schedules')));
      snap.forEach(d => schedsList.push(d.data() as LoanSchedule));
    } else {
      schedsList = [...(schedules[loanId] || [])];
    }

    const updated = schedsList.map(s => {
      if (s.id === scheduleId) {
        // Reduce outstanding and adjust penalty/interest
        const diff = Math.min(amount, s.outstanding);
        const outstanding = Math.max(0, s.outstanding - diff);
        const status: ScheduleStatus = outstanding === 0 ? 'Waived' : s.status;
        return {
          ...s,
          outstanding,
          status
        };
      }
      return s;
    });

    const led: LedgerEntry = {
      id: `led-${Date.now()}`,
      loanId,
      type: 'Waiver',
      amount,
      description: `Waiver of ${amount} applied on schedule due to: ${reason}`,
      companyId: defaultCompany.id,
      branchId: currentBranch.id,
      createdAt: new Date().toISOString()
    };

    if (isFirestoreMode) {
      try {
        const batch = writeBatch(db);
        const schedTarget = updated.find(x => x.id === scheduleId);
        if (schedTarget) {
          batch.set(doc(db, 'loans', loanId, 'schedules', scheduleId), schedTarget);
        }
        batch.set(doc(db, 'ledgers', led.id), led);
        await batch.commit();
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `loans/${loanId}/schedules/${scheduleId}`);
      }
    } else {
      setSchedules(prev => ({
        ...prev,
        [loanId]: updated
      }));
      setLedgers(prev => [led, ...prev]);
    }

    logAudit('WAIVE_EMI', 'Finance Rules', `${amount} due`, `Waived`, `Waived installment component on loan ID ${loanId}: ${reason}`);
  };

  // WRITE OFF LOAN (Super Admin Action)
  const writeOffLoan = async (loanId: string, reason: string) => {
    const loan = loans.find(x => x.id === loanId);
    if (!loan) return;

    const updated: Loan = {
      ...loan,
      status: 'Written Off',
      remarks: `Written Off: ${reason}`,
      updatedAt: new Date().toISOString()
    };

    const led: LedgerEntry = {
      id: `led-${Date.now()}`,
      loanId,
      type: 'Write-off',
      amount: loan.principal, // write off remaining principal is captured
      description: `Written off entire outstanding balance of loan ${loan.loanNumber}. Reason: ${reason}`,
      companyId: defaultCompany.id,
      branchId: currentBranch.id,
      createdAt: new Date().toISOString()
    };

    if (isFirestoreMode) {
      try {
        const batch = writeBatch(db);
        batch.update(doc(db, 'loans', loanId), { status: 'Written Off', remarks: `Written Off: ${reason}`, updatedAt: new Date().toISOString() });
        batch.set(doc(db, 'ledgers', led.id), led);
        await batch.commit();
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `loans/${loanId}`);
      }
    } else {
      setLoans(prev => prev.map(l => l.id === loanId ? updated : l));
      setLedgers(prev => [led, ...prev]);
    }

    logAudit('WRITE_OFF_LOAN', 'Loans', loan.status, 'Written Off', `Loan ${loan.loanNumber} written off. Reason: ${reason}`);
  };

  // COLLATERAL OPERATIONS
  const addCollateral = async (coll: Omit<Collateral, 'id' | 'createdAt' | 'companyId' | 'branchId'>) => {
    const id = `col-${Date.now()}`;
    const loanTarget = loans.find(x => x.id === coll.loanId);
    
    const newColl: Collateral = {
      ...coll,
      id,
      loanNumber: loanTarget?.loanNumber || 'N/A',
      companyId: defaultCompany.id,
      branchId: currentBranch.id,
      createdAt: new Date().toISOString()
    };

    if (isFirestoreMode) {
      try {
        await setDoc(doc(db, 'collaterals', id), newColl);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `collaterals/${id}`);
      }
    } else {
      setCollaterals(prev => [...prev, newColl]);
    }

    logAudit('ADD_COLLATERAL', 'Collaterals', '', coll.type, `Added collateral ${coll.type} estimated at ${coll.estimatedValue} for loan ID ${coll.loanId}`);
  };

  const updateCollateralStatus = async (id: string, status: 'Deposited' | 'Returned' | 'Liquidated') => {
    const target = collaterals.find(x => x.id === id);
    if (!target) return;

    const updated: Collateral = {
      ...target,
      status
    };

    let nextCols = collaterals;
    if (isFirestoreMode) {
      try {
        await updateDoc(doc(db, 'collaterals', id), { status });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `collaterals/${id}`);
      }
    } else {
      setCollaterals(prev => {
        nextCols = prev.map(c => c.id === id ? updated : c);
        return nextCols;
      });
    }

    logAudit('UPDATE_COLLATERAL', 'Collaterals', target.status, status, `Updated collateral status of ${target.type} to ${status}`);
    
    // Auto-close check
    if (status === 'Returned') {
      const latestCols = isFirestoreMode ? collaterals.map(c => c.id === id ? updated : c) : nextCols;
      await checkLoanAutoCloseAfterCollateralUpdate(target.loanId, latestCols);
    }
  };

  const updateCollateral = async (id: string, partial: Partial<Collateral>) => {
    const target = collaterals.find(x => x.id === id);
    if (!target) return;

    const updated: Collateral = {
      ...target,
      ...partial
    };

    let nextCols = collaterals;
    if (isFirestoreMode) {
      try {
        await updateDoc(doc(db, 'collaterals', id), partial as any);
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `collaterals/${id}`);
      }
    } else {
      setCollaterals(prev => {
        nextCols = prev.map(c => c.id === id ? updated : c);
        return nextCols;
      });
    }

    logAudit('UPDATE_COLLATERAL', 'Collaterals', target.description, updated.description, `Updated collateral attributes for ID ${id}`);

    // Auto-close check
    if (partial.status === 'Returned') {
      const latestCols = isFirestoreMode ? collaterals.map(c => c.id === id ? updated : c) : nextCols;
      await checkLoanAutoCloseAfterCollateralUpdate(target.loanId, latestCols);
    }
  };

  const checkLoanAutoCloseAfterCollateralUpdate = async (loanId: string, updatedCols: Collateral[]) => {
    const targetCols = updatedCols.filter(c => c.loanId === loanId);
    const allCollateralReturned = targetCols.every(c => c.status === 'Returned');
    if (!allCollateralReturned) return;

    let schedsList: LoanSchedule[] = [];
    if (isFirestoreMode) {
      try {
        const snap = await getDocs(query(collection(db, 'loans', loanId, 'schedules')));
        snap.forEach(d => schedsList.push(d.data() as LoanSchedule));
      } catch (err) {
        console.error('Failed to load schedules for auto-close check:', err);
        return;
      }
    } else {
      schedsList = schedules[loanId] || [];
    }

    const allPaid = schedsList.length > 0 && schedsList.every(s => s.status === 'Paid' || s.status === 'Waived');
    if (allPaid) {
      if (isFirestoreMode) {
        try {
          await updateDoc(doc(db, 'loans', loanId), { status: 'Closed', updatedAt: new Date().toISOString() });
        } catch (err) {
          console.error('Failed to update loan status to Closed:', err);
        }
      } else {
        setLoans(prev => prev.map(l => l.id === loanId ? { ...l, status: 'Closed', updatedAt: new Date().toISOString() } : l));
      }
      logAudit('AUTO_CLOSE_LOAN', 'Loans', 'Active', 'Closed', `Loan ID ${loanId} automatically closed upon final collateral return.`);
    }
  };

  // CASH BOOK OPERATIONS (Daily Closing)
  const submitCashBookClosing = async (closingData: { collections: number; expenses: number; bankDeposit: number; variance: number; notes?: string }) => {
    const id = `cb-${Date.now()}`;
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Calculate opening cash from previous day's closing cash
    let prevClosing = 50000; // base opening cash default
    const closedBooksForBranch = cashBooks.filter(b => b.branchId === currentBranch.id && b.status === 'Closed');
    if (closedBooksForBranch.length > 0) {
      // sort by date desc
      closedBooksForBranch.sort((a, b) => b.date.localeCompare(a.date));
      prevClosing = closedBooksForBranch[0].closingCash;
    }

    const calculatedClosing = prevClosing + closingData.collections - closingData.expenses - closingData.bankDeposit;

    const newBook: CashBook = {
      id,
      date: todayStr,
      openingCash: prevClosing,
      collections: closingData.collections,
      expenses: closingData.expenses,
      cashReceived: 0,
      cashHandover: 0,
      bankDeposit: closingData.bankDeposit,
      closingCash: calculatedClosing,
      variance: closingData.variance,
      status: 'Pending Verification',
      companyId: defaultCompany.id,
      branchId: currentBranch.id
    };

    if (isFirestoreMode) {
      try {
        await setDoc(doc(db, 'cashBooks', id), newBook);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `cashBooks/${id}`);
      }
    } else {
      setCashBooks(prev => [newBook, ...prev]);
    }

    logAudit('CASHBOOK_CLOSE', 'Cash Book', 'Open', 'Pending Verification', `Submitted daily closing. Expected closing cash: ${calculatedClosing}, Variance: ${closingData.variance}`);
  };

  const verifyCashBook = async (id: string) => {
    const book = cashBooks.find(x => x.id === id);
    if (!book) return;

    const updated: CashBook = {
      ...book,
      status: 'Closed',
      managerId: currentUser?.uid || 'demo-manager',
      managerName: currentUser?.displayName || 'Branch Manager'
    };

    if (isFirestoreMode) {
      try {
        await updateDoc(doc(db, 'cashBooks', id), { 
          status: 'Closed', 
          managerId: currentUser?.uid || 'demo-manager',
          managerName: currentUser?.displayName || 'Branch Manager'
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `cashBooks/${id}`);
      }
    } else {
      setCashBooks(prev => prev.map(b => b.id === id ? updated : b));
    }

    logAudit('CASHBOOK_VERIFY', 'Cash Book', 'Pending Verification', 'Closed', `Manager verified and locked Cash Book for date: ${book.date}`);
  };

  // FINANCE RULE ENGINE
  const updateFinanceRules = async (rules: Partial<FinanceRule>) => {
    const target = financeRules[0] || initialRules[0];
    const newVersion = (parseFloat(target.version) + 0.1).toFixed(1);

    const updated: FinanceRule = {
      ...target,
      ...rules,
      version: newVersion,
      createdAt: new Date().toISOString()
    };

    if (isFirestoreMode) {
      try {
        await setDoc(doc(db, 'financeRules', target.id), updated);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `financeRules/${target.id}`);
      }
    } else {
      setFinanceRules([updated]);
    }

    logAudit('UPDATE_RULES', 'Finance Rules', `Version ${target.version}`, `Version ${newVersion}`, `Super Admin updated Finance Rule Engine coefficients.`);
  };

  // GUARANTOR OPERATIONS
  const addGuarantor = async (guar: Omit<Guarantor, 'id' | 'createdAt' | 'companyId' | 'branchId'>) => {
    const id = `guar-${Date.now()}`;
    const newGuar: Guarantor = {
      ...guar,
      id,
      companyId: defaultCompany.id,
      branchId: currentBranch.id,
      createdAt: new Date().toISOString()
    };

    if (isFirestoreMode) {
      try {
        await setDoc(doc(db, 'guarantors', id), newGuar);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `guarantors/${id}`);
      }
    } else {
      setGuarantors(prev => [...prev, newGuar]);
    }

    logAudit('ADD_GUARANTOR', 'Guarantors', '', guar.name, `Added guarantor ${guar.name} with National ID ${guar.nationalId}`);
  };

  const updateGuarantor = async (id: string, updatedFields: Partial<Guarantor>) => {
    const target = guarantors.find(x => x.id === id);
    if (!target) return;

    const updated: Guarantor = {
      ...target,
      ...updatedFields
    };

    if (isFirestoreMode) {
      try {
        await updateDoc(doc(db, 'guarantors', id), updatedFields);
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `guarantors/${id}`);
      }
    } else {
      setGuarantors(prev => prev.map(g => g.id === id ? updated : g));
    }

    logAudit('UPDATE_GUARANTOR', 'Guarantors', target.name, updated.name, `Updated details of guarantor ${target.name}`);
  };

  const deleteGuarantor = async (id: string) => {
    const target = guarantors.find(x => x.id === id);
    if (!target) return;

    if (isFirestoreMode) {
      try {
        await deleteDoc(doc(db, 'guarantors', id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `guarantors/${id}`);
      }
    } else {
      setGuarantors(prev => prev.filter(g => g.id !== id));
    }

    logAudit('DELETE_GUARANTOR', 'Guarantors', target.name, '', `Deleted guarantor ${target.name}`);
  };

  const uploadDocument = async (
    docData: Omit<CustomerDocument, 'id' | 'storageMode' | 'uploadedBy' | 'uploadedAt' | 'companyId' | 'branchId' | 'status' | 'version' | 'verificationStatus' | 'isEncrypted'>,
    options?: { previousDocumentId?: string }
  ) => {
    const id = `doc-${Date.now()}`;
    const storageMode = isFirestoreMode ? 'FIREBASE' : 'LOCAL';
    const storagePath = storageMode === 'FIREBASE' ? `documents/${docData.customerId}/${docData.fileName}` : undefined;

    // Versioning logic
    let version = 1;
    let prevDocId = options?.previousDocumentId;
    
    // Find active documents of the same type for this customer to replace
    const activeSameType = documents.find(d => d.customerId === docData.customerId && d.documentType === docData.documentType && d.status === 'ACTIVE');
    if (activeSameType) {
      prevDocId = activeSameType.id;
      // Archive old document
      await archiveDocument(activeSameType.id);
      // Find all versions to compute next version
      const allSameTypeVersions = documents.filter(d => d.customerId === docData.customerId && d.documentType === docData.documentType);
      const maxVersion = allSameTypeVersions.reduce((max, d) => d.version > max ? d.version : max, 0);
      version = maxVersion + 1;
    }

    const newDoc: CustomerDocument = {
      ...docData,
      id,
      storageMode,
      storagePath,
      uploadedBy: currentUser?.displayName || 'System',
      uploadedAt: new Date().toISOString(),
      status: 'ACTIVE',
      version,
      previousDocumentId: prevDocId,
      verificationStatus: 'PENDING',
      isEncrypted: false,
      companyId: defaultCompany.id,
      branchId: currentBranch.id
    };

    if (isFirestoreMode) {
      try {
        await setDoc(doc(db, 'documents', id), newDoc);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `documents/${id}`);
      }
    } else {
      setDocuments(prev => [...prev, newDoc]);
    }

    logAudit(
      'DOCUMENT_UPLOADED',
      'Documents',
      '',
      newDoc.fileName,
      `Uploaded ${newDoc.documentType} document: ${newDoc.fileName} (${(newDoc.size / (1024 * 1024)).toFixed(2)} MB), checksum SHA-256: ${newDoc.checksum.substring(0, 8)}... stored on ${newDoc.storageMode}`
    );
  };

  const verifyDocument = async (id: string, status: 'VERIFIED' | 'REJECTED' | 'EXPIRED', remarks?: string) => {
    const target = documents.find(d => d.id === id);
    if (!target) return;

    const partialFields: Partial<CustomerDocument> = {
      verificationStatus: status,
      verifiedBy: currentUser?.displayName || 'System',
      verifiedAt: new Date().toISOString(),
      verificationRemarks: remarks || ''
    };

    const updated: CustomerDocument = {
      ...target,
      ...partialFields
    };

    if (isFirestoreMode) {
      try {
        await updateDoc(doc(db, 'documents', id), partialFields as any);
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `documents/${id}`);
      }
    } else {
      setDocuments(prev => prev.map(d => d.id === id ? updated : d));
    }

    logAudit(
      'DOCUMENT_VERIFIED',
      'Documents',
      target.verificationStatus,
      status,
      `Document verification status updated for ${target.fileName} to ${status} by ${updated.verifiedBy}`
    );
  };

  const archiveDocument = async (id: string) => {
    const target = documents.find(d => d.id === id);
    if (!target) return;

    const partialFields: Partial<CustomerDocument> = {
      status: 'ARCHIVED'
    };

    const updated: CustomerDocument = {
      ...target,
      ...partialFields
    };

    if (isFirestoreMode) {
      try {
        await updateDoc(doc(db, 'documents', id), partialFields as any);
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `documents/${id}`);
      }
    } else {
      setDocuments(prev => prev.map(d => d.id === id ? updated : d));
    }

    logAudit(
      'DOCUMENT_ARCHIVED',
      'Documents',
      'ACTIVE',
      'ARCHIVED',
      `Archived document ${target.fileName} (Type: ${target.documentType}, Version: ${target.version})`
    );
  };

  const registerNewUser = async (
    displayName: string, 
    email: string, 
    password?: string, 
    role: UserRole = 'Loan Officer', 
    branchId: string = defaultBranches[0].id
  ) => {
    if (isFirestoreMode) {
      if (!password) {
        throw new Error("Password is required for registration in online database mode.");
      }
      
      const tempAppName = `tempRegister-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const tempApp = initializeApp(firebaseConfig, tempAppName);
      const tempAuth = getAuth(tempApp);
      
      try {
        const userCredential = await createUserWithEmailAndPassword(tempAuth, email, password);
        const uid = userCredential.user.uid;
        
        const profile: UserProfile = {
          uid,
          displayName,
          email,
          role,
          branchId,
          companyId: defaultCompany.id,
          createdAt: new Date().toISOString()
        };
        
        await setDoc(doc(db, 'users', uid), profile);
        await logAudit('CREATE_USER_PROFILE', 'Security', '', email, `Created user profile for ${displayName} (${role})`);
      } catch (err: any) {
        throw new Error(err?.message || "Failed to create user in authentication database.");
      } finally {
        await deleteApp(tempApp);
      }
    } else {
      const uid = `user-${Date.now()}`;
      const profile: UserProfile = {
        uid,
        displayName,
        email,
        role,
        branchId,
        companyId: defaultCompany.id,
        createdAt: new Date().toISOString(),
        password: password || '123456'
      };
      
      const updated = [...userProfiles, profile];
      setUserProfiles(updated);
      localStorage.setItem('vfms_user_profiles', JSON.stringify(updated));
      await logAudit('CREATE_USER_PROFILE', 'Security', '', email, `Created sandbox user profile for ${displayName} (${role})`);
    }
  };

  // EXPENSE OPERATIONS
  const addExpense = async (expData: Omit<Expense, 'id' | 'createdAt' | 'status' | 'agentId' | 'agentName' | 'companyId' | 'branchId'>) => {
    const id = `exp-${Date.now()}`;
    const newExpense: Expense = {
      ...expData,
      id,
      agentId: currentUser?.uid || 'demo-agent',
      agentName: currentUser?.displayName || 'Loan Agent',
      status: 'Pending',
      companyId: defaultCompany.id,
      branchId: currentBranch.id,
      createdAt: new Date().toISOString()
    };

    if (isFirestoreMode) {
      try {
        await setDoc(doc(db, 'expenses', id), newExpense);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `expenses/${id}`);
      }
    } else {
      setExpenses(prev => [...prev, newExpense]);
    }

    logAudit('SUBMIT_EXPENSE', 'Expenses', '', newExpense.amount.toString(), `Agent submitted expense claim for ${newExpense.type} of ₹${newExpense.amount}`);
  };

  const approveExpense = async (id: string) => {
    const exp = expenses.find(x => x.id === id);
    if (!exp) return;

    const updated: Expense = {
      ...exp,
      status: 'Approved',
      approvedBy: currentUser?.uid || 'demo-manager',
      approvedByName: currentUser?.displayName || 'Branch Manager',
      approvedAt: new Date().toISOString()
    };

    if (isFirestoreMode) {
      try {
        await setDoc(doc(db, 'expenses', id), updated);
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `expenses/${id}`);
      }
    } else {
      setExpenses(prev => prev.map(e => e.id === id ? updated : e));
    }

    logAudit('APPROVE_EXPENSE', 'Expenses', 'Pending', 'Approved', `Manager approved expense ID ${id} of ₹${exp.amount}`);
  };

  const rejectExpense = async (id: string, reason: string) => {
    const exp = expenses.find(x => x.id === id);
    if (!exp) return;

    const updated: Expense = {
      ...exp,
      status: 'Rejected',
      approvedBy: currentUser?.uid || 'demo-manager',
      approvedByName: currentUser?.displayName || 'Branch Manager',
      approvedAt: new Date().toISOString(),
      description: `${exp.description} (Rejected: ${reason})`
    };

    if (isFirestoreMode) {
      try {
        await setDoc(doc(db, 'expenses', id), updated);
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `expenses/${id}`);
      }
    } else {
      setExpenses(prev => prev.map(e => e.id === id ? updated : e));
    }

    logAudit('REJECT_EXPENSE', 'Expenses', 'Pending', 'Rejected', `Manager rejected expense ID ${id} of ₹${exp.amount}. Reason: ${reason}`);
  };

  const addExpenseCategory = async (catData: Omit<ExpenseCategory, 'id' | 'companyId' | 'branchId' | 'createdAt'>) => {
    const id = `cat-${Date.now()}`;
    const newCat: ExpenseCategory = {
      ...catData,
      id,
      companyId: defaultCompany.id,
      branchId: currentBranch.id,
      createdAt: new Date().toISOString()
    };

    if (isFirestoreMode) {
      try {
        await setDoc(doc(db, 'expenseCategories', id), newCat);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `expenseCategories/${id}`);
      }
    } else {
      setExpenseCategories(prev => [...prev, newCat]);
    }
    logAudit('CREATE_EXPENSE_CATEGORY', 'Expenses', '', newCat.name, `Admin created expense category ${newCat.name} with amount ₹${newCat.amount}`);
  };

  const deleteExpenseCategory = async (id: string) => {
    if (isFirestoreMode) {
      try {
        await deleteDoc(doc(db, 'expenseCategories', id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `expenseCategories/${id}`);
      }
    } else {
      setExpenseCategories(prev => prev.filter(c => c.id !== id));
    }
    logAudit('DELETE_EXPENSE_CATEGORY', 'Expenses', id, '', `Admin deleted expense category ${id}`);
  };

  // NOTIFICATION OPERATIONS
  const addNotification = async (
    title: string, 
    message: string, 
    recipientRole: UserRole | 'all', 
    category: 'Collections' | 'Loans' | 'Expenses' | 'Cash' | 'System',
    recipientId?: string, 
    priority: 'low' | 'medium' | 'high' = 'medium'
  ) => {
    const id = `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newNotif: Notification = {
      id,
      recipientRole,
      recipientId,
      title,
      message,
      read: false,
      priority,
      category,
      createdAt: new Date().toISOString()
    };

    if (isFirestoreMode) {
      try {
        await setDoc(doc(db, 'notifications', id), newNotif);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `notifications/${id}`);
      }
    } else {
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  const markNotificationAsRead = async (id: string) => {
    const notif = notifications.find(x => x.id === id);
    if (!notif) return;

    if (isFirestoreMode) {
      try {
        await updateDoc(doc(db, 'notifications', id), { read: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `notifications/${id}`);
      }
    } else {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    }
  };

  // AGENT ROUTE OPERATIONS
  const createAgentRoute = async (agentId: string, date: string, visitsData: Omit<AgentVisit, 'id' | 'createdAt' | 'companyId' | 'branchId'>[]) => {
    const batchList: AgentVisit[] = visitsData.map((v, index) => ({
      ...v,
      id: `visit-${Date.now()}-${index}`,
      companyId: defaultCompany.id,
      branchId: currentBranch.id,
      createdAt: new Date().toISOString()
    }));

    if (isFirestoreMode) {
      try {
        const batch = writeBatch(db);
        batchList.forEach(v => {
          batch.set(doc(db, 'agentVisits', v.id), v);
        });
        await batch.commit();
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `agentVisits-batch`);
      }
    } else {
      setAgentVisits(prev => [...prev, ...batchList]);
    }

    logAudit('CREATE_ROUTE', 'Routes', '', agentId, `Created collection route for agent ID ${agentId} on date ${date}`);
  };

  const updateVisitStatus = async (visitId: string, status: AgentVisit['status'], notes?: string) => {
    const visit = agentVisits.find(x => x.id === visitId);
    if (!visit) return;

    const updated = { ...visit, status, notes };

    if (isFirestoreMode) {
      try {
        await setDoc(doc(db, 'agentVisits', visitId), updated);
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `agentVisits/${visitId}`);
      }
    } else {
      setAgentVisits(prev => prev.map(v => v.id === visitId ? updated : v));
    }

    logAudit('UPDATE_VISIT_STATUS', 'Routes', visit.status, status, `Updated visit status for customer ${visit.customerName} to ${status}`);
  };

  // LOAN SETTLEMENT OPERATIONS
  const requestSettlement = async (loanId: string, discount: number, notes?: string) => {
    const id = `set-${Date.now()}`;
    const loan = loans.find(l => l.id === loanId);
    if (!loan) return;

    const paymentsForLoan = payments.filter(p => p.loanId === loanId);
    const totalPaid = paymentsForLoan.reduce((sum, p) => sum + p.amount, 0);
    const bookAmt = loan.loanBookAmount || loan.principal;
    const remainingAmt = Math.max(0, bookAmt - totalPaid);
    const settlementAmt = Math.max(0, remainingAmt - discount);

    const newSettlement: LoanSettlement = {
      id,
      loanId,
      requestedBy: currentUser?.displayName || 'Loan Officer',
      discountAmount: discount,
      settlementAmount: settlementAmt,
      notes,
      status: 'Pending Approval',
      createdAt: new Date().toISOString()
    };

    if (isFirestoreMode) {
      try {
        await setDoc(doc(db, 'settlements', id), newSettlement);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `settlements/${id}`);
      }
    } else {
      setSettlements(prev => [...prev, newSettlement]);
    }

    logAudit('REQUEST_SETTLEMENT', 'Loans', '', loanId, `Requested settlement on loan ${loan.loanNumber}. Discount: ₹${discount}, Net payout: ₹${settlementAmt}`);
  };

  const approveSettlement = async (id: string) => {
    const set = settlements.find(x => x.id === id);
    if (!set) return;

    const updated: LoanSettlement = {
      ...set,
      status: 'Approved',
      approvedBy: currentUser?.displayName || 'Branch Manager',
      approvedAt: new Date().toISOString()
    };

    if (isFirestoreMode) {
      try {
        await setDoc(doc(db, 'settlements', id), updated);
        await updateDoc(doc(db, 'loans', set.loanId), { status: 'Closed', updatedAt: new Date().toISOString() });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `settlements/${id}`);
      }
    } else {
      setSettlements(prev => prev.map(s => s.id === id ? updated : s));
      setLoans(prev => prev.map(l => l.id === set.loanId ? { ...l, status: 'Closed', updatedAt: new Date().toISOString() } : l));
    }

    logAudit('APPROVE_SETTLEMENT', 'Loans', 'Pending Approval', 'Approved', `Approved settlement ID ${id} and closed linked loan.`);
  };

  const rejectSettlement = async (id: string) => {
    const set = settlements.find(x => x.id === id);
    if (!set) return;

    const updated: LoanSettlement = {
      ...set,
      status: 'Rejected',
      approvedBy: currentUser?.displayName || 'Branch Manager',
      approvedAt: new Date().toISOString()
    };

    if (isFirestoreMode) {
      try {
        await setDoc(doc(db, 'settlements', id), updated);
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `settlements/${id}`);
      }
    } else {
      setSettlements(prev => prev.map(s => s.id === id ? updated : s));
    }

    logAudit('REJECT_SETTLEMENT', 'Loans', 'Pending Approval', 'Rejected', `Rejected settlement ID ${id}.`);
  };

  return (
    <VFMSContext.Provider value={{
      currentUser,
      currentCompany: defaultCompany,
      currentBranch,
      userRole,
      isFirestoreMode,
      isLoading,
      companies,
      branches,
      customers,
      loans,
      schedules,
      payments,
      ledgers,
      collaterals,
      cashBooks,
      auditLogs,
      financeRules,
      userProfiles,
      guarantors,
      documents,
      expenses,
      notifications,
      agentVisits,
      settlements,
      pinResetAudits,
      expenseCategories,
      dashboardAction,
      setDashboardAction,
      selectedLoanIdForCollection,
      setSelectedLoanIdForCollection,
      selectedCustomerIdForNewLoan,
      setSelectedCustomerIdForNewLoan,
      switchRole,
      switchBranch,
      toggleStorageMode,
      login,
      logout,
      updateUserAccess,
      addCustomer,
      updateCustomer,
      deleteCustomer,
      createLoan,
      approveLoan,
      rejectLoan,
      disburseLoan,
      submitPayment,
      waiveInstallment,
      writeOffLoan,
      addCollateral,
      updateCollateralStatus,
      updateCollateral,
      submitCashBookClosing,
      verifyCashBook,
      updateFinanceRules,
      addGuarantor,
      updateGuarantor,
      deleteGuarantor,
      uploadDocument,
      verifyDocument,
      archiveDocument,
      addExpense,
      approveExpense,
      rejectExpense,
      addExpenseCategory,
      deleteExpenseCategory,
      addNotification,
      markNotificationAsRead,
      createAgentRoute,
      updateVisitStatus,
      requestSettlement,
      approveSettlement,
      rejectSettlement,
      isAppLocked,
      lockApp,
      unlockApp,
      approvalPin,
      updateApprovalPin,
      setupUserApprovalPin,
      changeUserApprovalPin,
      forgotApprovalPinRequestOTP,
      verifyOTPAndResetPin,
      adminResetUserPin,
      securityPolicy,
      updateSecurityPolicy,
      logAudit,
      registerNewUser,
      wipeDatabase,
      seedDatabase,
      pinApprovalAudits,
      activeApprovalRequest,
      setActiveApprovalRequest,
      approvalSessionActiveUntil,
      requestSupervisorApproval,
      verifySupervisorPinSecure,
      toggleUserPinDisabled,
      updateUserProfileFields,
      updateAdminCredentials,
      addBranch,
      deleteBranch,
      isSystemInitialized,
      initializeSystem
    }}>
      {children}
    </VFMSContext.Provider>
  );
};

export const useVFMS = () => {
  const context = useContext(VFMSContext);
  if (context === undefined) {
    throw new Error('useVFMS must be used within a VFMSProvider');
  }
  return context;
};
