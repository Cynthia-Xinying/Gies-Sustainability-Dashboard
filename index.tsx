import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// --- Icons ---
const Icons = {
  Search: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Book: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  Users: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Leaf: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Star: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
  TrendUp: () => <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  ChevronDown: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>,
  Mail: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  UserCircle: () => <svg className="w-12 h-12 text-blue-100" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM12 4a4 4 0 100 8 4 4 0 000-8zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>,
  ArrowLeft: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
  Heart: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  Check: () => <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>,
  Filter: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
};

const CustomLeaf = ({className}: {className?: string}) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22s5-2 12-10V2l-4 4c-5 4-8 12-8 16z"></path>
        <path d="M10 10c0 4-4 8-6 10"></path>
    </svg>
);

// --- Component: Dashboard Home ---
const DashboardHome = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [showSustainabilityOnly, setShowSustainabilityOnly] = useState(false);

  return (
    <>
      {/* --- Hero Section --- */}
      <div className="bg-[#1E293B] pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Abstract shapes/bg */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-900 opacity-20 transform -skew-x-12"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <p className="text-blue-200 font-medium mb-3 tracking-wide text-sm uppercase">Discover 1,899+ Publications from 143 Gies Researchers</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Leading Research in Sustainability,<br className="hidden md:block"/> Finance, and Business Innovation
          </h1>
          
          <div className="flex justify-center gap-4 mt-8">
             <button className="bg-[#FF5F2D] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#e64a19] transition">
               <Icons.Search /> Explore Research
             </button>
             <button 
                onClick={() => onNavigate('Faculty')}
                className="bg-transparent border border-slate-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-slate-800 transition"
             >
               <Icons.Users /> Find a Mentor
             </button>
             <button className="bg-[#10B981] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#059669] transition">
               <span className="text-lg">$</span> Fund Research
             </button>
          </div>
        </div>
      </div>

      {/* --- Main Content Container --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-20">
        
        {/* --- Stats Row --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Publications', value: '1,899', sub: '+64% since 2010', icon: <Icons.Book />, color: 'text-blue-600', trend: true },
            { label: 'Total Researchers', value: '143', sub: 'Active faculty', icon: <Icons.Users />, color: 'text-[#FF5F2D]', trend: false },
            { label: 'Sustainability Papers', value: '426', sub: '21% of total', icon: <CustomLeaf className="w-6 h-6" />, color: 'text-green-500', trend: false },
            { label: 'FT50 Publications', value: '399', sub: 'Top-tier journals', icon: <Icons.Star />, color: 'text-amber-500', trend: true },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.color} p-2 bg-slate-50 rounded-lg`}>{stat.icon}</div>
                {stat.trend && <div className="text-green-500"><Icons.TrendUp /></div>}
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-slate-600">{stat.label}</div>
              <div className="text-xs text-slate-400 mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* --- Filter Bar --- */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center gap-4 justify-between">
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                {['All Departments', 'Research Topics', 'Year Range (2010-2020)'].map(filter => (
                    <button key={filter} className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 whitespace-nowrap">
                        {filter} <Icons.ChevronDown />
                    </button>
                ))}
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={showSustainabilityOnly}
                        onChange={(e) => setShowSustainabilityOnly(e.target.checked)}
                        className="w-4 h-4 text-[#10B981] rounded focus:ring-[#10B981] border-gray-300" 
                    />
                    <span className="text-sm text-slate-600 whitespace-nowrap">Show only Sustainability Research</span>
                </label>
                <div className="relative flex-1 md:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Icons.Search />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
            </div>
        </div>

        {/* --- Charts Row 1 --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-2">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Publications by Department</h3>
                <div className="space-y-6">
                    {[
                        { label: 'Business Admin', total: 1100, sust: 250 },
                        { label: 'Accountancy', total: 320, sust: 60 },
                        { label: 'Finance', total: 300, sust: 50 },
                        { label: 'Gies Business', total: 250, sust: 40 },
                        { label: 'Gies Affiliates', total: 80, sust: 10 }
                    ].map((item, idx) => (
                        <div key={idx} className="relative">
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                                <span>{item.label}</span>
                            </div>
                            <div className="h-8 bg-slate-50 rounded-full w-full relative flex items-center">
                                {/* Total Bar */}
                                <div 
                                    className="absolute left-0 top-0 h-full bg-[#3B82F6] rounded-full opacity-90 z-10" 
                                    style={{ width: `${(item.total / 1200) * 100}%` }}
                                ></div>
                            </div>
                             <div className="h-3 w-full bg-slate-100 rounded-full mt-1 overflow-hidden relative">
                                <div className="absolute top-0 left-0 h-full bg-[#3B82F6]" style={{ width: `${(item.total / 1200) * 100}%` }}></div>
                             </div>
                             <div className="h-3 w-full bg-slate-100 rounded-full mt-1 overflow-hidden relative">
                                <div className="absolute top-0 left-0 h-full bg-[#10B981]" style={{ width: `${(item.sust / 1200) * 100}%` }}></div>
                             </div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-4 mt-6 justify-center text-xs font-medium">
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[#10B981] rounded-full"></div> Sustainability-focused</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[#3B82F6] rounded-full"></div> Total Publications</div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
                <h3 className="text-lg font-bold text-slate-800 mb-4 self-start">Sustainability Focus</h3>
                <div className="relative w-48 h-48">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        <path className="text-slate-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" />
                        <path className="text-[#10B981]" strokeDasharray="21, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round"/>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-3xl font-bold text-slate-800">21%</span>
                        <span className="text-xs text-slate-500">Focused</span>
                    </div>
                </div>
                <div className="mt-6 w-full space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#10B981]"></div> Sustainability</span>
                        <span className="font-semibold text-slate-700">426 (21%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-300"></div> General Research</span>
                        <span className="font-semibold text-slate-700">1,473 (79%)</span>
                    </div>
                </div>
            </div>
        </div>

        {/* --- Area Chart (Trends) --- */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-12">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">Publication Trends (2010-2020)</h3>
                <div className="flex items-center text-[#10B981] text-sm font-semibold bg-green-50 px-3 py-1 rounded-full">
                    <Icons.TrendUp /> 64% growth from 2010 to 2020
                </div>
            </div>
            
            <div className="h-64 w-full relative">
                {[0, 25, 50, 75, 100].map((line, i) => (
                    <div key={i} className="absolute w-full border-t border-slate-100 text-xs text-slate-400" style={{ bottom: `${line}%` }}>
                         <span className="absolute -left-8 -top-2">{line * 2.2}</span>
                    </div>
                ))}
                
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <path d="M0,200 C100,190 300,170 600,120 S1000,50 1200,20 L1200,250 L0,250 Z" fill="url(#blueGradient)" opacity="0.1" />
                    <path d="M0,200 C100,190 300,170 600,120 S1000,50 1200,20" fill="none" stroke="#3B82F6" strokeWidth="3" />
                    
                    <path d="M0,240 C100,238 300,230 600,210 S1000,180 1200,160 L1200,250 L0,250 Z" fill="url(#greenGradient)" opacity="0.1" />
                    <path d="M0,240 C100,238 300,230 600,210 S1000,180 1200,160" fill="none" stroke="#10B981" strokeWidth="3" />

                    <defs>
                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5"/>
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.5"/>
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
                        </linearGradient>
                    </defs>
                </svg>

                <div className="absolute -bottom-6 left-0 w-full flex justify-between text-xs text-slate-400">
                    {['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'].map(year => (
                        <span key={year}>{year}</span>
                    ))}
                </div>
            </div>
            
            <div className="flex gap-6 mt-8 justify-center text-sm font-medium">
                <div className="flex items-center gap-2"><div className="w-2 h-0.5 bg-[#10B981] h-1 rounded"></div> Sustainability Papers</div>
                <div className="flex items-center gap-2"><div className="w-2 h-0.5 bg-[#3B82F6] h-1 rounded"></div> Total Publications</div>
            </div>
        </div>

        {/* --- Faculty / Researchers Section --- */}
        <div className="mb-12">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Meet Our Top Researchers in Sustainable Finance</h2>
                    <p className="text-slate-500 mt-1">Leading experts committed to sustainability research</p>
                </div>
                <button 
                    onClick={() => onNavigate('Faculty')}
                    className="bg-[#FF5F2D] hover:bg-[#e64a19] text-white px-5 py-2 rounded-lg text-sm font-semibold transition"
                >
                    View All Faculty →
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        name: 'Dr. Sarah Chen',
                        dept: 'Finance',
                        email: 'schen@illinois.edu',
                        pubs: 28,
                        sust: 21,
                        sustPct: 75,
                        tags: ['#Renewable Energy Finance', '#Green Bonds', '#ESG Metrics'],
                        color: 'bg-blue-100 text-blue-600'
                    },
                    {
                        name: 'Dr. Michael Rodriguez',
                        dept: 'Accountancy',
                        email: 'mrodriguez@illinois.edu',
                        pubs: 25,
                        sust: 18,
                        sustPct: 72,
                        tags: ['#Climate Risk', '#Sustainable Investment', '#ESG Reporting'],
                        color: 'bg-indigo-100 text-indigo-600'
                    },
                    {
                        name: 'Dr. Emily Thompson',
                        dept: 'Business Administration',
                        email: 'ethompson@illinois.edu',
                        pubs: 32,
                        sust: 20,
                        sustPct: 63,
                        tags: ['#Climate Finance', '#Impact Investing', '#Carbon Markets'],
                        color: 'bg-sky-100 text-sky-600'
                    }
                ].map((prof, idx) => (
                    <div key={idx} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                        <div className="flex items-start gap-4 mb-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${prof.color}`}>
                                {prof.name.split(' ')[1][0]}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">{prof.name}</h4>
                                <div className="text-xs text-slate-500 font-medium">{prof.dept}</div>
                                <div className="text-xs text-slate-400">{prof.email}</div>
                            </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-slate-600">
                                <Icons.Book /><span className="ml-2 font-medium">{prof.pubs} Publications</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-600">
                                <div className="flex items-center">
                                    <CustomLeaf className="w-4 h-4 text-green-500 mr-2" />
                                    <span className="font-medium">{prof.sust} Sustainability ({prof.sustPct}%)</span>
                                </div>
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Research Areas:</div>
                            <div className="flex flex-wrap gap-2">
                                {prof.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600 font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 bg-[#1E293B] hover:bg-slate-800 text-white py-2 rounded-lg text-sm font-medium transition">
                                View Profile
                            </button>
                            <button className="px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition text-slate-600">
                                <Icons.Mail />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* --- Topics Footer --- */}
        <div className="text-center py-12 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-6">Explore Research Topics</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {['Sustainable Finance', 'Artificial Intelligence', 'Renewable Energy', 'Gene Networks', 'Climate Action', 'ESG Investing', 'Business Admin', 'Binary Classification', 'Green Bonds', 'Healthcare', 'Energy Policy', 'Accounting'].map((topic, i) => (
                    <span 
                        key={i} 
                        className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer
                            ${[0, 2, 4, 5, 8, 10].includes(i) 
                                ? 'bg-[#10B981] text-white hover:bg-[#059669]' 
                                : 'bg-[#3B82F6] text-white hover:bg-[#2563EB]'
                            }`}
                    >
                        {topic}
                    </span>
                ))}
            </div>
            <p className="mt-6 text-slate-400 text-sm">Click on any topic to filter research</p>
        </div>

      </div>
    </>
  );
};

// --- Component: Faculty Directory (Detailed Page) ---
const FacultyDirectory = ({ onBack }: { onBack: () => void }) => {
    const facultyList = [
        {
            name: 'Dr. Sarah Chen', title: 'Associate Professor', dept: 'Finance Department', email: 'schen@illinois.edu',
            pubs: '28 Publications (2015-2020)', sust: '21 Sustainability-focused (75%)', ft: '8 Financial Times publications',
            tags: ['#Renewable Energy Finance', '#Green Bonds', '#ESG Metrics', '#Climate Risk', '#Sustainable Investment'],
            recent: ['Impact of Green Bonds on Corporate Sustainability (2020)', 'ESG Integration in Portfolio Management (2019)'],
            sdgs: [7, 13, 17], color: 'bg-blue-100 text-blue-600'
        },
        {
            name: 'Dr. Michael Rodriguez', title: 'Professor', dept: 'Accountancy Department', email: 'mrodriguez@illinois.edu',
            pubs: '25 Publications (2015-2020)', sust: '18 Sustainability-focused (72%)', ft: '6 Financial Times publications',
            tags: ['#ESG Reporting', '#Climate Risk', '#Sustainable Accounting', '#Corporate Governance'],
            recent: ['Climate Risk Disclosure in Financial Statements (2020)', 'The Evolution of ESG Reporting Standards (2019)'],
            sdgs: [12, 13], color: 'bg-indigo-100 text-indigo-600'
        },
        {
            name: 'Dr. Emily Thompson', title: 'Associate Professor', dept: 'Business Administration Department', email: 'ethompson@illinois.edu',
            pubs: '32 Publications (2015-2020)', sust: '20 Sustainability-focused (63%)', ft: '9 Financial Times publications',
            tags: ['#Climate Finance', '#Impact Investing', '#Carbon Markets', '#ESG Strategy'],
            recent: ['Carbon Market Mechanisms and Corporate Strategy (2020)', 'Impact Investing in Emerging Markets (2019)'],
            sdgs: [7, 9], color: 'bg-sky-100 text-sky-600'
        },
        {
            name: 'Dr. James Wilson', title: 'Associate Professor', dept: 'Finance Department', email: 'jwilson@illinois.edu',
            pubs: '22 Publications (2015-2020)', sust: '14 Sustainability-focused (64%)', ft: '5 Financial Times publications',
            tags: ['#Renewable Energy Finance', '#Clean Technology Investment', '#ESG Analytics'],
            recent: ['Financing the Energy Transition (2020)', 'Returns on Clean Technology Investments (2019)'],
            sdgs: [7, 9], color: 'bg-cyan-100 text-cyan-600'
        },
        {
            name: 'Dr. Maria Garcia', title: 'Professor', dept: 'Accountancy Department', email: 'mgarcia@illinois.edu',
            pubs: '30 Publications (2015-2020)', sust: '19 Sustainability-focused (63%)', ft: '7 Financial Times publications',
            tags: ['#Sustainability Reporting', '#ESG Metrics', '#Corporate Transparency', '#Climate Disclosure'],
            recent: ['Best Practices in Sustainability Reporting (2020)', 'ESG Metrics and Firm Performance (2019)'],
            sdgs: [12, 13, 17], color: 'bg-teal-100 text-teal-600'
        },
        {
            name: 'Dr. David Lee', title: 'Associate Professor', dept: 'Finance Department', email: 'dlee@illinois.edu',
            pubs: '26 Publications (2015-2020)', sust: '17 Sustainability-focused (65%)', ft: '6 Financial Times publications',
            tags: ['#Green Bonds', '#Sustainable Finance', '#Climate Risk', '#ESG Integration'],
            recent: ['The Growth of Green Bond Markets (2020)', 'Climate Risk in Asset Pricing (2019)'],
            sdgs: [13, 17], color: 'bg-blue-100 text-blue-600'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button onClick={onBack} className="flex items-center text-slate-500 hover:text-slate-800 mb-6 font-medium text-sm transition">
                <Icons.ArrowLeft /> <span className="ml-2">Back to Dashboard</span>
            </button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Find Your Faculty Mentor</h1>
                    <p className="text-slate-500 mt-1">Discover professors in sustainable finance and renewable energy research</p>
                </div>
                <div className="relative w-full md:w-96">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Icons.Search />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search faculty..." 
                        className="pl-10 pr-4 py-3 w-full border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" 
                    />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* --- Filters Sidebar --- */}
                <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-700 uppercase text-xs tracking-wider">Filters</h3>
                        </div>
                        
                        <div className="mb-6">
                            <h4 className="font-semibold text-sm text-slate-800 mb-3">Department</h4>
                            <div className="space-y-2">
                                {['Business Admin', 'Finance', 'Accountancy', 'Gies Business', 'Gies Affiliates'].map((dept, i) => (
                                    <label key={i} className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" defaultChecked={i < 3} className="w-4 h-4 text-[#FF5F2D] rounded border-slate-300 focus:ring-[#FF5F2D]" />
                                        <span className="text-sm text-slate-600">{dept}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-sm text-slate-800 mb-3">Research Focus</h4>
                            <div className="space-y-2">
                                {['Sustainability', 'General Research'].map((focus, i) => (
                                    <label key={i} className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" defaultChecked={i === 0} className="w-4 h-4 text-[#FF5F2D] rounded border-slate-300 focus:ring-[#FF5F2D]" />
                                        <span className="text-sm text-slate-600">{focus}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                         <div className="mb-6">
                            <h4 className="font-semibold text-sm text-slate-800 mb-3">Publication Count</h4>
                            <div className="space-y-2">
                                {['20+ publications', '10-20 publications', '5-10 publications'].map((count, i) => (
                                    <label key={i} className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="pub_count" defaultChecked={i === 0} className="w-4 h-4 text-[#3B82F6] border-slate-300 focus:ring-[#3B82F6]" />
                                        <span className="text-sm text-slate-600">{count}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="flex-1 bg-[#3B82F6] text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition">Apply</button>
                            <button className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-lg text-sm font-semibold hover:bg-slate-200 transition">Clear</button>
                        </div>
                    </div>
                </div>

                {/* --- Faculty List --- */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {facultyList.map((prof, idx) => (
                        <div key={idx} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition duration-200 flex flex-col h-full">
                            <div className="flex gap-4 mb-4">
                                <div className={`w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-xl font-bold ${prof.color}`}>
                                    {prof.name.split(' ')[1][0]}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">{prof.name}</h3>
                                    <p className="text-sm text-slate-600 font-medium">{prof.title}</p>
                                    <p className="text-sm text-slate-500">{prof.dept}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{prof.email}</p>
                                </div>
                            </div>
                            
                            <div className="border-t border-b border-slate-50 py-3 mb-4 space-y-2">
                                <div className="flex items-center gap-2 text-xs text-slate-700">
                                    <span className="text-blue-500"><Icons.Book /></span> {prof.pubs}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-700">
                                    <span className="text-green-500"><CustomLeaf className="w-4 h-4" /></span> {prof.sust}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-700">
                                    <span className="text-amber-500"><Icons.Star /></span> {prof.ft}
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="text-xs font-semibold text-slate-800 mb-2 flex items-center gap-1">
                                    <Icons.Search /> Research Areas:
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {prof.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                                            {tag.replace('#', '')}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4 flex-1">
                                <div className="text-xs font-semibold text-slate-800 mb-2 flex items-center gap-1">
                                    <Icons.TrendUp /> Recent Work:
                                </div>
                                <ul className="space-y-1">
                                    {prof.recent.map((work, i) => (
                                        <li key={i} className="text-xs text-slate-600 line-clamp-1 border-l-2 border-slate-200 pl-2">
                                            {work}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                                <div className="flex gap-1">
                                    {prof.sdgs.map(sdg => (
                                        <div key={sdg} className="w-6 h-6 bg-[#10B981] text-white text-[10px] font-bold flex items-center justify-center rounded shadow-sm" title={`SDG ${sdg}`}>
                                            {sdg}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <button className="bg-[#1E293B] hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold transition">
                                        View Full Profile
                                    </button>
                                    <button className="bg-[#FF5F2D] hover:bg-[#e64a19] text-white p-2 rounded-lg transition shadow-sm">
                                        <Icons.Mail />
                                    </button>
                                    <button className="border border-slate-200 hover:border-red-200 hover:bg-red-50 text-slate-400 hover:text-red-500 p-2 rounded-lg transition">
                                        <Icons.Heart />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---
const App = () => {
  const [activeTab, setActiveTab] = useState('Home');

  // Handle navigation
  const navigateTo = (page: string) => {
      setActiveTab(page);
      window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
      
      {/* --- Navbar --- */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              <div 
                className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
                onClick={() => navigateTo('Home')}
              >
                <div className="w-8 h-8 bg-[#FF5F2D] rounded-lg flex items-center justify-center text-white font-bold text-xl">G</div>
                <span className="font-bold text-xl text-slate-900 tracking-tight">Gies Business School</span>
              </div>
              <div className="hidden md:flex space-x-6">
                {['Home', 'Research Areas', 'Faculty', 'About', 'Contact'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => navigateTo(item)}
                    className={`text-sm font-medium transition-colors ${activeTab === item ? 'text-[#FF5F2D]' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => navigateTo('Faculty')}
                className="bg-[#FF5F2D] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#e64a19] transition-colors shadow-sm"
              >
                Find a Mentor
              </button>
              <button className="bg-[#10B981] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#059669] transition-colors shadow-sm">
                Fund Research
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Content Rendering --- */}
      {activeTab === 'Home' ? (
        <DashboardHome onNavigate={navigateTo} />
      ) : activeTab === 'Faculty' ? (
        <FacultyDirectory onBack={() => navigateTo('Home')} />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h2 className="text-