import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getQuestions } from "../services/question-service";
import { generateSolution, submitFeedback } from "../services/solution-service";
import type { Page, Answer } from "../types";

type State = "start" | "questions" | "solution";

export const useGuidanceStore = defineStore("guidance", () => {
  const currentState = ref<State>("start");
  const problemDescription = ref("");
  const questions = ref<Page[]>([]);
  const pageIndex = ref(0);
  const loading = ref(false);
  const answers = ref<Record<string, Answer>>({});
  const feedbackSubmitted = ref(false);
  const solution = ref("");
  const feedback = ref<{ isHelpful: boolean; text?: string } | null>(null);

  const currentPage = computed(() => questions.value[pageIndex.value]);

  const canGoBack = computed(() => pageIndex.value > 0);

  const isCurrentPageValid = computed(() => {
    if (!currentPage.value) return false;
    return currentPage.value.questions.every((q) => isQuestionAnswered(q.id));
  });

  const canGoForward = computed(() => {
    if (
      pageIndex.value === questions.value.length - 1 &&
      isCurrentPageValid.value
    ) {
      return true;
    }
    return (
      pageIndex.value < questions.value.length - 1 && isCurrentPageValid.value
    );
  });

  const answeredQuestions = computed(() => {
    return Object.values(answers.value).map((answer) => {
      const page = questions.value.find((p) =>
        p.questions.some((q) => q.id === answer.questionId)
      );
      const question = page?.questions.find((q) => q.id === answer.questionId);
      return { ...question, answer: answer.value };
    });
  });

  function isQuestionAnswered(questionId: string): boolean {
    const answer = answers.value[questionId];
    if (!answer) return false;
    return answer.value.toString().trim() !== "";
  }

  async function submitProblemDescription(description: string) {
    loading.value = true;
    try {
      problemDescription.value = description;
      await fetchQuestions();
      currentState.value = "questions";
    } finally {
      loading.value = false;
    }
  }

  async function fetchQuestions() {
    loading.value = true;
    try {
      questions.value = await getQuestions();
    } finally {
      loading.value = false;
    }
  }

  function setAnswer(questionId: string, value: string | number) {
    answers.value[questionId] = {
      questionId,
      value: value.toString(),
    };
  }

  async function generateSolutionForAnswers() {
    loading.value = true;
    try {
      solution.value = await generateSolution({
        problemDescription: problemDescription.value,
        answers: answers.value,
      });
      currentState.value = "solution";
    } finally {
      loading.value = false;
    }
  }

  async function goToNextPage() {
    if (canGoForward.value) {
      if (pageIndex.value === questions.value.length - 1) {
        await generateSolutionForAnswers();
      } else {
        pageIndex.value++;
      }
    }
  }

  function goToPrevPage() {
    if (canGoBack.value) {
      pageIndex.value--;
    }
  }

  function goToQuestion(questionId: string) {
    const pageIdx = questions.value.findIndex((page) =>
      page.questions.some((q) => q.id === questionId)
    );
    if (pageIdx !== -1) {
      pageIndex.value = pageIdx;
    }
  }

  async function submitFeedbackResponse(isHelpful: boolean, text?: string) {
    loading.value = true;
    try {
      await submitFeedback(isHelpful, text);
      feedback.value = { isHelpful, text };
      feedbackSubmitted.value = true;
    } finally {
      loading.value = false;
    }
  }

  function reset() {
    currentState.value = "start";
    problemDescription.value = "";
    pageIndex.value = 0;
    answers.value = {};
    solution.value = "";
    feedbackSubmitted.value = false;
    feedback.value = null;
  }

  function isAllQuestionsAnswered(): boolean {
    return questions.value.every((page) =>
      page.questions.every((q) => isQuestionAnswered(q.id))
    );
  }

  return {
    currentState,
    problemDescription,
    questions,
    loading,
    pageIndex,
    answers,
    solution,
    feedbackSubmitted,
    feedback,
    currentPage,
    canGoBack,
    canGoForward,
    answeredQuestions,
    goToNextPage,
    goToPrevPage,
    goToQuestion,
    setAnswer,
    isQuestionAnswered,
    submitProblemDescription,
    fetchQuestions,
    submitFeedbackResponse,
    reset,
  };
});
