<script setup lang="ts">
import { ref, watch } from "vue";
import type { FreeformTextQuestion } from "../../../types";
import { useGuidanceStore } from "../../../stores/guidance-store";

const props = defineProps<{
  question: FreeformTextQuestion;
}>();

const store = useGuidanceStore();
const answer = ref("");
const error = ref("");

const validate = (value: string) => {
  if (!value.trim()) {
    error.value = "Please provide an answer";
    return false;
  }
  if (value.length < 3) {
    error.value = "Answer must be at least 3 characters long";
    return false;
  }
  error.value = "";
  return true;
};

const handleChange = (e: Event) => {
  const value = (e.target as HTMLTextAreaElement).value;
  answer.value = value;

  if (validate(value)) {
    store.setAnswer(props.question.id, value);
  }
};

watch(
  () => store.answers[props.question.id]?.value,
  (newValue) => {
    if (newValue) {
      answer.value = newValue;
      validate(newValue);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="question-container">
    <div class="input-wrapper">
      <textarea
        v-model="answer"
        @input="handleChange"
        rows="6"
        class="form-input"
        :class="{ error: error }"
        placeholder="Enter your answer here..."
      ></textarea>
      <span v-if="error" class="error-message">{{ error }}</span>
    </div>
  </div>
</template>

<style scoped>
.question-container {
  width: 100%;
  padding: 16px;
}

.input-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.form-input {
  width: 100%;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: var(--border-radius);
  outline: none;
  resize: vertical;
  min-height: 150px;
  font-size: var(--font-size-base);
  font-family: var(--font-family);
  line-height: 1.5;
  color: #1a202c;
  transition: all 0.2s ease;
  background: white;
}

.form-input:hover {
  box-shadow: 0 4px 20px rgba(74, 144, 226, 0.15);
}

.form-input:focus {
  border-color: var(--primary-color, #4a90e2);
  box-shadow: 0 0 0 2px var(--primary-color, #4a90e2);
}

.form-input.error {
  border-color: #e53e3e;
}

.error-message {
  display: block;
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>
