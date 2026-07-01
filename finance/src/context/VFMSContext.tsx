import React, { createContext, useContext, useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { 
  UserProfile, Customer, Loan, LoanSchedule, Payment, 
  LedgerEntry, Collateral, CashBook, AuditLog, FinanceRule, 
  Company, Branch, UserRole, ScheduleStatus, PaymentMethod,
  SecurityPolicy, Guarantor, CustomerDocument, DocumentType
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
  
  // Actions
  switchRole: (role: UserRole) => void;
  switchBranch: (branchId: string) => void;
  toggleStorageMode: () => void;
  login: (profile: UserProfile) => void;
  logout: () => Promise<void>;
  updateUserAccess: (uid: string, role: UserRole, branchId: string) => Promise<void>;
  
  // Entity Operations
  addCustomer: (cust: Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'companyId' | 'branchId'>) => Promise<void>;
  updateCustomer: (id: string, cust: Partial<Customer>) => Promise<void>;
  createLoan: (loanData: Omit<Loan, 'id' | 'loanNumber' | 'status' | 'formulaVersion' | 'companyId' | 'branchId' | 'createdAt' | 'updatedAt' | 'disbursedAmount'>) => Promise<string>;
  approveLoan: (loanId: string, remarks?: string) => Promise<void>;
  rejectLoan: (loanId: string, remarks?: string) => Promise<void>;
  disburseLoan: (loanId: string) => Promise<void>;
  submitPayment: (paymentData: { loanId: string; amount: number; paymentMethod: string; receiptNumber: string }) => Promise<void>;
  waiveInstallment: (loanId: string, scheduleId: string, amount: number, reason: string) => Promise<void>;
  writeOffLoan: (loanId: string, reason: string) => Promise<void>;
  addCollateral: (collateral: Omit<Collateral, 'id' | 'createdAt' | 'companyId' | 'branchId'>) => Promise<void>;
  updateCollateralStatus: (id: string, status: 'Deposited' | 'Returned' | 'Liquidated') => Promise<void>;
  submitCashBookClosing: (closingData: { collections: number; expenses: number; bankDeposit: number; variance: number; notes?: string }) => Promise<void>;
  verifyCashBook: (id: string) => Promise<void>;
  updateFinanceRules: (rules: Partial<FinanceRule>) => Promise<void>;
  addGuarantor: (guar: Omit<Guarantor, 'id' | 'createdAt' | 'companyId' | 'branchId'>) => Promise<void>;
  updateGuarantor: (id: string, updated: Partial<Guarantor>) => Promise<void>;
  deleteGuarantor: (id: string) => Promise<void>;
  uploadDocument: (docData: Omit<CustomerDocument, 'id' | 'storageMode' | 'uploadedBy' | 'uploadedAt' | 'companyId' | 'branchId' | 'status' | 'version' | 'verificationStatus' | 'isEncrypted'>, options?: { previousDocumentId?: string }) => Promise<void>;
  verifyDocument: (id: string, status: 'VERIFIED' | 'REJECTED' | 'EXPIRED', remarks?: string) => Promise<void>;
  archiveDocument: (id: string) => Promise<void>;

  // Security properties
  isAppLocked: boolean;
  lockApp: () => void;
  unlockApp: (pin: string) => boolean;
  approvalPin: string;
  updateApprovalPin: (newPin: string) => void;
  securityPolicy: SecurityPolicy;
  updateSecurityPolicy: (policy: Partial<SecurityPolicy>) => void;
  logAudit: (action: string, module: string, oldVal: string, newVal: string, reason?: string) => Promise<void>;
}

const VFMSContext = createContext<VFMSContextType | undefined>(undefined);

// Core default company & branch structures
const defaultCompany: Company = {
  id: 'vgot-you-finance',
  name: 'VGot You Finance Ltd',
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
    newValue: 'VGot You Finance Platform clean instance booted successfully.', 
    companyId: 'vgot-you-finance', 
    branchId: 'main-branch', 
    createdAt: new Date().toISOString() 
  }
];

