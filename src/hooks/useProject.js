import { useState, useEffect } from "react";
import * as projectAPI from "../api/projects";

export const useProject = (projectId) => {
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (projectId) {
      fetchProject(projectId);
    }
  }, [projectId]);

  const fetchProject = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectAPI.getProjectById(id);
      setProject(data);
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch project");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectAPI.getAllProjects();
      setProjects(data);
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch projects");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData) => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectAPI.createProject(projectData);
      setProjects([...projects, data]);
      return data;
    } catch (err) {
      setError(err.message || "Failed to create project");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id, projectData) => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectAPI.updateProject(id, projectData);

      if (project && project.id === id) {
        setProject(data);
      }

      setProjects(projects.map((p) => (p.id === id ? data : p)));
      return data;
    } catch (err) {
      setError(err.message || "Failed to update project");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await projectAPI.deleteProject(id);

      if (project && project.id === id) {
        setProject(null);
      }

      setProjects(projects.filter((p) => p.id !== id));
      return true;
    } catch (err) {
      setError(err.message || "Failed to delete project");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getProjectScans = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectAPI.getProjectScans(id);
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch project scans");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    project,
    projects,
    loading,
    error,
    fetchProject,
    fetchAllProjects,
    createProject,
    updateProject,
    deleteProject,
    getProjectScans,
  };
};
