<script setup>
import BackgroundFX from './components/BackgroundFX.vue';
import Navbar from './components/Navbar.vue';
import { useActiveSection } from './composables/useActiveSection';
import { profile } from './data/profile';
import AboutSection from './sections/AboutSection.vue';
import ContactSection from './sections/ContactSection.vue';
import HomeSection from './sections/HomeSection.vue';
import ProjectsSection from './sections/ProjectsSection.vue';
import SkillsSection from './sections/SkillsSection.vue';

const { activeId } = useActiveSection(['home', 'about', 'skills', 'projects', 'contact']);
</script>

<template>
  <BackgroundFX />
  <Navbar :active-id="activeId" />

  <main>
    <HomeSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <ContactSection />
  </main>

  <footer class="site-footer mono">
    <div class="container site-footer__inner">
      <span>&copy; {{ new Date().getFullYear() }} {{ profile.name }}</span>
      <span>BUILD {{ profile.buildYear }} &middot; STATUS: STABLE</span>
    </div>
  </footer>
</template>

<style scoped>
main {
  position: relative;
  z-index: 1;
}

.site-footer {
  position: relative;
  z-index: 1;
  padding-block: 24px;
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  color: var(--text-muted);
}

.site-footer__inner {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
