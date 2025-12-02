import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaCamera, FaGlobe, FaMapMarkerAlt, FaBriefcase, FaEnvelope, FaSave } from 'react-icons/fa'
import AnimatedButton from '../UI/AnimatedButton'

function ProfileEditor({ profile, setData, data }) {
  const [localProfile, setLocalProfile] = useState(profile)
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar)
  const fileInputRef = useRef()
  
  useEffect(() => {
    setLocalProfile(profile)
    setAvatarPreview(profile.avatar)
  }, [profile])
  
  const handleChange = (field, value) => {
    const updated = { ...localProfile, [field]: value }
    setLocalProfile(updated)
    setData({ ...data, profile: updated })
  }
  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatarPreview(reader.result)
      handleChange('avatar', reader.result)
    }
    reader.readAsDataURL(file)
  }
  
  const handleAvatarUrlChange = (url) => {
    setAvatarPreview(url)
    handleChange('avatar', url)
  }
  
  const handleSave = () => {
    // Animation feedback
    console.log('Profile saved')
  }
  
  const avatarPresets = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan'
  ]
  
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="glass-card p-6 rounded-3xl"
    >
      <h2 className="text-2xl font-bold mb-6 gradient-text flex items-center gap-3">
        <FaUser /> Profile Settings
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Avatar Section */}
        <div className="lg:col-span-1">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaCamera /> Avatar
            </h3>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative mx-auto w-48 h-48 rounded-full overflow-hidden border-4 
                        border-white/30 shadow-2xl shadow-purple-500/20"
            >
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${localProfile.name}`
                }}
              />
            </motion.div>

            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <AnimatedButton
                onClick={() => fileInputRef.current.click()}
                icon={FaCamera}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
              >
                Upload Image
              </AnimatedButton>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={localProfile.avatar}
                onChange={(e) => handleAvatarUrlChange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 
                         border border-gray-300 dark:border-gray-600 
                         focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                         transition-all duration-300"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quick Presets
              </label>
              <div className="grid grid-cols-3 gap-2">
                {avatarPresets.map((preset, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAvatarUrlChange(preset)}
                    className="w-full aspect-square rounded-full overflow-hidden border-2 
                             hover:border-purple-500 transition-colors"
                  >
                    <img
                      src={preset}
                      alt={`Preset ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details Form */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaUser className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={localProfile.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
                           border border-gray-300 dark:border-gray-600 
                           focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                           transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title / Role
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaBriefcase className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={localProfile.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
                           border border-gray-300 dark:border-gray-600 
                           focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                           transition-all duration-300"
                  placeholder="UI/UX Designer"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaMapMarkerAlt className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={localProfile.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
                           border border-gray-300 dark:border-gray-600 
                           focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                           transition-all duration-300"
                  placeholder="San Francisco, CA"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaEnvelope className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={localProfile.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
                           border border-gray-300 dark:border-gray-600 
                           focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                           transition-all duration-300"
                  placeholder="hello@example.com"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Website URL
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaGlobe className="w-5 h-5" />
                </div>
                <input
                  type="url"
                  value={localProfile.website || ''}
                  onChange={(e) => handleChange('website', e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
                           border border-gray-300 dark:border-gray-600 
                           focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                           transition-all duration-300"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio / Description
              </label>
              <textarea
                value={localProfile.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                rows="4"
                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
                         border border-gray-300 dark:border-gray-600 
                         focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                         resize-none transition-all duration-300"
                placeholder="Tell the world about yourself..."
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {localProfile.bio.length}/500 characters
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <AnimatedButton
              onClick={handleSave}
              icon={FaSave}
              className="bg-gradient-to-r from-purple-600 to-pink-600"
            >
              Save Profile Changes
            </AnimatedButton>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProfileEditor