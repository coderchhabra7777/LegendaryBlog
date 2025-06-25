import React from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

const BlogDetail = () => {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Blog Detail Page
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Blog ID: {id}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            This page will display the full blog post content.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default BlogDetail
