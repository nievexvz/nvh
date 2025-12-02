import { motion } from 'framer-motion'
import { FaEye, FaMousePointer, FaChartLine, FaUsers, FaCalendarAlt } from 'react-icons/fa'

function StatsDashboard({ data }) {
  const getActiveLinks = () => {
    return data.links?.filter(link => link.isActive).length || 0
  }
  
  const getPopularCategory = () => {
    const categories = data.links?.reduce((acc, link) => {
      if (link.isActive) {
        acc[link.category] = (acc[link.category] || 0) + 1
      }
      return acc
    }, {})
    
    if (!categories) return 'social'
    return Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] || 'social'
  }
  
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="glass-card p-6 rounded-3xl"
    >
      <h2 className="text-2xl font-bold mb-6 gradient-text flex items-center gap-3">
        <FaChartLine /> Analytics Dashboard
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10">
          <div className="flex items-center justify-between mb-2">
            <FaEye className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Total Visits
          </h3>
          <p className="text-2xl font-bold gradient-text">
            {data.analytics?.totalVisits || 0}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
          <div className="flex items-center justify-between mb-2">
            <FaUsers className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Unique Visitors
          </h3>
          <p className="text-2xl font-bold gradient-text">
            {data.analytics?.uniqueVisitors || 0}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10">
          <div className="flex items-center justify-between mb-2">
            <FaMousePointer className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            CTR
          </h3>
          <p className="text-2xl font-bold gradient-text">
            {((data.analytics?.clickThroughRate || 0) * 100).toFixed(1)}%
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10">
          <div className="flex items-center justify-between mb-2">
            <FaUsers className="w-5 h-5 text-yellow-500" />
          </div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Followers
          </h3>
          <p className="text-2xl font-bold gradient-text">
            {data.socialStats?.followers || 0}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-500/10 to-gray-600/10">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Active Links
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-gray-800 dark:text-white">
              {getActiveLinks()}
            </p>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 
                          flex items-center justify-center">
              <span className="text-white font-bold">{getActiveLinks()}</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Popular Category
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold capitalize text-gray-800 dark:text-white">
              {getPopularCategory()}
            </p>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center
              ${getPopularCategory() === 'social' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                getPopularCategory() === 'professional' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                getPopularCategory() === 'code' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                'bg-gradient-to-r from-gray-500 to-gray-600'}`}>
              <span className="text-white text-sm font-bold">
                {getPopularCategory().charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <FaCalendarAlt /> Last Updated
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {data.analytics?.lastUpdated 
                ? new Date(data.analytics.lastUpdated).toLocaleDateString() 
                : 'Never'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default StatsDashboard