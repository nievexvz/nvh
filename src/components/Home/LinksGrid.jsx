import { motion } from 'framer-motion'
import { FaExternalLinkAlt } from 'react-icons/fa'
import * as Icons from 'react-icons/fa'

function LinksGrid({ links }) {
  const getIcon = (iconName) => {
    const IconComponent = Icons[iconName] || FaExternalLinkAlt
    return <IconComponent className="w-6 h-6" />
  }

  const getCategoryColor = (category) => {
    switch(category) {
      case 'social': return 'from-blue-500 to-cyan-500'
      case 'professional': return 'from-green-500 to-emerald-500'
      case 'code': return 'from-purple-500 to-pink-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {links.map((link, index) => (
        <motion.a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group glass-card p-6 rounded-2xl transition-all duration-500"
        >
          <div className="flex items-center gap-4">
            {/* Icon */}
            <motion.div 
              className={`relative p-3 rounded-xl bg-gradient-to-br ${getCategoryColor(link.category)} 
                         transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300`}
              whileHover={{ rotate: 12, scale: 1.1 }}
            >
              {getIcon(link.icon)}
              <div className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-sm"></div>
            </motion.div>

            {/* Link Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                {link.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {link.url.replace(/^https?:\/\//, '')}
              </p>
            </div>

            {/* External Link Icon */}
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaExternalLinkAlt className="w-5 h-5 text-gray-400 group-hover:text-purple-500 
                                          transition-all duration-300" />
            </motion.div>
          </div>

          {/* Category Badge */}
          <div className="mt-4 flex justify-between items-center">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r 
                           from-gray-500/10 to-gray-600/10 text-gray-600 dark:text-gray-400">
              {link.category}
            </span>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse"></div>
          </div>
        </motion.a>
      ))}
    </div>
  )
}

export default LinksGrid