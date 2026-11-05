<script setup>
import SectionHeader from '../components/SectionHeader.vue';
import SkillItem from '../components/SkillItem.vue';
import { skillGroups } from '../data/skills';
</script>

<template>
  <section id="skills" class="skills section" data-coord="TECH_STACK">
    <div class="container">
      <SectionHeader index="03" title="Tech_Stack" label="// tools & languages in active rotation" />

      <div class="skills__grid">
        <div v-for="group in skillGroups" :key="group.category" class="skills__group panel" v-reveal>
          <div class="skills__group-head mono">
            <span class="skills__group-index">{{ group.index }}</span>
            <span class="skills__group-name">{{ group.category }}</span>
          </div>
          <div class="skills__group-body">
            <SkillItem v-for="item in group.items" :key="item.name" :name="item.name" :level="item.level" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.skills__group {
  padding: 22px;
}

.skills__group-head {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding-bottom: 16px;
  margin-bottom: 6px;
  border-bottom: 1px solid var(--line);
}

.skills__group-index {
  font-size: 1.4rem;
  color: var(--accent-dim);
  font-weight: 600;
}

.skills__group-name {
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  color: var(--text-primary);
}

.skills__group-body {
  display: flex;
  flex-direction: column;
}
</style>
