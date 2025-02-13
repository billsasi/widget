interface SolutionRequest {
  problemDescription: string;
  answers: Record<string, any>;
}

export async function generateSolution(
  request: SolutionRequest
): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const solutions = {
    wagon:
      "Based on the answers you provided, the Volvo V90 is a great choice.",
    electric:
      "We recommend the Tesla Model 3 based on the answers you provided.",
    performance: "We recommend the BMW M3 based on the answers you provided.",
    compact:
      "We recommend the Volkswagen Golf GTI based on the answers you provided.",
  };

  const styleAnswer = Object.values(request.answers).find((a) =>
    ["wagon", "electric", "performance", "compact"].includes(a.value)
  );

  return (
    solutions[styleAnswer?.value as keyof typeof solutions] ||
    "Based on your requirements, I recommend visiting a local dealership to test drive several vehicles that match your criteria. They can help you find the perfect match for your specific needs."
  );
}

export async function submitFeedback(
  isHelpful: boolean,
  text?: string
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log("Feedback submitted:", { isHelpful, text });
}
