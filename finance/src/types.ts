export type UserRole = 'Super Admin' | 'Manager' | 'Loan Officer' | 'Accountant' | 'Auditor';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: UserRole;
  branchId: string;
  companyId: string;
  createdAt: string;
  password?: string;
  phone?: string;
  approvalPin?: string;
  approvalPinLastChanged?: string;
  approvalPinLastChangedBy?: string;
  approvalPinResetRequired?: boolean;
  pinDisabled?: boolean;
  failedPinAttempts?: number;
  lockedUntil?: string;
  lastFailedAttempt?: string;
}

export interface PinResetAudit {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  action: 'Created' | 'Changed' | 'Reset';
  method: 'Direct' | 'OTP-Mobile' | 'OTP-Email' | 'Admin-Reset';
  updatedBy: string;
  createdAt: string;
  device: string;
  ipAddress: string;
  companyId: string;
}

export interface PinApprovalAudit {
  id: string;
  createdAt: string;
  actionId: string;
  action: string;
  module: string;
  approvedBy: string;
  approverRole: 'Super Admin' | 'Manager';
  requestedBy: string;
  requesterRole: string;
  branchId: string;
  branchName: string;
  companyId: string;
  status: 'Success' | 'Failed';
  device: string;
  browser: string;
  ipAddress: string;
  approvalMethod: 'PIN';
  remarks?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
  income: number;
  aadhaar: string;
  pan: string;
  references: string; // Nominees or contact references
  nominee: string;
  status: 'Active' | 'Inactive' | 'Blacklisted';
  riskCategory: 'Low' | 'Medium' | 'High';
  notes?: string;
  photo?: string; // Base64
  area?: string;
  village?: string;
  companyId: string;
  branchId: string;
  createdAt: string;
  updatedAt: string;
}

export type InterestType = 'Flat' | 'Reducing' | 'Simple' | 'Compound';
export type CollectionFrequency = 'Daily' | 'Weekly' | 'Bi-Weekly' | 'Monthly' | 'Quarterly';

export type LoanStatus =
  | 'Draft'
  | 'Pending Approval'
  | 'Approved'
  | 'Disbursed'
  | 'Active'
  | 'Overdue'
  | 'Closed'
  | 'Rejected'
  | 'Written Off';

export interface Loan {
  id: string;
  customerId: string;
  customerName: string;
  loanNumber: string;
  loanType: string; // e.g. Personal, Business, Asset backed
  principal: number;
  processingFee: number;
  disbursedAmount: number;
  interestType: InterestType;
  interestRate: number; // e.g., 12% p.a.
  interestFrequency: 'Daily' | 'Weekly' | 'Monthly';
  duration: number; // in frequency units (e.g. 12 months)
  collectionFrequency: CollectionFrequency;
  startDate: string;
  endDate: string;
  status: LoanStatus;
  remarks?: string;
  formulaVersion: string;
  requestedAmount?: number;
  approvedAmount?: number;
  loanBookAmount?: number;
  dailyCollectionAmount?: number;
  companyId: string;
  branchId: string;
  createdAt: string;
  updatedAt: string;
}

export type ScheduleStatus = 'Pending' | 'Paid' | 'Partial' | 'Overdue' | 'Waived';

export interface LoanSchedule {
  id: string;
  loanId: string;
  installmentNumber: number;
  dueDate: string;
  principalDue: number;
  interestDue: number;
  penaltyDue: number;
  status: ScheduleStatus;
  paidDate?: string;
  receiptNumber?: string;
  outstanding: number;
  companyId: string;
  branchId: string;
}

export type PaymentMethod = 'Cash' | 'UPI' | 'Cheque' | 'Bank Transfer' | 'Card';

export interface Payment {
  id: string;
  loanId: string;
  loanNumber: string;
  customerName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  principalPaid: number;
  interestPaid: number;
  penaltyPaid: number;
  receiptNumber: string;
  collectorId: string;
  collectorName: string;
  paymentDate: string;
  companyId: string;
  branchId: string;
  collectionType?: 'Paid' | 'Recovery' | 'Missed' | 'Advance' | 'Partial';
  reason?: string;
  remarks?: string;
}

export type LedgerEntryType =
  | 'Disbursement'
  | 'Collection'
  | 'Interest Accrual'
  | 'Penalty'
  | 'Processing Fee'
  | 'Waiver'
  | 'Refund'
  | 'Write-off';

export interface LedgerEntry {
  id: string;
  loanId?: string;
  paymentId?: string;
  type: LedgerEntryType;
  amount: number;
  description: string;
  companyId: string;
  branchId: string;
  createdAt: string;
}

export type CollateralStatus = 'Deposited' | 'Returned' | 'Liquidated';

