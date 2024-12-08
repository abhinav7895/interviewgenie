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
  Respond with a JSON object, for example:
  {
    "topic": "Technical JavaScript Questions",
    "questionsAndAnswers": [
      {"id": "q1", "ques": "What are the callback functions in JavaScript", "ans": "A callback function in JavaScript is a ..."},
    ]
  }
  Ensure:
  1. Short, clear answers
  2. No formatting or extra characters
  3. Question and Answer will too short and clear
  `;
  };

  export default generatePrompt;