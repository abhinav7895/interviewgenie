export const generatePrompt = (
  role: string,
  level?: string,
  questionType?: string,
  tone?: string,
  jobDescription?: string,
  includeAnswer?: "false" | "true"
) => {
  return `Generate ${
    includeAnswer === "true" ? "7" : "10"
  } interview questions${
    includeAnswer === "true" ? " with their answers" : ""
  } for a ${role}${level ? ` at ${level} level` : ""}.
${tone ? `The tone should be ${tone}.` : ""}
${jobDescription ? `Context: "${jobDescription}"` : ""}
${questionType ? `Type of the question : ${questionType}` : ""}
Ensure:
1. ${
    includeAnswer === "true"
      ? "Short, clear answers"
      : "Clear, concise questions"
  }
2. No formatting or extra characters
3. ${
    includeAnswer === "true"
      ? "Questions and Answers will be short and clear"
      : "Questions will be short and clear"
  }
`;
};
