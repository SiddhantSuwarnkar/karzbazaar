import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, ChevronDown, Calculator } from 'lucide-react';
import backgroundVideo from '../assets/My Video.mp4';

interface HomeProps {
  isAuth: boolean;
}

const Home: React.FC<HomeProps> = ({ isAuth }) => {
  const navigate = useNavigate();
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState<{fullName: string, profileImage?: string} | null>(null);

  useEffect(() => {
    if (isAuth) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUserData(JSON.parse(savedUser));
      }
    } else {
      setUserData(null);
    }
  }, [isAuth]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload(); 
  };

  const handleProtectedAction = (route: string) => {
    if (isAuth) {
      navigate(route);
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: '#F0F5FA',
      fontFamily: "'Inter', sans-serif"
    }}>
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        
        {/* NAVBAR */}
        <nav style={{ 
          padding: '20px 60px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '900', 
            color: '#1A365D', 
            margin: 0, 
            letterSpacing: '-1px',
            textShadow: '0 2px 4px rgba(255,255,255,0.3)'
          }}>
            KarzBazaar
          </h1>

          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {!isAuth ? (
              <>
                <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#1A365D', fontWeight: 700, cursor: 'pointer', fontSize: '16px' }}>Login</button>
                <button onClick={() => navigate('/signup')} style={{ backgroundColor: '#1A365D', color: 'white', padding: '10px 24px', borderRadius: '12px', border: 'none', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(26, 54, 93, 0.3)' }}>Sign Up</button>
              </>
            ) : (
              <div style={{ position: 'relative' }}>
                <div 
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer', 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    padding: '6px 16px', 
                    borderRadius: '50px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    backgroundColor: '#1A365D', 
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontWeight: 'bold', 
                    fontSize: '14px', 
                    overflow: 'hidden' 
                  }}>
                    {userData?.fullName ? userData.fullName.charAt(0).toUpperCase() : <User size={16} />}
                  </div>

                  <span style={{ fontWeight: 700, color: '#1A365D', fontSize: '15px' }}>
                    {userData?.fullName || "User"}
                  </span>
                  
                  <ChevronDown size={18} color="#1A365D" style={{ transform: showDropdown ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                </div>

                {showDropdown && (
                  <div style={{ 
                    position: 'absolute', 
                    top: '120%', 
                    right: 0, 
                    width: '180px', 
                    backgroundColor: 'white', 
                    borderRadius: '16px', 
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
                    padding: '8px', 
                    zIndex: 1000 
                  }}>
                    <div 
                      onClick={() => navigate('/profile')} 
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', borderRadius: '8px', cursor: 'pointer', color: '#4A5568', fontWeight: 600 }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7FAFC'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <User size={18} /> Profile
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid #EDF2F7', margin: '4px 0' }} />
                    <div 
                      onClick={handleLogout} 
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', borderRadius: '8px', cursor: 'pointer', color: '#E53E3E', fontWeight: 600 }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF5F5'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <LogOut size={18} /> Sign Out
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Main Content Area - Shifted to Left */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0 60px 40px 60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%', maxWidth: '1200px' }}>
    
            <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
              {[
                { text: 'Apply For New Loan', route: '/form', protected: true },
                { text: 'Transfer Loan', route: '/form', protected: true },
                { text: 'Current Loan', route: '/active', protected: true },
                { text: 'EMI Calculator', route: '/emicalculator', icon: <Calculator size={22} />, protected: false }
              ].map((item, index) => (
                <button 
                  key={index} 
                  onClick={() => item.protected ? handleProtectedAction(item.route) : navigate(item.route)} 
                  style={{ 
                    width: '380px', 
                    padding: '22px', 
                    backgroundColor: index === 3 ? '#805AD5' : '#3B82F6', 
                    color: 'white', 
                    fontSize: '20px', 
                    fontWeight: 'bold', 
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '12px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {item.icon} {item.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;