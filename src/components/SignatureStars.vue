<!-- src/components/SignatureStars.vue
     Constellation-web overlay — the design signature.
     Fine lines between stars at 4% opacity; hovers to 10% when parent card is hovered.
-->
<template>
  <svg
    class="constellation-web"
    aria-hidden="true"
    viewBox="0 0 400 300"
    preserveAspectRatio="xMidYMid slice"
  >
    <!-- constellation boundary lines, not stars -->
    <line v-for="(l, i) in lines" :key="i"
      :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2"
      stroke="#b48ef0"
    />
  </svg>
</template>

<script setup>
// 12 fixed lines forming a sparse constellation network
const lines = [
  { x1:  40, y1:  60, x2: 140, y2:  90 },
  { x1: 140, y1:  90, x2: 210, y2:  40 },
  { x1: 210, y1:  40, x2: 320, y2:  80 },
  { x1: 320, y1:  80, x2: 370, y2: 150 },
  { x1: 140, y1:  90, x2: 160, y2: 180 },
  { x1: 160, y1: 180, x2:  80, y2: 220 },
  { x1: 160, y1: 180, x2: 260, y2: 210 },
  { x1: 260, y1: 210, x2: 360, y2: 240 },
  { x1: 260, y1: 210, x2: 300, y2: 280 },
  { x1:  80, y1: 220, x2:  30, y2: 290 },
  { x1:  40, y1:  60, x2:  20, y2: 130 },
  { x1: 370, y1: 150, x2: 390, y2: 260 },
]
</script>

<style scoped>
.constellation-web {
  position:       absolute;
  inset:          0;
  width:          100%;
  height:         100%;
  pointer-events: none;
  overflow:       hidden;
}

line {
  stroke-width: 0.8;
  opacity:      0.04;
  transition:   opacity var(--dur-slow) ease;
}

/* Parent card hover illuminates the web */
:global(.card:hover) line,
:global(.door:hover) line,
:global(.journey:hover) line { opacity: 0.10; }
</style>
