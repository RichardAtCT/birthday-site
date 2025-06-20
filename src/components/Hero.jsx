import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const Hero = () => {
  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      
      // Enhanced sophisticated confetti sequence
      const triggerConfetti = () => {
        const count = 400
        const defaults = {
          origin: { y: 0.7 },
          colors: ['#10B981', '#EC4899', '#FCD34D', '#D4AF37', '#38BDF8', '#EF4444', '#8B5CF6'],
          shapes: ['circle', 'square'],
          scalar: 1.2
        }

        function fire(particleRatio, opts) {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
          })
        }

        // Central burst with stars
        fire(0.3, {
          spread: 30,
          startVelocity: 60,
          shapes: ['star'],
          scalar: 1.5
        })
        
        // Wide spread burst
        fire(0.25, {
          spread: 70,
          startVelocity: 45,
          decay: 0.92
        })
        
        // Large scattered burst
        fire(0.4, {
          spread: 120,
          decay: 0.91,
          scalar: 0.9,
          gravity: 0.8
        })
        
        // Sequential side bursts with variety
        setTimeout(() => {
          // Left side - hearts
          fire(0.15, {
            spread: 100,
            startVelocity: 30,
            decay: 0.93,
            scalar: 1.3,
            origin: { x: 0.05, y: 0.6 },
            shapes: ['circle']
          })
          
          // Right side - squares
          fire(0.15, {
            spread: 100,
            startVelocity: 30,
            decay: 0.93,
            scalar: 1.3,
            origin: { x: 0.95, y: 0.6 },
            shapes: ['square']
          })
        }, 300)
        
        // Final top-down shower
        setTimeout(() => {
          fire(0.2, {
            spread: 80,
            startVelocity: 35,
            decay: 0.94,
            scalar: 0.8,
            origin: { x: 0.5, y: 0.1 },
            gravity: 1.2
          })
        }, 600)
      }

      // Slight delay for dramatic effect
      setTimeout(triggerConfetti, 800)
    }
  }, [])

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <section className="relative h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 texture-celebration">
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/80 via-transparent to-secondary-500/20"></div>
        
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-8">
          <motion.div 
            className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-60 h-60 bg-white/5 rounded-full"
            animate={{ rotate: -360, scale: [1, 0.9, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/3 w-32 h-32 bg-white/8 transform rotate-12"
            animate={{ rotate: [12, 48, 12] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Additional floating shapes */}
          <motion.div 
            className="absolute top-1/4 right-1/4 w-24 h-24 bg-accent-300/10 rounded-full"
            animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Enhanced floating balloons */}
      <motion.div
        className="absolute left-4 md:left-10 top-16 md:top-20 text-6xl md:text-8xl drop-shadow-lg"
        animate={{
          y: [-20, 20, -20],
          rotate: [-5, 5, -5],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🎈
      </motion.div>
      
      <motion.div
        className="absolute right-4 md:right-10 top-24 md:top-32 text-5xl md:text-7xl drop-shadow-lg"
        animate={{
          y: [20, -20, 20],
          rotate: [5, -5, 5],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🎈
      </motion.div>

      <motion.div
        className="absolute left-8 md:left-20 bottom-32 md:bottom-40 text-4xl md:text-6xl drop-shadow-lg"
        animate={{
          y: [-15, 15, -15],
          rotate: [-3, 3, -3],
          scale: [1, 1.08, 1]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🎈
      </motion.div>

      {/* Additional decorative balloons for larger screens */}
      <motion.div
        className="hidden lg:block absolute right-1/4 bottom-1/4 text-5xl drop-shadow-lg"
        animate={{
          y: [-10, 25, -10],
          rotate: [2, -4, 2],
          scale: [1, 1.06, 1]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🎈
      </motion.div>

      {/* Main content with enhanced typography */}
      <div className="flex-1 flex items-center justify-center relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "backOut" }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-comfortaa font-bold text-white mb-8 leading-none"
            style={{
              textShadow: '0 4px 20px rgba(0,0,0,0.4), 0 8px 40px rgba(0,0,0,0.2), 0 16px 80px rgba(0,0,0,0.1)',
              filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.15))',
              letterSpacing: '-0.02em'
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Happy 35th Birthday!
          </motion.h1>
          
          <motion.p 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-pacifico text-white/95 mb-16 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            style={{
              textShadow: '0 2px 10px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.2)',
              letterSpacing: '0.05em'
            }}
          >
            Wishing you a day filled with joy and surprises ✨
          </motion.p>
          
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 1.4, 
              type: "spring", 
              stiffness: 200,
              damping: 15
            }}
            className="inline-flex gap-4 md:gap-6 text-4xl md:text-5xl"
          >
            {['🎂', '🎉', '🎁', '✨'].map((emoji, index) => (
              <motion.span
                key={emoji}
                className="drop-shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                  y: [0, -10, 0],
                  rotateZ: [-5, 5, -5],
                }}
                transition={{
                  scale: { delay: 1.6 + index * 0.1, duration: 0.5 },
                  rotate: { delay: 1.6 + index * 0.1, duration: 0.5 },
                  y: { 
                    delay: 2 + index * 0.2,
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  rotateZ: {
                    delay: 2.2 + index * 0.3,
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{ 
                  scale: 1.3,
                  rotate: 15,
                  transition: { duration: 0.2 }
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator with glass-morphism */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer group z-20 magnetic ripple"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll down to see birthday wishes and surprises"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            scrollToNext()
          }
        }}
      >
        <motion.div 
          className="flex flex-col items-center"
          animate={{
            y: [0, 8, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-sm font-comfortaa font-medium mb-3 tracking-wide opacity-90 drop-shadow-lg">
            Scroll for surprises
          </span>
          <motion.div
            className="glass-strong rounded-full p-3 shadow-magical group-hover:shadow-glow transition-all duration-300"
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} className="group-hover:text-accent-300 transition-colors drop-shadow-sm" />
          </motion.div>
        </motion.div>
      </motion.button>
    </section>
  )
}

export default Hero