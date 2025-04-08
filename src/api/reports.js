import api from "./api";

export const getAllReports = async () => {
  try {
    const response = await api.get("/reports");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getReportById = async (id) => {
  try {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const generateReport = async (scanId, options = {}) => {
  try {
    const response = await api.post("/reports", {
      scanId,
      ...options,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const downloadReport = async (id, format = "pdf") => {
  try {
    const response = await api.get(`/reports/${id}/download?format=${format}`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
