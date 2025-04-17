import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { useAuth } from "../hooks/useAuth";


const Dashboard = () => {
  // Check if user is authenticated
  const { user } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  // Sample project data
  const projects = [
    {
      id: 1,
      name: "OpenSSL Integration",
      lastScan: "2025-03-25",
      vulnerabilities: {
        high: 2,
        medium: 3,
        low: 1,
      },
      status: "Completed",
    },
    {
      id: 2,
      name: "Payment Gateway",
      lastScan: "2025-03-20",
      vulnerabilities: {
        high: 0,
        medium: 1,
        low: 4,
      },
      status: "Completed",
    },
    {
      id: 3,
      name: "Authentication Module",
      lastScan: "2025-03-15",
      vulnerabilities: {
        high: 1,
        medium: 0,
        low: 2,
      },
      status: "Completed",
    },
  ];

  // Sample recent scans
  const recentScans = [
    {
      id: 1,
      projectId: 1,
      projectName: "OpenSSL Integration",
      date: "2025-03-25 14:30",
      status: "Completed",
      fileCount: 12,
    },
    {
      id: 2,
      projectId: 2,
      projectName: "Payment Gateway",
      date: "2025-03-20 10:15",
      status: "Completed",
      fileCount: 8,
    },
    {
      id: 3,
      projectId: 3,
      projectName: "Authentication Module",
      date: "2025-03-15 16:45",
      status: "Completed",
      fileCount: 5,
    },
  ];

  return (
    <MainLayout isAuthenticated={isAuthenticated}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          {/* Left column - Statistics */}
          <div className="md:col-span-1">
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Vulnerability Overview
              </h2>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">High Severity</span>
                </div>
                <span className="text-lg font-semibold">3</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Medium Severity</span>
                </div>
                <span className="text-lg font-semibold">4</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Low Severity</span>
                </div>
                <span className="text-lg font-semibold">7</span>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Quick Actions
              </h2>

              <div className="space-y-3">
                <Link
                  to="/scan"
                  className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg"
                >
                  <svg
                    className="h-6 w-6 text-blue-600 mr-3"
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
                  <span className="text-blue-600 font-medium">New Scan</span>
                </Link>

                <Link
                  to="/projects/create"
                  className="flex items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg"
                >
                  <svg
                    className="h-6 w-6 text-green-600 mr-3"
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
                  <span className="text-green-600 font-medium">
                    New Project
                  </span>
                </Link>

                <Link
                  to="/reports"
                  className="flex items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg"
                >
                  <svg
                    className="h-6 w-6 text-purple-600 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-purple-600 font-medium">
                    Generate Report
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right column - Projects and Recent Scans */}
          <div className="md:col-span-2 mt-6 md:mt-0">
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Your Projects
                </h2>
                <Link
                  to="/projects"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View All
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Project Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Last Scan
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Vulnerabilities
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projects.map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link
                            to={`/projects/${project.id}`}
                            className="text-blue-600 hover:text-blue-900 font-medium"
                          >
                            {project.name}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.lastScan}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              {project.vulnerabilities.high} high
                            </span>
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              {project.vulnerabilities.medium} medium
                            </span>
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {project.vulnerabilities.low} low
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Recent Scans
                </h2>
                <Link
                  to="/scans"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {recentScans.map((scan) => (
                  <div
                    key={scan.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between">
                      <Link
                        to={`/results/${scan.id}`}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        {scan.projectName}
                      </Link>
                      <span className="text-sm text-gray-500">{scan.date}</span>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Scanned {scan.fileCount} files
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {scan.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
