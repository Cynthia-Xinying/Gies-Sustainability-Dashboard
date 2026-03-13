import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function StudentJourney() {
  const navigate = useNavigate();
  const [selectedSDG, setSelectedSDG] = useState('');
  const [selectedDept, setSelectedDept] = useState('');

  const handleStartSearch = () => {
    let url = '/faculty?';
    if (selectedDept) url += `dept=${encodeURIComponent(selectedDept)}&`;
    if (selectedSDG) url += `sdg=${encodeURIComponent(selectedSDG)}`;
    navigate(url);
  };

  const sdgOptions = [
    { num: 1, name: "No Poverty", icon: "🏘️" },
    { num: 7, name: "Clean Energy", icon: "⚡" },
    { num: 8, name: "Decent Work", icon: "💼" },
    { num: 10, name: "Reduced Inequalities", icon: "⚖️" },
    { num: 12, name: "Responsible Consumption", icon: "♻️" },
    { num: 13, name: "Climate Action", icon: "🌍" }
  ];

  const departments = [
    "Accountancy",
    "Finance",
    "Business Administration",
    "Gies Business",
    "Gies Affiliates",
    "Marketing & Communications"
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-6xl mb-6">👥</div>
          <h1 className="text-5xl font-bold mb-6">
            Find Your Faculty Mentor
          </h1>
          <p className="text-2xl text-blue-100 max-w-3xl mx-auto">
            Connect with professors whose research aligns with your interests in sustainability and the UN SDGs
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Filter & Discover</h3>
              <p className="text-slate-600">
                Search by department, UN SDG, or research keywords to find faculty working in your area of interest
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Explore Profiles</h3>
              <p className="text-slate-600">
                Review faculty publications, research areas, and SDG alignments to find the best match
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Reach Out</h3>
              <p className="text-slate-600">
                Contact potential mentors via email or schedule office hours to discuss research opportunities
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* QUICK FILTER SECTION */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          
          <h2 className="text-3xl font-bold text-center mb-4 text-slate-900">
            Start Your Search
          </h2>
          <p className="text-lg text-slate-600 text-center mb-12">
            Select your interests to find relevant faculty
          </p>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">
              📚 Choose Your Department
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept === selectedDept ? '' : dept)}
                  className={`p-4 rounded-lg border-2 transition font-medium ${
                    selectedDept === dept
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 text-slate-700'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">
              🎯 Choose a UN SDG Focus
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {sdgOptions.map((sdg) => (
                <button
                  key={sdg.num}
                  onClick={() => setSelectedSDG(`SDG ${sdg.num}` === selectedSDG ? '' : `SDG ${sdg.num}`)}
                  className={`p-4 rounded-lg border-2 transition text-left ${
                    selectedSDG === `SDG ${sdg.num}`
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{sdg.icon}</span>
                    <div>
                      <div className="font-bold text-slate-900">SDG {sdg.num}</div>
                      <div className="text-sm text-slate-600">{sdg.name}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleStartSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-lg text-xl font-bold transition shadow-lg hover:shadow-xl"
            >
              {selectedDept || selectedSDG 
                ? `Find Faculty ${selectedDept ? `in ${selectedDept}` : ''} ${selectedSDG ? `working on ${selectedSDG}` : ''}`
                : 'Browse All Faculty'}
            </button>
            
            <p className="text-sm text-slate-500 mt-4">
              Or <Link to="/faculty" className="text-blue-600 hover:underline font-medium">browse all 143 faculty</Link>
            </p>
          </div>
          
        </div>
      </section>

      {/* TIPS FOR SUCCESS */}
      <section className="py-16 px-6 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💡</div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">
                  Tips for Approaching Faculty
                </h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Do your research:</strong> Review their recent publications and current projects before reaching out</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Be specific:</strong> Mention which SDG or research area interests you and why</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Show initiative:</strong> Demonstrate your genuine interest in sustainability research</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Be professional:</strong> Use a clear subject line and proofread your email</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Follow up:</strong> If you don't hear back in a week, send a polite follow-up</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          <h2 className="text-3xl font-bold mb-6 text-slate-900">
            Ready to Find Your Mentor?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/faculty">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition shadow-lg">
                Browse All Faculty
              </button>
            </Link>
            
            <a href="mailto:advising@gies.illinois.edu">
              <button className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition">
                Talk to Academic Advising
              </button>
            </a>
          </div>
          
        </div>
      </section>

    </div>
  );
}
