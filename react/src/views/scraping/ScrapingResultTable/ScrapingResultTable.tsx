import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ScrapingResultTable(props) {
  const { tableHeader, dataByScraping } = props
  const classes = useStyles();

  const dataKeys = Object.keys(tableHeader)
  const header = dataKeys.map(key => tableHeader[key])

  // const conuntTextLength = (text) => {
  //   var textLength = 0;
  //
  //   for (let i = 0; i < text.length; i++) {
  //     if (text[i].match(/[ -~]/)) {
  //       textLength += 0.5;
  //     } else {
  //       textLength += 1;
  //     }
  //   }
  //   return textLength;
  // }
  //
  // const cutText = (text, maxLength) => {
  //   if (!text) {
  //     return
  //   }
  //
  //   const textLength = conuntTextLength(text)
  //
  //   let resultText = text
  //   if(textLength >= maxLength) {
  //     resultText = text.substr(0, maxLength - 1)
  //     resultText = resultText + '…'
  //   }
  //   return resultText
  // }

  const cutText = (text, maxLength) => {
    if (!text) {
      return
    }

    const textLength = text.length

    let resultText = text
    if(textLength >= maxLength) {
      resultText = text.substr(0, maxLength - 1)
      resultText = resultText + '…'
    }
    return resultText
  }


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow>
            {header.map((item, index) => (
              <TableCell key={index} align="left">{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataByScraping.map((row, index) => (
            <TableRow key={index}>
              {dataKeys.map((key, index) => (
                <TableCell key={index} align="left">{cutText(row[key], 10)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
