'use client'

import { useState, useEffect, useRef } from 'react'

export default function InteractiveDashboard() {
  // 1. Controls State
  const [setpoint, setSetpoint] = useState(75)
  const [kp, setKp] = useState(0.1)
  const [ki, setKi] = useState(0.05)
  const [kd, setKd] = useState(0.02)

  // 2. Physics & History State (Refs persist without re-rendering)
  const stateRef = useRef({
    value: 0,
    velocity: 0,
    integral: 0,
    lastError: 0,
    lastTime: Date.now(),
    // Store history here so it doesn't wipe on re-render
    history: new Array(300).fill(0)
  })

  // 3. Refs to pass current control values into the animation loop without restarting it
  const controlsRef = useRef({ setpoint, kp, ki, kd })
  
  // Update controls ref whenever state changes
  useEffect(() => {
    controlsRef.current = { setpoint, kp, ki, kd }
  }, [setpoint, kp, ki, kd])

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 4. The Physics Loop (60 FPS - Never Restarts)
  useEffect(() => {
    let animationId: number
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    const updatePhysics = () => {
      if (!ctx || !canvas) return

      const now = Date.now()
      const dt = Math.min((now - stateRef.current.lastTime) / 1000, 0.1)
      stateRef.current.lastTime = now

      // Get latest controls from Ref (No dependency restart)
      const { setpoint: sp, kp: p, ki: i, kd: d } = controlsRef.current

      // --- PID Calculation ---
      const pv = stateRef.current.value
      const error = sp - pv
      
      stateRef.current.integral += error * dt
      const derivative = (error - stateRef.current.lastError) / dt
      stateRef.current.lastError = error

      const output = (p * error) + (i * stateRef.current.integral) + (d * derivative)
      // -----------------------

      // Physics Simulation
      stateRef.current.velocity += (output - pv * 0.1) * dt
      stateRef.current.value += stateRef.current.velocity * dt

      // Limits
      if (stateRef.current.value < 0) stateRef.current.value = 0
      if (stateRef.current.value > 100) stateRef.current.value = 100

      // Update History
      stateRef.current.history.push(stateRef.current.value)
      if (stateRef.current.history.length > canvas.width) stateRef.current.history.shift()

      // Draw
      drawGraph(ctx, canvas.width, canvas.height, stateRef.current.history, sp)
      
      animationId = requestAnimationFrame(updatePhysics)
    }

    animationId = requestAnimationFrame(updatePhysics)
    return () => cancelAnimationFrame(animationId)
  }, []) // Empty dependency array = Loop runs forever, never wipes

  // 5. Drawing Logic
  const drawGraph = (ctx: CanvasRenderingContext2D, w: number, h: number, data: number[], sp: number) => {
    ctx.fillStyle = '#1A1A1A'
    ctx.fillRect(0, 0, w, h)

    // Grid
    ctx.strokeStyle = '#333'
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let i = 0; i < w; i += 50) { ctx.moveTo(i, 0); ctx.lineTo(i, h) }
    for (let i = 0; i < h; i += 50) { ctx.moveTo(0, i); ctx.lineTo(w, i) }
    ctx.stroke()

    // Setpoint Line
    const spY = h - (sp / 100 * h)
    ctx.strokeStyle = '#00BFFF'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(0, spY)
    ctx.lineTo(w, spY)
    ctx.stroke()
    ctx.setLineDash([])

    // Process Value Line
    ctx.strokeStyle = '#00FF7F'
    ctx.lineWidth = 3
    ctx.beginPath()
    data.forEach((val, i) => {
      const y = h - (val / 100 * h)
      if (i === 0) ctx.moveTo(i, y)
      else ctx.lineTo(i, y)
    })
    ctx.stroke()
  }

  return (
    <section id="interactive-dashboard" className="py-24 bg-background-surface">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-6">
            Interactive Dashboard
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Real-time PID control simulation powered by React & Canvas.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-heading font-bold text-text-primary mb-6 text-center">
            PID Control Dashboard
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* CONTROLS */}
            <div className="space-y-6">
              <div className="bg-black/20 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-text-secondary">Setpoint</span>
                  <span className="text-2xl font-bold text-cyan-400">{setpoint}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" 
                  value={setpoint} 
                  onChange={(e) => setSetpoint(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between items-center mt-4">
                  <span className="text-text-secondary">Process Value</span>
                  <span className="text-2xl font-bold text-green-400">
                    {stateRef.current.value.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="bg-black/20 rounded-lg p-6 space-y-4">
                <h4 className="text-lg font-semibold text-text-primary mb-4">Parameters</h4>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-text-secondary">Proportional (Kp)</span>
                    <span className="font-mono text-primary-400">{kp.toFixed(2)}</span>
                  </div>
                  <input type="range" min="0" max="1" step="0.01" value={kp} onChange={(e) => setKp(Number(e.target.value))} className="w-full accent-primary-500 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"/>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-text-secondary">Integral (Ki)</span>
                    <span className="font-mono text-purple-400">{ki.toFixed(3)}</span>
                  </div>
                  <input type="range" min="0" max="0.1" step="0.001" value={ki} onChange={(e) => setKi(Number(e.target.value))} className="w-full accent-purple-500 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"/>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-text-secondary">Derivative (Kd)</span>
                    <span className="font-mono text-green-400">{kd.toFixed(3)}</span>
                  </div>
                  <input type="range" min="0" max="0.5" step="0.001" value={kd} onChange={(e) => setKd(Number(e.target.value))} className="w-full accent-green-500 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"/>
                </div>
              </div>
            </div>

            {/* GRAPH */}
            <div className="bg-black/40 rounded-lg p-2 border border-white/5">
              <canvas 
                ref={canvasRef}
                width={600}
                height={400}
                className="w-full h-full rounded-md"
              />
            </div>
          </div>
        </div>

        {/* 3D Model Viewer Placeholder (Restored Layout) */}
        <div className="glass-card rounded-2xl p-8">
          <h3 className="text-2xl font-heading font-bold text-text-primary mb-6 text-center">
            3D Process Model Viewer
          </h3>
          <div className="flex justify-center bg-black/20 rounded-lg h-[400px] items-center border border-gray-700">
             <p className="text-text-secondary">3D Model Module</p>
          </div>
        </div>

      </div>
    </section>
  )
}
