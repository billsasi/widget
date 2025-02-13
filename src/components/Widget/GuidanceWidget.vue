<script setup lang="ts">
import { onMounted, ref } from "vue";
import QuestionPage from "./QuestionPage.vue";
import { useGuidanceStore } from "../../stores/guidance-store";
import AnswersMenu from "./AnswersMenu.vue";

const props = defineProps<{
  logoUrl?: string;
}>();

const guidanceStore = useGuidanceStore();
const isAnswersMenuOpen = ref(false);

onMounted(async () => {
  await guidanceStore.fetchQuestions();
});
</script>

<template>
  <div class="widget-container">
    <div class="widget-toolbar">
      <button class="toolbar-button" @click="isAnswersMenuOpen = true">
        View Answered
      </button>
      <img
        v-if="props.logoUrl"
        :src="props.logoUrl"
        class="toolbar-logo"
        alt="Logo"
      />
    </div>

    <div v-if="guidanceStore.loading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>

    <AnswersMenu v-if="isAnswersMenuOpen" @close="isAnswersMenuOpen = false" />

    <div class="widget-content">
      <QuestionPage v-if="!guidanceStore.loading" />
    </div>

    <div class="navigation">
      <button
        @click="guidanceStore.goToPrevPage"
        :disabled="!guidanceStore.canGoBack"
        :class="{ disabled: !guidanceStore.canGoBack }"
      >
        Back
      </button>
      <button
        @click="guidanceStore.goToNextPage"
        :disabled="!guidanceStore.canGoForward"
        :class="{ disabled: !guidanceStore.canGoForward }"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>
.widget-container {
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: #fbfbfb;
  border-radius: 16px;
  border: 1px solid #dfdfdf;
  height: 600px;
  width: 800px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

.widget-content {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 16px;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid var(--primary-color, #4a90e2);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}

button {
  border: 2px solid rgb(189, 189, 189);
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  background-color: white;
  color: gray;
  transition: all 0.1s ease-in-out;
  font-weight: 600;
}

button:hover {
  background-color: rgb(235, 235, 235);
}

button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 840px) {
  .widget-container {
    width: 100%;
    height: 100vh;
    border-radius: 0;
  }
}

.widget-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  background: white;
  border-radius: 16px 16px 0 0;
}

.toolbar-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: none;
  background: none;
  color: #4a5568;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
}

.toolbar-button:hover {
  color: var(--primary-color, #4a90e2);
}

.toolbar-logo {
  height: 24px;
  width: auto;
  object-fit: contain;
}

.icon {
  font-size: 1.25rem;
}
</style>
