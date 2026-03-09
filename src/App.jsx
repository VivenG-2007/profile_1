import React from 'react'
import './App.css'
import gsap from 'gsap'
import { useEffect } from 'react'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Wrap from './components/wrap/wrap'
import Hero from './components/Hero/Hero'
import NavBar from './components/NavBar/NavBar'
import Cursor from './components/ui/cursor/cursor'
gsap.registerPlugin(ScrollTrigger, SplitText)

const App = () => {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <main style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Wrap />
      <Hero />
      <Cursor />
      <NavBar />
    </main>
  )
}

export default App
