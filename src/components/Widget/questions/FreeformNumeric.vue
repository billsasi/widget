<template>
  <div class="question-container">
    <div class="input-wrapper">
      <input
        type="number"
        @input="handleChange"
        v-model="answer"
        class="form-input"
        :class="{ error: error }"
        placeholder="Enter a number..."
      />
      <span v-if="error" class="error-message">{{ error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { FreeformNumericQuestion } from "../../../types";
import { useGuidanceStore } from "../../../stores/guidance-store";

const props = defineProps<{
  question: FreeformNumericQuestion;
}>();

const store = useGuidanceStore();
const answer = ref("");
const error = ref("");

const validateNumber = (value: string) => {
  if (!value) {
    error.value = "This field is required";
    return false;
  }
  const num = Number(value);
  if (isNaN(num)) {
    error.value = "Please enter a valid number";
    return false;
  }
  error.value = "";
  return true;
};

const handleChange = () => {
  if (validateNumber(answer.value)) {
    store.setAnswer(props.question.id, Number(answer.value));
  }
};

watch(
  () => store.answers[props.question.id]?.value,
  (newValue) => {
    if (newValue) {
      answer.value = newValue;
      validateNumber(newValue);
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

.input-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.form-input {
  width: 100%;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  outline: none;
  font-size: 1rem;
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

.form-input::-webkit-inner-spin-button,
.form-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.error {
  border-color: #e53e3e;
}

.error-message {
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 4px;
}
</style>
