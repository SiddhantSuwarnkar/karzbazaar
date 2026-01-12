import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Landmark, ShieldCheck, Zap, Activity 
} from 'lucide-react';
import { type LoanProduct } from '../mockData';
import Navbar from '../components/Navbar';

const LoanDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve the specific loan object passed from the Compare/Recommendation page
  const selectedLoan: LoanProduct = location.state?.loan;

  // Handle case where user navigates directly to /info without state
  if (!selectedLoan) {
    return (
      <div style={{ height: '100vh', width: '100vw', backgroundColor: '#F1F5F9', display: 'flex', flexDirection: 'column' }}>
        <Navbar title="Loan Product Analysis" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter' }}>
          <h2 style={{ color: '#0F172A' }}>No loan selected</h2>
          <button 
            onClick={() => navigate('/recommendations')} 
            style={{ marginTop: '20px', padding: '12px 24px', backgroundColor: '#38BDF8', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
          >
            Go to Recommendations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100vw', backgroundColor: '#F1F5F9', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', sans-serif", overflow: 'hidden' }}>
      
      {/* UNIFIED NAVBAR */}
      <Navbar 
        title="Loan Product Analysis" 
        backAction={() => navigate(-1)} 
      />

      {/* TWO-COLUMN LAYOUT */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        
        {/* LEFT SIDEBAR - Bank Brand Identity */}
        <div style={{ 
          width: '400px', backgroundColor: '#1E293B', color: 'white', display: 'flex', flexDirection: 'column', 
          alignItems: 'center', justifyContent: 'center', padding: '60px', textAlign: 'center', flexShrink: 0, boxShadow: '4px 0 15px rgba(0,0,0,0.1)' 
        }}>
          <div style={{ backgroundColor: '#334155', padding: '30px', borderRadius: '32px', marginBottom: '24px', border: '1px solid #475569' }}>
            <Landmark size={64} color="#38BDF8" />
          </div>
          <h2 style={{ fontSize: '32px', color: '#F8FAFC', fontWeight: 800, margin: '0 0 12px 0' }}>{selectedLoan.bank}</h2>
          <div style={{ height: '3px', width: '60px', backgroundColor: '#38BDF8', marginBottom: '20px', borderRadius: '2px' }}></div>
          <p style={{ fontSize: '16px', color: '#94A3B8', fontWeight: 500, lineHeight: 1.6, maxWidth: '280px' }}>
            Personalized breakdown for your requested loan of {selectedLoan.total}.
          </p>
        </div>

        {/* SCROLLABLE MAIN SECTION - Details */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '60px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div style={{ 
            width: '100%', maxWidth: '900px', backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '50px', 
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '45px', marginBottom: '40px' 
          }}>
            
            {/* TOP SECTION: COST & ELIGIBILITY */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2px 1fr', gap: '50px' }}>
              <div>
                <h3 style={{ fontSize: '14px', color: '#0F172A', marginBottom: '24px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={18} color="#0284C7" /> Core Cost
                </h3>
                <DetailRow label="Interest Rate" value={selectedLoan.rate} color="#0284C7" />
                <DetailRow label="Monthly EMI" value={selectedLoan.emi} />
                <DetailRow label="Total Interest" value={selectedLoan.totalInterest} />
                <DetailRow label="Processing Fee" value={selectedLoan.processingFee} />
              </div>

              <div style={{ backgroundColor: '#F1F5F9' }}></div>

              <div>
                <h3 style={{ fontSize: '14px', color: '#0F172A', marginBottom: '24px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="#059669" /> Qualification
                </h3>
                <DetailRow label="Loan Tenure" value={selectedLoan.tenure} />
                <DetailRow label="Total Payment" value={selectedLoan.totalPayment} />
                <DetailRow label="Approval Time" value={selectedLoan.approvalTime} color="#059669" />
                <DetailRow label="Insurance" value={selectedLoan.insurance} />
              </div>
            </div>

            {/* MIDDLE SECTION: POLICY BLOCKS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
              <PolicySection title="Flexibility" icon={<Zap size={16} color="#0284C7"/>}>
                <SmallRow label="Prepayment" value={selectedLoan.prepayment} />
                <SmallRow label="Foreclosure" value="Available" />
                <SmallRow label="Part Pay" value="Supported" />
              </PolicySection>

              <PolicySection title="Risk Profile" icon={<ShieldCheck size={16} color="#DC2626"/>}>
                <SmallRow label="Rejection Prob." value={selectedLoan.rejectionProb} />
                <SmallRow label="Risk Status" value={selectedLoan.isRecommended ? "Safe" : "High"} />
                <SmallRow label="Rate Type" value="Fixed" />
              </PolicySection>

              <PolicySection title="Features" icon={<Activity size={16} color="#059669"/>}>
                {selectedLoan.features.map((f, i) => (
                    <SmallRow key={i} label="Feature" value={f} />
                ))}
              </PolicySection>
            </div>

            {/* FOOTER: REASONING & CTA */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px', backgroundColor: '#F8FAFC', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
              <div style={{ maxWidth: '65%' }}>
                <h4 style={{ color: '#0F172A', margin: '0 0 10px 0', fontSize: '15px', fontWeight: 800 }}>Expert Analysis</h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#64748B', lineHeight: 1.6 }}>
                  {selectedLoan.riskReason} 
                </p>
              </div>

              <button style={{ 
                backgroundColor: '#0284C7', color: 'white', border: 'none', padding: '16px 45px', borderRadius: '12px', 
                fontWeight: 700, fontSize: '16px', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)' 
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- MINI HELPER COMPONENTS --- */

const DetailRow = ({ label, value, color = "#334155" }: { label: string, value: string, color?: string }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px', paddingBottom: '8px', borderBottom: '1px solid #F8FAFC' }}>
    <span style={{ color: '#64748B', fontSize: '14px', fontWeight: 500 }}>{label}</span>
    <span style={{ color: color, fontWeight: 700, fontSize: '15px' }}>{value}</span>
  </div>
);

const SmallRow = ({ label, value }: { label: string, value: string }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
    <span style={{ color: '#94A3B8', fontSize: '12px', fontWeight: 500 }}>{label}</span>
    <span style={{ color: '#475569', fontWeight: 700, fontSize: '12px', textAlign: 'right' }}>{value}</span>
  </div>
);

const PolicySection = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
  <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '20px', borderRadius: '16px' }}>
    <h4 style={{ fontSize: '14px', color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
      {icon} {title}
    </h4>
    {children}
  </div>
);

export default LoanDetails;