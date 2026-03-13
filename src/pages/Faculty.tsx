import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Faculty() {
  const [searchParams] = useSearchParams();
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedSDG, setSelectedSDG] = useState('all');
  const [sortBy, setSortBy] = useState('publications');
  const [showChatbox, setShowChatbox] = useState(false);

  useEffect(() => {
    const dept = searchParams.get('dept');
    const sdg = searchParams.get('sdg');
    if (dept) setSelectedDepartment(dept);
    if (sdg) setSelectedSDG(sdg);
  }, [searchParams]);

  useEffect(() => {
    fetch('/data/faculty.json')
      .then(res => res.json())
      .then(data => {
        setFacultyData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading faculty data:', error);
        setLoading(false);
      });
  }, []);

  const filteredFaculty = facultyData.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (faculty.top_keywords || []).some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDept = selectedDepartment === 'all' || faculty.department === selectedDepartment;
    const matchesSDG = selectedSDG === 'all' || (faculty.top_sdgs || []).includes(selectedSDG);
    
    return matchesSearch && matchesDept && matchesSDG;
  });

  const sortedFaculty = [...filteredFaculty].sort((a, b) => {
    switch(sortBy) {
      case 'publications':
        return b.total_publications - a.total_publications;
      case 'sustainability':
        return b.sustainability_percentage - a.sustainability_percentage;
      case 'recent':
        return b.recent_publications - a.recent_publications;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <div className="text-xl text-slate-600">Loading faculty data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Discover {facultyData.length} Faculty Advancing UN SDGs
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            Find faculty whose research aligns with your interests
          </p>
          
          <div className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by faculty name, keyword, or research area..."
                className="w-full px-6 py-4 rounded-lg text-slate-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute right-4 top-4 text-slate-400 text-2xl">🔍</span>
            </div>
          </div>
          
          <button
            onClick={() => setShowChatbox(!showChatbox)}
            className="mt-4 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg flex items-center gap-2"
          >
            <span className="text-xl">💬</span>
            Ask AI for Help
          </button>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* LEFT SIDEBAR - FILTERS */}
            <aside className="w-full md:w-64 space-y-6">
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  📚 Department
                </h3>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  <option value="Accountancy">Accountancy</option>
                  <option value="Finance">Finance</option>
                  <option value="Business Administration">Business Administration</option>
                  <option value="Gies Business">Gies Business</option>
                  <option value="Gies Affiliates">Gies Affiliates</option>
                  <option value="Marketing & Communications">Marketing & Communications</option>
                </select>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  🎯 UN SDG
                </h3>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedSDG}
                  onChange={(e) => setSelectedSDG(e.target.value)}
                >
                  <option value="all">All SDGs</option>
                  <option value="SDG 1">SDG 1: No Poverty</option>
                  <option value="SDG 7">SDG 7: Clean Energy</option>
                  <option value="SDG 8">SDG 8: Decent Work</option>
                  <option value="SDG 10">SDG 10: Reduced Inequalities</option>
                  <option value="SDG 12">SDG 12: Responsible Consumption</option>
                  <option value="SDG 13">SDG 13: Climate Action</option>
                </select>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  📊 Sort By
                </h3>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="publications">Total Publications</option>
                  <option value="sustainability">Sustainability %</option>
                  <option value="recent">Recent Activity</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDepartment('all');
                  setSelectedSDG('all');
                  setSortBy('publications');
                }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
              >
                Reset Filters
              </button>
              
            </aside>

            {/* FACULTY GRID */}
            <main className="flex-1">
              
              <div className="mb-6 text-slate-600">
                Showing <span className="font-bold">{sortedFaculty.length}</span> of <span className="font-bold">{facultyData.length}</span> faculty
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {sortedFaculty.map((faculty) => (
                  <div key={faculty.uuid} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-6">
                    
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                      {faculty.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    
                    <h3 className="text-xl font-bold text-center mb-1">{faculty.name}</h3>
                    <p className="text-sm text-slate-600 text-center mb-4">{faculty.department}</p>
                    
                    {(faculty.top_sdgs || []).length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {faculty.top_sdgs.map((sdg, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                            {sdg}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">📚 Publications:</span>
                        <span className="font-bold">{faculty.total_publications}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">🌱 Sustainability:</span>
                        <span className="font-bold text-green-600">
                          {faculty.sustainability_publications} ({faculty.sustainability_percentage}%)
                        </span>
                      </div>
                      {faculty.ft50_count > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">🏆 FT50:</span>
                          <span className="font-bold">{faculty.ft50_count}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-600">⚡ Recent (2022-24):</span>
                        <span className="font-bold">{faculty.recent_publications}</span>
                      </div>
                    </div>
                    
                    {(faculty.top_keywords || []).length > 0 && (
                      <div className="mb-4">
                        <div className="text-xs text-slate-500 mb-2">🔑 Research Areas:</div>
                        <div className="flex flex-wrap gap-1">
                          {faculty.top_keywords.slice(0, 5).map((keyword, idx) => (
                            <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                        View Profile
                      </button>
                      <button className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition">
                        Contact
                      </button>
                    </div>
                    
                  </div>
                ))}
                
              </div>

              {sortedFaculty.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">No faculty found</h3>
                  <p className="text-slate-600">Try adjusting your filters or search query</p>
                </div>
              )}
              
            </main>
            
          </div>
        </div>
      </section>

      {/* AI CHATBOX */}
      {showChatbox && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xl">💬</span>
              <span className="font-semibold">AI Faculty Assistant</span>
            </div>
            <button
              onClick={() => setShowChatbox(false)}
              className="text-white hover:text-blue-200 text-xl"
            >
              ✕
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="bg-blue-100 rounded-lg p-3 mb-4">
              <div className="font-semibold text-sm mb-1">🤖 AI Assistant</div>
              <div className="text-sm text-slate-700">
                Hi! I can help you find faculty. Try asking:
                <ul className="mt-2 space-y-1 text-xs">
                  <li>• "Find professors researching climate change"</li>
                  <li>• "Who works on ESG in finance?"</li>
                  <li>• "Compare Dr. Smith and Dr. Lee"</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center text-sm text-slate-500 mt-8">
              AI chatbox functionality will be implemented in future phase
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask me about faculty..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                →
              </button>
            </div>
          </div>
          
        </div>
      )}

    </div>
  );
}
