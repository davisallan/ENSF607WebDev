import { React } from "react";
import CourseOutline from "./CourseOutline";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { red, orange } from "@material-ui/core/colors";
import { Logo } from "./components/CourseInformation";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import { Container } from "@material-ui/core";
import Home from "./Home";

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

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header"></header>
        <body className="App-body">
          <CourseOutline />
        </body>
      </div>
    </ThemeProvider>
  );
}

export default App;
