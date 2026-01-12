export interface LoanProduct {
  id: number;
  bank: string;
  total: string; // This acts as the Principal Amount
  rate: string;
  emi: string;
  rejectionProb: string;
  isRecommended: boolean;
  riskReason: string;
  tenure: string;
  processingFee: string;
  features: string[];
  // New fields for the Compare Page
  totalInterest: string;
  totalPayment: string;
  approvalTime: string;
  insurance: string;
  prepayment: string;
  rating: number;
  isBest?: boolean;
}

export const loanProducts: LoanProduct[] = [
  { 
    id: 1, bank: "KDFC Bank", total: "₹5,20,000", rate: "7.6%", emi: "₹3,425", 
    rejectionProb: "10%", isRecommended: true, 
    riskReason: "Low risk: Strong credit history and stable income.",
    tenure: "5 Years", processingFee: "₹2,600", features: ["Instant Disbursal", "Zero Paperwork"],
    totalInterest: "₹1,05,500", totalPayment: "₹6,25,500", approvalTime: "24 Hours",
    insurance: "₹2,100", prepayment: "Nil after 12m", rating: 4.8, isBest: true
  },
  { 
    id: 2, bank: "HDFC Bank", total: "₹5,10,000", rate: "8.2%", emi: "₹3,500", 
    rejectionProb: "15%", isRecommended: true, 
    riskReason: "Minor risk: High debt-to-income ratio.",
    tenure: "4 Years", processingFee: "₹5,100", features: ["Flexible Tenure", "Low Foreclosure"],
    totalInterest: "₹88,000", totalPayment: "₹5,98,000", approvalTime: "48 Hours",
    insurance: "₹3,200", prepayment: "1% Charges", rating: 4.6
  },
  { 
    id: 3, bank: "ICICI Bank", total: "₹5,40,000", rate: "7.1%", emi: "₹3,300", 
    rejectionProb: "5%", isRecommended: true, 
    riskReason: "Minimal risk: Perfect record.",
    tenure: "6 Years", processingFee: "₹1,350", features: ["High Limit", "Pre-approved"],
    totalInterest: "₹1,22,400", totalPayment: "₹6,62,400", approvalTime: "Instant",
    insurance: "Included", prepayment: "Nil after 6m", rating: 4.9, isBest: true
  },
  { 
    id: 4, bank: "Axis Bank", total: "₹5,35,000", rate: "8.5%", emi: "₹3,650", 
    rejectionProb: "12%", isRecommended: true, 
    riskReason: "Safe: Consistent repayment history.",
    tenure: "5 Years", processingFee: "₹4,012", features: ["Cashback offers"],
    totalInterest: "₹1,18,000", totalPayment: "₹6,53,000", approvalTime: "12 Hours",
    insurance: "₹2,500", prepayment: "2% Charges", rating: 4.4
  },
  { 
    id: 5, bank: "Yes Bank", total: "₹5,00,000", rate: "9.0%", emi: "₹3,800", 
    rejectionProb: "40%", isRecommended: false, 
    riskReason: "High risk: Multiple recent credit inquiries.",
    tenure: "3 Years", processingFee: "₹10,000", features: ["Low Income Support"],
    totalInterest: "₹72,000", totalPayment: "₹5,72,000", approvalTime: "72 Hours",
    insurance: "₹5,000", prepayment: "3% Charges", rating: 3.8
  },
  { 
    id: 6, bank: "SBI Bank", total: "₹4,80,000", rate: "9.5%", emi: "₹4,000", 
    rejectionProb: "65%", isRecommended: false, 
    riskReason: "Critical: Credit score below 600.",
    tenure: "5 Years", processingFee: "₹7,200", features: ["Government Backed"],
    totalInterest: "₹1,25,000", totalPayment: "₹6,05,000", approvalTime: "5-7 Days",
    insurance: "₹1,500", prepayment: "Nil Charges", rating: 4.2
  },
  { 
    id: 7, bank: "Kotak Bank", total: "₹5,15,000", rate: "10.2%", emi: "₹4,200", 
    rejectionProb: "55%", isRecommended: false, 
    riskReason: "Unstable employment history detected.",
    tenure: "5 Years", processingFee: "₹6,180", features: ["Digital Gold access"],
    totalInterest: "₹1,38,000", totalPayment: "₹6,53,000", approvalTime: "24 Hours",
    insurance: "₹4,000", prepayment: "1% Charges", rating: 4.0
  },
  { 
    id: 8, bank: "IDFC First", total: "₹5,25,000", rate: "11.0%", emi: "₹4,500", 
    rejectionProb: "80%", isRecommended: false, 
    riskReason: "History of defaulted payments.",
    tenure: "5 Years", processingFee: "₹13,125", features: ["Paperless journey"],
    totalInterest: "₹1,55,000", totalPayment: "₹6,80,000", approvalTime: "Instant",
    insurance: "₹4,500", prepayment: "5% Charges", rating: 3.5
  }
];

export const authUsers = [
  { username: "admin", password: "password123", fullName: "John Doe", email: "john@karzbazaar.com" },
  { username: "user1", password: "user123", fullName: "Jane Smith", email: "jane@karzbazaar.com" }
];

export const activeLoans = [
  { id: "AL-9921", bank: "KDFC Bank", amount: "₹10,00,000", remainingTenure: "24 Months", nextEmi: "₹15,400", status: "On-Track" }
];