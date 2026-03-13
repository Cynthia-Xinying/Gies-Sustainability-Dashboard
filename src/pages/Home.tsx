import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ResearchCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const stories = [
    {
      id: 1,
      icon: "🤖",
      visual: "📊",
      title: "How AI Learned to Fight Its Own Biases",
      sdgs: ["SDG 3: Good Health", "SDG 10: Reduced Inequalities"],
      faculty: "Prof. Mehmet Ahsen",
      department: "Business Administration",
      challenge: "AI algorithms inherit human biases, reducing accuracy in breast cancer diagnosis when radiologists' assessments are influenced by patient risk profiles.",
      research: "Developed a bias-aware classification algorithm that detects and corrects for systematic errors in human-generated medical data.",
      impact: "Published in Information Systems Research (FT50), the algorithm improved diagnostic accuracy by 15% and is being integrated into clinical decision support systems nationwide.",
      metric: "+15%",
      metricLabel: "Diagnostic Accuracy",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      icon: "💰",
      visual: "🏦",
      title: "Protecting Communities from Wall Street",
      sdgs: ["SDG 1: No Poverty", "SDG 16: Peace & Justice"],
      faculty: "Prof. Rashad Abdel-Khalik",
      department: "Accountancy",
      challenge: "Non-profits nationwide—schools, hospitals, transit authorities—lost billions to predatory interest rate swap contracts sold by major banks.",
      research: "Forensic analysis uncovered how big banks exploited power imbalances, documenting 60 cases and the mechanisms of financial exploitation.",
      impact: "His book 'Brazen: Big Banks, Swap Mania and the Fallout' informed policy reforms and legal challenges, helping communities recover funds and prevent future exploitation.",
      metric: "$140B",
      metricLabel: "Losses Exposed",
      color: "from-red-500 to-orange-600"
    },
    {
      id: 3,
      icon: "🌍",
      visual: "⚖️",
      title: "Making Climate Policy Work for Everyone",
      sdgs: ["SDG 13: Climate Action", "SDG 10: Reduced Inequalities"],
      faculty: "Prof. Tatyana Deryugina",
      department: "Finance",
      challenge: "Energy efficiency policies often burden low-income households while benefiting wealthier ones, undermining both equity and political support for climate action.",
      research: "Analyzed the distributional effects of building energy codes, revealing that without careful design, climate policies can widen inequality.",
      impact: "Her evidence-based framework for equitable climate policy has been adopted by policymakers in California, New York, and Illinois, ensuring no household is left behind.",
      metric: "3 States",
      metricLabel: "Policy Adoption",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 4,
      icon: "💳",
      visual: "📈",
      title: "Credit Access Without Crushing Debt",
      sdgs: ["SDG 8: Decent Work", "SDG 10: Reduced Inequalities"],
      faculty: "Prof. Julia Fonseca",
      department: "Finance",
      challenge: "Aggressive debt collection practices push low-income Americans into bankruptcy, while limiting credit access traps them in poverty—a catch-22.",
      research: "Analyzed how debt collection restrictions affect financial health, finding that balanced regulations improve outcomes without reducing credit access.",
      impact: "Published in American Economic Review, her findings informed CFPB regulations affecting 2.3 million Americans, protecting vulnerable consumers while maintaining credit availability.",
      metric: "2.3M",
      metricLabel: "People Protected",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % stories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  const story = stories[currentSlide];

  return (
    <div className="relative">
      
      {/* Main Carousel Card */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-5 gap-0">
          
          {/* Left: Visual */}
          <div className={`md:col-span-2 bg-gradient-to-br ${story.color} p-12 flex items-center justify-center`}>
            <div className="text-center">
              <div className="text-9xl mb-4">{story.visual}</div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <div className="text-5xl font-bold text-white mb-2">{story.metric}</div>
                <div className="text-lg text-white/90">{story.metricLabel}</div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="md:col-span-3 p-8 md:p-12">
            
            {/* SDG Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {story.sdgs.map((sdg, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                  {sdg}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
              {story.title}
            </h3>

            {/* Story Arc */}
            <div className="space-y-4 mb-6">
              <div>
                <div className="text-sm font-bold text-red-600 mb-1">CHALLENGE</div>
                <p className="text-slate-700">{story.challenge}</p>
              </div>
              
              <div>
                <div className="text-sm font-bold text-blue-600 mb-1">RESEARCH</div>
                <p className="text-slate-700">{story.research}</p>
              </div>
              
              <div>
                <div className="text-sm font-bold text-green-600 mb-1">IMPACT</div>
                <p className="text-slate-700">{story.impact}</p>
              </div>
            </div>

            {/* Faculty Info */}
            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900">{story.faculty}</div>
                <div className="text-sm text-slate-600">{story.department}</div>
              </div>
              <Link to="/faculty">
                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                  Learn More →
                </button>
              </Link>
            </div>
            
          </div>
          
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-8">
        
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
          aria-label="Previous story"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="flex gap-3">
          {stories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all ${
                idx === currentSlide
                  ? 'w-12 h-3 bg-white rounded-full'
                  : 'w-3 h-3 bg-white/40 hover:bg-white/60 rounded-full'
              }`}
              aria-label={`Go to story ${idx + 1}`}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
          aria-label="Next story"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
      </div>

      {/* Story Counter */}
      <div className="text-center mt-4 text-white/60 text-sm">
        Story {currentSlide + 1} of {stories.length}
      </div>
      
    </div>
  );
};

const SDG_DATA = [
  { id: 13, name: 'Climate Action', value: 142, color: '#3F7E44' },
  { id: 8, name: 'Decent Work & Economic Growth', value: 128, color: '#A21942' },
  { id: 9, name: 'Industry, Innovation & Infrastructure', value: 115, color: '#FD6925' },
  { id: 12, name: 'Responsible Consumption', value: 98, color: '#BF8B2E' },
  { id: 7, name: 'Affordable & Clean Energy', value: 84, color: '#FCC30B' },
]

export default function Home() {
  const [showAllSDGs, setShowAllSDGs] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <div className="bg-[#13294b] text-white pt-20 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-8">
            Gies Sustainability Dashboard
          </h1>
          <div className="max-w-xl mx-auto mb-8 relative">
            <input
              type="text"
              placeholder="Search by faculty, SDG, keyword, or topic..."
              className="w-full pl-11 pr-4 py-4 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#FF5F2D]/50 shadow-2xl border-0"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto font-light">
            Connect Gies sustainability research with real-world impact across the UN Sustainable Development Goals (SDGs).
          </p>
          <Link to="/research-areas">
            <button className="flex items-center justify-center gap-3 px-8 py-4 bg-[#FF5F2D] text-white rounded-lg font-bold text-base hover:bg-[#e64a19] transition-all shadow-lg hover:shadow-xl active:scale-95 min-w-[260px] mx-auto">
              About the Research
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: '1,899', label: 'Total Publications', desc: 'All Gies research records in the database.' },
            { value: '613', label: 'Sustainability Publications', desc: 'Publications mapped to at least one UN SDG (32%).' },
            { value: '143', label: 'Engaged Faculty', desc: 'Faculty contributing to sustainability research.' },
            { value: '6', label: 'Departments Involved', desc: 'Academic units contributing to SDG-related work.' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-all">
              <h3 className="text-3xl font-bold text-[#13294b] mb-2">{stat.value}</h3>
              <div className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-1">{stat.label}</div>
              <div className="text-xs text-slate-500 leading-relaxed">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== CHOOSE YOUR JOURNEY ==================== */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-3xl font-bold text-center mb-4 text-slate-900">
            Choose Your Journey
          </h2>
          <p className="text-lg text-slate-600 text-center mb-12">
            Find the path that matches your goals
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Card 1: Student Journey */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
              <div className="text-center mb-6">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">👥</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">I'm a Student</h3>
                <p className="text-slate-600">Find a Mentor</p>
              </div>
              
              <p className="text-slate-700 mb-6">
                Filter by department and SDG to discover faculty working on sustainable finance and other topics. Explore their research areas and alignment.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                  <span className="text-sm text-slate-700">Select your department or interest area.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                  <span className="text-sm text-slate-700">Review faculty profiles and SDG connections.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                  <span className="text-sm text-slate-700">Save or contact potential mentors.</span>
                </li>
              </ul>
              
              <Link to="/student-journey">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Start Student Journey →
                </button>
              </Link>
            </div>

            {/* Card 2: Partner Journey */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
              <div className="text-center mb-6">
                <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">💰</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">I'm a Partner</h3>
                <p className="text-slate-600">Fund Impactful Research</p>
              </div>
              
              <p className="text-slate-700 mb-6">
                See key projects and faculty working on renewable energy and other high-impact SDG areas. Identify credible opportunities for partnership.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold text-sm">1</span>
                  <span className="text-sm text-slate-700">Choose an impact area (e.g., Renewable Energy – SDG 7).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold text-sm">2</span>
                  <span className="text-sm text-slate-700">Review active projects, faculty leads, and metrics.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold text-sm">3</span>
                  <span className="text-sm text-slate-700">Explore partnership or funding opportunities.</span>
                </li>
              </ul>
              
              <Link to="/partner-journey">
                <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition">
                  Start Partner Journey →
                </button>
              </Link>
            </div>

            {/* Card 3: Industry Journey */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
              <div className="text-center mb-6">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🤝</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">I'm from Industry</h3>
                <p className="text-slate-600">Explore Collaboration</p>
              </div>
              
              <p className="text-slate-700 mb-6">
                Connect academic expertise with real-world business challenges. Discover applied research and partnership opportunities.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold text-sm">1</span>
                  <span className="text-sm text-slate-700">Identify research aligned with your industry needs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold text-sm">2</span>
                  <span className="text-sm text-slate-700">Review faculty expertise and collaboration history.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold text-sm">3</span>
                  <span className="text-sm text-slate-700">Connect with faculty for partnership discussion.</span>
                </li>
              </ul>
              
              <Link to="/industry-journey">
                <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                  Start Industry Journey →
                </button>
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* Where Gies Leads on Sustainability */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#13294b]">Where Gies Leads on Sustainability</h2>
              <p className="text-sm text-slate-500 mt-1">Top UN SDG areas by number of publications.</p>
            </div>
            <button
              onClick={() => setShowAllSDGs(!showAllSDGs)}
              className="text-xs font-bold text-[#13294b] hover:text-[#FF5F2D] transition-colors bg-slate-100 px-2 py-1 rounded"
            >
              Show: {showAllSDGs ? 'Top 5' : 'All 17'}
            </button>
          </div>
          <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2">
            {(showAllSDGs ? [...SDG_DATA, { id: 17, name: 'Partnerships for the Goals', value: 76, color: '#19486A' }, { id: 3, name: 'Good Health & Well-being', value: 65, color: '#4C9F38' }] : SDG_DATA).map((sdg) => (
              <div key={sdg.id} className="group">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 shrink-0 rounded flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: sdg.color }}>
                    {sdg.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700 truncate">{sdg.name}</span>
                      <span className="font-bold text-slate-900">{sdg.value}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full opacity-80 transition-all" style={{ width: `${(sdg.value / 142) * 100}%`, backgroundColor: sdg.color }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== FEATURED RESEARCH IMPACT CAROUSEL ==================== */}
      <section className="py-16 px-6 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-12">
            <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
              FEATURED RESEARCH IMPACT
            </div>
            <h2 className="text-4xl font-bold text-white mb-3">
              From Research to Real-World Change
            </h2>
            <p className="text-xl text-blue-100">
              Discover how Gies faculty tackle global challenges
            </p>
          </div>

          <ResearchCarousel />
          
        </div>
      </section>
    </div>
  )
}
