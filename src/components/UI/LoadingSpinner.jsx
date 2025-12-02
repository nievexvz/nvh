import { motion } from 'framer-motion'

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-purple-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-pink-500 rounded-full animate-spin" 
             style={{ animationDirection: 'reverse' }}></div>
        
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-white font-medium mb-2">Loading...</p>
          <div className="flex gap-1 justify-center">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LoadingSpinner