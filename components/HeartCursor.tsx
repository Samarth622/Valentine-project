"use client"

import type React from "react"
import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`

const Heart = styled.div`
  position: fixed;
  font-size: 1.5rem;
  pointer-events: none;
  z-index: 9999;
  animation: ${pulse} 1s infinite;
`

const HeartCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updatePosition)

    return () => window.removeEventListener("mousemove", updatePosition)
  }, [])

  return <Heart style={{ left: `${position.x}px`, top: `${position.y}px` }}>❤️</Heart>
}

export default HeartCursor

