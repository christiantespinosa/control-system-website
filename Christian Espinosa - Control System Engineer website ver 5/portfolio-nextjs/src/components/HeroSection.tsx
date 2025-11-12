'use client'

import { useEffect } from 'react'
import OptimizedImage from './OptimizedImage'

export default function HeroSection() {
  useEffect(() => {
    // Add scroll reveal animation with passive event listener
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.scroll-reveal')
    elements.forEach((el) => observer.observe(el))

    // Add passive scroll event listener for performance optimization
    const handleScroll = () => {
      // Throttled scroll handling for smooth animations
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll('.parallax-element')
      
      parallaxElements.forEach((element) => {
        const speed = 0.5
        const yPos = -(scrolled * speed)
        ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetElement = document.querySelector(href)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center hero-gradient scroll-reveal"
    >
      {/* Optimized background elements with Next.js Image */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Example of Next.js Image component for future background images */}
        <div className="absolute top-20 right-32 w-24 h-24 opacity-5">
          <OptimizedImage
            src="https://via.placeholder.com/96x96/007BFF/FFFFFF?text=⚡"
            alt="Decorative background element"
            width={96}
            height={96}
            className="animate-float-up"
            priority={false}
          />
        </div>
        
        <svg 
          className="absolute top-32 right-20 w-12 h-12 text-primary-500 opacity-10 animate-float-up" 
          fill="currentColor" 
          viewBox="0 0 24 24" 
          role="img" 
          aria-label="Decorative floating circle element"
        >
          <circle cx="12" cy="12" r="8"></circle>
        </svg>
        <svg 
          className="absolute bottom-40 left-16 w-8 h-8 text-primary-500 opacity-5 animate-float" 
          fill="currentColor" 
          viewBox="0 0 24 24" 
          role="img" 
          aria-label="Decorative floating star element"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center animate-fade-in-up scroll-reveal">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-text-primary mb-6 leading-tight drop-shadow-sm">
          Christian Espinosa<br />
          <span className="text-primary-500">Control Systems Engineer</span>
        </h1>
        <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
          Specializing in SCADA/DCS/HMI integration for mission-critical operations. 
          Delivering quantifiable results in MTTR reduction and TCO optimization.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a 
            href="#portfolio" 
            onClick={(e) => handleNavClick(e, '#portfolio')}
            className="bg-primary-500 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover-glow transform hover:scale-105 inline-flex items-center relative z-20 btn-primary" 
            role="button" 
            aria-label="View portfolio of automation engineering projects"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            View Portfolio
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className="border-2 border-primary-500 hover:bg-primary-500 hover:text-white text-text-primary font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover-glow transform hover:scale-105 inline-flex items-center relative z-20 btn-primary" 
            role="button" 
            aria-label="Contact Christian Espinosa"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Get In Touch
          </a>
        </div>
        
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce relative z-10 cursor-pointer icon-tilt" 
          role="img" 
          aria-label="Scroll down indicator"
          onClick={() => {
            const aboutSection = document.querySelector('#about')
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' })
            }
          }}
        >
          <svg className="w-6 h-6 text-primary-500 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  )
}