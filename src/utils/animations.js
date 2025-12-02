import { gsap } from 'gsap'

export const animations = {
  fadeIn(element, duration = 0.5) {
    gsap.from(element, {
      opacity: 0,
      y: 20,
      duration,
      ease: "power2.out"
    })
  },
  
  stagger(elements, delay = 0.1) {
    gsap.from(elements, {
      opacity: 0,
      y: 30,
      stagger: delay,
      duration: 0.6,
      ease: "back.out(1.7)"
    })
  }
}