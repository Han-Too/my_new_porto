<script setup>
import { useTypewriter } from '../composables/useTypewriter';

const props = defineProps({
  title: {
    type: String,
    default: 'terminal',
  },
  lines: {
    type: Array,
    required: true,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
});

const { renderedLines, isDone } = useTypewriter(props.lines, { autoplay: props.autoplay });

function lineClass(line) {
  if (line.startsWith('$')) return 'line--prompt';
  if (line.startsWith('>')) return 'line--action';
  if (/^[A-Z ]+:/.test(line)) return 'line--field';
  return '';
}
</script>

<template>
  <div class="terminal panel corner-brackets">
    <div class="terminal__bar">
      <span class="terminal__dot terminal__dot--red" />
      <span class="terminal__dot terminal__dot--yellow" />
      <span class="terminal__dot terminal__dot--green" />
      <span class="terminal__title mono">{{ title }}</span>
    </div>
    <div class="terminal__body mono">
      <p v-for="(line, i) in renderedLines" :key="i" class="terminal__line" :class="lineClass(line)">
        <template v-if="line.includes(':') && lineClass(line) === 'line--field'">
          <span class="terminal__label">{{ line.split(':')[0] }}:</span>
          <span class="terminal__value">{{ line.split(':').slice(1).join(':') }}</span>
        </template>
        <template v-else>{{ line || ' ' }}</template>
        <span
          v-if="!isDone && i === renderedLines.length - 1"
          class="terminal__cursor"
          aria-hidden="true"
        />
      </p>
      <span v-if="isDone" class="terminal__cursor terminal__cursor--idle" aria-hidden="true" />
    </div>
  </div>
</template>

<style scoped>
.terminal {
  width: 100%;
  overflow: hidden;
}

.terminal__bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--line);
}

.terminal__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  opacity: 0.7;
}

.terminal__dot--red {
  background: #ff5c5c;
}
.terminal__dot--yellow {
  background: #ff9f43;
}
.terminal__dot--green {
  background: #3ddc84;
}

.terminal__title {
  margin-left: 8px;
  font-size: 0.7rem;
  color: var(--text-secondary);
  letter-spacing: 0.06em;
}

.terminal__body {
  padding: 20px;
  font-size: 0.82rem;
  line-height: 1.75;
  min-height: 260px;
}

.terminal__line {
  white-space: pre-wrap;
  word-break: break-word;
  color: var(--text-secondary);
}

.line--prompt {
  color: var(--text-primary);
}

.line--action {
  color: var(--accent-secondary);
}

.line--field {
  color: var(--text-secondary);
}

.terminal__label {
  color: var(--text-muted);
}

.terminal__value {
  color: var(--text-primary);
}

.terminal__cursor {
  display: inline-block;
  width: 7px;
  height: 1em;
  background: var(--accent-secondary);
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: blink 1s steps(1) infinite;
}

.terminal__cursor--idle {
  margin-left: 0;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .terminal__cursor {
    animation: none;
  }
}

@media (max-width: 480px) {
  .terminal__body {
    font-size: 0.74rem;
    padding: 16px;
    min-height: 220px;
  }
}
</style>
