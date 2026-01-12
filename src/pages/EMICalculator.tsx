import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Navbar from '../components/Navbar';

ChartJS.register(ArcElement, Tooltip, Legend);

const EMICalculator: React.FC = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // State for inputs
    const [loanAmount, setLoanAmount] = useState<number>(1000000);
    const [interestRate, setInterestRate] = useState<number>(8.5);
    const [tenure, setTenure] = useState<number>(5);

    // Calculation states
    const [monthlyEMI, setMonthlyEMI] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    // Theme Colors
    const primaryColor = '#38BDF8'; // Sky Blue
    const secondaryColor = '#0F172A'; // Dark Slate
    const accentColor = '#6366F1'; // Indigo

    useEffect(() => {
        const p = loanAmount;
        const r = interestRate / 12 / 100;
        const n = tenure * 12;

        const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        const totalAmt = emi * n;
        const totalInt = totalAmt - p;

        setMonthlyEMI(Math.round(emi));
        setTotalInterest(Math.round(totalInt));
        setTotalAmount(Math.round(totalAmt));
    }, [loanAmount, interestRate, tenure]);

    const chartData = {
        labels: ['Principal Amount', 'Total Interest'],
        datasets: [
            {
                data: [loanAmount, totalInterest],
                backgroundColor: [primaryColor, accentColor],
                hoverBackgroundColor: [primaryColor, accentColor],
                borderWidth: 0,
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: { display: false },
        },
        cutout: '78%',
        maintainAspectRatio: true,
    };

    return (
        <div style={{ 
            height: '100vh', 
            width: '100vw', 
            backgroundColor: '#F1F5F9', 
            fontFamily: "'Inter', sans-serif",
            overflow: 'hidden', 
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* UNIFIED NAVBAR */}
            <Navbar 
                title="EMI Calculator" 
                backAction={() => navigate(-1)} 
            />

            <main style={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: isMobile ? 'flex-start' : 'center', 
                justifyContent: 'center', 
                padding: isMobile ? '10px' : '20px',
                overflowY: 'auto' // Crucial for mobile scrolling
            }}>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr', 
                    gap: isMobile ? '30px' : '40px', 
                    backgroundColor: 'white', 
                    padding: isMobile ? '24px' : '48px', 
                    borderRadius: '28px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
                    width: '100%',
                    maxWidth: '1100px',
                    margin: isMobile ? '20px 0' : '0'
                }}>
                    
                    {/* Left: Sliders */}
                    <div>
                        <div style={{ marginBottom: '36px' }}>
                            <div style={inputHeaderStyle}>
                                <label style={labelStyle}>Loan Amount</label>
                                <div style={{...valueBoxStyle, color: secondaryColor, backgroundColor: '#F1F5F9', fontSize: isMobile ? '14px' : '16px'}}>₹ {loanAmount.toLocaleString('en-IN')}</div>
                            </div>
                            <input 
                                type="range" min="100000" max="10000000" step="50000"
                                value={loanAmount} 
                                onChange={(e) => setLoanAmount(Number(e.target.value))}
                                style={{...sliderStyle, accentColor: primaryColor}}
                            />
                        </div>

                        <div style={{ marginBottom: '36px' }}>
                            <div style={inputHeaderStyle}>
                                <label style={labelStyle}>Rate of Interest (p.a)</label>
                                <div style={{...valueBoxStyle, color: secondaryColor, backgroundColor: '#F1F5F9', fontSize: isMobile ? '14px' : '16px'}}>{interestRate} %</div>
                            </div>
                            <input 
                                type="range" min="1" max="20" step="0.1"
                                value={interestRate} 
                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                style={{...sliderStyle, accentColor: primaryColor}}
                            />
                        </div>

                        <div style={{ marginBottom: '36px' }}>
                            <div style={inputHeaderStyle}>
                                <label style={labelStyle}>Loan Tenure (Years)</label>
                                <div style={{...valueBoxStyle, color: secondaryColor, backgroundColor: '#F1F5F9', fontSize: isMobile ? '14px' : '16px'}}>{tenure} Yr</div>
                            </div>
                            <input 
                                type="range" min="1" max="30" step="1"
                                value={tenure} 
                                onChange={(e) => setTenure(Number(e.target.value))}
                                style={{...sliderStyle, accentColor: primaryColor}}
                            />
                        </div>

                        <div style={{ marginTop: isMobile ? '24px' : '48px', padding: '24px', backgroundColor: secondaryColor, borderRadius: '20px', textAlign: 'center' }}>
                            <div style={{ fontSize: '14px', color: '#94A3B8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>Monthly EMI</div>
                            <div style={{ fontSize: isMobile ? '28px' : '32px', fontWeight: 800, color: primaryColor, marginTop: '4px' }}>₹ {monthlyEMI.toLocaleString('en-IN')}</div>
                        </div>
                    </div>

                    {/* Right: Chart and Summary */}
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        borderLeft: isMobile ? 'none' : '1px solid #F1F5F9', 
                        borderTop: isMobile ? '1px solid #F1F5F9' : 'none',
                        paddingLeft: isMobile ? '0' : '40px',
                        paddingTop: isMobile ? '40px' : '0'
                    }}>
                        <div style={{ width: isMobile ? '220px' : '260px', height: isMobile ? '220px' : '260px', position: 'relative' }}>
                            <Doughnut data={chartData} options={chartOptions} />
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%' }}>
                                <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Total Payable</div>
                                <div style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 800, color: secondaryColor }}>₹ {totalAmount.toLocaleString('en-IN')}</div>
                            </div>
                        </div>

                        <div style={{ width: '100%', marginTop: '40px' }}>
                            <div style={summaryRow}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: primaryColor }}></div>
                                    <span style={summaryLabel}>Principal Amount</span>
                                </div>
                                <span style={summaryValue}>₹ {loanAmount.toLocaleString('en-IN')}</span>
                            </div>
                            <div style={summaryRow}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: accentColor }}></div>
                                    <span style={summaryLabel}>Total Interest</span>
                                </div>
                                <span style={summaryValue}>₹ {totalInterest.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

/* --- Styles (Unchanged) --- */
const inputHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
};

const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 700,
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
};

const valueBoxStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '10px',
    fontWeight: 800,
    border: '1px solid #E2E8F0'
};

const sliderStyle: React.CSSProperties = {
    width: '100%',
    cursor: 'pointer',
    height: '6px',
    borderRadius: '5px'
};

const summaryRow: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 0',
    borderBottom: '1px solid #F1F5F9'
};

const summaryLabel: React.CSSProperties = {
    fontSize: '15px',
    color: '#64748B',
    fontWeight: 500
};

const summaryValue: React.CSSProperties = {
    fontSize: '15px',
    fontWeight: 700,
    color: '#0F172A'
};

export default EMICalculator;