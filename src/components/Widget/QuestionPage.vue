<script setup lang="ts">
import { computed } from "vue";
import { useGuidanceStore } from "../../stores/guidance-store";

import QuestionCard from "./QuestionCard.vue";

const guidanceStore = useGuidanceStore();

const currentPage = computed(() => guidanceStore.currentPage);
</script>

<template>
  <div class="page-container">
    <div v-if="guidanceStore.answeredQuestions.length > 0" class="answered-section">
      <h2 class="section-title">Previously Answered</h2>
      <QuestionCard
        v-for="question in guidanceStore.answeredQuestions"
        :key="question.id"
        :question="question"
        :answer="guidanceStore.answers[question.id]?.value"
        class="answered-question"
        @click="guidanceStore.goToQuestion(question.id)"
      />
    </div>
    
    <div class="current-questions">
      <h2 class="section-title">Current Questions</h2>
      <QuestionCard
        v-for="question in currentPage?.questions"
        :key="question.id"
        :question="question"
        :answer="guidanceStore.answers[question.id]?.value"
      />
    </div>
  </div>
</template>

<style scoped>
.page-container {
  padding: 16px;
}

.answered-section {
  margin-bottom: 32px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #4a5568;
}

.answered-question {
  opacity: 0.8;
  cursor: pointer;
}

.answered-question:hover {
  opacity: 1;
}
</style>
