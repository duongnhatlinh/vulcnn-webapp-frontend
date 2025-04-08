import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Alert from "../components/common/Alert";
import { useProject } from "../hooks/useProject";
import { useScan } from "../hooks/useScan";
// import SeverityBadge from "../components/common/SeverityBadge";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    project,
    loading: projectLoading,
    error: projectError,
    fetchProject,
    deleteProject,
  } = useProject(id);
  const { fetchAllScans, loading: scansLoading } = useScan();
  const [scans, setScans] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchProject(id);
        const scansData = await fetchAllScans();
        // Filter scans for this project
        setScans(scansData.filter((scan) => scan.project_id === id));
      } catch (err) {
        setAlert({
          type: "error",
          message:
            "Failed to load project data: " + (err.message || "Unknown error"),
        });
      }
    };

    loadData();
  }, [id, fetchProject, fetchAllScans]);

  const handleDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete project "${project?.name}"?`
      )
    ) {
      try {
        await deleteProject(id);
        setAlert({
          type: "success",
          message: "Project deleted successfully",
        });

        // Navigate back to projects list after successful deletion
        setTimeout(() => {
          navigate("/projects");
        }, 2000);
      } catch (err) {
        setAlert({
          type: "error",
          message:
            "Failed to delete project: " + (err.message || "Unknown error"),
        });
      }
    }
  };

  if (projectLoading) {
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
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (projectError || !project) {
    return (
      <MainLayout isAuthenticated={true}>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Alert
            type="error"
            title="Error loading project"
            message={projectError || "Project not found"}
          />
          <div className="mt-4 flex justify-center">
            <Link to="/projects">
              <Button variant="secondary">Back to Projects</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout isAuthenticated={true}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {alert && (
          <div className="mb-4 px-4 sm:px-6">
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          </div>
        )}

        <div className="px-4 py-5 sm:px-6 bg-white shadow rounded-lg mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {project.name}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {project.description || "No description"}
              </p>
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
                  Created: {new Date(project.created_at).toLocaleDateString()}
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Last Updated:{" "}
                  {new Date(project.updated_at).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link to={`/projects/${id}/edit`}>
                <Button variant="secondary" size="sm">
                  <svg
                    className="-ml-1 mr-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </Button>
              </Link>
              <Button variant="danger" size="sm" onClick={handleDelete}>
                <svg
                  className="-ml-1 mr-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Project Stats */}
          <div className="lg:col-span-1 space-y-6">
            <Card title="Project Statistics">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Files:</span>
                  <span className="text-sm font-medium">
                    {project.files_count || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Scans:</span>
                  <span className="text-sm font-medium">{scans.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Last Scan:</span>
                  <span className="text-sm font-medium">
                    {scans.length > 0
                      ? new Date(scans[0].created_at).toLocaleDateString()
                      : "Never"}
                  </span>
                </div>

                {project.vulnerabilities && (
                  <>
                    <div className="pt-2 border-t border-gray-200">
                      <div className="text-sm font-medium text-gray-700 mb-2">
                        Vulnerabilities
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-red-600">High:</span>
                        <span className="text-sm font-medium text-red-600">
                          {project.vulnerabilities.high || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-yellow-600">Medium:</span>
                        <span className="text-sm font-medium text-yellow-600">
                          {project.vulnerabilities.medium || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-600">Low:</span>
                        <span className="text-sm font-medium text-blue-600">
                          {project.vulnerabilities.low || 0}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>

            <Card title="Quick Actions">
              <div className="space-y-3">
                <Link
                  to={`/scan?projectId=${id}`}
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
                  to={`/projects/${id}/files`}
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
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-green-600 font-medium">
                    Manage Files
                  </span>
                </Link>

                <Link
                  to={`/projects/${id}/report`}
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
            </Card>
          </div>

          {/* Right column - Scans */}
          <div className="lg:col-span-2">
            <Card
              title={
                <div className="flex justify-between items-center">
                  <span>Recent Scans</span>
                  <Link
                    to={`/scan?projectId=${id}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    New Scan
                  </Link>
                </div>
              }
              className="h-full"
            >
              {scansLoading ? (
                <div className="flex justify-center py-10">
                  <svg
                    className="animate-spin h-8 w-8 text-blue-500"
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
              ) : scans.length === 0 ? (
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
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No scans yet
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Start by scanning your project for vulnerabilities.
                  </p>
                  <div className="mt-6">
                    <Link to={`/scan?projectId=${id}`}>
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
                </div>
              ) : (
                <div className="overflow-hidden">
                  <ul className="divide-y divide-gray-200">
                    {scans.map((scan) => (
                      <li key={scan.id} className="py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <Link
                              to={`/results/${scan.id}`}
                              className="text-sm font-medium text-blue-600 hover:text-blue-800 truncate"
                            >
                              Scan #{scan.id}
                            </Link>
                            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                <svg
                                  className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
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

                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                <svg
                                  className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
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
                            </div>
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

                        {scan.status === "completed" &&
                          scan.vulnerabilities && (
                            <div className="mt-2">
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
                          )}

                        <div className="mt-2 flex">
                          <Link
                            to={`/results/${scan.id}`}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            View Results
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectDetailPage;
