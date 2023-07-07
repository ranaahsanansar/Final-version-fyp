import React, { useEffect, useState } from "react";
import ImgMediaCard from "../components/PropertyCard";
import { Box, Button, Container, Grid } from "@mui/material";
import AddProperty from "./AddProperty";
import { useSelector } from "react-redux";
import axios from "axios";

import { citites } from "../cities";

const ListProperty = () => {
  const [displayForm, setDisplayForm] = useState(false);
  const { token } = useSelector(state => state.auth)



  const [data , setData ] = useState([])

  const fetchCards = async () => {

    const res = await axios.get("http://localhost:8000/api/dashboard/property/myProperties" ,{
      headers: {"Authorization" :`Bearer ${token}`}
    });
    return res;
  }

  useEffect(async()=>{
    const res = await fetchCards();
    setData(res.data.propertiesArray)
  })

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
            <Box sx={[{ borderRadius: 2, padding: 2 , backgroundColor: 'white' }]}>
              <h1>List new Property/ See listed Properties</h1>
            </Box>
            <Box mt={1}>
              <Button
                variant="contained"
                sx={{ my: 2  , backgroundColor: '#F3E5AB' ,color:"black"}}
                onClick={() => {
                  if(displayForm){
                    let sure = window.confirm("Are you sure you want to close this form?");
                    if(sure){
                      setDisplayForm(!displayForm);
                      return
                    }else{
                      return
                    }
                  }
                  setDisplayForm(!displayForm);
                  
                  
                }}
                
              >
                {displayForm ? "Close Form" : "Post an Ad"}
              </Button>
            </Box>
            <Box>
              {displayForm ? (
                <AddProperty  />
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
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default ListProperty;
