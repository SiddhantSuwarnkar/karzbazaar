import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { authUsers } from '../mockData'; 

// 1. Defined interface for the component props
interface LoginProps {
  onLogin: () => void;
}

// 2. Applied React.FC with LoginProps
const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); 
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(''); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // AUTHENTICATION LOGIC
    const user = authUsers.find(
      (u) => u.username === formData.username && u.password === formData.password
    );

    if (user) {
      // Create user session in LocalStorage
      const userSession = {
        fullName: user.fullName,
        email: user.email,
        isLoggedIn: true,
        profileImage: (user as any).profileImage || null 
      };

      localStorage.setItem('user', JSON.stringify(userSession));
      
      // 3. Trigger the global auth state change in App.tsx
      onLogin(); 
      
      // 4. Redirect to Dashboard
      navigate('/'); 
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw', 
      backgroundColor: '#F4F7FA', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        width: '400px',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '28px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* LOGO & HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            display: 'inline-flex', 
            padding: '12px', 
            backgroundColor: '#EBF4FF', 
            borderRadius: '16px',
            marginBottom: '16px',
            color: '#1A365D'
          }}>
            <Lock size={28} />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1A365D', margin: '0' }}>KarzBazaar</h1>
          <p style={{ color: '#718096', fontSize: '14px', marginTop: '8px' }}>Access your personalized loan offers</p>
        </div>

        {/* ERROR MESSAGE BOX */}
        {error && (
          <div style={{ 
            color: '#E53E3E', 
            backgroundColor: '#FFF5F5', 
            padding: '10px', 
            borderRadius: '8px', 
            fontSize: '13px', 
            textAlign: 'center',
            marginBottom: '15px',
            fontWeight: 500
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* USERNAME FIELD */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4A5568', marginBottom: '8px' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User 
                size={18} 
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#A0AEC0' }} 
              />
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                required
                value={formData.username}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  borderRadius: '12px',
                  border: error ? '1px solid #FC8181' : '1px solid #E2E8F0',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
          </div>

          {/* PASSWORD FIELD */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4A5568', marginBottom: '8px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock 
                size={18} 
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#A0AEC0' }} 
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 42px',
                  borderRadius: '12px',
                  border: error ? '1px solid #FC8181' : '1px solid #E2E8F0',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#A0AEC0',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#1A365D',
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
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2C5282')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#1A365D')}
          >
            Login to Account <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#718096' }}>
          New to KarzBazaar? {' '}
          <span 
            onClick={() => navigate('/signup')} 
            style={{ color: '#3182CE', fontWeight: 700, cursor: 'pointer' }}
          >
            Create Account
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;