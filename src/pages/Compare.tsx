import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    CheckCircle2, Star, Zap, Clock, ShieldCheck, 
    Percent, CreditCard, Calendar, BarChart3, IndianRupee, 
    Timer, Award
} from 'lucide-react';
import { type LoanProduct } from '../mockData';
import Navbar from '../components/Navbar';

const CompareLoans: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Retrieve selected products from state passed from Recommendations
    const selectedBanks: LoanProduct[] = location.state?.selectedLoans || [];

    // Redirect to /info with the specific loan data
    const handleSelectLoan = (loan: LoanProduct) => {
        navigate('/info', { state: { loan } });
    };

    if (selectedBanks.length === 0) {
        return (
            <div style={{ height: '100vh', width: '100vw', backgroundColor: '#F1F5F9', display: 'flex', flexDirection: 'column' }}>
                <Navbar title="Compare Offers" />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                    <h2 style={{ color: '#0F172A' }}>No banks selected for comparison</h2>
                    <button 
                        onClick={() => navigate('/recommendations')}
                        style={{ padding: '12px 24px', backgroundColor: '#38BDF8', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
                    >
                        Return to Recommendations
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ height: '100vh', width: '100vw', backgroundColor: '#F1F5F9', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', sans-serif", overflow: 'hidden' }}>
            
            {/* UNIFIED NAVBAR */}
            <Navbar 
                title={`Compare Offers (${selectedBanks.length})`} 
                backAction={() => navigate('/recommendations')}
            />

            {/* MAIN CONTENT */}
            <div style={{ flex: 1, padding: '20px 40px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ marginBottom: '15px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Smart Comparison</h2>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>All values are calculated based on your specific loan requirements.</p>
                </div>

                {/* TABLE CONTAINER */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '24px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                    
                    {/* TABLE HEADERS */}
                    <div style={{ display: 'grid', gridTemplateColumns: `220px repeat(${selectedBanks.length}, 1fr)`, backgroundColor: '#F8FAFC' }}>
                        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', fontSize: '12px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Features</div>
                        
                        {selectedBanks.map((bank) => (
                            <div key={bank.id} style={{ 
                                padding: '20px 15px', textAlign: 'center', borderLeft: '1px solid #E2E8F0', position: 'relative',
                                backgroundColor: bank.isBest ? '#F0F9FF' : 'transparent',
                                borderTop: bank.isBest ? '4px solid #38BDF8' : '4px solid transparent'
                            }}>
                                {bank.isBest && (
                                    <div style={{ position: 'absolute', top: '8px', right: '8px', color: '#0EA5E9' }}>
                                        <Award size={18} />
                                    </div>
                                )}
                                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>{bank.bank}</div>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', marginTop: '6px' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={12} fill={i < Math.floor(bank.rating) ? "#FBBF24" : "none"} stroke="#FBBF24" />
                                    ))}
                                </div>
                                {bank.isBest && <div style={{ fontSize: '10px', fontWeight: 700, color: '#0284C7', marginTop: '4px', textTransform: 'uppercase' }}>Best Value Pick</div>}
                            </div>
                        ))}
                    </div>

                    {/* DYNAMIC ROWS (SCROLLABLE) */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                        <CompareRow label="Principal Amount" icon={<IndianRupee size={14}/>} values={selectedBanks.map(b => b.total)} />
                        <CompareRow label="Interest Rate (ROI)" icon={<Percent size={14}/>} values={selectedBanks.map(b => b.rate)} highlight="#0284C7" />
                        <CompareRow label="Loan Tenure" icon={<Timer size={14}/>} values={selectedBanks.map(b => b.tenure)} />
                        <CompareRow label="Monthly EMI" icon={<Calendar size={14}/>} values={selectedBanks.map(b => b.emi)} />
                        <CompareRow label="Processing Fees" icon={<CreditCard size={14}/>} values={selectedBanks.map(b => b.processingFee)} />
                        <CompareRow label="Total Interest" icon={<BarChart3 size={14}/>} values={selectedBanks.map(b => b.totalInterest)} />
                        <CompareRow label="Approval Time" icon={<Clock size={14}/>} values={selectedBanks.map(b => b.approvalTime)} />
                        <CompareRow label="Prepayment Policy" icon={<ShieldCheck size={14}/>} values={selectedBanks.map(b => b.prepayment)} />
                        <CompareRow label="Insurance Charges" icon={<Zap size={14}/>} values={selectedBanks.map(b => b.insurance)} />
                        <CompareRow label="Final Repayment" icon={<CheckCircle2 size={14}/>} values={selectedBanks.map(b => b.totalPayment)} isLast />
                    </div>

                    {/* FOOTER ACTION BUTTONS */}
                    <div style={{ display: 'grid', gridTemplateColumns: `220px repeat(${selectedBanks.length}, 1fr)`, borderTop: '1px solid #E2E8F0', padding: '10px 0' }}>
                        <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', fontSize: '11px', color: '#94A3B8' }}>Click to proceed with bank</div>
                        {selectedBanks.map((bank) => (
                            <div key={bank.id} style={{ padding: '5px 15px', borderLeft: '1px solid #E2E8F0' }}>
                                <button 
                                    onClick={() => handleSelectLoan(bank)}
                                    style={{ 
                                        width: '100%', padding: '12px', borderRadius: '12px', border: 'none', 
                                        backgroundColor: '#38BDF8', color: '#0F172A', fontWeight: 700, 
                                        fontSize: '13px', cursor: 'pointer', display: 'flex', 
                                        alignItems: 'center', justifyContent: 'center', gap: '8px'
                                    }}
                                >
                                    Select {bank.bank.split(' ')[0]}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// HELPERS
const CompareRow = ({ label, icon, values, highlight, isLast }: any) => (
    <div style={{ 
        minHeight: '48px', display: 'grid', gridTemplateColumns: `220px repeat(${values.length}, 1fr)`, 
        borderBottom: isLast ? 'none' : '1px solid #F1F5F9'
    }}>
        <div style={{ 
            padding: '0 20px', backgroundColor: '#F8FAFC', display: 'flex', 
            alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '13px', fontWeight: 600 
        }}>
            <span style={{color: '#94A3B8'}}>{icon}</span> {label}
        </div>
        {values.map((val: string, i: number) => (
            <div key={i} style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '10px 15px', fontSize: '14px', fontWeight: 700, 
                color: highlight ? highlight : '#1E293B', borderLeft: '1px solid #F1F5F9'
            }}>
                {val}
            </div>
        ))}
    </div>
);

export default CompareLoans;