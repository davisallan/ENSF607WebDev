import { React } from "react";
import LearningOutcomeList from "./components/LearningOutcomeList";
import GradeContainer from "./components/GradeContainer";
import CourseInformation from "./components/CourseInformation";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { red, orange } from "@material-ui/core/colors";
import { Logo } from "./components/CourseInformation";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import { Container } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: orange[400],
      },
      secondary: {
        main: red[600],
      },
    },
  });

  function SaveButton() {
    const style = {
      top: "auto",
      right: 20,
      bottom: 20,
      left: "auto",
      position: "fixed",
    };
    return (
      <Button
        style={style}
        position="fixed"
        variant="contained"
        color="primary"
        size="large"
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Container>
            <Grid container direction="row">
              <Logo />
              <Grid item xs={5}>
                <Typography variant="h3" align="center">
                  University of Calgary Course Outline
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </header>
        <body className="App-body">
          <SaveButton />
          <CourseInformation />
          <LearningOutcomeList />
          <GradeContainer />
        </body>
      </div>
    </ThemeProvider>
  );
}

export default App;
