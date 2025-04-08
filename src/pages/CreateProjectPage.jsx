import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Alert from "../components/common/Alert";
import { useProject } from "../hooks/useProject";

const CreateProjectPage = () => {
  const navigate = useNavigate();
  const { createProject, loading, error } = useProject();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Project name is required";
    } else if (formData.name.length > 100) {
      errors.name = "Project name must be less than 100 characters";
    }

    if (formData.description && formData.description.length > 500) {
      errors.description = "Description must be less than 500 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitError(null);
      const newProject = await createProject(formData);
      navigate(`/projects/${newProject.id}`);
    } catch (err) {
      setSubmitError(
        err.message || "Failed to create project. Please try again."
      );
    }
  };

  return (
    <MainLayout isAuthenticated={true}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Create New Project
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Create a new project to organize your C/C++ files and
                vulnerability scans.
              </p>

              <div className="mt-6">
                <Link to="/projects">
                  <Button variant="secondary" size="sm">
                    Back to Projects
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-2">
            <Card>
              {submitError && (
                <Alert
                  type="error"
                  message={submitError}
                  onClose={() => setSubmitError(null)}
                  className="mb-4"
                />
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                        formErrors.name ? "border-red-300" : ""
                      }`}
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                        formErrors.description ? "border-red-300" : ""
                      }`}
                    />
                    {formErrors.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.description}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                      Brief description of your project. Optional.
                    </p>
                  </div>
                </div>

                <div className="pt-5 flex justify-end">
                  <Link to="/projects">
                    <Button
                      variant="secondary"
                      disabled={loading}
                      className="mr-3"
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" isLoading={loading}>
                    Create Project
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateProjectPage;
