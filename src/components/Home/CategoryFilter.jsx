import { motion } from 'framer-motion'

function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  const categories = [
    { id: 'all', label: 'All', color: 'from-purple-500 to-pink-500' },
    { id: 'social', label: 'Social', color: 'from-blue-500 to-cyan-500' },
    { id: 'professional', label: 'Professional', color: 'from-green-500 to-emerald-500' },
    { id: 'code', label: 'Code', color: 'from-yellow-500 to-orange-500' }
  ]
  
  return (
    <div className="category-filter">
      <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
        Filter Links
      </h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category.id
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                : 'bg-white/10 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/20'
            }`}
          >
            {category.label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter