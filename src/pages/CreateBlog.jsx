import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Save, Eye, Upload, X, Plus } from 'lucide-react'
import { useAuthStore, useBlogStore } from '../store/useStore'
import { toast } from 'react-hot-toast'

const CreateBlog = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { addBlog } = useBlogStore()
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(false)
  const [coverImage, setCoverImage] = useState('')
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      coverImage: '',
      tags: []
    }
  })

  const watchedContent = watch('content')
  const watchedTitle = watch('title')
  const watchedExcerpt = watch('excerpt')

  // Calculate reading time (rough estimate: 200 words per minute)
  const calculateReadingTime = (text) => {
    const words = text.split(' ').length
    return Math.ceil(words / 200)
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()]
      setTags(updatedTags)
      setValue('tags', updatedTags)
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove)
    setTags(updatedTags)
    setValue('tags', updatedTags)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // In a real app, you'd upload to a service like Cloudinary
      // For demo, we'll use a placeholder
      const imageUrl = `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop`
      setCoverImage(imageUrl)
      setValue('coverImage', imageUrl)
      toast.success('Cover image uploaded!')
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    
    try {
      // Simulate API call to create blog
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newBlog = {
        id: Date.now().toString(),
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: coverImage || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop',
        tags: tags,
        author: {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          bio: user.bio
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        likes: 0,
        comments: [],
        readTime: calculateReadingTime(data.content),
        featured: false,
        published: true
      }
      
      // Add to store (in real app, this would be an API call)
      addBlog(newBlog)
      
      toast.success('Blog post created successfully!')
      navigate('/')
    } catch (error) {
      toast.error('Failed to create blog post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const saveDraft = () => {
    toast.success('Draft saved!')
  }

  if (preview) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Preview
            </h1>
            <button
              onClick={() => setPreview(false)}
              className="btn-secondary"
            >
              <X className="w-4 h-4 mr-2" />
              Close Preview
            </button>
          </div>
          
          {/* Preview Content */}
          <article className="card">
            {coverImage && (
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-64 object-cover rounded-t-lg"
              />
            )}
            
            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {watchedTitle || 'Untitled'}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user?.name}</span>
                </div>
                <span>•</span>
                <span>{calculateReadingTime(watchedContent)} min read</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                {watchedExcerpt}
              </p>
              
              <div className="prose dark:prose-invert max-w-none">
                {watchedContent.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Create New Blog Post
            </h1>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={saveDraft}
                className="btn-secondary"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </button>
              
              <button
                type="button"
                onClick={() => setPreview(true)}
                className="btn-secondary"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Cover Image */}
            <div className="card p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Cover Image
              </label>
              
              {coverImage ? (
                <div className="relative">
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setCoverImage('')
                      setValue('coverImage', '')
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> cover image
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG or WEBP (MAX. 2MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>

            {/* Title */}
            <div className="card p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title *
              </label>
              <input
                {...register('title', {
                  required: 'Title is required',
                  minLength: {
                    value: 5,
                    message: 'Title must be at least 5 characters'
                  }
                })}
                type="text"
                className="input-field text-2xl font-bold"
                placeholder="Enter your blog title..."
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Excerpt */}
            <div className="card p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Excerpt *
              </label>
              <textarea
                {...register('excerpt', {
                  required: 'Excerpt is required',
                  minLength: {
                    value: 20,
                    message: 'Excerpt must be at least 20 characters'
                  },
                  maxLength: {
                    value: 200,
                    message: 'Excerpt must be less than 200 characters'
                  }
                })}
                rows={3}
                className="input-field"
                placeholder="Write a brief description of your blog post..."
              />
              {errors.excerpt && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.excerpt.message}
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="card p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="input-field flex-1"
                  placeholder="Add a tag..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="btn-secondary"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="card p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content *
              </label>
              <textarea
                {...register('content', {
                  required: 'Content is required',
                  minLength: {
                    value: 100,
                    message: 'Content must be at least 100 characters'
                  }
                })}
                rows={20}
                className="input-field font-mono"
                placeholder="Write your blog content here... You can use Markdown formatting."
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.content.message}
                </p>
              )}
              
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {watchedContent && (
                  <span>
                    {watchedContent.length} characters • {calculateReadingTime(watchedContent)} min read
                  </span>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn-secondary"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Publishing...
                  </div>
                ) : (
                  'Publish Blog'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default CreateBlog
