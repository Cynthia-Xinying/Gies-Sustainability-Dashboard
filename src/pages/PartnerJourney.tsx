import { Link } from 'react-router-dom';

export default function PartnerJourney() {
  const projects = [
    {
      title: "Climate Finance & ESG Performance",
      sdgs: ["SDG 13", "SDG 7"],
      lead: "Dr. John Smith",
      department: "Finance",
      status: "Seeking Partners",
      funding: "$250,000",
      description: "Examining how ESG ratings impact corporate climate adaptation strategies and financial performance in emerging markets."
    },
    {
      title: "Sustainable Supply Chain Ethics",
      sdgs: ["SDG 8", "SDG 12"],
      lead: "Dr. Sarah Chen",
      department: "Business Administration",
      status: "Pilot Complete",
      funding: "$400,000",
      description: "Developing frameworks for ethical labor practices and circular economy principles in global supply chains."
    },
    {
      title: "Renewable Energy Investment Models",
      sdgs: ["SDG 7", "SDG 13"],
      lead: "Dr. Michael Lee",
      department: "Finance",
      status: "New Initiative",
      funding: "$350,000",
      description: "Creating financial models to optimize renewable energy project investments in developing regions."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-6xl mb-6">💰</div>
          <h1 className="text-5xl font-bold mb-6">
            Fund Sustainable Research at Gies
          </h1>
          <p className="text-2xl text-orange-100 max-w-3xl mx-auto mb-8">
            Support faculty tackling global challenges through evidence-based research aligned with the UN SDGs
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>92% Data Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>17 UN SDGs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Proven Impact</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PARTNERSHIP MODELS ==================== */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-3xl font-bold text-center mb-4 text-slate-900">
            Partnership Models
          </h2>
          <p className="text-lg text-slate-600 text-center mb-12">
            Choose the funding level that matches your goals
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Tier 1: Endowed Chair */}
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-orange-500 hover:shadow-xl transition">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Endowed Chair</h3>
                <div className="text-3xl font-bold text-orange-600 mb-4">$1M+</div>
              </div>
              
              <ul className="space-y-3 mb-8 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>Hire world-class faculty member</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>Support 5+ PhD students</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>Naming rights & recognition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>Annual impact reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>Quarterly leadership meetings</span>
                </li>
              </ul>
              
              <div className="text-sm text-slate-600 mb-4">
                <strong>Expected Impact:</strong> 15+ publications/year, 3-5 PhD graduates, industry partnerships
              </div>
              
              <Link to="/leadership">
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition">
                  Learn More
                </button>
              </Link>
            </div>

            {/* Tier 2: Research Grant */}
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-blue-500 hover:shadow-xl transition">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🔬</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Research Grant</h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">$100K-500K</div>
              </div>
              
              <ul className="space-y-3 mb-8 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Multi-year project (3-5 years)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>2-3 faculty + team of students</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Annual progress reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Semi-annual advisory meetings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Recognition in publications</span>
                </li>
              </ul>
              
              <div className="text-sm text-slate-600 mb-4">
                <strong>Expected Impact:</strong> 8-12 publications, 8-10 students trained, policy brief
              </div>
              
              <Link to="/leadership">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                  Learn More
                </button>
              </Link>
            </div>

            {/* Tier 3: Student Fellowship */}
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-green-500 hover:shadow-xl transition">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🎓</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Student Fellowship</h3>
                <div className="text-3xl font-bold text-green-600 mb-4">$25K-50K</div>
              </div>
              
              <ul className="space-y-3 mb-8 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Fund PhD or Master's student</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Sustainability-focused research</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Annual presentation of findings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Faculty mentorship</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Fellowship naming opportunity</span>
                </li>
              </ul>
              
              <div className="text-sm text-slate-600 mb-4">
                <strong>Expected Impact:</strong> 1 student trained, thesis/dissertation, 2-3 papers
              </div>
              
              <Link to="/leadership">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition">
                  Learn More
                </button>
              </Link>
            </div>
            
          </div>

          {/* Custom Partnership Note */}
          <div className="mt-8 text-center bg-blue-50 p-6 rounded-lg">
            <div className="text-2xl mb-2">💡</div>
            <p className="text-lg text-slate-700">
              <strong>Custom Partnership:</strong> Have a specific vision? We can design a funding model tailored to your impact goals.
            </p>
            <Link to="/leadership">
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                Schedule Consultation
              </button>
            </Link>
          </div>
          
        </div>
      </section>

      {/* ==================== ACTIVE OPPORTUNITIES ==================== */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-3xl font-bold text-center mb-4 text-slate-900">
            Active Research Opportunities
          </h2>
          <p className="text-lg text-slate-600 text-center mb-12">
            Projects ready for funding now
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            
            {projects.map((project, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition">
                
                {/* SDG Tags */}
                <div className="flex gap-2 mb-4">
                  {project.sdgs.map((sdg, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                      {sdg}
                    </span>
                  ))}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-slate-600 mb-4">
                  {project.description}
                </p>
                
                {/* Lead & Department */}
                <div className="mb-4 text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-slate-700">Lead:</span>
                    <span className="text-slate-600">{project.lead}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">Department:</span>
                    <span className="text-slate-600">{project.department}</span>
                  </div>
                </div>
                
                {/* Status & Funding */}
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <div className="text-xs text-slate-500">Status</div>
                    <div className="font-medium text-sm text-slate-700">{project.status}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Funding Need</div>
                    <div className="font-bold text-lg text-orange-600">{project.funding}</div>
                  </div>
                </div>
                
                {/* Button */}
                <Link to="/leadership">
                  <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg font-medium transition text-sm">
                    View Details
                  </button>
                </Link>
                
              </div>
            ))}
            
          </div>

          <div className="text-center mt-8">
            <Link to="/faculty">
              <button className="bg-white hover:bg-gray-50 border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold transition">
                View All Projects & Faculty
              </button>
            </Link>
          </div>
          
        </div>
      </section>

      {/* ==================== WHY GIES ==================== */}
      <section className="py-16 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-5xl mx-auto">
          
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            Why Partner with Gies?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Data-Driven Impact</h3>
              <p className="text-slate-600">
                Our 92/100 quality score ensures transparency and accountability in every partnership
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">SDG Aligned</h3>
              <p className="text-slate-600">
                Research directly mapped to UN Sustainable Development Goal targets and metrics
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Proven Results</h3>
              <p className="text-slate-600">
                320% growth in sustainability publications over 6 years with measurable real-world impact
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          <h2 className="text-3xl font-bold mb-6 text-slate-900">
            Ready to Make an Impact?
          </h2>
          
          <p className="text-lg text-slate-600 mb-8">
            Connect with our leadership team to discuss partnership opportunities
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/leadership">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition shadow-lg">
                Schedule Call with Leadership
              </button>
            </Link>
            
            <Link to="/faculty">
              <button className="bg-white hover:bg-gray-50 text-orange-600 border-2 border-orange-600 px-8 py-4 rounded-lg text-lg font-semibold transition">
                Browse Faculty by SDG
              </button>
            </Link>
          </div>
          
          <div className="mt-6">
            <Link to="/data-quality" className="text-blue-600 hover:underline font-medium">
              Learn about our data quality methodology →
            </Link>
          </div>
          
        </div>
      </section>

    </div>
  )
}
