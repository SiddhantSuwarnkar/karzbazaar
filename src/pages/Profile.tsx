import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, User, Mail, Phone, 
    Briefcase, Landmark, ChevronRight, 
    ChevronLeft, IndianRupee, CreditCard,
    Camera, Calendar, MapPin, Upload, FileText, Check, Building, Menu, X
} from 'lucide-react';

// Importing mock data
import { authUsers } from '../mockData';

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const loggedInUsername = localStorage.getItem('username') || 'user1'; 
    const userData = authUsers.find(user => user.username === loggedInUsername) || authUsers[0];

    const sections = [
        { id: 1, name: "Identification", icon: <User size={18} /> },
        { id: 2, name: "Contact", icon: <Phone size={18} /> },
        { id: 3, name: "Employment", icon: <Briefcase size={18} /> },
        { id: 4, name: "Financials", icon: <Landmark size={18} /> },
    ];

    const nextStep = () => { if (currentStep < 4) setCurrentStep(currentStep + 1); };
    const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

    return (
        <div style={{ height: '100vh', width: '100vw', backgroundColor: 'white', display: 'flex', flexDirection: isMobile ? 'column' : 'row', fontFamily: "'Inter', sans-serif", overflow: 'hidden' }}>
            
            {/* SIDEBAR (Desktop) */}
            {!isMobile ? (
                <div style={{ width: '320px', backgroundColor: '#0F172A', color: 'white', display: 'flex', flexDirection: 'column', padding: '40px 24px', borderRight: '1px solid #1E293B' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '48px' }}>
                        <span style={{ fontWeight: 800, fontSize: '24px', color: '#38BDF8', letterSpacing: '-0.5px' }}>KarzBazaar</span>
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div style={{ position: 'relative', width: '90px', height: '90px', margin: '0 auto 16px' }}>
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '2px solid #38BDF8', backgroundColor: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38BDF8' }}>
                                <User size={42} />
                            </div>
                            <div style={{ position: 'absolute', bottom: '0', right: '0', backgroundColor: '#38BDF8', borderRadius: '50%', padding: '5px', border: '2px solid #0F172A', color: '#0F172A' }}>
                                <Camera size={14} />
                            </div>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '18px' }}>{userData.fullName}</div>
                        <div style={{ color: '#64748B', fontSize: '13px', marginTop: '4px' }}>Applicant ID: #77120</div>
                    </div>

                    <nav style={{ flex: 1 }}>
                        <div style={{ fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Application Steps</div>
                        {sections.map((section) => (
                            <div key={section.id} onClick={() => setCurrentStep(section.id)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '12px', marginBottom: '8px', cursor: 'pointer', backgroundColor: currentStep === section.id ? '#1E293B' : 'transparent', color: currentStep === section.id ? '#38BDF8' : '#94A3B8', transition: 'all 0.2s' }}>
                                {section.icon}
                                <span style={{ fontSize: '14px', fontWeight: 600 }}>{section.name}</span>
                            </div>
                        ))}
                    </nav>
                </div>
            ) : (
                /* Mobile Navigation Bar */
                <div style={{ backgroundColor: '#0F172A', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', zIndex: 1100 }}>
                    <span style={{ fontWeight: 800, fontSize: '20px', color: '#38BDF8' }}>KarzBazaar</span>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', color: 'white' }}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            )}

            {/* Mobile Dropdown Menu */}
            {isMobile && mobileMenuOpen && (
                <div style={{ backgroundColor: '#1E293B', padding: '10px 20px', position: 'absolute', top: '55px', left: 0, right: 0, zIndex: 1000, borderBottom: '2px solid #38BDF8' }}>
                    {sections.map((section) => (
                        <div key={section.id} onClick={() => { setCurrentStep(section.id); setMobileMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px 0', color: currentStep === section.id ? '#38BDF8' : '#94A3B8', borderBottom: '1px solid #2D3748' }}>
                            {section.icon}
                            <span style={{ fontSize: '14px', fontWeight: 600 }}>{section.name}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* MAIN CONTENT AREA */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                <header style={{ padding: isMobile ? '15px 20px' : '24px 48px', backgroundColor: 'white', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
                    <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontWeight: 600 }} onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        {!isMobile && <span style={{ fontSize: '14px' }}>Back</span>}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>Step {currentStep} of 4</div>
                            {!isMobile && <div style={{ fontSize: '11px', color: '#38BDF8', fontWeight: 600 }}>{currentStep * 25}% Completed</div>}
                        </div>
                        <div style={{ width: isMobile ? '80px' : '160px', height: '6px', backgroundColor: '#F1F5F9', borderRadius: '10px' }}>
                            <div style={{ width: `${currentStep * 25}%`, height: '100%', backgroundColor: '#38BDF8', borderRadius: '10px', transition: 'width 0.4s ease' }} />
                        </div>
                    </div>
                </header>

                <main style={{ flex: 1, padding: isMobile ? '20px' : '30px 80px' }}>
                    <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
                        {currentStep === 1 && <IdentificationSection user={userData} isMobile={isMobile} />}
                        {currentStep === 2 && <ContactSection user={userData} isMobile={isMobile} />}
                        {currentStep === 3 && <EmploymentSection isMobile={isMobile} />}
                        {currentStep === 4 && <FinancialsSection isMobile={isMobile} />}

                        <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '20px', marginTop: '40px', paddingBottom: '60px' }}>
                            <button onClick={prevStep} disabled={currentStep === 1} style={secondaryBtnStyle(currentStep === 1)}>
                                <ChevronLeft size={18} /> Previous
                            </button>
                            <button onClick={currentStep === 4 ? () => navigate('/') : nextStep} style={primaryBtnStyle}>
                                {currentStep === 4 ? 'Submit Application' : 'Next Step'} <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

/* --- FORM SECTIONS (RETAINING ORIGINAL CONTENT) --- */

const IdentificationSection = ({ user, isMobile }: { user: any, isMobile: boolean }) => (
    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <h2 style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>Section 1: Applicant Identification</h2>
        <p style={{ color: '#64748B', marginBottom: '32px' }}>Provide your legal identification details as per government records.</p>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? '15px' : '24px 40px' }}>
            <InputField label="Full Name" defaultValue={user.fullName} icon={<User size={16}/>} />
            
            <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Date of Birth</label>
                <div style={inputContainerStyle}>
                    <Calendar size={16} color="#94A3B8" />
                    <input type="date" defaultValue="1992-05-15" style={rawInputStyle} />
                </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Gender</label>
                <select style={selectStyle} defaultValue="Female">
                    <option>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            
            <InputField label="PAN Number" defaultValue="ABCDE1234F" icon={<FileText size={16}/>} />
            
            <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Marital Status</label>
                <select style={selectStyle} defaultValue="Single">
                    <option>Select Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                </select>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Identity Verification</label>
                <div style={{ border: '2px dashed #E2E8F0', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <Upload size={18} color="#94A3B8" />
                    <span style={{ fontSize: '14px', color: '#64748B' }}>Upload PAN Card Copy</span>
                </div>
            </div>
        </div>
    </div>
);

const ContactSection = ({ user, isMobile }: { user: any, isMobile: boolean }) => {
    const [isSameAddress, setIsSameAddress] = useState(false);

    return (
        <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <h2 style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>Section 2: Contact Information</h2>
            <p style={{ color: '#64748B', marginBottom: '32px' }}>We will use these details for communication and verification.</p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '15px' : '24px 40px' }}>
                <InputField label="Mobile Number" defaultValue="+91 98765 43210" icon={<Phone size={16}/>} />
                <InputField label="Email Address" defaultValue={user.email} icon={<Mail size={16}/>} />
                <div style={{ gridColumn: isMobile ? 'span 1' : 'span 2' }}>
                    <InputField label="Current Residential Address" defaultValue="123, Skyline Apartments, Hitech City, Hyderabad - 500081" icon={<MapPin size={16}/>} />
                </div>
                
                <div style={{ gridColumn: isMobile ? 'span 1' : 'span 2', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '-10px', marginBottom: '10px' }}>
                    <div onClick={() => setIsSameAddress(!isSameAddress)} style={{ width: '20px', height: '20px', borderRadius: '6px', border: '2px solid #38BDF8', backgroundColor: isSameAddress ? '#38BDF8' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {isSameAddress && <Check size={14} color="#0F172A" strokeWidth={3} />}
                    </div>
                    <span style={{ fontSize: '14px', color: '#475569', fontWeight: 500 }}>Permanent address is same as current</span>
                </div>

                {!isSameAddress && (
                    <div style={{ gridColumn: isMobile ? 'span 1' : 'span 2' }}>
                        <InputField label="Permanent Address" defaultValue="Plot 45, Gandhi Nagar, New Delhi - 110001" icon={<MapPin size={16}/>} />
                    </div>
                )}
            </div>
        </div>
    );
};

const EmploymentSection = ({ isMobile }: { isMobile: boolean }) => (
    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <h2 style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>Section 3: Employment Details</h2>
        <p style={{ color: '#64748B', marginBottom: '32px' }}>Details regarding your professional life and income source.</p>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '15px' : '24px 40px' }}>
            <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Employment Type</label>
                <select style={selectStyle} defaultValue="Salaried (Job)">
                    <option>Select Type</option>
                    <option value="Salaried (Job)">Salaried (Job)</option>
                    <option value="Self-Employed (Business)">Self-Employed (Business)</option>
                    <option value="Freelancer">Freelancer</option>
                </select>
            </div>
            <InputField label="Employer / Business Name" defaultValue="Microsoft India Pvt Ltd" icon={<Briefcase size={16}/>} />
            <InputField label="Work Experience (Years/Months)" defaultValue="4 Years 6 Months" icon={<Calendar size={16}/>} />
            <InputField label="Office Address" defaultValue="Gachibowli Financial District, Hyderabad" icon={<MapPin size={16}/>} />
        </div>
    </div>
);

const FinancialsSection = ({ isMobile }: { isMobile: boolean }) => (
    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <h2 style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>Section 4: Income and Financials</h2>
        <p style={{ color: '#64748B', marginBottom: '32px' }}>Final step to determine your loan limit and disbursement account.</p>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '15px' : '24px 40px' }}>
            <InputField label="Monthly Income" defaultValue="₹ 1,20,000" icon={<IndianRupee size={16}/>} />
            <InputField label="Bank Name" defaultValue="KDFC Bank" icon={<Building size={16}/>} />
            <InputField label="Bank Account Number" defaultValue="50100234567890" icon={<CreditCard size={16}/>} />
            <InputField label="IFSC Code" defaultValue="KDFC0001234" icon={<Landmark size={16}/>} />
            <div style={{ gridColumn: isMobile ? 'span 1' : 'span 2', marginBottom: '24px' }}>
                <label style={labelStyle}>Document Upload (Latest Salary Slip/ITR)</label>
                <div style={{ border: '2px dashed #38BDF8', padding: '16px', borderRadius: '14px', backgroundColor: '#F0F9FF', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <Upload size={24} color="#0EA5E9" />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#0369A1' }}>Click to upload files (PDF, JPG)</span>
                </div>
            </div>
        </div>
    </div>
);

/* --- SHARED STYLES & COMPONENTS --- */
const labelStyle = { display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '10px' };
const inputContainerStyle = { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px' };
const rawInputStyle = { border: 'none', backgroundColor: 'transparent', outline: 'none', width: '100%', fontSize: '15px', color: '#1E293B' };
const selectStyle = { width: '100%', padding: '14px 18px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', outline: 'none', fontSize: '15px', color: '#1E293B' };

const InputField = ({ label, icon, defaultValue }: any) => (
    <div style={{ marginBottom: '24px' }}>
        <label style={labelStyle}>{label}</label>
        <div style={inputContainerStyle}>
            {icon && <span style={{ color: '#94A3B8' }}>{icon}</span>}
            <input type="text" defaultValue={defaultValue} style={rawInputStyle} />
        </div>
    </div>
);

const primaryBtnStyle = {
    padding: '14px 40px', borderRadius: '14px', border: 'none', backgroundColor: '#0F172A', color: '#38BDF8', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px'
};

const secondaryBtnStyle = (disabled: boolean) => ({
    padding: '14px 30px', borderRadius: '14px', border: '1px solid #E2E8F0', backgroundColor: 'white', color: disabled ? '#CBD5E1' : '#475569', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px'
});

export default ProfilePage;