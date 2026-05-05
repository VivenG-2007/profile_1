import React from 'react'
import './App.css'
import gsap from 'gsap'
import { useEffect } from 'react'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Wrap from './components/wrap/wrap'
import Hero from './components/Hero/Hero'
import Whoami from './components/Hero/whoami/whoami'
import Timeline from './components/Timeline/Timeline'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Contact from './components/Contact/Contact'
import NavBar from './components/NavBar/NavBar'
import Cursor from './components/ui/cursor/cursor'
import ChatBot from './components/ChatBot/ChatBot'

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
      <Timeline />
      <Skills />
      <Projects />
      <Contact />
      <Cursor />
      <NavBar />
      <ChatBot />
    </main>
  )
}

export default App