const initialUsers: UserProfile[] = [
  {
    uid: 'admin-1',
    displayName: 'VGot You Super Admin',
    email: 'admin@vfms.com',
    role: 'Super Admin',
    branchId: 'main-branch',
    companyId: 'vgot-you-finance',
    createdAt: new Date().toISOString()
  }
];

export const VFMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use client-only storage toggled by UI if preferred (to prevent any permission locks initially)
  const [isFirestoreMode, setIsFirestoreMode] = useState<boolean>(() => {
    try {
      const mode = localStorage.getItem('vfms_firestore_mode');
      return mode !== 'false'; // Default is true (Live Firestore Mode) for client production deployment
    } catch {
      return true;
    }
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
      domIntegrityCheck: false
    };
  });

  const lockApp = () => {
    setIsAppLocked(true);
    logAudit('SESSION_LOCK', 'Security', 'Unlocked', 'Locked', 'System manually locked by operator.');
  };

  const unlockApp = (pin: string) => {
    if (pin === approvalPin) {
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

  const updateSecurityPolicy = (policy: Partial<SecurityPolicy>) => {
    const updated = { ...securityPolicy, ...policy };
    setSecurityPolicy(updated);
    localStorage.setItem('vfms_security_policy', JSON.stringify(updated));
    logAudit('UPDATE_POLICY', 'Security', 'Policy Update', Object.keys(policy).join(', '), `Security compliance policies updated: ${Object.keys(policy).map(k => `${k}=${(policy as any)[k]}`).join(', ')}`);
  };

  // Storage entities (Synced with Firestore in Firestore mode, or localStorage in sandbox mode)
  const [companies] = useState<Company[]>([defaultCompany]);
  const [branches] = useState<Branch[]>(defaultBranches);
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

  // Toggle mode
  const toggleStorageMode = () => {
    const newMode = !isFirestoreMode;
    setIsFirestoreMode(newMode);
    localStorage.setItem('vfms_firestore_mode', String(newMode));
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

      if (!isFirestoreMode) {
        const isCleaned = localStorage.getItem('vfms_clean_reset_v4');
        if (!isCleaned) {
          localStorage.removeItem('vfms_customers');
          localStorage.removeItem('vfms_loans');
          localStorage.removeItem('vfms_schedules');
          localStorage.removeItem('vfms_payments');
          localStorage.removeItem('vfms_ledgers');
          localStorage.removeItem('vfms_collaterals');
          localStorage.removeItem('vfms_cashbooks');
          localStorage.removeItem('vfms_audit_logs');
          localStorage.removeItem('vfms_rules');
          localStorage.removeItem('vfms_user_profiles');
          localStorage.removeItem('vfms_logged_in_user');
          localStorage.setItem('vfms_clean_reset_v4', 'true');
        }
      }
      
      // 1. Set up initial user model and profiles list listener
      let unsubUsers: (() => void) | undefined = undefined;

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
                const usersSnap = await getDocs(collection(db, 'users'));
                const isFirst = usersSnap.empty;
                const profile: UserProfile = {
                  uid: user.uid,
                  displayName: user.displayName || user.email?.split('@')[0] || 'Google User',
                  email: user.email || '',
                  role: isFirst ? 'Super Admin' : 'Loan Officer',
                  branchId: defaultBranches[0].id,
                  companyId: defaultCompany.id,
                  createdAt: new Date().toISOString()
                };
                await setDoc(userRef, profile);
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

        if (localCust && localLoans) {
          setCustomers(JSON.parse(localCust));
          setLoans(JSON.parse(localLoans));
          setSchedules(JSON.parse(localSchedules || '{}'));
          setPayments(JSON.parse(localPayments || '[]'));
          setLedgers(JSON.parse(localLedgers || '[]'));
          setCollaterals(JSON.parse(localCollaterals || '[]'));
          setCashBooks(JSON.parse(localCash || '[]'));
          setAuditLogs(JSON.parse(localAudits || '[]'));
          setFinanceRules(JSON.parse(localRules || '[]'));
          setGuarantors(JSON.parse(localGuar || '[]'));
          setDocuments(JSON.parse(localDocs || '[]'));
        } else {
          // SEED SANDBOX DATA
          setCustomers(initialCustomers);
          setLoans(initialLoans);
          setSchedules(initialSchedules);
          setPayments(initialPayments);
          setLedgers(initialLedgers);
          setCollaterals(initialCollaterals);
          setCashBooks(initialCashBooks);
          setAuditLogs(initialAuditLogs);
          setFinanceRules(initialRules);
          setGuarantors([]);
          setDocuments([]);
          
          // Store
          localStorage.setItem('vfms_customers', JSON.stringify(initialCustomers));
          localStorage.setItem('vfms_loans', JSON.stringify(initialLoans));
          localStorage.setItem('vfms_schedules', JSON.stringify(initialSchedules));
          localStorage.setItem('vfms_payments', JSON.stringify(initialPayments));
          localStorage.setItem('vfms_ledgers', JSON.stringify(initialLedgers));
          localStorage.setItem('vfms_collaterals', JSON.stringify(initialCollaterals));
          localStorage.setItem('vfms_cashbooks', JSON.stringify(initialCashBooks));
          localStorage.setItem('vfms_audit_logs', JSON.stringify(initialAuditLogs));
          localStorage.setItem('vfms_rules', JSON.stringify(initialRules));
          localStorage.setItem('vfms_guarantors', JSON.stringify([]));
          localStorage.setItem('vfms_documents', JSON.stringify([]));
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

          setIsLoading(false);
          return () => {
            unsubAuth(); unsubCust(); unsubLoans(); unsubPayments();
            unsubLedgers(); unsubCollaterals(); unsubCash(); unsubAudits(); unsubRules(); unsubGuar(); unsubDocs();
            if (unsubUsers) unsubUsers();
          };
        } catch (e) {
          console.error("Firestore loading error, dropping back to demo mode:", e);
          setIsFirestoreMode(false);
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
    }
  }, [customers, loans, schedules, payments, ledgers, collaterals, cashBooks, auditLogs, financeRules, guarantors, documents, isFirestoreMode, isLoading]);

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

    // Check if entire loan is now completed
    const allPaid = updatedScheds.every(s => s.status === 'Paid' || s.status === 'Waived');
    const finalLoanStatus = allPaid ? 'Closed' : loan.status;

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
        if (allPaid) {
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
      if (allPaid) {
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

    if (isFirestoreMode) {
      try {
        await updateDoc(doc(db, 'collaterals', id), { status });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `collaterals/${id}`);
      }
    } else {
      setCollaterals(prev => prev.map(c => c.id === id ? updated : c));
    }

    logAudit('UPDATE_COLLATERAL', 'Collaterals', target.status, status, `Updated collateral status of ${target.type} to ${status}`);
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
      switchRole,
      switchBranch,
      toggleStorageMode,
      login,
      logout,
      updateUserAccess,
      addCustomer,
      updateCustomer,
      createLoan,
      approveLoan,
      rejectLoan,
      disburseLoan,
      submitPayment,
      waiveInstallment,
      writeOffLoan,
      addCollateral,
      updateCollateralStatus,
      submitCashBookClosing,
      verifyCashBook,
      updateFinanceRules,
      addGuarantor,
      updateGuarantor,
      deleteGuarantor,
      uploadDocument,
      verifyDocument,
      archiveDocument,
      isAppLocked,
      lockApp,
      unlockApp,
      approvalPin,
      updateApprovalPin,
      securityPolicy,
      updateSecurityPolicy,
      logAudit
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
