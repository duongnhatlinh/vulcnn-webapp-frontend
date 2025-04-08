/**
 * Utility functions for handling files
 */

/**
 * Returns a human-readable file size
 * @param {number} bytes - Size in bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} Human-readable file size
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

/**
 * Checks if a file is a valid C/C++ file
 * @param {File} file - File object
 * @returns {boolean} True if file is valid
 */
export const isCCppFile = (file) => {
  if (!file) return false;

  const validExtensions = [".c", ".cpp", ".h", ".hpp"];
  const fileName = file.name || "";

  return validExtensions.some((ext) => fileName.toLowerCase().endsWith(ext));
};

/**
 * Creates a safe filename (removes invalid characters)
 * @param {string} fileName - Original filename
 * @returns {string} Safe filename
 */
export const sanitizeFileName = (fileName) => {
  return fileName
    .replace(/[^\w\s.-]/g, "") // Remove non-alphanumeric characters except spaces, dots, hyphens, and underscores
    .replace(/\s+/g, "_"); // Replace spaces with underscores
};

/**
 * Gets a file extension from a filename
 * @param {string} fileName - Filename
 * @returns {string} File extension (e.g., '.c', '.cpp')
 */
export const getFileExtension = (fileName) => {
  return fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 1);
};

/**
 * Reads a file as text
 * @param {File} file - File object
 * @returns {Promise<string>} File contents as text
 */
export const readFileAsText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });
};
