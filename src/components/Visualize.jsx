import { useState } from "react";
import api from "../api/api";

const BASE_URL = "http://localhost:3000";

const Visualize = () => {
  const [loading, setLoading] = useState(false);
  const [charts, setCharts] = useState(null);

  const handleVisualize = async () => {
    try {
      setLoading(true);
      const res = await api.get("/visualize");
      setCharts(res.data);
    } catch (error) {
      alert(error?.response?.data?.message || "Visualization failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📈 Visualize</h2>

      <button onClick={handleVisualize} disabled={loading}>
        {loading ? "Generating..." : "Generate Charts"}
      </button>

      {charts && (
        <>
          <hr />

          <h3>Bar Chart</h3>
          <img
            src={`${BASE_URL}${charts.barChart}?t=${Date.now()}`}
            alt="Bar Chart"
            width="100%"
          />

          <hr />

          <h3>Pie Chart</h3>
          <img
            src={`${BASE_URL}${charts.pieChart}?t=${Date.now()}`}
            alt="Pie Chart"
            width="500"
          />
        </>
      )}
    </div>
  );
};

export default Visualize;