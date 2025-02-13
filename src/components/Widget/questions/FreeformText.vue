<script setup lang="ts">
import { ref } from "vue";
import type { FreeformTextQuestion } from "../../../types";

const props = defineProps<{
  question: FreeformTextQuestion;
}>();

const handleChange = (e: Event) => {
  const value = (e.target as HTMLTextAreaElement).value;
  emit("update", value);
};

const emit = defineEmits<{
  (e: "update", value: string): void;
}>();

const answer = ref("");
</script>

<template>
  <div class="question-container">
    <div class="input-wrapper">
      <textarea
        v-model="answer"
        rows="6"
        class="form-input"
        placeholder="Enter your answer here..."
      ></textarea>
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
  border-radius: 12px;
  outline: none;
  resize: vertical;
  min-height: 150px;
  font-size: 1rem;
  font-family: "Inter", sans-serif;
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
</style>
