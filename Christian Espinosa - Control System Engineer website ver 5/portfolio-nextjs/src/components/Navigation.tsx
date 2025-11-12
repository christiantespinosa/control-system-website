'use client'

import { useState } from 'react'

const navigationItems = [
  { href: '#home', label: 'Home', ariaLabel: 'Go to home section' },
  { href: '#about', label: 'About', ariaLabel: 'Go to about section' },
  { href: '#services', label: 'Services', ariaLabel: 'Go to services section' },
  { href: '#portfolio', label: 'Portfolio', ariaLabel: 'Go to portfolio section' },
  { href: '#skills', label: 'Skills', ariaLabel: 'Go to skills section' },
  { href: '#technical', label: 'Technical', ariaLabel: 'Go to technical section' },
  { href: '#experience', label: 'Experience', ariaLabel: 'Go to experience section' },
  { href: '#contact', label: 'Contact', ariaLabel: 'Go to contact section' },
]

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetElement = document.querySelector(href)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav 
      className="fixed top-0 w-full z-50 glass-card backdrop-blur-glass" 
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand/Logo */}
          <div className="text-xl font-bold text-text-primary">
            <span className="text-primary-500" role="img" aria-label="Christian Espinosa - Automation Engineer">
              Christian Espinosa
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-text-secondary hover:text-primary-500 transition-colors duration-200"
                aria-label={item.ariaLabel}
              >
                {item.label}
              </a>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            id="mobile-menu-button"
            className="md:hidden text-text-primary" 
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close mobile navigation menu' : 'Toggle mobile navigation menu'} 
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-text-secondary hover:text-primary-500 transition-colors duration-200 py-2"
                  aria-label={item.ariaLabel}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}