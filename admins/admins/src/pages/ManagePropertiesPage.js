import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import AddPropertyForm from '../components/Froms/AddPropertyForm'
import TransferNewOwnership from '../components/Froms/TransferNewOwnership'
import PropertyStayForm from '../components/Froms/PropertyStayForm'
import CitizenStayForm from '../components/Froms/CitizenStayForm'
import ReverseTransactionForm from '../components/Froms/ReverseTransactionForm'


const ManagePropertiesPage = () => {
    return (
        <>
    
            <Container>
                <Box mt={2} textAlign='center' >
                    <Typography variant='h3' fontSize='35px' fontWeight='bold' color='white'>Only Highcourt</Typography>
                </Box>
                {/* Add new Property Form  */}
                <Box mt={2} >
                    <PropertyStayForm />
                </Box>

                <Box mt={2} >
                    <CitizenStayForm />
                </Box>

                <Box mt={2} >
                    <ReverseTransactionForm />
                </Box>
                
            </Container>
        </>
      )
}

export default ManagePropertiesPage