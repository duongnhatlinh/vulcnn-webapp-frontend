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
      scan_id: scanId,
      format: options.format || "pdf",
      options: options.reportOptions || {},
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

    // Tạo đường dẫn URL tạm thời và trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `report-${id}.${format}`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    return true;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
