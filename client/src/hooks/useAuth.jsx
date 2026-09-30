import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { auth, db, firebaseReady } from '../services/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { DEMO_USERS } from '../data/demoData';

// Add DEMO_USERS to demoData.js manually since we removed it from useAuth
const DEMO_USERS_FALLBACK = {
  student: {
    uid: 'demo-student-001',
    email: 'student@classmind.ai',
    role: 'student',
    name: 'Arjun Sharma',
    college: 'Mumbai Institute of Technology',
    branch: 'Computer Engineering',
    year: 'First Year',
    createdAt: '2026-07-15',
  },
  teacher: {
    uid: 'demo-teacher-001',
    email: 'teacher@classmind.ai',
    role: 'teacher',
    name: 'Dr. Priya Mehta',
    college: 'Mumbai Institute of Technology',
    department: 'Computer Science',
    createdAt: '2026-06-01',
  },
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!firebaseReady) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUser({ uid: firebaseUser.uid, ...docSnap.data() });
          } else {
            setUser({ uid: firebaseUser.uid, email: firebaseUser.email, role: 'student' });
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email, password, expectedRole) => {
    setLoading(true);
    setError(null);
    try {
      if (!firebaseReady) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const demoUser = expectedRole === 'teacher' ? DEMO_USERS_FALLBACK.teacher : DEMO_USERS_FALLBACK.student;
        setUser({ ...demoUser, email });
        return demoUser;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      const docRef = doc(db, 'users', userCredential.user.uid);
      const docSnap = await getDoc(docRef);
      
      let userData = { email, role: 'student' };
      if (docSnap.exists()) {
        userData = docSnap.data();
      }

      if (expectedRole && userData.role !== expectedRole) {
        await signOut(auth);
        throw new Error(`Please login via the ${userData.role} portal.`);
      }

      const fullUser = { uid: userCredential.user.uid, ...userData };
      setUser(fullUser);
      return fullUser;
    } catch (err) {
      console.error(err);
      setError(err.message || 'Login failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      if (!firebaseReady) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const newUser = {
          uid: `user-${Date.now()}`,
          ...userData,
          createdAt: new Date().toISOString(),
        };
        setUser(newUser);
        return newUser;
      }

      const { email, password, role, ...profileData } = userData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      const newUserData = {
        email,
        role,
        ...profileData,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), newUserData);
      
      const fullUser = { uid: userCredential.user.uid, ...newUserData };
      setUser(fullUser);
      return fullUser;
    } catch (err) {
      console.error(err);
      setError(err.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    if (firebaseReady) {
      await signOut(auth);
    }
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (updatedData) => {
    setLoading(true);
    setError(null);
    try {
      if (!firebaseReady) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setUser((prev) => ({ ...prev, ...updatedData }));
        return;
      }
      
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, updatedData, { merge: true });
      setUser((prev) => ({ ...prev, ...updatedData }));
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to update profile.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, updateProfile, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
