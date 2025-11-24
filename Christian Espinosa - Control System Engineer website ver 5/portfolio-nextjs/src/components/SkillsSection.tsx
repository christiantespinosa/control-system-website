'use client'

import { useEffect } from 'react'

interface SkillBarProps {
  skill: string
  years: string
  percentage: number
  colorClass: string
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, years, percentage, colorClass }) => (
  <div className="skill-item">
    <div className="flex justify-between mb-2">
      <span className="text-text-primary font-semibold">{skill}</span>
      <span className="text-primary-500 font-mono">{years}</span>
    </div>
    <div className="w-full bg-background-surface rounded-full h-3">
      <div 
        className={`skill-bar ${colorClass} h-3 rounded-full animate-fill-width`} 
        data-width={percentage} 
        style={{ width: '0%' }}
      ></div>
    </div>
  </div>
)

const SkillCategory: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="glass-card rounded-2xl p-8 hover-glow transition-all duration-300">
    <h3 className="text-2xl font-heading font-bold text-text-primary mb-6 text-center">{title}</h3>
    {children}
  </div>
)

const specializedAreas = [
  {
    icon: '⚙️',
    title: 'Industrial Protocols',
    description: 'EtherNet/IP, Profinet, DeviceNet, Modbus TCP/RTU'
  },
  {
    icon: '🔄',
    title: 'Process Control',
    description: 'PID Tuning, Advanced Process Control, Loop Optimization'
  },
  {
    icon: '📊',
    title: 'Data Analytics',
    description: 'Historical Data Analysis, Trend Analysis, Statistical Process Control'
  }
]

export default function SkillsSection() {
  useEffect(() => {
    // Animate skill bars on scroll into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-bar')
            skillBars.forEach((bar) => {
              const width = (bar as HTMLElement).dataset.width
              if (width) {
                setTimeout(() => {
                  (bar as HTMLElement).style.width = `${width}%`
                }, 200)
              }
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    const skillSections = document.querySelectorAll('#skills .skill-item')
    skillSections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="skills" 
      className="py-24 bg-background-surface parallax-element scroll-reveal" 
      data-speed="0.1" 
      aria-labelledby="skills-title"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="skills-title" className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-6">
            Technical Skills
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Core competencies and years of experience in automation engineering and control systems.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <SkillCategory title="SCADA/DCS Systems">
              <div className="space-y-6">
                <SkillBar 
                  skill="Wonderware System Platform" 
                  years="5 years" 
                  percentage={95} 
                  colorClass="bg-primary-500" 
                />
                <SkillBar 
                  skill="InTouch HMI Development" 
                  years="5 years" 
                  percentage={95} 
                  colorClass="bg-primary-500" 
                />
                <SkillBar 
                  skill="OPC/Modbus Protocols" 
                  years="5 years" 
                  percentage={95} 
                  colorClass="bg-primary-500" 
                />
              </div>
            </SkillCategory>

            <SkillCategory title="Database & Programming">
              <div className="space-y-6">
                <SkillBar 
                  skill="SQL Server" 
                  years="4 years" 
                  percentage={85} 
                  colorClass="bg-accent-green" 
                />
                <SkillBar 
                  skill="JavaScript" 
                  years="2 years" 
                  percentage={75} 
                  colorClass="bg-accent-green" 
                />
                <SkillBar 
                  skill="VBA Programming" 
                  years="3 years" 
                  percentage={80} 
                  colorClass="bg-accent-green" 
                />
              </div>
            </SkillCategory>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-heading font-bold text-text-primary mb-6 text-center">
              Specialized Areas
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {specializedAreas.map((area, index) => (
                <div 
                  key={index}
                  className="glass-card rounded-xl p-6 text-center hover-glow transition-all duration-300"
                >
                  <div className="text-3xl mb-4">{area.icon}</div>
                  <h4 className="font-semibold text-text-primary mb-2">{area.title}</h4>
                  <p className="text-sm text-text-secondary">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
