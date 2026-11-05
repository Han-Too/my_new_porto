<script setup>
import { reactive, ref } from 'vue';

const form = reactive({ name: '', email: '', message: '' });
const errors = reactive({ name: '', email: '', message: '' });

const status = ref('idle'); // idle | sending | sent
const log = ref([]);

function validate() {
  errors.name = form.name.trim().length > 1 ? '' : 'REQUIRED — min. 2 characters';
  errors.email = /^\S+@\S+\.\S+$/.test(form.email) ? '' : 'INVALID FORMAT';
  errors.message = form.message.trim().length > 9 ? '' : 'REQUIRED — min. 10 characters';
  return !errors.name && !errors.email && !errors.message;
}

async function onSubmit() {
  if (status.value === 'sending') return;
  if (!validate()) return;

  status.value = 'sending';
  log.value = ['> sending payload...'];

  await wait(650);
  log.value.push('> connection established');

  await wait(650);
  log.value.push('> message transmitted successfully.');
  status.value = 'sent';

  await wait(2200);
  if (status.value === 'sent') {
    form.name = '';
    form.email = '';
    form.message = '';
    status.value = 'idle';
    log.value = [];
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
</script>

<template>
  <form class="contact-form panel corner-brackets" novalidate @submit.prevent="onSubmit">
    <p class="contact-form__intro mono">&gt; connection.request()</p>

    <div class="contact-form__field">
      <label class="mono" for="cf-name">NAME</label>
      <input
        id="cf-name"
        v-model="form.name"
        type="text"
        class="mono"
        placeholder="Your Name"
        :aria-invalid="!!errors.name"
        aria-describedby="cf-name-error"
        :disabled="status !== 'idle'"
      />
      <span v-if="errors.name" id="cf-name-error" class="contact-form__error mono">{{ errors.name }}</span>
    </div>

    <div class="contact-form__field">
      <label class="mono" for="cf-email">EMAIL</label>
      <input
        id="cf-email"
        v-model="form.email"
        type="email"
        class="mono"
        placeholder="you@email.com"
        :aria-invalid="!!errors.email"
        aria-describedby="cf-email-error"
        :disabled="status !== 'idle'"
      />
      <span v-if="errors.email" id="cf-email-error" class="contact-form__error mono">{{ errors.email }}</span>
    </div>

    <div class="contact-form__field">
      <label class="mono" for="cf-message">MESSAGE</label>
      <textarea
        id="cf-message"
        v-model="form.message"
        rows="5"
        class="mono"
        placeholder="Write your message..."
        :aria-invalid="!!errors.message"
        aria-describedby="cf-message-error"
        :disabled="status !== 'idle'"
      />
      <span v-if="errors.message" id="cf-message-error" class="contact-form__error mono">{{ errors.message }}</span>
    </div>

    <button type="submit" class="btn contact-form__submit" :disabled="status === 'sending'">
      {{ status === 'sending' ? 'TRANSMITTING...' : status === 'sent' ? 'MESSAGE SENT' : 'SEND_MESSAGE' }}
    </button>

    <div v-if="log.length" class="contact-form__log mono" role="status" aria-live="polite">
      <p v-for="(line, i) in log" :key="i" :class="{ 'is-ok': line.includes('successfully') }">{{ line }}</p>
    </div>
  </form>
</template>

<style scoped>
.contact-form {
  padding: 26px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.contact-form__intro {
  font-size: 0.8rem;
  color: var(--accent-secondary);
}

.contact-form__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-form__field label {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
}

.contact-form__field input,
.contact-form__field textarea {
  width: 100%;
  background: var(--bg-elevated);
  border: 1px solid var(--line);
  color: var(--text-primary);
  padding: 12px 14px;
  font-size: 0.85rem;
  resize: vertical;
  transition: border-color 0.2s var(--ease), box-shadow 0.2s var(--ease);
}

.contact-form__field input::placeholder,
.contact-form__field textarea::placeholder {
  color: var(--text-muted);
}

.contact-form__field input:focus,
.contact-form__field textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(0, 191, 255, 0.12);
}

.contact-form__field input[aria-invalid='true'],
.contact-form__field textarea[aria-invalid='true'] {
  border-color: var(--danger);
}

.contact-form__error {
  font-size: 0.68rem;
  color: var(--danger);
  letter-spacing: 0.04em;
}

.contact-form__submit {
  align-self: flex-start;
  margin-top: 4px;
}

.contact-form__submit:disabled {
  opacity: 0.7;
  cursor: progress;
}

.contact-form__log {
  border-top: 1px dashed var(--line);
  padding-top: 14px;
  font-size: 0.78rem;
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-form__log .is-ok {
  color: var(--ok);
}
</style>
