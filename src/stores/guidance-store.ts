import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getQuestions } from "../services/question-service";
import type { GuidedQuestion, Page, Answer } from "../types";

export const useGuidanceStore = defineStore("guidance", () => {
  const problemDescription = ref("");
  const questions = ref<Page[]>([]);
  const pageIndex = ref(0);
  const loading = ref(true);
  const answers = ref<Record<string, Answer>>({});

  const currentPage = computed(() => questions.value[pageIndex.value]);

  const canGoBack = computed(() => pageIndex.value > 0);

  const isCurrentPageValid = computed(() => {
    if (!currentPage.value) return false;
    return currentPage.value.questions.every((q) => isQuestionAnswered(q.id));
  });

  const canGoForward = computed(() => {
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
    return answer.value.trim() !== "";
  }

  function setAnswer(questionId: string, value: string | number) {
    answers.value[questionId] = {
      questionId,
      value: value.toString(),
    };
  }

  async function fetchQuestions() {
    try {
      loading.value = true;
      const questionsData = await getQuestions();
      questions.value = questionsData;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }

  function goToNextPage() {
    if (canGoForward.value) {
      pageIndex.value++;
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

  function handlePageUpdate(data: any) {
    // const currentPage.value = pageStack.value[pageStack.value.length - 1];
  }

  return {
    problemDescription,
    questions,
    loading,
    pageIndex,
    answers,
    answeredQuestions,
    canGoBack,
    canGoForward,
    currentPage,
    goToNextPage,
    goToPrevPage,
    goToQuestion,
    setAnswer,
    isQuestionAnswered,
    handlePageUpdate,
    fetchQuestions,
  };
});
