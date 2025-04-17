import { useState, useEffect, useCallback } from "react";
import * as projectAPI from "../api/projects";

export const useProject = (projectId = null) => {
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [projectFiles, setProjectFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (projectId) {
      fetchProject(projectId);
    }
  }, [projectId]);

  const fetchProject = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectAPI.getProjectById(id);
      setProject(data);

      // If project has files array, set them directly
      if (data.files) {
        setProjectFiles(data.files);
      }

      return data;
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch project";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectAPI.getAllProjects();
      setProjects(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch projects";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(async (projectData) => {
    try {
      setLoading(true);
      setError(null);
      const newProject = await projectAPI.createProject(projectData);
      setProjects((prevProjects) => [...prevProjects, newProject]);
      return newProject;
    } catch (err) {
      const errorMessage = err.message || "Failed to create project";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProject = useCallback(
    async (id, projectData) => {
      try {
        setLoading(true);
        setError(null);
        const updatedProject = await projectAPI.updateProject(id, projectData);

        // Update project in state if it's the current project
        if (project && project.id === id) {
          setProject(updatedProject);
        }

        // Update project in projects list
        setProjects((prevProjects) =>
          prevProjects.map((p) => (p.id === id ? updatedProject : p))
        );

        return updatedProject;
      } catch (err) {
        const errorMessage = err.message || "Failed to update project";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [project]
  );

  const deleteProject = useCallback(
    async (id) => {
      try {
        setLoading(true);
        setError(null);
        await projectAPI.deleteProject(id);

        // Remove project from state if it's the current project
        if (project && project.id === id) {
          setProject(null);
        }

        // Remove project from projects list
        setProjects((prevProjects) => prevProjects.filter((p) => p.id !== id));

        return true;
      } catch (err) {
        const errorMessage = err.message || "Failed to delete project";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [project]
  );

  const fetchProjectFiles = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const files = await projectAPI.getProjectFiles(id);
      setProjectFiles(files);
      return files;
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch project files";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const getProjectScans = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const scans = await projectAPI.getProjectScans(id);
      return scans;
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch project scans";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    project,
    projects,
    projectFiles,
    loading,
    error,
    fetchProject,
    fetchAllProjects,
    createProject,
    updateProject,
    deleteProject,
    fetchProjectFiles,
    getProjectScans,
  };
};
