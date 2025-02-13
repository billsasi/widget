<script setup lang="ts">
import { AnswerType, type GuidedQuestion } from "../../types";
import FreeformNumeric from "./questions/FreeformNumeric.vue";
import FreeformText from "./questions/FreeformText.vue";
import ImageEnumerated from "./questions/ImageEnumerated.vue";
import TextEnumerated from "./questions/TextEnumerated.vue";

const props = defineProps<{
  question: GuidedQuestion;
}>();
</script>

<template>
  <h3>{{ props.question.text }}</h3>
  <FreeformText
    v-if="props.question.answerType === AnswerType.FreeformText"
    :question="props.question"
  />
  <FreeformNumeric
    v-if="props.question.answerType === AnswerType.FreeformNumeric"
    :question="props.question"
  />
  <ImageEnumerated
    v-if="props.question.answerType === AnswerType.ImageEnumerated"
    :question="props.question"
  />
  <TextEnumerated
    v-if="props.question.answerType === AnswerType.TextEnumerated"
    :question="props.question"
  />
</template>
