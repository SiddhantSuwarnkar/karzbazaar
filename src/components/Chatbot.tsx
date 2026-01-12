import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [hasGreeted, setHasGreeted] = useState(false); // Track for welcome delay
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
        { text: "Hi! How can I help you with your loan today?", isUser: false }
    ]);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Welcome Message Delay Logic
    useEffect(() => {
        if (isOpen && !hasGreeted) {
            const timer = setTimeout(() => {
                setMessages(prev => [...prev, { 
                    text: "Feel free to ask about interest rates, eligibility, or documentation!", 
                    isUser: false 
                }]);
                setHasGreeted(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, hasGreeted]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        const newMessages = [...messages, { text: query, isUser: true }];
        setMessages(newMessages);
        setQuery('');

        setTimeout(() => {
            setMessages(prev => [...prev, { 
                text: "Thanks for asking! Our AI engine is reviewing your query about " + query, 
                isUser: false 
            }]);
        }, 1000);
    };

    return (
        <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 2000, fontFamily: "'Inter', sans-serif" }}>
            
            {/* CHAT WINDOW */}
            <div style={{
                position: 'absolute',
                bottom: '70px',
                right: '0',
                width: '340px',
                height: '480px',
                backgroundColor: 'white',
                borderRadius: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                border: '1px solid #E2E8F0',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transformOrigin: 'bottom right',
                transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
                opacity: isOpen ? 1 : 0,
                visibility: isOpen ? 'visible' : 'hidden',
                pointerEvents: isOpen ? 'all' : 'none'
            }}>
                {/* Header */}
                <div style={{ padding: '20px', backgroundColor: '#0F172A', color: 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ position: 'relative' }}>
                            <div style={{ width: '36px', height: '36px', backgroundColor: '#38BDF8', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F172A' }}>
                                <MessageCircle size={18} />
                            </div>
                            <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '10px', height: '10px', backgroundColor: '#10B981', borderRadius: '50%', border: '2px solid #0F172A' }}></div>
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '14px' }}>Karz Assistant</div>
                            <div style={{ fontSize: '11px', color: '#94A3B8' }}>Online</div>
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#F8FAFC' }}>
                    {messages.map((msg, i) => (
                        <div key={i} style={{
                            alignSelf: msg.isUser ? 'flex-end' : 'flex-start',
                            backgroundColor: msg.isUser ? '#3B82F6' : 'white',
                            color: msg.isUser ? 'white' : '#1E293B',
                            padding: '12px 16px',
                            borderRadius: '18px',
                            borderBottomRightRadius: msg.isUser ? '4px' : '18px',
                            borderBottomLeftRadius: msg.isUser ? '18px' : '4px',
                            maxWidth: '85%',
                            fontSize: '13px',
                            lineHeight: '1.5',
                            boxShadow: msg.isUser ? '0 4px 10px rgba(59, 130, 246, 0.2)' : '0 2px 5px rgba(0,0,0,0.05)',
                        }}>
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} style={{ padding: '15px 20px', backgroundColor: 'white', borderTop: '1px solid #F1F5F9', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input 
                        type="text" 
                        placeholder="Type a message..." 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{ flex: 1, border: '1px solid #E2E8F0', borderRadius: '25px', padding: '10px 18px', outline: 'none', fontSize: '13.5px' }}
                    />
                    <button 
                        type="submit" 
                        style={{ 
                            backgroundColor: '#3B82F6', 
                            border: 'none', 
                            borderRadius: '50%', 
                            width: '38px', 
                            height: '38px', 
                            cursor: 'pointer', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)',
                            padding: 0
                        }}
                    >
                        {/* CSS ARROW (Chevron) */}
                        <span style={{
                            display: 'inline-block',
                            width: '10px',
                            height: '10px',
                            borderTop: '3px solid white',
                            borderRight: '3px solid white',
                            transform: 'rotate(45deg)',
                            marginLeft: '-4px' // Centers the arrow visual weight
                        }}></span>
                    </button>
                </form>
            </div>

            {/* FLOATING ACTION BUTTON */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '55px',
                    height: '55px',
                    borderRadius: '50%',
                    backgroundColor: isOpen ? '#EF4444' : '#0F172A',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                <div style={{ 
                    transition: 'transform 0.3s ease', 
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                    display: 'flex'
                }}>
                    {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
                </div>
            </button>
        </div>
    );
};

export default Chatbot;