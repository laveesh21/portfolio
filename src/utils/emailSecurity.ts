/**
 * Email Security Utilities
 * Provides rate limiting, spam detection, and security measures for contact form
 */

// Security: Rate limiting constants
export const RATE_LIMIT_KEY = 'contact_form_submissions';
export const EMAIL_TRACKING_KEY = 'contact_form_emails';
export const SESSION_FINGERPRINT_KEY = 'contact_form_fingerprint';
export const MAX_SUBMISSIONS = 3; // Max 3 submissions per 24h per browser
export const TIME_WINDOW = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
export const MIN_SUBMISSION_INTERVAL = 60 * 1000; // 1 minute between submissions
export const MAX_SUBMISSIONS_PER_EMAIL = 2; // Max 2 messages per email per 24h

// Spam keyword list
const SPAM_KEYWORDS = [
  'viagra', 'casino', 'lottery', 'winner', 
  'click here', 'buy now', 'limited time'
];

/**
 * Generate browser fingerprint for tracking unique sessions
 * Creates a hash based on browser characteristics
 */
export const generateFingerprint = (): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Browser Fingerprint', 2, 2);
  }
  
  const fingerprint = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    canvas: canvas.toDataURL(),
  };
  
  // Create hash from fingerprint
  return btoa(JSON.stringify(fingerprint)).substring(0, 32);
};

/**
 * Get or create session fingerprint
 * Stored in sessionStorage (cleared on browser close)
 */
export const getSessionFingerprint = (): string => {
  let fingerprint = sessionStorage.getItem(SESSION_FINGERPRINT_KEY);
  if (!fingerprint) {
    fingerprint = generateFingerprint();
    sessionStorage.setItem(SESSION_FINGERPRINT_KEY, fingerprint);
  }
  return fingerprint;
};

/**
 * Get submission history from localStorage
 * Automatically filters out expired timestamps
 */
export const getSubmissionHistory = (): number[] => {
  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  if (!stored) return [];
  return JSON.parse(stored).filter((timestamp: number) => 
    Date.now() - timestamp < TIME_WINDOW
  );
};

/**
 * Get email submission history
 * Returns object with email addresses as keys and timestamp arrays as values
 */
export const getEmailHistory = (): { [email: string]: number[] } => {
  const stored = localStorage.getItem(EMAIL_TRACKING_KEY);
  if (!stored) return {};
  const history = JSON.parse(stored);
  
  // Clean up old entries
  const cleaned: { [email: string]: number[] } = {};
  Object.keys(history).forEach((email) => {
    const timestamps = history[email].filter((timestamp: number) => 
      Date.now() - timestamp < TIME_WINDOW
    );
    if (timestamps.length > 0) {
      cleaned[email] = timestamps;
    }
  });
  
  return cleaned;
};

/**
 * Check if rate limit exceeded for browser
 */
export const isRateLimited = (): boolean => {
  const history = getSubmissionHistory();
  
  // Check max submissions in time window
  if (history.length >= MAX_SUBMISSIONS) {
    return true;
  }
  
  // Check minimum interval between submissions
  if (history.length > 0) {
    const lastSubmission = history[history.length - 1];
    if (Date.now() - lastSubmission < MIN_SUBMISSION_INTERVAL) {
      return true;
    }
  }
  
  return false;
};

/**
 * Check if email has exceeded submission limit
 */
export const isEmailRateLimited = (email: string): boolean => {
  const history = getEmailHistory();
  const emailHistory = history[email.toLowerCase()] || [];
  return emailHistory.length >= MAX_SUBMISSIONS_PER_EMAIL;
};

/**
 * Record successful submission timestamp
 */
export const recordSubmission = (): void => {
  const history = getSubmissionHistory();
  history.push(Date.now());
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(history));
};

/**
 * Record email submission timestamp
 */
export const recordEmailSubmission = (email: string): void => {
  const history = getEmailHistory();
  const emailLower = email.toLowerCase();
  
  if (!history[emailLower]) {
    history[emailLower] = [];
  }
  
  history[emailLower].push(Date.now());
  localStorage.setItem(EMAIL_TRACKING_KEY, JSON.stringify(history));
};

/**
 * Get remaining time until rate limit resets
 * Returns time in milliseconds
 */
export const getRateLimitResetTime = (): number => {
  const history = getSubmissionHistory();
  if (history.length === 0) return 0;
  
  const oldestSubmission = history[0];
  const remainingTime = TIME_WINDOW - (Date.now() - oldestSubmission);
  return Math.max(0, remainingTime);
};

/**
 * Get remaining time in human-readable format
 */
export const getRateLimitResetHours = (): number => {
  const remainingMs = getRateLimitResetTime();
  return Math.ceil(remainingMs / (60 * 60 * 1000));
};

/**
 * Check for spam keywords in content
 */
export const containsSpamKeywords = (content: string): boolean => {
  const lowerContent = content.toLowerCase();
  return SPAM_KEYWORDS.some(keyword => lowerContent.includes(keyword));
};

/**
 * Validate form timing (prevent instant bot submissions)
 */
export const isValidFormTiming = (startTime: number, minTime = 3000): boolean => {
  const timeTaken = Date.now() - startTime;
  return timeTaken >= minTime;
};

/**
 * Validate honeypot field (should be empty)
 */
export const isHoneypotValid = (honeypotValue: string): boolean => {
  return honeypotValue === '';
};

/**
 * Comprehensive form security validation
 * Returns { valid: boolean, error?: string }
 */
export interface SecurityValidationResult {
  valid: boolean;
  error?: string;
}

export const validateFormSecurity = (
  honeypot: string,
  formStartTime: number,
  email: string,
  subject: string,
  message: string
): SecurityValidationResult => {
  // Check honeypot
  if (!isHoneypotValid(honeypot)) {
    return { valid: false, error: 'Spam detected' };
  }
  
  // Check form timing
  if (!isValidFormTiming(formStartTime)) {
    return { valid: false, error: 'Please take your time to fill the form' };
  }
  
  // Check rate limiting
  if (isRateLimited()) {
    const hoursRemaining = getRateLimitResetHours();
    return { 
      valid: false, 
      error: `Rate limit exceeded. You can submit ${MAX_SUBMISSIONS} messages per 24 hours. Please try again in ${hoursRemaining} hours.` 
    };
  }
  
  // Check email rate limiting
  if (isEmailRateLimited(email)) {
    return { 
      valid: false, 
      error: `This email has reached the maximum of ${MAX_SUBMISSIONS_PER_EMAIL} messages per 24 hours` 
    };
  }
  
  // Check spam keywords
  const content = `${subject} ${message}`;
  if (containsSpamKeywords(content)) {
    return { 
      valid: false, 
      error: 'Your message contains prohibited content' 
    };
  }
  
  return { valid: true };
};

/**
 * Clear all security data (for testing purposes)
 */
export const clearSecurityData = (): void => {
  localStorage.removeItem(RATE_LIMIT_KEY);
  localStorage.removeItem(EMAIL_TRACKING_KEY);
  sessionStorage.removeItem(SESSION_FINGERPRINT_KEY);
};
