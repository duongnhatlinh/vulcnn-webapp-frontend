import api from "./api";

export const getAllProjects = async () => {
  try {
    const response = await api.get("/projects");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await api.post("/projects", projectData);
    // Backend trả về { message, project }
    return response.data.project || response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const response = await api.put(`/projects/${id}`, projectData);
    // Backend trả về { message, project }
    return response.data.project || response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getProjectFiles = async (projectId) => {
  try {
    const response = await api.get(`/projects/${projectId}/files`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getProjectScans = async (projectId) => {
  try {
    const response = await api.get(`/scans?project_id=${projectId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
