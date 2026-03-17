import { EMOJIS } from '../lib/constants'
import type { EmojiItem } from '../lib/constants'

type EmojiKeyboardProps = {
  readonly onEmojiClick: (item: EmojiItem) => void
}

export function EmojiKeyboard({ onEmojiClick }: EmojiKeyboardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 p-4 pb-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] h-72 overflow-y-auto w-full">
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {EMOJIS.map((item) => (
            <button
              key={item.emoji}
              onClick={() => onEmojiClick(item)}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-all active:scale-95 shadow-sm border border-gray-200 dark:border-zinc-700"
            >
              <span className="text-4xl">{item.emoji}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
