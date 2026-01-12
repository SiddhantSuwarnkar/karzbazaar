import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loanProducts } from '../mockData'; 
import Navbar from '../components/Navbar';

interface LoanProduct {
  id: number;
  bank: string;
  total: string;
  rate: string;
  emi: string;
  rejectionProb: string;
  isRecommended: boolean;
  riskReason: string;
  tenure: string;
  processingFee: string;
  features: string[];
  totalInterest?: string;
  totalPayment?: string;
  approvalTime?: string;
  insurance?: string;
  prepayment?: string;
}

const Recommendations: React.FC = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // States
  const [showRejected, setShowRejected] = useState(false);
  const [compareList, setCompareList] = useState<LoanProduct[]>([]);
  const [hoveredRiskId, setHoveredRiskId] = useState<number | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Custom Scroll States
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Data logic
  const loanData: LoanProduct[] = loanProducts;
  const filteredLoans = loanData.filter(loan => loan.isRecommended === !showRejected);
  
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      checkScroll();
    };
    window.addEventListener('resize', handleResize);
    checkScroll();
    return () => window.removeEventListener('resize', handleResize);
  }, [filteredLoans, isTransitioning]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = isMobile ? window.innerWidth * 0.7 : 350;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 500);
    }
  };

  const toggleView = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowRejected(!showRejected);
      setIsTransitioning(false);
      if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    }, 300);
  };

  const onDragStart = (e: React.DragEvent, loan: LoanProduct) => {
    if (!isMobile) e.dataTransfer.setData("loanId", loan.id.toString());
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const loanId = parseInt(e.dataTransfer.getData("loanId"));
    const loan = loanData.find(l => l.id === loanId);
    if (loan && compareList.length < 4 && !compareList.find(item => item.id === loan.id)) {
      setCompareList([...compareList, loan]);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw', backgroundColor: '#F4F7FA', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', sans-serif", overflow: 'hidden', position: 'relative' }}>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media (max-width: 768px) {
          .card-container { padding: 40px 20px !important; }
        }
      `}</style>

      <Navbar title="Loan Recommendations" backAction={() => navigate('/')} />

      {/* COMPARE ZONE */}
      <div style={{ padding: isMobile ? '15px' : '25px 60px', backgroundColor: '#E2E8F0', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', alignItems: 'center', gap: '15px', position: 'relative', zIndex: 15 }}>
        <div onDrop={onDrop} onDragOver={(e) => e.preventDefault()} style={{ display: 'flex', gap: '8px', backgroundColor: 'rgba(255,255,255,0.6)', padding: isMobile ? '8px 15px' : '12px 24px', borderRadius: '40px', border: '2px dashed #1A365D', overflowX: 'auto', maxWidth: '90vw' }}>
          {[0, 1, 2, 3].map((index) => (
            <div key={index} style={{ 
              minWidth: isMobile ? '80px' : '120px', height: '40px', borderRadius: '20px', 
              backgroundColor: compareList[index] ? '#38BDF8' : '#CBD5E0',
              color: compareList[index] ? '#0F172A' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700,
              transition: '0.2s', cursor: compareList[index] ? 'pointer' : 'default', whiteSpace: 'nowrap'
            }} onClick={() => compareList[index] && setCompareList(compareList.filter(l => l.id !== compareList[index].id))}>
              {compareList[index] ? `${compareList[index].bank.split(' ')[0]} ✕` : isMobile ? '+' : 'Drop Slot'}
            </div>
          ))}
        </div>
        
        {compareList.length >= 2 && (
          <button onClick={() => navigate('/compare', { state: { selectedLoans: compareList } })} style={{ position: isMobile ? 'relative' : 'absolute', right: isMobile ? '0' : '60px', padding: '12px 24px', backgroundColor: '#38BDF8', color: '#0F172A', border: 'none', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', fontSize: '14px', width: isMobile ? '100%' : 'auto' }}>
            PROCEED TO COMPARE →
          </button>
        )}
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, position: 'relative', overflow: 'visible', marginTop: isMobile ? '0' : '-20px', marginBottom: isMobile ? '0' : '-20px', zIndex: 10 }}>
        
        {canScrollLeft && (
          <button onClick={() => scroll('left')} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', zIndex: 100, width: '45px', height: '45px', borderRadius: '50%', border: 'none', backgroundColor: 'white', boxShadow: '0 4px 15px rgba(0,0,0,0.15)', cursor: 'pointer', fontSize: '24px', color: '#1A365D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
        )}
        {canScrollRight && (
          <button onClick={() => scroll('right')} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', zIndex: 100, width: '45px', height: '45px', borderRadius: '50%', border: 'none', backgroundColor: 'white', boxShadow: '0 4px 15px rgba(0,0,0,0.15)', cursor: 'pointer', fontSize: '24px', color: '#1A365D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
        )}

        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="no-scrollbar card-container"
          style={{ height: '100%', display: 'flex', alignItems: 'center', padding: isMobile ? '20px 40px' : '60px 80px 80px', overflowX: 'auto', gap: isMobile ? '25px' : '40px', opacity: isTransitioning ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
        >
          {filteredLoans.map((loan) => {
            const isHovered = hoveredCardId === loan.id;
            return (
              <div 
                key={loan.id} 
                draggable={!isMobile}
                onDragStart={(e) => onDragStart(e, loan)}
                onMouseEnter={() => setHoveredCardId(loan.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                // Mobile tap to expand
                onClick={() => isMobile && setHoveredCardId(hoveredCardId === loan.id ? null : loan.id)}
                style={{
                  minWidth: isMobile ? '270px' : '310px', backgroundColor: 'white', borderRadius: '24px', padding: '28px', position: 'relative', cursor: isMobile ? 'pointer' : 'grab',
                  boxShadow: isHovered ? '0 30px 60px rgba(0,0,0,0.3)' : '0 10px 25px rgba(0,0,0,0.08)',
                  border: loan.id === 1 && loan.isRecommended ? '3px solid #ECC94B' : `2px solid ${loan.isRecommended ? '#48BB78' : '#F56565'}`,
                  transform: isHovered ? (isMobile ? 'scale(1.02)' : 'scale(1.08) translateY(-20px)') : 'scale(1)',
                  transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  zIndex: isHovered ? 1000 : 1,
                }}
              >
                {loan.id === 1 && loan.isRecommended && (
                  <div style={{ position: 'absolute', top: '12px', left: '20px', backgroundColor: '#ECC94B', color: '#744210', padding: '4px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: 800, zIndex: 1001 }}>BEST MATCH</div>
                )}
                
                <div style={{ marginTop: loan.id === 1 && loan.isRecommended ? '10px' : '0' }}>
                  <h3 style={{ margin: '0 0 18px 0', color: '#2D3748', fontSize: isMobile ? '19px' : '22px', fontWeight: 800 }}>{loan.bank}</h3>
                  <div style={{ fontSize: '14px', color: '#4A5568', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total Amount:</span><b style={{color:'#1A202C'}}>{loan.total}</b></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Interest Rate:</span><b style={{color:'#38A169'}}>{loan.rate}</b></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Monthly EMI:</span><b style={{color:'#1A202C'}}>{loan.emi}</b></div>
                  </div>

                  {/* THE EXPANDING SECTION - KEPT INTACT */}
                  <div style={{ maxHeight: isHovered ? '400px' : '0', overflow: 'hidden', transition: 'all 0.5s ease', marginTop: isHovered ? '15px' : '0', opacity: isHovered ? 1 : 0, borderTop: isHovered ? '1px solid #EDF2F7' : 'none', paddingTop: isHovered ? '15px' : '0' }}>
                    <div style={{ fontSize: '13px', color: '#718096', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span>Tenure:</span><span style={{ fontWeight: 600, color: '#2D3748' }}>{loan.tenure}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span>Processing Fee:</span><span style={{ fontWeight: 600, color: '#2D3748' }}>{loan.processingFee}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {loan.features.map((f, i) => (
                        <span key={i} style={{ backgroundColor: '#EBF8FF', color: '#2B6CB0', fontSize: '10px', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>✓ {f}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #EDF2F7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>
                      Risk Score: <span style={{color: loan.isRecommended ? '#38A169' : '#E53E3E'}}>{loan.rejectionProb}</span> 
                      <span 
                        onMouseEnter={() => setHoveredRiskId(loan.id)} 
                        onMouseLeave={() => setHoveredRiskId(null)} 
                        style={{ cursor: 'help', marginLeft: '6px', color: '#EF4444', fontWeight: 'bold' }}
                      >?</span>
                    </span>
                    
                    <span 
                      onClick={(e) => { e.stopPropagation(); navigate('/info', { state: { loan } }) }} 
                      style={{ fontSize: '13px', color: '#3182CE', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Details
                    </span>

                    {hoveredRiskId === loan.id && (
                      <div style={{ position: 'absolute', bottom: '35px', left: '0', right: '0', backgroundColor: '#2D3748', color: 'white', padding: '12px', borderRadius: '8px', fontSize: '11px', zIndex: 1002, boxShadow: '0 4px 12px rgba(0,0,0,0.2)', lineHeight: '1.4' }}>
                        {loan.riskReason}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '30px 20px', display: 'flex', justifyContent: 'center', backgroundColor: '#F4F7FA', zIndex: 5, position: 'relative', marginTop: 'auto' }}>
        <button onClick={toggleView} style={{ width: isMobile ? '100%' : 'auto', padding: '12px 35px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: '0.2s', backgroundColor: showRejected ? '#4A5568' : '#FFF5F5', color: showRejected ? 'white' : '#C53030', border: showRejected ? 'none' : '1px solid #FEB2B2', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          {showRejected ? "← Back to Eligible" : "View Rejected Applications"}
        </button>
      </div>
    </div>
  );
};

export default Recommendations;