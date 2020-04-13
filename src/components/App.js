import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import api from "../lib/api";
import CustomTable from "./CustomTable";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userTableData: [],
      projectTableData: [],
      userTableStatus: "INITIAL",
      projectTableStatus: "INITIAL",
    };
  }

  renderError = (status) => {
    if (status === "ERROR") {
      return (
        <Box marginTop="20px">
          <Typography color="error">
            We had problems fetching your data. Please try again.
          </Typography>
        </Box>
      );
    }
  };

  renderLoader = (status) => {
    if (status === "LOADING") {
      return (
        <Box marginTop="20px">
          <CircularProgress color="primary" />
        </Box>
      );
    }
  };

  fetchUserData = async () => {
    this.setState({ userTableStatus: "LOADING" });
    await api
      .getUsersDiff()
      .then((response) => {
        if (response.code === 200) {
          this.setState((state) => {
            const userTableData = state.userTableData.concat(response.data);
            return {
              userTableData,
              userTableStatus: "COMPLETE",
            };
          });
        } else {
          this.setState({ userTableStatus: "ERROR" });
        }
      })
      .catch((e) => {
        console.error(e);
        this.setState({ userTableStatus: "ERROR" });
      });
  };

  fetchProjectData = async () => {
    this.setState({ projectTableStatus: "LOADING" });
    await api
      .getProjectsDiff()
      .then((response) => {
        if (response.code === 200) {
          this.setState((state) => {
            const projectTableData = state.projectTableData.concat(
              response.data
            );
            return {
              projectTableData,
              projectTableStatus: "COMPLETE",
            };
          });
        } else {
          this.setState({ projectTableStatus: "ERROR" });
        }
      })
      .catch((e) => {
        console.error(e);
        this.setState({ projectTableStatus: "ERROR" });
      });
  };

  componentDidMount() {
    this.fetchUserData();
    this.fetchProjectData();
  }

  render() {
    let theme = createMuiTheme({
      palette: {
        primary: {
          main: "#2197F3",
        },
      },
      overrides: {
        MuiPaper: {
          root: {
            padding: "10px",
            marginBottom: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        },
        MuiTableCell: {
          head: {
            fontWeight: 600,
          },
        },
        MuiButton: {
          root: {
            textTransform: "none",
            margin: "20px",
          },
        },
      },
    });
    responsiveFontSizes(theme);
    return (
      <ThemeProvider theme={theme}>
        <Container component={Paper}>
          <CustomTable tableData={this.state.userTableData} />
          {this.renderLoader(this.state.userTableStatus)}
          {this.renderError(this.state.userTableStatus)}
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={this.fetchUserData}
            >
              Load More
            </Button>
          </Box>
        </Container>
        <Container component={Paper}>
          <CustomTable tableData={this.state.projectTableData} />
          {this.renderLoader(this.state.projectTableStatus)}
          {this.renderError(this.state.projectTableStatus)}
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={this.fetchProjectData}
            >
              Load More
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
