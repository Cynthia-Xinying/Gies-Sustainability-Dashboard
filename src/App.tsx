import { Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import ResearchAreas from './pages/ResearchAreas'
import Faculty from './pages/Faculty'
import About from './pages/About'
import Contact from './pages/Contact'
import Leadership from './pages/Leadership'
import DataQuality from './pages/DataQuality'
import StudentJourney from './pages/StudentJourney'
import PartnerJourney from './pages/PartnerJourney'
import IndustryJourney from './pages/IndustryJourney'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/research-areas" element={<ResearchAreas />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/data-quality" element={<DataQuality />} />
          <Route path="/student-journey" element={<StudentJourney />} />
          <Route path="/partner-journey" element={<PartnerJourney />} />
          <Route path="/industry-journey" element={<IndustryJourney />} />
        </Routes>
      </main>
      <footer className="border-t border-slate-200 bg-white py-4 px-6 mt-12">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4 text-sm text-slate-600">
          <span>Data Quality: <strong className="text-green-600">92/100</strong></span>
          <span>Last Validated: February 2025</span>
          <Link to="/data-quality" className="text-blue-600 hover:underline">Report Issue</Link>
        </div>
      </footer>
    </div>
  )
}

export default App
