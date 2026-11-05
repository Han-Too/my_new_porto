import { onBeforeUnmount, onMounted, ref } from 'vue';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Types a list of lines into a ref one character at a time, like a boot
 * log. Falls back to rendering everything instantly for reduced motion.
 */
export function useTypewriter(lines, { charDelay = 14, lineDelay = 220, autoplay = true } = {}) {
  const renderedLines = ref([]);
  const isDone = ref(false);
  let cancelled = false;

  async function play() {
    if (!autoplay || prefersReducedMotion()) {
      renderedLines.value = [...lines];
      isDone.value = true;
      return;
    }

    for (const line of lines) {
      if (cancelled) return;
      let current = '';
      renderedLines.value = [...renderedLines.value, current];
      const targetIndex = renderedLines.value.length - 1;

      if (line.length === 0) {
        await wait(lineDelay / 2);
        continue;
      }

      for (const char of line) {
        if (cancelled) return;
        current += char;
        renderedLines.value = renderedLines.value.map((text, i) =>
          i === targetIndex ? current : text
        );
        await wait(charDelay);
      }
      await wait(lineDelay);
    }
    isDone.value = true;
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  onMounted(play);
  onBeforeUnmount(() => {
    cancelled = true;
  });

  return { renderedLines, isDone };
}
