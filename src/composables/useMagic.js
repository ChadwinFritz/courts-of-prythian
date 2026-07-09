// src/composables/useMagic.js
import gsap from 'gsap'

const reduced = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false
const fine = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(pointer: fine)').matches
  : false

export function useMagic() {
  function initCursor() {
    if (reduced || !fine) return
    if (typeof window === 'undefined') return
    let live = 0
    const MAX = 36
    let last = 0
    window.addEventListener('pointermove', (e) => {
      const now = performance.now()
      if (now - last < 42 || live >= MAX) return
      last = now; live++
      const d = document.createElement('span')
      d.textContent = Math.random() < 0.3 ? '✦' : '·'
      d.setAttribute('aria-hidden', 'true')
      Object.assign(d.style, {
        position: 'fixed', pointerEvents: 'none', zIndex: 9999,
        color: 'var(--burnished)', fontSize: '10px', lineHeight: '1',
        textShadow: '0 0 6px var(--burnished)',
        left: (e.clientX + (Math.random() * 10 - 5)) + 'px',
        top:  (e.clientY + (Math.random() * 10 - 5)) + 'px',
      })
      document.body.appendChild(d)
      gsap.to(d, {
        y: 22, opacity: 0, x: (Math.random() * 24 - 12),
        scale: 0.35, duration: 0.9, ease: 'power2.out',
        onComplete: () => { d.remove(); live-- },
      })
    }, { passive: true })
  }

  function initShootingStars() {
    if (reduced) return
    if (typeof document === 'undefined') return
    function shoot() {
      if (document.hidden) { setTimeout(shoot, 16000 + Math.random() * 18000); return }
      const s = document.createElement('div')
      s.setAttribute('aria-hidden', 'true')
      Object.assign(s.style, {
        position: 'fixed', zIndex: 9998, pointerEvents: 'none',
        width: '130px', height: '2px', borderRadius: '2px',
        background: 'linear-gradient(90deg,rgba(201,148,58,0),var(--burnished) 55%,#fff)',
        left: (Math.random() * 40) + 'vw',
        top:  (4 + Math.random() * 18) + 'vh',
        opacity: 0,
      })
      document.body.appendChild(s)
      gsap.fromTo(s, { opacity: 0 }, {
        opacity: 1, x: '60vw', y: '26vh', rotate: 13,
        duration: 1.6, ease: 'power2.in',
        onComplete: () => s.remove(),
      })
      setTimeout(shoot, 16000 + Math.random() * 18000)
    }
    setTimeout(shoot, 8000 + Math.random() * 8000)
  }

  return { initCursor, initShootingStars }
}
