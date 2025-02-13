import { AnswerType, type GuidedQuestion, type Page } from "../types";

const questions: Array<Page> = [
  {
    id: crypto.randomUUID(),
    questions: [
      {
        id: crypto.randomUUID(),
        text: "What style of vehicle are you looking for?",
        answerType: AnswerType.ImageEnumerated,
        answerChoices: [
          {
            url: "/images/audi.jpg",
            label: "Wagon",
            value: "wagon",
          },
          {
            url: "/images/tesla.jpg",
            label: "Electric",
            value: "electric",
          },
          {
            url: "/images/mustang.jpg",
            label: "Performance",
            value: "performance",
          },
          {
            url: "/images/fiat.jpg",
            label: "Compact",
            value: "compact",
          },
        ],
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    questions: [
      {
        id: crypto.randomUUID(),
        text: "Which is most important to you?",
        answerType: AnswerType.TextEnumerated,
        answerChoices: [
          { label: "Towing", value: "towing" },
          { label: "Storage Space", value: "storage" },
          { label: "Acceleration", value: "acceleration" },
          { label: "Seating", value: "seating" },
        ],
      },
      {
        id: crypto.randomUUID(),
        text: "How many seats will you need?",
        answerType: AnswerType.FreeformNumeric,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    questions: [
      {
        id: crypto.randomUUID(),
        text: "Any additional must-have features?",
        answerType: AnswerType.FreeformText,
      },
    ],
  },
];

export async function getQuestions() {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });

  return questions;
}
