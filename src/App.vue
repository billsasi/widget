<script setup lang="ts">
import { ref } from "vue";
import GuidanceWidget from "./components/Widget/GuidanceWidget.vue";
import { useGuidanceStore } from "./stores/guidance-store";

const guidanceStore = useGuidanceStore();
</script>

<template>
  <div class="widget-wrapper">
    <button
      class="widget-tab"
      :class="{ 'tab-open': guidanceStore.isWidgetOpen }"
      @click="guidanceStore.isWidgetOpen = !guidanceStore.isWidgetOpen"
    >
      Open Widget
    </button>

    <div
      v-if="guidanceStore.isWidgetOpen"
      class="widget-overlay"
      @click="guidanceStore.isWidgetOpen = false"
    >
      <div class="widget-modal" @click.stop>
        <GuidanceWidget logo-url="/vite.svg" />
      </div>
    </div>
  </div>
</template>

<style>
.widget-wrapper {
  position: fixed;
  right: 0;
  bottom: 20px;
  z-index: 1000;
}

.widget-tab {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--primary-color, #4a90e2);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  font-weight: 600;
  transition: all 0.3s ease;
  writing-mode: horizontal-tb;
}

.widget-tab:hover {
  right: 4px;
}

.widget-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(109, 109, 109, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.widget-modal {
  position: relative;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
</style>
