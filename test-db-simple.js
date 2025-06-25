// Simple test script to verify Supabase connection
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY

console.log('🔗 Testing Supabase connection...')
console.log('📍 URL:', SUPABASE_URL)
console.log('🔑 Key:', SUPABASE_ANON_KEY ? 'Present ✅' : 'Missing ❌')

async function testConnection() {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/authors?select=*`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('✅ Connection successful!')
    console.log('📊 Current authors in database:', data.length)
    console.log('👥 Authors:', data)

    // Test blogs table
    const blogsResponse = await fetch(`${SUPABASE_URL}/rest/v1/blogs?select=*`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY
      }
    })

    const blogsData = await blogsResponse.json()
    console.log('📝 Current blogs in database:', blogsData.length)
    console.log('📚 Blogs:', blogsData)

    console.log('🎉 Database connection test complete!')

  } catch (error) {
    console.error('❌ Connection failed:', error.message)
  }
}

testConnection()
