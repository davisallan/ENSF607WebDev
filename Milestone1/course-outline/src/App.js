import LearningOutcomeList from "./components/LearningOutcomeList";
import GradeContainer from "./components/GradeContainer";
import CourseInformation from "./components/CourseInformation";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <body className="App-body">
        <CourseInformation />
        <LearningOutcomeList />
        <GradeContainer />
      </body>
    </div>
  );
}

export default App;
