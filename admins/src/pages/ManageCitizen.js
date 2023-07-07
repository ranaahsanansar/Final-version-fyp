import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import AddPropertyForm from '../components/Froms/AddPropertyForm'
import TransferNewOwnership from '../components/Froms/TransferNewOwnership'
import DeclareDeathForm from '../components/Froms/DeclareDeathForm'
import SingToReverse from '../components/Froms/SingToReverse'

const ManageCitizen = () => {
    return (
        <>
    
            <Container>
                <Box mt={2} textAlign='center' >
                    <Typography variant='h3' fontSize='35px' fontWeight='bold' color='#060606'>Gov. Authority Only</Typography>
                </Box>
                <Box mt={2} >
                    <DeclareDeathForm />
                </Box>
                <Box mt={2} >
                    <SingToReverse />

                </Box>
            </Container>
        </>
      )
}

export default ManageCitizen