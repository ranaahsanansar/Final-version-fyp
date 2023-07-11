import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';


export default function TableComponents( { columsArray , rowsArray} ) {

 
  const columns = columsArray ;
  //   console.log("Hye")
  // console.log(rowsArray)
  
  
  const rows = rowsArray;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer  sx={{ maxHeight: 440 ,'&::-webkit-scrollbar': {
                            display: "none"
                        },'&::-webkit-scrollbar-thumb': {
                          backgroundColor: `rgba(0, 0, 0, 0.05)`,
                          display: "none"
                      } }} >
        <Table stickyHeader aria-label="sticky table"  >
          <TableHead   >
            <TableRow  >
              {columns.map((column , index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{ minWidth: column.minWidth , backgroundColor: '#F3E5AB' }}
                >
                  <Typography fontWeight='bold' sx={{color: 'black'}} >
                    {column.label}
                  </Typography>
                  
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody maxheight="200px" overflow="scroll" >
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}