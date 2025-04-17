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
      // Backend mong đợi 'files[]' hoặc 'file'
      if (scanData.files.length === 1) {
        formData.append("file", scanData.files[0]);
      } else {
        scanData.files.forEach((file) => {
          formData.append("files[]", file);
        });
      }
    }

    // Add scan options to form data
    if (scanData.options) {
      formData.append("options", JSON.stringify(scanData.options));
    }

    // Add projectId if available
    if (scanData.projectId) {
      formData.append("project_id", scanData.projectId);
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

export const getScanPDG = async (scanId, fileId) => {
  try {
    const response = await api.get(`/scans/${scanId}/pdg/${fileId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const generateScanReport = async (id, format = "pdf") => {
  try {
    const response = await api.get(`/scans/${id}/report?format=${format}`);

    // Xử lý response based on format
    if (format === "json") {
      return response.data;
    } else {
      // Xử lý download URL
      return {
        reportId: response.data.report_id,
        downloadUrl: response.data.download_url,
      };
    }
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
