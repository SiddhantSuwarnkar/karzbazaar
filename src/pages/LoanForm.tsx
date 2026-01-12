import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Landmark, Zap, ShieldCheck } from 'lucide-react';

const LoanForm: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    loanType: '',
    amount: '',
    tenure: '',
    purpose: '',
    preferredEmi: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Passing formData to the next page via navigation state
    navigate('/recommendations', { state: { loanRequest: formData } });
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1px solid #CBD5E1',
    marginTop: '6px',
    fontSize: '16px',
    backgroundColor: '#FFFFFF',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.2s',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    fontWeight: '600',
    color: '#334155',
    marginTop: '16px',
    fontSize: '14px',
    letterSpacing: '0.5px'
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>
      
      {/* LEFT PANEL: Branding & Info */}
      <div style={{ 
        flex: '0.8', 
        backgroundColor: '#0F172A', 
        color: 'white', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '0 60px',
        position: 'relative'
      }}>
        <div 
          style={{ position: 'absolute', top: '40px', left: '60px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} 
          onClick={() => navigate('/')}
        >
          <span style={{ fontWeight: 800, fontSize: '24px', color: '#38BDF8' }}>KarzBazaar</span>
        </div>
        
        <h1 style={{ fontSize: '42px', fontWeight: 800, lineHeight: '1.1', marginBottom: '20px' }}>
          Find the Perfect <br/> Loan for Your Needs.
        </h1>
        <p style={{ fontSize: '16px', color: '#94A3B8', lineHeight: '1.6', maxWidth: '380px', marginBottom: '40px' }}>
          Our AI-driven engine compares interest rates across 10+ partner banks to find the best match for your credit profile.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ padding: '10px', background: '#1E293B', borderRadius: '12px', color: '#38BDF8' }}><Landmark size={24}/></div>
            <div>
                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>10+ Partner Banks</div>
                <div style={{ fontSize: '13px', color: '#64748B' }}>Direct tie-ups with major lenders</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ padding: '10px', background: '#1E293B', borderRadius: '12px', color: '#38BDF8' }}><Zap size={24}/></div>
            <div>
                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Instant Eligibility</div>
                <div style={{ fontSize: '13px', color: '#64748B' }}>Know your approval odds in seconds</div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Main Form Area */}
      <div style={{ 
        flex: '1.5', 
        backgroundColor: '#F8FAFC', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '20px'
      }}>
        <div style={{ width: '100%', maxWidth: '750px', marginBottom: '20px' }}>
            <button 
                onClick={() => navigate(-1)}
                style={{ background: 'none', border: 'none', color: '#64748B', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontWeight: 600 }}
            >
                <ArrowLeft size={16}/> Back
            </button>
        </div>

        <div style={{ 
          width: '100%', 
          maxWidth: '750px', 
          padding: '48px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
          maxHeight: '85vh',
          overflowY: 'auto'
        }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0' }}>Loan Requirements</h2>
            <p style={{ color: '#64748B', fontSize: '15px' }}>Help us personalize your recommendation by providing the details below.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
              
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Loan Type</label>
                {/* Removed 'required' */}
                <select name="loanType" value={formData.loanType} onChange={handleChange} style={inputStyle}>
                  <option value="">Select loan type</option>
                  <option value="personal">Personal Loan</option>
                  <option value="home">Home Loan</option>
                  <option value="car">Car Loan</option>
                  <option value="education">Education Loan</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Loan amount requested (₹)</label>
                {/* Removed 'required' */}
                <input name="amount" type="number" placeholder="e.g. 500000" value={formData.amount} onChange={handleChange} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Loan tenure (Years)</label>
                {/* Removed 'required' */}
                <input name="tenure" type="text" placeholder="e.g. 5" value={formData.tenure} onChange={handleChange} style={inputStyle} />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Purpose of loan</label>
                {/* Removed 'required' */}
                <textarea 
                  name="purpose" 
                  placeholder="Tell us what you need the funds for..." 
                  value={formData.purpose} 
                  onChange={handleChange} 
                  style={{ ...inputStyle, minHeight: '100px', resize: 'none', paddingTop: '12px' }} 
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Preferred Monthly EMI (₹)</label>
                {/* Removed 'required' */}
                <input name="preferredEmi" type="number" placeholder="Your budget per month" value={formData.preferredEmi} onChange={handleChange} style={inputStyle} />
              </div>

            </div>

            <button 
              type="submit"
              style={{
                width: '100%',
                padding: '18px',
                backgroundColor: '#38BDF8',
                color: '#0F172A',
                fontSize: '16px',
                fontWeight: 700,
                borderRadius: '14px',
                border: 'none',
                marginTop: '40px',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(56, 189, 248, 0.2)',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#0EA5E9';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#38BDF8';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <ShieldCheck size={20} /> Generate Recommendation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoanForm;