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




export default function ShresDetailsTable( { columsArray , rowsArray} ) {

  // const columns = [
  //   { id: 'name', label: 'Name', minWidth: 170 },
  //   { id: 'sahres', label: 'Shares', minWidth: 100 },
  //   { id: 'contract', label: 'Contract', minWidth: 100 },
    
  // ];
  
  // function createData(name, sahres, contract) {
  //   return { name, sahres, contract};
  // }
  
  // const rows = [
  //   createData('Rana Ahsan Ansar', '70', "03091045145"),
  //   createData('Talal', '20', "03091045145"),
  //   createData('Sufyan Asghar', '10', "03091045145"),
  // ];

  const columns = columsArray ;
  
  
  const rows = rowsArray;


  const gradiantText = {
    backgroundcolor: "primary",
    backgroundImage: `linear-gradient(to left, #5514B4, #9d149d)`,
    backgroundSize: "100%",
    backgroundRepeat: "repeat",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    display: "table",
    WebkitTextFillColor: "transparent",
  };
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
                  style={{ minWidth: column.minWidth , backgroundColor: '#000000' }}
                >
                  <Typography fontWeight='bold' sx={gradiantText} >
                    {column.label}
                  </Typography>
                  
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
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