export interface Collateral {
  id: string;
  loanId: string;
  loanNumber?: string;
  type: string; // Gold, Property, Vehicle, Trust
  description: string;
  estimatedValue: number;
  ltv: number; // Loan-to-value percentage
  storageLocation: string;
  status: CollateralStatus;
  companyId: string;
  branchId: string;
  createdAt: string;
  images?: string[]; // Array of base64 images related to the collateral
}

export type CashBookStatus = 'Open' | 'Pending Verification' | 'Closed';

export interface CashBook {
  id: string;
  date: string; // YYYY-MM-DD
  openingCash: number;
  collections: number;
  expenses: number;
  cashReceived: number; // e.g. from Handovers
  cashHandover: number;
  bankDeposit: number;
  closingCash: number;
  variance: number;
  status: CashBookStatus;
  managerId?: string;
  managerName?: string;
  notes?: string;
  companyId: string;
  branchId: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  module: string;
  oldValue: string;
  newValue: string;
  reason?: string;
  companyId: string;
  branchId: string;
  createdAt: string;
}

export type PenaltyType = 'Flat Amount' | 'Daily Percentage' | 'Monthly Percentage';

export interface FinanceRule {
  id: string;
  version: string;
  interestRateMin: number;
  interestRateMax: number;
  gracePeriodDays: number;
  penaltyValue: number;
  penaltyRate: number;           // Daily % charged on overdue principal
  penaltyType: PenaltyType;
  processingFeeFixed: number;
  processingFeePercent: number;
  allocationPriority: string[];  // e.g. ['Penalty', 'Interest', 'Principal']
  loanNumberPrefix: string;      // e.g. 'VY-LN-'
  companyId: string;
  branchId: string;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  code: string;
  address: string;
}

export interface Branch {
  id: string;
  companyId: string;
  name: string;
  code: string;
}

export interface SecurityPolicy {
  pinRequiredForActions: boolean;
  autoLockTimeoutMinutes: number;
  sensitiveDataMasking: boolean;
  ipGeofencingSimulation: boolean;
  disableRightClick: boolean;
  preventDevTools: boolean;
  antiDebuggerShield: boolean;
  domIntegrityCheck: boolean;
  approvalSessionTimeoutMinutes?: number;
}

export interface Guarantor {
  id: string;
  name: string;
  nationalId: string;
  address: string;
  mobile: string;
  relationship: string;
  signature: string; // Base64 signature image or text representation
  loanIds: string[]; // Linked loan IDs
  companyId: string;
  branchId: string;
  createdAt: string;
}

export type DocumentType =
  | 'AADHAAR'
  | 'PAN'
  | 'PHOTO'
  | 'SIGNATURE'
  | 'BANK_STATEMENT'
  | 'LOAN_APPLICATION'
  | 'COLLATERAL'
  | 'OTHER';

export type StorageProvider = 'LOCAL' | 'FIREBASE' | 'S3' | 'AZURE' | 'CUSTOM';

export interface CustomerDocument {
  id: string;
  customerId: string;
  loanId?: string;
  documentType: DocumentType;
  fileName: string;
  mimeType: string;
  size: number;
  checksum: string;
  storageMode: StorageProvider;
  storagePath?: string;
  base64?: string;
  uploadedBy: string;
  uploadedAt: string;
  status: 'ACTIVE' | 'ARCHIVED';
  version: number;
  previousDocumentId?: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'EXPIRED';
  verifiedBy?: string;
  verifiedAt?: string;
  verificationRemarks?: string;
  expiryDate?: string;
  isEncrypted: boolean;
  ocrStatus?: 'NOT_STARTED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  ocrExtractedText?: string;
  ocrConfidence?: number;
  captureSource?: 'UPLOAD' | 'CAMERA' | 'SCANNER';
  geotag?: { latitude: number; longitude: number };
  companyId: string;
  branchId: string;
}

export interface Expense {
  id: string;
  agentId: string;
  agentName: string;
  type: string;
  amount: number;
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  approvedBy?: string;
  approvedByName?: string;
  approvedAt?: string;
  companyId: string;
  branchId: string;
  createdAt: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  amount: number;
  companyId: string;
  branchId: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  recipientRole: UserRole | 'all';
  recipientId?: string;
  title: string;
  message: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'Collections' | 'Loans' | 'Expenses' | 'Cash' | 'System';
  createdAt: string;
}

export interface AgentVisit {
  id: string;
  agentId: string;
  customerId: string;
  customerName: string;
  village: string;
  street: string;
  visitOrder: number;
  status: 'Pending' | 'Collected' | 'Visited' | 'Not Available' | 'Refused';
  notes?: string;
  visitDate: string; // YYYY-MM-DD
  companyId: string;
  branchId: string;
  createdAt: string;
}

export interface LoanSettlement {
  id: string;
  loanId: string;
  requestedBy: string;
  discountAmount: number;
  settlementAmount: number;
  notes?: string;
  status: 'Pending Approval' | 'Approved' | 'Rejected';
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
}



