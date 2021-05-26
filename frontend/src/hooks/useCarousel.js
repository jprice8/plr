import { useEffect, useRef, useState } from 'react'

export function useCarousel(items, interval) {
  const timeoutRef = useRef()
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const next = (current + 1) % items.length
    if (shouldAnimate) {
      timeoutRef.current = setTimeout(() => setCurrent(next), interval)
    }
    return () => clearTimeout(timeoutRef.current)
  }, [current, items.length, interval, shouldAnimate])

  return { current, setShouldAnimate, timeoutRef }
}
