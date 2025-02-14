<script setup lang="ts">
import { ref, provide } from "vue";
import QuestionPage from "./QuestionPage.vue";
import { useGuidanceStore } from "../../stores/guidance-store";
import AnswersMenu from "./AnswersMenu.vue";
import StartPage from "./widget-pages/StartPage.vue";
import SolutionPage from "./widget-pages/SolutionPage.vue";
import type { Page } from "../../types";
import type { SolutionRequest } from "../../services/solution-service";

const props = defineProps<{
  logoUrl?: string;
  services?: {
    getQuestions?: () => Promise<Page[]>;
    generateSolution?: (request: SolutionRequest) => Promise<string>;
    submitFeedback?: (isHelpful: boolean, text?: string) => Promise<void>;
  };
}>();

const guidanceStore = useGuidanceStore();
const isAnswersMenuOpen = ref(false);

provide("guidanceServices", props.services);
provide("logoUrl", props.logoUrl);
</script>

<template>
  <div class="widget-container">
    <div class="widget-toolbar">
      <div class="toolbar-buttons">
        <button
          class="close-button"
          @click="guidanceStore.isWidgetOpen = false"
        >
          ×
        </button>
        <button
          v-if="
            guidanceStore.currentPage &&
            guidanceStore.currentState === 'questions'
          "
          class="toolbar-button"
          @click="isAnswersMenuOpen = true"
        >
          View Answered
        </button>
      </div>
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
      <StartPage v-if="guidanceStore.currentState === 'start'" />
      <QuestionPage v-if="guidanceStore.currentState === 'questions'" />
      <SolutionPage v-if="guidanceStore.currentState === 'solution'" />
    </div>

    <div v-if="guidanceStore.currentState === 'questions'" class="navigation">
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
  background-color: #fbfbfb;
  border-radius: var(--border-radius);
  border: 1px solid #dfdfdf;
  height: 100%;
  width: 100%;
  max-width: 600px;
  max-height: 700px;
  min-width: 300px;
  min-height: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  font-family: var(--font-family);
  font-size: var(--font-size-base);
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
  margin: 0 16px 16px 16px;
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
    height: 100%;
    max-height: 100%;
    min-height: unset;
    min-width: unset;
    border-radius: 8px;
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

.close-button {
  width: 30px;
  height: 30px;
  font-size: 1.5em;
  color: gray;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}

.close-button:hover {
  opacity: 0.9;
}

.toolbar-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
