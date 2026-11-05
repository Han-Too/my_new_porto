<script setup>
import { ref } from 'vue';
import ProjectCard from '../components/ProjectCard.vue';
import ProjectModal from '../components/ProjectModal.vue';
import SectionHeader from '../components/SectionHeader.vue';
import { projects } from '../data/projects';

const activeProject = ref(null);
const activeStartIndex = ref(0);

function openProject({ project, startIndex }) {
  activeProject.value = project;
  activeStartIndex.value = startIndex;
}

function closeProject() {
  activeProject.value = null;
}
</script>

<template>
  <section id="projects" class="projects section" data-coord="REPOSITORY / MODULES">
    <div class="container">
      <SectionHeader index="04" title="Projects" label="// selected system modules" />

      <div class="projects__grid">
        <div v-for="(project, i) in projects" :key="project.id" v-reveal="i * 70">
          <ProjectCard :project="project" @view="openProject" />
        </div>
      </div>
    </div>

    <ProjectModal :project="activeProject" :start-index="activeStartIndex" @close="closeProject" />
  </section>
</template>

<style scoped>
.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 22px;
}

.projects__grid > div {
  height: 100%;
}

.projects__grid :deep(.project-card) {
  height: 100%;
}
</style>
