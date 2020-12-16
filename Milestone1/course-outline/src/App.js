import LearningOutcomeList from "./components/LearningOutcomeList";
import GradeTable from "./components/GradeTable";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GradeTable />
        <LearningOutcomeList />
      </header>
    </div>
  );
}

export default App;
