<script setup>
// Fixed, decorative, pointer-events: none layer — animated grid + a single
// slow scanline. Purely atmospheric, never interferes with content or a11y.
</script>

<template>
  <div class="bg-fx" aria-hidden="true">
    <div class="bg-fx__grid" />
    <div class="bg-fx__scanline" />
    <div class="bg-fx__vignette" />
  </div>
</template>

<style scoped>
.bg-fx {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.bg-fx__grid {
  position: absolute;
  inset: -1px;
  background-image: linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%);
  opacity: 0.6;
}

.bg-fx__scanline {
  position: absolute;
  left: 0;
  right: 0;
  height: 140px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(0, 191, 255, 0.05) 45%,
    rgba(0, 229, 255, 0.09) 50%,
    rgba(0, 191, 255, 0.05) 55%,
    transparent
  );
  animation: scan 14s linear infinite;
}

.bg-fx__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 90% 70% at 50% -10%, transparent 40%, var(--bg-primary) 100%);
}

@keyframes scan {
  0% {
    transform: translateY(-160px);
  }
  100% {
    transform: translateY(110vh);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bg-fx__scanline {
    animation: none;
    opacity: 0.3;
  }
}
</style>
