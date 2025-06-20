import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MemoryCard from './MemoryCard'
import memoriesData from '../assets/data/memories.json'

const Memories = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section ref={ref} className="py-24 px-4 bg-gradient-to-b from-white via-sand-100/30 to-cream relative overflow-hidden texture-mesh">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-32 left-8 w-40 h-40 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            x: [0, 50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-32 right-8 w-32 h-32 bg-gradient-to-br from-accent-200 to-gold-400 rounded-full"
          animate={{ 
            scale: [1, 0.8, 1],
            y: [-30, 30, -30],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-24 h-24 bg-ocean-200 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "backOut" }}
          className="text-center mb-24"
        >
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-comfortaa font-bold mb-8 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #1F2937, #10B981, #EC4899, #FCD34D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Cherished Memories
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-strong rounded-3xl p-6 shadow-depth border-0 max-w-2xl mx-auto mb-10 bg-celebration-gradient"
          >
            <p className="text-xl lg:text-2xl text-gray-700 font-opensans font-medium">
              Click on each photo to reveal the story behind it
            </p>
          </motion.div>
          
          {/* Enhanced decorative elements */}
          <motion.div 
            className="flex justify-center gap-6 text-4xl lg:text-5xl"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.5
                }
              }
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {[
              { emoji: '📸', animation: { rotate: [-15, 15, -15] } },
              { emoji: '💝', animation: { scale: [1, 1.3, 1] } },
              { emoji: '🌟', animation: { rotate: [15, -15, 15] } }
            ].map((item, index) => (
              <motion.span
                key={index}
                className="drop-shadow-lg"
                variants={{
                  hidden: { scale: 0, rotate: -180 },
                  visible: { scale: 1, rotate: 0 }
                }}
                animate={item.animation}
                transition={{
                  ...item.animation && { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{ 
                  scale: 1.4,
                  transition: { duration: 0.2 }
                }}
              >
                {item.emoji}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced timeline layout */}
        <div className="relative">
          {/* Enhanced timeline line (hidden on mobile) */}
          <motion.div 
            className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-2 rounded-full overflow-hidden"
            style={{ height: '100%' }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="w-full h-full bg-gradient-to-b from-primary-400 via-secondary-400 to-accent-400 shadow-glow"></div>
          </motion.div>
          
          {/* Memory cards */}
          <div className="grid gap-16 lg:gap-24">
            {memoriesData.memories.map((memory, index) => (
              <div
                key={memory.id}
                className="lg:grid lg:grid-cols-2 lg:gap-16 items-center"
              >
                {/* Card - alternating sides on desktop */}
                <div className={`${
                  index % 2 === 0 
                    ? 'lg:order-1' 
                    : 'lg:order-2'
                }`}>
                  <MemoryCard memory={memory} index={index} />
                </div>
                
                {/* Content area for timeline context (desktop only) */}
                <div className={`hidden lg:block ${
                  index % 2 === 0 
                    ? 'lg:order-2 lg:pl-8' 
                    : 'lg:order-1 lg:pr-8'
                }`}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    className={`text-${index % 2 === 0 ? 'left' : 'right'}`}
                  >
                    <h3 className="text-2xl lg:text-3xl font-comfortaa font-bold text-gray-800 mb-4">
                      {memory.title}
                    </h3>
                    <p className="text-lg text-gray-600 font-opensans leading-relaxed mb-4">
                      {memory.story}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary-400 rounded-full"></div>
                      <span className="text-primary-600 font-medium">{memory.date}</span>
                    </div>
                  </motion.div>
                </div>
                
                {/* Enhanced timeline dot */}
                <motion.div
                  className="hidden lg:block absolute left-1/2 transform -translate-x-1/2"
                  style={{ top: `${20 + index * 25}%` }}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.5 + index * 0.1, 
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-white border-4 border-secondary-400 rounded-full shadow-large relative z-10"></div>
                    <motion.div
                      className="absolute inset-0 w-8 h-8 bg-secondary-300 rounded-full blur-md opacity-50"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ 
                        duration: 2,
                        delay: index * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced bottom decoration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-24"
        >
          <motion.div
            className="glass-strong rounded-3xl p-8 shadow-magical border-0 max-w-3xl mx-auto bg-celebration-gradient magnetic"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-2xl lg:text-3xl font-pacifico text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 mb-4">
              So many wonderful moments to treasure!
            </p>
            <div className="flex justify-center gap-3 text-2xl">
              {['💖', '🌈', '✨'].map((emoji, index) => (
                <motion.span
                  key={index}
                  animate={{
                    y: [0, -8, 0],
                    rotate: [-5, 5, -5]
                  }}
                  transition={{
                    duration: 2,
                    delay: index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Memories