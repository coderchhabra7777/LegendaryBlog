// Test script to verify Supabase connection and add sample data
import { supabase } from './src/lib/supabase.js'

async function testConnection() {
  try {
    console.log('🔗 Testing Supabase connection...')
    
    // Test connection by trying to fetch from authors table
    const { data, error } = await supabase.query('authors')
    
    if (error) {
      console.error('❌ Connection failed:', error)
      return
    }
    
    console.log('✅ Connection successful!')
    console.log('📊 Current authors in database:', data.length)
    
    // Add sample author if none exist
    if (data.length === 0) {
      console.log('📝 Adding sample author...')
      
      const newAuthor = {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        bio: 'Frontend Developer and Tech Enthusiast'
      }
      
      const authorResult = await supabase.createUser(newAuthor)
      console.log('✅ Sample author created:', authorResult)
      
      // Add sample blog post
      console.log('📝 Adding sample blog post...')
      
      const newBlog = {
        title: 'Welcome to LegendaryBlog',
        excerpt: 'This is your first blog post created with real database storage!',
        content: `# Welcome to LegendaryBlog!

This is your first blog post stored in a real PostgreSQL database via Supabase.

## Features
- Real database storage
- User authentication
- Rich text editing
- Tag management
- Comment system

## Getting Started
You can now create, edit, and manage blog posts with persistent storage. All your content is safely stored in the cloud and will be available even after deployment.

Happy blogging! 🚀`,
        cover_image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop',
        tags: ['Welcome', 'Getting Started', 'Database'],
        author_id: authorResult[0]?.id,
        read_time: 3,
        featured: true
      }
      
      const blogResult = await supabase.createBlog(newBlog)
      console.log('✅ Sample blog created:', blogResult)
    }
    
    console.log('🎉 Database setup complete!')
    
  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

testConnection()
