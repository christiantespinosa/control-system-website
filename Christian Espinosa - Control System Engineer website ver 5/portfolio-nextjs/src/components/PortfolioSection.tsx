'use client'

interface ProjectCardProps {
  category: string
  industry: string
  title: string
  metric: string
  metricValue: string
  description: string
  features: string[]
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  category, industry, title, metric, metricValue, description, features 
}) => (
  <div className="glass-card rounded-2xl p-8 hover-glow transition-all duration-300 transform hover:scale-105 scroll-reveal animate-slow-glow">
    <div className="flex items-center justify-between mb-6">
      <span className="text-xs px-3 py-1 bg-primary-500 text-white rounded-full">{category}</span>
      <span className="text-xs text-text-secondary">{industry}</span>
    </div>
    <h3 className="text-xl font-heading font-bold text-text-primary mb-4">{title}</h3>
    <div className="text-3xl font-mono font-bold text-primary-500 mb-4">{metricValue}</div>
    <p className="text-text-secondary mb-6">{description}</p>
    <ul className="text-sm text-text-secondary space-y-1">
      {features.map((feature, index) => (
        <li key={index}>• {feature}</li>
      ))}
    </ul>
  </div>
)

const projects = [
  {
    category: 'SCADA',
    industry: 'Manufacturing',
    title: 'Automotive Assembly Line SCADA',
    metric: 'MTTR',
    metricValue: '-42% MTTR',
    description: 'Developed comprehensive SCADA system using Wonderware System Platform for multi-line automotive assembly operation.',
    features: [
      '15 production lines integrated',
      'Real-time OEE monitoring',
      'Predictive maintenance alerts',
      'Centralized alarm management'
    ]
  },
  {
    category: 'HMI',
    industry: 'Manufacturing',
    title: 'Semiconductor HMI Modernization',
    metric: 'TCO',
    metricValue: '-28% TCO',
    description: 'Modernized semiconductor manufacturing HMI systems using SCADA/Wonderware System Platform for power generation operations.',
    features: [
      'Power generation monitoring integration',
      'HMI interface modernization',
      'Total Cost of Ownership optimization',
      'Manufacturing process efficiency'
    ]
  },
  {
    category: 'Analytics',
    industry: 'Food & Beverage',
    title: 'Food Processing Analytics Platform',
    metric: 'OEE',
    metricValue: '+22% OEE',
    description: 'Developed real-time analytics platform for food processing operations with predictive quality control.',
    features: [
      'Real-time quality monitoring',
      'Predictive maintenance analytics',
      'Energy consumption optimization',
      'Production scheduling integration'
    ]
  }
]

export default function PortfolioSection() {
  return (
    <section 
      id="portfolio" 
      className="py-24 parallax-element scroll-reveal" 
      data-speed="0.2" 
      aria-labelledby="portfolio-title"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <h2 id="portfolio-title" className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-6">
            Portfolio
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Real-world projects showcasing quantifiable results in automation engineering and control systems.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              category={project.category}
              industry={project.industry}
              title={project.title}
              metric={project.metric}
              metricValue={project.metricValue}
              description={project.description}
              features={project.features}
            />
          ))}
        </div>
      </div>
    </section>
  )
}