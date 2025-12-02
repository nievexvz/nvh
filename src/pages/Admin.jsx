import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGistData } from '../hooks/useGistData'
import ProfileEditor from '../components/Admin/ProfileEditor'
import LinkManager from '../components/Admin/LinkManager'
import StatsDashboard from '../components/Admin/StatsDashboard'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import AnimatedButton from '../components/UI/AnimatedButton'
import { FaSave, FaEye, FaDownload, FaUpload, FaArrowLeft } from 'react-icons/fa'

function Admin() {
  const { data, isLoading, saveData, setData } = useGistData()
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  const handleSave = async () => {
    setIsSaving(true)
    try {
      await saveData(data)
      setMessage({ type: 'success', text: 'Data saved successfully!' })
      
      setTimeout(() => {
        setMessage({ type: '', text: '' })
      }, 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save data' })
    } finally {
      setIsSaving(false)
    }
  }
  
  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', 'linkhub-data.json')
    linkElement.click()
  }
  
  const importData = (event) => {
    const file = event.target.files[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result)
        setData(importedData)
        setMessage({ type: 'success', text: 'Data imported successfully!' })
      } catch (error) {
        setMessage({ type: 'error', text: 'Invalid JSON file' })
      }
    }
    reader.readAsText(file)
  }
  
  if (isLoading) {
    return <LoadingSpinner />
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 mb-8 rounded-3xl"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Admin Panel</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage your profile, links, and analytics
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <a
                href="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-500/10 to-gray-600/10 
                         hover:from-gray-500/20 hover:to-gray-600/20 transition-all duration-300"
              >
                <FaArrowLeft /> Back to Home
              </a>
              
              <button
                onClick={exportData}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 
                         hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300"
              >
                <FaDownload /> Export
              </button>
              
              <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 
                              hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300 cursor-pointer">
                <FaUpload /> Import
                <input type="file" accept=".json" onChange={importData} className="hidden" />
              </label>
              
              <AnimatedButton
                onClick={handleSave}
                isLoading={isSaving}
                icon={FaSave}
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </AnimatedButton>
            </div>
          </div>
        </motion.div>

        {/* Message Display */}
        {message.text && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`glass-card p-4 mb-6 rounded-xl border ${
              message.type === 'success' 
                ? 'border-green-500/30 bg-green-500/10' 
                : 'border-red-500/30 bg-red-500/10'
            }`}
          >
            <p className={message.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
              {message.text}
            </p>
          </motion.div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Links */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ProfileEditor profile={data.profile} setData={setData} data={data} />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <LinkManager links={data.links} setData={setData} data={data} />
            </motion.div>
          </div>

          {/* Right Column - Stats & Preview */}
          <div className="space-y-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <StatsDashboard data={data} />
            </motion.div>
            
            {/* Quick Preview */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 rounded-3xl"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaEye className="text-purple-500" /> Quick Preview
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Links</p>
                  <p className="text-2xl font-bold gradient-text">
                    {data.links.filter(l => l.isActive).length}
                  </p>
                </div>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 
                           text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                >
                  View Live Site
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Admin