import React from "react";

const ScanOptions = ({ options, onChange }) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    onChange({ ...options, [name]: checked });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Scan Options
      </label>
      <div className="space-y-2">
        <div className="flex items-center">
          <input
            id="deepScan"
            name="deepScan"
            type="checkbox"
            checked={options.deepScan || false}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="deepScan"
            className="ml-2 block text-sm text-gray-700"
          >
            Deep scan (slower but more accurate)
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="includeLibraries"
            name="includeLibraries"
            type="checkbox"
            checked={options.includeLibraries || false}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="includeLibraries"
            className="ml-2 block text-sm text-gray-700"
          >
            Include external libraries
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="detailedReport"
            name="detailedReport"
            type="checkbox"
            checked={options.detailedReport || false}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="detailedReport"
            className="ml-2 block text-sm text-gray-700"
          >
            Generate detailed report
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="pdgVisualization"
            name="pdgVisualization"
            type="checkbox"
            checked={options.pdgVisualization || false}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="pdgVisualization"
            className="ml-2 block text-sm text-gray-700"
          >
            Generate PDG visualization
          </label>
        </div>
      </div>
    </div>
  );
};

export default ScanOptions;
