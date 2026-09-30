import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRoutes from './routes/health.js';
import assessmentRoutes from './routes/assessments.js';
import aiRoutes from './routes/aiRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/teacher', teacherRoutes);

// Root
app.get('/', (req, res) => {
  res.json({
    name: 'ClassMind AI — API',
    version: '1.0.0',
    status: 'running',
    tagline: 'Understand. Assess. Guide.',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`✅ ClassMind AI server running on port ${PORT}`);
});

export default app;
