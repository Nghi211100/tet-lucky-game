'use client'

import { useState } from 'react'
import { UsePWAInstall } from '../hooks/pwa.hook'
import IOSInstallHint from './IOSInstallHint'
import { AndroidInstallPrompt } from './AndroidHint'

export default function InstallPrompt() {
  const { canInstall, install, isInstalled, isIOS } = UsePWAInstall()
  const [open, setOpen] = useState(true)

  if (isInstalled || !open) return null

  // iPhone message
  if (isIOS) {
    return <IOSInstallHint onClose={() => setOpen(false)} />
  }

  // Android button
  if (!canInstall) return null

  return (
    <AndroidInstallPrompt
      onClose={() => setOpen(false)}
      onInstall={async () => {
        const ok = await install()
        if (ok) setOpen(false)
      }}
    />
  )
}
