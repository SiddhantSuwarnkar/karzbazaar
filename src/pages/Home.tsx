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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    if (isAuth) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) setUserData(JSON.parse(savedUser));
    }
    
    return () => window.removeEventListener('resize', handleResize);
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
        
        {/* NAVBAR - Kept Transparent Style */}
        <nav style={{ 
          padding: isMobile ? '15px 20px' : '20px 60px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.1)', // Your original transparency
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h1 style={{ 
            fontSize: isMobile ? '24px' : '32px', 
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
                <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#1A365D', fontWeight: 700, cursor: 'pointer', fontSize: isMobile ? '14px' : '16px' }}>Login</button>
                <button onClick={() => navigate('/signup')} style={{ backgroundColor: '#1A365D', color: 'white', padding: isMobile ? '8px 16px' : '10px 24px', borderRadius: '12px', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Sign Up</button>
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
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ 
                    width: '32px', height: '32px', borderRadius: '50%', 
                    backgroundColor: '#1A365D', color: 'white', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    fontWeight: 'bold', fontSize: '14px' 
                  }}>
                    {userData?.fullName ? userData.fullName.charAt(0).toUpperCase() : <User size={16} />}
                  </div>
                  {!isMobile && <span style={{ fontWeight: 700, color: '#1A365D', fontSize: '15px' }}>{userData?.fullName || "User"}</span>}
                  <ChevronDown size={18} color="#1A365D" style={{ transform: showDropdown ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                </div>

                {showDropdown && (
                  <div style={{ 
                    position: 'absolute', top: '120%', right: 0, width: '180px', 
                    backgroundColor: 'white', borderRadius: '16px', 
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '8px', zIndex: 1000 
                  }}>
                    <div onClick={() => navigate('/profile')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', borderRadius: '8px', cursor: 'pointer', color: '#4A5568', fontWeight: 600 }}>
                      <User size={18} /> Profile
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid #EDF2F7', margin: '4px 0' }} />
                    <div onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', borderRadius: '8px', cursor: 'pointer', color: '#E53E3E', fontWeight: 600 }}>
                      <LogOut size={18} /> Sign Out
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Main Content Area */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: isMobile ? 'center' : 'flex-start', 
          padding: isMobile ? '20px' : '0 60px 40px 60px' 
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '20px', 
            width: '100%', 
            maxWidth: '380px', // Prevents buttons from getting too wide on desktop
            alignItems: isMobile ? 'center' : 'flex-start'
          }}>
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
                  width: '100%', // Flexible width
                  padding: '22px', 
                  backgroundColor: index === 3 ? '#805AD5' : '#3B82F6', 
                  color: 'white', 
                  fontSize: isMobile ? '18px' : '20px', 
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
                onMouseOver={(e) => !isMobile && (e.currentTarget.style.transform = 'translateY(-5px)')}
                onMouseOut={(e) => !isMobile && (e.currentTarget.style.transform = 'translateY(0)')}
              >
                {item.icon} {item.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;