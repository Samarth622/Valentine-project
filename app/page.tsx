"use client"

import { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { Howl } from "howler"
import { motion, AnimatePresence } from "framer-motion"
import Landing from "@/components/Landing"
import Timeline from "@/components/Timeline"
import Gallery from "@/components/Gallery"
import LoveLetter from "@/components/LoveLetter"
import Ending from "@/components/Ending"
import AnimatedBackground from "@/components/AnimatedBackground"
import FloatingRose from "@/components/FloatingRose"
import HeartCursor from "@/components/HeartCursor"

const PageContainer = styled.div`
  min-height: 100vh;
  color: white;
  overflow-x: hidden;
  position: relative;
`

const ContentContainer = styled(motion.div)`
  position: relative;
  z-index: 1;
`

const songs = [
  { src: "/audio/song1.mp3", title: "Starry Night Serenade" },
  { src: "/audio/song2.mp3", title: "Moonlit Memories" },
  { src: "/audio/song3.mp3", title: "Eternal Love" },
  { src: "/audio/song4.mp3", title: "Journey's End" },
]

const pageTransition = {
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: "-100%" },
}

export default function Home() {
  const [currentSection, setCurrentSection] = useState("landing")
  const soundRef = useRef<Howl | null>(null)

  useEffect(() => {
    // Initialize the first song
    soundRef.current = new Howl({
      src: [songs[0].src],
      loop: true,
      volume: 0.5,
    })
    soundRef.current.play()

    return () => {
      soundRef.current?.stop()
      soundRef.current?.unload()
    }
  }, [])

  const changeSong = (index: number) => {
    if (soundRef.current) {
      soundRef.current.stop()
      soundRef.current.unload()
    }
    soundRef.current = new Howl({
      src: [songs[index].src],
      loop: true,
      volume: 0.5,
    })
    soundRef.current.play()
  }

  const startJourney = () => {
    setCurrentSection("timeline")
    soundRef.current?.play()
  }

  return (
    <PageContainer>
      <AnimatedBackground />
      <HeartCursor />
      <FloatingRose top="10%" left="5%" delay={0} />
      <FloatingRose top="30%" left="90%" delay={2} />
      <FloatingRose top="70%" left="15%" delay={4} />
      
      <AnimatePresence mode="wait">
        <ContentContainer
          key={currentSection}
          initial="out"
          animate="in"
          exit="out"
          variants={pageTransition}
          transition={{ duration: 0.5 }}
        >
          {currentSection === "landing" && <Landing onStart={startJourney} />}
          {currentSection === "timeline" && (
            <Timeline
              onComplete={() => {
                setCurrentSection("gallery")
                changeSong(1)
              }}
            />
          )}
          {currentSection === "gallery" && (
            <Gallery
              onComplete={() => {
                setCurrentSection("loveLetter")
                changeSong(2)
              }}
            />
          )}
          {currentSection === "loveLetter" && (
            <LoveLetter
              onComplete={() => {
                setCurrentSection("ending")
                changeSong(3)
              }}
            />
          )}
          {currentSection === "ending" && <Ending />}
        </ContentContainer>
      </AnimatePresence>
    </PageContainer>
  )
}
