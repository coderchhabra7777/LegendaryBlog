import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            About LegendaryBlog
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Learn more about our mission to create a clean, powerful blogging platform.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default About
