import { useState, useCallback } from "react";
import * as scanAPI from "../api/scans";
import * as reportAPI from "../api/reports";

export const useScan = () => {
  const [scan, setScan] = useState(null);
  const [scans, setScans] = useState([]);
  const [results, setResults] = useState(null);
  const [pdg, setPdg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchScan = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const data = await scanAPI.getScanById(id);
      setScan(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch scan";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllScans = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await scanAPI.getAllScans();
      setScans(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch scans";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const createScan = useCallback(async (scanData) => {
    try {
      setLoading(true);
      setError(null);
      const data = await scanAPI.createScan(scanData);

      // Backend trả về { message, scan, files }
      if (data && data.scan) {
        setScans((prevScans) => [data.scan, ...prevScans]);
        setScan(data.scan);
      }

      return data;
    } catch (err) {
      const errorMessage = err.message || "Failed to create scan";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelScan = useCallback(
    async (id) => {
      try {
        setLoading(true);
        setError(null);
        const data = await scanAPI.cancelScan(id);

        if (scan && scan.id === id) {
          setScan((prevScan) => ({ ...prevScan, status: "cancelled" }));
        }

        setScans((prevScans) =>
          prevScans.map((s) =>
            s.id === id ? { ...s, status: "cancelled" } : s
          )
        );

        return data;
      } catch (err) {
        const errorMessage = err.message || "Failed to cancel scan";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [scan]
  );

  const getScanResults = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const data = await scanAPI.getScanResults(id);
      setResults(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch scan results";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const getScanPDG = useCallback(async (scanId, fileId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await scanAPI.getScanPDG(scanId, fileId);
      setPdg(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch PDG";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const generateScanReport = useCallback(async (id, format = "pdf") => {
    try {
      setLoading(true);
      setError(null);

      // Gọi API để tạo report
      const result = await scanAPI.generateScanReport(id, format);

      if (format === "json") {
        // Nếu là JSON, trả về dữ liệu
        return result;
      } else {
        // Nếu là định dạng khác, tải file
        // Dùng reportId từ kết quả để tải
        if (result && result.reportId) {
          await reportAPI.downloadReport(result.reportId, format);
        }
        return true;
      }
    } catch (err) {
      const errorMessage = err.message || "Failed to generate report";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    scan,
    scans,
    results,
    pdg,
    loading,
    error,
    fetchScan,
    fetchAllScans,
    createScan,
    cancelScan,
    getScanResults,
    getScanPDG,
    generateScanReport,
  };
};
