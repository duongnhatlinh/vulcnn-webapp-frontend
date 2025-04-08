import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Alert from "../components/common/Alert";
import { useScan } from "../hooks/useScan";
import SeverityBadge from "../components/common/SeverityBadge";

const ScansListPage = () => {
  const { scans, loading, error, fetchAllScans } = useScan();
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchAllScans().catch((err) => {
      setAlert({
        type: "error",
        message: "Failed to load scans: " + (err.message || "Unknown error"),
      });
    });
  }, [fetchAllScans]);

  const renderScans = () => {
    if (loading) {
      return (
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
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      );
    }

    if (!scans || scans.length === 0) {
      return (
        <div className="text-center py-10">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No scans</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by scanning your C/C++ code for vulnerabilities.
          </p>
          <div className="mt-6">
            <Link to="/scan">
              <Button size="lg">
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                New Scan
              </Button>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {scans.map((scan) => (
          <Card key={scan.id}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <Link
                  to={`/results/${scan.id}`}
                  className="text-lg font-medium text-blue-600 hover:text-blue-800"
                >
                  Scan #{scan.id}
                </Link>

                {scan.project && (
                  <div className="mt-1">
                    <Link
                      to={`/projects/${scan.project.id}`}
                      className="text-sm text-gray-600 hover:text-gray-800"
                    >
                      Project: {scan.project.name}
                    </Link>
                  </div>
                )}

                <div className="mt-2 flex flex-wrap gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      className="mr-1.5 h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Date(scan.started_at).toLocaleString()}
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      className="mr-1.5 h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    {scan.files_count || 0} Files
                  </div>

                  <div className="flex items-center">
                    {scan.status === "completed" ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    ) : scan.status === "failed" ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Failed
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {scan.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0">
                <Link to={`/results/${scan.id}`}>
                  <Button variant="primary" size="sm">
                    View Results
                  </Button>
                </Link>
              </div>
            </div>

            {scan.status === "completed" && scan.vulnerabilities && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center">
                  <div className="mr-4">
                    <span className="text-sm font-medium text-gray-700">
                      Vulnerabilities:
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {scan.vulnerabilities.high > 0 && (
                      <div className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-xs font-medium">
                        {scan.vulnerabilities.high} High
                      </div>
                    )}
                    {scan.vulnerabilities.medium > 0 && (
                      <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-xs font-medium">
                        {scan.vulnerabilities.medium} Medium
                      </div>
                    )}
                    {scan.vulnerabilities.low > 0 && (
                      <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
                        {scan.vulnerabilities.low} Low
                      </div>
                    )}
                    {scan.vulnerabilities.high === 0 &&
                      scan.vulnerabilities.medium === 0 &&
                      scan.vulnerabilities.low === 0 && (
                        <div className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">
                          No Vulnerabilities
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    );
  };

  return (
    <MainLayout isAuthenticated={true}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Scans</h1>
            <p className="mt-1 text-sm text-gray-500">
              View all your vulnerability scan results
            </p>
          </div>
          <Link to="/scan">
            <Button>
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              New Scan
            </Button>
          </Link>
        </div>

        {alert && (
          <div className="mb-4 px-4 sm:px-6">
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          </div>
        )}

        <div className="px-4 sm:px-6">{renderScans()}</div>
      </div>
    </MainLayout>
  );
};

export default ScansListPage;
