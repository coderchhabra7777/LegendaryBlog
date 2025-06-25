import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Code, Coffee, Users, Target, Lightbulb } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion Driven",
      description: "Built with love for storytelling and sharing knowledge with the world."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Modern Technology",
      description: "Powered by React, Vite, and Supabase for lightning-fast performance."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community First",
      description: "Creating a space where writers and readers can connect and grow together."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description: "Constantly evolving with new features and improvements for better user experience."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            About <span className="text-blue-600 dark:text-blue-400">LegendaryBlog</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Welcome to LegendaryBlog - a modern, clean, and powerful blogging platform designed 
            to help writers share their stories and connect with readers around the world.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                At LegendaryBlog, we believe that every story deserves to be told and every voice 
                deserves to be heard. Our mission is to provide a platform that empowers writers 
                to share their thoughts, experiences, and knowledge with a global audience.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                We're committed to creating a space that's not just functional, but beautiful, 
                intuitive, and inspiring for both writers and readers.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <Target className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-blue-100">
                  To become the go-to platform for passionate writers and curious readers, 
                  fostering a community where ideas flourish and connections are made.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            What Makes Us Special
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Creator Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <Coffee className="w-16 h-16 mx-auto mb-6 text-blue-200" />
          <h2 className="text-3xl font-bold mb-4">Built with Passion</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            LegendaryBlog is crafted with attention to detail, modern web technologies, 
            and a deep understanding of what writers and readers need. Every feature is 
            designed to enhance your blogging experience.
          </p>
          <div className="mt-8 flex justify-center items-center space-x-4">
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm font-medium">React</span>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm font-medium">Vite</span>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm font-medium">Supabase</span>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm font-medium">Tailwind CSS</span>
            </div>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Join our community of writers and readers. Share your story with the world.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Start Writing
            </button>
            <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-colors">
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
