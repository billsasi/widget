export enum AnswerType {
  TextEnumerated,
  ImageEnumerated,
  FreeformText,
  FreeformNumeric,
}

export interface ChoiceOption {
  label: string;
  value: string;
}

export interface ImageOptions extends ChoiceOption {
  url: string;
}

export interface Question {
  id: string;
  text: string;
  answerType: AnswerType;
}

export interface TextEnumeratedQuestion extends Question {
  answerType: AnswerType.TextEnumerated;
  answerChoices: ChoiceOption[];
}

export interface ImageEnumeratedQuestion extends Question {
  answerType: AnswerType.ImageEnumerated;
  answerChoices: ImageOptions[];
}

export interface FreeformTextQuestion extends Question {
  answerType: AnswerType.FreeformText;
}

export interface FreeformNumericQuestion extends Question {
  answerType: AnswerType.FreeformNumeric;
}

export type GuidedQuestion =
  | TextEnumeratedQuestion
  | ImageEnumeratedQuestion
  | FreeformTextQuestion
  | FreeformNumericQuestion;

export interface Page {
  id: string;
  questions: GuidedQuestion[];
}

export interface Answer {
  questionId: string;
  value: string;
}
