import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaTrash, FaEdit, FaEye, FaEyeSlash, FaArrowUp, FaArrowDown, FaLink, FaSave } from 'react-icons/fa'
import * as Icons from 'react-icons/fa'
import AnimatedButton from '../UI/AnimatedButton'

function LinkManager({ links, setData, data }) {
  const [editingId, setEditingId] = useState(null)
  const [newLink, setNewLink] = useState({
    title: '',
    url: '',
    icon: 'FaLink',
    category: 'social',
    isActive: true,
    order: links.length + 1
  })

  const categories = [
    { value: 'social', label: 'Social Media', color: 'from-blue-500 to-cyan-500' },
    { value: 'professional', label: 'Professional', color: 'from-green-500 to-emerald-500' },
    { value: 'code', label: 'Code & Tech', color: 'from-purple-500 to-pink-500' },
    { value: 'other', label: 'Other', color: 'from-gray-500 to-gray-600' }
  ]

  const iconList = [
    'FaGithub', 'FaTwitter', 'FaLinkedin', 'FaYoutube', 'FaInstagram',
    'FaFacebook', 'FaGlobe', 'FaEnvelope', 'FaBriefcase', 'FaCode'
  ]

  const handleAddLink = () => {
    if (!newLink.title.trim() || !newLink.url.trim()) return

    const newId = Math.max(...links.map(l => l.id), 0) + 1
    const updatedLinks = [
      ...links,
      {
        id: newId,
        ...newLink,
        order: links.length + 1
      }
    ]

    setData({ ...data, links: updatedLinks })
    setNewLink({
      title: '',
      url: '',
      icon: 'FaLink',
      category: 'social',
      isActive: true,
      order: updatedLinks.length + 1
    })
  }

  const handleUpdateLink = (id, updates) => {
    const updatedLinks = links.map(link => 
      link.id === id ? { ...link, ...updates } : link
    )
    setData({ ...data, links: updatedLinks })
  }

  const handleDeleteLink = (id) => {
    const updatedLinks = links.filter(link => link.id !== id)
    const reorderedLinks = updatedLinks.map((link, index) => ({
      ...link,
      order: index + 1
    }))
    setData({ ...data, links: reorderedLinks })
  }

  const moveLink = (index, direction) => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === links.length - 1)
    ) return

    const updatedLinks = [...links]
    const newIndex = direction === 'up' ? index - 1 : index + 1
    ;[updatedLinks[index], updatedLinks[newIndex]] = 
    [updatedLinks[newIndex], updatedLinks[index]]

    const reorderedLinks = updatedLinks.map((link, idx) => ({
      ...link,
      order: idx + 1
    }))

    setData({ ...data, links: reorderedLinks })
  }

  const getIconComponent = (iconName) => {
    const Icon = Icons[iconName] || FaLink
    return <Icon className="w-5 h-5" />
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="glass-card p-6 rounded-3xl"
    >
      <h2 className="text-2xl font-bold mb-6 gradient-text flex items-center gap-3">
        <FaLink /> Manage Links
      </h2>

      {/* Add New Link Form */}
      <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-purple-500/5 to-pink-500/5">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaPlus className="text-purple-500" /> Add New Link
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={newLink.title}
              onChange={(e) => setNewLink({...newLink, title: e.target.value})}
              className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 
                       border border-gray-300 dark:border-gray-600 
                       focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                       transition-all duration-300"
              placeholder="GitHub"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              URL
            </label>
            <input
              type="text"
              value={newLink.url}
              onChange={(e) => setNewLink({...newLink, url: e.target.value})}
              className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 
                       border border-gray-300 dark:border-gray-600 
                       focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                       transition-all duration-300"
              placeholder="https://github.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Icon
            </label>
            <select
              value={newLink.icon}
              onChange={(e) => setNewLink({...newLink, icon: e.target.value})}
              className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 
                       border border-gray-300 dark:border-gray-600 
                       focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                       transition-all duration-300"
            >
              {iconList.map(icon => (
                <option key={icon} value={icon}>
                  {icon.replace('Fa', '')}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={newLink.category}
              onChange={(e) => setNewLink({...newLink, category: e.target.value})}
              className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 
                       border border-gray-300 dark:border-gray-600 
                       focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                       transition-all duration-300"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={newLink.isActive}
                onChange={(e) => setNewLink({...newLink, isActive: e.target.checked})}
                className="sr-only"
              />
              <div className={`w-10 h-6 rounded-full transition-all duration-300 ${
                newLink.isActive ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                  newLink.isActive ? 'transform translate-x-5' : 'transform translate-x-1'
                }`} />
              </div>
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Active
            </span>
          </label>
          
          <AnimatedButton
            onClick={handleAddLink}
            icon={FaPlus}
            className="bg-gradient-to-r from-purple-600 to-pink-600"
            disabled={!newLink.title.trim() || !newLink.url.trim()}
          >
            Add Link
          </AnimatedButton>
        </div>
      </div>

      {/* Links List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Manage Existing Links</h3>
        
        {links.sort((a, b) => a.order - b.order).map((link, index) => (
          <motion.div
            key={link.id}
            id={`link-${link.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`group p-4 rounded-2xl border-2 transition-all duration-300 ${
              editingId === link.id 
                ? 'border-purple-500 bg-purple-500/5' 
                : 'border-transparent hover:border-purple-500/30 hover:bg-purple-500/5'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 ml-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${
                    categories.find(c => c.value === link.category)?.color || 'from-gray-500 to-gray-600'
                  }`}>
                    {getIconComponent(link.icon)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {link.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-md">
                      {link.url}
                    </p>
                  </div>
                </div>
                
                {editingId === link.id ? (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                    <input
                      type="text"
                      value={link.title}
                      onChange={(e) => handleUpdateLink(link.id, { title: e.target.value })}
                      className="px-3 py-2 text-sm rounded-lg bg-white/50 dark:bg-gray-800/50 
                               border border-gray-300 dark:border-gray-600"
                      placeholder="Title"
                    />
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => handleUpdateLink(link.id, { url: e.target.value })}
                      className="px-3 py-2 text-sm rounded-lg bg-white/50 dark:bg-gray-800/50 
                               border border-gray-300 dark:border-gray-600"
                      placeholder="URL"
                    />
                    <select
                      value={link.category}
                      onChange={(e) => handleUpdateLink(link.id, { category: e.target.value })}
                      className="px-3 py-2 text-sm rounded-lg bg-white/50 dark:bg-gray-800/50 
                               border border-gray-300 dark:border-gray-600"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    <select
                      value={link.icon}
                      onChange={(e) => handleUpdateLink(link.id, { icon: e.target.value })}
                      className="px-3 py-2 text-sm rounded-lg bg-white/50 dark:bg-gray-800/50 
                               border border-gray-300 dark:border-gray-600"
                    >
                      {iconList.map(icon => (
                        <option key={icon} value={icon}>
                          {icon.replace('Fa', '')}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      link.category === 'social' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' :
                      link.category === 'professional' ? 'bg-green-500/20 text-green-600 dark:text-green-400' :
                      link.category === 'code' ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400' :
                      'bg-gray-500/20 text-gray-600 dark:text-gray-400'
                    }`}>
                      {link.category}
                    </span>
                    <span className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${
                      link.isActive 
                        ? 'bg-green-500/20 text-green-600 dark:text-green-400' 
                        : 'bg-gray-500/20 text-gray-600 dark:text-gray-400'
                    }`}>
                      {link.isActive ? <FaEye /> : <FaEyeSlash />}
                      {link.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-sm text-gray-500">
                      Order: #{link.order}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => moveLink(index, 'up')}
                  disabled={index === 0}
                  className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed 
                           transition-colors"
                  title="Move up"
                >
                  <FaArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveLink(index, 'down')}
                  disabled={index === links.length - 1}
                  className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed 
                           transition-colors"
                  title="Move down"
                >
                  <FaArrowDown className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => setEditingId(editingId === link.id ? null : link.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    editingId === link.id 
                      ? 'bg-purple-500 text-white' 
                      : 'hover:bg-white/10 text-gray-600 dark:text-gray-400'
                  }`}
                  title={editingId === link.id ? 'Save' : 'Edit'}
                >
                  {editingId === link.id ? <FaSave /> : <FaEdit />}
                </button>
                
                <button
                  onClick={() => handleDeleteLink(link.id)}
                  className="p-2 rounded-lg hover:bg-red-500/20 text-red-500 hover:text-red-600 
                           transition-colors"
                  title="Delete"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default LinkManager