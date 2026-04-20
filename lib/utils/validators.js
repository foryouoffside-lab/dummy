// lib/utils/validators.js

/**
 * Validators
 * Input validation functions for the entire application
 */

/**
 * Validate email format
 */
export function validateEmail(email) {
  if (!email) return { isValid: false, error: 'Email is required' };
  
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
}

/**
 * Validate password
 */
export function validatePassword(password, options = {}) {
  const { minLength = 6, requireUppercase = false, requireLowercase = false, requireNumbers = false, requireSpecial = false } = options;
  
  if (!password) return { isValid: false, error: 'Password is required' };
  
  if (password.length < minLength) {
    return { isValid: false, error: `Password must be at least ${minLength} characters` };
  }
  
  if (requireUppercase && !/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }
  
  if (requireLowercase && !/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }
  
  if (requireNumbers && !/[0-9]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }
  
  if (requireSpecial && !/[^a-zA-Z0-9]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one special character' };
  }
  
  return { isValid: true };
}

/**
 * Validate username
 */
export function validateUsername(username) {
  if (!username) return { isValid: false, error: 'Username is required' };
  
  if (username.length < 3) {
    return { isValid: false, error: 'Username must be at least 3 characters' };
  }
  
  if (username.length > 30) {
    return { isValid: false, error: 'Username must be less than 30 characters' };
  }
  
  const regex = /^[a-z0-9_]+$/;
  if (!regex.test(username)) {
    return { isValid: false, error: 'Username can only contain lowercase letters, numbers, and underscores' };
  }
  
  return { isValid: true };
}

/**
 * Validate name
 */
export function validateName(name) {
  if (!name) return { isValid: false, error: 'Name is required' };
  
  if (name.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }
  
  if (name.length > 50) {
    return { isValid: false, error: 'Name must be less than 50 characters' };
  }
  
  return { isValid: true };
}

/**
 * Validate bio
 */
export function validateBio(bio) {
  if (!bio) return { isValid: true }; // Bio is optional
  
  if (bio.length > 500) {
    return { isValid: false, error: 'Bio must be less than 500 characters' };
  }
  
  return { isValid: true };
}

/**
 * Validate score
 */
export function validateScore(score) {
  if (score === undefined || score === null) {
    return { isValid: false, error: 'Score is required' };
  }
  
  if (typeof score !== 'number') {
    return { isValid: false, error: 'Score must be a number' };
  }
  
  if (score < 0 || score > 100) {
    return { isValid: false, error: 'Score must be between 0 and 100' };
  }
  
  return { isValid: true };
}

/**
 * Validate accuracy
 */
export function validateAccuracy(accuracy) {
  if (accuracy === undefined || accuracy === null) {
    return { isValid: true }; // Accuracy is optional
  }
  
  if (typeof accuracy !== 'number') {
    return { isValid: false, error: 'Accuracy must be a number' };
  }
  
  if (accuracy < 0 || accuracy > 100) {
    return { isValid: false, error: 'Accuracy must be between 0 and 100' };
  }
  
  return { isValid: true };
}

/**
 * Validate duration
 */
export function validateDuration(duration) {
  if (!duration && duration !== 0) {
    return { isValid: false, error: 'Duration is required' };
  }
  
  if (typeof duration !== 'number') {
    return { isValid: false, error: 'Duration must be a number' };
  }
  
  if (duration < 1) {
    return { isValid: false, error: 'Duration must be at least 1 second' };
  }
  
  if (duration > 3600) {
    return { isValid: false, error: 'Duration cannot exceed 1 hour' };
  }
  
  return { isValid: true };
}

/**
 * Validate reaction time
 */
export function validateReactionTime(reactionTime) {
  if (reactionTime === undefined || reactionTime === null) {
    return { isValid: true }; // Reaction time is optional
  }
  
  if (typeof reactionTime !== 'number') {
    return { isValid: false, error: 'Reaction time must be a number' };
  }
  
  if (reactionTime < 0) {
    return { isValid: false, error: 'Reaction time cannot be negative' };
  }
  
  if (reactionTime > 10000) {
    return { isValid: false, error: 'Reaction time exceeds maximum allowed' };
  }
  
  return { isValid: true };
}

/**
 * Validate drill ID
 */
export function validateDrillId(drillId) {
  if (!drillId) {
    return { isValid: false, error: 'Drill ID is required' };
  }
  
  if (typeof drillId !== 'string') {
    return { isValid: false, error: 'Drill ID must be a string' };
  }
  
  if (drillId.length > 100) {
    return { isValid: false, error: 'Drill ID is too long' };
  }
  
  return { isValid: true };
}

