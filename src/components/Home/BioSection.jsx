import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaBriefcase, FaEnvelope, FaGlobe } from 'react-icons/fa'

function BioSection({ profile }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="glass-card p-8 rounded-3xl"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="relative"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/30 
                         shadow-2xl shadow-purple-500/20">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`
              }}
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 
                         rounded-full border-4 border-white dark:border-gray-900"></div>
        </motion.div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
            {profile.name}
          </h1>
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4 text-gray-600 dark:text-gray-300">
            <span className="flex items-center gap-2">
              <FaBriefcase className="text-purple-500" />
              {profile.title}
            </span>
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-pink-500" />
              {profile.location}
            </span>
          </div>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {profile.bio}
          </p>

          {/* Contact Links */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {profile.email && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 
                         hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300"
              >
                <FaEnvelope className="text-purple-500" />
                <span className="text-gray-700 dark:text-gray-300">Email</span>
              </motion.a>
            )}
            {profile.website && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 
                         hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300"
              >
                <FaGlobe className="text-blue-500" />
                <span className="text-gray-700 dark:text-gray-300">Website</span>
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BioSection