<script setup lang="ts">
import { useGuidanceStore } from "../../stores/guidance-store";
import { computed } from "vue";

const props = defineProps<{
  onClose: () => void;
}>();

const store = useGuidanceStore();

const handleQuestionClick = (questionId: string) => {
  store.goToQuestion(questionId);
  props.onClose();
};

const allQuestions = computed(() => {
  return store.questions.flatMap((page) =>
    page.questions.map((q) => ({
      ...q,
      answer: store.answers[q.id]?.value || undefined,
    }))
  );
});
</script>

<template>
  <div class="menu-overlay" @click="$emit('close')">
    <div class="menu-content" @click.stop>
      <div class="menu-header">
        <h2>All Questions</h2>
        <button class="close-button" @click="$emit('close')">×</button>
      </div>

      <div class="questions-list">
        <div
          v-for="question in allQuestions"
          :key="question.id"
          class="question-item"
          :class="{ answered: question.answer }"
          @click="handleQuestionClick(question.id)"
        >
          <div class="question-text">{{ question.text }}</div>
          <div v-if="question.answer" class="answer-preview">
            {{ question.answer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.menu-content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  background: white;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.close-button {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #4a5568;
}

.questions-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
}

.question-item {
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
}

.question-item:hover {
  background: #f7fafc;
}

.question-item.answered {
  border-left: 3px solid var(--primary-color, #4a90e2);
}

.question-text {
  font-weight: 500;
  margin-bottom: 4px;
}

.answer-preview {
  font-size: 0.875rem;
  color: #718096;
}
</style>
