import Analyze from "./components/Analyze";
import Generate from "./components/Generate";
import Report from "./components/Report";
import Upload from "./components/Upload";
import Visualize from "./components/Visualize";


function App() {
  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "30px auto",
      }}
    >
      <h1>Parental Legacy Dashboard</h1>

      <Upload />

      <Analyze />

      <Generate />

      <Visualize />

      <Report />
    </div>
  );
}

export default App;