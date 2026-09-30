import { db } from '../config/firebase.js';
import { generateQuestions } from '../services/geminiService.js';
import { v4 as uuidv4 } from 'uuid'; // need to add uuid if we want, or use firestore auto ids

export const getAssessments = async (req, res) => {
  try {
    if (!db) {
      return res.json({ success: true, data: [] });
    }
    
    // For students: get assigned and published
    // For teachers: get their created assessments
    const role = req.user.role; // assuming role is set by auth middleware or frontend
    
    let assessments = [];
    const snapshot = await db.collection('assessments').get();
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      // Simple logic for MVP
      if (data.status === 'published' || data.createdByUid === req.user.uid) {
        assessments.push({ id: doc.id, ...data });
      }
    });

    res.json({ success: true, data: assessments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAssessmentById = async (req, res) => {
  try {
    if (!db) {
      return res.status(404).json({ success: false, message: 'Not found in demo mode' });
    }

    const doc = await db.collection('assessments').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ success: false, message: 'Assessment not found' });
    }

    res.json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createAssessment = async (req, res) => {
  try {
    if (!db) {
      return res.json({ success: true, data: { id: 'demo-id', ...req.body } });
    }

    const assessmentData = {
      ...req.body,
      createdByUid: req.user.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await db.collection('assessments').add(assessmentData);
    res.json({ success: true, data: { id: docRef.id, ...assessmentData } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAssessment = async (req, res) => {
  try {
    if (!db) return res.json({ success: true, data: { id: req.params.id, ...req.body } });

    const docRef = db.collection('assessments').doc(req.params.id);
    await docRef.update({
      ...req.body,
      updatedAt: new Date().toISOString()
    });

    res.json({ success: true, message: 'Assessment updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const generateWithAI = async (req, res) => {
  try {
    const config = req.body;
    const generatedData = await generateQuestions(config);
    res.json({ success: true, data: generatedData });
  } catch (error) {
    console.error('AI Generation Error:', error);
    res.status(500).json({ success: false, message: "We couldn't generate the assessment right now. Please try again." });
  }
};

export const submitAssessment = async (req, res) => {
  try {
    if (!db) return res.json({ success: true, data: {} });

    const assessmentId = req.params.id; // Fix: the route param is 'id', not 'assessmentId'
    const { answers, questions } = req.body; // sending questions from frontend for easy scoring in MVP

    // Scoring Engine
    let correctCount = 0;
    const categoryScoresRaw = {};
    const categoryTotals = {};

    questions.forEach(q => {
      const studentAnswer = answers[q.id];
      const isCorrect = studentAnswer === q.correctAnswer;
      
      if (isCorrect) correctCount++;

      if (!categoryTotals[q.category]) {
        categoryTotals[q.category] = 0;
        categoryScoresRaw[q.category] = 0;
      }
      
      categoryTotals[q.category]++;
      if (isCorrect) {
        categoryScoresRaw[q.category]++;
      }
    });

    const overallScore = Math.round((correctCount / questions.length) * 100);
    const categoryScores = {};
    for (const cat in categoryTotals) {
      categoryScores[cat] = Math.round((categoryScoresRaw[cat] / categoryTotals[cat]) * 100);
    }

    let readinessLevel = 'Needs Support';
    if (overallScore >= 80) readinessLevel = 'Strong Readiness';
    else if (overallScore >= 60) readinessLevel = 'Ready';
    else if (overallScore >= 40) readinessLevel = 'Developing';

    const attemptData = {
      assessmentId,
      studentId: req.user.uid,
      answers,
      overallScore,
      categoryScores,
      readinessLevel,
      submittedAt: new Date().toISOString()
    };

    const attemptRef = await db.collection('attempts').add(attemptData);

    res.json({ success: true, data: { id: attemptRef.id, ...attemptData } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyResults = async (req, res) => {
  try {
    if (!db) {
      return res.json({ success: true, data: [] });
    }

    const snapshot = await db.collection('attempts')
      .where('studentId', '==', req.user.uid)
      .orderBy('submittedAt', 'desc')
      .get();
      
    const attempts = [];
    snapshot.forEach(doc => attempts.push({ id: doc.id, ...doc.data() }));

    res.json({ success: true, data: attempts });
  } catch (error) {
    console.error('getMyResults error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
