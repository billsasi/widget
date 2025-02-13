<script setup lang="ts">
import { ref, watch } from "vue";
import type { ImageEnumeratedQuestion } from "../../../types";
import { useGuidanceStore } from "../../../stores/guidance-store";

const props = defineProps<{
  question: ImageEnumeratedQuestion;
}>();

const selectedAnswer = ref<string | null>(null);

const store = useGuidanceStore();

watch(selectedAnswer, (newValue) => {
  if (newValue !== null) {
    store.setAnswer(props.question.id, newValue);
  }
});
</script>

<template>
  <div class="question-container">
    <div class="images-container">
      <button
        v-for="choice of props.question.answerChoices"
        class="answer-option"
        :class="{ selected: selectedAnswer === choice.value }"
        @click="selectedAnswer = choice.value"
      >
        <div class="image-wrapper">
          <img :src="choice.url" :alt="choice.label" />
        </div>
        <span class="answer-label">{{ choice.label }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.question-container {
  width: 100%;
  padding: 16px;
}

.images-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.answer-option {
  display: flex;
  flex-direction: column;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  background: white;
  overflow: hidden;
}

.answer-option:hover {
  box-shadow: 0 4px 20px rgba(74, 144, 226, 0.15);
}

.image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
}

.answer-option img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.answer-option.selected {
  border-color: var(--primary-color, #4a90e2);
  box-shadow: 0 0 0 2px var(--primary-color, #4a90e2);
}

.answer-label {
  color: #1a202c;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
}

@media (max-width: 768px) {
  .images-container {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .answer-option {
    flex-direction: row;
    align-items: center;
    padding: 8px;
  }

  .image-wrapper {
    width: 140px;
    margin-bottom: 0;
    margin-right: 12px;
  }

  .answer-label {
    text-align: left;
    flex: 1;
  }
}
</style>
