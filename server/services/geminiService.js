import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

/**
 * Generate assessment questions using Gemini AI.
 */
export const generateQuestions = async (config) => {
  if (!genAI) {
    throw new Error('Gemini API key is not configured.');
  }

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-pro',
    generationConfig: {
      temperature: 0.7,
      responseMimeType: 'application/json',
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          title: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
          questions: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                text: { type: SchemaType.STRING },
                optionA: { type: SchemaType.STRING },
                optionB: { type: SchemaType.STRING },
                optionC: { type: SchemaType.STRING },
                optionD: { type: SchemaType.STRING },
                correctAnswer: { type: SchemaType.STRING, description: "Must be 'a', 'b', 'c', or 'd'" },
                category: { type: SchemaType.STRING },
                difficulty: { type: SchemaType.STRING },
                type: { type: SchemaType.STRING },
              },
              required: ['text', 'optionA', 'optionB', 'optionC', 'optionD', 'correctAnswer', 'category', 'difficulty', 'type']
            }
          }
        },
        required: ['title', 'description', 'questions']
      }
    }
  });

  const prompt = `
    Generate an assessment for first-year engineering students.
    Area: ${config.area}
    Student Level: ${config.level}
    Number of Questions: ${config.questions}
    Difficulty: ${config.difficulty}
    Question Type: ${config.type}

    Rules:
    - Questions must be appropriate for first-year engineering students.
    - Have exactly one correct answer.
    - Options should be meaningful.
    - Do not diagnose medical/psychological states.
    - Category should be one of: 'curriculum', 'academic', 'learning', 'time', 'adaptation'.
    - Difficulty should be 'basic', 'intermediate', or 'advanced'.
    - Ensure there are no duplicate questions.
  `;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  const data = JSON.parse(responseText);

  return data;
};

/**
 * Generate personalized recommendations using Gemini AI.
 */
export const generateRecommendations = async (results) => {
  if (!genAI) {
    throw new Error('Gemini API key is not configured.');
  }

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      temperature: 0.7,
      responseMimeType: 'application/json',
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          summary: { type: SchemaType.STRING },
          strengths: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING }
          },
          focusAreas: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                category: { type: SchemaType.STRING },
                reason: { type: SchemaType.STRING },
                actions: {
                  type: SchemaType.ARRAY,
                  items: { type: SchemaType.STRING }
                }
              },
              required: ['category', 'reason', 'actions']
            }
          }
        },
        required: ['summary', 'strengths', 'focusAreas']
      }
    }
  });

  const prompt = `
    Generate personalized recommendations for a first-year engineering student based on their assessment results.
    Overall Score: ${results.overallScore}%
    Readiness Level: ${results.readinessLevel}
    Category Scores: ${JSON.stringify(results.categoryScores)}

    Rules:
    - Recommendations must be practical, short, student-friendly, academic, and action-oriented.
    - Do not generate medical/psychological advice or personality diagnosis.
    - Strengths should highlight areas >= 70%.
    - Focus areas should target categories < 60%.
  `;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  const data = JSON.parse(responseText);

  return data;
};
