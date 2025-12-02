import { useState, useEffect, useCallback } from 'react'

const GIST_NAME = import.meta.env.VITE_GIST_NAME || 'adminpaneldb.json'
const GIST_ID = import.meta.env.VITE_GIST_ID || '82689e10171cf331707b4268a2471b49'
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

const GIST_API_URL = `https://api.github.com/gists/${GIST_ID}`

const defaultData = {
  profile: {
    name: "Alex Johnson",
    bio: "Digital creator passionate about design & technology. Building the future one pixel at a time.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LinkHub",
    title: "UI/UX Designer & Developer",
    location: "San Francisco, CA",
    email: "hello@alexjohnson.design",
    website: "https://alexjohnson.design"
  },
  links: [
    {
      id: 1,
      title: "GitHub",
      url: "https://github.com",
      icon: "FaGithub",
      category: "code",
      isActive: true,
      order: 1
    },
    {
      id: 2,
      title: "Twitter",
      url: "https://twitter.com",
      icon: "FaTwitter",
      category: "social",
      isActive: true,
      order: 2
    },
    {
      id: 3,
      title: "LinkedIn",
      url: "https://linkedin.com",
      icon: "FaLinkedin",
      category: "professional",
      isActive: true,
      order: 3
    },
    {
      id: 4,
      title: "YouTube",
      url: "https://youtube.com",
      icon: "FaYoutube",
      category: "social",
      isActive: true,
      order: 4
    },
    {
      id: 5,
      title: "Portfolio",
      url: "https://example.com",
      icon: "FaBriefcase",
      category: "professional",
      isActive: true,
      order: 5
    }
  ],
  socialStats: {
    followers: 12500,
    following: 850,
    posts: 234
  },
  analytics: {
    totalVisits: 0,
    uniqueVisitors: 0,
    clickThroughRate: 0,
    lastUpdated: new Date().toISOString()
  },
  settings: {
    theme: "dark",
    animations: true,
    showStats: true
  }
}

export const useGistData = () => {
  const [data, setData] = useState(defaultData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      // Jika tidak ada token, gunakan default data
      if (!GITHUB_TOKEN) {
        console.log('No GitHub token, using default data')
        return defaultData
      }

      const response = await fetch(GIST_API_URL, {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      })

      if (!response.ok) {
        if (response.status === 404) {
          console.log('Gist not found, using default data')
          return defaultData
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const gist = await response.json()
      const content = gist.files[GIST_NAME]?.content
      
      if (!content) {
        return defaultData
      }

      return JSON.parse(content)
    } catch (error) {
      console.error('Error fetching data from Gist:', error)
      setError(error.message)
      return defaultData
    }
  }, [])

  const saveData = useCallback(async (newData) => {
    try {
      if (!GITHUB_TOKEN) {
        console.warn('No GitHub token provided, skipping save')
        return
      }

      const updatedGist = {
        description: "LinkHub Admin Panel Database",
        files: {
          [GIST_NAME]: {
            content: JSON.stringify(newData, null, 2)
          }
        }
      }

      const response = await fetch(GIST_API_URL, {
        method: 'PATCH',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify(updatedGist)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error saving data to Gist:', error)
      setError(error.message)
      throw error
    }
  }, [])

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const fetchedData = await fetchData()
        setData(fetchedData)
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [fetchData])

  return {
    data,
    isLoading,
    error,
    fetchData,
    saveData,
    setData
  }
}