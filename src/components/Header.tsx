import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/research-areas', label: 'Research Areas' },
    { path: '/faculty', label: 'Faculty' },
    { path: '/about', label: 'About' },
    { path: '/leadership', label: 'Our Leadership' },
    { path: '/data-quality', label: 'Data Quality' }
  ];

  const journeyButtons = [
    { path: '/student-journey', label: 'Student', icon: '👥', color: 'blue' },
    { path: '/partner-journey', label: 'Partner', icon: '💰', color: 'orange' },
    { path: '/industry-journey', label: 'Industry', icon: '🤝', color: 'green' }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        
        <div className="flex items-center justify-between gap-8">
          
          {/* LEFT: Logo */}
          <Link to="/" className="flex-shrink-0">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Gies Business School</h1>
              <p className="text-sm text-slate-600">Research Analytics</p>
            </div>
          </Link>

          {/* CENTER: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive(link.path)
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT: Journey Buttons */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {journeyButtons.map((btn) => (
              <Link key={btn.path} to={btn.path}>
                <button
                  className={`group px-4 py-2 rounded-lg font-semibold transition shadow-sm hover:shadow-md flex items-center gap-1.5 text-sm ${
                    btn.color === 'blue'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : btn.color === 'orange'
                      ? 'bg-orange-600 hover:bg-orange-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  <span className="text-base">{btn.icon}</span>
                  <span className="hidden xl:inline">{btn.label}</span>
                </button>
              </Link>
            ))}
          </div>

          {/* MOBILE: Menu Button */}
          <button className="lg:hidden text-slate-700 p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
        </div>

        {/* MOBILE: Journey Buttons Row */}
        <div className="lg:hidden mt-3 flex gap-2 justify-center">
          {journeyButtons.map((btn) => (
            <Link key={btn.path} to={btn.path}>
              <button
                className={`px-3 py-1.5 rounded-lg font-semibold transition shadow-sm text-xs flex items-center gap-1 ${
                  btn.color === 'blue'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : btn.color === 'orange'
                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                <span>{btn.icon}</span>
                <span>{btn.label}</span>
              </button>
            </Link>
          ))}
        </div>
        
      </div>
    </header>
  );
}
