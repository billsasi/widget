<script setup lang="ts">
import { useGuidanceStore } from "../../../stores/guidance-store";

const guidanceStore = useGuidanceStore();

const handleFeedback = async (isHelpful: boolean) => {
  await guidanceStore.submitFeedback(isHelpful);
};
</script>

<template>
  <div class="solution-page">
    <h2 class="title">Recommended Solution</h2>

    <div class="solution-content">
      <p class="solution-text">{{ guidanceStore.solution }}</p>
    </div>

    <div v-if="!guidanceStore.feedbackSubmitted" class="feedback-section">
      <p class="feedback-question">Was this solution helpful?</p>
      <div class="feedback-buttons">
        <button @click="handleFeedback(true)" class="feedback-button positive">
          Yes, it helped
        </button>
        <button @click="handleFeedback(false)" class="feedback-button negative">
          No, not really
        </button>
      </div>
    </div>

    <div v-else class="feedback-submitted">
      <p>Thank you for your feedback!</p>
    </div>
  </div>
</template>

<style scoped>
.solution-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 16px;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 24px;
  text-align: center;
}

.solution-content {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  margin-bottom: 32px;
}

.solution-text {
  line-height: 1.6;
  color: #1a202c;
}

.feedback-section {
  text-align: center;
  margin-bottom: 32px;
}

.feedback-question {
  font-weight: 500;
  margin-bottom: 16px;
}

.feedback-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.feedback-button {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.feedback-button.positive {
  background-color: #48bb78;
  color: white;
  border: none;
}

.feedback-button.negative {
  background-color: #f56565;
  color: white;
  border: none;
}

.feedback-submitted {
  text-align: center;
  color: #48bb78;
  margin-bottom: 32px;
}

.start-over-button {
  display: block;
  margin: 0 auto;
  padding: 12px 24px;
  background: none;
  border: 2px solid var(--primary-color, #4a90e2);
  color: var(--primary-color, #4a90e2);
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.start-over-button:hover {
  background: var(--primary-color, #4a90e2);
  color: white;
}
</style>
