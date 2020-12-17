import { React } from "react";
import LearningOutcomeList from "./components/LearningOutcomeList";
import GradeContainer from "./components/GradeContainer";
import Typography from "@material-ui/core/Typography";
import CourseInformation from "./components/CourseInformation";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { red, yellow } from "@material-ui/core/colors";
import { Logo } from "./components/CourseInformation";
import "./App.css";
import { Container } from "@material-ui/core";

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: red[600],
      },
      secondary: {
        // This is green.A700 as hex.
        main: yellow[600],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Container>
            <Logo />
          </Container>
        </header>
        <body className="App-body">
          <CourseInformation />
          <LearningOutcomeList />
          <GradeContainer />
        </body>
      </div>
    </ThemeProvider>
  );
}

export default App;
