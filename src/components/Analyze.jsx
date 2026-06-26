import { useState } from "react";
import api from "../api/api";

const Analyze = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      setLoading(true);

      const res = await api.get("/analyze");

      setResult(res.data);
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Analysis failed."
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
      <h2>📊 Analyze Data</h2>

      <button
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <>
          <hr />

          <h3>Validation</h3>

          <p>
            <b>Mother Total :</b>{" "}
            {result.validation.motherTotal}
          </p>

          <p>
            <b>Father Total :</b>{" "}
            {result.validation.fatherTotal}
          </p>

          <p>
            <b>Overall Total :</b>{" "}
            {result.validation.overallTotal}
          </p>

          <p>
            <b>Valid :</b>{" "}
            {result.validation.isValid
              ? "✅ Yes"
              : "❌ No"}
          </p>

          <hr />

          <h3>Mother</h3>

          <p>
            Highest :
            {" "}
            {result.mother.highest.factor}
            {" "}
            (
            {result.mother.highest.value}
            )
          </p>

          <p>
            Lowest :
            {" "}
            {result.mother.lowest.factor}
            {" "}
            (
            {result.mother.lowest.value}
            )
          </p>

          <hr />

          <h3>Father</h3>

          <p>
            Highest :
            {" "}
            {result.father.highest.factor}
            {" "}
            (
            {result.father.highest.value}
            )
          </p>

          <p>
            Lowest :
            {" "}
            {result.father.lowest.factor}
            {" "}
            (
            {result.father.lowest.value}
            )
          </p>

          <hr />

          <h3>Comparison</h3>

          <div
            style={{
              overflowX: "auto",
            }}
          >
            <table
              border="1"
              cellPadding="8"
              cellSpacing="0"
              width="100%"
            >
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>Mother</th>
                  <th>Father</th>
                  <th>Total</th>
                  <th>Minimum</th>
                  <th>Maximum</th>
                </tr>
              </thead>

              <tbody>
                {result.comparison.map(
                  (item, index) => (
                    <tr key={index}>
                      <td>{item.factor}</td>
                      <td>{item.mother}</td>
                      <td>{item.father}</td>
                      <td>{item.total}</td>
                      <td>{item.minimum}</td>
                      <td>{item.maximum}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Analyze;