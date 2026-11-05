<script setup>
import { ExternalLink, FolderGit2, ImageOff, Images } from '@lucide/vue';
import { ref } from 'vue';

const props = defineProps({
  project: { type: Object, required: true },
});

const emit = defineEmits(['view']);

const cardRef = ref(null);

function openGallery(startIndex = 0) {
  emit('view', { project: props.project, startIndex });
}

function onPointerMove(event) {
  const card = cardRef.value;
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  card.style.setProperty('--x', `${x}%`);
  card.style.setProperty('--y', `${y}%`);
}

const statusClass = {
  COMPLETED: 'is-completed',
  'IN PROGRESS': 'is-progress',
  ARCHIVED: 'is-archived',
};
</script>

<template>
  <article
    ref="cardRef"
    class="project-card panel"
    @pointermove="onPointerMove"
  >
    <div class="project-card__glow" aria-hidden="true" />

    <header class="project-card__head">
      <span class="project-card__id mono">{{ project.id }}</span>
      <span class="project-card__status mono" :class="statusClass[project.status]">
        {{ project.status }}
      </span>
    </header>

    <div class="project-card__rule" />

    <dl class="project-card__meta mono">
      <div class="project-card__meta-row">
        <dt>SYSTEM</dt>
        <dd>{{ project.title.toUpperCase() }}</dd>
      </div>
      <div class="project-card__meta-row">
        <dt>TYPE</dt>
        <dd>{{ project.type }}</dd>
      </div>
      <div class="project-card__meta-row">
        <dt>YEAR</dt>
        <dd>{{ project.year }}</dd>
      </div>
      <div class="project-card__meta-row">
        <dt>STACK</dt>
        <dd>{{ project.stack.join(' / ') }}</dd>
      </div>
    </dl>

    <p class="project-card__desc">{{ project.description }}</p>

    <div class="project-card__preview">
      <span class="project-card__preview-label mono">PREVIEW</span>
      <div v-if="project.images.length" class="project-card__thumbs">
        <button
          v-for="(image, i) in project.images.slice(0, 3)"
          :key="image"
          type="button"
          class="project-card__thumb"
          :aria-label="`Open ${project.title} preview ${i + 1}`"
          @click="openGallery(i)"
        >
          <img :src="image" :alt="`${project.title} thumbnail ${i + 1}`" loading="lazy" />
        </button>
      </div>
      <button v-else type="button" class="project-card__thumb project-card__thumb--empty" @click="openGallery(0)">
        <ImageOff :size="16" />
      </button>
    </div>

    <footer class="project-card__actions">
      <a
        v-if="project.sourceUrl"
        :href="project.sourceUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="project-card__action mono"
      >
        <FolderGit2 :size="14" /> SOURCE
      </a>
      <a
        v-if="project.demoUrl"
        :href="project.demoUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="project-card__action mono"
      >
        <ExternalLink :size="14" /> LIVE DEMO
      </a>
      <button type="button" class="project-card__action mono" @click="openGallery(0)">
        <Images :size="14" /> GALLERY
      </button>
    </footer>
  </article>
</template>

<style scoped>
.project-card {
  --x: 50%;
  --y: 50%;
  position: relative;
  padding: 22px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  transition: border-color 0.3s var(--ease), transform 0.3s var(--ease);
}

.project-card:hover {
  border-color: var(--border-strong);
  transform: translateY(-3px);
}

.project-card__glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(220px circle at var(--x) var(--y), rgba(0, 191, 255, 0.1), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s var(--ease);
  pointer-events: none;
}

.project-card:hover .project-card__glow {
  opacity: 1;
}

.project-card__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
}

.project-card__id {
  color: var(--text-muted);
}

.project-card__status {
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

.project-card__rule {
  height: 1px;
  background: var(--line);
}

.project-card__meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.74rem;
}

.project-card__meta-row {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 8px;
  margin: 0;
}

.project-card__meta-row dt {
  color: var(--text-muted);
}

.project-card__meta-row dd {
  margin: 0;
  color: var(--text-primary);
}

.project-card__desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.65;
  flex-grow: 1;
}

.project-card__preview {
  display: flex;
  align-items: center;
  gap: 12px;
}

.project-card__preview-label {
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  flex-shrink: 0;
}

.project-card__thumbs {
  display: flex;
  gap: 8px;
}

.project-card__thumb {
  width: 56px;
  height: 36px;
  padding: 0;
  overflow: hidden;
  background: var(--bg-elevated);
  border: 1px solid var(--line);
  transition: border-color 0.2s var(--ease), transform 0.2s var(--ease);
}

.project-card__thumb:hover,
.project-card__thumb:focus-visible {
  border-color: var(--border-strong);
  transform: translateY(-2px);
}

.project-card__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-card__thumb--empty {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
}

.project-card__actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.project-card__action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  background: transparent;
  border: 1px solid var(--line);
  color: var(--text-secondary);
  transition: color 0.2s var(--ease), border-color 0.2s var(--ease);
}

.project-card__action:hover,
.project-card__action:focus-visible {
  color: var(--accent-secondary);
  border-color: var(--border-strong);
}

@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-card__glow {
    transition: none;
  }
}
</style>
