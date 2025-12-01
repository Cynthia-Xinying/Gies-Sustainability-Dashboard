import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// --- Icons ---
const Icons = {
  Search: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Book: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  Users: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Leaf: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Star: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
  TrendUp: () => <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  ChevronDown: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>,
  Mail: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  ArrowLeft: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
  Heart: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  Check: () => <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>,
  Filter: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
  More: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>,
  Download: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
  Dollar: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  ArrowRight: () => <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>,
  UserGroup: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  Globe: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Close: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
};

const CustomLeaf = ({className}: {className?: string}) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22s5-2 12-10V2l-4 4c-5 4-8 12-8 16z"></path>
        <path d="M10 10c0 4-4 8-6 10"></path>
    </svg>
);

// --- Data Constants ---
const COLORS = [
  '#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', 
  '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'
];

const RESEARCH_DISTRIBUTION = [
  { name: 'Finance & Investment', value: 1071, pct: 56.4 },
  { name: 'Operations & Supply Chain', value: 1013, pct: 53.3 },
  { name: 'Marketing & Consumer', value: 955, pct: 50.3 },
  { name: 'Behavioral & Experimental', value: 933, pct: 49.1 },
  { name: 'Econometrics & Methods', value: 919, pct: 48.4 },
  { name: 'International Business', value: 915, pct: 48.2 },
  { name: 'Information Systems', value: 860, pct: 45.3 },
  { name: 'Strategy & Innovation', value: 767, pct: 40.4 },
  { name: 'Corporate Governance', value: 756, pct: 39.8 },
  { name: 'Accounting & Auditing', value: 628, pct: 33.1 },
  { name: 'Sustainability & ESG', value: 613, pct: 32.3 },
  { name: 'Financial Economics', value: 476, pct: 25.1 },
];

// New Data for Homepage
const SDG_DATA = [
  { id: 13, name: "Climate Action", value: 142, color: "#3F7E44" },
  { id: 8, name: "Decent Work & Economic Growth", value: 128, color: "#A21942" },
  { id: 9, name: "Industry, Innovation & Infrastructure", value: 115, color: "#FD6925" },
  { id: 12, name: "Responsible Consumption", value: 98, color: "#BF8B2E" },
  { id: 7, name: "Affordable & Clean Energy", value: 84, color: "#FCC30B" },
  { id: 17, name: "Partnerships for the Goals", value: 76, color: "#19486A" },
  { id: 3, name: "Good Health & Well-being", value: 65, color: "#4C9F38" },
  { id: 11, name: "Sustainable Cities", value: 58, color: "#FD9D24" },
  { id: 5, name: "Gender Equality", value: 45, color: "#FF3A21" },
  { id: 4, name: "Quality Education", value: 42, color: "#C5192D" },
  { id: 10, name: "Reduced Inequalities", value: 38, color: "#DD1367" },
  { id: 1, name: "No Poverty", value: 25, color: "#E5243B" },
  { id: 2, name: "Zero Hunger", value: 22, color: "#DDA63A" },
  { id: 6, name: "Clean Water & Sanitation", value: 18, color: "#26BDE2" },
  { id: 16, name: "Peace, Justice & Strong Inst.", value: 15, color: "#00689D" },
  { id: 15, name: "Life on Land", value: 12, color: "#56C02B" },
  { id: 14, name: "Life Below Water", value: 8, color: "#0A97D9" },
];

const PUBLICATION_TRENDS = [
    { year: 2018, total: 150, sust: 32 },
    { year: 2019, total: 165, sust: 45 },
    { year: 2020, total: 180, sust: 58 },
    { year: 2021, total: 210, sust: 82 },
    { year: 2022, total: 235, sust: 98 },
    { year: 2023, total: 245, sust: 115 },
    { year: 2024, total: 260, sust: 135 },
];

const HEATMAP_DATA = [
  { dept: 'Business Admin.', data: { 'Behavioral & Experimental': 658, 'International Business': 595, 'Marketing & Consumer': 594, 'Finance & Investment': 568, 'Strategy & Innovation': 517, 'Operations & Supply Chain': 426 } },
  { dept: 'Accountancy', data: { 'Accounting & Auditing': 267, 'Finance & Investment': 249, 'Marketing & Consumer': 183, 'Corporate Governance': 170, 'Econometrics & Methods': 164, 'International Business': 89 } },
  { dept: 'Finance', data: { 'Finance & Investment': 254, 'Accounting & Auditing': 211, 'Corporate Governance': 202, 'International Business': 168, 'Econometrics & Methods': 174, 'Operations & Supply Chain': 132 } },
  { dept: 'Gies Business', data: { 'Information Systems': 235, 'Operations & Supply Chain': 235 } },
  { dept: 'Gies Affiliates', data: { 'Behavioral & Experimental': 70, 'Accounting & Auditing': 63, 'Econometrics & Methods': 63, 'Operations & Supply Chain': 63 } },
  { dept: 'Marketing', data: { 'Econometrics & Methods': 1, 'Marketing & Consumer': 1, 'Strategy & Innovation': 1 } }
];

const CO_OCCURRENCE = [
    { source: 'Finance & Investment', target: 'Marketing & Consumer', weight: 715 },
    { source: 'Corporate Governance', target: 'Finance & Investment', weight: 685 },
    { source: 'Finance & Investment', target: 'International Business', weight: 637 },
    { source: 'Finance & Investment', target: 'Operations & Supply Chain', weight: 629 },
    { source: 'Behavioral & Experimental', target: 'Marketing & Consumer', weight: 623 },
    { source: 'Econometrics & Methods', target: 'Finance & Investment', weight: 581 },
    { source: 'Information Systems', target: 'Operations & Supply Chain', weight: 569 },
    { source: 'International Business', target: 'Marketing & Consumer', weight: 569 },
    { source: 'Finance & Investment', target: 'Strategy & Innovation', weight: 561 },
    { source: 'Behavioral & Experimental', target: 'Econometrics & Methods', weight: 554 },
];

