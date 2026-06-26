import { useState } from "react";
import api from "../api/api";

const BASE_URL = "http://localhost:3000";

const Report = () => {
  const [loading, setLoading] = useState(false);
  const [reportUrl, setReportUrl] = useState("");

  const handleGenerateReport = async () => {
    try {
      setLoading(true);

      const res = await api.get("/report");

      setReportUrl(`${BASE_URL}${res.data.reportUrl}`);
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Failed to generate report."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
      }}
    >
      <h2>📄 PDF Report</h2>

      <button
        onClick={handleGenerateReport}
        disabled={loading}
      >
        {loading
          ? "Generating..."
          : "Generate Report"}
      </button>

      {reportUrl && (
        <>
          <hr />

          <h3>Report Generated Successfully ✅</h3>

          <iframe
            src={`${reportUrl}?t=${Date.now()}`}
            title="PDF Report"
            width="100%"
            height="600px"
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />

          <br />
          <br />

          <a
            href={`${reportUrl}?t=${Date.now()}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>
              Download PDF
            </button>
          </a>
        </>
      )}
    </div>
  );
};

export default Report;