// src/composables/useGsap.js
import gsap from 'gsap'

const reduced = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false

export function useGsap() {
  /** Fade elements up from translateY(16px) with optional stagger */
  function fadeUp(els, { delay = 0, duration = 0.7, stagger = 0 } = {}) {
    if (reduced) return
    gsap.fromTo(els,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration, delay, stagger, ease: 'power2.out' }
    )
  }

  /** Stagger a list of elements into view */
  function stagger(els, { delay = 0, duration = 0.5 } = {}) {
    if (reduced) return
    gsap.fromTo(els,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration, delay, stagger: 0.07, ease: 'power2.out' }
    )
  }

  /** Star burst at viewport centre */
  function burst() {
    if (reduced) return
    if (typeof document === 'undefined') return
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    for (let i = 0; i < 26; i++) {
      const el = document.createElement('span')
      el.textContent = i % 3 === 0 ? '✦' : '✧'
      el.setAttribute('aria-hidden', 'true')
      Object.assign(el.style, {
        position: 'fixed', left: cx + 'px', top: cy + 'px',
        zIndex: 9999, pointerEvents: 'none', color: 'var(--burnished)',
        fontSize: (10 + Math.random() * 16) + 'px',
        textShadow: '0 0 8px var(--burnished)',
      })
      document.body.appendChild(el)
      const ang = Math.random() * Math.PI * 2
      const dist = 90 + Math.random() * 220
      gsap.to(el, {
        x: Math.cos(ang) * dist, y: Math.sin(ang) * dist,
        opacity: 0, scale: 1.4, duration: 1.3, ease: 'power2.out',
        onComplete: () => el.remove(),
      })
    }
  }

  return { fadeUp, stagger, burst, reduced }
}
