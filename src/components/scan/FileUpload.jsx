import React, { useState, useRef } from "react";

const FileUpload = ({ onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const cFiles = Array.from(e.dataTransfer.files).filter(
        (file) =>
          file.name.endsWith(".c") ||
          file.name.endsWith(".cpp") ||
          file.name.endsWith(".h") ||
          file.name.endsWith(".hpp")
      );

      if (cFiles.length > 0) {
        onFilesSelected(cFiles);
      }
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const cFiles = Array.from(e.target.files).filter(
        (file) =>
          file.name.endsWith(".c") ||
          file.name.endsWith(".cpp") ||
          file.name.endsWith(".h") ||
          file.name.endsWith(".hpp")
      );

      if (cFiles.length > 0) {
        onFilesSelected(cFiles);
      }
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 flex justify-center items-center transition-colors ${
        isDragging
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-gray-400"
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="mt-1 text-sm text-gray-600">
          Drag and drop your C/C++ files here
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Supported file types: .c, .cpp, .h, .hpp
        </p>
        <button
          type="button"
          onClick={handleBrowseClick}
          className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Browse Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".c,.cpp,.h,.hpp"
          multiple
          onChange={handleFileInput}
        />
      </div>
    </div>
  );
};

export default FileUpload;