const DEPT_AREAS = [
    'Finance & Investment', 'Operations & Supply Chain', 'Marketing & Consumer', 
    'Behavioral & Experimental', 'Econometrics & Methods', 'International Business'
];

// --- Shared Components ---
const Card = ({ children, className = "", title, subtitle, action }: { children?: React.ReactNode, className?: string, title?: string, subtitle?: string, action?: React.ReactNode }) => (
  <div className={`bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-5 ${className}`}>
    {(title || action) && (
      <div className="flex justify-between items-start mb-6">
        <div>
          {title && <h3 className="text-base font-bold text-slate-800">{title}</h3>}
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    )}
    {children}
  </div>
);

// --- Component: Contact Modal ---
const ContactModal = ({ isOpen, onClose, type }: { isOpen: boolean, onClose: () => void, type: 'student' | 'donor' | null }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="font-bold text-lg text-[#13294b]">Contact Us</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-full hover:bg-slate-100">
                        <Icons.Close />
                    </button>
                </div>
                <div className="p-6">
                    {type === 'student' && (
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-2">
                                <Icons.Users />
                            </div>
                            <h4 className="font-bold text-slate-800">Student Support</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Encountering issues with the website or need guidance? We are here to assist you.
                            </p>
                            <a href="mailto:support@gies.illinois.edu" className="block w-full py-3 bg-[#13294b] text-white text-center rounded-lg font-bold text-sm hover:bg-blue-900 transition-colors">
                                Contact Student Support
                            </a>
                        </div>
                    )}

                    {type === 'donor' && (
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-orange-100 text-[#FF5F2D] rounded-xl flex items-center justify-center mb-2">
                                <Icons.Dollar />
                            </div>
                            <h4 className="font-bold text-slate-800">Partner with Us</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Interested in funding impactful research? Connect with the leadership team at the Center for Professional Responsibility in Business and Society.
                            </p>
                            <div className="space-y-3 pt-2">
                                <a href="https://giesbusiness.illinois.edu/profile/oscar-ybarra" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 rounded-lg border border-slate-200 hover:border-[#FF5F2D] hover:bg-orange-50/50 transition-all group">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold mr-3">OY</div>
                                    <div className="flex-1">
                                        <div className="text-sm font-bold text-slate-800 group-hover:text-[#FF5F2D]">Oscar Ybarra</div>
                                        <div className="text-xs text-slate-500">Director</div>
                                    </div>
                                    <Icons.ArrowRight />
                                </a>
                                <a href="https://law.illinois.edu/faculty-research/faculty-profiles/nicola-sharpe/" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 rounded-lg border border-slate-200 hover:border-[#FF5F2D] hover:bg-orange-50/50 transition-all group">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold mr-3">NS</div>
                                    <div className="flex-1">
                                        <div className="text-sm font-bold text-slate-800 group-hover:text-[#FF5F2D]">Nicola Sharpe</div>
                                        <div className="text-xs text-slate-500">Director</div>
                                    </div>
                                    <Icons.ArrowRight />
                                </a>
                                <a href="https://giesbusiness.illinois.edu/profile/fei-du" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 rounded-lg border border-slate-200 hover:border-[#FF5F2D] hover:bg-orange-50/50 transition-all group">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold mr-3">FD</div>
                                    <div className="flex-1">
                                        <div className="text-sm font-bold text-slate-800 group-hover:text-[#FF5F2D]">Fei Du</div>
                                        <div className="text-xs text-slate-500">Academic Director</div>
                                    </div>
                                    <Icons.ArrowRight />
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- Component: Landing Page (New Home) ---
const LandingPage = ({ onNavigate, onScrollTo, onSearch }: { onNavigate: (page: string) => void, onScrollTo: (id: string) => void, onSearch: (term: string) => void }) => {
    const [showAllSDGs, setShowAllSDGs] = useState(false);
    const [localSearch, setLocalSearch] = useState('');
    const [contactModal, setContactModal] = useState<{ isOpen: boolean, type: 'student' | 'donor' | null }>({ isOpen: false, type: null });

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(localSearch);
            onNavigate('Faculty');
        }
    };
    
    // Metrics Data
    const metrics = [
        { 
            value: "1,899", 
            label: "Total Publications", 
            desc: "All Gies research records in the database.",
            icon: <Icons.Book /> 
        },
        { 
            value: "613", 
            label: "Sustainability Publications", 
            desc: "Publications mapped to at least one UN SDG (32%).",
            subtext: "32% of total",
            icon: <CustomLeaf className="w-6 h-6" />
        },
        { 
            value: "143", 
            label: "Engaged Faculty", 
            desc: "Faculty contributing to sustainability research.",
            icon: <Icons.Users />
        },
        { 
            value: "6", 
            label: "Departments Involved", 
            desc: "Academic units contributing to SDG-related work.",
            icon: <Icons.Globe />
        }
    ];

    const displayedSDGs = showAllSDGs ? SDG_DATA : SDG_DATA.slice(0, 5);
    const maxSDGVal = Math.max(...SDG_DATA.map(d => d.value));

    // Trend chart calculations
    const maxTrendVal = Math.max(...PUBLICATION_TRENDS.map(d => d.total));
    const trendPoints = PUBLICATION_TRENDS.map((d, i) => {
        const x = (i / (PUBLICATION_TRENDS.length - 1)) * 100;
        const yTotal = 100 - (d.total / maxTrendVal) * 100;
        const ySust = 100 - (d.sust / maxTrendVal) * 100;
        return { x, yTotal, ySust, ...d };
    });
    const sustPointsString = trendPoints.map(p => `${p.x},${p.ySust}`).join(' ');

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
            <ContactModal 
                isOpen={contactModal.isOpen} 
                onClose={() => setContactModal({ ...contactModal, isOpen: false })} 
                type={contactModal.type} 
            />
            
            {/* 1. HERO SECTION */}
            <div className="bg-[#13294b] text-white pt-20 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-8">
                        Gies Sustainability Dashboard
                    </h1>

                    {/* Centered Search (Moved to top) */}
                    <div className="max-w-xl mx-auto mb-8 relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <Icons.Search />
                        </div>
                        <input 
                            type="text" 
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
                            onKeyDown={handleSearch}
                            placeholder="Search by faculty, SDG, keyword, or topic..." 
                            className="w-full pl-11 pr-4 py-4 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#FF5F2D]/50 shadow-2xl border-0"
                        />
                    </div>

                    <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto font-light">
                        Connect Gies sustainability research with real-world impact across the UN Sustainable Development Goals (SDGs).
                    </p>
                    
                    {/* Single Call to Action (Updated) */}
                    <div className="flex justify-center">
                        <button 
                            onClick={() => onNavigate('Research Areas')}
                            className="flex items-center justify-center gap-3 px-8 py-4 bg-[#FF5F2D] text-white rounded-lg font-bold text-base hover:bg-[#e64a19] transition-all shadow-lg hover:shadow-xl active:scale-95 min-w-[260px]"
                        >
                            About the Research
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. IMPACT OVERVIEW METRIC STRIP */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {metrics.map((m, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-all cursor-default group">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-3xl font-bold text-[#13294b] group-hover:text-[#FF5F2D] transition-colors">{m.value}</h3>
                                <div className="text-slate-200 group-hover:text-[#FF5F2D]/20 transition-colors">{m.icon}</div>
                            </div>
                            <div className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-1">{m.label}</div>
                            <div className="text-xs text-slate-500 leading-relaxed">{m.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
                
                {/* 3. PERSONA-BASED ENTRY CARDS (Moved Up) */}
                <div>
                    <h2 className="text-2xl font-bold text-[#13294b] mb-6">Choose your journey</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Student Journey */}
                        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group flex flex-col h-full">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10 flex-1">
                                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center mb-6">
                                    <Icons.Users />
                                </div>
                                <h3 className="text-xl font-bold text-[#13294b] mb-3">I’m a student – find a mentor</h3>
                                <p className="text-slate-600 mb-6 min-h-[48px]">
                                    Filter by department and SDG to discover faculty working on sustainable finance and other topics. Explore their research areas and alignment.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {[
                                        "Select your department or interest area.",
                                        "Review faculty profiles and SDG connections.",
                                        "Save or contact potential mentors."
                                    ].map((step, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-500">
                                            <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0">{i+1}</div>
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                                <button 
                                    onClick={() => onNavigate('Faculty')}
                                    className="w-full py-3 bg-[#13294b] text-white rounded-lg font-bold hover:bg-blue-900 transition-colors flex items-center justify-center gap-2 group-hover:gap-3 mb-4"
                                >
                                    Start Student Journey <Icons.ArrowRight />
                                </button>
                                
                                <button 
                                    onClick={() => setContactModal({ isOpen: true, type: 'student' })}
                                    className="w-full py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors"
                                >
                                    Contact Us
                                </button>
                            </div>
                        </div>

                        {/* Donor Journey */}
                        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group flex flex-col h-full">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10 flex-1">
                                <div className="w-12 h-12 bg-orange-100 text-[#FF5F2D] rounded-lg flex items-center justify-center mb-6">
                                    <Icons.Dollar />
                                </div>
                                <h3 className="text-xl font-bold text-[#13294b] mb-3">I’m a donor – explore impact areas</h3>
                                <p className="text-slate-600 mb-6 min-h-[48px]">
                                    See key projects and faculty working on renewable energy and other high-impact SDG areas. Identify credible opportunities for partnership.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {[
                                        "Choose an impact area (e.g., Renewable Energy – SDG 7).",
                                        "Review active projects, faculty leads, and metrics.",
                                        "Explore partnership or funding opportunities."
                                    ].map((step, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-500">
                                            <div className="mt-0.5 w-4 h-4 rounded-full bg-orange-100 text-[#FF5F2D] flex items-center justify-center text-[10px] font-bold shrink-0">{i+1}</div>
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                                <button 
                                    onClick={() => onNavigate('Research Areas')}
                                    className="w-full py-3 bg-[#FF5F2D] text-white rounded-lg font-bold hover:bg-[#e64a19] transition-colors flex items-center justify-center gap-2 group-hover:gap-3 mb-4"
                                >
                                    Start Donor Journey <Icons.ArrowRight />
                                </button>
                                
                                <button 
                                    onClick={() => setContactModal({ isOpen: true, type: 'donor' })}
                                    className="w-full py-2 bg-orange-50 text-[#FF5F2D] rounded-lg text-sm font-bold hover:bg-orange-100 transition-colors"
                                >
                                    Contact Us
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* 4. TOP SDG AREAS MODULE */}
                    <Card className="h-full flex flex-col" 
                        title="Where Gies Leads on Sustainability" 
                        subtitle="Top UN SDG areas by number of publications."
                        action={
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400">Show:</span>
                                <button 
                                    onClick={() => setShowAllSDGs(!showAllSDGs)} 
                                    className="text-xs font-bold text-[#13294b] hover:text-[#FF5F2D] transition-colors bg-slate-100 px-2 py-1 rounded"
                                >
                                    {showAllSDGs ? "Top 5" : "All 17"}
                                </button>
                            </div>
                        }
                    >
                        <div className="flex-1 flex flex-col gap-3 mt-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                            {displayedSDGs.map((sdg) => (
                                <div key={sdg.id} className="group relative">
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className="w-8 h-8 shrink-0 rounded flex items-center justify-center text-white font-bold text-xs shadow-sm" style={{ backgroundColor: sdg.color }}>
                                            {sdg.id}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-medium text-slate-700 truncate mr-2" title={sdg.name}>{sdg.name}</span>
                                                <span className="font-bold text-slate-900">{sdg.value}</span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full rounded-full opacity-80 group-hover:opacity-100 transition-all duration-500"
                                                    style={{ width: `${(sdg.value / maxSDGVal) * 100}%`, backgroundColor: sdg.color }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Tooltip on hover */}
                                    <div className="absolute left-10 bottom-full mb-2 hidden group-hover:block bg-slate-800 text-white text-xs p-2 rounded shadow-xl z-10 w-48">
                                        <div className="font-bold text-[#FF5F2D] mb-1">{sdg.value} Publications</div>
                                        <div>mapped to SDG {sdg.id}: {sdg.name}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* 5. TREND OVER TIME MODULE */}
                    <Card title="Growing Sustainability Impact" subtitle="Annual sustainability-related publications.">
                         <div className="flex items-center gap-2 mb-6">
                            <span className="text-2xl font-bold text-[#FF5F2D]">+320%</span>
                            <span className="text-sm text-slate-500 font-medium">growth over the last 6 years</span>
                         </div>
                         <div className="relative h-64 w-full">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                                {/* Grid lines */}
                                {[0, 25, 50, 75, 100].map(y => (
                                    <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#f1f5f9" strokeWidth="0.5" />
                                ))}
                                
                                {/* Area fill */}
                                <path d={`M0,100 ${sustPointsString} 100,100 Z`} fill="#FF5F2D" fillOpacity="0.1" />

                                {/* Line */}
                                <polyline 
                                    points={sustPointsString} 
                                    fill="none" 
                                    stroke="#FF5F2D" 
                                    strokeWidth="2.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                />

                                {/* Points */}
                                {trendPoints.map((p, i) => (
                                    <g key={i} className="group">
                                        <circle cx={p.x} cy={p.ySust} r="1.5" fill="white" stroke="#FF5F2D" strokeWidth="2" className="group-hover:r-3 transition-all" />
                                        
                                        {/* Hover Label */}
                                        <foreignObject x={p.x - 10} y={p.ySust - 25} width="20" height="20" className="overflow-visible pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded -translate-x-1/2 whitespace-nowrap text-center">
                                                <span className="font-bold">{p.year}</span>: {p.sust} Pubs
                                            </div>
                                        </foreignObject>
                                    </g>
                                ))}
                            </svg>
                            {/* Axis Labels */}
                            <div className="flex justify-between mt-2 text-xs text-slate-400 font-mono">
                                <span>2018</span>
                                <span>2019</span>
                                <span>2020</span>
                                <span>2021</span>
                                <span>2022</span>
                                <span>2023</span>
                                <span>2024</span>
                            </div>
                         </div>
                         <div className="mt-4 flex gap-4 justify-center text-xs">
                             <div className="flex items-center gap-1.5">
                                 <div className="w-3 h-0.5 bg-[#FF5F2D]"></div>
                                 <span className="text-slate-600 font-medium">Sustainability Publications</span>
                             </div>
                         </div>
                    </Card>
                </div>

                {/* 6. FEATURED IMPACT STORY (Teaser) */}
                <div className="bg-[#13294b] rounded-2xl p-1 overflow-hidden shadow-2xl">
                    <div className="bg-[#13294b] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <div className="flex-1 relative z-10">
                            <div className="inline-block px-3 py-1 bg-[#FF5F2D] text-white text-[10px] font-bold uppercase tracking-wider rounded mb-4">Featured Impact Story</div>
                            <h3 className="text-2xl font-bold text-white mb-4">Cap-and-Trade Compliance & Firm Performance</h3>
                            <p className="text-slate-300 mb-6 leading-relaxed">
                                How do environmental regulations actually change what firms do?
                                This study analyzes companies regulated under a cap-and-trade program and compares different compliance levers – from pollution prevention to end-of-pipe controls. It shows which strategies deliver both lower emissions and stronger financial performance, offering evidence that climate policy can create win-win outcomes when firms invest in the right kind of innovation.
                            </p>
                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className="text-xs font-semibold text-blue-200 bg-blue-900/50 px-3 py-1.5 rounded-full border border-blue-500/30">SDG 13: Climate Action</span>
                                <span className="text-xs font-semibold text-blue-200 bg-blue-900/50 px-3 py-1.5 rounded-full border border-blue-500/30">SDG 12: Responsible Consumption</span>
                                <span className="text-xs font-semibold text-blue-200 bg-blue-900/50 px-3 py-1.5 rounded-full border border-blue-500/30">SDG 7: Affordable and Clean Energy</span>
                                <span className="text-xs font-semibold text-blue-200 bg-blue-900/50 px-3 py-1.5 rounded-full border border-blue-500/30">Prof. Ramanath Subramanyam</span>
                                <span className="text-xs font-semibold text-blue-200 bg-blue-900/50 px-3 py-1.5 rounded-full border border-blue-500/30">Business Administration</span>
                            </div>
                            <button className="text-white font-bold border-b-2 border-[#FF5F2D] pb-0.5 hover:text-[#FF5F2D] transition-colors">
                                Read full impact story
                            </button>
                        </div>
                         <div className="w-full md:w-1/3 bg-slate-800/50 rounded-xl h-48 flex items-center justify-center border border-white/10">
                             {/* Placeholder for story image */}
                            <div className="text-center">
                                <CustomLeaf className="w-12 h-12 text-slate-500 mx-auto mb-2 opacity-50" />
                                <span className="text-xs text-slate-500 uppercase tracking-widest">Project Visualization</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

// --- Component: Dashboard Home (Analytics) ---
const DashboardHome = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  
  // -- Pie Chart Helper --
  const pieData = RESEARCH_DISTRIBUTION.slice(0, 8);
  const totalPieVal = pieData.reduce((acc, cur) => acc + cur.value, 0);
  let accumulatedAngle = 0;
  
  const pieGradient = pieData.map((d, i) => {
    const angle = (d.value / totalPieVal) * 360;
    const start = accumulatedAngle;
    accumulatedAngle += angle;
    return `${COLORS[i]} ${start}deg ${accumulatedAngle}deg`;
  }).join(', ');

  // -- Network Graph Nodes (Manually adjusted positions for better layout) --
  const nodes = [
    { id: 'Finance & Investment', x: 50, y: 50, color: COLORS[0] }, // Center
    { id: 'Operations & Supply Chain', x: 70, y: 35, color: COLORS[1] },
    { id: 'Marketing & Consumer', x: 65, y: 70, color: COLORS[2] },
    { id: 'Behavioral & Experimental', x: 30, y: 30, color: COLORS[3] },
    { id: 'Econometrics & Methods', x: 80, y: 60, color: COLORS[4] },
    { id: 'International Business', x: 35, y: 65, color: COLORS[5] },
    { id: 'Strategy & Innovation', x: 50, y: 20, color: COLORS[7] },
    { id: 'Corporate Governance', x: 20, y: 50, color: COLORS[8] },
    { id: 'Information Systems', x: 50, y: 80, color: COLORS[6] },
    { id: 'Sustainability & ESG', x: 85, y: 80, color: COLORS[10] },
    { id: 'Accounting & Auditing', x: 85, y: 20, color: COLORS[9] },
    { id: 'Financial Economics', x: 15, y: 80, color: COLORS[11] },
  ];

  return (
    <div className="bg-[#f0f2f5] min-h-screen p-6 font-sans">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Research Analytics Dashboard</h1>
                <p className="text-slate-500 text-sm mt-1">Overview of research output and interdisciplinary connections</p>
            </div>
            <div className="flex gap-3">
                 <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                    <Icons.Download /> Export Report
                 </button>
                 <button className="flex items-center gap-2 px-4 py-2 bg-[#FF5F2D] text-white rounded-lg text-sm font-medium hover:bg-[#E64A19] transition shadow-sm">
                    <Icons.Filter /> Customize View
                 </button>
            </div>
        </div>
        
        {/* --- Top Row --- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            
            {/* 1. Research Area Distribution (Bar Chart) */}
            <Card title="Research Area Distribution" subtitle="Publication count by primary area">
                <div className="space-y-3 h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {RESEARCH_DISTRIBUTION.map((item, idx) => (
                        <div key={idx} className="group flex items-center gap-3 text-sm">
                             <div className="w-40 text-slate-600 truncate text-right text-xs font-medium group-hover:text-slate-900 transition-colors">{item.name}</div>
                             <div className="flex-1 h-2 bg-slate-50 rounded-full relative overflow-hidden">
                                <div 
                                    className="h-full absolute left-0 top-0 rounded-full transition-all duration-500 ease-out" 
                                    style={{ 
                                        width: `${(item.value / 1200) * 100}%`,
                                        backgroundColor: COLORS[idx % COLORS.length]
                                    }}
                                ></div>
                            </div>
                            <div className="w-8 text-slate-400 text-[10px] font-mono">{item.value}</div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* 2. Research Area Share (Pie Chart) */}
            <Card title="Research Area Share" subtitle="Top 8 areas by volume" className="flex flex-col items-center">
                <div className="relative w-48 h-48 rounded-full shadow-inner ring-4 ring-white" style={{ background: `conic-gradient(${pieGradient})` }}>
                    <div className="absolute inset-0 m-auto w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-sm">
                         <span className="text-xs text-slate-400">Total</span>
                         <span className="text-lg font-bold text-slate-800">1.9k</span>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-xs w-full px-4">
                    {pieData.map((d, i) => (
                        <div key={i} className="flex items-center gap-2">
                             <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORS[i] }}></div>
                             <div className="flex justify-between w-full">
                                <span className="text-slate-600 truncate max-w-[90px]">{d.name}</span>
                                <span className="text-slate-400 font-mono">{((d.value/totalPieVal)*100).toFixed(0)}%</span>
                             </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* 3. Interdisciplinary Research (Histogram) */}
            <Card title="Interdisciplinary Impact" subtitle="Research areas per paper">
                <div className="h-56 flex items-end justify-center gap-2 px-2 pb-6 border-b border-slate-100 relative mt-4">
                    {[0, 100, 200, 300, 400].map(val => (
                         <div key={val} className="absolute w-full border-t border-slate-50 border-dashed left-0" style={{ bottom: `${val/4.5}px` }}>
                         </div>
                    ))}
                    {[10, 50, 380, 60, 160, 430, 250, 280, 160, 120, 50, 15].map((h, i) => (
                         <div key={i} className="group w-full relative h-full flex items-end">
                            <div 
                                className="w-full bg-[#80b1d3] opacity-80 group-hover:opacity-100 transition-all rounded-t-sm relative z-10" 
                                style={{ height: `${h/4.5}px` }}
                            >
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                    {h} papers
                                </div>
                            </div>
                         </div>
                    ))}
                </div>
                <div className="flex justify-between px-1 text-[10px] text-slate-400 mt-2 font-mono">
                     <span>0</span><span>2</span><span>4</span><span>6</span><span>8</span><span>10+</span>
                </div>
                <div className="text-center text-xs text-slate-400 mt-1">Number of Research Areas</div>
                <div className="mt-4 flex items-center justify-between p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                    <div className="text-xs text-slate-600">Total Publications</div>
                    <div className="text-sm font-bold text-blue-700">1,899</div>
                </div>
            </Card>
        </div>

        {/* --- Bottom Row --- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* 4. Research Trends (Line Chart) */}
            <Card title="Research Trends" subtitle="Growth in key strategic areas" action={<button className="text-slate-400 hover:text-slate-600"><Icons.More /></button>}>
                <div className="relative h-64 w-full mt-2">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                         {/* Grid */}
                         {[0, 25, 50, 75, 100].map(y => (
                             <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="2" />
                         ))}

                         {/* Lines */}
                         <polyline points="0,40 10,50 20,40 30,30 40,40 50,15 60,45 70,20 80,25 90,20 100,10" fill="none" stroke="#fb8072" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                         <polyline points="0,70 10,90 20,80 30,70 40,75 50,50 60,35 70,35 80,15 90,5 100,0" fill="none" stroke="#b3de69" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                         <polyline points="0,80 10,85 20,70 30,80 40,70 50,50 60,70 70,55 80,55 90,54 100,53" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                         <polyline points="0,82 10,82 20,68 30,75 40,68 50,50 60,75 70,55 80,50 90,53 100,30" fill="none" stroke="#009999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    
                    {/* Y Axis Labels */}
                    <div className="absolute top-0 -left-6 h-full flex flex-col justify-between text-[10px] text-slate-400 font-mono text-right w-4">
                        <span>140</span><span>100</span><span>60</span><span>20</span><span>0</span>
                    </div>
                    {/* X Axis Labels */}
                    <div className="absolute -bottom-6 left-0 w-full flex justify-between text-[10px] text-slate-400 font-mono px-2">
                        <span>2010</span><span>2012</span><span>2014</span><span>2016</span><span>2018</span><span>2020</span>
                    </div>
                </div>
                 <div className="flex flex-wrap gap-x-4 gap-y-2 mt-10 justify-center text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#fb8072]"></div> Finance & Inv.</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#b3de69]"></div> Information Sys.</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#10B981]"></div> Sustainability</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#009999]"></div> Accounting</div>
                </div>
            </Card>

            {/* 5. Heatmap */}
            <Card title="Departmental Focus" subtitle="Heatmap of research intensity">
                 <div className="mt-8 overflow-x-auto pb-4">
                     <div className="min-w-[500px] px-2">
                         {/* Header */}
                         <div className="flex items-end mb-4 relative h-32">
                             <div className="w-32 shrink-0"></div>
                             {DEPT_AREAS.map((area, i) => (
                                 <div key={i} className="w-12 relative h-full">
                                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 text-[10px] text-slate-500 font-medium -rotate-45 origin-bottom-left whitespace-nowrap overflow-visible">
                                         {area}
                                     </div>
                                 </div>
                             ))}
                         </div>
                         {/* Rows */}
                         {HEATMAP_DATA.map((row, rI) => (
                             <div key={rI} className="flex items-center mb-1 group">
                                 <div className="w-32 shrink-0 text-[11px] text-slate-500 font-medium text-right pr-4 leading-tight group-hover:text-slate-800 transition-colors">{row.dept}</div>
                                 <div className="flex gap-1">
                                     {DEPT_AREAS.map((area, cI) => {
                                         const val = row.data[area] || 0;
                                         let bg = '#fff7bc';
                                         if (val > 500) bg = '#b91c1c'; // Red-700
                                         else if (val > 400) bg = '#dc2626'; // Red-600
                                         else if (val > 300) bg = '#ef4444'; // Red-500
                                         else if (val > 200) bg = '#f87171'; // Red-400
                                         else if (val > 100) bg = '#fca5a5'; // Red-300
                                         else if (val > 0) bg = '#fee2e2'; // Red-100
                                         else bg = '#f8fafc'; // Slate-50

                                         return (
                                             <div key={cI} 
                                                className="w-12 h-10 rounded-sm flex items-center justify-center text-[10px] font-medium transition-transform hover:scale-110 relative z-0 hover:z-10 cursor-default" 
                                                style={{ backgroundColor: bg, color: val > 200 ? 'white' : '#475569' }}
                                                title={`${row.dept} - ${area}: ${val}`}
                                             >
                                                 {val > 0 ? val : '-'}
                                             </div>
                                         )
                                     })}
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
            </Card>

            {/* 6. Network Graph */}
            <Card title="Co-occurrence Network" subtitle="Connections between disciplines">
                <div className="relative h-96 w-full bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                    <svg className="w-full h-full">
                        {/* Lines */}
                        {CO_OCCURRENCE.map((link, i) => {
                            const sourceNode = nodes.find(n => n.id === link.source);
                            const targetNode = nodes.find(n => n.id === link.target);
                            if (!sourceNode || !targetNode) return null;
                            return (
                                <line 
                                    key={i}
                                    x1={`${sourceNode.x}%`} y1={`${sourceNode.y}%`}
                                    x2={`${targetNode.x}%`} y2={`${targetNode.y}%`}
                                    stroke="#94a3b8"
                                    strokeWidth={Math.max(link.weight / 200, 1)} 
                                    opacity="0.4"
                                    className="transition-all duration-300"
                                />
                            );
                        })}
                        {/* Nodes */}
                        {nodes.map((node, i) => (
                            <g key={i} className="group cursor-pointer hover:z-50 relative">
                                <circle 
                                    cx={`${node.x}%`} 
                                    cy={`${node.y}%`} 
                                    r={node.id === 'Finance & Investment' ? 35 : 24} 
                                    fill={node.color}
                                    className="transition-all duration-300 group-hover:r-32 shadow-sm opacity-90"
                                    stroke="white"
                                    strokeWidth="3"
                                />
                                <foreignObject x={`${node.x - 10}%`} y={`${node.y - 10}%`} width="20%" height="20%" className="pointer-events-none">
                                    <div className="h-full w-full flex items-center justify-center text-center">
                                         <span className="text-[10px] font-bold text-slate-800 leading-tight bg-white/70 backdrop-blur-[1px] px-1 py-0.5 rounded-sm shadow-sm border border-white/40">
                                            {node.id}
                                         </span>
                                    </div>
                                </foreignObject>
                            </g>
                        ))}
                    </svg>
                    <div className="absolute bottom-2 right-2 text-[10px] text-slate-400 bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
                        Node size: Topic Volume
                    </div>
                </div>
            </Card>

        </div>
      </div>
    </div>
  );
};

// --- Component: Faculty Directory (Detailed Page) ---
const FacultyDirectory = ({ onBack, initialSearchQuery }: { onBack: () => void, initialSearchQuery?: string }) => {
    const facultyList = [
        {
            name: 'Dr. Sarah Chen', title: 'Associate Professor', dept: 'Finance Department', email: 'schen@illinois.edu',
            pubs: '28 Publications (2015-2020)', sust: '21 Sustainability-focused (75%)', ft: '8 Financial Times publications',
            tags: ['#Renewable Energy', '#Green Bonds', '#ESG Metrics', '#Climate Risk'],
            recent: ['Impact of Green Bonds on Corporate Sustainability (2020)', 'ESG Integration in Portfolio Management (2019)'],
            sdgs: [7, 13, 17], color: 'bg-blue-100 text-blue-600'
        },
        {
            name: 'Dr. Michael Rodriguez', title: 'Professor', dept: 'Accountancy Department', email: 'mrodriguez@illinois.edu',
            pubs: '25 Publications (2015-2020)', sust: '18 Sustainability-focused (72%)', ft: '6 Financial Times publications',
            tags: ['#ESG Reporting', '#Climate Risk', '#Sustainable Accounting'],
            recent: ['Climate Risk Disclosure in Financial Statements (2020)', 'The Evolution of ESG Reporting Standards (2019)'],
            sdgs: [12, 13], color: 'bg-indigo-100 text-indigo-600'
        },
        {
            name: 'Dr. Emily Thompson', title: 'Associate Professor', dept: 'Business Administration', email: 'ethompson@illinois.edu',
            pubs: '32 Publications (2015-2020)', sust: '20 Sustainability-focused (63%)', ft: '9 Financial Times publications',
            tags: ['#Climate Finance', '#Impact Investing', '#Carbon Markets'],
            recent: ['Carbon Market Mechanisms and Corporate Strategy (2020)', 'Impact Investing in Emerging Markets (2019)'],
            sdgs: [7, 9], color: 'bg-sky-100 text-sky-600'
        },
        {
            name: 'Dr. James Wilson', title: 'Associate Professor', dept: 'Finance Department', email: 'jwilson@illinois.edu',
            pubs: '22 Publications (2015-2020)', sust: '14 Sustainability-focused (64%)', ft: '5 Financial Times publications',
            tags: ['#Renewable Energy', '#Clean Technology', '#ESG Analytics'],
            recent: ['Financing the Energy Transition (2020)', 'Returns on Clean Technology Investments (2019)'],
            sdgs: [7, 9], color: 'bg-cyan-100 text-cyan-600'
        },
        {
            name: 'Dr. Maria Garcia', title: 'Professor', dept: 'Accountancy Department', email: 'mgarcia@illinois.edu',
            pubs: '30 Publications (2015-2020)', sust: '19 Sustainability-focused (63%)', ft: '7 Financial Times publications',
            tags: ['#Sustainability Reporting', '#ESG Metrics', '#Transparency'],
            recent: ['Best Practices in Sustainability Reporting (2020)', 'ESG Metrics and Firm Performance (2019)'],
            sdgs: [12, 13, 17], color: 'bg-teal-100 text-teal-600'
        },
        {
            name: 'Dr. David Lee', title: 'Associate Professor', dept: 'Finance Department', email: 'dlee@illinois.edu',
            pubs: '26 Publications (2015-2020)', sust: '17 Sustainability-focused (65%)', ft: '6 Financial Times publications',
            tags: ['#Green Bonds', '#Sustainable Finance', '#Climate Risk'],
            recent: ['The Growth of Green Bond Markets (2020)', 'Climate Risk in Asset Pricing (2019)'],
            sdgs: [13, 17], color: 'bg-blue-100 text-blue-600'
        }
    ];

    const [searchText, setSearchText] = useState(initialSearchQuery || '');
    const [selectedDepts, setSelectedDepts] = useState<Set<string>>(new Set(['Business Admin', 'Finance', 'Accountancy']));

    useEffect(() => {
        if (initialSearchQuery) setSearchText(initialSearchQuery);
    }, [initialSearchQuery]);

    const handleDeptToggle = (dept: string) => {
        const next = new Set(selectedDepts);
        if (next.has(dept)) next.delete(dept);
        else next.add(dept);
        setSelectedDepts(next);
    };

    const handleReset = () => {
        setSearchText('');
        setSelectedDepts(new Set(['Business Admin', 'Finance', 'Accountancy']));
    };

    const filteredFaculty = useMemo(() => {
        return facultyList.filter(prof => {
            // Text Search
            const searchLower = searchText.toLowerCase();
            const matchesText = 
                prof.name.toLowerCase().includes(searchLower) ||
                prof.tags.some(t => t.toLowerCase().includes(searchLower)) ||
                prof.dept.toLowerCase().includes(searchLower);

            // Dept Filter
            // Map prof.dept to filter keys
            let deptKey = 'Other';
            if (prof.dept.includes('Finance')) deptKey = 'Finance';
            else if (prof.dept.includes('Accountancy')) deptKey = 'Accountancy';
            else if (prof.dept.includes('Business Administration')) deptKey = 'Business Admin';
            
            const matchesDept = selectedDepts.has(deptKey);

            return matchesText && matchesDept;
        });
    }, [searchText, selectedDepts]);

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button onClick={onBack} className="group flex items-center text-slate-500 hover:text-slate-800 mb-6 font-medium text-sm transition-colors">
                    <div className="p-1.5 bg-white rounded-full shadow-sm mr-2 group-hover:scale-110 transition-transform">
                        <Icons.ArrowLeft />
                    </div>
                     Back to Dashboard
                </button>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Faculty Directory</h1>
                        <p className="text-slate-500 mt-2 max-w-2xl">Connect with leading professors specializing in sustainable finance, renewable energy, and ESG strategies.</p>
                    </div>
                    <div className="relative w-full md:w-80 group">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#FF5F2D] transition-colors">
                            <Icons.Search />
                        </div>
                        <input 
                            type="text" 
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Search by name or topic..." 
                            className="pl-10 pr-4 py-3 w-full border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5F2D]/20 focus:border-[#FF5F2D] shadow-sm transition-all" 
                        />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* --- Filters Sidebar --- */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-24">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Filters</h3>
                                <button onClick={handleReset} className="text-xs text-blue-600 hover:text-blue-800 font-medium">Reset</button>
                            </div>
                            
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-xs text-slate-400 uppercase mb-3">Department</h4>
                                    <div className="space-y-2.5">
                                        {['Business Admin', 'Finance', 'Accountancy', 'Gies Business', 'Gies Affiliates'].map((dept, i) => (
                                            <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                                <input 
                                                    type="checkbox" 
                                                    checked={selectedDepts.has(dept)}
                                                    onChange={() => handleDeptToggle(dept)}
                                                    className="w-4 h-4 text-[#FF5F2D] rounded border-slate-300 focus:ring-[#FF5F2D]" 
                                                />
                                                <span className={`text-sm transition-colors ${selectedDepts.has(dept) ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>{dept}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-6">
                                    <h4 className="font-semibold text-xs text-slate-400 uppercase mb-3">Research Focus</h4>
                                    <div className="space-y-2.5">
                                        {['Sustainability', 'General Research', 'ESG', 'Ethics'].map((focus, i) => (
                                            <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                                <input type="checkbox" defaultChecked={i === 0} className="w-4 h-4 text-[#FF5F2D] rounded border-slate-300 focus:ring-[#FF5F2D]" />
                                                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{focus}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Faculty List --- */}
                    <div className="flex-1">
                        {filteredFaculty.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 border-dashed">
                                <div className="text-slate-300 mb-4"><Icons.Search /></div>
                                <h3 className="text-lg font-bold text-slate-800">No faculty found</h3>
                                <p className="text-slate-500 text-sm">Try adjusting your search or filters.</p>
                                <button onClick={handleReset} className="mt-4 text-[#FF5F2D] font-bold text-sm hover:underline">Clear all filters</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                {filteredFaculty.map((prof, idx) => (
                                    <div key={idx} className="group bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-50 to-transparent rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
                                        
                                        <div className="flex gap-5 mb-5 relative z-10">
                                            <div className={`w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl font-bold shadow-inner ${prof.color}`}>
                                                {prof.name.split(' ')[1][0]}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#FF5F2D] transition-colors">{prof.name}</h3>
                                                <p className="text-sm text-slate-600 font-medium">{prof.title}</p>
                                                <p className="text-xs text-slate-400 mt-1">{prof.dept}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-slate-50 rounded-xl p-3 mb-5 space-y-2 border border-slate-100/50">
                                            <div className="flex items-center gap-3 text-xs text-slate-700">
                                                <div className="w-6 flex justify-center text-blue-500"><Icons.Book /></div>
                                                <span className="font-medium">{prof.pubs}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-slate-700">
                                                <div className="w-6 flex justify-center text-green-500"><CustomLeaf className="w-4 h-4" /></div>
                                                <span>{prof.sust}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-slate-700">
                                                <div className="w-6 flex justify-center text-amber-500"><Icons.Star /></div>
                                                <span>{prof.ft}</span>
                                            </div>
                                        </div>

                                        <div className="mb-5">
                                            <div className="text-[10px] uppercase font-bold text-slate-400 mb-2.5 tracking-wider">Research Interests</div>
                                            <div className="flex flex-wrap gap-2">
                                                {prof.tags.map(tag => (
                                                    <span key={tag} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded-md text-[11px] font-medium hover:border-slate-300 transition-colors">
                                                        {tag.replace('#', '')}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                                            <div className="flex gap-1.5" title="Sustainable Development Goals">
                                                {prof.sdgs.map(sdg => (
                                                    <div key={sdg} className="w-7 h-7 bg-[#10B981] text-white text-[10px] font-bold flex items-center justify-center rounded-lg shadow-sm border border-[#059669]/20 cursor-help transition-transform hover:scale-110">
                                                        {sdg}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Icons.Heart />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-[#FF5F2D] hover:bg-orange-50 rounded-lg transition-colors">
                                                    <Icons.Mail />
                                                </button>
                                                <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-lg">
                                                    Profile
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---
const App = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle navigation
  const navigateTo = (page: string) => {
      setActiveTab(page);
      window.scrollTo(0, 0);
  };

  const handleSearch = (term: string) => {
      setSearchQuery(term);
  };

  const handleScrollTo = (id: string) => {
      if (activeTab !== 'Home') {
          setActiveTab('Home');
          setTimeout(() => {
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
      } else {
           document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
      
      {/* --- Navbar --- */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-10">
              <div 
                className="flex-shrink-0 flex items-center gap-3 cursor-pointer group"
                onClick={() => navigateTo('Home')}
              >
                <div className="flex flex-col">
                    <span className="font-bold text-lg text-[#13294b] leading-tight tracking-tight">Gies Business School</span>
                    <span className="text-xs text-slate-500 font-medium">Research Analytics</span>
                </div>
              </div>
              <div className="hidden lg:flex space-x-2">
                 <button onClick={() => navigateTo('Home')} className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'Home' ? 'text-[#FF5F2D]' : 'text-slate-600 hover:text-[#13294b]'}`}>Home</button>
                 <button onClick={() => navigateTo('Research Areas')} className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'Research Areas' ? 'text-[#FF5F2D]' : 'text-slate-600 hover:text-[#13294b]'}`}>Research Areas</button>
                 <button onClick={() => navigateTo('Faculty')} className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'Faculty' ? 'text-[#FF5F2D]' : 'text-slate-600 hover:text-[#13294b]'}`}>Faculty</button>
                 <button onClick={() => handleScrollTo('about')} className="px-4 py-2 rounded-md text-sm font-semibold text-slate-600 hover:text-[#13294b] transition-colors">About</button>
                 <button onClick={() => handleScrollTo('contact')} className="px-4 py-2 rounded-md text-sm font-semibold text-slate-600 hover:text-[#13294b] transition-colors">Contact</button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Buttons removed as requested */}
            </div>
          </div>
        </div>
      </nav>

      {/* --- Content Rendering --- */}
      {activeTab === 'Home' ? (
        <LandingPage onNavigate={navigateTo} onScrollTo={handleScrollTo} onSearch={handleSearch} />
      ) : activeTab === 'Research Areas' ? (
        <DashboardHome onNavigate={navigateTo} />
      ) : activeTab === 'Faculty' ? (
        <FacultyDirectory onBack={() => navigateTo('Home')} initialSearchQuery={searchQuery} />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-32 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icons.TrendUp />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Work in Progress</h2>
            <p className="text-slate-500 mb-8">This module is currently under development.</p>
            <button onClick={() => navigateTo('Home')} className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800">Return Dashboard</button>
        </div>
      )}
      
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);