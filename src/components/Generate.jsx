import { useState } from "react";
import api from "../api/api";

const Generate = () => {
  const [birthDate, setBirthDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async () => {
    if (!birthDate) {
      return alert("Please select birth date.");
    }

    try {
      setLoading(true);

      const res = await api.post("/generate", {
        birthDate,
      });

      setResult(res.data);
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Generation failed."
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
      <h2>🎂 Generate Data</h2>

      <input
        type="date"
        value={birthDate}
        onChange={(e) =>
          setBirthDate(e.target.value)
        }
      />

      <button
        style={{ marginLeft: 10 }}
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {result && (
        <>
          <hr />

          <p>
            <b>Birth Date:</b> {result.birthDate}
          </p>

          <p>
            <b>Day Type:</b> {result.dayType}
          </p>

          <p>
            <b>Rule:</b> {result.ruleApplied}
          </p>

          <h3>Summary</h3>

          <p>
            Mother Total :
            {" "}
            {result.summary.motherTotal}
          </p>

          <p>
            Father Total :
            {" "}
            {result.summary.fatherTotal}
          </p>

          <p>
            Overall :
            {" "}
            {result.summary.overallTotal}
          </p>

          <h3>Generated Factors</h3>

          <table
            border="1"
            cellPadding="8"
            width="100%"
          >
            <thead>
              <tr>
                <th>Factor</th>
                <th>Mother</th>
                <th>Father</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {result.factors.map(
                (item, index) => (
                  <tr key={index}>
                    <td>{item.factor}</td>
                    <td>{item.mother}</td>
                    <td>{item.father}</td>
                    <td>{item.total}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Generate;