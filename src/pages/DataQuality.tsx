import React from 'react';
import { Link } from 'react-router-dom';

export default function DataQuality() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* HERO - Confident & Simple */}
      <section className="py-16 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="text-lg">✓</span>
            <span>Verified Data</span>
          </div>
          
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Evidence & Data Quality
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Every metric in this dashboard is validated, sourced, and continuously improved through community feedback
          </p>
        </div>
      </section>

      {/* DATA SOURCES - With Confidence Indicators */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center">
            Our Data Sources
          </h2>
          <p className="text-lg text-slate-600 mb-12 text-center">
            Four authoritative sources power every metric
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500 relative">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                  <span>✓</span> High Coverage
                </span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-4xl">📊</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Publication Data</h3>
                  <p className="text-slate-600 mb-3">
                    Illinois Experts Database - the university's official research repository
                  </p>
                  <div className="text-sm text-slate-500">
                    1,899 publications • Monthly updates
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500 relative">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                  <span>✓</span> 100% Verified
                </span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-4xl">🏆</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Journal Rankings</h3>
                  <p className="text-slate-600 mb-3">
                    Financial Times 50, UT Dallas, and General Business lists
                  </p>
                  <div className="text-sm text-slate-500">
                    371 FT publications identified
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500 relative">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                  <span>⟳</span> Improving
                </span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-4xl">🎯</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">SDG Classification</h3>
                  <p className="text-slate-600 mb-3">
                    Dual validation: keyword matching + AI semantic analysis
                  </p>
                  <div className="text-sm text-slate-500">
                    397 sustainability papers • User-refined
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-500 relative">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                  <span>✓</span> Official
                </span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-4xl">👥</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Faculty Records</h3>
                  <p className="text-slate-600 mb-3">
                    University directory verified quarterly
                  </p>
                  <div className="text-sm text-slate-500">
                    143 active faculty • 6 departments
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Confidence Summary Table */}
          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>📋</span> Confidence Summary
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-300">
                  <tr className="text-left">
                    <th className="pb-2 font-semibold text-slate-700">Data Layer</th>
                    <th className="pb-2 font-semibold text-slate-700">Source</th>
                    <th className="pb-2 font-semibold text-slate-700">Update Frequency</th>
                    <th className="pb-2 font-semibold text-slate-700 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  <tr className="border-b border-slate-200">
                    <td className="py-2">Publications</td>
                    <td className="py-2">Illinois Experts</td>
                    <td className="py-2">Monthly</td>
                    <td className="py-2 text-center"><span className="text-green-600 font-bold">✓</span></td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-2">SDG Tags</td>
                    <td className="py-2">Dual AI + Keyword</td>
                    <td className="py-2">Continuous</td>
                    <td className="py-2 text-center"><span className="text-blue-600 font-bold">⟳</span></td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-2">Journal Rankings</td>
                    <td className="py-2">FT50 + UT Dallas</td>
                    <td className="py-2">Annual</td>
                    <td className="py-2 text-center"><span className="text-green-600 font-bold">✓</span></td>
                  </tr>
                  <tr>
                    <td className="py-2">Faculty Info</td>
                    <td className="py-2">University Directory</td>
                    <td className="py-2">Quarterly</td>
                    <td className="py-2 text-center"><span className="text-green-600 font-bold">✓</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-xs text-slate-500">
              <strong>Legend:</strong> ✓ Verified | ⟳ User-refined
            </div>
          </div>
          
        </div>
      </section>

      {/* SDG CLASSIFICATION METHODOLOGY */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          
          <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center">
            How SDG Tags Are Assigned
          </h2>
          <p className="text-lg text-slate-600 mb-12 text-center">
            A dual-validation approach combining automated analysis with human expertise
          </p>

          {/* Simplified Methodology Image */}
          <img 
            src="/asset/classification_methodology.png" 
            alt="SDG Classification Process"
            className="w-full max-w-3xl mx-auto rounded-lg shadow-xl mb-8"
            loading="lazy"
          />

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-bold text-lg mb-2">Step 1: Automated Scan</h3>
              <p className="text-sm text-slate-600">
                Keyword matching identifies publications with sustainability-related terms from UN SDG framework
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-bold text-lg mb-2">Step 2: AI Validation</h3>
              <p className="text-sm text-slate-600">
                Semantic analysis confirms relevance and assigns confidence scores to each SDG match
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="font-bold text-lg mb-2">Step 3: Community Review</h3>
              <p className="text-sm text-slate-600">
                Faculty and users provide feedback to refine classifications and improve accuracy over time
              </p>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* USER FEEDBACK SYSTEM */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center">
            What To Do When Something Looks Wrong
          </h2>
          <p className="text-lg text-slate-600 mb-12 text-center">
            Your feedback directly improves data quality for everyone
          </p>

          {/* Feedback Dashboard Image */}
          <img 
            src="/asset/feedback_dashboard.png" 
            alt="User Feedback System Dashboard"
            className="w-full rounded-lg shadow-xl mb-8"
            loading="lazy"
          />

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">202</div>
              <div className="text-sm text-slate-700 font-medium">Feedback Submissions</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">15</div>
              <div className="text-sm text-slate-700 font-medium">Corrections Applied</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">↑3.5%</div>
              <div className="text-sm text-slate-700 font-medium">Accuracy Gain</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">2.3</div>
              <div className="text-sm text-slate-700 font-medium">Days Response Time</div>
            </div>
            
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚩</span>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-2">Flag an Issue</h3>
                <p className="text-slate-700 mb-4">
                  Spotted an incorrect SDG tag, missing publication, or outdated faculty info? Report it and we'll review within 48 hours.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* TRANSPARENCY NOTE */}
      <section className="py-12 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-slate-600">
            Questions about our data quality process? <Link to="/about" className="text-blue-600 hover:underline font-medium">Learn more</Link> or <Link to="/leadership" className="text-blue-600 hover:underline font-medium">contact leadership</Link>.
          </p>
        </div>
      </section>

    </div>
  );
}
