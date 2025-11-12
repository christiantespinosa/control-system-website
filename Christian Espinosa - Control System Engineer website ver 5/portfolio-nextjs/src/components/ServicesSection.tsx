'use client'

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features }) => (
  <div className="glass-card rounded-2xl p-8 hover-glow transition-all duration-300 transform hover:scale-105">
    <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-heading font-bold text-text-primary mb-4">{title}</h3>
    <p className="text-text-secondary mb-6">{description}</p>
    <ul className="text-sm text-text-secondary space-y-2">
      {features.map((feature, index) => (
        <li key={index}>• {feature}</li>
      ))}
    </ul>
  </div>
)

const services = [
  {
    title: 'SCADA System Development',
    description: 'Custom SCADA solutions using Wonderware System Platform, optimizing workflows and improving operational visibility.',
    features: [
      'InTouch HMI Development',
      'Application Server Configuration',
      'Data Integration & Historian',
      'Alarm Management Systems'
    ],
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
      </svg>
    )
  },
  {
    title: 'Control System Integration',
    description: 'Seamless integration of PLCs, drives, and sensors with robust communication protocols and fault tolerance.',
    features: [
      'PLC Programming & Configuration',
      'Industrial Protocol Implementation',
      'Redundancy & Failover Systems',
      'Real-time Monitoring Solutions'
    ],
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    )
  },
  {
    title: 'System Optimization',
    description: 'Performance tuning and reliability improvements to reduce downtime and operational costs.',
    features: [
      'Process Performance Analysis',
      'MTTR Reduction Strategies',
      'Preventive Maintenance Planning',
      'Asset Lifecycle Optimization'
    ],
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
      </svg>
    )
  }
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-background-surface scroll-reveal" aria-labelledby="services-title">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="services-title" className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-6">
            Services
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Comprehensive automation engineering solutions tailored to your operational requirements.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
            />
          ))}
        </div>
      </div>
    </section>
  )
}