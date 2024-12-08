const generatePrompt = (
    role: string,
    level?: string,
    questionType?: string,
    tone?: string,
    jobDescription?: string
  ) => {
    return `Generate 10 interview questions with their answers for a ${role}${
      level ? ` at ${level} level` : ""
    }.
  ${tone ? `The tone should be ${tone}.` : ""}
  ${jobDescription ? `Context: "${jobDescription}"` : ""}
  ${questionType ? `Type of the question : ${questionType}` : ""}
  Ensure:
  1. Short, clear answers
  2. No formatting or extra characters
  3. Question and Answer will too short and clear
  `;
  };

  export default generatePrompt;