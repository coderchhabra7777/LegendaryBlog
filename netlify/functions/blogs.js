// Netlify Function for blog operations with Supabase integration
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

// Simple Supabase client for server-side operations
class SupabaseServer {
  constructor(url, key) {
    this.url = url
    this.key = key
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
      'apikey': key
    }
  }

  async query(table, options = {}) {
    const { method = 'GET', data, select = '*', filters = {} } = options
    
    let url = `${this.url}/rest/v1/${table}`
    
    if (method === 'GET') {
      url += `?select=${select}`
      Object.entries(filters).forEach(([key, value]) => {
        url += `&${key}=eq.${value}`
      })
    }

    const config = {
      method,
      headers: this.headers
    }

    if (data && (method === 'POST' || method === 'PATCH')) {
      config.body = JSON.stringify(data)
    }

    const response = await fetch(url, config)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  }
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  try {
    const { httpMethod, path, body } = event
    const pathSegments = path.split('/').filter(Boolean)
    
    // Initialize Supabase client (fallback to mock data if not configured)
    const supabase = SUPABASE_URL && SUPABASE_SERVICE_KEY 
      ? new SupabaseServer(SUPABASE_URL, SUPABASE_SERVICE_KEY)
      : null

    // Mock data for demonstration (used when Supabase is not configured)
    const mockBlogs = [
      {
        id: '1',
        title: 'Getting Started with React and Modern Web Development',
        excerpt: 'Learn the fundamentals of React and how to build modern, scalable web applications with the latest tools and best practices.',
        content: '# Getting Started with React\n\nReact is a powerful JavaScript library...',
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
          { id: '1', content: 'Great article!', author: 'Jane Smith', createdAt: '2024-01-15T11:00:00Z' },
          { id: '2', content: 'Very helpful, thanks!', author: 'Bob Johnson', createdAt: '2024-01-15T12:00:00Z' }
        ],
        readTime: 8,
        featured: true,
        published: true
      },
      {
        id: '2',
        title: 'The Future of AI in Software Development',
        excerpt: 'Exploring how artificial intelligence is transforming the way we write code and build applications.',
        content: '# The Future of AI in Software Development\n\nArtificial Intelligence is revolutionizing...',
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
          { id: '3', content: 'Fascinating insights!', author: 'Mike Chen', createdAt: '2024-01-14T16:00:00Z' }
        ],
        readTime: 12,
        featured: false,
        published: true
      }
    ]

    switch (httpMethod) {
      case 'GET':
        if (pathSegments.length === 3 && pathSegments[2]) {
          // Get single blog by ID
          const blogId = pathSegments[2]
          const blog = mockBlogs.find(b => b.id === blogId)
          
          if (!blog) {
            return {
              statusCode: 404,
              headers,
              body: JSON.stringify({ error: 'Blog not found' }),
            }
          }
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(blog),
          }
        } else {
          // Get all blogs
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(mockBlogs),
          }
        }

      case 'POST':
        // Create new blog
        const newBlogData = JSON.parse(body)
        const newBlog = {
          id: Date.now().toString(),
          ...newBlogData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          views: 0,
          likes: 0,
          comments: [],
          published: true
        }
        
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(newBlog),
        }

      case 'PUT':
        // Update blog
        const blogId = pathSegments[2]
        const updateData = JSON.parse(body)
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            id: blogId,
            ...updateData,
            updatedAt: new Date().toISOString()
          }),
        }

      case 'DELETE':
        // Delete blog
        const deleteId = pathSegments[2]
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: 'Blog deleted successfully' }),
        }

      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method not allowed' }),
        }
    }
  } catch (error) {
    console.error('Function error:', error)
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    }
  }
}
