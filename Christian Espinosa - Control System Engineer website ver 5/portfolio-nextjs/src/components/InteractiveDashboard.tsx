'use client'

import { useEffect, useRef, useState } from 'react'

export default function InteractiveDashboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pidCanvasRef = useRef<HTMLCanvasElement>(null)
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    // Initialize 3D model viewer and Canvas components
    const initDashboard = () => {
      try {
        // Load the 3D model script
        const script = document.createElement('script')
        script.src = '/js/3d-model.js'
        script.onload = () => {
          // Initialize 3D viewer if available
          if (typeof (window as any).initPIDControlScene === 'function') {
            const canvas = document.getElementById('pid-3d-canvas') as HTMLCanvasElement
            if (canvas) {
              (window as any).initPIDControlScene(canvas)
            }
          }
        }
        document.head.appendChild(script)

        // Initialize Canvas PID Controller
        initCanvasPIDController()
        
        setIsInitializing(false)
      } catch (error) {
        console.error('Dashboard initialization error:', error)
        setIsInitializing(false)
      }
    }

    const initCanvasPIDController = () => {
      const canvas = pidCanvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Canvas PID Controller Implementation
      class CanvasPIDController {
        private canvas: HTMLCanvasElement
        private ctx: CanvasRenderingContext2D
        private setpoint: number = 75
        private processValue: number = 0
        private kp: number = 0.1
        private ki: number = 0.05
        private kd: number = 0.02
        private integral: number = 0
        private previousError: number = 0
        private animationId: number | null = null

        constructor(canvas: HTMLCanvasElement) {
          this.canvas = canvas
          this.ctx = canvas.getContext('2d')!
          this.setupCanvas()
          this.startAnimation()
          this.setupControls()
        }

        private setupCanvas() {
          this.canvas.width = 600
          this.canvas.height = 400
          this.ctx.fillStyle = '#1A1A1A'
          this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        }

        private startAnimation() {
          const animate = () => {
            this.updatePID()
            this.draw()
            this.animationId = requestAnimationFrame(animate)
          }
          animate()
        }

        private updatePID() {
          const error = this.setpoint - this.processValue
          
          this.integral += error * 0.1
          const derivative = (error - this.previousError) / 0.1
          
          const output = this.kp * error + this.ki * this.integral + this.kd * derivative
          
          this.processValue += output * 0.05
          this.processValue = Math.max(0, Math.min(100, this.processValue))
          
          this.previousError = error
        }

        private draw() {
          // Clear canvas
          this.ctx.fillStyle = '#1A1A1A'
          this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
          
          // Draw grid
          this.ctx.strokeStyle = '#2A2A2A'
          this.ctx.lineWidth = 1
          for (let i = 0; i <= 10; i++) {
            const x = (this.canvas.width / 10) * i
            const y = (this.canvas.height / 10) * i
            this.ctx.beginPath()
            this.ctx.moveTo(x, 0)
            this.ctx.lineTo(x, this.canvas.height)
            this.ctx.moveTo(0, y)
            this.ctx.lineTo(this.canvas.width, y)
            this.ctx.stroke()
          }
          
          // Draw setpoint line
          this.ctx.strokeStyle = '#00BFFF'
          this.ctx.lineWidth = 2
          const setpointY = this.canvas.height - (this.setpoint / 100) * this.canvas.height
          this.ctx.beginPath()
          this.ctx.moveTo(0, setpointY)
          this.ctx.lineTo(this.canvas.width, setpointY)
          this.ctx.stroke()
          
          // Draw process value
          this.ctx.strokeStyle = '#00FF7F'
          this.ctx.lineWidth = 3
          const processY = this.canvas.height - (this.processValue / 100) * this.canvas.height
          this.ctx.fillStyle = '#00FF7F'
          this.ctx.beginPath()
          this.ctx.arc(this.canvas.width / 2, processY, 5, 0, 2 * Math.PI)
          this.ctx.fill()
          
          // Draw text
          this.ctx.fillStyle = '#E4E4E7'
          this.ctx.font = '14px Inter'
          this.ctx.fillText(`Setpoint: ${this.setpoint.toFixed(1)}%`, 10, 20)
          this.ctx.fillText(`Process Value: ${this.processValue.toFixed(1)}%`, 10, 40)
          this.ctx.fillText(`Error: ${(this.setpoint - this.processValue).toFixed(1)}%`, 10, 60)
          
          // Draw PID parameters
          this.ctx.fillText(`Kp: ${this.kp.toFixed(3)}`, 10, this.canvas.height - 60)
          this.ctx.fillText(`Ki: ${this.ki.toFixed(3)}`, 10, this.canvas.height - 40)
          this.ctx.fillText(`Kd: ${this.kd.toFixed(3)}`, 10, this.canvas.height - 20)
        }

        private setupControls() {
          // Set up event listeners for controls
          document.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement
            
            switch (target.id) {
              case 'pid-setpoint-slider':
                this.setpoint = parseFloat(target.value)
                break
              case 'pid-kp':
                this.kp = parseFloat(target.value)
                break
              case 'pid-ki':
                this.ki = parseFloat(target.value)
                break
              case 'pid-kd':
                this.kd = parseFloat(target.value)
                break
            }
          })
        }

        public destroy() {
          if (this.animationId) {
            cancelAnimationFrame(this.animationId)
          }
        }
      }

      // Initialize the PID controller
      new CanvasPIDController(canvas)
    }

    // Wait for Three.js to load
    const checkThreeJS = () => {
      if (typeof (window as any).THREE !== 'undefined') {
        initDashboard()
      } else {
        setTimeout(checkThreeJS, 100)
      }
    }
    
    checkThreeJS()

    return () => {
      // Cleanup
      if (typeof (window as any).destroyPIDControlScene === 'function') {
        (window as any).destroyPIDControlScene()
      }
    }
  }, [])

  return (
    <section id="interactive-dashboard" className="py-24 bg-background-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-6">
            Interactive Dashboard
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Real-time PID control simulation and analytics powered by Canvas and WebGL for optimal performance.
          </p>
        </div>

        {/* PID Control Canvas Dashboard */}
        <div className="mb-12">
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-2xl font-heading font-bold text-text-primary mb-6 text-center">
              PID Control Dashboard
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Process Variables */}
              <div className="space-y-6">
                <div className="bg-background-surface rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-4">Process Variables</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Setpoint:</span>
                      <span id="pid-setpoint" className="text-2xl font-bold text-cyan-400">75%</span>
                    </div>
                    <input 
                      type="range" 
                      id="pid-setpoint-slider" 
                      min="0" 
                      max="100" 
                      defaultValue="75" 
                      className="w-full accent-primary-500"
                    />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Process Value:</span>
                      <span id="pid-process-value" className="text-2xl font-bold text-green-400">0%</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Error:</span>
                      <span id="pid-error" className="text-2xl font-bold text-red-400">75%</span>
                    </div>
                  </div>
                </div>
                
                {/* PID Parameters */}
                <div className="bg-background-surface rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-4">PID Parameters</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-text-secondary text-sm">Proportional (Kp)</label>
                      <div className="flex justify-between items-center mb-2">
                        <span id="pid-kp-value" className="text-primary-400 font-mono">0.100</span>
                      </div>
                      <input 
                        type="range" 
                        id="pid-kp" 
                        min="0.01" 
                        max="1.0" 
                        step="0.01" 
                        defaultValue="0.1" 
                        className="w-full accent-primary-500"
                      />
                    </div>
                    <div>
                      <label className="text-text-secondary text-sm">Integral (Ki)</label>
                      <div className="flex justify-between items-center mb-2">
                        <span id="pid-ki-value" className="text-primary-400 font-mono">0.050</span>
                      </div>
                      <input 
                        type="range" 
                        id="pid-ki" 
                        min="0.01" 
                        max="0.5" 
                        step="0.01" 
                        defaultValue="0.05" 
                        className="w-full accent-primary-500"
                      />
                    </div>
                    <div>
                      <label className="text-text-secondary text-sm">Derivative (Kd)</label>
                      <div className="flex justify-between items-center mb-2">
                        <span id="pid-kd-value" className="text-primary-400 font-mono">0.020</span>
                      </div>
                      <input 
                        type="range" 
                        id="pid-kd" 
                        min="0.01" 
                        max="0.2" 
                        step="0.01" 
                        defaultValue="0.02" 
                        className="w-full accent-primary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Canvas Visualization */}
              <div className="space-y-6">
                <div className="bg-background-surface rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-4">Real-time Control Response</h4>
                  <div className="flex justify-center">
                    <canvas 
                      ref={pidCanvasRef}
                      id="pid-control-canvas"
                      className="border border-gray-600 rounded-lg bg-background-surface"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                </div>
                
                {/* Status Indicators */}
                <div className="bg-background-surface rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-4">System Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Controller Status:</span>
                      <span className="text-green-400 font-semibold">● Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Control Mode:</span>
                      <span className="text-cyan-400 font-semibold">Auto</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Loop Performance:</span>
                      <span className="text-green-400 font-semibold">Optimal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Model Viewer */}
        <div className="glass-card rounded-2xl p-8">
          <h3 className="text-2xl font-heading font-bold text-text-primary mb-6 text-center">
            3D Process Model Viewer
          </h3>
          <div className="flex justify-center">
            <canvas 
              id="pid-3d-canvas"
              width={800}
              height={400}
              className="border border-gray-600 rounded-lg bg-background-surface"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          <p className="text-center text-text-secondary mt-4">
            Interactive 3D model showing PID control system components and real-time parameter updates
          </p>
        </div>

        {isInitializing && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center px-4 py-2 bg-primary-500 bg-opacity-20 border border-primary-500 rounded-lg text-primary-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-400 mr-2"></div>
              Initializing Dashboard...
            </div>
          </div>
        )}
      </div>
    </section>
  )
}