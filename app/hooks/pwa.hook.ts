'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from 'react'

export function UsePWAInstall() {
  const deferredPromptRef = useRef<any>(null)

  const [canInstall, setCanInstall] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Detect iOS (no state loop)
    const ua = navigator.userAgent.toLowerCase()
    const ios = /iphone|ipad|ipod/.test(ua)
    setIsIOS(ios)

    // Detect standalone mode
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone === true

    setIsInstalled(standalone)

    const handler = (e: any) => {
      e.preventDefault()
      deferredPromptRef.current = e
      setCanInstall(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const install = async () => {
    const prompt = deferredPromptRef.current
    if (!prompt) return false

    prompt.prompt()
    const choice = await prompt.userChoice

    deferredPromptRef.current = null
    setCanInstall(false)

    return choice.outcome === 'accepted'
  }

  return {
    canInstall,
    install,
    isInstalled,
    isIOS
  }
}
