import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useGistData } from '../hooks/useGistData'
import BioSection from '../components/Home/BioSection'
import LinksGrid from '../components/Home/LinksGrid'
import CategoryFilter from '../components/Home/CategoryFilter'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import { FaHeart } from 'react-icons/fa'

function Home() {
  const { data, isLoading } = useGistData()
  const [selectedCategory, setSelectedCategory] = useState('all')

  if (isLoading) {
    return <LoadingSpinner />
  }

  const filteredLinks = selectedCategory === 'all' 
    ? data.links.filter(link => link.isActive)
    : data.links.filter(link => link.isActive && link.category === selectedCategory)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-16"
    >
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-24">
        {/* Bio Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <BioSection profile={data.profile} />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <CategoryFilter 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </motion.div>

        {/* Links Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <LinksGrid links={filteredLinks} />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
            Made with <FaHeart className="text-red-500 animate-pulse" /> using React & Vite
          </p>
          <a 
            href="/admin" 
            className="inline-block mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 
                       text-purple-600 dark:text-purple-400 hover:from-purple-500/20 hover:to-pink-500/20 
                       transition-all duration-300"
          >
            Admin Panel
          </a>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Home