import { useState } from "react";
import * as scanAPI from "../api/scans";

export const useScan = () => {
  const [scan, setScan] = useState(null);
  const [scans, setScans] = useState([]);
  const [results, setResults] = useState(null);
  const [pdg, setPdg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchScan = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const data = await scanAPI.getScanById(id);
      setScan(data);
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch scan");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchAllScans = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await scanAPI.getAllScans();
      setScans(data);
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch scans");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createScan = async (scanData) => {
    try {
      setLoading(true);
      setError(null);
      const data = await scanAPI.createScan(scanData);
      setScans([data, ...scans]);
      setScan(data);
      return data;
    } catch (err) {
      setError(err.message || "Failed to create scan");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelScan = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const data = await scanAPI.cancelScan(id);

      if (scan && scan.id === id) {
        setScan({ ...scan, status: "cancelled" });
      }

      setScans(
        scans.map((s) => (s.id === id ? { ...s, status: "cancelled" } : s))
      );
      return data;
    } catch (err) {
      setError(err.message || "Failed to cancel scan");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getScanResults = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const data = await scanAPI.getScanResults(id);
      setResults(data);
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch scan results");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getScanPDG = async (scanId, fileId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await scanAPI.getScanPDG(scanId, fileId);
      setPdg(data);
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch PDG");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const generateScanReport = async (id, format) => {
    try {
      setLoading(true);
      setError(null);
      const blob = await scanAPI.generateScanReport(id, format);

      // Create download link for the report
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `scan-report-${id}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      return true;
    } catch (err) {
      setError(err.message || "Failed to generate report");
      throw err;
    } finally {
      setLoading(false);
    }
  };

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
