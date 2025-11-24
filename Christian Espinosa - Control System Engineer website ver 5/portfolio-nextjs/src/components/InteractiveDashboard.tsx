'use client'

import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function InteractiveDashboard() {
  // ==========================================
  // 1. PID CONTROLLER LOGIC
  // ==========================================
  const [setpoint, setSetpoint] = useState(75)
  const [kp, setKp] = useState(0.1)
  const [ki, setKi] = useState(0.05)
  const [kd, setKd] = useState(0.02)

  const processRef = useRef({
    value: 0,
    velocity: 0,
    integral: 0,
    lastError: 0,
    lastTime: Date.now(),
    history: new Array(300).fill(0)
  })

  const controlsRef = useRef({ setpoint, kp, ki, kd })
  
  useEffect(() => {
    controlsRef.current = { setpoint, kp, ki, kd }
  }, [setpoint, kp, ki, kd])

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // PID Animation Loop
  useEffect(() => {
    let animationId: number
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    const updatePhysics = () => {
      if (!ctx || !canvas) return

      const now = Date.now()
      const dt = Math.min((now - processRef.current.lastTime) / 1000, 0.1)
      processRef.current.lastTime = now

      const { setpoint: sp, kp: p, ki: i, kd: d } = controlsRef.current
      const pv = processRef.current.value
      const error = sp - pv
      
      processRef.current.integral += error * dt
      const derivative = (error - processRef.current.lastError) / dt
      processRef.current.lastError = error

      const output = (p * error) + (i * processRef.current.integral) + (d * derivative)

      processRef.current.velocity += (output - pv * 0.1) * dt
      processRef.current.value += processRef.current.velocity * dt

      if (processRef.current.value < 0) processRef.current.value = 0
      if (processRef.current.value > 100) processRef.current.value = 100

      processRef.current.history.push(processRef.current.value)
      if (processRef.current.history.length > canvas.width) processRef.current.history.shift()

      drawGraph(ctx, canvas.width, canvas.height, processRef.current.history, sp)
      animationId = requestAnimationFrame(updatePhysics)
    }

    animationId = requestAnimationFrame(updatePhysics)
    return () => cancelAnimationFrame(animationId)
  }, [])

  const drawGraph = (ctx: CanvasRenderingContext2D, w: number, h: number, data: number[], sp: number) => {
    ctx.fillStyle = '#1A1A1A'
    ctx.fillRect(0, 0, w, h)
    
    // Grid
    ctx.strokeStyle = '#333'; ctx.lineWidth = 1; ctx.beginPath()
    for (let i = 0; i < w; i += 50) { ctx.moveTo(i, 0); ctx.lineTo(i, h) }
    for (let i = 0; i < h; i += 50) { ctx.moveTo(0, i); ctx.lineTo(w, i) }
    ctx.stroke()

    // Setpoint & Process Lines
    const spY = h - (sp / 100 * h)
    ctx.strokeStyle = '#00BFFF'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]); ctx.beginPath()
    ctx.moveTo(0, spY); ctx.lineTo(w, spY); ctx.stroke(); ctx.setLineDash([])

    ctx.strokeStyle = '#00FF7F'; ctx.lineWidth = 3; ctx.beginPath()
    data.forEach((val, i) => {
      const y = h - (val / 100 * h)
      if (i === 0) ctx.moveTo(i, y); else ctx.lineTo(i, y)
    })
    ctx.stroke()
  }

  // ==========================================
  // 2. 3D MODEL LOGIC (Integrated)
  // ==========================================
  const threeContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!threeContainerRef.current) return

    const width = threeContainerRef.current.clientWidth
    const height = threeContainerRef.current.clientHeight
    
    // Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    
    renderer.setSize(width, height)
    threeContainerRef.current.appendChild(renderer.domElement)
    
    camera.position.set(8, 6, 8)
    camera.lookAt(0, 0, 0)

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
    dirLight.position.set(10, 10, 5)
    scene.add(dirLight)

    // Objects (Pump, Valve, Sensor)
    const group = new THREE.Group()

    // Pump
    const pump = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1.5, 3, 16),
      new THREE.MeshPhongMaterial({ color: 0x007BFF, transparent: true, opacity: 0.9 })
    )
    pump.position.set(-3, 1.5, 0)
    group.add(pump)

    // Valve
    const valve = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1, 2),
      new THREE.MeshPhongMaterial({ color: 0x6F42C1, transparent: true, opacity: 0.9 })
    )
    valve.position.set(0, 0.5, 0)
    group.add(valve)

    // Wheel
    const wheel = new THREE.Mesh(
      new THREE.TorusGeometry(0.8, 0.2, 8, 16),
      new THREE.MeshPhongMaterial({ color: 0x28A745 })
    )
    wheel.rotation.x = Math.PI / 2
    wheel.position.set(0, 2, 0)
    group.add(wheel)

    // Sensor
    const sensor = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 2, 16),
      new THREE.MeshPhongMaterial({ color: 0x17A2B8, transparent: true, opacity: 0.9 })
    )
    sensor.position.set(3, 1, 0)
    group.add(sensor)

    scene.add(group)

    // Animation Loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      group.rotation.y += 0.005 // Rotate model slowly
      renderer.render(scene, camera)
    }
    animate()

    // Resize Handler
    const handleResize = () => {
      if (!threeContainerRef.current) return
      const newW = threeContainerRef.current.clientWidth
      const newH = threeContainerRef.current.clientHeight
      camera.aspect = newW / newH
      camera.updateProjectionMatrix()
      renderer.setSize(newW, newH)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      if (threeContainerRef.current) {
        threeContainerRef.current.innerHTML = '' // Clear canvas
      }
      renderer.dispose()
    }
  }, [])

  // ==========================================
  // 3. UI RENDER
  // ==========================================
  return (
    <section id="interactive-dashboard" className="py-24 bg-background-surface">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-6">
            Interactive Dashboard
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Real-time PID control simulation & 3D Process Visualization.
          </p>
        </div>

        {/* PID Section */}
        <div className="glass-card rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-heading font-bold text-text-primary mb-6 text-center">
            PID Control Dashboard
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="space-y-6">
              <div className="bg-black/20 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-text-secondary">Setpoint</span>
                  <span className="text-2xl font-bold text-cyan-400">{setpoint}%</span>
                </div>
                <input type="range" min="0" max="100" value={setpoint} onChange={(e) => setSetpoint(Number(e.target.value))} className="w-full accent-cyan-400 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                <div className="flex justify-between items-center mt-4">
                  <span className="text-text-secondary">Process Value</span>
                  <span className="text-2xl font-bold text-green-400">{processRef.current.value.toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="bg-black/20 rounded-lg p-6 space-y-4">
                <h4 className="text-lg font-semibold text-text-primary mb-4">Parameters</h4>
                <div><span className="text-sm text-text-secondary">Proportional (Kp): {kp.toFixed(2)}</span><input type="range" min="0" max="1" step="0.01" value={kp} onChange={(e) => setKp(Number(e.target.value))} className="w-full accent-primary-500 h-1 bg-gray-700 rounded-lg cursor-pointer"/></div>
                <div><span className="text-sm text-text-secondary">Integral (Ki): {ki.toFixed(3)}</span><input type="range" min="0" max="0.1" step="0.001" value={ki} onChange={(e) => setKi(Number(e.target.value))} className="w-full accent-purple-500 h-1 bg-gray-700 rounded-lg cursor-pointer"/></div>
                <div><span className="text-sm text-text-secondary">Derivative (Kd): {kd.toFixed(3)}</span><input type="range" min="0" max="0.5" step="0.001" value={kd} onChange={(e) => setKd(Number(e.target.value))} className="w-full accent-green-500 h-1 bg-gray-700 rounded-lg cursor-pointer"/></div>
              </div>
            </div>
            
            {/* Graph */}
            <div className="bg-black/40 rounded-lg p-2 border border-white/5">
              <canvas ref={canvasRef} width={600} height={400} className="w-full h-full rounded-md" />
            </div>
          </div>
        </div>

        {/* 3D Model Viewer Section */}
        <div className="glass-card rounded-2xl p-8">
          <h3 className="text-2xl font-heading font-bold text-text-primary mb-6 text-center">
            3D Process Model Viewer
          </h3>
          {/* This DIV is where the 3D model is injected */}
          <div ref={threeContainerRef} className="flex justify-center bg-black/20 rounded-lg h-[400px] items-center border border-gray-700 overflow-hidden w-full">
             {/* Canvas created by Three.js will go here automatically */}
          </div>
        </div>

      </div>
    </section>
  )
}
