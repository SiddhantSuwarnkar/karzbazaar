import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, Mail, UserPlus, ShieldCheck, ArrowRight } from 'lucide-react';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Creating account for:", formData);
    navigate('/recommendations'); 
  };

  // Reusable Styles
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 16px 10px 42px',
    borderRadius: '12px',
    border: '1px solid #E2E8F0',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: 'white', // Explicit white for cross-device consistency
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: '#4A5568',
    marginBottom: '6px'
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#A0AEC0'
  };

  const eyeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    right: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#A0AEC0',
    display: 'flex',
    padding: 0
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100vw', 
      backgroundColor: '#F4F7FA', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      fontFamily: "'Inter', sans-serif",
      overflowX: 'hidden',
      overflowY: 'auto', // Allows scrolling only if screen height is very small
      padding: isMobile ? '20px 0' : '0'
    }}>
      <div style={{
        width: '90%', // Mobile friendly width
        maxWidth: '420px', // Original laptop width
        backgroundColor: 'white',
        padding: isMobile ? '24px 20px' : '32px 40px',
        borderRadius: '28px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}>
        {/* LOGO & HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ 
            display: 'inline-flex', 
            padding: '10px', 
            backgroundColor: '#F0FFF4', 
            borderRadius: '14px',
            marginBottom: '12px',
            color: '#2F855A'
          }}>
            <UserPlus size={24} />
          </div>
          <h1 style={{ fontSize: isMobile ? '22px' : '24px', fontWeight: 800, color: '#1A365D', margin: '0' }}>Join KarzBazaar</h1>
          <p style={{ color: '#718096', fontSize: '13px', marginTop: '6px' }}>Start your journey toward the best loan offers</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* FULL NAME */}
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={iconStyle} />
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                required
                value={formData.fullName}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          {/* EMAIL */}
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={iconStyle} />
              <input
                type="email"
                name="email"
                placeholder="name@company.com"
                required
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Create Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={iconStyle} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={eyeButtonStyle}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <ShieldCheck size={16} style={iconStyle} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={eyeButtonStyle}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* SIGN UP BUTTON */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#2F855A',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#276749')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2F855A')}
          >
            Create Account <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#718096' }}>
          Already have an account? {' '}
          <span 
            onClick={() => navigate('/login')} 
            style={{ color: '#3182CE', fontWeight: 700, cursor: 'pointer' }}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;