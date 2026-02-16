'use client'

import { useEffect } from 'react'

const banknoteImages = [
  '/assets/500k.svg',
  '/assets/200k.svg',
  '/assets/100k.svg',
  '/assets/50k.svg',
  '/assets/20k.svg',
  '/assets/10k.svg',
]

const otherImages = [
  '/assets/star.svg',
  '/assets/spin.svg',
  '/assets/wheel-v1.svg',
  '/assets/Modal.svg',
  '/assets/sound.svg',
  '/assets/unmuted.svg',
  '/assets/note.svg',
  '/assets/Body.svg',
  '/assets/Footer.svg',
  '/assets/Button.svg',
]

const ImagePreloader = () => {
  useEffect(() => {
    // Preload all images with multiple strategies for better caching
    const allImages = [...banknoteImages, ...otherImages]
    
    allImages.forEach((src) => {
      // Strategy 1: Use link preload for high priority
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      link.fetchPriority = 'high'
      document.head.appendChild(link)
      
      // Strategy 2: Preload using Image object for browser cache
      const img = new Image()
      img.src = src
      
      // Strategy 3: Fetch with cache to ensure it's stored
      fetch(src, { 
        method: 'GET',
        cache: 'force-cache'
      }).catch(() => {
        // Silently fail if fetch doesn't work
      })
    })
  }, [])

  return null
}

export default ImagePreloader
