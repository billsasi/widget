<script setup lang="ts">
import { ref, inject } from "vue";
import { useGuidanceStore } from "../../../stores/guidance-store";

const guidanceStore = useGuidanceStore();
const problemDescription = ref("");
const isSubmitting = ref(false);
const logoUrl = inject<string | undefined>("logoUrl");

const handleSubmit = async () => {
  if (!problemDescription.value.trim()) return;

  isSubmitting.value = true;
  try {
    await guidanceStore.submitProblemDescription(problemDescription.value);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="start-page">
    <div class="top">
      <img v-if="logoUrl" :src="logoUrl" class="logo" alt="Logo" />
      <h1 class="subtitle">What can I help you with today?</h1>
    </div>

    <div class="input-container">
      <textarea
        v-model="problemDescription"
        placeholder="Tell us about your problem..."
        :disabled="isSubmitting"
        rows="6"
        class="problem-input"
      ></textarea>

      <button
        @click="handleSubmit"
        :disabled="!problemDescription.trim() || isSubmitting"
        class="submit-button"
      >
        <span v-if="isSubmitting">Loading...</span>
        <span v-else>Get Started</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.start-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 16px;
}

.top {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.top img {
  height: 80px;
  width: auto;
  object-fit: contain;
  margin-left: 16px;
  margin-bottom: 16px;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 12px;
  text-align: center;
}

.subtitle {
  color: #4a5568;
  text-align: center;
  margin-bottom: 24px;
  font-family: var(--font-family);
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.problem-input {
  width: 100%;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: var(--border-radius);
  font-size: var(--font-size-base);
  font-family: var(--font-family);
  resize: vertical;
  min-height: 150px;
  outline: none;
  transition: all 0.2s ease;
}

.problem-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-color);
}

.submit-button {
  padding: 12px 24px;
  background-color: var(--primary-color, #4a90e2);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-button:not(:disabled):hover {
  opacity: 0.9;
}

@media (max-width: 840px) {
  .start-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
