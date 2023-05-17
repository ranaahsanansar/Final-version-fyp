import React, { useState } from "react";
import ImgMediaCard from "../components/PropertyCard";
import { Box, Button, Container, Grid } from "@mui/material";
import AddProperty from "./AddProperty";

const data = [{
  title: "2 Marla House, Garden Town",
  image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600',
  des: "2 Marla double story House, 1 bed room ",
  id: 2
},{
  title: "3 kanal House, Bahria",
  image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  des: "3 kanal House, double story House, 1 bed room ",
  id: 2
},{
  title: "10 Marla House, Iqbal Town",
  image: 'https://images.pexels.com/photos/1876045/pexels-photo-1876045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  des: "10 Marla House double story House, 1 bed room ",
  id: 2
}]



const ListProperty = () => {
  const [displayForm, setDisplayForm] = useState(false);

  const glassMorphismStyle = {
    background: "rgba(255, 255, 255, 0.2)",
    boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };


  return (
    <div>
      <Box>
        <Container>
          <Box mt={2}>
            <Box sx={[glassMorphismStyle, { borderRadius: 2, padding: 2 }]}>
              <h1>My Listed Properties</h1>
            </Box>
            <Box mt={1}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ my: 2 }}
                onClick={() => {
                  setDisplayForm(!displayForm);
                }}
              >
                {displayForm ? "Close Form" : "Add New Property"}
              </Button>
            </Box>
            <Box>
              {displayForm ? (
                <AddProperty />
              ) : ("")}
            </Box>

            <Box
              mt={2}

            >

              
              <Grid container spacing={2}>
              { 
              data.map((item  , index)=>{
                return (<Grid key={index} item sm={6} xs={12} lg={4}>
                  <ImgMediaCard data={item} />
                </Grid>)
              }) }
                {/* <Grid item sm={6} xs={12} lg={4}>
                  <ImgMediaCard />
                </Grid>

                <Grid item sm={6} xs={12} lg={4}>
                  <ImgMediaCard />
                </Grid>
                <Grid item sm={6} xs={12} lg={4}>
                  <ImgMediaCard />
                </Grid>
                <Grid item sm={6} xs={12} lg={4}>
                  <ImgMediaCard />
                </Grid>
                <Grid item sm={6} xs={12} lg={4}>
                  <ImgMediaCard />
                </Grid> */}
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default ListProperty;
