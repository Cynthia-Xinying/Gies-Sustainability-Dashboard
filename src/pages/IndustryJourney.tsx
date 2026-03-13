import { Link } from 'react-router-dom';

export default function IndustryJourney() {
  const industries = [
    {
      icon: "🏦",
      name: "Finance & Banking",
      facultyCount: 23,
      focus: "ESG, fintech, risk management, sustainable finance",
      sdgs: ["SDG 8", "SDG 13"]
    },
    {
      icon: "⚡",
      name: "Energy & Sustainability",
      facultyCount: 18,
      focus: "Renewables, carbon accounting, energy transition",
      sdgs: ["SDG 7", "SDG 13"]
    },
    {
      icon: "📦",
      name: "Supply Chain & Operations",
      facultyCount: 15,
      focus: "Circular economy, ethical sourcing, logistics",
      sdgs: ["SDG 8", "SDG 12"]
    },
    {
      icon: "💻",
      name: "Technology & Innovation",
      facultyCount: 12,
      focus: "Digital transformation, AI ethics, responsible tech",
      sdgs: ["SDG 9", "SDG 12"]
    },
    {
      icon: "🏢",
      name: "Corporate Governance",
      facultyCount: 20,
      focus: "ESG reporting, board diversity, compliance",
      sdgs: ["SDG 16", "SDG 17"]
    },
    {
      icon: "🌾",
      name: "Food & Agriculture",
      facultyCount: 8,
      focus: "Sustainable agriculture, food systems, supply chains",
      sdgs: ["SDG 2", "SDG 12"]
    }
  ];

  const successStories = [
    {
      company: "Fortune 500 Energy Company",
      faculty: "Dr. Michael Smith",
      department: "Finance",
      challenge: "Developing carbon accounting methodology for global operations",
      result: "New framework adopted company-wide, saving $12M annually in reporting costs",
      duration: "18 months",
      outcome: "Framework now industry standard, cited by 15+ companies"
    },
    {
      company: "Tech Startup (Series A)",
      faculty: "Dr. Sarah Lee",
      department: "Accountancy",
      challenge: "ESG data quality and verification for investor reporting",
      result: "Patent-pending methodology, successful $2M Series A raise",
      duration: "12 months",
      outcome: "Startup acquired by Fortune 100 company"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-6xl mb-6">🤝</div>
          <h1 className="text-5xl font-bold mb-6">
            Partner with Gies Faculty on Real-World Solutions
          </h1>
          <p className="text-2xl text-green-100 max-w-3xl mx-auto mb-8">
            Connect academic expertise with business challenges to drive sustainable innovation
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏢</span>
              <span>15 Active Partnerships</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💡</span>
              <span>Applied Research Focus</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span>12-18 Month Projects</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            How Collaboration Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Identify Research Match</h3>
              <p className="text-slate-600">
                Browse faculty by industry sector or business challenge. Review their publications and expertise areas.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Connect with Faculty</h3>
              <p className="text-slate-600">
                Schedule exploratory meeting to discuss your business challenge and research opportunities.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Define Project Scope</h3>
              <p className="text-slate-600">
                Co-create research plan with clear deliverables, timeline, and success metrics.
              </p>
            </div>
            
          </div>

          {/* Timeline Note */}
          <div className="mt-8 text-center bg-green-50 p-6 rounded-lg">
            <p className="text-slate-700">
              <strong>Typical Timeline:</strong> 3-6 months for setup and scoping, 12-18 months for project execution
            </p>
          </div>
          
        </div>
      </section>

      {/* ==================== RESEARCH BY INDUSTRY ==================== */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-3xl font-bold text-center mb-4 text-slate-900">
            Find Expertise by Industry
          </h2>
          <p className="text-lg text-slate-600 text-center mb-12">
            Discover faculty aligned with your sector's challenges
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {industries.map((industry, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition border-l-4 border-green-500">
                
                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{industry.icon}</span>
                  <h3 className="text-xl font-bold text-slate-900">{industry.name}</h3>
                </div>
                
                {/* Faculty Count */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-green-600">{industry.facultyCount}</span>
                  <span className="text-slate-600 ml-2">faculty members</span>
                </div>
                
                {/* Focus Areas */}
                <div className="mb-4">
                  <div className="text-sm font-semibold text-slate-700 mb-1">Focus Areas:</div>
                  <p className="text-sm text-slate-600">{industry.focus}</p>
                </div>
                
                {/* SDG Tags */}
                <div className="flex gap-2 mb-4">
                  {industry.sdgs.map((sdg, i) => (
                    <span key={i} className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                      {sdg}
                    </span>
                  ))}
                </div>
                
                {/* Button */}
                <Link to="/faculty">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition text-sm">
                    Browse Faculty
                  </button>
                </Link>
                
              </div>
            ))}
            
          </div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <Link to="/faculty">
              <button className="bg-white hover:bg-gray-50 border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold transition">
                View All Faculty & Expertise
              </button>
            </Link>
          </div>
          
        </div>
      </section>

      {/* ==================== SUCCESS STORIES ==================== */}
      <section className="py-16 px-6 bg-gradient-to-br from-slate-50 to-green-50">
        <div className="max-w-5xl mx-auto">
          
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            Success Stories
          </h2>
          
          <div className="space-y-8">
            
            {successStories.map((story, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-500">
                
                <div className="grid md:grid-cols-3 gap-6">
                  
                  {/* Left: Partnership Info */}
                  <div className="md:col-span-1">
                    <div className="text-sm text-slate-500 mb-1">Partnership</div>
                    <div className="font-bold text-lg text-slate-900 mb-3">{story.company}</div>
                    
                    <div className="text-sm text-slate-500 mb-1">Faculty Lead</div>
                    <div className="font-semibold text-slate-900 mb-1">{story.faculty}</div>
                    <div className="text-sm text-slate-600 mb-3">{story.department}</div>
                    
                    <div className="text-sm text-slate-500 mb-1">Duration</div>
                    <div className="font-medium text-slate-900">{story.duration}</div>
                  </div>
                  
                  {/* Right: Challenge & Results */}
                  <div className="md:col-span-2">
                    <div className="mb-4">
                      <div className="font-semibold text-slate-900 mb-2">Challenge:</div>
                      <p className="text-slate-700">{story.challenge}</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="font-semibold text-green-700 mb-2">Result:</div>
                      <p className="text-slate-700">{story.result}</p>
                    </div>
                    
                    <div>
                      <div className="font-semibold text-slate-900 mb-2">Long-term Outcome:</div>
                      <p className="text-slate-700">{story.outcome}</p>
                    </div>
                  </div>
                  
                </div>
                
              </div>
            ))}
            
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          <h2 className="text-3xl font-bold mb-6 text-slate-900">
            Ready to Explore Collaboration?
          </h2>
          
          <p className="text-lg text-slate-600 mb-8">
            Connect with our faculty to discuss how academic research can address your business challenges
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/faculty">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition shadow-lg">
                Browse Faculty by Industry
              </button>
            </Link>
            
            <Link to="/leadership">
              <button className="bg-white hover:bg-gray-50 text-green-600 border-2 border-green-600 px-8 py-4 rounded-lg text-lg font-semibold transition">
                Schedule Exploratory Meeting
              </button>
            </Link>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-slate-600 mb-4">Additional Resources:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/data-quality" className="text-blue-600 hover:underline font-medium">
                Our Research Methodology
              </Link>
              <span className="text-slate-300">•</span>
              <Link to="/leadership" className="text-blue-600 hover:underline font-medium">
                Strategic Investment Insights
              </Link>
              <span className="text-slate-300">•</span>
              <a href="mailto:partnerships@gies.illinois.edu" className="text-blue-600 hover:underline font-medium">
                Contact Partnerships Team
              </a>
            </div>
          </div>
          
        </div>
      </section>

    </div>
  )
}
