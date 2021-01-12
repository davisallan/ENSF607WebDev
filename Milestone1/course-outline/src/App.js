import { React } from "react";
import CourseOutline from "./CourseOutline";
import Home from "./Home";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { red, orange } from "@material-ui/core/colors";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/courseoutline/:id" component={CourseOutline} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
