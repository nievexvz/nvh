import { motion } from 'framer-motion'

function AnimatedButton({ children, onClick, isLoading, icon: Icon, className = '', ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={isLoading}
      className={`relative overflow-hidden px-6 py-3 rounded-xl font-medium transition-all duration-300 
                 hover:shadow-lg ${className}`}
      {...props}
    >
      {Icon && <Icon className="inline mr-2 w-5 h-5" />}
      {children}
      {isLoading && (
        <svg className="animate-spin ml-2 h-5 w-5 inline" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
    </motion.button>
  )
}

export default AnimatedButton