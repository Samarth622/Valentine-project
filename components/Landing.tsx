"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { useSpring, animated } from "react-spring"

const LandingContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
`

const Title = styled(animated.h1)`
  font-size: 4rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
`

const StartButton = styled(animated.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 30px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }
`

interface LandingProps {
  onStart: () => void
}

export default function Landing({ onStart }: LandingProps) {
  const [showButton, setShowButton] = useState(false)

  const titleProps = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 500,
  })

  const buttonProps = useSpring({
    opacity: showButton ? 1 : 0,
    transform: showButton ? "translateY(0)" : "translateY(50px)",
  })

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <LandingContainer>
      <Title style={titleProps}>Our Moonlit Journey</Title>
      {showButton && (
        <StartButton style={buttonProps} onClick={onStart}>
          Begin Our Journey
        </StartButton>
      )}
    </LandingContainer>
  )
}

