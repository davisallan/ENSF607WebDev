import LearningOutcomeList from "./components/LearningOutcomeList";
import GradeContainer from "./components/GradeContainer";
import CourseInformation from "./components/CourseInformation";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CourseInformation />
        <LearningOutcomeList />
        <GradeContainer />
      </header>
    </div>
  );
}

export default App;
