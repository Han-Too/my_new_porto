import { onBeforeUnmount, onMounted, ref } from 'vue';

/**
 * Tracks which section id is currently most visible in the viewport,
 * so the navbar can highlight the active entry without a router.
 */
export function useActiveSection(sectionIds) {
  const activeId = ref(sectionIds[0]);
  let observer;

  onMounted(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          activeId.value = visible[0].target.id;
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
  });

  onBeforeUnmount(() => observer?.disconnect());

  return { activeId };
}
