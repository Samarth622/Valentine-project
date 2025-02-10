"use client"

import { useState, useEffect, useCallback } from "react"
import styled from "styled-components"
import { useSpring, animated } from "react-spring"

const LoveLetterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
`

const Letter = styled(animated.p)`
  font-size: 1.4rem;
  line-height: 1.8;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  white-space: pre-line;
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

const loveLetter = `My dearest,

From our first moonlit walk to this very moment, every second with you has been magical. Your love illuminates my world like the moon brightens the night sky. I cherish every memory we've created together and look forward to a lifetime of adventures under the stars.

With each passing day, my love for you grows stronger. You are my guiding star, my constant source of inspiration and joy. Together, we've weathered storms and basked in the warm glow of countless moons. Our journey has been nothing short of extraordinary, and I can't wait to see what the future holds for us.

As we continue our journey together, I promise to love you more with each passing day. Your smile is my sunshine, your laughter my favorite melody. In your arms, I've found my home, and in your heart, I've found my purpose.

May our love story be as eternal as the stars above, always shining bright, guiding us through life's adventures. Thank you for being my partner, my best friend, and my soulmate.

I love you more than all the stars in the universe.

Forever yours,
Your Love`

interface LoveLetterProps {
  onComplete: () => void
}

export default function LoveLetter({ onComplete }: LoveLetterProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [showNextButton, setShowNextButton] = useState(false)

  const letterProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  })

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      setDisplayedText(loveLetter.slice(0, i))
      i++
      if (i > loveLetter.length) {
        clearInterval(timer)
        setShowNextButton(true)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [])

  const handleNext = useCallback(() => {
    onComplete()
  }, [onComplete])

  return (
    <LoveLetterContainer>
      <h2>A Letter from My Heart</h2>
      <Letter style={letterProps}>{displayedText}</Letter>
      {showNextButton && <NextButton onClick={handleNext}>Next</NextButton>}
    </LoveLetterContainer>
  )
}
