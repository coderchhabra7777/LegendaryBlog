// Supabase client configuration for database operations
// This provides a PostgreSQL database that works perfectly with Netlify

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

// Simple fetch-based client (you can also use @supabase/supabase-js)
class SupabaseClient {
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
    
    // Add select parameter
    if (method === 'GET') {
      url += `?select=${select}`
      
      // Add filters
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

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Supabase query error:', error)
      throw error
    }
  }

  // Blog operations
  async getBlogs() {
    return this.query('blogs', {
      select: '*, authors(*)'
    })
  }

  async getBlog(id) {
    try {
      // Use the same method as getBlogs but filter by ID
      const allBlogs = await this.getBlogs()
      const blog = allBlogs.find(blog => blog.id === id && blog.published)
      
      if (!blog) {
        throw new Error('Blog not found')
      }
      
      return blog
    } catch (error) {
      console.error('Error fetching blog:', error)
      throw error
    }
  }

  async createBlog(blogData) {
    return this.query('blogs', {
      method: 'POST',
      data: blogData
    })
  }

  async updateBlog(id, updates) {
    try {
      const url = `${this.url}/rest/v1/blogs?id=eq.${id}`
      
      const response = await fetch(url, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(updates)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error updating blog:', error)
      throw error
    }
  }

  async deleteBlog(id) {
    return this.query(`blogs?id=eq.${id}`, {
      method: 'DELETE'
    })
  }

  // User operations
  async createUser(userData) {
    return this.query('authors', {
      method: 'POST',
      data: userData
    })
  }

  async getUser(id) {
    const users = await this.query('authors', {
      filters: { id }
    })
    return users[0]
  }

  // Comment operations
  async getComments(blogId) {
    try {
      const url = `${this.url}/rest/v1/comments?blog_id=eq.${blogId}&order=created_at.desc`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching comments:', error)
      return []
    }
  }

  async createComment(commentData) {
    return this.query('comments', {
      method: 'POST',
      data: commentData
    })
  }
}

export const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Database schema for reference:
/*
-- Authors table
CREATE TABLE authors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blogs table
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  tags TEXT[],
  author_id UUID REFERENCES authors(id),
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  read_time INTEGER,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comments table
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policies (allow read access to all, write access to authenticated users)
CREATE POLICY "Allow read access to all users" ON blogs FOR SELECT USING (true);
CREATE POLICY "Allow read access to all users" ON authors FOR SELECT USING (true);
CREATE POLICY "Allow read access to all users" ON comments FOR SELECT USING (true);
*/
