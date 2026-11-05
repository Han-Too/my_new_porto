// Global `v-reveal` directive: adds `data-reveal` + toggles `is-visible`
// when the element enters the viewport. Styling lives in style.css so this
// stays purely behavioral. Optional modifier value = extra delay in ms.
const observer =
  typeof window !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const delay = Number(el.dataset.revealDelay || 0);
              setTimeout(() => el.classList.add('is-visible'), delay);
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
      )
    : null;

export const vReveal = {
  mounted(el, binding) {
    el.setAttribute('data-reveal', '');
    if (binding.value) {
      el.dataset.revealDelay = binding.value;
    }
    observer?.observe(el);
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};
