import { useEffect, useRef, useState } from 'react'
import Map, { Marker, Source, Layer } from 'react-map-gl'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import 'mapbox-gl/dist/mapbox-gl.css'

// Mapbox public token (you should replace with your own for production)
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'

const MapboxAnimation = ({ onComplete }) => {
  const mapRef = useRef()
  const [viewState, setViewState] = useState({
    longitude: 54.3773,
    latitude: 24.4539,
    zoom: 7,
    pitch: 0,
    bearing: 0
  })
  const [showRoute, setShowRoute] = useState(false)
  const [carPosition, setCarPosition] = useState(null)
  const [journeyProgress, setJourneyProgress] = useState(0)
  const [showDestinationCard, setShowDestinationCard] = useState(false)

  // Abu Dhabi to Dubai coordinates
  const abuDhabi = { lng: 54.3773, lat: 24.4539 }
  const dubai = { lng: 55.2708, lat: 25.2048 }
  const palmJumeirah = { lng: 55.1171, lat: 25.1124 }

  // Route coordinates (simplified for demo)
  const routeCoordinates = [
    [abuDhabi.lng, abuDhabi.lat],
    [54.5, 24.6],
    [54.7, 24.8],
    [54.9, 24.95],
    [55.1, 25.05],
    [dubai.lng, dubai.lat],
    [palmJumeirah.lng, palmJumeirah.lat]
  ]

  const routeGeoJSON = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: routeCoordinates
    }
  }

  // Custom map style with celebration colors
  const mapStyle = {
    version: 8,
    sources: {
      'mapbox-streets': {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-streets-v11'
      }
    },
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': '#FFFBF0'
        }
      },
      {
        id: 'water',
        type: 'fill',
        source: 'mapbox-streets',
        'source-layer': 'water',
        paint: {
          'fill-color': '#38BDF8',
          'fill-opacity': 0.6
        }
      },
      {
        id: 'land',
        type: 'fill',
        source: 'mapbox-streets',
        'source-layer': 'landuse',
        paint: {
          'fill-color': '#F5E6D3',
          'fill-opacity': 0.8
        }
      }
    ]
  }

  useEffect(() => {
    // Start animation sequence
    const animationSequence = async () => {
      // Initial delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Zoom to show full route
      setViewState(prev => ({
        ...prev,
        longitude: 54.8,
        latitude: 24.8,
        zoom: 8,
        pitch: 45,
        bearing: -20
      }))

      await new Promise(resolve => setTimeout(resolve, 2000))

      // Show route
      setShowRoute(true)

      await new Promise(resolve => setTimeout(resolve, 1000))

      // Start journey animation
      animateJourney()
    }

    animationSequence()
  }, [])

  const animateJourney = async () => {
    const steps = 100
    const duration = 6000 // 6 seconds for journey

    for (let i = 0; i <= steps; i++) {
      const progress = i / steps
      setJourneyProgress(progress)

      // Calculate car position along route
      const routeIndex = Math.floor(progress * (routeCoordinates.length - 1))
      const localProgress = (progress * (routeCoordinates.length - 1)) % 1
      
      if (routeIndex < routeCoordinates.length - 1) {
        const start = routeCoordinates[routeIndex]
        const end = routeCoordinates[routeIndex + 1]
        
        const lng = start[0] + (end[0] - start[0]) * localProgress
        const lat = start[1] + (end[1] - start[1]) * localProgress
        
        setCarPosition({ lng, lat })

        // Update camera to follow car
        if (i % 10 === 0) {
          setViewState(prev => ({
            ...prev,
            longitude: lng,
            latitude: lat,
            zoom: 10 + (progress * 2),
            bearing: -20 + (progress * 40)
          }))
        }
      }

      await new Promise(resolve => setTimeout(resolve, duration / steps))
    }

    // Zoom to Palm Jumeirah
    setViewState({
      longitude: palmJumeirah.lng,
      latitude: palmJumeirah.lat,
      zoom: 14,
      pitch: 60,
      bearing: 40
    })

    // Celebration effects
    setTimeout(() => {
      setShowDestinationCard(true)
      triggerCelebration()
      setTimeout(onComplete, 3000)
    }, 1500)
  }

  const triggerCelebration = () => {
    const colors = ['#10B981', '#EC4899', '#FCD34D', '#D4AF37']
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
      colors
    })

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors
      })
    }, 250)

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors
      })
    }, 400)
  }

  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-magical">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        interactive={false}
      >
        {/* Route line */}
        {showRoute && (
          <Source id="route" type="geojson" data={routeGeoJSON}>
            <Layer
              id="route-line"
              type="line"
              paint={{
                'line-color': '#10B981',
                'line-width': 4,
                'line-opacity': 0.8
              }}
            />
          </Source>
        )}

        {/* Start marker - Abu Dhabi */}
        <Marker longitude={abuDhabi.lng} latitude={abuDhabi.lat}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="relative"
          >
            <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 bg-white rounded-full" />
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <p className="text-sm font-bold text-gray-800 bg-white/90 px-2 py-1 rounded-lg shadow-sm">
                Abu Dhabi
              </p>
            </div>
          </motion.div>
        </Marker>

        {/* Destination marker - Palm Jumeirah */}
        <Marker longitude={palmJumeirah.lng} latitude={palmJumeirah.lat}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: 'spring' }}
            className="relative"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 w-16 h-16 bg-accent-300 rounded-full opacity-30"
            />
            <div className="w-16 h-16 bg-accent-400 rounded-full flex items-center justify-center shadow-magical">
              <span className="text-2xl">🏝️</span>
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <p className="text-sm font-bold text-gray-800 bg-white/90 px-2 py-1 rounded-lg shadow-sm">
                Palm Jumeirah
              </p>
            </div>
          </motion.div>
        </Marker>

        {/* Animated car */}
        {carPosition && (
          <Marker longitude={carPosition.lng} latitude={carPosition.lat}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative"
              style={{ transform: 'translate(-50%, -50%)' }}
            >
              <div className="w-8 h-4 bg-gray-800 rounded-sm relative">
                <div className="absolute top-0.5 left-1 w-2 h-3 bg-blue-400 rounded-sm" />
                <div className="absolute top-0.5 right-1 w-2 h-3 bg-blue-400 rounded-sm" />
              </div>
            </motion.div>
          </Marker>
        )}
      </Map>

      {/* Journey progress bar */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 rounded-lg p-4 shadow-lg">
        <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
          <span>Journey Progress</span>
          <span>{Math.round(journeyProgress * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
            initial={{ width: 0 }}
            animate={{ width: `${journeyProgress * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>Abu Dhabi</span>
          <span>130 km • 1.5 hours</span>
          <span>Dubai</span>
        </div>
      </div>

      {/* Destination card */}
      <AnimatePresence>
        {showDestinationCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-magical max-w-xs"
          >
            <h3 className="text-2xl font-comfortaa font-bold text-gray-800 mb-2">
              Welcome to Paradise! 🌴
            </h3>
            <p className="text-gray-600 mb-4">
              Your luxury staycation at Anantara The Palm awaits...
            </p>
            <div className="flex items-center gap-2 text-4xl">
              {['🏖️', '🌊', '🌅', '✨'].map((emoji, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MapboxAnimation