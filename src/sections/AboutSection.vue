<script setup>
import SectionHeader from '../components/SectionHeader.vue';
import { profile } from '../data/profile';

const systemProfile = [
  { key: 'ROLE', value: profile.role },
  { key: 'EXPERIENCE', value: profile.experience },
  { key: 'LOCATION', value: profile.location },
  { key: 'FOCUS', value: profile.focus },
  { key: 'STATUS', value: profile.status },
];

const timeline = [
  {
    year: '2022',
    label: 'Internship — Bank BPR Sehat Sejahtera',
    detail:
      '17 Mar – 30 Jun 2022. Creating a Knowledge Management System using the PHP programming language with the Laravel framework.',
  },
  {
    year: '2022',
    label: 'Akademi Mobile App Developer',
    detail:
      '18 Aug – 31 Dec 2022. Independent Study Program by Kampus Merdeka with PT. Nurul Fikri Cipta Inovasi, focused on Flutter. Awarded a Certificate of Competency.',
  },
  {
    year: '2022',
    label: 'Junior Web Developer — PT. Kreditek Financial Access',
    detail: 'Dec 2022 – Present. Worked on several projects with the Laravel framework.',
  },
  {
    year: '2023',
    label: 'BNSP Programming Scheme Certificate',
    detail: 'Sep 2023. Obtained for completing the Competency Test with good grades.',
  },
];
</script>

<template>
  <section id="about" class="about section" data-coord="ABOUT.ME">
    <div class="container">
      <SectionHeader index="02" title="About.Me" label="// developer identity & background" />

      <div class="about__grid">
        <div class="about__profile panel corner-brackets" v-reveal>
          <div class="about__profile-head mono">
            <span>SYSTEM PROFILE</span>
            <span class="about__id">ID_0x2A7F</span>
          </div>
          <div class="about__rule" />
          <dl class="about__fields mono">
            <div v-for="field in systemProfile" :key="field.key" class="about__field">
              <dt>{{ field.key }}</dt>
              <dd :class="{ 'is-status': field.key === 'STATUS' }">{{ field.value }}</dd>
            </div>
          </dl>
        </div>

        <div class="about__body">
          <p v-for="(paragraph, i) in profile.bio" :key="i" class="about__paragraph" v-reveal="i * 90">
            {{ paragraph }}
          </p>

          <ol class="about__timeline mono">
            <li v-for="(item, i) in timeline" :key="item.label" class="about__timeline-item" v-reveal="i * 80">
              <span class="about__timeline-year">{{ item.year }}</span>
              <span class="about__timeline-node" aria-hidden="true" />
              <div class="about__timeline-copy">
                <p class="about__timeline-label">{{ item.label }}</p>
                <p class="about__timeline-detail">{{ item.detail }}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about__grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: clamp(28px, 5vw, 64px);
  align-items: start;
}

.about__profile {
  padding: 20px 22px;
  position: sticky;
  top: calc(var(--nav-height) + 24px);
}

.about__profile-head {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
}

.about__id {
  color: var(--text-muted);
}

.about__rule {
  height: 1px;
  background: var(--line);
  margin: 14px 0 16px;
}

.about__fields {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.about__field {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.76rem;
}

.about__field dt {
  color: var(--text-muted);
}

.about__field dd {
  margin: 0;
  color: var(--text-primary);
  text-align: right;
}

.about__field dd.is-status {
  color: var(--ok);
}

.about__paragraph {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.75;
  max-width: 62ch;
}

.about__paragraph + .about__paragraph {
  margin-top: 16px;
}

.about__timeline {
  margin-top: 44px;
  display: flex;
  flex-direction: column;
}

.about__timeline-item {
  display: grid;
  grid-template-columns: 56px 16px 1fr;
  gap: 4px 16px;
  position: relative;
  padding-bottom: 30px;
}

.about__timeline-item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 63px;
  top: 14px;
  bottom: -4px;
  width: 1px;
  background: var(--line);
}

.about__timeline-year {
  font-size: 0.72rem;
  color: var(--text-muted);
  padding-top: 2px;
}

.about__timeline-node {
  width: 8px;
  height: 8px;
  margin-top: 4px;
  border: 1.5px solid var(--accent-secondary);
  background: var(--bg-primary);
}

.about__timeline-label {
  margin: 0 0 4px;
  color: var(--text-primary);
  font-size: 0.9rem;
  font-family: var(--font-body);
}

.about__timeline-detail {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.85rem;
  line-height: 1.6;
}

@media (max-width: 900px) {
  .about__grid {
    grid-template-columns: 1fr;
  }

  .about__profile {
    position: static;
  }
}

@media (max-width: 480px) {
  .about__timeline-item {
    grid-template-columns: 44px 14px 1fr;
  }

  .about__timeline-item::before {
    left: 50px;
  }
}
</style>
