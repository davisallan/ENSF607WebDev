import LearningOutcomeList from "./components/LearningOutcomeList";
import GradeTable from "./components/GradeTable";
import CourseInformation from "./components/CourseInformation";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CourseInformation />
        <LearningOutcomeList />
        <GradeTable />
      </header>
    </div>
  );
}

export default App;
