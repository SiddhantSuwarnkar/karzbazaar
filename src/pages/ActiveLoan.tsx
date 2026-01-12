import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle2, History, Zap, Landmark } from 'lucide-react';
// Import the new shared Navbar
import Navbar from '../components/Navbar'; 

const CurrentLoan: React.FC = () => {
    const navigate = useNavigate();

    // 1. INPUT STATES FOR OPTIMIZER
    const [extraEmi, setExtraEmi] = useState(2000);
    const [targetTenure, setTargetTenure] = useState(44); // Months remaining

    const loanStats = {
        bank: "Axis Bank",
        loanAccount: "XXXX-XXXX-8921",
        totalPrincipal: "₹10,00,000",
        interestRate: 11.25, 
        tenure: "60 Months",
        emi: 21867, 
        remainingPrincipal: 580000, 
        completionDate: "Oct 2028",
    };

    // 2. MATH LOGIC FOR OPTIMIZER
    const optimizationResults = useMemo(() => {
        const P = loanStats.remainingPrincipal;
        const r = (loanStats.interestRate / 100) / 12;
        
        const newEmi = loanStats.emi + extraEmi;
        const nWithExtra = Math.log(newEmi / (newEmi - P * r)) / Math.log(1 + r);
        const newTenure = Math.round(nWithExtra);
        
        const requiredEmiForTenure = (P * r * Math.pow(1 + r, targetTenure)) / (Math.pow(1 + r, targetTenure) - 1);
        
        const originalTotalInterest = (loanStats.emi * 44) - P; 
        const newTotalInterest = (newEmi * newTenure) - P;
        const interestSaved = Math.max(0, originalTotalInterest - newTotalInterest);

        return {
            newTenure,
            earlyClosure: 44 - newTenure,
            interestSaved,
            requiredEmi: Math.round(requiredEmiForTenure)
        };
    }, [extraEmi, targetTenure, loanStats]);

    return (
        <div style={{ height: '100vh', width: '100vw', backgroundColor: '#F1F5F9', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', sans-serif", overflow: 'hidden' }}>
            
            {/* NEW INTEGRATED NAVBAR */}
            <Navbar 
                title="Active Loan Management" 
                backAction={() => navigate('/')} 
            />

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                
                {/* LEFT SECTION */}
                <div style={{ width: '420px', backgroundColor: '#e0e1eb', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', padding: '40px', flexShrink: 0 }}>
                    <div style={{ marginBottom: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748B', marginBottom: '8px' }}>
                            <Landmark size={18} />
                            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>Primary Loan Account</span>
                        </div>
                        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f0f0f', margin: 0 }}>{loanStats.bank}</h2>
                        <p style={{ color: '#94A3B8', fontSize: '14px', marginTop: '5px' }}>{loanStats.loanAccount}</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: '#F8FAFC', padding: '25px', borderRadius: '20px' }}>
                        <InfoBlock label="Sanctioned Amount" value="₹10,00,000" />
                        <InfoBlock label="Interest Rate" value={`${loanStats.interestRate}%`} highlight="#0284C7" />
                        <InfoBlock label="Loan Tenure" value={loanStats.tenure} />
                        <InfoBlock label="Monthly EMI" value={`₹${loanStats.emi.toLocaleString()}`} />
                        <div style={{ height: '1px', backgroundColor: '#E2E8F0' }} />
                        <InfoBlock label="Remaining Principal" value={`₹${loanStats.remainingPrincipal.toLocaleString()}`} />
                        <InfoBlock label="Original End Date" value={loanStats.completionDate} />
                    </div>

                    <button style={{ marginTop: 'auto', padding: '16px', borderRadius: '12px', border: 'none', backgroundColor: '#4c7de7', fontWeight: 700, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        Download Statement
                    </button>
                </div>

                {/* RIGHT SECTION */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '40px 60px', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    
                    <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#1E293B' }}>Live Repayment Status</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }}>
                        <div style={{ backgroundColor: '#1E293B', borderRadius: '28px', padding: '30px', color: 'white', display: 'flex', alignItems: 'center', gap: '40px' }}>
                            <div style={{ position: 'relative', width: '140px', height: '140px', flexShrink: 0 }}>
                                <svg width="140" height="140" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="#334155" strokeWidth="8" />
                                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="#38BDF8" strokeWidth="8" 
                                        strokeDasharray={`${2 * Math.PI * 42}`} 
                                        strokeDashoffset={`${2 * Math.PI * 42 * (1 - 0.42)}`} 
                                        strokeLinecap="round" transform="rotate(-90 50 50)"
                                    />
                                </svg>
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '22px', fontWeight: 800 }}>42%</div>
                                    <div style={{ fontSize: '9px', color: '#94A3B8' }}>PAID</div>
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: '13px', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '5px' }}>Outstanding Principal</div>
                                <div style={{ fontSize: '32px', fontWeight: 800, color: '#F8FAFC' }}>₹{loanStats.remainingPrincipal.toLocaleString()}</div>
                                <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
                                    <div style={{ fontSize: '12px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <CheckCircle2 size={14} /> 16 EMIs Done
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#FBBF24', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Clock size={14} /> 44 EMIs Left
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '15px' }}>
                            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '14px', color: '#64748B' }}>Interest Paid to Date</span>
                                <span style={{ fontWeight: 700, color: '#0F172A' }}>₹1,42,000</span>
                            </div>
                            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '14px', color: '#64748B' }}>Next EMI Date</span>
                                <span style={{ fontWeight: 700, color: '#38BDF8' }}>05 Feb 2026</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '35px', border: '1px solid #E2E8F0' }}>
                        <h3 style={{ margin: '0 0 25px 0', fontSize: '18px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <History size={20} color="#0284C7" /> Repayment Schedule (FY 2025-26)
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
                            <ScheduleItem period="2024" status="Completed" amount="₹2.6L" isDone />
                            <ScheduleItem period="2025" status="Completed" amount="₹2.6L" isDone />
                            <ScheduleItem period="2026" status="Active Year" amount="₹2.6L" isActive />
                            <ScheduleItem period="2027" status="Upcoming" amount="₹2.6L" />
                            <ScheduleItem period="2028" status="Final Phase" amount="₹2.2L" />
                        </div>
                    </div>

                    {/* OPTIMIZER SECTION */}
                    <div style={{ backgroundColor: '#0F172A', borderRadius: '28px', padding: '40px', color: 'white' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8', marginBottom: '10px' }}>
                                    <Zap size={20} fill="#38BDF8" />
                                    <span style={{ fontWeight: 800, fontSize: '12px', textTransform: 'uppercase' }}>Interactive Loan Optimizer</span>
                                </div>
                                <h3 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Adjust your repayment plan</h3>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '12px', color: '#94A3B8' }}>TOTAL INTEREST SAVED</div>
                                <div style={{ fontSize: '28px', fontWeight: 800, color: '#10B981' }}>₹{optimizationResults.interestSaved.toLocaleString()}</div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: 600 }}>Top-up your Monthly EMI</label>
                                        <span style={{ color: '#38BDF8', fontWeight: 700 }}>+₹{extraEmi.toLocaleString()}</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0" max="25000" step="500" 
                                        value={extraEmi} 
                                        onChange={(e) => setExtraEmi(parseInt(e.target.value))}
                                        style={{ width: '100%', accentColor: '#38BDF8', cursor: 'pointer' }}
                                    />
                                    <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '5px' }}>Total Monthly Payment: ₹{(loanStats.emi + extraEmi).toLocaleString()}</div>
                                </div>

                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: 600 }}>Target Remaining Tenure</label>
                                        <span style={{ color: '#FBBF24', fontWeight: 700 }}>{targetTenure} Months</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="12" max="44" step="1" 
                                        value={targetTenure} 
                                        onChange={(e) => setTargetTenure(parseInt(e.target.value))}
                                        style={{ width: '100%', accentColor: '#FBBF24', cursor: 'pointer' }}
                                    />
                                    <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '5px' }}>Requires EMI of: ₹{optimizationResults.requiredEmi.toLocaleString()}</div>
                                </div>
                            </div>

                            <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.05)', border: '1px dashed rgba(56, 189, 248, 0.3)', padding: '25px', borderRadius: '20px' }}>
                                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                                    <div style={{ flex: 1, backgroundColor: '#1E293B', padding: '15px', borderRadius: '15px' }}>
                                        <div style={{ fontSize: '11px', color: '#94A3B8' }}>OPTIMIZED TENURE</div>
                                        <div style={{ fontSize: '18px', fontWeight: 700 }}>{optimizationResults.newTenure} Months</div>
                                    </div>
                                    <div style={{ flex: 1, backgroundColor: '#1E293B', padding: '15px', borderRadius: '15px' }}>
                                        <div style={{ fontSize: '11px', color: '#94A3B8' }}>CLOSURE SAVINGS</div>
                                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#10B981' }}>{optimizationResults.earlyClosure} Months early</div>
                                    </div>
                                </div>
                                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#CBD5E1', margin: 0 }}>
                                    Adjusting your plan will save you <strong style={{color: '#10B981'}}>₹{optimizationResults.interestSaved.toLocaleString()}</strong> in interest costs overall.
                                </p>
                                <button style={{ marginTop: '20px', width: '100%', backgroundColor: '#38BDF8', color: '#0F172A', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>
                                    Apply Optimized Plan
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: '40px' }}></div>
                </div>
            </div>
        </div>
    );
};

/* --- SUB-COMPONENTS --- */

const InfoBlock = ({ label, value, highlight }: { label: string, value: string, highlight?: string }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: '14px', fontWeight: 700, color: highlight || '#1E293B' }}>{value}</span>
    </div>
);

const ScheduleItem = ({ period, status, amount, isDone, isActive }: { period: string, status: string, amount: string, isDone?: boolean, isActive?: boolean }) => (
    <div style={{ 
        padding: '20px', borderRadius: '18px', textAlign: 'center',
        backgroundColor: isDone ? '#F0FDF4' : isActive ? '#EFF6FF' : 'white',
        border: isActive ? '2px solid #38BDF8' : '1px solid #E2E8F0',
    }}>
        <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>{period}</div>
        <div style={{ fontSize: '11px', color: isDone ? '#16A34A' : isActive ? '#0284C7' : '#94A3B8', margin: '4px 0 8px 0', fontWeight: 700 }}>{status}</div>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>{amount}</div>
    </div>
);

export default CurrentLoan;