"use client"

import { useState } from "react"
import styled from "styled-components"
import { useSpring, animated } from "react-spring"
import Image from "next/image"

const TimelineContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.5);
`

const Milestone = styled(animated.div)`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  margin: 1rem 0;
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 600px;
  width: 100%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.02);
  }
`

const MilestoneImage = styled(Image)`
  border-radius: 10px;
  margin-bottom: 1rem;
`

const milestones = [
  { date: "First Walk", description: "We had our first walk at the moonlit street.", image: "/images/photo1.jpg" },
  { date: "First Kiss", description: "Our first kiss under the starry sky.", image: "/images/photo2.jpg" },
  { date: "First Hug", description: "Our first hug under a bus stop with fear of public..", image: "/images/photo3.jpg" },
  // Add more milestones as needed
]

interface TimelineProps {
  onComplete: () => void
}

export default function Timeline({ onComplete }: TimelineProps) {
  const [currentMilestone, setCurrentMilestone] = useState(0)

  const milestoneProps = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(50px)" },
  })

  const handleMilestoneClick = () => {
    if (currentMilestone < milestones.length - 1) {
      setCurrentMilestone(currentMilestone + 1)
    } else {
      onComplete()
    }
  }

  return (
    <TimelineContainer>
      <h2>Our Journey Together</h2>
      <Milestone style={milestoneProps} onClick={handleMilestoneClick}>
        <MilestoneImage
          src={milestones[currentMilestone].image || "/placeholder.svg"}
          alt={milestones[currentMilestone].date}
          width={500}
          height={300}
        />
        <h3>{milestones[currentMilestone].date}</h3>
        <p>{milestones[currentMilestone].description}</p>
      </Milestone>
    </TimelineContainer>
  )
}

