import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import React, { Component } from "react";
import { compare } from "../utils/compare";

export default class CustomTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chronological: false,
    };
  }

  renderTableBody = () => {
    if (this.props.tableData.length === 0) return;
    let tableData = this.sortTableData();
    return tableData.map((data) => {
      return (
        <TableRow data-testid="table-row" key={data.id}>
          <TableCell>{new Date(data.timestamp).toDateString()}</TableCell>
          <TableCell>{data.id}</TableCell>
          <TableCell>{data.diff[0].oldValue}</TableCell>
          <TableCell>{data.diff[0].newValue}</TableCell>
        </TableRow>
      );
    });
  };

  sortDate = () => {
    if (this.state.chronological) this.setState({ chronological: false });
    else this.setState({ chronological: true });
  };

  sortTableData = () => {
    const sortedData = this.props.tableData.concat().sort((a, b) => {
      return compare(a.timestamp, b.timestamp);
    });
    if (!this.state.chronological) {
      return sortedData.reverse();
    } else return sortedData;
  };

  render() {
    let theme = createMuiTheme({
      overrides: {
        MuiTableCell: {
          head: {
            fontWeight: 600,
          },
        },
      },
    });
    responsiveFontSizes(theme);
    return (
      <TableContainer data-testid="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={this.sortDate} align="left">
                Date
              </TableCell>
              <TableCell align="left">User ID</TableCell>
              <TableCell align="left">Old Value</TableCell>
              <TableCell align="left">New Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.renderTableBody()}</TableBody>
        </Table>
      </TableContainer>
    );
  }
}
