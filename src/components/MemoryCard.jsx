import { useState } from 'react'
import { motion } from 'framer-motion'

// Placeholder component for when images don't load
const MemoryPlaceholder = ({ memoryId, title }) => {
  const colors = [
    'from-accent-300 to-accent-400',
    'from-primary-300 to-primary-400', 
    'from-secondary-300 to-secondary-400',
    'from-ocean-300 to-ocean-400'
  ]
  
  const icons = ['📸', '🎨', '🌟', '💝']
  
  const colorIndex = (memoryId - 1) % colors.length
  
  return (
    <div className={`w-full h-full bg-gradient-to-br ${colors[colorIndex]} flex flex-col items-center justify-center text-white transition-transform duration-300 group-hover:scale-105`}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="text-6xl mb-4"
      >
        {icons[colorIndex]}
      </motion.div>
      <h4 className="font-comfortaa font-bold text-xl text-center px-4 drop-shadow-sm">
        {title}
      </h4>
      <p className="text-sm opacity-80 mt-2">Memory {memoryId}</p>
    </div>
  )
}

const MemoryCard = ({ memory, index }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: "backOut"
      }}
      className="relative group"
      whileHover={{
        y: -12,
        transition: { duration: 0.3, ease: "backOut" }
      }}
    >
      <div 
        className="relative w-full h-[420px] cursor-pointer ripple" 
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        aria-label={`Memory card: ${memory.title}. Click to flip and read the story.`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleFlip()
          }
        }}
      >
        {/* Enhanced shadow with magical effects */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-300/30 to-secondary-300/30 rounded-2xl blur-xl shadow-magical"
          animate={{
            scale: isFlipped ? 1.05 : 1,
            opacity: isFlipped ? 0.8 : 0.5
          }}
          whileHover={{ 
            scale: 1.1, 
            opacity: 0.7 
          }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="relative w-full h-full"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ 
            duration: 0.8, 
            ease: "backOut"
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front of card - Enhanced Polaroid */}
          <div 
            className="absolute inset-0 w-full h-full rounded-2xl shadow-large"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <motion.div 
              className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl h-full flex flex-col shadow-depth border border-white/50"
              whileHover={{
                shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
            >
              {/* Enhanced Polaroid frame */}
              <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl relative overflow-hidden shadow-medium">
                <img 
                  src={import.meta.env.BASE_URL + memory.image.slice(1)} 
                  alt={memory.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextElementSibling.style.display = 'block'
                  }}
                />
                <div style={{ display: 'none' }}>
                  <MemoryPlaceholder memoryId={memory.id} title={memory.title} />
                </div>
                
                {/* Photo overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 pointer-events-none" />
                
                {/* Enhanced number badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.6 + index * 0.1, 
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  className="absolute top-4 right-4 w-14 h-14 bg-gradient-to-br from-secondary-500 to-secondary-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-large border-2 border-white/50 backdrop-blur-sm"
                >
                  <span className="drop-shadow-sm">{memory.id}</span>
                </motion.div>

                {/* Click hint overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4"
                  initial={false}
                >
                  <span className="text-white text-sm font-comfortaa bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                    Click to flip
                  </span>
                </motion.div>
              </div>
              
              {/* Enhanced caption area */}
              <div className="pt-6 pb-2 text-center">
                <h3 className="font-comfortaa font-bold text-gray-800 text-xl mb-2 leading-tight">
                  {memory.title}
                </h3>
              </div>
            </motion.div>
          </div>

          {/* Back of card - Enhanced story display */}
          <div 
            className="absolute inset-0 w-full h-full rounded-2xl shadow-large"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <motion.div 
              className="bg-gradient-to-br from-secondary-500 via-secondary-600 to-primary-600 p-8 rounded-2xl h-full flex flex-col justify-center items-center text-white relative overflow-hidden shadow-large"
              animate={{
                background: isFlipped 
                  ? "linear-gradient(135deg, #EC4899, #DB2777, #10B981)" 
                  : "linear-gradient(135deg, #EC4899, #DB2777)"
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 border border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/30 rounded-full"></div>
              </div>

              <div className="relative z-10 text-center max-w-sm">
                <motion.h3 
                  className="font-comfortaa font-bold text-2xl lg:text-3xl mb-6 drop-shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFlipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 }}
                >
                  {memory.title}
                </motion.h3>
                
                <motion.p 
                  className="text-base lg:text-lg leading-relaxed font-medium drop-shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFlipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5 }}
                >
                  {memory.story}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isFlipped ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.7 }}
                  className="mt-8 pt-6 border-t border-white/20"
                >
                  <p className="text-sm opacity-75 font-comfortaa">
                    Click to flip back ↺
                  </p>
                </motion.div>
              </div>

              {/* Floating decorative elements */}
              <motion.div
                className="absolute top-6 left-6 text-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                ✨
              </motion.div>
              <motion.div
                className="absolute bottom-6 right-6 text-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                💫
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default MemoryCard