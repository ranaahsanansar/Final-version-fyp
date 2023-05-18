import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import AddPropertyForm from '../components/Froms/AddPropertyForm'
import TransferNewOwnership from '../components/Froms/TransferNewOwnership'

const AddNewPropertyPage = () => {
  return (
    <>

        <Container>
            <Box mt={2} textAlign='center' >
                <Typography variant='h3' fontSize='35px' fontWeight='bold' color='white' >Only LandInspector</Typography>
            </Box>
            {/* Add new Property Form  */}
            <Box mt={2} >
                <AddPropertyForm />
            </Box>
            <Box mt={2} >

              <TransferNewOwnership />
            </Box>
        </Container>
    </>
  )
}

export default AddNewPropertyPage