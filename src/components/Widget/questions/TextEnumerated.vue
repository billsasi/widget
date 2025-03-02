<template>
  <div class="question-container">
    <div class="choices-container" role="radiogroup">
      <button
        v-for="choice in props.question.answerChoices"
        :key="choice.value"
        class="answer-option"
        :class="{ selected: selectedAnswer === choice.value }"
        @click="handleSelect(choice.value)"
        role="radio"
        :aria-checked="selectedAnswer === choice.value"
      >
        <span class="answer-text">{{ choice.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { TextEnumeratedQuestion } from "../../../types";
import { useGuidanceStore } from "../../../stores/guidance-store";

const props = defineProps<{
  question: TextEnumeratedQuestion;
}>();

const store = useGuidanceStore();
const selectedAnswer = ref<string | null>(null);

const handleSelect = (value: string) => {
  selectedAnswer.value = value;
  store.setAnswer(props.question.id, value);
};

watch(
  () => store.answers[props.question.id]?.value,
  (newValue) => {
    if (newValue) {
      selectedAnswer.value = newValue;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.question-container {
  width: 100%;
  padding: 16px;
}

.choices-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 800px;
  margin: 0 auto;
}

.answer-option {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
  text-align: left;
  font-family: var(--font-family);
  font-size: var(--font-size-base);
}

.answer-option:hover {
  border-color: var(--primary-color);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.answer-option.selected {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-color);
}

.answer-text {
  color: #1a202c;
  font-size: var(--font-size-base);
  font-weight: 500;
}
</style>
