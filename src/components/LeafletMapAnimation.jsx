import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet'
import { motion, AnimatePresence } from 'framer-motion'
import L from 'leaflet'
import confetti from 'canvas-confetti'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom icon for cities
const createCityIcon = (color, emoji) => {
  return L.divIcon({
    html: `
      <div style="
        width: 50px;
        height: 50px;
        background: ${color};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        border: 3px solid white;
      ">
        ${emoji}
      </div>
    `,
    className: 'custom-city-marker',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  })
}

// Landmark icon
const createLandmarkIcon = (name) => {
  return L.divIcon({
    html: `
      <div style="
        background: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
        color: #374151;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        white-space: nowrap;
      ">
        ${name}
      </div>
    `,
    className: 'landmark-label',
    iconSize: [null, null],
    iconAnchor: [40, 12],
  })
}

// Animated car marker
const CarMarker = ({ position }) => {
  const map = useMap()
  
  useEffect(() => {
    if (position) {
      map.panTo(position, { animate: true, duration: 0.5 })
    }
  }, [position, map])

  if (!position) return null

  const carIcon = L.divIcon({
    html: `
      <div style="
        width: 30px;
        height: 30px;
        background: #1F2937;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        border: 2px solid white;
      ">
        🚗
      </div>
    `,
    className: 'car-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  })

  return <Marker position={position} icon={carIcon} />
}

// Map animator component
const MapAnimator = ({ onComplete }) => {
  const map = useMap()
  const [carPosition, setCarPosition] = useState(null)
  const [routeProgress, setRouteProgress] = useState([])
  const [progress, setProgress] = useState(0)

  const abuDhabi = [24.4539, 54.3773]
  const dubai = [25.2048, 55.2708]
  const palmJumeirah = [25.1124, 55.1171]

  // Actual E11 highway route coordinates from Abu Dhabi to Dubai
  const fullRoute = [
    abuDhabi,                    // Abu Dhabi start
    [24.4667, 54.4333],         // Abu Dhabi Airport area
    [24.4833, 54.5167],         // Shahama
    [24.5000, 54.5833],         // Al Rahba
    [24.5167, 54.6500],         // Al Samha
    [24.5333, 54.7167],         // Exit towards Dubai
    [24.5500, 54.7833],         // Al Ruwais
    [24.5833, 54.8500],         // Ghantoot
    [24.6167, 54.9167],         // Saadiyat area
    [24.6500, 54.9833],         // Al Mirfa junction
    [24.6833, 55.0500],         // Approaching Jebel Ali
    [24.7167, 55.1000],         // Al Hamra
    [24.7500, 55.1333],         // Jebel Ali Free Zone
    [24.7833, 55.1500],         // Jebel Ali area
    [24.8167, 55.1667],         // Ibn Battuta area
    [24.8500, 55.1833],         // Dubai Marina approach
    [24.8833, 55.2000],         // Dubai Marina
    [24.9167, 55.2167],         // JBR area
    [24.9500, 55.2333],         // Media City
    [24.9833, 55.2500],         // Al Sufouh
    [25.0167, 55.2583],         // Knowledge Village
    [25.0500, 55.2667],         // Dubai Internet City
    [25.0833, 55.2750],         // Al Barsha
    dubai,                       // Dubai center
    [25.1667, 55.2500],         // Exit towards Palm
    [25.1500, 55.2333],         // Mall of Emirates area
    [25.1333, 55.2000],         // Al Sufouh Road
    [25.1250, 55.1667],         // Towards Palm entrance
    [25.1167, 55.1333],         // Palm Jumeirah entrance
    palmJumeirah                 // Final destination
  ]

  useEffect(() => {
    const animateJourney = async () => {
      // Initial setup
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Fit map to show full route
      map.fitBounds([abuDhabi, palmJumeirah], { padding: [50, 50] })
      
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Animate the journey
      const totalSteps = 150  // More steps for smoother animation
      const routeLength = fullRoute.length - 1

      for (let i = 0; i <= totalSteps; i++) {
        const progress = i / totalSteps
        setProgress(progress)

        // Calculate position along route
        const routeIndex = progress * routeLength
        const segmentIndex = Math.floor(routeIndex)
        const segmentProgress = routeIndex % 1

        if (segmentIndex < fullRoute.length - 1) {
          const start = fullRoute[segmentIndex]
          const end = fullRoute[segmentIndex + 1]
          
          const lat = start[0] + (end[0] - start[0]) * segmentProgress
          const lng = start[1] + (end[1] - start[1]) * segmentProgress
          
          setCarPosition([lat, lng])
          
          // Update visible route
          const visibleRoute = fullRoute.slice(0, segmentIndex + 1)
          if (segmentProgress > 0) {
            visibleRoute.push([lat, lng])
          }
          setRouteProgress(visibleRoute)
        }

        await new Promise(resolve => setTimeout(resolve, 50))  // Slightly faster for smooth motion
      }

      // Zoom to destination
      setTimeout(() => {
        map.setView(palmJumeirah, 14, {
          animate: true,
          duration: 2
        })
      }, 500)

      // Complete animation
      setTimeout(() => {
        triggerCelebration()
        onComplete()
      }, 3000)
    }

    animateJourney()
  }, [map, onComplete])

  const triggerCelebration = () => {
    const colors = ['#10B981', '#EC4899', '#FCD34D', '#D4AF37']
    
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { x: 0.5, y: 0.6 },
          colors,
          shapes: ['circle', 'square'],
          scalar: 1.2
        })
      }, i * 200)
    }
  }

  return (
    <>
      {/* Animated route line - styled as road */}
      {routeProgress.length > 1 && (
        <>
          {/* Road shadow */}
          <Polyline 
            positions={routeProgress}
            color="#000000"
            weight={8}
            opacity={0.2}
          />
          {/* Main road */}
          <Polyline 
            positions={routeProgress}
            color="#374151"
            weight={6}
            opacity={0.9}
          />
          {/* Road center line */}
          <Polyline 
            positions={routeProgress}
            color="#FCD34D"
            weight={2}
            opacity={0.8}
            dashArray="10, 10"
          />
        </>
      )}
      
      {/* Abu Dhabi marker */}
      <Marker 
        position={abuDhabi} 
        icon={createCityIcon('#EC4899', '🏙️')}
      />
      
      {/* Palm Jumeirah marker */}
      <Marker 
        position={palmJumeirah} 
        icon={createCityIcon('#FCD34D', '🏝️')}
      />
      
      {/* Landmark markers along the route */}
      {progress > 0.2 && (
        <Marker 
          position={[24.5833, 54.8500]} 
          icon={createLandmarkIcon('Ghantoot')}
        />
      )}
      {progress > 0.4 && (
        <Marker 
          position={[24.7500, 55.1333]} 
          icon={createLandmarkIcon('Jebel Ali')}
        />
      )}
      {progress > 0.6 && (
        <Marker 
          position={[24.8833, 55.2000]} 
          icon={createLandmarkIcon('Dubai Marina')}
        />
      )}
      {progress > 0.8 && (
        <Marker 
          position={[25.1500, 55.2333]} 
          icon={createLandmarkIcon('Mall of Emirates')}
        />
      )}

      {/* Animated car */}
      <CarMarker position={carPosition} />

      {/* Progress overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-[1000]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-xl p-4 shadow-magical"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-gray-800">Journey to Paradise</h3>
            <span className="text-sm font-medium text-primary-600">
              {progress < 0.2 && 'Leaving Abu Dhabi...'}
              {progress >= 0.2 && progress < 0.4 && 'Passing Ghantoot...'}
              {progress >= 0.4 && progress < 0.6 && 'Approaching Jebel Ali...'}
              {progress >= 0.6 && progress < 0.8 && 'Through Dubai Marina...'}
              {progress >= 0.8 && progress < 0.95 && 'Almost there...'}
              {progress >= 0.95 && 'Arriving at Palm Jumeirah!'}
            </span>
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
          
          <div className="grid grid-cols-4 gap-3 text-sm">
            <div>
              <p className="text-gray-600">From</p>
              <p className="font-bold text-gray-800">Abu Dhabi</p>
            </div>
            <div>
              <p className="text-gray-600">Route</p>
              <p className="font-bold text-gray-800">E11 Highway</p>
            </div>
            <div>
              <p className="text-gray-600">Distance</p>
              <p className="font-bold text-gray-800">130 km</p>
            </div>
            <div>
              <p className="text-gray-600">To</p>
              <p className="font-bold text-gray-800">Palm Jumeirah</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Destination card */}
      <AnimatePresence>
        {progress === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 2 }}
            className="absolute top-4 right-4 z-[1000]"
          >
            <div className="glass-strong rounded-2xl p-6 shadow-magical max-w-sm">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const LeafletMapAnimation = ({ onComplete }) => {
  const [showInfo, setShowInfo] = useState(false)
  const center = [24.8, 54.8] // Center between Abu Dhabi and Dubai

  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-magical">
      <MapContainer
        center={center}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        <MapAnimator onComplete={() => {
          setShowInfo(true)
          setTimeout(onComplete, 2000)
        }} />
      </MapContainer>

      {/* Custom styling overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-cream/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream/10" />
      </div>
    </div>
  )
}

export default LeafletMapAnimation