<script setup lang="ts">
import { ref } from "vue";
import { useGuidanceStore } from "../../../stores/guidance-store";

const guidanceStore = useGuidanceStore();
const showFeedbackText = ref(false);
const feedbackText = ref("");

const handleFeedback = async (isHelpful: boolean) => {
  showFeedbackText.value = true;
};

const submitFeedback = async (isHelpful: boolean) => {
  await guidanceStore.submitFeedbackResponse(isHelpful, feedbackText.value);
  showFeedbackText.value = false;
};
</script>

<template>
  <div class="solution-page">
    <h2 class="title">Recommended Solution</h2>

    <div class="solution-content">
      <p class="solution-text">{{ guidanceStore.solution }}</p>
    </div>

    <div v-if="!guidanceStore.feedbackSubmitted" class="feedback-section">
      <p v-if="!showFeedbackText" class="feedback-question">
        Was this solution helpful?
      </p>
      <div v-if="!showFeedbackText" class="feedback-buttons">
        <button @click="handleFeedback(true)" class="feedback-button positive">
          Yes
        </button>
        <button @click="handleFeedback(false)" class="feedback-button negative">
          No
        </button>
      </div>

      <div v-else class="feedback-text-section">
        <p class="feedback-prompt">Would you like to tell us more?</p>
        <textarea
          v-model="feedbackText"
          class="feedback-textarea"
          placeholder="Your feedback helps us improve..."
          rows="4"
        ></textarea>
        <div class="feedback-submit-buttons">
          <button
            @click="submitFeedback(true)"
            class="feedback-button positive"
          >
            Submit Feedback
          </button>
          <button
            @click="showFeedbackText = false"
            class="feedback-button secondary"
          >
            Skip
          </button>
        </div>
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

.feedback-button.secondary {
  background-color: #e2e8f0;
  color: #4a5568;
  border: none;
}

.feedback-submitted {
  text-align: center;
  color: #48bb78;
  margin-bottom: 32px;
}

.feedback-text-section {
  max-width: 600px;
  margin: 0 auto;
}

.feedback-prompt {
  margin-bottom: 12px;
  color: #4a5568;
}

.feedback-textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 16px;
  font-family: inherit;
  resize: vertical;
}

.feedback-textarea:focus {
  outline: none;
  border-color: var(--primary-color, #4a90e2);
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.feedback-submit-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}
</style>
