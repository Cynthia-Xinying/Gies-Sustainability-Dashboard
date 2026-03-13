import React from 'react';

export default function Leadership() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* HERO */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Leadership Insights
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Data-driven recommendations for strategic decision-making
          </p>
        </div>
      </section>

      {/* WHAT THIS PAGE DOES - Front and center! */}
      <section className="py-12 px-6 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
            What This Page Helps You Do
          </h2>
          <p className="text-slate-600 mb-8 text-center">
            Three strategic applications of this research data
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-blue-500">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-bold text-lg mb-2">1. Resource Allocation</h3>
              <p className="text-sm text-slate-600">
                Use the Investment Matrix below to identify which departments offer highest strategic value for new hires or research funding
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-500">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-bold text-lg mb-2">2. Strategic Partnerships</h3>
              <p className="text-sm text-slate-600">
                Use the Collaboration Network to facilitate interdisciplinary research and identify natural cross-department synergies
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-purple-500">
              <div className="text-3xl mb-3">📢</div>
              <h3 className="font-bold text-lg mb-2">3. External Messaging</h3>
              <p className="text-sm text-slate-600">
                Use key messages below to strengthen fundraising pitches, media responses, and partnership proposals
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* INVESTMENT PRIORITIES - with integrated guidance */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Strategic Investment Priorities
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <img 
                src="/asset/investment_matrix.png" 
                alt="Strategic Investment Opportunities Matrix"
                className="w-full rounded-lg shadow-xl"
                loading="lazy"
              />
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>📊</span> How to Use This
              </h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">→</span>
                  <span>Higher scores = better ROI for faculty hiring or research investment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">→</span>
                  <span>Compare publication growth vs. current faculty size</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">→</span>
                  <span>Justify budget requests with data-backed strategic priorities</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-500">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">🥇</span>
                <span className="text-2xl font-bold text-green-600">60.0</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Gies Business</h4>
              <p className="text-sm text-slate-600 mb-3">
                Highest strategic value for investment with strong growth potential
              </p>
              <div className="text-xs bg-green-50 p-2 rounded">
                <strong className="text-green-700">Action:</strong> Priority expansion in sustainability research
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-400">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">🥈</span>
                <span className="text-2xl font-bold text-green-500">36.1</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Gies Affiliates</h4>
              <p className="text-sm text-slate-600 mb-3">
                Emerging strength with clear growth trajectory
              </p>
              <div className="text-xs bg-green-50 p-2 rounded">
                <strong className="text-green-600">Action:</strong> Strategic expansion opportunity
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-yellow-500">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">🥉</span>
                <span className="text-2xl font-bold text-yellow-600">35.1</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Accountancy</h4>
              <p className="text-sm text-slate-600 mb-3">
                300 publications, 38 faculty, 10.7% sustainability
              </p>
              <div className="text-xs bg-yellow-50 p-2 rounded">
                <strong className="text-yellow-700">Action:</strong> Maintain excellence, support emerging areas
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* COLLABORATION OPPORTUNITIES - with integrated guidance */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Interdisciplinary Collaboration Opportunities
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <img 
                src="/asset/collaboration_network.png" 
                alt="Department Collaboration Network"
                className="w-full rounded-lg shadow-xl"
                loading="lazy"
              />
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>🤝</span> How to Use This
              </h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">→</span>
                  <span>Similarity scores show keyword overlap between departments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">→</span>
                  <span>Launch co-advised PhD programs across connected departments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">→</span>
                  <span>Design joint seminars on overlapping research themes</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg shadow-lg">
              <div className="text-center mb-4">
                <span className="text-3xl">🤝</span>
                <div className="mt-2 text-lg font-bold text-slate-800">
                  Finance ↔ Accountancy
                </div>
                <div className="text-sm text-slate-600">Similarity: 0.06</div>
              </div>
              <div className="text-sm text-slate-700 mb-3">
                <strong>Shared:</strong> Financial reporting, regulatory compliance, valuation
              </div>
              <div className="text-xs bg-blue-50 p-2 rounded">
                <strong className="text-blue-700">Initiative:</strong> Research center on sustainability reporting
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg shadow-lg">
              <div className="text-center mb-4">
                <span className="text-3xl">🤝</span>
                <div className="mt-2 text-lg font-bold text-slate-800">
                  Accountancy ↔ Business Admin
                </div>
                <div className="text-sm text-slate-600">Similarity: 0.05</div>
              </div>
              <div className="text-sm text-slate-700 mb-3">
                <strong>Shared:</strong> Organizational behavior, performance, governance
              </div>
              <div className="text-xs bg-green-50 p-2 rounded">
                <strong className="text-green-700">Initiative:</strong> Co-advised students on sustainable business
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg shadow-lg">
              <div className="text-center mb-4">
                <span className="text-3xl">🤝</span>
                <div className="mt-2 text-lg font-bold text-slate-800">
                  Finance ↔ Business Admin
                </div>
                <div className="text-sm text-slate-600">Similarity: 0.04</div>
              </div>
              <div className="text-sm text-slate-700 mb-3">
                <strong>Shared:</strong> Corporate governance, investment, risk
              </div>
              <div className="text-xs bg-purple-50 p-2 rounded">
                <strong className="text-purple-700">Initiative:</strong> Joint seminar on ESG investing
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* KEY MESSAGES FOR EXTERNAL COMMUNICATION */}
      <section className="py-16 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-5xl mx-auto">
          
          <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center">
            Key Messages for External Communication
          </h2>
          <p className="text-lg text-slate-600 mb-12 text-center">
            Ready-to-use talking points for fundraising, media, and partnerships
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-bold mb-3">Growth Story</h3>
              <p className="text-slate-700 text-sm italic mb-3">
                "Gies sustainability research has grown 320% over 6 years, with 397 SDG-aligned papers representing 21% of total output."
              </p>
              <div className="text-xs text-slate-500">
                <strong>Use for:</strong> Fundraising, annual reports
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="font-bold mb-3">Impact Story</h3>
              <p className="text-slate-700 text-sm italic mb-3">
                "From AI reducing diagnostic bias to frameworks saving $140B, Gies research creates measurable real-world change."
              </p>
              <div className="text-xs text-slate-500">
                <strong>Use for:</strong> Donor meetings, partnerships
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-3">✓</div>
              <h3 className="font-bold mb-3">Trust Story</h3>
              <p className="text-slate-700 text-sm italic mb-3">
                "202 user suggestions incorporated, 15 corrections applied, 3.5% accuracy improvement. Trust through transparency."
              </p>
              <div className="text-xs text-slate-500">
                <strong>Use for:</strong> Credibility building
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* CONTACT LEADERSHIP */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="flex justify-center mb-6">
            <div className="bg-orange-100 p-6 rounded-full">
              <span className="text-4xl">💰</span>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-4">
            Partner with Us
          </h2>
          <p className="text-lg text-slate-600 text-center mb-8">
            Connect with the leadership team at the Center for Professional Responsibility in Business and Society
          </p>
          
          <div className="space-y-4">
            
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:shadow-xl transition cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-slate-200 w-12 h-12 rounded-full flex items-center justify-center font-bold text-slate-600">
                  OY
                </div>
                <div>
                  <div className="font-semibold text-lg">Oscar Ybarra</div>
                  <div className="text-slate-600">Director</div>
                </div>
              </div>
              <span className="text-2xl text-slate-400">→</span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:shadow-xl transition cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-slate-200 w-12 h-12 rounded-full flex items-center justify-center font-bold text-slate-600">
                  NS
                </div>
                <div>
                  <div className="font-semibold text-lg">Nicola Sharpe</div>
                  <div className="text-slate-600">Director</div>
                </div>
              </div>
              <span className="text-2xl text-slate-400">→</span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:shadow-xl transition cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-slate-200 w-12 h-12 rounded-full flex items-center justify-center font-bold text-slate-600">
                  FD
                </div>
                <div>
                  <div className="font-semibold text-lg">Fei Du</div>
                  <div className="text-slate-600">Academic Director</div>
                </div>
              </div>
              <span className="text-2xl text-slate-400">→</span>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
}
