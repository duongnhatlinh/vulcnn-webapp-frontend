import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import FileUpload from "../components/scan/FileUpload";
import ScanOptions from "../components/scan/ScanOptions";
import SelectedFilesList from "../components/scan/SelectedFilesList";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Alert from "../components/common/Alert";
import { useScan } from "../hooks/useScan";
import { useProject } from "../hooks/useProject";

const ScanPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [options, setOptions] = useState({
    deepScan: false,
    includeLibraries: false,
    detailedReport: true,
    pdgVisualization: true,
  });
  const [projectId, setProjectId] = useState(null);
  const [project, setProject] = useState(null);
  const [alert, setAlert] = useState(null);

  const { createScan, loading: scanLoading, error: scanError } = useScan();
  const {
    fetchProject,
    loading: projectLoading,
    error: projectError,
  } = useProject();

  // Parse projectId from URL query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const projectIdParam = queryParams.get("projectId");

    if (projectIdParam) {
      setProjectId(projectIdParam);

      // Fetch project info if projectId is available
      fetchProject(projectIdParam)
        .then((projectData) => {
          setProject(projectData);
        })
        .catch((error) => {
          setAlert({
            type: "error",
            message: `Failed to load project: ${
              error.message || "Unknown error"
            }`,
          });
        });
    }
  }, [location.search, fetchProject]);

  // Handle file selection
  const handleFilesSelected = useCallback((selectedFiles) => {
    setFiles(selectedFiles);
  }, []);

  // Handle file removal
  const handleRemoveFile = useCallback(
    (index) => {
      setFiles(files.filter((_, i) => i !== index));
    },
    [files]
  );

  // Handle scan options change
  const handleOptionChange = useCallback((newOptions) => {
    setOptions(newOptions);
  }, []);

  // Start scan
  const handleStartScan = async () => {
    if (files.length === 0) {
      setAlert({
        type: "error",
        message: "Please select at least one file to scan",
      });
      return;
    }

    try {
      // Prepare scan data
      const scanData = {
        files: files,
        options: options,
      };

      // Add project ID if available
      if (projectId) {
        scanData.projectId = projectId;
      }

      // Call API to create scan
      const result = await createScan(scanData);

      // Navigate to results page with scan ID
      if (result && result.scan && result.scan.id) {
        navigate(`/results/${result.scan.id}`);
      } else {
        throw new Error("Failed to get scan ID from response");
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: `Failed to start scan: ${error.message || "Unknown error"}`,
      });
    }
  };

  // Show errors from hooks
  useEffect(() => {
    if (scanError) {
      setAlert({
        type: "error",
        message: scanError,
      });
    } else if (projectError) {
      setAlert({
        type: "error",
        message: projectError,
      });
    }
  }, [scanError, projectError]);

  return (
    <MainLayout isAuthenticated={true}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {alert && (
          <div className="mb-6">
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          </div>
        )}

        {/* Project info if available */}
        {projectLoading ? (
          <div className="text-center py-4">
            <p>Loading project information...</p>
          </div>
        ) : (
          project && (
            <Card className="mb-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Scan for Project: {project.name}
                </h2>
                {project.description && (
                  <p className="mt-1 text-sm text-gray-600">
                    {project.description}
                  </p>
                )}
              </div>
            </Card>
          )
        )}

        {/* Scan Setup */}
        <Card
          title="Upload C/C++ Files for Vulnerability Analysis"
          className="mb-6"
        >
          <div className="md:grid md:grid-cols-2 md:gap-6">
            <div>
              <FileUpload onFilesSelected={handleFilesSelected} />

              <SelectedFilesList
                files={files}
                onRemoveFile={handleRemoveFile}
              />
            </div>

            <div>
              <ScanOptions options={options} onChange={handleOptionChange} />

              <div className="mt-6">
                <Button
                  type="button"
                  onClick={handleStartScan}
                  disabled={scanLoading || files.length === 0}
                  isLoading={scanLoading}
                  fullWidth
                >
                  Start Scan
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Information about scanning */}
        <Card title="About Code Scanning">
          <div className="prose max-w-none">
            <p>
              VulCNN uses a deep learning approach to detect vulnerabilities in
              C/C++ code. The scanning process involves:
            </p>
            <ol className="list-decimal list-inside ml-4 space-y-1">
              <li>Code normalization to standardize your code</li>
              <li>Program Dependency Graph (PDG) generation for analysis</li>
              <li>Neural network image-based detection of vulnerabilities</li>
              <li>Generation of detailed reports with recommendations</li>
            </ol>
            <p className="mt-4">
              For best results, upload complete source files that compile
              correctly. VulCNN can detect various vulnerabilities including
              buffer overflows, format string vulnerabilities, integer
              overflows, and more.
            </p>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ScanPage;
