import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, UserCircle, ChevronDown, User } from 'lucide-react';

interface NavbarProps {
    title: string | React.ReactNode;
    backAction?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ title, backAction }) => {
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Get current user data from localStorage
    const savedUser = localStorage.getItem('user');
    const userData = savedUser ? JSON.parse(savedUser) : { fullName: "Guest User" };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleBack = () => {
        if (backAction) {
            backAction();
        } else {
            navigate(-1);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/'; 
    };

    return (
        <div style={{ 
            // GRID LAYOUT: 1fr (Left) - auto (Center) - 1fr (Right)
            // This forces the center element to be exactly in the middle of the screen
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr', 
            alignItems: 'center', 
            
            padding: isMobile ? '15px 20px' : '10px 40px', 
            backgroundColor: '#0F172A', 
            color: 'white', 
            flexShrink: 0,
            position: 'relative',
            zIndex: 1100,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            height: '60px' 
        }}>
            
            {/* LEFT COLUMN: Back Button */}
            <div 
                style={{ justifySelf: 'start', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} 
                onClick={handleBack}
            >
                <ArrowLeft size={18} color="#38BDF8" />
                {!isMobile && <span style={{ fontSize: '14px', fontWeight: 500 }}>Back</span>}
            </div>

            {/* CENTER COLUMN: Title */}
            <div style={{ justifySelf: 'center', textAlign: 'center', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                <h1 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 700, margin: 0 }}>
                    {title}
                </h1>
            </div>

            {/* RIGHT COLUMN: Profile Menu */}
            <div style={{ justifySelf: 'end', position: 'relative' }}>
                <div 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px', 
                        cursor: 'pointer', 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                        padding: '6px 12px', 
                        borderRadius: '50px',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <div style={{ 
                        width: '32px', 
                        height: '32px', 
                        borderRadius: '50%', 
                        backgroundColor: '#38BDF8', 
                        color: '#0F172A', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontWeight: 'bold', 
                        fontSize: '14px', 
                        overflow: 'hidden' 
                    }}>
                        {userData?.fullName ? userData.fullName.charAt(0).toUpperCase() : <User size={16} />}
                    </div>

                    {!isMobile && (
                        <span style={{ fontWeight: 700, color: 'white', fontSize: '15px' }}>
                            {userData?.fullName}
                        </span>
                    )}
                    
                    <ChevronDown size={18} color="white" style={{ transform: showProfileMenu ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                </div>

                {showProfileMenu && (
                    <div style={{ 
                        position: 'absolute', top: '50px', right: 0, width: '200px', 
                        backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                        padding: '8px', border: '1px solid #E2E8F0', color: '#0F172A', zIndex: 1200 
                    }}>
                        <div 
                            onClick={() => navigate('/profile')} 
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', borderRadius: '8px', cursor: 'pointer', color: '#4A5568', fontWeight: 600 }}
                        >
                            <UserCircle size={18} /> My Profile
                        </div>
                        <hr style={{ border: 'none', borderTop: '1px solid #EDF2F7', margin: '4px 0' }} />
                        <div 
                            onClick={handleLogout} 
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', borderRadius: '8px', cursor: 'pointer', color: '#EF4444', fontWeight: 600 }}
                        >
                            <LogOut size={18} /> Sign Out
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;