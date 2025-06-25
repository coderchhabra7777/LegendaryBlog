import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Clock, 
  Star,
  Eye,
  Heart,
  MessageCircle,
  Calendar,
  User,
  Tag
} from 'lucide-react'
import { useBlogStore } from '../store/useStore'
import { format } from 'date-fns'

// Mock data for demonstration
const mockBlogs = [
  {
    id: '1',
    title: 'Getting Started with React and Modern Web Development',
    excerpt: 'Learn the fundamentals of React and how to build modern, scalable web applications with the latest tools and best practices.',
    content: 'Full content here...',
    author: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      bio: 'Frontend Developer'
    },
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    tags: ['React', 'JavaScript', 'Web Development'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    views: 1250,
    likes: 89,
    comments: [
      { id: '1', content: 'Great article!', author: 'Jane Smith' },
      { id: '2', content: 'Very helpful, thanks!', author: 'Bob Johnson' }
    ],
    readTime: 8,
    featured: true
  },
  {
    id: '2',
    title: 'The Future of AI in Software Development',
    excerpt: 'Exploring how artificial intelligence is transforming the way we write code and build applications.',
    content: 'Full content here...',
    author: {
      id: '2',
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
      bio: 'AI Researcher'
    },
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    tags: ['AI', 'Machine Learning', 'Technology'],
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-14T15:30:00Z',
    views: 2100,
    likes: 156,
    comments: [
      { id: '3', content: 'Fascinating insights!', author: 'Mike Chen' }
    ],
    readTime: 12,
    featured: false
  },
  {
    id: '3',
    title: 'Building Scalable APIs with Node.js and Express',
    excerpt: 'A comprehensive guide to creating robust, scalable backend services using Node.js and Express framework.',
    content: 'Full content here...',
    author: {
      id: '3',
      name: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      bio: 'Backend Engineer'
    },
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    tags: ['Node.js', 'Express', 'Backend', 'API'],
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
    views: 890,
    likes: 67,
    comments: [],
    readTime: 15,
    featured: false
  }
]

const Home = () => {
  const { 
    blogs, 
    setBlogs, 
    searchQuery, 
    setSearchQuery, 
    selectedTag, 
    setSelectedTag, 
    sortBy, 
    setSortBy, 
    getFilteredBlogs 
  } = useBlogStore()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBlogs(mockBlogs)
      setLoading(false)
    }, 1000)
  }, [setBlogs])

  const filteredBlogs = getFilteredBlogs()
  const featuredBlog = blogs.find(blog => blog.featured)
  const regularBlogs = filteredBlogs.filter(blog => !blog.featured)

  const allTags = [...new Set(blogs.flatMap(blog => blog.tags))]

  const sortOptions = [
    { value: 'latest', label: 'Latest', icon: Clock },
    { value: 'trending', label: 'Trending', icon: TrendingUp },
    { value: 'popular', label: 'Popular', icon: Star },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Loading skeleton */}
          <div className="space-y-8">
            <div className="skeleton h-8 w-64"></div>
            <div className="skeleton h-64 w-full rounded-xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card p-6 space-y-4">
                  <div className="skeleton h-48 w-full rounded-lg"></div>
                  <div className="skeleton h-6 w-3/4"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6"
          >
            Welcome to{' '}
            <span className="text-gradient">LegendaryBlog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8"
          >
            Discover amazing stories, share your thoughts, and connect with a community of passionate writers and readers.
          </motion.p>
          
          {/* Search and filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field min-w-[120px]"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="input-field min-w-[120px]"
              >
                <option value="">All Tags</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>

        {/* Featured Article */}
        {featuredBlog && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              Featured Article
            </h2>
            
            <Link to={`/blog/${featuredBlog.id}`} className="block group">
              <div className="card-hover overflow-hidden">
                <div className="relative h-64 md:h-80">
                  <img
                    src={featuredBlog.coverImage}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {featuredBlog.title}
                    </h3>
                    <p className="text-gray-200 mb-4 line-clamp-2">
                      {featuredBlog.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={featuredBlog.author.avatar}
                          alt={featuredBlog.author.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="font-medium">{featuredBlog.author.name}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {featuredBlog.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {featuredBlog.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link to={`/blog/${blog.id}`} className="block group">
                <article className="card-hover overflow-hidden h-full">
                  <div className="relative h-48">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <img
                          src={blog.author.avatar}
                          alt={blog.author.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span>{blog.author.name}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {blog.readTime}m
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {blog.likes}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {format(new Date(blog.createdAt), 'MMM d, yyyy')}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          {blog.comments.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {regularBlogs.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No articles found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedTag('')
              }}
              className="btn-primary"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Home
