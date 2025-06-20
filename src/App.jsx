import { useEffect } from 'react'
import Hero from './components/Hero'
import BirthdayWishes from './components/BirthdayWishes'
import Memories from './components/Memories'
import GiftReveal from './components/GiftReveal'

function App() {
  useEffect(() => {
    document.title = "Happy 35th Birthday! 🎉"
  }, [])

  return (
    <div className="min-h-screen bg-cream">
      <Hero />
      <BirthdayWishes />
      <Memories />
      <GiftReveal />
    </div>
  )
}

export default App
