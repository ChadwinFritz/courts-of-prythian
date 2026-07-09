<!-- src/components/Toast.vue -->
<template>
  <Transition name="toast">
    <div v-if="visible" role="status">{{ message }}</div>
  </Transition>
</template>

<script setup>
import { useToast } from '../composables/useToast'
const { message, visible } = useToast()
</script>

<style scoped>
div {
  position:    fixed;
  left:        50%;
  bottom:      2.2rem;
  transform:   translateX(-50%);
  z-index:     var(--z-toast);
  background:  rgba(15, 11, 24, 0.96);
  border:      1px solid var(--burnished);
  color:       var(--moonwhite);
  padding:     1rem 1.5rem;
  max-width:   min(30rem, 88vw);
  font-family: var(--font-body);
  font-style:  italic;
  font-size:   1.15rem;
  text-align:  center;
  box-shadow:  0 0 40px rgba(180, 142, 240, 0.35);
}

.toast-enter-active, .toast-leave-active { transition: opacity 0.5s ease, transform 0.5s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(20px); }
</style>
