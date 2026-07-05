import { Customer, Loan, LoanSchedule, InterestType, CollectionFrequency, PaymentMethod, FinanceRule } from '../types';

/**
 * Adds days, weeks, or months to a date
 */
export function addPeriodsToDate(startDateStr: string, periods: number, frequency: CollectionFrequency): string {
  const date = new Date(startDateStr);
  if (isNaN(date.getTime())) return startDateStr;
  
  if (frequency === 'Daily') {
    date.setDate(date.getDate() + periods);
  } else if (frequency === 'Weekly') {
    date.setDate(date.getDate() + (periods * 7));
  } else if (frequency === 'Bi-Weekly') {
    date.setDate(date.getDate() + (periods * 14));
  } else if (frequency === 'Monthly') {
    date.setMonth(date.getMonth() + periods);
  } else if (frequency === 'Quarterly') {
    date.setMonth(date.getMonth() + (periods * 3));
  }
  
  return date.toISOString().split('T')[0];
}

/**
 * Calculates interest amount for a given principal and interest type
 */
export function calculateInterest(
  principal: number,
  annualRate: number,
  durationInMonths: number,
  type: InterestType,
  frequency: CollectionFrequency = 'Monthly'
): { totalInterest: number; emiAmount: number } {
  let r = 0;
  let n = Math.max(1, durationInMonths);
  
  if (frequency === 'Daily') {
    r = annualRate / (365 * 100);
    n = durationInMonths * 30;
  } else if (frequency === 'Weekly') {
    r = annualRate / (52 * 100);
    n = durationInMonths * 4.33;
  } else if (frequency === 'Bi-Weekly') {
    r = annualRate / (26 * 100);
    n = durationInMonths * 2.16;
  } else if (frequency === 'Monthly') {
    r = annualRate / (12 * 100);
    n = durationInMonths;
  } else if (frequency === 'Quarterly') {
    r = annualRate / (4 * 100);
    n = durationInMonths / 3;
  }

  n = Math.max(1, Math.round(n));

  if (type === 'Flat') {
    const totalInterest = principal * (annualRate / 100) * (durationInMonths / 12);
    const totalAmount = principal + totalInterest;
    const emiAmount = n > 0 ? totalAmount / n : totalAmount;
    return { totalInterest, emiAmount };
  } else if (type === 'Simple') {
    const totalInterest = principal * (annualRate / 100) * (durationInMonths / 12);
    const emiAmount = n > 0 ? (principal + totalInterest) / n : (principal + totalInterest);
    return { totalInterest, emiAmount };
  } else if (type === 'Reducing' || type === 'Compound') {
    if (r === 0) {
      return { totalInterest: 0, emiAmount: n > 0 ? principal / n : principal };
    }
    const emiAmount = (principal * r * Math.pow(1 + r, n)) / 
                      (Math.pow(1 + r, n) - 1);
    const totalInterest = (emiAmount * n) - principal;
    return { totalInterest, emiAmount };
  } else {
    // Default Fallback
    const totalInterest = principal * (annualRate / 100) * (durationInMonths / 12);
    const emiAmount = n > 0 ? (principal + totalInterest) / n : (principal + totalInterest);
    return { totalInterest, emiAmount };
  }
}

/**
 * Generates an EMI Schedule for a loan
 */
export function generateSchedule(loan: Loan): LoanSchedule[] {
  const schedules: LoanSchedule[] = [];
  const duration = loan.duration;
  const frequency = loan.collectionFrequency;
  
  let r = 0;
  let monthsEquivalent = duration;

  if (frequency === 'Daily') {
    r = loan.interestRate / (365 * 100);
    monthsEquivalent = duration / 30;
  } else if (frequency === 'Weekly') {
    r = loan.interestRate / (52 * 100);
    monthsEquivalent = duration / 4.33;
  } else if (frequency === 'Bi-Weekly') {
    r = loan.interestRate / (26 * 100);
    monthsEquivalent = duration / 2.16;
  } else if (frequency === 'Monthly') {
    r = loan.interestRate / (12 * 100);
    monthsEquivalent = duration;
  } else if (frequency === 'Quarterly') {
    r = loan.interestRate / (4 * 100);
    monthsEquivalent = duration * 3;
  }
  
  let totalInterest = 0;
  let emiAmount = 0;

  if (loan.loanBookAmount && loan.loanBookAmount > 0) {
    totalInterest = loan.loanBookAmount - loan.principal;
    emiAmount = loan.dailyCollectionAmount || (loan.loanBookAmount / duration);
  } else {
    const calc = calculateInterest(
      loan.principal,
      loan.interestRate,
      monthsEquivalent,
      loan.interestType,
      frequency
    );
    totalInterest = calc.totalInterest;
    emiAmount = calc.emiAmount;
  }
  
  let remainingPrincipal = loan.principal;
  const singleInstallmentAmount = emiAmount;
  
  for (let i = 1; i <= duration; i++) {
    const dueDate = addPeriodsToDate(loan.startDate, i, frequency);
    let principalDue = 0;
    let interestDue = 0;
    
    if (loan.interestType === 'Flat' || loan.interestType === 'Simple') {
      principalDue = loan.principal / duration;
      interestDue = totalInterest / duration;
    } else {
      // Reducing or Compound interest schedule generation
      interestDue = remainingPrincipal * r;
      principalDue = singleInstallmentAmount - interestDue;
      if (principalDue > remainingPrincipal || i === duration) {
        principalDue = remainingPrincipal;
      }
      remainingPrincipal -= principalDue;
    }
    
    schedules.push({
      id: `${loan.id}-schedule-${i}`,
      loanId: loan.id,
      installmentNumber: i,
      dueDate,
      principalDue: Math.round(principalDue * 100) / 100,
      interestDue: Math.round(interestDue * 100) / 100,
      penaltyDue: 0,
      status: 'Pending',
      outstanding: Math.round((principalDue + interestDue) * 100) / 100,
      companyId: loan.companyId,
      branchId: loan.branchId
    });
  }
  
  return schedules;
}

