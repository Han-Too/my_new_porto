<script setup>
import { ChevronLeft, ChevronRight, ImageOff, X } from '@lucide/vue';
import { computed, ref, watch } from 'vue';

const props = defineProps({
  project: {
    type: Object,
    default: null,
  },
  startIndex: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['close']);

const index = ref(0);
const dialogRef = ref(null);

const images = computed(() => props.project?.images ?? []);
const currentImage = computed(() => images.value[index.value] ?? null);

const statusClass = {
  COMPLETED: 'is-completed',
  'IN PROGRESS': 'is-progress',
  ARCHIVED: 'is-archived',
};

watch(
  () => props.project,
  (project) => {
    index.value = project ? props.startIndex : 0;
    if (project) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => dialogRef.value?.focus());
    } else {
      document.body.style.overflow = '';
    }
  }
);

function next() {
  if (images.value.length < 2) return;
  index.value = (index.value + 1) % images.value.length;
}

function prev() {
  if (images.value.length < 2) return;
  index.value = (index.value - 1 + images.value.length) % images.value.length;
}

function close() {
  emit('close');
}

function onKeydown(event) {
  if (event.key === 'Escape') close();
  if (event.key === 'ArrowRight') next();
  if (event.key === 'ArrowLeft') prev();
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="project" class="project-modal-overlay" @click.self="close">
        <div
          ref="dialogRef"
          class="project-modal panel corner-brackets"
          role="dialog"
          aria-modal="true"
          :aria-label="`${project.title} — project preview`"
          tabindex="-1"
          @keydown="onKeydown"
        >
          <header class="project-modal__head">
            <div class="project-modal__head-info mono">
              <span class="project-modal__id">{{ project.id }}</span>
              <span class="project-modal__status" :class="statusClass[project.status]">
                {{ project.status }}
              </span>
            </div>
            <button class="project-modal__close" type="button" aria-label="Close preview" @click="close">
              <X :size="18" />
            </button>
          </header>

          <div class="project-modal__viewer">
            <button
              v-if="images.length > 1"
              class="project-modal__nav project-modal__nav--prev"
              type="button"
              aria-label="Previous image"
              @click="prev"
            >
              <ChevronLeft :size="20" />
            </button>

            <div class="project-modal__frame">
              <img
                v-if="currentImage"
                :src="currentImage"
                :alt="`${project.title} — screen ${index + 1} of ${images.length}`"
              />
              <div v-else class="project-modal__placeholder mono">
                <ImageOff :size="28" />
                <span>NO_PREVIEW_AVAILABLE</span>
              </div>
            </div>

            <button
              v-if="images.length > 1"
              class="project-modal__nav project-modal__nav--next"
              type="button"
              aria-label="Next image"
              @click="next"
            >
              <ChevronRight :size="20" />
            </button>
          </div>

          <div v-if="images.length > 1" class="project-modal__dots">
            <button
              v-for="(img, i) in images"
              :key="img"
              class="project-modal__dot"
              :class="{ 'is-active': i === index }"
              type="button"
              :aria-label="`Show image ${i + 1}`"
              :aria-current="i === index"
              @click="index = i"
            />
          </div>

          <div class="project-modal__meta mono">
            <h3 class="project-modal__title">{{ project.title }}</h3>
            <p class="project-modal__type">{{ project.type }} &middot; {{ project.year }} &middot; {{ project.stack.join(' / ') }}</p>
            <p class="project-modal__desc">{{ project.description }}</p>
            <div class="project-modal__actions">
              <a
                v-if="project.sourceUrl"
                :href="project.sourceUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn--ghost"
              >
                SOURCE
              </a>
              <a
                v-if="project.demoUrl"
                :href="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn"
              >
                LIVE DEMO
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.project-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(3, 5, 8, 0.82);
  backdrop-filter: blur(4px);
}

.project-modal {
  width: min(760px, 100%);
  max-height: min(720px, 90vh);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  outline: none;
}

.project-modal__head {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--line);
  z-index: 1;
}

.project-modal__head-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
}

.project-modal__id {
  color: var(--text-muted);
}

.project-modal__status {
  padding: 3px 9px;
  border: 1px solid currentColor;
  font-size: 0.62rem;
}

.is-completed {
  color: var(--ok);
}
.is-progress {
  color: var(--warn);
}
.is-archived {
  color: var(--text-muted);
}

.project-modal__close {
  background: transparent;
  border: 1px solid var(--line);
  color: var(--text-secondary);
  padding: 6px;
  display: inline-flex;
  transition: color 0.2s var(--ease), border-color 0.2s var(--ease);
}

.project-modal__close:hover,
.project-modal__close:focus-visible {
  color: var(--accent-secondary);
  border-color: var(--border-strong);
}

.project-modal__viewer {
  position: relative;
  display: flex;
  align-items: center;
  background: #000;
}

.project-modal__frame {
  width: 100%;
  aspect-ratio: 8 / 5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.project-modal__frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-modal__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: var(--text-muted);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
}

.project-modal__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  background: rgba(5, 7, 10, 0.6);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: 8px;
  display: inline-flex;
  transition: background-color 0.2s var(--ease), border-color 0.2s var(--ease);
}

.project-modal__nav:hover,
.project-modal__nav:focus-visible {
  background: rgba(0, 191, 255, 0.16);
  border-color: var(--border-strong);
}

.project-modal__nav--prev {
  left: 12px;
}

.project-modal__nav--next {
  right: 12px;
}

.project-modal__dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--line);
}

.project-modal__dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border: 1px solid var(--border-strong);
  background: transparent;
}

.project-modal__dot.is-active {
  background: var(--accent-secondary);
  box-shadow: 0 0 8px var(--accent-secondary);
}

.project-modal__meta {
  padding: 20px 22px 24px;
}

.project-modal__title {
  font-family: var(--font-body);
  font-size: 1.15rem;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.project-modal__type {
  font-size: 0.72rem;
  color: var(--accent-secondary);
  letter-spacing: 0.05em;
  margin-bottom: 14px;
}

.project-modal__desc {
  font-family: var(--font-body);
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 20px;
}

.project-modal__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s var(--ease);
}

.modal-enter-active .project-modal,
.modal-leave-active .project-modal {
  transition: opacity 0.2s var(--ease), transform 0.25s var(--ease);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .project-modal,
.modal-leave-to .project-modal {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .modal-enter-active,
  .modal-leave-active,
  .modal-enter-active .project-modal,
  .modal-leave-active .project-modal {
    transition: none;
  }
}

@media (max-width: 560px) {
  .project-modal-overlay {
    padding: 0;
    align-items: stretch;
  }

  .project-modal {
    width: 100%;
    max-height: 100vh;
    height: 100%;
  }
}
</style>
