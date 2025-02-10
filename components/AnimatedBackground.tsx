"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { useSpring, animated, config } from "react-spring"

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background: linear-gradient(to bottom, #0f1746, #2c3e50);
`

const moonGlow = keyframes`
  0% { box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.5); }
  50% { box-shadow: 0 0 30px 8px rgba(255, 255, 255, 0.7); }
  100% { box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.5); }
`

const Moon = styled(animated.div)`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fff9c4, #ffd54f);
  animation: ${moonGlow} 5s infinite ease-in-out;
`

const twinkle = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`

const Star = styled(animated.div)`
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: white;
  border-radius: 50%;
  animation: ${twinkle} 5s infinite ease-in-out;
`

const Particle = styled.div`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
`

const AnimatedBackground: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null)

  const moonProps = useSpring({
    from: { top: "-100px", right: "-100px" },
    to: { top: "50px", right: "50px" },
    config: { ...config.molasses, duration: 5000 },
  })

  const starCount = 200
  const stars = useRef(
    Array.from({ length: starCount }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
    })),
  )

  useEffect(() => {
    const createParticles = () => {
      if (particlesRef.current) {
        particlesRef.current.innerHTML = ""
        for (let i = 0; i < 50; i++) {
          const particle = document.createElement("div")
          particle.classList.add("particle")
          particle.style.width = `${Math.random() * 5 + 1}px`
          particle.style.height = particle.style.width
          particle.style.left = `${Math.random() * 100}%`
          particle.style.top = `${Math.random() * 100}%`
          particle.style.animationDuration = `${Math.random() * 3 + 2}s`
          particle.style.animationDelay = `${Math.random() * 2}s`
          particlesRef.current.appendChild(particle)
        }
      }
    }

    createParticles()
  }, [])

  return (
    <BackgroundContainer>
      <Moon style={moonProps} />
      {stars.current.map((star, index) => (
        <Star
          key={index}
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        />
      ))}
      <div ref={particlesRef} />
    </BackgroundContainer>
  )
}

export default AnimatedBackground

