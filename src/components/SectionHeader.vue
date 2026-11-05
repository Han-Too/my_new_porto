<script setup>
defineProps({
  index: { type: String, required: true },
  total: { type: String, default: '05' },
  title: { type: String, required: true },
  label: { type: String, default: '' },
});
</script>

<template>
  <div class="section-header" v-reveal>
    <div class="section-header__index mono">{{ index }} / {{ total }}</div>
    <h2 class="section-header__title mono">{{ title }}</h2>
    <p v-if="label" class="section-header__label mono">{{ label }}</p>
    <div class="section-header__rule" />
  </div>
</template>

<style scoped>
.section-header {
  margin-bottom: clamp(36px, 6vw, 64px);
}

.section-header__index {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--accent-secondary);
  margin-bottom: 10px;
}

.section-header__title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  letter-spacing: 0.02em;
  color: var(--text-primary);
  text-transform: uppercase;
}

.section-header__label {
  margin-top: 8px;
  font-size: 0.72rem;
  color: var(--text-muted);
  letter-spacing: 0.08em;
}

.section-header__rule {
  margin-top: 20px;
  height: 1px;
  background: linear-gradient(90deg, var(--border-strong), transparent);
}
</style>
