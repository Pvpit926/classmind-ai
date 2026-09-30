import { auth } from '../config/firebase.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // In demo mode (no firebase initialized), allow pass-through
      if (!auth) {
        req.user = { uid: 'demo-user', role: req.headers['x-demo-role'] || 'teacher' };
        return next();
      }
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = authHeader.split('Bearer ')[1];
    if (token === 'demo-token') {
      req.user = { uid: 'demo-user', role: req.headers['x-demo-role'] || 'teacher' };
      return next();
    }

    if (!auth) {
      req.user = { uid: 'demo-user', role: req.headers['x-demo-role'] || 'teacher' };
      return next();
    }

    const decodedToken = await auth.verifyIdToken(token);
    req.user = { uid: decodedToken.uid };
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export const authorizeRole = (role) => (req, res, next) => {
  // If we have full user claims in token, we can check it, but often role is in firestore
  // For this hackathon, we might pass role in headers for demo, or fetch from DB
  const userRole = req.headers['x-user-role'] || req.user.role;
  if (userRole !== role) {
    return res.status(403).json({ success: false, message: 'Forbidden: Insufficient permissions' });
  }
  next();
};
