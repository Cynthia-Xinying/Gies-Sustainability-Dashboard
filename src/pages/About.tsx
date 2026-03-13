import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* HERO */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            About the Gies Sustainability Dashboard
          </h1>
          <p className="text-xl text-slate-600">
            Connecting research excellence with global impact
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
          <p className="text-lg text-slate-700 mb-4">
            The Gies Sustainability Dashboard maps faculty research to the United Nations Sustainable Development Goals (SDGs), making it easy to discover expertise, find collaboration opportunities, and track our collective impact on global challenges.
          </p>
          <p className="text-lg text-slate-700">
            We believe transparency drives accountability. By openly sharing our research data and methodology, we help students find mentors, funders identify high-impact projects, and industry partners connect with academic expertise.
          </p>
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">By the Numbers</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1,899</div>
              <div className="text-slate-600">Publications Analyzed</div>
              <div className="text-sm text-slate-500 mt-2">(2010-2020)</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">143</div>
              <div className="text-slate-600">Active Faculty</div>
              <div className="text-sm text-slate-500 mt-2">6 Departments</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">20.9%</div>
              <div className="text-slate-600">Sustainability Focus</div>
              <div className="text-sm text-slate-500 mt-2">397 SDG-aligned papers</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">92/100</div>
              <div className="text-slate-600">Data Quality Score</div>
              <div className="text-sm text-slate-500 mt-2">Validated Feb 2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">How to Use This Dashboard</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">For Students</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• Find mentors by research interest or SDG</li>
                <li>• Review faculty publication records</li>
                <li>• Contact professors directly</li>
              </ul>
              <Link to="/student-journey">
                <button className="mt-4 text-blue-600 hover:underline font-medium text-sm">
                  Start Student Journey →
                </button>
              </Link>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">For Funders</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• Browse projects by impact area</li>
                <li>• Review investment priorities</li>
                <li>• Connect with leadership team</li>
              </ul>
              <Link to="/partner-journey">
                <button className="mt-4 text-orange-600 hover:underline font-medium text-sm">
                  Explore Opportunities →
                </button>
              </Link>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">For Industry</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• Find expertise by business challenge</li>
                <li>• Explore collaboration case studies</li>
                <li>• Schedule exploratory meetings</li>
              </ul>
              <Link to="/industry-journey">
                <button className="mt-4 text-green-600 hover:underline font-medium text-sm">
                  Find Partners →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">About Our Team</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-lg text-slate-700 mb-4">
              This dashboard is maintained by the <strong>Center for Professional Responsibility in Business and Society</strong> at the University of Illinois Gies College of Business.
            </p>
            <p className="text-slate-700 mb-6">
              Our mission is to advance research and education on business ethics, corporate social responsibility, and sustainable business practices. We connect academic expertise with real-world impact.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/leadership">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
                  Meet Leadership Team
                </button>
              </Link>
              <Link to="/data-quality">
                <button className="bg-white hover:bg-gray-50 border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-medium transition">
                  View Data Quality Report
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Questions or Feedback?</h2>
          <p className="text-lg text-slate-600 mb-8">
            We welcome your input to improve this dashboard
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/data-quality">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
                Report Data Issue
              </button>
            </Link>
            <a href="mailto:sustainability@gies.illinois.edu">
              <button className="bg-white hover:bg-gray-50 border-2 border-slate-300 text-slate-700 px-8 py-3 rounded-lg font-semibold transition">
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