/**
 * Evaluates and applies penalty based on grace period and rules
 */
export function evaluatePenalties(schedules: LoanSchedule[], rules: FinanceRule, currentDateStr: string): LoanSchedule[] {
  const currentDate = new Date(currentDateStr);
  
  return schedules.map(sched => {
    if (sched.status === 'Paid' || sched.status === 'Waived') {
      return sched;
    }
    
    const dueDate = new Date(sched.dueDate);
    const diffTime = currentDate.getTime() - dueDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let penaltyDue = 0;
    let status = sched.status;
    
    if (diffDays > rules.gracePeriodDays) {
      status = 'Overdue';
      if (rules.penaltyType === 'Flat Amount') {
        penaltyDue = rules.penaltyValue;
      } else if (rules.penaltyType === 'Daily Percentage') {
        // Daily percentage on outstanding installment amount
        penaltyDue = sched.outstanding * (rules.penaltyValue / 100) * (diffDays - rules.gracePeriodDays);
      } else if (rules.penaltyType === 'Monthly Percentage') {
        const monthsOverdue = Math.ceil((diffDays - rules.gracePeriodDays) / 30);
        penaltyDue = sched.outstanding * (rules.penaltyValue / 100) * monthsOverdue;
      }
    }
    
    return {
      ...sched,
      penaltyDue: Math.round(penaltyDue * 100) / 100,
      status
    };
  });
}

/**
 * Distributes raw payment amount across schedule components based on priority rule
 */
export function allocatePayment(
  amount: number,
  schedule: LoanSchedule,
  priorityRule: string // e.g. "Penalty > Interest > Principal" or "Principal > Interest > Penalty"
): {
  principalPaid: number;
  interestPaid: number;
  penaltyPaid: number;
  remainingAmount: number;
  newSchedule: LoanSchedule;
} {
  let remaining = amount;
  let penaltyPaid = 0;
  let interestPaid = 0;
  let principalPaid = 0;
  
  const priorityOrder = priorityRule.split('>').map(p => p.trim());
  
  for (const comp of priorityOrder) {
    if (remaining <= 0) break;
    
    if (comp === 'Penalty') {
      const penaltyNeeded = schedule.penaltyDue;
      if (penaltyNeeded > 0) {
        const pay = Math.min(remaining, penaltyNeeded);
        penaltyPaid = pay;
        remaining -= pay;
      }
    } else if (comp === 'Interest') {
      const interestNeeded = schedule.interestDue;
      if (interestNeeded > 0) {
        const pay = Math.min(remaining, interestNeeded);
        interestPaid = pay;
        remaining -= pay;
      }
    } else if (comp === 'Principal') {
      const principalNeeded = schedule.principalDue;
      if (principalNeeded > 0) {
        const pay = Math.min(remaining, principalNeeded);
        principalPaid = pay;
        remaining -= pay;
      }
    }
  }
  
  // Re-evaluate outstanding
  const oldOutstanding = schedule.outstanding;
  const paidTotal = principalPaid + interestPaid; // Note: penalty is usually extra or part of outstanding
  const newOutstanding = Math.max(0, Math.round((oldOutstanding - paidTotal) * 100) / 100);
  
  const newPenaltyDue = Math.max(0, Math.round((schedule.penaltyDue - penaltyPaid) * 100) / 100);
  const newInterestDue = Math.max(0, Math.round((schedule.interestDue - interestPaid) * 100) / 100);
  const newPrincipalDue = Math.max(0, Math.round((schedule.principalDue - principalPaid) * 100) / 100);
  
  let newStatus = schedule.status;
  if (newOutstanding === 0 && newPenaltyDue === 0) {
    newStatus = 'Paid';
  } else if (paidTotal > 0 || penaltyPaid > 0) {
    newStatus = 'Partial';
  }
  
  return {
    principalPaid: Math.round(principalPaid * 100) / 100,
    interestPaid: Math.round(interestPaid * 100) / 100,
    penaltyPaid: Math.round(penaltyPaid * 100) / 100,
    remainingAmount: Math.round(remaining * 100) / 100,
    newSchedule: {
      ...schedule,
      principalDue: newPrincipalDue,
      interestDue: newInterestDue,
      penaltyDue: newPenaltyDue,
      outstanding: newOutstanding,
      status: newStatus
    }
  };
}
