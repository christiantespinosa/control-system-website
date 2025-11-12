'use client'

export default function AboutSection() {
  return (
    <section id="about" className="py-24 scroll-reveal" aria-labelledby="about-title">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="about-title" className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-6">
            About Me
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Passionate about industrial automation and control systems with proven expertise in mission-critical operations.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="glass-card rounded-2xl p-8 hover-glow transition-all duration-300">
            <h3 className="text-2xl font-heading font-bold text-text-primary mb-6">Professional Background</h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              I'm Christian Espinosa, an Information Systems and Automation Engineer specializing in integrating complex control systems 
              that drive operational excellence. My expertise spans across SCADA, DCS, and HMI technologies, with 
              extensive experience in Wonderware System Platform development.
            </p>
            <p className="text-text-secondary mb-6 leading-relaxed">
              I focus on delivering measurable results that impact the bottom line—reducing Mean Time to Repair (MTTR), 
              minimizing Total Cost of Ownership (TCO), and improving overall system reliability for mission-critical operations.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-primary-500 mb-2">-35%</div>
                <div className="text-sm text-text-secondary">Average MTTR Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-primary-500 mb-2">-28%</div>
                <div className="text-sm text-text-secondary">TCO Improvement</div>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-8 hover-glow transition-all duration-300">
            <h3 className="text-2xl font-heading font-bold text-text-primary mb-6">Core Competencies</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-2">Control Systems Integration</h4>
                <p className="text-text-secondary text-sm">SCADA, DCS, HMI architecture and development</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-2">Wonderware Platform</h4>
                <p className="text-text-secondary text-sm">System Platform, InTouch, Application Server</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-2">Industrial Protocols</h4>
                <p className="text-text-secondary text-sm">Modbus, EtherNet/IP, Profibus, OPC</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-2">System Optimization</h4>
                <p className="text-text-secondary text-sm">Performance tuning and reliability engineering</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}