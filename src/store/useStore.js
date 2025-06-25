import { create } from 'zustand'

// Theme store
export const useThemeStore = create((set) => ({
  isDark: false,
  toggleTheme: () => set((state) => {
    const newIsDark = !state.isDark
    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    return { isDark: newIsDark }
  }),
  setTheme: (isDark) => set(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    return { isDark }
  })
}))

// Auth store
export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  login: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData))
    set({ user: userData, isAuthenticated: true })
  },
  logout: () => {
    localStorage.removeItem('user')
    set({ user: null, isAuthenticated: false })
  },
  updateUser: (userData) => set((state) => {
    const updatedUser = { ...state.user, ...userData }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    return { user: updatedUser }
  }),
  initAuth: () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        set({ user, isAuthenticated: true })
      } catch (error) {
        localStorage.removeItem('user')
      }
    }
  }
}))

// Blog store
export const useBlogStore = create((set, get) => ({
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null,
  searchQuery: '',
  selectedTag: '',
  sortBy: 'latest', // latest, trending, popular
  
  // Actions
  setBlogs: (blogs) => set({ blogs }),
  addBlog: (blog) => set((state) => ({ 
    blogs: [blog, ...state.blogs] 
  })),
  updateBlog: (id, updates) => set((state) => ({
    blogs: state.blogs.map(blog => 
      blog.id === id ? { ...blog, ...updates } : blog
    )
  })),
  deleteBlog: (id) => set((state) => ({
    blogs: state.blogs.filter(blog => blog.id !== id)
  })),
  setCurrentBlog: (blog) => set({ currentBlog: blog }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  setSortBy: (sortBy) => set({ sortBy }),
  
  // Computed values
  getFilteredBlogs: () => {
    const { blogs, searchQuery, selectedTag, sortBy } = get()
    let filtered = [...blogs]
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(blog =>
        blog.tags.includes(selectedTag)
      )
    }
    
    // Sort
    switch (sortBy) {
      case 'trending':
        return filtered.sort((a, b) => (b.likes + b.comments.length) - (a.likes + a.comments.length))
      case 'popular':
        return filtered.sort((a, b) => b.views - a.views)
      case 'latest':
      default:
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
  }
}))

// Comments store
export const useCommentsStore = create((set, get) => ({
  comments: {},
  loading: false,
  
  setComments: (blogId, comments) => set((state) => ({
    comments: { ...state.comments, [blogId]: comments }
  })),
  
  addComment: (blogId, comment) => set((state) => ({
    comments: {
      ...state.comments,
      [blogId]: [...(state.comments[blogId] || []), comment]
    }
  })),
  
  updateComment: (blogId, commentId, updates) => set((state) => ({
    comments: {
      ...state.comments,
      [blogId]: state.comments[blogId]?.map(comment =>
        comment.id === commentId ? { ...comment, ...updates } : comment
      ) || []
    }
  })),
  
  deleteComment: (blogId, commentId) => set((state) => ({
    comments: {
      ...state.comments,
      [blogId]: state.comments[blogId]?.filter(comment => comment.id !== commentId) || []
    }
  })),
  
  setLoading: (loading) => set({ loading })
}))

// UI store
export const useUIStore = create((set) => ({
  sidebarOpen: false,
  mobileMenuOpen: false,
  searchModalOpen: false,
  
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setSearchModalOpen: (open) => set({ searchModalOpen: open }),
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  toggleSearchModal: () => set((state) => ({ searchModalOpen: !state.searchModalOpen }))
}))
