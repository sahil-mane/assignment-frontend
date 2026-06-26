import { useState } from "react";
import api from "../api/api";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      return alert("Please select an Excel file.");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResponse(res.data);
    } catch (error) {
      alert(
        error?.response?.data?.message || "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <h2>📂 Upload Excel</h2>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {response && (
        <div style={{ marginTop: "20px" }}>
          <h3>Response</h3>

          <p>
            <strong>Message :</strong> {response.message}
          </p>

          <p>
            <strong>Total Rows :</strong>{" "}
            {response.totalRows}
          </p>

          <details>
            <summary>View Uploaded Data</summary>

            <pre
              style={{
                background: "#f4f4f4",
                padding: "10px",
                overflow: "auto",
              }}
            >
              {JSON.stringify(response.data, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default Upload;