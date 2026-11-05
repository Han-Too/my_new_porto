<script setup>
import { onBeforeUnmount, ref } from 'vue';

const props = defineProps({
  name: { type: String, required: true },
  level: { type: Number, required: true },
});

const barRef = ref(null);
const displayLevel = ref(0);
let observer;

function onMounted(el) {
  if (!el) return;
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        displayLevel.value = props.level;
        observer.disconnect();
      }
    },
    { threshold: 0.4 }
  );
  observer.observe(el);
}

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <div class="skill-item" :ref="onMounted">
    <div class="skill-item__row mono">
      <span class="skill-item__name">{{ name }}</span>
      <span class="skill-item__level">{{ displayLevel }}%</span>
    </div>
    <div class="skill-item__track" role="progressbar" :aria-valuenow="level" aria-valuemin="0" aria-valuemax="100" :aria-label="name">
      <div class="skill-item__fill" :style="{ width: displayLevel + '%' }" />
      <div class="skill-item__ticks" />
    </div>
  </div>
</template>

<style scoped>
.skill-item {
  padding-block: 10px;
}

.skill-item__row {
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
  margin-bottom: 8px;
}

.skill-item__name {
  color: var(--text-primary);
}

.skill-item__level {
  color: var(--accent-secondary);
}

.skill-item__track {
  position: relative;
  height: 6px;
  background: var(--bg-elevated);
  border: 1px solid var(--line);
  overflow: hidden;
}

.skill-item__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-dim), var(--accent-secondary));
  transition: width 1.1s var(--ease);
  box-shadow: 0 0 10px -2px var(--accent-secondary);
}

.skill-item__ticks {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.4) 0,
    rgba(0, 0, 0, 0.4) 1px,
    transparent 1px,
    transparent 10%
  );
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .skill-item__fill {
    transition: none;
  }
}
</style>
