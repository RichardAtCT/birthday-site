import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { motion } from 'framer-motion'

gsap.registerPlugin(MotionPathPlugin)

const MapAnimation = ({ onComplete }) => {
  const mapRef = useRef(null)
  const pathRef = useRef(null)
  const carRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onComplete
      })

      timelineRef.current = tl

      // Initial setup
      gsap.set('.map-pin', { scale: 0 })
      gsap.set('.landmark', { opacity: 0 })
      gsap.set(carRef.current, { opacity: 0 })

      // Animation sequence
      tl.to(mapRef.current, { opacity: 1, scale: 1, duration: 1 })
        
        // Drop pins
        .to('.abu-dhabi-pin', { scale: 1, duration: 0.5 }, '+=0.5')
        .to('.dubai-pin', { scale: 1, duration: 0.5 }, '+=0.2')
        
        // Show landmarks
        .to('.landmark', { opacity: 1, duration: 0.5, stagger: 0.2 }, '+=0.3')
        
        // Animate the car journey
        .to(carRef.current, { opacity: 1, duration: 0.3 }, '+=0.5')
        .to(carRef.current, {
          duration: 4,
          ease: "none",
          motionPath: {
            path: pathRef.current,
            align: pathRef.current,
            alignOrigin: [0.5, 0.5],
            autoRotate: true
          }
        }, '-=0.3')
        
        // Zoom to Palm Jumeirah
        .to('.map-svg', {
          scale: 2.5,
          x: -150,
          y: -80,
          duration: 2,
          ease: 'power2.inOut'
        }, '+=0.5')

    }, mapRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div ref={mapRef} className="relative w-full max-w-4xl mx-auto opacity-0">
      <svg viewBox="0 0 800 600" className="map-svg w-full">
        {/* Simplified UAE map outline */}
        <path
          d="M 100,300 Q 200,250 300,280 T 500,320 Q 600,340 700,300 L 700,500 L 100,500 Z"
          fill="#F5E6D3"
          stroke="#D4AF37"
          strokeWidth="2"
        />
        
        {/* Water areas */}
        <path
          d="M 600,200 Q 650,220 700,200 L 700,350 Q 650,370 600,350 Z"
          fill="#0EA5E9"
          opacity="0.3"
        />
        
        {/* Journey path from Abu Dhabi to Dubai */}
        <path
          ref={pathRef}
          d="M 200,400 Q 300,380 400,360 T 600,320"
          stroke="#10B981"
          strokeWidth="3"
          fill="none"
          strokeDasharray="10,5"
          opacity="0.8"
        />
        
        {/* Cities */}
        <g className="map-pin abu-dhabi-pin">
          <circle cx="200" cy="400" r="12" fill="#EC4899" />
          <circle cx="200" cy="400" r="6" fill="white" />
          <text x="200" y="430" textAnchor="middle" className="text-sm font-bold fill-gray-800">Abu Dhabi</text>
        </g>
        
        <g className="map-pin dubai-pin">
          <circle cx="600" cy="320" r="12" fill="#FCD34D" />
          <circle cx="600" cy="320" r="6" fill="white" />
          <text x="600" y="350" textAnchor="middle" className="text-sm font-bold fill-gray-800">Dubai</text>
          <text x="600" y="365" textAnchor="middle" className="text-xs fill-gray-600">Palm Jumeirah</text>
        </g>
        
        {/* Landmarks along the way */}
        <g className="landmark">
          <circle cx="300" cy="380" r="4" fill="#10B981" opacity="0.6" />
          <text x="300" y="370" textAnchor="middle" className="text-xs fill-gray-600">Yas Island</text>
        </g>
        
        <g className="landmark">
          <circle cx="450" cy="350" r="4" fill="#10B981" opacity="0.6" />
          <text x="450" y="340" textAnchor="middle" className="text-xs fill-gray-600">Sheikh Zayed Road</text>
        </g>
        
        {/* Animated car */}
        <g ref={carRef}>
          <rect x="-15" y="-8" width="30" height="16" fill="#1F2937" rx="3" />
          <rect x="-10" y="-5" width="8" height="10" fill="#0EA5E9" opacity="0.7" />
          <rect x="2" y="-5" width="8" height="10" fill="#0EA5E9" opacity="0.7" />
          <circle cx="-8" cy="8" r="3" fill="#333" />
          <circle cx="8" cy="8" r="3" fill="#333" />
        </g>
      </svg>
      
      {/* Journey info overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-4 left-4 bg-white/90 p-4 rounded-lg shadow-lg"
      >
        <p className="text-sm font-bold text-gray-800">Journey Details:</p>
        <p className="text-xs text-gray-600">Distance: 130km</p>
        <p className="text-xs text-gray-600">Duration: 1.5 hours</p>
        <p className="text-xs text-gray-600">Route: E11 Highway</p>
      </motion.div>
    </div>
  )
}

export default MapAnimation