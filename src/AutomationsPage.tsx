import React from 'react';
import { Sparkles, Star, ArrowRight, Clock, BarChart2, Award } from 'lucide-react';
import AutomationGallery from './AutomationGallery';

function AutomationsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="hexagon-grid absolute inset-0 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              >
                <Sparkles className="w-16 h-16 text-blue-500/30" />
              </div>
            ))}
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 gradient-text animate-gradient text-center">
            Explore Our Automation Templates
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto text-center">
            Browse our collection of powerful automation templates that can transform your business operations.
            Filter by category or benefit to find the perfect solution for your needs.
          </p>
        </div>
      </section>

      {/* Automation of the Week Section */}
      <section className="py-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-y border-blue-500/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-8 h-8 text-yellow-400" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Automation of the Week
            </h2>
          </div>

          <div className="bg-black/60 backdrop-blur-lg rounded-2xl overflow-hidden border border-blue-500/30 shadow-lg shadow-blue-500/10 transform hover:scale-[1.01] transition-all duration-300">
            <div className="md:flex">
              {/* Left side - Image/Illustration */}
              <div className="md:w-2/5 bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-8 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl"></div>
                  <BarChart2 className="w-32 h-32 text-blue-400 relative z-10" />
                </div>
              </div>

              {/* Right side - Content */}
              <div className="md:w-3/5 p-8">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400" fill="#FBBF24" />
                  <span className="text-yellow-400 text-sm font-medium">Featured Automation</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  AI-Powered Content Generation & Distribution
                </h3>

                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                    Marketing & Content Creation
                  </span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                    Productivity
                  </span>
                </div>

                <p className="text-gray-300 mb-6">
                  This powerful automation combines AI content generation with multi-channel distribution.
                  It uses GPT models to create blog posts, social media content, and newsletters based on your
                  topic input, then automatically formats and publishes them across your digital platforms.
                  Includes SEO optimization and performance tracking.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-400 text-sm">Saves 15+ hours/week</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-400 text-sm">98% Customer Satisfaction</span>
                  </div>
                </div>

                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white font-medium">
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Gallery Section */}
      <AutomationGallery />
    </div>
  );
}

export default AutomationsPage;