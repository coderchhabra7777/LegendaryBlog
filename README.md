# LegendaryBlog - A Clean, Powerful Blogging Platform

A modern, responsive blogging platform built with React, Tailwind CSS, and deployed on Netlify. Features a clean design, dark mode support, and all the essential blogging functionality.

## 🚀 Features

### Core Features
- **📝 Blog Management**: Create, edit, and delete blog posts
- **🔍 Search & Filter**: Search by title/content and filter by tags
- **👤 User Authentication**: Login/Register with protected routes
- **📱 Responsive Design**: Mobile-first design that works on all devices
- **🌙 Dark Mode**: Toggle between light and dark themes
- **⚡ Fast Performance**: Optimized for speed with lazy loading

### Blog Features
- Rich text content with Markdown support
- Cover image support
- Tag system for categorization
- Reading time estimation
- View counts and engagement metrics
- Featured posts
- Comments system (UI ready)

### User Experience
- Smooth animations with Framer Motion
- Toast notifications for user feedback
- Loading states and skeletons
- SEO-optimized pages
- Clean, modern UI design

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications
- **Lucide React** - Beautiful icons
- **Date-fns** - Date formatting

### Backend
- **Netlify Functions** - Serverless backend
- **Mock Data** - Demo content for development

### Deployment
- **Netlify** - Static site hosting with serverless functions
- **Automatic deployments** from Git

## 📁 Project Structure

```
legendary-blog/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── auth/         # Authentication components
│   │   └── layout/       # Layout components (Header, Footer)
│   ├── pages/            # Page components
│   ├── store/            # Zustand state management
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # App entry point
│   └── index.css         # Global styles
├── netlify/
│   └── functions/        # Serverless functions
├── netlify.toml          # Netlify configuration
└── package.json          # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd legendary-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Development with Netlify Functions

To test with Netlify Functions locally:

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Start Netlify dev server**
   ```bash
   netlify dev
   ```

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Deploy to Netlify

1. **Connect to Netlify**
   - Push code to GitHub/GitLab
   - Connect repository in Netlify dashboard
   - Set build command: `npm run build`
   - Set publish directory: `dist`

2. **Automatic Deployments**
   - Every push to main branch triggers deployment
   - Preview deployments for pull requests

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Content
- Update mock data in `netlify/functions/blogs.js`
- Modify hero content in `src/pages/Home.jsx`
- Update footer links in `src/components/layout/Footer.jsx`

## 🔧 Configuration

### Environment Variables
Create `.env` file for local development:

```env
VITE_API_URL=http://localhost:8888/.netlify/functions
```

### Netlify Configuration
The `netlify.toml` file includes:
- Build settings
- Redirect rules for SPA
- Security headers
- Function configuration

## 📱 Features in Detail

### Authentication
- JWT-based authentication (mock implementation)
- Protected routes for authenticated users
- Persistent login state
- User profile management

### Blog Management
- WYSIWYG editor (placeholder)
- Image upload support (placeholder)
- Draft/publish workflow
- SEO metadata

### Search & Discovery
- Real-time search
- Tag-based filtering
- Sort by latest, trending, popular
- Featured content highlighting

## 🚀 Performance

### Optimization Features
- Code splitting with React.lazy
- Image lazy loading
- Optimized bundle size
- Fast initial page load
- Efficient re-renders with Zustand

### Lighthouse Scores
Target scores:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern blogging platforms
- Icons by [Lucide](https://lucide.dev/)
- Images from [Unsplash](https://unsplash.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

## 📞 Support

For support, email hello@legendaryblog.com or create an issue in the repository.

---

Built with ❤️ by the LegendaryBlog Team
