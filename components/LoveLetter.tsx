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

From our first moonlit walk till now, every sec with u has been pure magic. ✨ Your love lights up my world like the moon in the night sky. 🌙 I cherish every moment we’ve shared & can’t wait for a lifetime of adventures under the stars. 💫

With each day, my love for u just keeps growing. ❤️ U are my guiding star, my inspiration, my happiness. We’ve been through storms & enjoyed countless beautiful nights together. Our journey is nothing less than amazing, & I can’t wait for what’s next.

I promise to love u more every day. 💖 Your smile is my sunshine, your laughter my fav melody. 🎶 In ur arms, I’ve found my home, & in ur heart, I’ve found my purpose.

May our love be forever, shining bright like the stars above. 🌟 Thank u for being my love, my best friend, my everything.

I love u more than all the stars in the universe. 💕✨

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
