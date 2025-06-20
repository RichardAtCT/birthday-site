import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Cake } from 'lucide-react'

const wishes = [
  {
    id: 1,
    text: "May this year bring you endless adventures and unforgettable memories that will warm your heart forever!",
    color: "from-secondary-50 to-secondary-100",
    borderColor: "border-secondary-200/50",
    shadowColor: "shadow-secondary-200/20",
    icon: "🌟",
    delay: 0
  },
  {
    id: 2,
    text: "Wishing you 365 days of happiness, laughter, and amazing surprises that light up your world!",
    color: "from-accent-50 to-accent-100",
    borderColor: "border-accent-200/50",
    shadowColor: "shadow-accent-200/20",
    icon: "🎭",
    delay: 0.1
  },
  {
    id: 3,
    text: "Here's to another year of making dreams come true and reaching new heights of joy and success!",
    color: "from-primary-50 to-primary-100",
    borderColor: "border-primary-200/50",
    shadowColor: "shadow-primary-200/20",
    icon: "🚀",
    delay: 0.2
  },
  {
    id: 4,
    text: "May your special day be filled with all the joy, love, and magic you bring to everyone around you!",
    color: "from-ocean-50 to-ocean-100",
    borderColor: "border-ocean-200/50",
    shadowColor: "shadow-ocean-200/20",
    icon: "💝",
    delay: 0.3
  }
]

const TypewriterText = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 60)
      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, onComplete])

  return (
    <span className="relative">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="absolute"
      >
        |
      </motion.span>
    </span>
  )
}

const BirthdayWishes = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [startTypewriter, setStartTypewriter] = useState(false)
  const [typewriterComplete, setTypewriterComplete] = useState(false)

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setStartTypewriter(true), 800)
    }
  }, [isInView])

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "backOut"
      }
    }
  }

  return (
    <section ref={ref} className="py-24 px-4 bg-gradient-to-b from-cream via-sand-100 to-white relative overflow-hidden texture-dots">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-primary-100 rounded-full"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-secondary-100 rounded-full"
          animate={{ scale: [1, 0.8, 1], y: [-20, 20, -20] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "backOut" }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-comfortaa font-bold text-gray-800 mb-8 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #1F2937, #10B981, #EC4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Birthday Wishes
          </motion.h2>
          
          {/* Enhanced rotating cake with glow effect */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-8 relative"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <Cake className="w-20 h-20 text-secondary-500 drop-shadow-lg filter" />
              <motion.div
                className="absolute inset-0 w-20 h-20 bg-secondary-300 rounded-full blur-xl opacity-30"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Enhanced typewriter effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glass-strong rounded-3xl p-8 shadow-magical border-0 max-w-2xl mx-auto bg-celebration-gradient"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-pacifico text-transparent bg-clip-text bg-gradient-to-r from-secondary-600 to-primary-600 leading-relaxed">
              {startTypewriter && (
                <TypewriterText 
                  text="35 years of being absolutely amazing! ✨" 
                  onComplete={() => setTypewriterComplete(true)}
                />
              )}
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced wish cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-8 lg:gap-10"
        >
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.id}
              variants={item}
              whileHover={{ 
                scale: 1.03,
                y: -8,
                transition: { 
                  duration: 0.3, 
                  ease: "backOut" 
                }
              }}
              className={`bg-gradient-to-br ${wish.color} p-8 lg:p-10 rounded-3xl shadow-floating border border-white/30 glass-subtle cursor-pointer group relative overflow-hidden magnetic`}
            >
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              
              {/* Card content */}
              <div className="relative z-10">
                <div className="flex items-start gap-6">
                  <motion.span 
                    className="text-4xl lg:text-5xl drop-shadow-sm"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 15,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {wish.icon}
                  </motion.span>
                  <div className="flex-1">
                    <p className="text-lg lg:text-xl font-opensans text-gray-700 leading-relaxed font-medium">
                      {wish.text}
                    </p>
                  </div>
                </div>
                
                {/* Decorative corner element */}
                <motion.div
                  className="absolute bottom-4 right-4 w-8 h-8 bg-white/30 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 3,
                    delay: index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.div
            className="inline-flex gap-6 text-5xl lg:text-6xl"
            variants={container}
            initial="hidden"
            animate={typewriterComplete ? "visible" : "hidden"}
          >
            {['🎊', '🎉', '🎊'].map((emoji, index) => (
              <motion.span
                key={index}
                className="drop-shadow-lg"
                variants={{
                  hidden: { scale: 0, rotate: -180 },
                  visible: { scale: 1, rotate: 0 }
                }}
                animate={{
                  y: [-8, 8, -8],
                  rotate: [-5, 5, -5]
                }}
                transition={{
                  y: {
                    duration: 3,
                    delay: index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  rotate: {
                    duration: 4,
                    delay: index * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{ 
                  scale: 1.3,
                  transition: { duration: 0.2 }
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
          
          {/* Additional celebratory message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={typewriterComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 text-xl font-comfortaa text-gray-600 italic"
          >
            Here's to making this year the best one yet! 🥳
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default BirthdayWishes