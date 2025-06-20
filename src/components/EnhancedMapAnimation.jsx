import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import confetti from 'canvas-confetti'

const EnhancedMapAnimation = ({ onComplete }) => {
  const controls = useAnimation()
  const carControls = useAnimation()
  const [showInfo, setShowInfo] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const animateMap = async () => {
      // Map entrance
      await controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 1, ease: 'easeOut' }
      })

      // Show pins
      await controls.start({
        pinScale: 1,
        transition: { duration: 0.5, staggerChildren: 0.2 }
      })

      // Animate journey
      for (let i = 0; i <= 100; i += 2) {
        setProgress(i / 100)
        await new Promise(resolve => setTimeout(resolve, 80))
      }

      // Zoom to destination
      await controls.start({
        scale: 2.5,
        x: -200,
        y: -100,
        transition: { duration: 2, ease: 'easeInOut' }
      })

      setShowInfo(true)
      
      // Trigger celebration
      setTimeout(() => {
        triggerCelebration()
        setTimeout(onComplete, 2000)
      }, 1000)
    }

    animateMap()
  }, [controls, onComplete])

  const triggerCelebration = () => {
    const colors = ['#10B981', '#EC4899', '#FCD34D', '#D4AF37']
    
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { x: 0.5, y: 0.6 },
          colors,
          shapes: ['circle', 'square'],
          scalar: 1.2
        })
      }, i * 200)
    }
  }

  // Enhanced path for the journey
  const journeyPath = "M 150,380 Q 200,370 250,360 C 300,350 350,340 400,330 Q 450,320 500,310 C 550,300 600,290 650,280"
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={controls}
      className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-magical bg-gradient-to-br from-sand-100 to-cream"
    >
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <defs>
          {/* Gradient definitions */}
          <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5E6D3" />
            <stop offset="100%" stopColor="#E6D2B5" />
          </linearGradient>
          
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.4" />
          </linearGradient>

          {/* Shadow filter */}
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="4" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background pattern */}
        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#00000010" />
        </pattern>
        <rect width="800" height="500" fill="url(#dots)" />

        {/* Enhanced UAE coastline */}
        <motion.path
          d="M 50,250 Q 100,240 150,250 C 200,260 250,255 300,250 Q 400,240 500,250 C 600,260 700,255 750,250 L 750,450 L 50,450 Z"
          fill="url(#landGradient)"
          stroke="#D4AF37"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Water areas with waves */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <path
            d="M 600,150 Q 650,160 700,150 Q 750,160 800,150 L 800,300 Q 750,310 700,300 Q 650,310 600,300 Z"
            fill="url(#waterGradient)"
          />
          
          {/* Animated waves */}
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M 600,${200 + i * 20} Q 650,${195 + i * 20} 700,${200 + i * 20} T 800,${200 + i * 20}`}
              stroke="#0EA5E9"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
              animate={{
                d: [
                  `M 600,${200 + i * 20} Q 650,${195 + i * 20} 700,${200 + i * 20} T 800,${200 + i * 20}`,
                  `M 600,${200 + i * 20} Q 650,${205 + i * 20} 700,${200 + i * 20} T 800,${200 + i * 20}`,
                  `M 600,${200 + i * 20} Q 650,${195 + i * 20} 700,${200 + i * 20} T 800,${200 + i * 20}`
                ]
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.g>

        {/* Enhanced journey path */}
        <motion.path
          d={journeyPath}
          stroke="#10B981"
          strokeWidth="4"
          fill="none"
          strokeDasharray="10,5"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress }}
          transition={{ ease: "linear" }}
        />

        {/* Progress line overlay */}
        <motion.path
          d={journeyPath}
          stroke="#EC4899"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress * 0.8 }}
          transition={{ ease: "linear" }}
          opacity="0.6"
        />

        {/* Cities with enhanced design */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          {/* Abu Dhabi */}
          <g filter="url(#shadow)">
            <motion.circle
              cx="150"
              cy="380"
              r="20"
              fill="#EC4899"
              animate={{
                r: [20, 25, 20],
                opacity: [1, 0.8, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <circle cx="150" cy="380" r="15" fill="#EC4899" />
            <circle cx="150" cy="380" r="8" fill="white" />
            <text x="150" y="415" textAnchor="middle" className="text-sm font-bold fill-gray-800">
              Abu Dhabi
            </text>
          </g>

          {/* Dubai/Palm Jumeirah */}
          <g filter="url(#shadow)">
            <motion.circle
              cx="650"
              cy="280"
              r="25"
              fill="#FCD34D"
              animate={{
                r: [25, 30, 25],
                opacity: [1, 0.8, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            <circle cx="650" cy="280" r="20" fill="#FCD34D" />
            <circle cx="650" cy="280" r="10" fill="white" />
            <text x="650" y="320" textAnchor="middle" className="text-sm font-bold fill-gray-800">
              Palm Jumeirah
            </text>
            <text x="650" y="335" textAnchor="middle" className="text-xs fill-gray-600">
              Dubai
            </text>
          </g>
        </motion.g>

        {/* Landmarks */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <circle cx="250" cy="360" r="4" fill="#10B981" opacity="0.6" />
          <text x="250" y="350" textAnchor="middle" className="text-xs fill-gray-600">
            Yas Island
          </text>

          <circle cx="400" cy="330" r="4" fill="#10B981" opacity="0.6" />
          <text x="400" y="320" textAnchor="middle" className="text-xs fill-gray-600">
            Saadiyat Island
          </text>

          <circle cx="550" cy="300" r="4" fill="#10B981" opacity="0.6" />
          <text x="550" y="290" textAnchor="middle" className="text-xs fill-gray-600">
            Sheikh Zayed Road
          </text>
        </motion.g>

        {/* Animated car with trail effect */}
        <motion.g
          animate={{
            offsetDistance: `${progress * 100}%`
          }}
          style={{
            offsetPath: `path('${journeyPath}')`,
            offsetRotate: '0deg'
          }}
        >
          {/* Car trail */}
          <motion.circle
            cx="-5"
            cy="0"
            r="8"
            fill="#EC4899"
            opacity="0.3"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{
              duration: 1,
              repeat: Infinity
            }}
          />
          
          {/* Car body */}
          <g filter="url(#shadow)">
            <rect x="-20" y="-10" width="40" height="20" fill="#1F2937" rx="5" />
            <rect x="-15" y="-7" width="12" height="14" fill="#38BDF8" opacity="0.8" rx="2" />
            <rect x="3" y="-7" width="12" height="14" fill="#38BDF8" opacity="0.8" rx="2" />
            <circle cx="-10" cy="10" r="4" fill="#333" />
            <circle cx="10" cy="10" r="4" fill="#333" />
          </g>
        </motion.g>

        {/* Decorative elements */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2 }}
        >
          {/* Palm trees near destination */}
          <text x="620" y="260" fontSize="20">🌴</text>
          <text x="680" y="260" fontSize="20">🌴</text>
          <text x="650" y="240" fontSize="16">🌊</text>
        </motion.g>
      </svg>

      {/* Journey info overlay with glass morphism */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-4 right-4 glass-strong rounded-xl p-4 shadow-magical"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-gray-800">Your Journey to Paradise</h3>
          <span className="text-sm font-medium text-primary-600">{Math.round(progress * 100)}%</span>
        </div>
        
        <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            style={{
              boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)'
            }}
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Distance</p>
            <p className="font-bold text-gray-800">130 km</p>
          </div>
          <div>
            <p className="text-gray-600">Duration</p>
            <p className="font-bold text-gray-800">1.5 hours</p>
          </div>
          <div>
            <p className="text-gray-600">Route</p>
            <p className="font-bold text-gray-800">E11 Highway</p>
          </div>
        </div>
      </motion.div>

      {/* Destination arrival card */}
      {showInfo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 glass-strong rounded-2xl p-6 shadow-magical max-w-sm"
        >
          <h3 className="text-2xl font-comfortaa font-bold text-gray-800 mb-2">
            Welcome to Paradise! 🌴
          </h3>
          <p className="text-gray-600 mb-4">
            Your luxury staycation at Anantara The Palm Dubai Resort awaits...
          </p>
          <div className="flex items-center gap-3 text-3xl">
            {['🏖️', '🌊', '🌅', '✨'].map((emoji, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.1, type: "spring" }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default EnhancedMapAnimation