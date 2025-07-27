// -----------------------------
// Array Utilities
// -----------------------------

// Remove duplicates from an array
function uniqueArray(arr) {
  return [...new Set(arr)];
}

// Chunk array into smaller arrays
function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

// Flatten nested array
function flattenArray(arr) {
  return arr.flat(Infinity);
}

// Find max in array
function maxInArray(arr) {
  return Math.max(...arr);
}

// Find min in array
function minInArray(arr) {
  return Math.min(...arr);
}

// -----------------------------
// Object Utilities
// -----------------------------

// Deep clone an object
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Check if object is empty
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// Merge two objects
function mergeObjects(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

// Get nested property safely
function getNested(obj, path, defaultValue = undefined) {
  return path.split('.').reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : defaultValue;
  }, obj);
}

// -----------------------------
// String Utilities
// -----------------------------

// Capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// CamelCase to snake_case
function toSnakeCase(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

// Reverse a string
function reverseString(str) {
  return str.split('').reverse().join('');
}

// Count vowels
function countVowels(str) {
  return (str.match(/[aeiou]/gi) || []).length;
}

// -----------------------------
// Time Utilities
// -----------------------------

// Format Date
function formatDate(date = new Date()) {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

// Get time difference in minutes
function diffInMinutes(date1, date2) {
  return Math.abs((date2 - date1) / (1000 * 60));
}

// -----------------------------
// Random Utilities
// -----------------------------

// Generate random ID
function randomId(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// Generate UUID (v4-like)
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// -----------------------------
// Example Usage
// -----------------------------

console.log(uniqueArray([1, 2, 2, 3, 4, 4]));
console.log(chunkArray([1, 2, 3, 4, 5], 2));
console.log(flattenArray([1, [2, [3, 4]], 5]));
console.log(deepClone({ a: 1, b: { c: 2 } }));
console.log(toSnakeCase("thisIsTest"));
console.log(formatDate());
console.log(randomId(12));
console.log(uuid());
