'use client'

interface ExperienceItemProps {
  company: string
  role: string
  period: string
  description: string
  achievements: string[]
}

const ExperienceCard: React.FC<ExperienceItemProps> = ({ 
  company, role, period, description, achievements 
}) => (
  <div className="glass-card rounded-2xl p-8 hover-glow transition-all duration-300 scroll-reveal">
    <div className="mb-6">
      <h3 className="text-xl font-heading font-bold text-text-primary mb-2">{company}</h3>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <span className="text-primary-500 font-semibold">{role}</span>
        <span className="text-text-secondary text-sm">{period}</span>
      </div>
      <p className="text-text-secondary">{description}</p>
    </div>
    
    <div>
      <h4 className="text-lg font-semibold text-text-primary mb-3">Key Achievements</h4>
      <ul className="text-sm text-text-secondary space-y-2">
        {achievements.map((achievement, index) => (
          <li key={index}>• {achievement}</li>
        ))}
      </ul>
    </div>
  </div>
)

const experiences: ExperienceItemProps[] = [
  {
    company: 'Manufacturing Solutions Corp',
    role: 'Senior Automation Engineer',
    period: '2020 - Present',
    description: 'Leading automation engineering initiatives for industrial manufacturing operations.',
    achievements: [
      'Reduced MTTR by 42% across automotive assembly lines',
      'Implemented Wonderware System Platform for 15+ production lines',
      'Developed predictive maintenance algorithms reducing downtime by 28%',
      'Led cross-functional teams for SCADA modernization projects'
    ]
  },
  {
    company: 'Industrial Controls Inc',
    role: 'Control Systems Engineer',
    period: '2018 - 2020',
    description: 'Specialized in DCS and HMI development for process industries.',
    achievements: [
      'Modernized semiconductor manufacturing HMI systems',
      'Integrated OPC communication protocols across 200+ devices',
      'Developed custom alarm management systems reducing false alarms by 60%',
      'Optimized control loops resulting in 15% energy savings'
    ]
  }
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 bg-background-surface scroll-reveal" aria-labelledby="experience-title">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="experience-title" className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-6">
            Experience
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Professional journey in automation engineering and control systems integration.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={index}
              company={experience.company}
              role={experience.role}
              period={experience.period}
              description={experience.description}
              achievements={experience.achievements}
            />
          ))}
        </div>
      </div>
    </section>
  )
}