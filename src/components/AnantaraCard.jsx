import { motion } from 'framer-motion'
import resortData from '../assets/data/resort-details.json'

const AnantaraCard = () => {
  const { resort } = resortData

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="max-w-2xl mx-auto"
    >
      {/* Resort card */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Top gradient bar */}
        <div className="h-2 bg-gradient-to-r from-primary via-gold to-accent"></div>
        
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-3xl font-comfortaa font-bold text-gray-800">{resort.name}</h3>
              <p className="text-gray-600 mt-1">{resort.location}</p>
            </div>
            <div className="text-gold text-2xl">★★★★★</div>
          </div>
        </div>

        {/* Journey info */}
        <div className="px-8 py-4 bg-sand/20">
          <div className="flex items-center justify-center gap-4">
            <span className="text-lg font-bold text-gray-700">📍 {resort.journey.start}</span>
            <motion.span
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl text-primary"
            >
              →
            </motion.span>
            <span className="text-lg font-bold text-gray-700">🏝️ {resort.journey.end}</span>
          </div>
          <p className="text-center text-gray-600 text-sm mt-2">{resort.journey.duration} scenic drive</p>
        </div>

        {/* Stay details */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-cream/50 rounded-lg p-4">
              <p className="text-xs text-gray-600">Check-in</p>
              <p className="font-bold text-gray-800">{resort.checkIn}</p>
            </div>
            <div className="bg-cream/50 rounded-lg p-4">
              <p className="text-xs text-gray-600">Check-out</p>
              <p className="font-bold text-gray-800">{resort.checkOut}</p>
            </div>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="text-xl font-comfortaa font-bold text-gray-800 mb-4">
              Your Luxury Experience Includes:
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {resort.experiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg shadow-sm cursor-pointer"
                >
                  <span className="text-3xl">{exp.icon}</span>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{exp.name}</p>
                    <p className="text-xs text-gray-600">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-8 py-6">
          <p className="text-center text-lg font-pacifico text-gray-700">
            Get ready for an unforgettable birthday celebration! 🎉
          </p>
        </div>

        {/* Decorative elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-4 right-4 text-4xl opacity-20"
        >
          ✨
        </motion.div>
      </div>

      {/* Image carousel placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <div className="bg-gradient-to-r from-ocean/20 to-primary/20 rounded-2xl p-8">
          <p className="text-gray-700 font-opensans">
            🏖️ Pristine beaches • 🌴 Lush gardens • 🌅 Stunning views
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AnantaraCard