'use client'

import { useState } from 'react'

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  projectType: string
  message: string
  website: string // Honeypot field
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
    website: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Check honeypot field - if filled, don't process
    if (formData.website) {
      setSubmitStatus('error')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData
        }).toString()
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          projectType: '',
          message: '',
          website: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 scroll-reveal" aria-labelledby="contact-title">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="contact-title" className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-6">
            Get In Touch
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Ready to discuss your automation and control systems needs? Let's connect and explore how we can optimize your operations.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <form 
            name="contact" 
            method="POST" 
            data-netlify="true"
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-8 space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            
            {/* Honeypot field for spam protection */}
            <input 
              type="text" 
              name="website" 
              tabIndex={-1} 
              autoComplete="off" 
              style={{ display: 'none' }} 
              aria-hidden="true"
              value={formData.website}
              onChange={handleChange}
            />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-text-primary mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full h-14 bg-background-surface border border-gray-600 rounded-xl px-4 text-text-primary placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 focus:outline-none transition-all duration-300"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-text-primary mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full h-14 bg-background-surface border border-gray-600 rounded-xl px-4 text-text-primary placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 focus:outline-none transition-all duration-300"
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full h-14 bg-background-surface border border-gray-600 rounded-xl px-4 text-text-primary placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 focus:outline-none transition-all duration-300"
                placeholder="john.doe@company.com"
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-text-primary mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full h-14 bg-background-surface border border-gray-600 rounded-xl px-4 text-text-primary placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 focus:outline-none transition-all duration-300"
                placeholder="Your Company Name"
              />
            </div>
            
            <div>
              <label htmlFor="projectType" className="block text-sm font-semibold text-text-primary mb-2">
                Project Type
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full h-14 bg-background-surface border border-gray-600 rounded-xl px-4 text-text-primary focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 focus:outline-none transition-all duration-300"
              >
                <option value="">Select Project Type</option>
                <option value="scada">SCADA System Development</option>
                <option value="dcs">DCS Integration</option>
                <option value="hmi">HMI Modernization</option>
                <option value="integration">System Integration</option>
                <option value="optimization">System Optimization</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-text-primary mb-2">
                Project Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-background-surface border border-gray-600 rounded-xl px-4 py-4 text-text-primary placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 focus:outline-none transition-all duration-300 resize-none"
                placeholder="Please describe your project requirements, timeline, and any specific challenges you're facing..."
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-500 hover:bg-primary-700 disabled:bg-gray-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover-glow transform hover:scale-105 disabled:transform-none"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            {submitStatus === 'success' && (
              <div className="p-4 rounded-xl text-center bg-green-500 bg-opacity-20 border border-green-500 text-green-400">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="p-4 rounded-xl text-center bg-red-500 bg-opacity-20 border border-red-500 text-red-400">
                There was an error sending your message. Please try again or contact me directly.
              </div>
            )}
          </form>
          
          {/* Form Information */}
          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              📧 Forms are processed securely through Netlify. Your information will be sent directly to my email.
            </p>
          </div>
          
          {/* Contact Info */}
          <div className="mt-12 text-center">
            <p className="text-text-secondary mb-4">Prefer direct contact?</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="mailto:christian.t.espinosa@gmail.com"
                className="inline-flex items-center text-primary-500 hover:text-primary-400 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                christian.t.espinosa@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}