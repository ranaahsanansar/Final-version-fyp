import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Alert, Box } from '@mui/material';
import axios from 'axios';

const OfferMailForm = ({ id, title , sellerMail }) => {
  console.log("Form")
  console.log(sellerMail)

  const [alert, setAlert] = useState({
    status: false,
    msg: "",
    type: ""
  });

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required.';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid.';
      formIsValid = false;
    }

    if (!phone) {
      newErrors.phone = 'Phone is required.';
      formIsValid = false;
    } else if (!/^\d{11}$/.test(phone)) {
      newErrors.phone = 'Phone is invalid. Please enter a 10-digit phone number.';
      formIsValid = false;
    }

    if (!message) {
      newErrors.message = 'Message is required.';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const responce = await axios.post('http://localhost:8000/api/dashboard/property/send-message', {
          "sellerMail": sellerMail,
          "clientMail": email,
          "ClientPhone": phone,
          "propertyID": id,
          "propertyTitle": title,
          "clientMessage": message
        });
        console.log('Form submitted successfully!');
        setAlert({
          status: true,
          msg: "Mail send Successfuly",
          type: "success"
        })
      } catch (err) {
        setAlert({
          status: true,
          msg: "Mail not send Error in request",
          type: "error"
        })
      }

    }
  };


  useEffect(() => {
    // console.log("1")
    if (alert.status === true) {
      setTimeout(() => {

        setAlert({
          status: false,
          msg: "",
          type: ""
        })
      }, 5000);
    }

  })

  return (
    <>{alert.status ? <Alert style={{ marginBottom: '10px' }} severity={alert.type} sx={{ mt: 3 }}>{alert.msg}</Alert> : ''}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          style={{ marginBottom: '1rem' }}
        />
        {/* <Box sx={{}} >

      </Box> */}
        <TextField
          fullWidth
          label="Phone"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={!!errors.phone}
          helperText={errors.phone}
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          fullWidth
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          error={!!errors.message}
          helperText={errors.message}
          style={{ marginBottom: '1rem' }}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </>

  );
};

export default OfferMailForm;
