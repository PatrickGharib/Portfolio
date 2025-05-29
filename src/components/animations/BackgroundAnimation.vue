<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Always use dark theme for animations
const theme = 'dark'
const canvas = ref(null)
const ctx = ref(null)
const particles = ref([])
const animationFrameId = ref(null)
const mousePosition = ref({ x: 0, y: 0 })
const isInitialized = ref(false)

// Configuration
const config = ref({
  particleCount: 120, // Optimized count for performance while maintaining visibility
  particleSize: { min: 3, max: 6 }, // Significantly increase particle size for better visibility
  particleSpeed: { min: 0.2, max: 0.6 }, // Slightly reduce max speed for more stability
  connectionDistance: 180, // Increase connection distance
  colors: {
    light: {
      particles: ['#4a6cf7', '#f86cf7', '#6c7bfa'],
      connections: 'rgba(74, 108, 247, 0.15)'
    },
    dark: {
      particles: ['#4a6cf7', '#f86cf7', '#6c7bfa'], // Exact theme colors from theme
      connections: 'rgba(74, 108, 247, 0.5)' // Primary color with transparency
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
    const colors = config.value.colors[theme]
    const color = colors.particles[Math.floor(Math.random() * colors.particles.length)]
    
    particles.value.push({
      x: Math.random() * canvas.value.width,
      y: Math.random() * canvas.value.height,
      radius: Math.random() * (config.value.particleSize.max - config.value.particleSize.min) + config.value.particleSize.min,
      color: color,
      speedX: (Math.random() - 0.5) * config.value.particleSpeed.max,
      speedY: (Math.random() - 0.5) * config.value.particleSpeed.max,
      opacity: Math.random() * 0.3 + 0.7 // Increase particle opacity
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
  
  const colors = config.value.colors[theme]
  
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
        ctx.value.lineWidth = 1.2; // Add line width for more visible connections
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
        ctx.value.lineWidth = 1.5; // Add thicker line width for mouse connections
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

// No need to watch for theme changes since we're using a constant theme

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
  z-index: 0; /* Change from -1 to 0 to ensure visibility */
  pointer-events: none;
  opacity: 0.8; /* Make particles more visible */
}
</style>
