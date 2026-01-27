'use client'

import { useState } from 'react'
import { UsePWAInstall } from '../hooks/pwa.hook'

export default function InstallPrompt() {
  const { canInstall, install, isInstalled, isIOS } = UsePWAInstall()
  const [open, setOpen] = useState(true)

  if (isInstalled || !open) return null

  // iPhone message
  if (isIOS) {
    return (
      <div className="fixed bottom-4 left-4 right-4 bg-black text-white p-4 rounded-xl z-50" style={{fontFamily: 'sans-serif'}}>
        <p className="font-bold">Install this app?</p>
        <p className="text-sm mt-1">Tap Share → Add to Home Screen</p>
        <button onClick={() => setOpen(false)} className="mt-2 text-gray-300">
          Close
        </button>
      </div>
    )
  }

  // Android button
  if (!canInstall) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white p-4 rounded-xl shadow-xl z-50 flex justify-between items-center"  style={{fontFamily: 'sans-serif'}}>
      <div>
        <p className="font-bold">Install this app?</p>
        <p className="text-sm text-gray-500">Faster & works offline</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setOpen(false)}
          className="text-gray-500 px-3"
        >
          Later
        </button>

        <button
          onClick={async () => {
            const ok = await install()
            if (ok) setOpen(false)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Install
        </button>
      </div>
    </div>
  )
}
