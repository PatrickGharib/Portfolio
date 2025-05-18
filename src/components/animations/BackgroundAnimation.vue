<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { usePortfolioStore } from '../../store'
import { gsap } from 'gsap'

const store = usePortfolioStore()
const canvas = ref(null)
const ctx = ref(null)
const particles = ref([])
const animationFrameId = ref(null)
const mousePosition = ref({ x: 0, y: 0 })
const isInitialized = ref(false)

// Configuration
const config = ref({
  particleCount: 100,
  particleSize: { min: 1, max: 3 },
  particleSpeed: { min: 0.2, max: 0.8 },
  connectionDistance: 150,
  colors: {
    light: {
      particles: ['#4a6cf7', '#f86cf7', '#6c7bfa'],
      connections: 'rgba(108, 123, 250, 0.15)'
    },
    dark: {
      particles: ['#4a6cf7', '#f86cf7', '#6c7bfa'],
      connections: 'rgba(108, 123, 250, 0.25)'
    }
  }
})

// Initialize canvas and particles
const initialize = () => {
  if (!canvas.value) return
  
  ctx.value = canvas.value.getContext('2d')
  
  // Set canvas size
  resizeCanvas()
  
  // Create particles
  createParticles()
  
  // Start animation
  animate()
  
  // Add event listeners
  window.addEventListener('resize', resizeCanvas)
  window.addEventListener('mousemove', handleMouseMove)
  
  isInitialized.value = true
}

// Resize canvas to match window size
const resizeCanvas = () => {
  if (!canvas.value) return
  
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
  
  // Recreate particles when canvas is resized
  if (isInitialized.value) {
    createParticles()
  }
}

// Create particles
const createParticles = () => {
  if (!canvas.value) return
  
  particles.value = []
  
  for (let i = 0; i < config.value.particleCount; i++) {
    const colors = config.value.colors[store.theme]
    const color = colors.particles[Math.floor(Math.random() * colors.particles.length)]
    
    particles.value.push({
      x: Math.random() * canvas.value.width,
      y: Math.random() * canvas.value.height,
      radius: Math.random() * (config.value.particleSize.max - config.value.particleSize.min) + config.value.particleSize.min,
      color: color,
      speedX: (Math.random() - 0.5) * config.value.particleSpeed.max,
      speedY: (Math.random() - 0.5) * config.value.particleSpeed.max,
      opacity: Math.random() * 0.5 + 0.5
    })
  }
}

// Animation loop
const animate = () => {
  if (!ctx.value || !canvas.value) return
  
  // Clear canvas
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
  
  // Update and draw particles
  updateParticles()
  
  // Request next frame
  animationFrameId.value = requestAnimationFrame(animate)
}

// Update particle positions and draw them
const updateParticles = () => {
  if (!ctx.value || !canvas.value) return
  
  const colors = config.value.colors[store.theme]
  
  for (let i = 0; i < particles.value.length; i++) {
    const particle = particles.value[i]
    
    // Update position
    particle.x += particle.speedX
    particle.y += particle.speedY
    
    // Bounce off edges
    if (particle.x < 0 || particle.x > canvas.value.width) {
      particle.speedX = -particle.speedX
    }
    
    if (particle.y < 0 || particle.y > canvas.value.height) {
      particle.speedY = -particle.speedY
    }
    
    // Draw particle
    ctx.value.beginPath()
    ctx.value.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
    ctx.value.fillStyle = particle.color
    ctx.value.globalAlpha = particle.opacity
    ctx.value.fill()
    ctx.value.globalAlpha = 1
    
    // Draw connections
    for (let j = i + 1; j < particles.value.length; j++) {
      const particle2 = particles.value[j]
      const dx = particle.x - particle2.x
      const dy = particle.y - particle2.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < config.value.connectionDistance) {
        ctx.value.beginPath()
        ctx.value.moveTo(particle.x, particle.y)
        ctx.value.lineTo(particle2.x, particle2.y)
        ctx.value.strokeStyle = colors.connections
        ctx.value.globalAlpha = 1 - (distance / config.value.connectionDistance)
        ctx.value.stroke()
        ctx.value.globalAlpha = 1
      }
    }
    
    // Connect to mouse if nearby
    if (mousePosition.value.x && mousePosition.value.y) {
      const dx = particle.x - mousePosition.value.x
      const dy = particle.y - mousePosition.value.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < config.value.connectionDistance * 1.5) {
        // Add slight attraction to mouse
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance
        const force = (config.value.connectionDistance - distance) / config.value.connectionDistance
        const directionX = forceDirectionX * force * 0.05
        const directionY = forceDirectionY * force * 0.05
        
        particle.speedX -= directionX
        particle.speedY -= directionY
        
        // Draw connection to mouse
        ctx.value.beginPath()
        ctx.value.moveTo(particle.x, particle.y)
        ctx.value.lineTo(mousePosition.value.x, mousePosition.value.y)
        ctx.value.strokeStyle = colors.connections
        ctx.value.globalAlpha = 1 - (distance / (config.value.connectionDistance * 1.5))
        ctx.value.stroke()
        ctx.value.globalAlpha = 1
      }
    }
  }
}

// Handle mouse movement
const handleMouseMove = (e) => {
  mousePosition.value = {
    x: e.clientX,
    y: e.clientY
  }
}

// Watch for theme changes
watch(() => store.theme, () => {
  // Update particles with new theme colors
  particles.value.forEach(particle => {
    const colors = config.value.colors[store.theme]
    particle.color = colors.particles[Math.floor(Math.random() * colors.particles.length)]
  })
})

// Lifecycle hooks
onMounted(() => {
  initialize()
})

onUnmounted(() => {
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value)
  }
  
  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <canvas ref="canvas" class="background-animation"></canvas>
</template>

<style scoped>
.background-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
</style>
