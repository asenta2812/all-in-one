import { useState, useEffect, useRef, useLayoutEffect } from 'react'

const isWindow = typeof window !== 'undefined'

const useIsomorphicLayoutEffect = isWindow ? useLayoutEffect : useEffect

const useElementResize = (ref, cb) => {
  const [dimension, setDimension] = useState([undefined, undefined])

  const refHandler = useRef(null)

  useIsomorphicLayoutEffect(() => {
    refHandler.current = (ref && ref.current) || (isWindow && window)

    if (refHandler.current) {
      const setWindowDimensions = () =>
        setDimension([
          refHandler?.current?.clientHeight || refHandler?.current?.innerHeight,
          refHandler?.current?.clientWidth || refHandler?.current?.innerWidth,
        ])

      setWindowDimensions()

      const windowResizeHandler = () => {
        setWindowDimensions()
        if (cb) {
          if (typeof cb === 'function') {
            cb()
          } else {
            console.error(
              `Callback passed to useElementResize hook is not of type function`
            )
          }
        }
      }

      window.addEventListener('resize', windowResizeHandler)

      return () => window.removeEventListener('resize', windowResizeHandler)
    }
  }, [ref])

  return dimension
}

export default useElementResize
