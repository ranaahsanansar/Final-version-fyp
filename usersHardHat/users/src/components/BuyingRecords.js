import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';

function createData(society , block , propertyId , shares , amountPerShare , seller, buyer , buyerSing ,  status , contract) {
  return { society , block , propertyId , shares , amountPerShare , seller, buyer , buyerSing , status , contract};
}

const rows = [
  createData('Bahria' , 'A' , '786' , 20 , 5000 , 'Ahsan Ansar'  , 'Talal' , true , true , '9X00390g0s2094099430gh0294509dfgh0'  ),
  createData('Bahria' , 'B' , '786' , 20 , 5000 , 'Ahsan Ansar'  , 'Talal' , true , true ,'9X00390g0s2094099430gh0294509dfgh0'  ),
  createData('Bahria' , 'X' , '786' , 20 , 5000 , 'Ahsan Ansar'  , 'Talal' , false ,false , '9X00390g0s2094099430gh0294509dfgh0'  ),
  createData('Bahria' , 'Y' , '786' , 20 , 5000 , 'Ahsan Ansar'  , 'Talal' , true , true ,'9X00390g0s2094099430gh0294509dfgh0'  ),
  createData('Bahria' , 'Z' , '786' , 20 , 5000 , 'Ahsan Ansar'  , 'Talal' , false , false ,'9X00390g0s2094099430gh0294509dfgh0'  ),
];
const BuyingRecords = () => {
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Society</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Block</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Property ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Shares</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Amount per Share</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Seller</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Buyer</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Buyer Sing</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Contract</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row , index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  
                  <TableCell   align="right">{row.society}</TableCell>
                  <TableCell align="right">{row.block}</TableCell>
                  <TableCell align="right">{row.propertyId}</TableCell>
                  <TableCell align="right">{row.shares}</TableCell>
                  <TableCell align="right">{row.amountPerShare}</TableCell>
                  <TableCell align="right">{row.seller}</TableCell>
                  <TableCell align="right">{row.buyer}</TableCell>
                  <TableCell align="right">{row.buyerSing ?( <Box><Typography color='green' >Singed</Typography></Box> ) : ( <Box><Typography color='red' >Pending</Typography></Box> )}</TableCell>
                  <TableCell align="right">{row.status ?( <Box><Typography color='green' >Approved</Typography></Box> ) : ( <Box><Typography color='red' >Pending</Typography></Box> )}</TableCell>
                  <TableCell align="right">{row.contract}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
}

export default BuyingRecords