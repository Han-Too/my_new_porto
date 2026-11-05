<script setup>
import { Menu, X } from '@lucide/vue';
import { ref } from 'vue';
import { navLinks } from '../data/nav';

const props = defineProps({
  activeId: {
    type: String,
    default: 'home',
  },
});

const isOpen = ref(false);

function scrollTo(id) {
  isOpen.value = false;
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
</script>

<template>
  <header class="navbar">
    <div class="navbar__inner container">
      <a href="#home" class="navbar__brand mono" @click.prevent="scrollTo('home')">
        <span class="navbar__brand-bracket">[</span>
        DEV.LOG
        <span class="navbar__brand-bracket">]</span>
      </a>

      <nav class="navbar__links" aria-label="Section navigation">
        <button
          v-for="link in navLinks"
          :key="link.id"
          class="navbar__link mono"
          :class="{ 'is-active': activeId === link.id }"
          type="button"
          @click="scrollTo(link.id)"
        >
          <span class="navbar__link-index">{{ link.index }}</span>
          {{ link.label }}
        </button>
      </nav>

      <div class="navbar__status mono">
        <span class="navbar__dot" />
        SYS.ONLINE
      </div>

      <button
        class="navbar__toggle"
        type="button"
        :aria-expanded="isOpen"
        aria-label="Toggle navigation menu"
        @click="isOpen = !isOpen"
      >
        <X v-if="isOpen" :size="20" />
        <Menu v-else :size="20" />
      </button>
    </div>

    <transition name="menu">
      <nav v-if="isOpen" class="navbar__mobile mono" aria-label="Mobile navigation">
        <button
          v-for="link in navLinks"
          :key="link.id"
          class="navbar__mobile-link"
          :class="{ 'is-active': activeId === link.id }"
          type="button"
          @click="scrollTo(link.id)"
        >
          <span class="navbar__link-index">{{ link.index }}</span>
          {{ link.label }}
        </button>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: var(--nav-height);
  background: rgba(5, 7, 10, 0.78);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}

.navbar__inner {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 32px;
}

.navbar__brand {
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--text-primary);
  flex-shrink: 0;
}

.navbar__brand-bracket {
  color: var(--accent-secondary);
}

.navbar__links {
  display: flex;
  gap: 4px;
  margin-left: 12px;
}

.navbar__link {
  background: transparent;
  border: none;
  padding: 8px 14px;
  font-size: 0.72rem;
  letter-spacing: 0.09em;
  color: var(--text-secondary);
  border-bottom: 2px solid transparent;
  transition: color 0.2s var(--ease), border-color 0.2s var(--ease);
}

.navbar__link:hover {
  color: var(--text-primary);
}

.navbar__link.is-active {
  color: var(--accent-secondary);
  border-color: var(--accent-secondary);
}

.navbar__link-index {
  color: var(--text-muted);
  margin-right: 6px;
}

.navbar__link.is-active .navbar__link-index {
  color: var(--accent-secondary);
}

.navbar__status {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
}

.navbar__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--ok);
  box-shadow: 0 0 8px var(--ok);
}

.navbar__toggle {
  display: none;
  background: transparent;
  border: 1px solid var(--line);
  padding: 8px;
  color: var(--text-primary);
  margin-left: auto;
}

.navbar__mobile {
  display: none;
}

@media (max-width: 900px) {
  .navbar__links,
  .navbar__status {
    display: none;
  }

  .navbar__toggle {
    display: inline-flex;
  }

  .navbar__mobile {
    display: flex;
    flex-direction: column;
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--line);
    padding: 8px var(--gutter) 18px;
  }

  .navbar__mobile-link {
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--line);
    text-align: left;
    padding: 14px 4px;
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    color: var(--text-secondary);
  }

  .navbar__mobile-link:last-child {
    border-bottom: none;
  }

  .navbar__mobile-link.is-active {
    color: var(--accent-secondary);
  }
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s var(--ease), transform 0.2s var(--ease);
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
