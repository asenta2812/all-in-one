import { useEffect, useState } from 'react'

/**
 *
 * @param {*} HTMLElement elm
 * @returns boolean check if element is invisible
 */
function useElementInvisible(elm) {
  const [isInvisible, setIsInvisible] = useState(false)
  const options = {
    threshold: 1.0,
  }

  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.isSameNode(elm)) {
          setIsInvisible(true)
        }
      }
    })
  }

  useEffect(() => {
    if (!elm) {
      return
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(elm)

    return () => {
      observer.unobserve(elm)
    }
  }, [elm])
  return isInvisible
}

export default useElementInvisible
