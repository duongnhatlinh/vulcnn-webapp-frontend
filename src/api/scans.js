import api from "./api";

export const getAllScans = async () => {
  try {
    const response = await api.get("/scans");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getScanById = async (id) => {
  try {
    const response = await api.get(`/scans/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const createScan = async (scanData) => {
  try {
    const formData = new FormData();

    // Add files to form data
    if (scanData.files && scanData.files.length > 0) {
      scanData.files.forEach((file) => {
        formData.append("files", file);
      });
    }

    // Add scan options to form data
    if (scanData.options) {
      formData.append("options", JSON.stringify(scanData.options));
    }

    // Add projectId if available
    if (scanData.projectId) {
      formData.append("projectId", scanData.projectId);
    }

    const response = await api.post("/scans", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const cancelScan = async (id) => {
  try {
    const response = await api.post(`/scans/${id}/cancel`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getScanResults = async (id) => {
  try {
    const response = await api.get(`/scans/${id}/results`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getScanPDG = async (id, fileId) => {
  try {
    const response = await api.get(`/scans/${id}/pdg/${fileId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const generateScanReport = async (id, format = "pdf") => {
  try {
    const response = await api.get(`/scans/${id}/report?format=${format}`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
