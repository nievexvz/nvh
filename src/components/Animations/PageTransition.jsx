import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useLocation } from 'react-router-dom'

function PageTransition({ children }) {
  const location = useLocation()
  const containerRef = useRef()

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }
    )

    window.scrollTo(0, 0)
  }, [location])

  return (
    <div ref={containerRef} className="page-transition">
      {children}
    </div>
  )
}

export default PageTransition