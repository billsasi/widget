import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import "./styles/variables.css";
import type { Page } from "./types";
import type { SolutionRequest } from "./services/solution-service";
import App from "./App.vue";

interface WidgetConfig {
  logoUrl?: string;
  styles?: {
    primaryColor?: string;
    fontFamily?: string;
    fontSize?: string;
    borderRadius?: string;
  };
  services?: {
    getQuestions?: () => Promise<Page[]>;
    generateSolution?: (request: SolutionRequest) => Promise<string>;
    submitFeedback?: (isHelpful: boolean, text?: string) => Promise<void>;
  };
}

const init = (containerId: string, config: WidgetConfig = {}) => {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }

  if (config.styles) {
    const styleElement = document.createElement("style");

    styleElement.textContent = `
      :root {
        --primary-color: ${config.styles.primaryColor || "#4a90e2"};
        --font-family: ${
          config.styles.fontFamily || "'Inter', system-ui, sans-serif"
        };
        --font-size-base: ${config.styles.fontSize || "16px"};
        --border-radius: ${config.styles.borderRadius || "8px"};
      }
    `;
    document.head.appendChild(styleElement);
  }

  const app = createApp(App, {
    logoUrl: config.logoUrl,
    services: config.services,
  });
  const pinia = createPinia();
  app.use(pinia);
  app.mount(container);
};

export { init };

if (typeof window !== "undefined") {
  (window as any).GuidanceWidget = { init };
}

export default { init };
