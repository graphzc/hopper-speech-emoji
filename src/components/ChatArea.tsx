import type { RefObject } from 'react'
import type { HistoryItem } from '@/types'

type ChatAreaProps = {
  readonly history: readonly HistoryItem[]
  readonly bottomRef: RefObject<HTMLDivElement | null>
}

export function ChatArea({ history, bottomRef }: Readonly<ChatAreaProps>) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col w-full">
      {history.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500">
          <span className="text-4xl mb-4 opacity-50">👆</span>
          <p>เลือกอิโมจิด้านล่าง</p>
        </div>
      ) : (
        history.map((item) => (
          <div 
            key={item.id} 
            className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <div className="flex flex-col items-end max-w-[80%]">
              <div className="bg-blue-500 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
                <span className="text-4xl leading-none">{item.emoji}</span>
              </div>
              <span className="text-xs text-gray-500 mt-1 mr-1 font-medium">{item.word}</span>
            </div>
          </div>
        ))
      )}
      {/* We add bottomRef here so we can scroll into view */}
      <div ref={bottomRef} className="h-1 shrink-0" />
    </div>
  )
}
