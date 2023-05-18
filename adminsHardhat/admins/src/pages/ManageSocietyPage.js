import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import AddPropertyForm from '../components/Froms/AddPropertyForm'
import TransferNewOwnership from '../components/Froms/TransferNewOwnership'
import DeclareDeathForm from '../components/Froms/DeclareDeathForm'
import ApproveBlockForm from '../components/Froms/ApproveBlockForm'
import IncreasePropertiesForm from '../components/Froms/IncreasePropertiesForm'
const ManageSocietyPage = () => {
    return (
        <>
    
            <Container>
                <Box mt={2} textAlign='center' >
                    <Typography variant='h3' fontSize='35px' fontWeight='bold' color='white'>Only Gov. Authority</Typography>
                </Box>
                {/* Add new Property Form  */}
                <Box mt={2} >
                    <ApproveBlockForm />
                </Box>
                <Box mt={2} >
                    <IncreasePropertiesForm />
                </Box>
            </Container>
        </>
      )
}

export default ManageSocietyPage