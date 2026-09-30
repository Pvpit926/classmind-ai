import { db } from '../config/firebase.js';

export const getTeacherAnalytics = async (req, res) => {
  try {
    if (!db) {
      // Return demo data if no DB
      return res.json({
        success: true,
        data: {
          totalStudents: 45,
          assessed: 38,
          completionRate: 84,
          averageReadiness: 64,
          categoryAverages: {
            curriculum: 68,
            academic: 62,
            learning: 59,
            time: 51,
            adaptation: 72,
          }
        }
      });
    }

    // 1. Get all students (where role == 'student')
    const usersSnapshot = await db.collection('users').where('role', '==', 'student').get();
    const totalStudents = usersSnapshot.size;

    // 2. Get all attempts for assessments created by this teacher
    // We would need to query attempts where assessmentId in teacher's assessments
    // For MVP hackathon, just get all attempts and filter (or assume all attempts if simple)
    const assessmentsSnapshot = await db.collection('assessments').where('createdByUid', '==', req.user.uid).get();
    const teacherAssessmentIds = assessmentsSnapshot.docs.map(d => d.id);

    let assessedCount = 0;
    let totalScore = 0;
    let totalAttempts = 0;
    const catTotals = {};
    const catCounts = {};

    if (teacherAssessmentIds.length > 0) {
      // In Firestore, 'in' queries are limited to 10 items. For a hackathon MVP, this is fine.
      // If we have > 10, we could query all attempts and filter in memory.
      const attemptsSnapshot = await db.collection('attempts').get();
      
      const teacherAttempts = attemptsSnapshot.docs.map(d => d.data()).filter(a => teacherAssessmentIds.includes(a.assessmentId));
      
      // Calculate metrics
      const uniqueStudents = new Set(teacherAttempts.map(a => a.studentId));
      assessedCount = uniqueStudents.size;
      totalAttempts = teacherAttempts.length;

      teacherAttempts.forEach(attempt => {
        totalScore += attempt.overallScore || 0;
        if (attempt.categoryScores) {
          for (const [cat, score] of Object.entries(attempt.categoryScores)) {
            if (!catTotals[cat]) { catTotals[cat] = 0; catCounts[cat] = 0; }
            catTotals[cat] += score;
            catCounts[cat]++;
          }
        }
      });
    }

    const completionRate = totalStudents > 0 ? Math.round((assessedCount / totalStudents) * 100) : 0;
    const averageReadiness = totalAttempts > 0 ? Math.round(totalScore / totalAttempts) : 0;
    
    const categoryAverages = {};
    for (const cat in catTotals) {
      categoryAverages[cat] = Math.round(catTotals[cat] / catCounts[cat]);
    }

    res.json({
      success: true,
      data: {
        totalStudents,
        assessed: assessedCount,
        completionRate,
        averageReadiness,
        categoryAverages
      }
    });

  } catch (error) {
    console.error('Analytics Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
