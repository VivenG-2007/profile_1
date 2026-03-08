import React from 'react'
import './App.css'
import gsap from 'gsap'
import { useEffect } from 'react'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Wrap from './components/wrap/wrap'
import Cursor from './components/ui/cursor/cursor'
gsap.registerPlugin(ScrollTrigger, SplitText)

const App = () => {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <Wrap />
      <Cursor />
    </>
  )
}

export default App
