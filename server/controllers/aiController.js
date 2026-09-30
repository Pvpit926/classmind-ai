import { generateRecommendations as genRecommendations, generateQuestions } from '../services/geminiService.js';
import { db } from '../config/firebase.js';

export const generateAssessment = async (req, res) => {
  try {
    const config = req.body;
    const generatedData = await generateQuestions(config);
    res.json({ success: true, data: generatedData });
  } catch (error) {
    console.error('AI Generation Error:', error);
    res.status(500).json({ success: false, message: "We couldn't generate the assessment right now. Please try again." });
  }
};

export const generateRecommendations = async (req, res) => {
  try {
    const { overallScore, categoryScores, readinessLevel, attemptId } = req.body;
    const recommendationsData = await genRecommendations({ overallScore, categoryScores, readinessLevel });
    
    // Store in firestore if db is available and attemptId is provided
    if (db && attemptId) {
      await db.collection('recommendations').add({
        attemptId,
        studentId: req.user.uid,
        recommendations: recommendationsData,
        createdAt: new Date().toISOString()
      });
    }

    res.json({ success: true, data: recommendationsData });
  } catch (error) {
    console.error('AI Recommendation Error:', error);
    res.status(500).json({ success: false, message: "We couldn't generate recommendations right now. Please try again." });
  }
};
