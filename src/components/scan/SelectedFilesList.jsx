import React from "react";

const SelectedFilesList = ({ files, onRemoveFile }) => {
  if (!files || files.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        Selected Files ({files.length})
      </h3>
      <div className="bg-gray-50 p-3 rounded-md border border-gray-200 max-h-48 overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {files.map((file, index) => (
            <li key={index} className="py-2 flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-sm text-gray-600 truncate max-w-xs">
                  {file.name}
                </span>
              </div>
              {onRemoveFile && (
                <button
                  type="button"
                  onClick={() => onRemoveFile(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectedFilesList;
