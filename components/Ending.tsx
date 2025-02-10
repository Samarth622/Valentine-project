"use client"

import styled from "styled-components"
import { useSpring, animated } from "react-spring"
import Image from "next/image"

const EndingContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  padding: 2rem;
`

const Message = styled(animated.h2)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  color: white;
`

const ImageWrapper = styled.div`
  margin-top: 2rem;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
`

const NextButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`

interface EndingProps {
  onComplete: () => void
}

export default function Ending({ onComplete }: EndingProps) {
  const messageProps = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(50px)" },
    delay: 500,
  })

  const imageProps = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.8)" },
    delay: 1000,
  })

  return (
    <EndingContainer>
      <Message style={messageProps}>
        I can't wait to create more memories under the moon with you ❤️
      </Message>
      <animated.div style={imageProps}>
        <ImageWrapper>
          <Image src="/images/final-image.jpg" alt="Our future together" width={600} height={400} />
        </ImageWrapper>
      </animated.div>
    </EndingContainer>
  )
}
