"use client"

import type React from "react"
import styled, { keyframes } from "styled-components"

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`

const RoseContainer = styled.div<{ delay: number }>`
  position: absolute;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
`

const Rose = styled.div`
  font-size: 2rem;
`

interface FloatingRoseProps {
  top: string
  left: string
  delay: number
}

const FloatingRose: React.FC<FloatingRoseProps> = ({ top, left, delay }) => {
  return (
    <RoseContainer style={{ top, left }} delay={delay}>
      <Rose>🌹</Rose>
    </RoseContainer>
  )
}

export default FloatingRose

