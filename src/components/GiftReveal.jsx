import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import LeafletMapAnimation from './LeafletMapAnimation'
// import EnhancedMapAnimation from './EnhancedMapAnimation' // SVG version
// import MapboxAnimation from './MapboxAnimation' // Mapbox version (requires API key)
import AnantaraCard from './AnantaraCard'

const GiftReveal = () => {
  const [revealPhase, setRevealPhase] = useState('initial') // initial, unwrapping, message, map, resort
  const [messageIndex, setMessageIndex] = useState(0)
  const boxRef = useRef(null)

  const messages = [
    { text: "Pack your bags...", duration: 2000 },
    { text: "We're going on an adventure!", duration: 2000 }
  ]

  const handleGiftClick = () => {
    if (revealPhase !== 'initial') return
    
    setRevealPhase('unwrapping')
    
    // Enhanced confetti burst from gift box
    setTimeout(() => {
      const rect = boxRef.current?.getBoundingClientRect()
      if (rect) {
        const origin = {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight
        }
        
        // Multi-burst explosion
        const colors = ['#10B981', '#EC4899', '#FCD34D', '#D4AF37', '#38BDF8', '#EF4444']
        
        // Initial explosion
        confetti({
          particleCount: 100,
          spread: 60,
          origin,
          colors,
          startVelocity: 50,
          shapes: ['star', 'circle'],
          scalar: 1.4
        })
        
        // Secondary burst
        setTimeout(() => {
          confetti({
            particleCount: 80,
            spread: 120,
            origin,
            colors,
            startVelocity: 35,
            decay: 0.92,
            scalar: 1.1
          })
        }, 150)
        
        // Final sparkles
        setTimeout(() => {
          confetti({
            particleCount: 50,
            spread: 80,
            origin,
            colors,
            startVelocity: 25,
            decay: 0.95,
            scalar: 0.8,
            shapes: ['circle']
          })
        }, 300)
      }
    }, 500)

    // Start message sequence
    setTimeout(() => {
      setRevealPhase('message')
      showMessages()
    }, 1500)
  }

  const showMessages = () => {
    let currentIndex = 0
    
    const showNextMessage = () => {
      if (currentIndex < messages.length) {
        setMessageIndex(currentIndex)
        currentIndex++
        setTimeout(showNextMessage, messages[currentIndex - 1].duration)
      } else {
        setTimeout(() => setRevealPhase('map'), 500)
      }
    }
    
    showNextMessage()
  }

  const handleMapComplete = () => {
    setTimeout(() => setRevealPhase('resort'), 1000)
  }

  return (
    <section className="py-20 px-4 min-h-screen bg-gradient-to-b from-cream via-white to-sand/20 flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-comfortaa font-bold text-gray-800 mb-4">
            {revealPhase === 'resort' ? 'Your Birthday Surprise!' : 'A Special Gift For You'}
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Initial gift box */}
          {revealPhase === 'initial' && (
            <motion.div
              key="gift-box"
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center"
            >
              {/* 3D Gift Box */}
              <div 
                ref={boxRef}
                onClick={handleGiftClick}
                className="relative cursor-pointer group magnetic ripple"
                role="button"
                tabIndex={0}
                aria-label="Open your special birthday gift"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleGiftClick()
                  }
                }}
              >
                {/* Sparkles around the box */}
                <div className="absolute -inset-8">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Infinity
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </div>

                {/* Box with shake animation */}
                <motion.div
                  animate={{ 
                    x: [-2, 2, -2, 2, 0],
                    rotate: [-1, 1, -1, 1, 0]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  className="relative"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Gift box */}
                  <div className="w-48 h-48 md:w-64 md:h-64 relative" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Box body */}
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary to-pink-500 rounded-lg shadow-depth transform" style={{ transform: 'translateZ(0px)' }}></div>
                    
                    {/* Box lid */}
                    <div className="absolute -top-8 inset-x-0 h-16 bg-gradient-to-br from-secondary to-pink-600 rounded-lg shadow-floating transform group-hover:translate-y-[-10px] transition-transform"></div>
                    
                    {/* Ribbon */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="absolute w-full h-12 bg-gold"></div>
                      <div className="absolute w-12 h-full bg-gold"></div>
                      <div className="relative w-20 h-20 bg-gold rounded-full flex items-center justify-center shadow-magical">
                        <div className="absolute inset-2 bg-yellow-400 rounded-full shadow-glow"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-xl font-comfortaa text-gray-700"
              >
                Tap to open your special gift! 🎁
              </motion.p>
            </motion.div>
          )}

          {/* Unwrapping animation */}
          {revealPhase === 'unwrapping' && (
            <motion.div
              key="unwrapping"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 0] }}
              transition={{ duration: 1 }}
              className="flex items-center justify-center h-64"
            >
              <div className="text-6xl">🎁</div>
            </motion.div>
          )}

          {/* Messages */}
          {revealPhase === 'message' && (
            <motion.div
              key={`message-${messageIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-center h-64"
            >
              <h3 className="text-3xl md:text-5xl font-pacifico text-center text-primary">
                {messages[messageIndex].text}
              </h3>
            </motion.div>
          )}

          {/* Map animation */}
          {revealPhase === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center"
            >
              <LeafletMapAnimation onComplete={handleMapComplete} />
              {/* <EnhancedMapAnimation onComplete={handleMapComplete} /> */} {/* SVG version */}
              {/* <MapboxAnimation onComplete={handleMapComplete} /> */} {/* Mapbox version (requires API key) */}
            </motion.div>
          )}

          {/* Resort reveal */}
          {revealPhase === 'resort' && (
            <motion.div
              key="resort"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center"
            >
              <AnantaraCard />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reset button (for testing) */}
        {revealPhase === 'resort' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => {
                setRevealPhase('initial')
                setMessageIndex(0)
              }}
              className="text-sm text-gray-500 hover:text-gray-700 underline magnetic ripple px-4 py-2 rounded-lg"
            >
              Replay the surprise
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default GiftReveal