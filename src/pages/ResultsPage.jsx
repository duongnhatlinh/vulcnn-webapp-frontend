import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import VulnerabilitySummary from "../components/results/VulnerabilitySummary";
import VulnerabilityDetail from "../components/results/VulnerabilityDetail";
import CodeDisplay from "../components/common/CodeDisplay";
import PDGVisualization from "../components/pdg/PDGVisualization";
import Alert from "../components/common/Alert";
import Button from "../components/common/Button";
import { useScan } from "../hooks/useScan";
import Card from "../components/common/Card";
import api from "../api/api";

const ResultsPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("results");
  const [selectedVulnerability, setSelectedVulnerability] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const {
    fetchScan,
    getScanResults,
    getScanPDG,
    generateScanReport,
    loading,
    error,
  } = useScan();
  const [scan, setScan] = useState(null);
  const [scanResults, setScanResults] = useState(null);
  const [pdgData, setPdgData] = useState(null);
  const [alert, setAlert] = useState(null);

  // Fetch scan data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get basic scan info
        const scanData = await fetchScan(id);
        setScan(scanData);

        // Get scan results
        const results = await getScanResults(id);
        setScanResults(results);

        // Select first file by default if available
        if (results && results.results && results.results.length > 0) {
          setSelectedFileId(results.results[0].file.id);
        }
      } catch (err) {
        console.error("Failed to fetch scan data:", err);
        setAlert({
          type: "error",
          message: `Failed to load scan results: ${
            err.message || "Unknown error"
          }`,
        });
      }
    };

    fetchData();
  }, [id, fetchScan, getScanResults]);

  // Fetch file content when selectedFileId changes
  useEffect(() => {
    const fetchFileContent = async () => {
      if (!selectedFileId) return;

      try {
        const response = await api.get(
          `/projects/${scan?.project_id}/files/${selectedFileId}/content`
        );
        setFileContent(response.data.content || "// No content available");
      } catch (err) {
        console.error("Failed to fetch file content:", err);
        setFileContent("// Failed to load file content");
      }
    };

    if (scan && selectedFileId) {
      fetchFileContent();
    }
  }, [selectedFileId, scan]);

  // Fetch PDG when tab changes to pdg and a file is selected
  useEffect(() => {
    const fetchPDG = async () => {
      if (activeTab === "pdg" && selectedFileId && scan) {
        try {
          const pdg = await getScanPDG(id, selectedFileId);
          setPdgData(pdg);
        } catch (err) {
          console.error("Failed to fetch PDG:", err);
          setAlert({
            type: "error",
            message: `Failed to load PDG: ${err.message || "Unknown error"}`,
          });
        }
      }
    };

    fetchPDG();
  }, [activeTab, selectedFileId, id, scan, getScanPDG]);

  // Helper function to find vulnerabilities for selected file
  const getVulnerabilitiesForFile = () => {
    if (!scanResults || !scanResults.results) return [];

    const fileResult = scanResults.results.find(
      (r) => r.file.id === selectedFileId
    );
    return fileResult ? fileResult.vulnerabilities || [] : [];
  };

  // Helper function to get all vulnerabilities
  const getAllVulnerabilities = () => {
    if (!scanResults || !scanResults.results) return [];

    return scanResults.results.flatMap(
      (result) => result.vulnerabilities || []
    );
  };

  // Handle report generation
  const handleGenerateReport = async (format) => {
    try {
      setAlert({
        type: "info",
        message: "Generating report, please wait...",
      });

      await generateScanReport(id, format);

      setAlert({
        type: "success",
        message: `Report in ${format.toUpperCase()} format has been generated successfully`,
      });
    } catch (err) {
      setAlert({
        type: "error",
        message: `Failed to generate report: ${err.message || "Unknown error"}`,
      });
    }
  };

  if (loading && !scan) {
    return (
      <MainLayout isAuthenticated={true}>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-10">
            <svg
              className="animate-spin h-10 w-10 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
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
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error && !scan) {
    return (
      <MainLayout isAuthenticated={true}>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Alert type="error" title="Error loading scan" message={error} />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout isAuthenticated={true}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {alert && (
          <div className="mb-4">
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          </div>
        )}

        {/* Scan Info */}
        {scan && (
          <Card className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Scan Results: {scan.id}
                </h1>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`${
                        scan.status === "completed"
                          ? "text-green-600"
                          : scan.status === "failed"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {scan.status.charAt(0).toUpperCase() +
                        scan.status.slice(1)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Started:</span>{" "}
                    {new Date(scan.started_at).toLocaleString()}
                  </p>
                  {scan.completed_at && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Completed:</span>{" "}
                      {new Date(scan.completed_at).toLocaleString()}
                    </p>
                  )}
                  {scan.project_id && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Project ID:</span>{" "}
                      {scan.project_id}
                    </p>
                  )}
                </div>
              </div>
              <Button
                onClick={() => handleGenerateReport("pdf")}
                variant="secondary"
                size="sm"
              >
                Download Report
              </Button>
            </div>
          </Card>
        )}

        {/* Results Tabs */}
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
                <VulnerabilitySummary
                  vulnerabilities={getAllVulnerabilities()}
                  onVulnerabilitySelect={setSelectedVulnerability}
                  onGenerateReport={handleGenerateReport}
                />

                {selectedVulnerability && (
                  <VulnerabilityDetail vulnerability={selectedVulnerability} />
                )}
              </div>
            )}

            {activeTab === "code" && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Source Code View
                </h3>

                {/* File selector */}
                {scanResults &&
                  scanResults.results &&
                  scanResults.results.length > 0 && (
                    <div className="mb-4">
                      <label
                        htmlFor="file-select"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Select File
                      </label>
                      <select
                        id="file-select"
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        value={selectedFileId || ""}
                        onChange={(e) => setSelectedFileId(e.target.value)}
                      >
                        {scanResults.results.map((result) => (
                          <option key={result.file.id} value={result.file.id}>
                            {result.file.filename}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                {/* Code display */}
                <CodeDisplay
                  code={fileContent}
                  language="c"
                  highlightedLines={getVulnerabilitiesForFile().map(
                    (v) => v.line_number
                  )}
                />

                {/* Vulnerabilities for this file */}
                {getVulnerabilitiesForFile().length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-900 mb-3">
                      Vulnerabilities in this file
                    </h4>
                    {getVulnerabilitiesForFile().map((vuln) => (
                      <VulnerabilityDetail key={vuln.id} vulnerability={vuln} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "pdg" && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Program Dependency Graph
                </h3>

                {/* File selector for PDG */}
                {scanResults &&
                  scanResults.results &&
                  scanResults.results.length > 0 && (
                    <div className="mb-4">
                      <label
                        htmlFor="pdg-file-select"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Select File
                      </label>
                      <select
                        id="pdg-file-select"
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        value={selectedFileId || ""}
                        onChange={(e) => setSelectedFileId(e.target.value)}
                      >
                        {scanResults.results.map((result) => (
                          <option key={result.file.id} value={result.file.id}>
                            {result.file.filename}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                {/* PDG visualization */}
                {loading && !pdgData ? (
                  <div className="flex justify-center items-center py-10">
                    <svg
                      className="animate-spin h-10 w-10 text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
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
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </div>
                ) : (
                  <PDGVisualization pdgData={pdgData} />
                )}

                {/* PDG explanation */}
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
                          operations. Red nodes indicate potential vulnerable
                          operations where user input may flow into unsafe
                          operations.
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
