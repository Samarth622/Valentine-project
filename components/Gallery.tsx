"use client"

import { useState } from "react"
import styled from "styled-components"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Image from "next/image"

const GalleryContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
`

const StyledSlider = styled(Slider)`
  width: 80%;
  max-width: 800px;

  .slick-slide img {
    width: 100%;
    height: auto;
    border-radius: 15px;
  }

  .slick-prev, .slick-next {
    z-index: 1;
    &:before {
      font-size: 30px;
    }
  }

  .slick-prev {
    left: -40px;
  }

  .slick-next {
    right: -40px;
  }
`

const Caption = styled.p`
  margin-top: 1rem;
  text-align: center;
  font-size: 1.2rem;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`

const photos = [
  { src: "/images/photo1.jpg", caption: "Our first moonlit walk together ❤️" },
  { src: "/images/photo2.jpg", caption: "Our First Kiss with dome fear ❤️" },
  { src: "/images/photo3.jpg", caption: "Our first small and fearfull hug " },
  // Add more photos as needed
]

interface GalleryProps {
  onComplete: () => void
}

export default function Gallery({ onComplete }: GalleryProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index: number) => {
      setCurrentSlide(index)
      if (index === photos.length - 1) {
        setTimeout(onComplete, 3000)
      }
    },
  }

  return (
    <GalleryContainer>
      <h2>Our Favorite Moments</h2>
      <StyledSlider {...settings}>
        {photos.map((photo, index) => (
          <div key={index}>
            <Image src={photo.src || "/placeholder.svg"} alt={`Photo ${index + 1}`} width={800} height={600} />
            <Caption>{photo.caption}</Caption>
          </div>
        ))}
      </StyledSlider>
    </GalleryContainer>
  )
}