/**
 * Validate category
 */
export function validateCategory(category) {
  const validCategories = ['memory', 'cognitive', 'visual', 'motor', 'academic', 'productivity', 'mental-fitness', 'physical'];
  
  if (!category) {
    return { isValid: false, error: 'Category is required' };
  }
  
  if (!validCategories.includes(category)) {
    return { isValid: false, error: 'Invalid category' };
  }
  
  return { isValid: true };
}

/**
 * Validate difficulty
 */
export function validateDifficulty(difficulty) {
  const validDifficulties = ['beginner', 'easy', 'intermediate', 'medium', 'advanced', 'hard', 'expert'];
  
  if (!difficulty) {
    return { isValid: false, error: 'Difficulty is required' };
  }
  
  if (!validDifficulties.includes(difficulty)) {
    return { isValid: false, error: 'Invalid difficulty' };
  }
  
  return { isValid: true };
}

/**
 * Validate file type
 */
export function validateFileType(file, allowedTypes) {
  if (!file) {
    return { isValid: false, error: 'File is required' };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}` };
  }
  
  return { isValid: true };
}

/**
 * Validate file size
 */
export function validateFileSize(file, maxSize) {
  if (!file) {
    return { isValid: false, error: 'File is required' };
  }
  
  if (file.size > maxSize) {
    return { isValid: false, error: `File size exceeds ${maxSize / (1024 * 1024)}MB limit` };
  }
  
  return { isValid: true };
}

/**
 * Validate date range
 */
export function validateDateRange(startDate, endDate) {
  if (!startDate || !endDate) {
    return { isValid: false, error: 'Start date and end date are required' };
  }
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (isNaN(start.getTime())) {
    return { isValid: false, error: 'Invalid start date' };
  }
  
  if (isNaN(end.getTime())) {
    return { isValid: false, error: 'Invalid end date' };
  }
  
  if (start > end) {
    return { isValid: false, error: 'Start date must be before end date' };
  }
  
  return { isValid: true };
}

/**
 * Validate pagination params
 */
export function validatePagination(page, limit) {
  const validatedPage = Math.max(1, parseInt(page) || 1);
  const validatedLimit = Math.min(100, Math.max(1, parseInt(limit) || 20));
  
  return { page: validatedPage, limit: validatedLimit };
}

/**
 * Validate search query
 */
export function validateSearchQuery(query) {
  if (!query) return '';
  return query.trim().substring(0, 100);
}

/**
 * Validate object ID
 */
export function validateObjectId(id) {
  if (!id) return false;
  const pattern = /^[a-f\d]{24}$/i;
  return pattern.test(id);
}

/**
 * Validate URL
 */
export function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate phone number
 */
export function validatePhoneNumber(phone) {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return regex.test(phone);
}

/**
 * Validate ZIP code
 */
export function validateZipCode(zipCode) {
  const regex = /^\d{5}(-\d{4})?$/;
  return regex.test(zipCode);
}

/**
 * Validate credit card number (Luhn algorithm)
 */
export function validateCreditCard(cardNumber) {
  const sanitized = cardNumber.replace(/\D/g, '');
  if (sanitized.length < 13 || sanitized.length > 19) return false;
  
  let sum = 0;
  let alternate = false;
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized.charAt(i), 10);
    if (alternate) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

/**
 * Validate form data with schema
 */
export function validateForm(data, schema) {
  const errors = {};
  
  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];
    
    if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
      errors[field] = `${field} is required`;
      continue;
    }
    
    if (value && rules.minLength && value.length < rules.minLength) {
      errors[field] = `${field} must be at least ${rules.minLength} characters`;
    }
    
    if (value && rules.maxLength && value.length > rules.maxLength) {
      errors[field] = `${field} must be less than ${rules.maxLength} characters`;
    }
    
    if (value && rules.pattern && !rules.pattern.test(value)) {
      errors[field] = rules.message || `Invalid ${field} format`;
    }
    
    if (rules.custom && !rules.custom(value)) {
      errors[field] = rules.message || `Invalid ${field}`;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export default {
  validateEmail,
  validatePassword,
  validateUsername,
  validateName,
  validateBio,
  validateScore,
  validateAccuracy,
  validateDuration,
  validateReactionTime,
  validateDrillId,
  validateCategory,
  validateDifficulty,
  validateFileType,
  validateFileSize,
  validateDateRange,
  validatePagination,
  validateSearchQuery,
  validateObjectId,
  validateUrl,
  validatePhoneNumber,
  validateZipCode,
  validateCreditCard,
  validateForm
};