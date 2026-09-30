// ============================================================
// ClassMind AI — Utility Functions
// ============================================================

/**
 * Format a date string to a human-readable format.
 */
export const formatDate = (dateString) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Get a greeting based on the current time.
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

/**
 * Get a color based on a score value.
 */
export const getScoreColor = (score) => {
  if (score >= 80) return '#10b981';
  if (score >= 65) return '#6366f1';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
};

/**
 * Get a label based on a score value.
 */
export const getScoreLabel = (score) => {
  if (score >= 80) return 'Excellent';
  if (score >= 65) return 'Good';
  if (score >= 50) return 'Average';
  return 'Needs Focus';
};

/**
 * Truncate text to a maximum length.
 */
export const truncate = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Generate initials from a name.
 */
export const getInitials = (name) => {
  if (!name) return '?';
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
};

/**
 * Delay utility for simulating async operations.
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
