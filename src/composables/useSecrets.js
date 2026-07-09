// src/composables/useSecrets.js
import { useEggsStore } from '../stores/eggs'
import { useToast } from './useToast'
import { useGsap } from './useGsap'

const SECRETS = [
  { word: 'rhysand',  fx: 'burst',  msg: '"Hello, Jodi-Lee darling. You found me. Of course you did." — R' },
  { word: 'jodi',     fx: 'burst',  msg: 'The stars know your name, Jodi-Lee. They have for a while.' },
  { word: 'nyx',      fx: 'burst',  msg: 'Somewhere in Velaris, a tiny pair of wings just flapped hello.' },
  { word: 'velaris',  fx: 'burst',  msg: 'The City of Starlight opens its gates to you, dreamer.' },
  { word: 'starfall', fx: 'meteor', msg: 'The spirits are crossing — happy Starfall, Jodi-Lee.' },
  { word: 'cauldron', fx: 'ripple', msg: "The Cauldron stirs… and decides it likes you. That's rare." },
  { word: 'mate',     fx: 'burst',  msg: "Somewhere, a bond just went TWANG. Rhys felt it. He's smug about it." },
  { word: 'prythian', fx: 'stairs', msg: 'All seven courts turn toward the sound of their name.' },
]

export function useSecrets() {
  let buffer = ''
  const eggs  = useEggsStore()
  const { say } = useToast()
  const { burst } = useGsap()
  const reduced = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  function meteorShower() {
    if (reduced) return
    if (typeof document === 'undefined') return
    let n = 0
    const iv = setInterval(() => {
      n++
      const s = document.createElement('div')
      Object.assign(s.style, {
        position: 'fixed', zIndex: 9998, pointerEvents: 'none',
        width: '130px', height: '2px', borderRadius: '2px',
        background: 'linear-gradient(90deg,rgba(201,148,58,0),var(--burnished) 55%,#fff)',
        left: (Math.random() * 60) + 'vw',
        top: (2 + Math.random() * 30) + 'vh',
        opacity: 0,
      })
      s.setAttribute('aria-hidden', 'true')
      document.body.appendChild(s)
      import('gsap').then(({ default: gsap }) => {
        gsap.fromTo(s, { opacity: 0 }, {
          opacity: 1, x: '60vw', y: '26vh', rotate: 13,
          duration: 1.6, ease: 'power2.in',
          onComplete: () => s.remove(),
        })
      })
      if (n >= 16) clearInterval(iv)
    }, 260)
  }

  function ripple() {
    if (reduced) return
    if (typeof document === 'undefined') return
    ;[0, 350, 700].forEach((delay) => {
      setTimeout(() => {
        const r = document.createElement('div')
        const d = Math.max(window.innerWidth, window.innerHeight) * 1.4
        Object.assign(r.style, {
          position: 'fixed', borderRadius: '50%', pointerEvents: 'none',
          zIndex: 9997, border: '2px solid rgba(143,176,221,.7)',
          width: d + 'px', height: d + 'px',
          left: (window.innerWidth / 2 - d / 2) + 'px',
          top:  (window.innerHeight / 2 - d / 2) + 'px',
        })
        r.setAttribute('aria-hidden', 'true')
        document.body.appendChild(r)
        import('gsap').then(({ default: gsap }) => {
          gsap.fromTo(r, { opacity: 0.9, scale: 0.1 }, {
            opacity: 0, scale: 1, duration: 1.6, ease: 'power2.out',
            onComplete: () => r.remove(),
          })
        })
      }, delay)
    })
  }

  function stairs() {
    if (reduced) return
    if (typeof document === 'undefined') return
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        const s = document.createElement('span')
        s.textContent = '▂'
        s.setAttribute('aria-hidden', 'true')
        Object.assign(s.style, {
          position: 'fixed', bottom: '-20px', zIndex: 9998, pointerEvents: 'none',
          color: 'var(--burnished)', fontSize: (10 + i) + 'px',
          left: (30 + i * 3.4) + 'vw',
          textShadow: '0 0 8px var(--burnished)',
        })
        document.body.appendChild(s)
        import('gsap').then(({ default: gsap }) => {
          gsap.fromTo(s, { opacity: 0, y: 0 }, {
            opacity: 1, y: '-70vh', duration: 2.4, ease: 'power2.out',
            onComplete: () => s.remove(),
          })
        })
      }, i * 140)
    }
  }

  function triggerEffect(fx) {
    if (fx === 'burst')  burst()
    if (fx === 'meteor') meteorShower()
    if (fx === 'ripple') ripple()
    if (fx === 'stairs') stairs()
  }

  function onKeydown(e) {
    if (e.key.length !== 1) return
    if (/input|textarea|select/i.test(e.target?.tagName || '')) return
    buffer = (buffer + e.key.toLowerCase()).slice(-14)
    for (const s of SECRETS) {
      if (buffer.endsWith(s.word)) {
        buffer = ''
        const isNew = eggs.find(s.word)
        triggerEffect(s.fx)
        const n = eggs.count
        say(s.msg + (isNew ? `  ·  whisper ${n} of 8 found` : ''))
        if (n === 8 && isNew) {
          setTimeout(() => say('★ All eight whispers heard… a hidden door has appeared in the navigation.'), 5000)
        }
        break
      }
    }
  }

  return { onKeydown }
}
