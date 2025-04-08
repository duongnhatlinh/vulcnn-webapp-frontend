import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

const ScanPage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const handleFileDrop = useCallback((e) => {
    e.preventDefault();

    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const cppFiles = droppedFiles.filter(
        (file) =>
          file.name.endsWith(".c") ||
          file.name.endsWith(".cpp") ||
          file.name.endsWith(".h") ||
          file.name.endsWith(".hpp")
      );

      setFiles(cppFiles);
    }
  }, []);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      // Redirect to results page (in a real app, you'd create a scan and get an ID)
      navigate("/results/123");
    }, 3000);
  };

  return (
    <MainLayout isAuthenticated={true}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* File Upload Section */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Upload C/C++ File for Vulnerability Analysis
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex justify-center items-center"
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
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
                  <p className="mt-1 text-xs text-gray-500">or</p>
                  <label className="mt-2 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    Browse Files
                    <input
                      type="file"
                      className="hidden"
                      accept=".c,.cpp,.h,.hpp"
                      multiple
                      onChange={handleFileSelect}
                    />
                  </label>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Scan Options
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center">
                      <input
                        id="option1"
                        name="option1"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="option1"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Deep scan (slower but more accurate)
                      </label>
                    </div>
                    <div className="flex items-center mt-2">
                      <input
                        id="option2"
                        name="option2"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="option2"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Include external libraries
                      </label>
                    </div>
                    <div className="flex items-center mt-2">
                      <input
                        id="option3"
                        name="option3"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="option3"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Generate detailed report
                      </label>
                    </div>
                  </div>
                </div>

                {files.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selected Files ({files.length})
                    </label>
                    <div className="bg-gray-50 p-2 rounded max-h-32 overflow-y-auto">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="text-sm text-gray-600 truncate"
                        >
                          {file.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleStartScan}
                  className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  disabled={isScanning || files.length === 0}
                >
                  {isScanning ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Scanning...
                    </span>
                  ) : (
                    "Start Scan"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ScanPage;
