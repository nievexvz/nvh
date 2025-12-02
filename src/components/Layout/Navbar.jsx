import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHome, FaCog, FaSun, FaMoon, FaBars, FaTimes, FaUser } from 'react-icons/fa'

function Navbar({ isDarkMode, setIsDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }
  
  const navItems = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/admin', label: 'Admin', icon: FaCog },
  ]
  
  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 
                            flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">LinkHub</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Your Digital Gateway</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-600 dark:text-purple-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}

              {/* Theme Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-3 rounded-xl bg-gradient-to-r from-gray-500/10 to-gray-600/10 
                         hover:from-gray-500/20 hover:to-gray-600/20 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <FaSun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <FaMoon className="w-5 h-5 text-blue-500" />
                )}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <FaBars className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed right-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 
                       shadow-2xl z-40 md:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold gradient-text">Menu</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.path
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    )
                  })}

                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl 
                             bg-gradient-to-r from-gray-500/10 to-gray-600/10 
                             hover:from-gray-500/20 hover:to-gray-600/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      {isDarkMode ? (
                        <FaSun className="w-5 h-5 text-yellow-500" />
                      ) : (
                        <FaMoon className="w-5 h-5 text-blue-500" />
                      )}
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar