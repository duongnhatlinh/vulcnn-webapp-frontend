import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Alert from "../components/common/Alert";
import { useProject } from "../hooks/useProject";
// import SeverityBadge from "../components/common/SeverityBadge";

const ProjectListPage = () => {
  const { projects, loading, fetchAllProjects, deleteProject } = useProject();
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchAllProjects().catch((err) => {
      setAlert({
        type: "error",
        message: "Failed to load projects: " + (err.message || "Unknown error"),
      });
    });
  }, [fetchAllProjects]);

  const handleDelete = async (id, projectName) => {
    if (
      window.confirm(
        `Are you sure you want to delete project "${projectName}"?`
      )
    ) {
      try {
        await deleteProject(id);
        setAlert({
          type: "success",
          message: "Project deleted successfully",
        });
      } catch (err) {
        setAlert({
          type: "error",
          message:
            "Failed to delete project: " + (err.message || "Unknown error"),
        });
      }
    }
  };

  const renderProjects = () => {
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

    if (!projects || projects.length === 0) {
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
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No projects
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new project.
          </p>
          <div className="mt-6">
            <Link to="/projects/create">
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
                New Project
              </Button>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.id}
            title={
              <Link
                to={`/projects/${project.id}`}
                className="text-lg font-medium text-blue-600 hover:text-blue-800"
              >
                {project.name}
              </Link>
            }
            className="h-full flex flex-col"
          >
            <div className="flex-grow">
              <p className="text-sm text-gray-500 mb-4">
                {project.description || "No description"}
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  {project.files_count || 0} Files
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
                  {project.scans_count || 0} Scans
                </div>
              </div>

              {project.vulnerabilities && (
                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    Vulnerabilities
                  </div>
                  <div className="flex space-x-2">
                    {project.vulnerabilities.high > 0 && (
                      <div className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-xs font-medium">
                        {project.vulnerabilities.high} High
                      </div>
                    )}
                    {project.vulnerabilities.medium > 0 && (
                      <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-xs font-medium">
                        {project.vulnerabilities.medium} Medium
                      </div>
                    )}
                    {project.vulnerabilities.low > 0 && (
                      <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
                        {project.vulnerabilities.low} Low
                      </div>
                    )}
                    {!project.vulnerabilities.high &&
                      !project.vulnerabilities.medium &&
                      !project.vulnerabilities.low && (
                        <div className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">
                          No Vulnerabilities
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-between">
              <Link to={`/projects/${project.id}`}>
                <Button variant="primary" size="sm">
                  View Details
                </Button>
              </Link>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(project.id, project.name)}
              >
                Delete
              </Button>
            </div>
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
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your C/C++ projects for vulnerability scanning
            </p>
          </div>
          <Link to="/projects/create">
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
              New Project
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

        <div className="px-4 sm:px-6">{renderProjects()}</div>
      </div>
    </MainLayout>
  );
};

export default ProjectListPage;
