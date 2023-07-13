import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TableComponents from '../components/TableComponents';
import { Alert, Box, Typography } from '@mui/material';
const UsersApprovalsList = () => {

  const [alert, setAlert] = useState({
    status: false,
    msg: "",
    type: ""
  });

  const tableColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "cnic", label: "Cnic", minWidth: 100 }
  ];
  function creatTableData(name, cnic) {
    return { name, cnic }
  }
  const [tableRows, setTableRows] = useState([]);
  const [fetchResult, setFetchResult] = useState([{
    "_id": "64acfc349bf0cee51049789a",
    "name": "Rana Ahsan Ansar",
    "cnic": 3520204614157,
    "fatherName": "Ansar Latif",
    "phone": "03334514592",
    "email": "asn.cs21@gmail.com",
    "front": "asn.cs21@gmail.com-1689058356774-Screenshot from 2023-06-03 16-22-38.png",
    "back": "asn.cs21@gmail.com-1689058356778-Screenshot from 2023-07-05 17-03-57.png",
    "picture": "asn.cs21@gmail.com-1689058356783-Screenshot from 2023-05-25 17-35-00.png",
    "path": "public/uploads/approvalRequests/",
    "__v": 0
  }]);

  const fetchingTheResult = async () => {
    let url = 'http://localhost:8000/api/dashboard/property/get-all-requests'
    try {
      const result = await axios.get(url)
      if(result.data.length == 0) {
        setAlert({
          status: true,
          msg: "No Data found",
          type: "error"
        })
        return
      }

      setFetchResult(result.data)
      tableRows.splice(0, tableRows.length);

      result.data.map((item) => {
        tableRows.push(creatTableData(item.name, item.cnic, true, item._id))
      })
      setAlert({
        status: false,
        msg: "We are unable to fetch the data",
        type: "error"
      })
    } catch (err) {
      setAlert({
        status: true,
        msg: "We are unable to fetch the data",
        type: "error"
      })
    }

  }

  useEffect(() => {


    fetchingTheResult()
    setFetchResult([{ id: 'hye' }])

    console.log(fetchResult)
  }, [])


  return (
    <Box margin={2} >
      {alert.status ? <Alert style={{ marginBottom: "10px" }} severity={alert.type} sx={{ mt: 3 }}>{alert.msg}</Alert> : ''}
      <Typography variant="h4" fontSize='25px' fontWeight='bold' color='#060606' mb={2} >Citizen Approval Request</Typography>

      <TableComponents key="request" columsArray={tableColumns} rowsArray={tableRows} />
    </Box>
  )
}

export default UsersApprovalsList