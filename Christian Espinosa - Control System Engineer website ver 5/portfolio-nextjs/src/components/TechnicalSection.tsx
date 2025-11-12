'use client'

import { useState, Suspense, lazy } from 'react'

// Dynamic import for lazy-loaded code examples
const LazyCodeExample = lazy(() => import('./LazyCodeExample'))

interface CodeExample {
  id: string
  title: string
  language: string
  code: string
  description: string
}

const codeExamples: CodeExample[] = [
  {
    id: 'pid',
    title: 'PID Controller Algorithm',
    language: 'python',
    code: `class PIDController:
    def __init__(self, kp, ki, kd):
        self.kp = kp
        self.ki = ki  
        self.kd = kd
        self.previous_error = 0
        self.integral = 0
    
    def update(self, setpoint, measured_value, dt):
        error = setpoint - measured_value
        self.integral += error * dt
        derivative = (error - self.previous_error) / dt
        
        output = (self.kp * error + 
                 self.ki * self.integral + 
                 self.kd * derivative)
        
        self.previous_error = error
        return max(0, min(output, 100))`,
    description: 'PID controller implementation for process control applications'
  },
  {
    id: 'modbus',
    title: 'Modbus RTU Communication',
    language: 'javascript',
    code: `// Modbus RTU Master Implementation
class ModbusRTU {
    constructor(port, baudRate) {
        this.port = port;
        this.baudRate = baudRate;
        this.connections = new Map();
    }
    
    async readHoldingRegisters(
        deviceId, 
        registerAddress, 
        registerCount
    ) {
        const request = this.buildRequest(
            deviceId, 
            0x03, 
            registerAddress, 
            registerCount
        );
        
        const response = await this.sendRequest(request);
        return this.parseResponse(response);
    }
    
    buildRequest(deviceId, functionCode, 
                 address, count) {
        return Buffer.from([
            deviceId, 
            functionCode,
            (address >> 8) & 0xFF,
            address & 0xFF,
            (count >> 8) & 0xFF,
            count & 0xFF
        ]);
    }
}`,
    description: 'JavaScript implementation for Modbus RTU communication protocol'
  },
  {
    id: 'scada',
    title: 'Wonderware InTouch Script',
    language: 'javascript',
    code: `// InTouch Window Script for Alarm Management
function OnValueChange() {
    var currentValue = GetTagValue("Process_Pressure");
    var setpoint = GetTagValue("Pressure_Setpoint");
    var alarmLimit = GetTagValue("Pressure_Alarm_Limit");
    
    // Calculate deviation
    var deviation = Math.abs(currentValue - setpoint);
    
    // Generate alarm conditions
    if (currentValue > alarmLimit) {
        SetTagValue("Alarm_HighPressure", 1);
        TriggerAlarm("HIGH_PRESSURE", 
                    currentValue, 
                    "Process pressure exceeded limit");
    }
    
    // Predictive maintenance logic
    if (deviation > setpoint * 0.1) {
        SetTagValue("Maintenance_Required", 1);
        ScheduleMaintenanceCheck();
    }
}`,
    description: 'Wonderware InTouch scripting for alarm management and predictive maintenance'
  }
]

const CodeExample: React.FC<{ example: CodeExample }> = ({ example }) => {
  const [activeTab, setActiveTab] = useState('code')
  const codeTabId = `code-${example.id}`
  const detailsTabId = `details-${example.id}`

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  const handleKeyDown = (event: React.KeyboardEvent, tabId: string) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault()
      const currentIndex = tabId === 'code' ? 0 : 1
      const nextIndex = event.key === 'ArrowRight' ? (currentIndex + 1) % 2 : (currentIndex - 1 + 2) % 2
      const nextTabId = nextIndex === 0 ? 'code' : 'details'
      setActiveTab(nextTabId)
      
      // Focus the new tab
      const nextTabButton = document.getElementById(nextTabId === 'code' ? codeTabId : detailsTabId)
      nextTabButton?.focus()
    }
  }

  return (
    <div className="glass-card rounded-2xl p-8 hover-glow transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-xl font-heading font-bold text-text-primary mb-2">
          {example.title}
        </h3>
        <p className="text-text-secondary text-sm">{example.description}</p>
      </div>
      
      <div className="mb-4">
        <div 
          className="flex space-x-4 mb-4" 
          role="tablist" 
          aria-label={`${example.title} content tabs`}
        >
          <button
            id={codeTabId}
            role="tab"
            aria-selected={activeTab === 'code'}
            aria-controls={`${codeTabId}-panel`}
            tabIndex={activeTab === 'code' ? 0 : -1}
            onClick={() => handleTabChange('code')}
            onKeyDown={(e) => handleKeyDown(e, 'code')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-background-primary ${
              activeTab === 'code'
                ? 'bg-primary-500 text-white'
                : 'text-text-secondary hover:text-primary-500'
            }`}
          >
            Code
          </button>
          <button
            id={detailsTabId}
            role="tab"
            aria-selected={activeTab === 'details'}
            aria-controls={`${detailsTabId}-panel`}
            tabIndex={activeTab === 'details' ? 0 : -1}
            onClick={() => handleTabChange('details')}
            onKeyDown={(e) => handleKeyDown(e, 'details')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-background-primary ${
              activeTab === 'details'
                ? 'bg-primary-500 text-white'
                : 'text-text-secondary hover:text-primary-500'
            }`}
          >
            Details
          </button>
        </div>
        
        {activeTab === 'code' && (
          <div
            role="tabpanel"
            id={`${codeTabId}-panel`}
            aria-labelledby={codeTabId}
            className="relative"
          >
            <Suspense 
              fallback={
                <div className="bg-background-surface rounded-lg p-4 animate-pulse">
                  <div className="h-40 bg-background-border rounded"></div>
                </div>
              }
            >
              <LazyCodeExample example={example} />
            </Suspense>
          </div>
        )}
        
        {activeTab === 'details' && (
          <div
            role="tabpanel"
            id={`${detailsTabId}-panel`}
            aria-labelledby={detailsTabId}
            className="p-4 bg-background-surface rounded-lg border border-background-border"
          >
            <h4 className="text-text-primary font-semibold mb-2">Technical Details</h4>
            <ul className="text-text-secondary text-sm space-y-1">
              <li>• Language: {example.language.toUpperCase()}</li>
              <li>• Industry: Process Automation</li>
              <li>• Application: Control Systems Integration</li>
              <li>• Standards: IEC 61131, Modbus RTU/TCP</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default function TechnicalSection() {
  return (
    <Suspense 
      fallback={
        <section className="py-24 bg-background-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <div className="h-16 bg-background-border rounded-lg mx-auto mb-6 animate-pulse"></div>
              <div className="h-8 bg-background-border rounded mx-auto mb-16 w-96"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-64 bg-background-border rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </section>
      }
    >
      <section id="technical" className="py-24 scroll-reveal" aria-labelledby="technical-title">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="technical-title" className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-6">
              Technical Examples
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Code samples and technical implementations demonstrating expertise in automation engineering.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {codeExamples.map((example) => (
              <CodeExample key={example.id} example={example} />
            ))}
          </div>
        </div>
      </section>
    </Suspense>
  )
}