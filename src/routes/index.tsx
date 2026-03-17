import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'

import type { EmojiItem } from '../lib/constants'
import type { HistoryItem } from '../types'
import { ChatArea } from '../components/ChatArea'
import { EmojiKeyboard } from '../components/EmojiKeyboard'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    const loadVoices = () => {
      if ('speechSynthesis' in globalThis) {
        setVoices(globalThis.speechSynthesis.getVoices())
      }
    }
    loadVoices()
    if ('speechSynthesis' in globalThis) {
      globalThis.speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [])

  const speak = (text: string) => {
    if ('speechSynthesis' in globalThis) {
      // Cancel any ongoing speech
      globalThis.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'th-TH'

      const thaiVoices = voices.filter((v) => v.lang.startsWith('th'))

      const bestVoice =
        thaiVoices.find(
          (v) =>
            v.name.includes('Siri') ||
            v.name.includes('Premium') ||
            v.name.includes('Enhanced'),
        ) || thaiVoices[0]
      if (bestVoice) {
        utterance.voice = bestVoice
      }

      utterance.rate = 0.95 // Slightly slower for more natural, clear cadence
      utterance.pitch = 1.05 // Slight natural inflection

      globalThis.speechSynthesis.speak(utterance) // Speak the word
    }
  }

  const handleEmojiClick = (item: EmojiItem) => {
    // Add to history
    setHistory((prev) => [
      ...prev,
      { id: Date.now(), emoji: item.emoji, word: item.word },
    ])

    // Speak the word
    speak(item.word)
  }

  // Auto-scroll to bottom of chat
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  return (
    <main className="flex flex-col h-dvh w-full max-w-md mx-auto bg-gray-50 dark:bg-zinc-950 shadow-xl border-x border-gray-100 dark:border-zinc-900">
      <div className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 p-4 text-center sticky top-0 z-10">
        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          Hopper Emoji Speech
        </h1>
      </div>

      <ChatArea history={history} bottomRef={bottomRef} />

      <EmojiKeyboard onEmojiClick={handleEmojiClick} />
    </main>
  )
}
