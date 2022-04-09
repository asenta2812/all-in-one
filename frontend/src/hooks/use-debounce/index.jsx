import { useEffect, useState } from 'react'

export default function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      if (handler) {
        clearTimeout(handler)
      }
    }
  }, [value, delay])

  return debounceValue
}
