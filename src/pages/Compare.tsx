import React, { useState, useEffect } from 'react';
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
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    // Dynamic grid layout based on device
    const labelColWidth = isMobile ? '130px' : '220px';
    // On mobile, force a minimum width for bank columns to prevent squashing (enables horizontal scroll)
    const bankColWidth = isMobile ? 'minmax(140px, 1fr)' : '1fr'; 
    const gridLayout = `${labelColWidth} repeat(${selectedBanks.length}, ${bankColWidth})`;

    return (
        <div style={{ height: '100vh', width: '100vw', backgroundColor: '#F1F5F9', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', sans-serif", overflow: 'hidden' }}>
            
            {/* UNIFIED NAVBAR */}
            <Navbar 
                title={`Compare Offers (${selectedBanks.length})`} 
                backAction={() => navigate('/recommendations')}
            />

            {/* MAIN CONTENT */}
            <div style={{ flex: 1, padding: isMobile ? '10px' : '20px 40px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ marginBottom: '15px', padding: isMobile ? '0 10px' : '0' }}>
                    <h2 style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Smart Comparison</h2>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>All values are calculated based on your specific loan requirements.</p>
                </div>

                {/* TABLE CONTAINER */}
                {/* overflowX: 'auto' here allows the whole table to scroll sideways on mobile if needed */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '24px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', overflowX: isMobile ? 'auto' : 'hidden' }}>
                    
                    {/* Inner wrapper to enforce min-width on mobile so columns align */}
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: isMobile ? 'fit-content' : '100%' }}>
                        
                        {/* TABLE HEADERS */}
                        <div style={{ display: 'grid', gridTemplateColumns: gridLayout, backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                            <div style={{ padding: isMobile ? '15px 10px' : '20px', display: 'flex', alignItems: 'center', fontSize: '12px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Features</div>
                            
                            {selectedBanks.map((bank) => (
                                <div key={bank.id} style={{ 
                                    padding: isMobile ? '15px 5px' : '20px 15px', textAlign: 'center', borderLeft: '1px solid #E2E8F0', position: 'relative',
                                    backgroundColor: bank.isBest ? '#F0F9FF' : 'transparent',
                                    borderTop: bank.isBest ? '4px solid #38BDF8' : '4px solid transparent'
                                }}>
                                    {bank.isBest && (
                                        <div style={{ position: 'absolute', top: '8px', right: '8px', color: '#0EA5E9' }}>
                                            <Award size={isMobile ? 14 : 18} />
                                        </div>
                                    )}
                                    <div style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: 800, color: '#0F172A' }}>{bank.bank}</div>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', marginTop: '6px' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={isMobile ? 10 : 12} fill={i < Math.floor(bank.rating) ? "#FBBF24" : "none"} stroke="#FBBF24" />
                                        ))}
                                    </div>
                                    {bank.isBest && <div style={{ fontSize: '10px', fontWeight: 700, color: '#0284C7', marginTop: '4px', textTransform: 'uppercase' }}>Best Value Pick</div>}
                                </div>
                            ))}
                        </div>

                        {/* DYNAMIC ROWS (SCROLLABLE VERTICALLY) */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                            <CompareRow gridLayout={gridLayout} label="Principal Amount" icon={<IndianRupee size={14}/>} values={selectedBanks.map(b => b.total)} />
                            <CompareRow gridLayout={gridLayout} label="Interest Rate (ROI)" icon={<Percent size={14}/>} values={selectedBanks.map(b => b.rate)} highlight="#0284C7" />
                            <CompareRow gridLayout={gridLayout} label="Loan Tenure" icon={<Timer size={14}/>} values={selectedBanks.map(b => b.tenure)} />
                            <CompareRow gridLayout={gridLayout} label="Monthly EMI" icon={<Calendar size={14}/>} values={selectedBanks.map(b => b.emi)} />
                            <CompareRow gridLayout={gridLayout} label="Processing Fees" icon={<CreditCard size={14}/>} values={selectedBanks.map(b => b.processingFee)} />
                            <CompareRow gridLayout={gridLayout} label="Total Interest" icon={<BarChart3 size={14}/>} values={selectedBanks.map(b => b.totalInterest)} />
                            <CompareRow gridLayout={gridLayout} label="Approval Time" icon={<Clock size={14}/>} values={selectedBanks.map(b => b.approvalTime)} />
                            <CompareRow gridLayout={gridLayout} label="Prepayment Policy" icon={<ShieldCheck size={14}/>} values={selectedBanks.map(b => b.prepayment)} />
                            <CompareRow gridLayout={gridLayout} label="Insurance Charges" icon={<Zap size={14}/>} values={selectedBanks.map(b => b.insurance)} />
                            <CompareRow gridLayout={gridLayout} label="Final Repayment" icon={<CheckCircle2 size={14}/>} values={selectedBanks.map(b => b.totalPayment)} isLast />
                        </div>

                        {/* FOOTER ACTION BUTTONS - FIXED AT BOTTOM RELATIVE TO ROWS */}
                        <div style={{ display: 'grid', gridTemplateColumns: gridLayout, borderTop: '1px solid #E2E8F0', padding: '10px 0', backgroundColor: 'white' }}>
                            <div style={{ padding: isMobile ? '0 10px' : '0 20px', display: 'flex', alignItems: 'center', fontSize: '11px', color: '#94A3B8' }}>Click to proceed</div>
                            {selectedBanks.map((bank) => (
                                <div key={bank.id} style={{ padding: '5px 15px', borderLeft: '1px solid #E2E8F0' }}>
                                    <button 
                                        onClick={() => handleSelectLoan(bank)}
                                        style={{ 
                                            width: '100%', padding: '12px', borderRadius: '12px', border: 'none', 
                                            backgroundColor: '#38BDF8', color: '#0F172A', fontWeight: 700, 
                                            fontSize: isMobile ? '12px' : '13px', cursor: 'pointer', display: 'flex', 
                                            alignItems: 'center', justifyContent: 'center', gap: '8px'
                                        }}
                                    >
                                        Select {isMobile ? '' : bank.bank.split(' ')[0]}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// HELPERS
const CompareRow = ({ label, icon, values, highlight, isLast, gridLayout }: any) => (
    <div style={{ 
        minHeight: '48px', display: 'grid', gridTemplateColumns: gridLayout, 
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
                color: highlight ? highlight : '#1E293B', borderLeft: '1px solid #F1F5F9',
                textAlign: 'center'
            }}>
                {val}
            </div>
        ))}
    </div>
);

export default CompareLoans;