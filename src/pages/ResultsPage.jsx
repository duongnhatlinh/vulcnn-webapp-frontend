import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";

const ResultsPage = () => {
  const [activeTab, setActiveTab] = useState("results");

  // Sample results data
  const vulnerabilities = [
    {
      id: 1,
      function: "main",
      line: 15,
      severity: "high",
      type: "Buffer Overflow",
      description: "Potential buffer overflow in strcpy operation",
      code: "strcpy(buffer, input);",
      cwe: "CWE-119",
    },
    {
      id: 2,
      function: "parse_options",
      line: 32,
      severity: "medium",
      type: "Unvalidated Input",
      description: "User input is not properly validated before use",
      code: "system(command);",
      cwe: "CWE-20",
    },
    {
      id: 3,
      function: "image_generation",
      line: 78,
      severity: "low",
      type: "Resource Leak",
      description: "File handle not properly closed",
      code: 'FILE* f = fopen(filename, "r");',
      cwe: "CWE-772",
    },
  ];

  // Sample code with highlighted vulnerability
  const sampleCode = `#include <stdio.h>
#include <string.h>

int main(int argc, char **argv) {
    char buffer[10];
    char *input = argv[1];
    
    // This is vulnerable to buffer overflow
    strcpy(buffer, input);
    
    printf("Input: %s\\n", buffer);
    return 0;
}`;

  return (
    <MainLayout isAuthenticated={true}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Results Section */}
        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                className={`${
                  activeTab === "results"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab("results")}
              >
                Results Overview
              </button>
              <button
                className={`${
                  activeTab === "code"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab("code")}
              >
                Code View
              </button>
              <button
                className={`${
                  activeTab === "pdg"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab("pdg")}
              >
                PDG Visualization
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "results" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Vulnerability Scan Results
                  </h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                      Export PDF
                    </button>
                    <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                      Export CSV
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4 mb-6">
                  <div className="bg-red-100 p-4 rounded-lg flex-1">
                    <div className="text-2xl font-bold text-red-700">1</div>
                    <div className="text-sm text-red-700">High Severity</div>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-lg flex-1">
                    <div className="text-2xl font-bold text-yellow-700">1</div>
                    <div className="text-sm text-yellow-700">
                      Medium Severity
                    </div>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg flex-1">
                    <div className="text-2xl font-bold text-blue-700">1</div>
                    <div className="text-sm text-blue-700">Low Severity</div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Severity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Function
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Line
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          CWE
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {vulnerabilities.map((vuln) => (
                        <tr key={vuln.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${
                                vuln.severity === "high"
                                  ? "bg-red-100 text-red-800"
                                  : vuln.severity === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {vuln.severity}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {vuln.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {vuln.function}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {vuln.line}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {vuln.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {vuln.cwe}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "code" && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Source Code View
                </h3>
                <div className="bg-gray-800 rounded-lg p-4 text-white font-mono text-sm overflow-x-auto">
                  {sampleCode.split("\n").map((line, index) => (
                    <div
                      key={index}
                      className={`${
                        index === 7 ? "bg-red-900 bg-opacity-40" : ""
                      }`}
                    >
                      <span className="inline-block w-8 text-gray-500">
                        {index + 1}
                      </span>
                      {line}
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Buffer Overflow (CWE-119)
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>
                          The strcpy function at line 8 does not check if the
                          source string fits in the destination buffer. This can
                          lead to a buffer overflow if the input is larger than
                          10 bytes.
                        </p>
                      </div>
                      <div className="mt-2">
                        <div className="text-sm font-medium text-red-800">
                          Recommendation:
                        </div>
                        <p className="text-sm text-red-700 mt-1">
                          Use strncpy or similar functions that allow specifying
                          a maximum length, or ensure the input is validated
                          before copying.
                        </p>
                        <div className="mt-2 bg-gray-800 p-2 rounded text-white font-mono text-xs">
                          strncpy(buffer, input, sizeof(buffer) - 1);
                          <br />
                          buffer[sizeof(buffer) - 1] = '\0';
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "pdg" && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Program Dependency Graph
                </h3>
                <div className="border border-gray-300 rounded-lg p-4 flex justify-center">
                  <svg width="600" height="400" className="max-w-full">
                    {/* Simulated PDG visualization */}
                    <rect width="600" height="400" fill="#f9fafb" />
                    <g transform="translate(300, 50)">
                      {/* Nodes */}
                      <circle
                        cx="0"
                        cy="0"
                        r="30"
                        fill="#dbeafe"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                      <text x="0" y="5" textAnchor="middle" fontSize="12">
                        main()
                      </text>

                      <circle
                        cx="-150"
                        cy="100"
                        r="30"
                        fill="#dbeafe"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                      <text x="-150" y="105" textAnchor="middle" fontSize="12">
                        buffer
                      </text>

                      <circle
                        cx="0"
                        cy="100"
                        r="30"
                        fill="#dbeafe"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                      <text x="0" y="105" textAnchor="middle" fontSize="12">
                        input
                      </text>

                      <circle
                        cx="150"
                        cy="100"
                        r="30"
                        fill="#fee2e2"
                        stroke="#ef4444"
                        strokeWidth="2"
                      />
                      <text x="150" y="105" textAnchor="middle" fontSize="12">
                        strcpy
                      </text>

                      <circle
                        cx="0"
                        cy="200"
                        r="30"
                        fill="#dbeafe"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                      <text x="0" y="205" textAnchor="middle" fontSize="12">
                        printf
                      </text>

                      <circle
                        cx="0"
                        cy="300"
                        r="30"
                        fill="#dbeafe"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                      <text x="0" y="305" textAnchor="middle" fontSize="12">
                        return
                      </text>

                      {/* Edges */}
                      <line
                        x1="0"
                        y1="30"
                        x2="-150"
                        y2="70"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                      />
                      <line
                        x1="0"
                        y1="30"
                        x2="0"
                        y2="70"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                      />
                      <line
                        x1="0"
                        y1="30"
                        x2="150"
                        y2="70"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                      />

                      <line
                        x1="-150"
                        y1="130"
                        x2="150"
                        y2="70"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                      />
                      <line
                        x1="0"
                        y1="130"
                        x2="150"
                        y2="70"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                      />

                      <line
                        x1="150"
                        y1="130"
                        x2="0"
                        y2="170"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                      />
                      <line
                        x1="0"
                        y1="130"
                        x2="0"
                        y2="170"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                      />

                      <line
                        x1="0"
                        y1="230"
                        x2="0"
                        y2="270"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                      />
                    </g>
                    <text x="450" y="380" fontSize="10" fill="#6b7280">
                      Highlighted in red: Vulnerable code block
                    </text>
                  </svg>
                </div>
                <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">
                        PDG Analysis
                      </h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>
                          The Program Dependency Graph shows data flow between
                          operations. The red node indicates the vulnerable
                          operation where user input flows into a buffer without
                          size checking.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ResultsPage;
