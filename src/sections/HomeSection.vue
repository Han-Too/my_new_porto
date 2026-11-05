<script setup>
import { ArrowDown, ArrowUpRight } from '@lucide/vue';
import Terminal from '../components/Terminal.vue';
import { bootSequence, profile } from '../data/profile';

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
</script>

<template>
  <section id="home" class="home section" data-coord="LAT 06.39S / LON 106.74E">
    <div class="container home__grid">
      <div class="home__intro">
        <p class="eyebrow home__eyebrow" v-reveal>SYSTEM.PROFILE // {{ profile.status }}</p>

        <h1 class="home__name" v-reveal="60">
          {{ profile.name }}
        </h1>

        <p class="home__role mono" v-reveal="120">
          <span class="home__role-prompt">&gt;</span> {{ profile.role }}
        </p>

        <p class="home__tagline" v-reveal="180">{{ profile.tagline }}</p>

        <div class="home__cta" v-reveal="240">
          <button class="btn" type="button" @click="scrollTo('projects')">
            View Projects <ArrowUpRight :size="16" />
          </button>
          <button class="btn btn--ghost" type="button" @click="scrollTo('contact')">
            Contact Me
          </button>
        </div>

        <dl class="home__facts mono" v-reveal="300">
          <div>
            <dt>LOCATION</dt>
            <dd>{{ profile.location }}</dd>
          </div>
          <div>
            <dt>FOCUS</dt>
            <dd>{{ profile.focus }}</dd>
          </div>
          <div>
            <dt>BUILD</dt>
            <dd>{{ profile.buildYear }}</dd>
          </div>
        </dl>
      </div>

      <div class="home__console" v-reveal="150">
        <Terminal title="whoami.sh" :lines="bootSequence" />
      </div>
    </div>

    <button class="home__scroll-hint mono" type="button" @click="scrollTo('about')" aria-label="Scroll to About section">
      SCROLL <ArrowDown :size="14" />
    </button>
  </section>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: calc(var(--nav-height) + 40px);
}

.home__grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: clamp(32px, 6vw, 80px);
  align-items: center;
}

.home__eyebrow {
  margin-bottom: 18px;
}

.home__name {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: clamp(2.4rem, 6vw, 4.2rem);
  line-height: 1.05;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.home__role {
  margin-top: 14px;
  font-size: 1rem;
  color: var(--accent-secondary);
  letter-spacing: 0.02em;
}

.home__role-prompt {
  color: var(--text-muted);
}

.home__tagline {
  margin-top: 20px;
  max-width: 46ch;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.7;
}

.home__cta {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 34px;
}

.home__facts {
  display: flex;
  gap: clamp(20px, 4vw, 40px);
  margin-top: 46px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  flex-wrap: wrap;
}

.home__facts dt {
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  margin-bottom: 6px;
}

.home__facts dd {
  margin: 0;
  font-size: 0.82rem;
  font-family: var(--font-mono);
  color: var(--text-primary);
}

.home__console {
  min-width: 0;
}

.home__scroll-hint {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  animation: bob 2.4s ease-in-out infinite;
}

@keyframes bob {
  0%,
  100% {
    transform: translate(-50%, 0);
  }
  50% {
    transform: translate(-50%, 6px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home__scroll-hint {
    animation: none;
  }
}

@media (max-width: 980px) {
  .home__grid {
    grid-template-columns: 1fr;
  }

  .home__console {
    order: -1;
  }
}

@media (max-width: 480px) {
  .home {
    padding-top: calc(var(--nav-height) + 24px);
  }

  .home__cta {
    flex-direction: column;
    align-items: stretch;
  }

  .home__scroll-hint {
    display: none;
  }
}
</style>
