import { Grid, Tab, Tabs, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React, { useState } from "react";
import ShresDetailsTable from "../Components/SharesDetailsTable";


// Shares Table Data
const sharesTableColumns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "sahres", label: "Shares", minWidth: 100 },
  { id: "contract", label: "Contract", minWidth: 100 },
];

function createData(name, sahres, contract) {
  return { name, sahres, contract };
}

const sharesTableRows = [
  createData("Rana Ahsan Ansar", "70", "03091045145"),
  createData("Talal", "20", "03091045145"),
  createData("Sufyan Asghar", "10", "03091045145"),createData("Rana Ahsan Ansar", "70", "03091045145"),
  createData("Talal", "20", "03091045145"),
  createData("Sufyan Asghar", "10", "03091045145"),createData("Rana Ahsan Ansar", "70", "03091045145"),
  createData("Talal", "20", "03091045145"),
  createData("Sufyan Asghar", "10", "03091045145"),createData("Rana Ahsan Ansar", "70", "03091045145"),
  createData("Talal", "20", "03091045145"),
  createData("Sufyan Asghar", "10", "03091045145"),createData("Rana Ahsan Ansar", "70", "03091045145"),
  createData("Talal", "20", "03091045145"),
  createData("Sufyan Asghar", "10", "03091045145"),createData("Rana Ahsan Ansar", "70", "03091045145"),
  createData("Talal", "20", "03091045145"),
  createData("Sufyan Asghar", "10", "03091045145"),createData("Rana Ahsan Ansar", "70", "03091045145"),
  createData("Talal", "20", "03091045145"),
  createData("Sufyan Asghar", "10", "03091045145"),createData("Rana Ahsan Ansar", "70", "03091045145"),
  createData("Talal", "20", "03091045145"),
  createData("Sufyan Asghar", "10", "03091045145"),
];

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

const glassMorphismStyle = {
  /* From https://css.glass */
  background: "rgba(255, 255, 255, 0.2)",
  boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(5px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
};


const UserProfile = () => {

  function TabPanel(props) {
    const { children, value, index } = props;
    return <>{value === index && <>{children}</>}</>;
  }

  // tabs Settings
  const [value, setValue] = React.useState(0);

  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Container>
        <Stack>
          {/* Header  */}
          <Box mt={3} mb={2} >
            <Typography fontFamily='small' >0x5B38Da6a701c568545dCfcB03FcB875f56beddC4</Typography>
            <Typography variant='h4' fontWeight='bold' sx={gradiantText} >Rana Ahsan Ansar</Typography>
          </Box>

          {/* Statics  */}

          <Box mb={3}>
            <Grid container spacing={2} alignItems='start' >
              <Grid item xs={6} sm={3} md={3} lg={3}  >
                <Box sx={glassMorphismStyle} borderRadius={3} padding={1} >
                  <Stack direction='row' alignItems='center' >
                    <Stack width='60%'  >
                        <Typography fontSize='small' >Total Coins</Typography>
                        <Typography fontSize='large' fontWeight='bold' >200</Typography>
                    </Stack>
                    <Box width='40%' padding={1} >
                        <img src="/images/coinPng.png" alt="crypto-coin" width='100%' height='100%'  />
                    </Box>
                  </Stack>
                </Box>
              </Grid>

              <Grid item xs={6} sm={3} md={3} lg={3}  >
                <Box sx={glassMorphismStyle}  borderRadius={3} padding={1} >
                  <Stack direction='row' alignItems='center' >
                    <Stack width='60%'  >
                        <Typography fontSize='small' >Staked Coins</Typography>
                        <Typography fontSize='large' fontWeight='bold' >500</Typography>
                    </Stack>
                    <Box width='40%' padding={1} >
                        <img src="/images/coinPng.png" alt="crypto-coin" width='100%' height='100%'  />
                    </Box>
                  </Stack>
                </Box>
              </Grid>

              <Grid item xs={6} sm={3} md={3} lg={3}  >
                <Box sx={glassMorphismStyle}  borderRadius={3} padding={1} >
                  <Stack direction='row' alignItems='center' >
                    <Stack width='60%'  >
                        <Typography fontSize='small' >My Properties</Typography>
                        <Typography fontSize='large' fontWeight='bold' >200</Typography>
                    </Stack>
                    <Box width='40%' padding={1} >
                        <img src="/images/coinPng.png" alt="crypto-coin" width='100%' height='100%'  />
                    </Box>
                  </Stack>
                </Box>
              </Grid>

              <Grid item xs={6} sm={3} md={3} lg={3}  >
                <Box sx={glassMorphismStyle}  borderRadius={3} padding={1} >
                  <Stack direction='row' alignItems='center' >
                    <Stack width='60%'  >
                        <Typography fontSize='small' >Total Coins</Typography>
                        <Typography fontSize='large' fontWeight='bold' >200</Typography>
                    </Stack>
                    <Box width='40%' padding={1} >
                        <img src="/images/coinPng.png" alt="crypto-coin" width='100%' height='100%'  />
                    </Box>
                  </Stack>
                </Box>
              </Grid>

              
              
            </Grid>

          </Box>


          {/* Table Tabs  */}

          <Box >
          <Box
          mb={4}
          sx={{
            background: "rgba(190, 186, 186, 0.256)",
          }}
          padding={1}
          borderRadius={2}
        >
          <Tabs
            value={value}
            onChange={handleTabs}
            variant="scrollable"
            scrollButtons={false}
            textColor="white"
            TabIndicatorProps={{
              style: {
                backgroundImage: "linear-gradient(to left, #5514B4, #9d149d)",
              },
            }}
          >
            <Tab
              label="My Properties"
              style={{ textTransform: "none", fontWeight: "bold" }}
            />
            <Tab
              label="Listed Properties"
              style={{ textTransform: "none", fontWeight: "bold" }}
            />
          </Tabs>

          <TabPanel value={value} index={0}>
            <Box mt={2}>
              <ShresDetailsTable
                columsArray={sharesTableColumns}
                rowsArray={sharesTableRows}
              />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box mt={2}>
              <h2>Item 2</h2>
            </Box>
          </TabPanel>
        </Box>
          </Box>

        </Stack>
      </Container>
    </div>
  );
};

export default UserProfile;
