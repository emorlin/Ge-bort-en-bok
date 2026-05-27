import { useState, useEffect } from 'react'
import { BookOpen } from 'lucide-react'

const MESSAGES = [
  'Searching books…',
  'AI picking favourites…',
  'Matching your interests…',
  'Finding the right titles…',
  'Almost done…',
]

export default function LoadingOverlay() {
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setMsgIndex(i => (i + 1) % MESSAGES.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={MESSAGES[msgIndex]}
      className="fixed inset-0 z-50 bg-bg/85 backdrop-blur-sm flex flex-col items-center justify-center gap-10"
    >
      <div className="bg-surface rounded-3xl shadow-card-lg px-10 py-10 flex flex-col items-center gap-8">
        <div className="flex gap-3" aria-hidden="true">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              style={{ animationDelay: `${i * 160}ms` }}
              className="w-12 h-18 bg-primary-light rounded-xl flex items-center justify-center animate-pulse shadow-card"
            >
              <BookOpen className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </div>
          ))}
        </div>
        <div className="text-center">
          <p key={msgIndex} className="font-display text-2xl text-ink animate-fade-up">
            {MESSAGES[msgIndex]}
          </p>
          <p className="text-sm text-muted mt-2">AI is on it</p>
        </div>
      </div>
    </div>
  )
}
