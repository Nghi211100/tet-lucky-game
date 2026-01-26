'use client'
import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  life: number
  color: string
  size: number
}

export default function Fireworks({ show, fadeOut }: { show: boolean, fadeOut: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const animationId = useRef<number>(0)

  useEffect(() => {
    if (!show) return

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const randomColor = () =>
      `hsl(${Math.random() * 360}, 100%, 60%)`

    const createExplosion = (x: number, y: number) => {
      const count = 150 + Math.random() * 100

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 6 + 2

        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          life: 80 + Math.random() * 40,
          color: randomColor(),
          size: Math.random() * 2 + 1,
        })
      }
    }

    const launchFireworks = () => {
      const x = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1
      const y = Math.random() * window.innerHeight * 0.4 + 50
      createExplosion(x, y)
    }

    const animate = () => {
        // Clear with transparency instead of black
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      
        // Optional: soft trail effect
        ctx.fillStyle = 'rgba(0,0,0,0.05)'
        ctx.globalCompositeOperation = 'destination-out'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.globalCompositeOperation = 'source-over'
      
        particles.current.forEach((p, i) => {
          p.vy += 0.05
          p.x += p.vx
          p.y += p.vy
          p.life--
          p.alpha -= 0.012
      
          ctx.beginPath()
          ctx.globalAlpha = Math.max(p.alpha, 0)
          ctx.fillStyle = p.color
          ctx.shadowColor = p.color
          ctx.shadowBlur = 12
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
      
          if (p.life <= 0 || p.alpha <= 0) {
            particles.current.splice(i, 1)
          }
        })
      
        ctx.globalAlpha = 1
        ctx.shadowBlur = 0
      
        animationId.current = requestAnimationFrame(animate)
      }      

    // Launch sequence
    for (let i = 0; i < 10; i++) {
      setTimeout(launchFireworks, i * 300)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId.current!)
      particles.current = []
      window.removeEventListener('resize', resize)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [show])

  return (
    <canvas
    ref={canvasRef}
    className={`
      fixed inset-0 z-999 pointer-events-none
      transition-opacity duration-700 ease-out
      ${fadeOut ? 'opacity-0' : 'opacity-100'}
    `}
  />
  )
}
