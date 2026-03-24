import React from 'react'
import './App.css'
import gsap from 'gsap'
import { useEffect } from 'react'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Wrap from './components/wrap/wrap'
import Hero from './components/Hero/Hero'
import Whoami from './components/Hero/whoami/whoami'
import NavBar from './components/NavBar/NavBar'
import Cursor from './components/ui/cursor/cursor'
gsap.registerPlugin(ScrollTrigger, SplitText)

const App = () => {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <main style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden', overflowY: 'auto' }}>
      <Wrap />
      <Hero />
      <Whoami />
      <Cursor />
      <NavBar />
    </main>
  )
}

export default App
