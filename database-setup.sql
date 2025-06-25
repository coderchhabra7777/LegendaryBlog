-- Complete Database Setup for LegendaryBlog
-- Run this FIRST in your Supabase SQL Editor to create tables and then add sample data

-- Drop existing tables if they exist (optional - only if you want to start fresh)
-- DROP TABLE IF EXISTS comments CASCADE;
-- DROP TABLE IF EXISTS blogs CASCADE;
-- DROP TABLE IF EXISTS authors CASCADE;

-- Create Authors table
CREATE TABLE IF NOT EXISTS authors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Blogs table
CREATE TABLE IF NOT EXISTS blogs (
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

-- Create Comments table
CREATE TABLE IF NOT EXISTS comments (
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

-- Create policies for public read access
DROP POLICY IF EXISTS "Allow read access to all users" ON blogs;
DROP POLICY IF EXISTS "Allow read access to all users" ON authors;
DROP POLICY IF EXISTS "Allow read access to all users" ON comments;

CREATE POLICY "Allow read access to all users" ON blogs FOR SELECT USING (true);
CREATE POLICY "Allow read access to all users" ON authors FOR SELECT USING (true);
CREATE POLICY "Allow read access to all users" ON comments FOR SELECT USING (true);

-- Allow insert/update for authenticated users
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON blogs;
DROP POLICY IF EXISTS "Allow update for authenticated users" ON blogs;
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON authors;
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON comments;

CREATE POLICY "Allow insert for authenticated users" ON blogs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update for authenticated users" ON blogs FOR UPDATE USING (true);
CREATE POLICY "Allow insert for authenticated users" ON authors FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert for authenticated users" ON comments FOR INSERT WITH CHECK (true);

-- Insert Sample Authors
INSERT INTO authors (name, email, avatar, bio) VALUES 
(
  'Alex Chen',
  'alex.chen@example.com',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'Full-stack developer passionate about React, Node.js, and modern web technologies. Love sharing knowledge through writing and open source contributions.'
),
(
  'Sarah Johnson',
  'sarah.johnson@example.com',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  'UI/UX Designer and Frontend Developer. Specializes in creating beautiful, accessible user experiences. Advocate for inclusive design and web accessibility.'
),
(
  'Marcus Rodriguez',
  'marcus.rodriguez@example.com',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  'DevOps Engineer and Cloud Architect. Expert in AWS, Docker, and Kubernetes. Passionate about automation, scalability, and building robust infrastructure.'
),
(
  'Emily Watson',
  'emily.watson@example.com',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  'Data Scientist and Machine Learning Engineer. Loves turning complex data into actionable insights. Enthusiast of Python, TensorFlow, and AI ethics.'
),
(
  'David Kim',
  'david.kim@example.com',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  'Mobile App Developer specializing in React Native and Flutter. Passionate about creating seamless cross-platform experiences and performance optimization.'
);

-- Insert Sample Blogs
INSERT INTO blogs (title, excerpt, content, cover_image, tags, author_id, views, likes, read_time, featured, published) VALUES 

-- Blog 1: React Best Practices (Featured)
(
  'React Best Practices: Building Scalable Applications in 2024',
  'Discover the latest React patterns and practices that will make your applications more maintainable, performant, and developer-friendly.',
  '# React Best Practices: Building Scalable Applications in 2024

React has evolved significantly over the years, and with it, the best practices for building scalable applications. In this comprehensive guide, we''ll explore the most important patterns and techniques that every React developer should know in 2024.

## 1. Component Composition Over Inheritance

React favors composition over inheritance, and for good reason. Instead of creating complex inheritance hierarchies, we can build flexible components by composing smaller, focused components.

```jsx
// ❌ Avoid complex inheritance
class BaseButton extends Component { /* ... */ }
class PrimaryButton extends BaseButton { /* ... */ }

// ✅ Use composition instead
const Button = ({ variant, children, ...props }) => {
  const baseClasses = "px-4 py-2 rounded font-medium"
  const variantClasses = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-200 text-gray-800"
  }
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

## 2. Custom Hooks for Logic Reuse

Custom hooks are one of React''s most powerful features. They allow you to extract component logic into reusable functions.

```jsx
// Custom hook for API calls
function useApi(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}
```

## 3. State Management Strategies

Choose the right state management solution for your needs:

- **Local State**: Use `useState` for component-specific state
- **Shared State**: Use Context API for app-wide state
- **Complex State**: Consider Zustand or Redux Toolkit for complex applications

## 4. Performance Optimization

- Use `React.memo` for expensive components
- Implement `useMemo` and `useCallback` judiciously
- Code splitting with `React.lazy` and `Suspense`
- Optimize bundle size with tree shaking

## Conclusion

Following these best practices will help you build React applications that are not only functional but also maintainable and performant. Remember, the key is to start simple and add complexity only when needed.

Happy coding! 🚀',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
  ARRAY['React', 'JavaScript', 'Web Development', 'Best Practices'],
  (SELECT id FROM authors WHERE email = 'alex.chen@example.com'),
  1250,
  89,
  8,
  true,
  true
),

-- Blog 2: UI/UX Design
(
  'The Art of Minimalist Web Design: Less is More',
  'Explore how minimalist design principles can create powerful, user-friendly websites that focus on what truly matters.',
  '# The Art of Minimalist Web Design: Less is More

In a world where users are bombarded with information, minimalist web design has emerged as a powerful approach to create clean, focused, and highly effective user experiences.

## What is Minimalist Design?

Minimalist design is about removing the unnecessary and focusing on the essential. It''s not about having less content, but about presenting content in the most effective way possible.

### Key Principles

1. **White Space is Your Friend**
   - Use generous white space to create breathing room
   - Help users focus on important elements
   - Improve readability and comprehension

2. **Typography Matters**
   - Choose fonts that are easy to read
   - Maintain consistent hierarchy
   - Use font weight and size to guide attention

3. **Color with Purpose**
   - Limit your color palette
   - Use color to highlight important actions
   - Ensure sufficient contrast for accessibility

## Benefits of Minimalist Design

### Improved User Experience
- Faster loading times
- Easier navigation
- Reduced cognitive load
- Better mobile experience

### Better Conversion Rates
- Clear call-to-actions stand out
- Fewer distractions lead to better focus
- Simplified user journeys

## Implementation Tips

```css
/* Example: Clean, minimal button design */
.minimal-button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.minimal-button:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}
```

## Case Studies

Many successful companies have embraced minimalist design:

- **Apple**: Clean product pages that focus on the product
- **Google**: Simple search interface that prioritizes functionality
- **Stripe**: Clear, focused landing pages with minimal distractions

## Common Mistakes to Avoid

1. **Too Much White Space**: Balance is key
2. **Lack of Visual Hierarchy**: Users need guidance
3. **Removing Essential Elements**: Don''t sacrifice functionality
4. **Ignoring Accessibility**: Ensure your design works for everyone

## Conclusion

Minimalist design isn''t about following a trend—it''s about creating better user experiences. By focusing on what''s essential and removing what''s not, we can create websites that are both beautiful and highly functional.

Remember: Good design is as little design as possible, but not less.',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
  ARRAY['Design', 'UI/UX', 'Web Design', 'Minimalism'],
  (SELECT id FROM authors WHERE email = 'sarah.johnson@example.com'),
  890,
  67,
  6,
  false,
  true
),

-- Blog 3: DevOps
(
  'Docker Containerization: A Complete Guide for Developers',
  'Master Docker containerization with this comprehensive guide covering everything from basics to advanced deployment strategies.',
  '# Docker Containerization: A Complete Guide for Developers

Docker has revolutionized how we develop, ship, and run applications. This guide will take you from Docker basics to advanced containerization strategies.

## Why Docker?

### The Problem Docker Solves
- "It works on my machine" syndrome
- Environment inconsistencies
- Complex deployment processes
- Resource inefficiency

### Docker Benefits
- **Consistency**: Same environment everywhere
- **Portability**: Run anywhere Docker runs
- **Efficiency**: Lightweight compared to VMs
- **Scalability**: Easy horizontal scaling

## Docker Fundamentals

### Images vs Containers
```bash
# An image is a template
docker build -t my-app .

# A container is a running instance
docker run -p 3000:3000 my-app
```

### Essential Commands
```bash
# Build an image
docker build -t app-name .

# Run a container
docker run -d -p 8080:80 --name my-container app-name

# List running containers
docker ps

# Stop a container
docker stop my-container

# Remove a container
docker rm my-container
```

## Writing Effective Dockerfiles

### Best Practices
```dockerfile
# Use specific base image versions
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

## Conclusion

Docker containerization is essential for modern application development. It provides consistency, portability, and efficiency that traditional deployment methods can''t match.',
  'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop',
  ARRAY['Docker', 'DevOps', 'Containerization', 'Deployment'],
  (SELECT id FROM authors WHERE email = 'marcus.rodriguez@example.com'),
  1100,
  78,
  10,
  false,
  true
);

-- Add some sample comments
INSERT INTO comments (blog_id, author_name, content) VALUES
(
  (SELECT id FROM blogs WHERE title LIKE 'React Best Practices%'),
  'John Developer',
  'Great article! The custom hooks section was particularly helpful. I''ve been struggling with logic reuse in my React apps.'
),
(
  (SELECT id FROM blogs WHERE title LIKE 'React Best Practices%'),
  'Sarah Code',
  'Thanks for the composition over inheritance tip. This will definitely improve my component architecture.'
),
(
  (SELECT id FROM blogs WHERE title LIKE 'The Art of Minimalist%'),
  'Design Enthusiast',
  'Love the minimalist approach! Clean design really does improve user experience. The CSS examples are very practical.'
);
