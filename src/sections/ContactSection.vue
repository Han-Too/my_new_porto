<script setup>
import { AtSign, FolderGit2, Link2, Mail, MapPin, Phone } from '@lucide/vue';
import ContactForm from '../components/ContactForm.vue';
import SectionHeader from '../components/SectionHeader.vue';
import { address, socials } from '../data/profile';

const icons = { mail: Mail, phone: Phone, github: FolderGit2, linkedin: Link2, social: AtSign };
</script>

<template>
  <section id="contact" class="contact section" data-coord="ESTABLISH_CONNECTION">
    <div class="container">
      <SectionHeader index="05" title="Establish_Connection" label="// connection.request()" />

      <div class="contact__grid">
        <div class="contact__info" v-reveal>
          <p class="contact__lead">
            Looking for work to further develop and grow together — open for job opportunities,
            collaboration, or just a technical conversation.
          </p>

          <ul class="contact__list mono">
            <li class="contact__list-item">
              <MapPin :size="16" class="contact__icon" />
              <div>
                <p class="contact__list-label">ADDRESS</p>
                <span class="contact__list-value">{{ address }}</span>
              </div>
            </li>
            <li v-for="item in socials" :key="item.label" class="contact__list-item">
              <component :is="icons[item.icon]" :size="16" class="contact__icon" />
              <div>
                <p class="contact__list-label">{{ item.label }}</p>
                <a :href="item.href" class="contact__list-value" target="_blank" rel="noopener noreferrer">
                  {{ item.value }}
                </a>
              </div>
            </li>
          </ul>

          <p class="contact__log mono">BUILD: 2026 &middot; STATUS: STABLE &middot; UPTIME: 99.9%</p>
        </div>

        <div v-reveal="120">
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  border-bottom: none;
}

.contact__grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: clamp(32px, 5vw, 64px);
  align-items: start;
}

.contact__lead {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.7;
  max-width: 46ch;
}

.contact__list {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact__list-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.contact__icon {
  color: var(--accent-secondary);
  margin-top: 3px;
  flex-shrink: 0;
}

.contact__list-label {
  margin: 0 0 4px;
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  color: var(--text-muted);
}

.contact__list-value {
  font-size: 0.85rem;
  color: var(--text-primary);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s var(--ease), color 0.2s var(--ease);
}

.contact__list-value:hover {
  color: var(--accent-secondary);
  border-color: var(--border-strong);
}

.contact__log {
  margin-top: 40px;
  font-size: 0.68rem;
  color: var(--text-muted);
  letter-spacing: 0.06em;
}

@media (max-width: 900px) {
  .contact__grid {
    grid-template-columns: 1fr;
  }
}
</style>
