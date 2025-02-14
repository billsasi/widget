export interface SolutionRequest {
  problemDescription: string;
  answers: Record<string, any>;
}

// Return random solution for testing purposes
export async function generateSolution(
  request: SolutionRequest
): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const solutions = [
    "Based on the answers you provided, the Volvo V90 is a great choice.",
    "We recommend the Tesla Model 3 based on the answers you provided.",
    "We recommend the BMW M3 based on the answers you provided.",
    "We recommend the Volkswagen Golf GTI based on the answers you provided.",
  ];

  return solutions[Math.floor(Math.random() * solutions.length)];
}

export async function submitFeedback(
  isHelpful: boolean,
  text?: string
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log("feedback:", { isHelpful, text });
}
