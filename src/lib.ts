import { createApp } from "vue";
import { createPinia } from "pinia";
import GuidanceWidget from "./components/Widget/GuidanceWidget.vue";
import "./style.css";

const init = (containerId: string, options: { logoUrl?: string } = {}) => {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }

  const app = createApp(GuidanceWidget, options);
  const pinia = createPinia();
  app.use(pinia);
  app.mount(container);
};

export { init };

if (typeof window !== "undefined") {
  (window as any).GuidanceWidget = { init };
}

export default { init };
