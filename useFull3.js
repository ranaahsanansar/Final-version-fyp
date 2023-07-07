const [formData, setFormData] = useState({
  propertyId: "",
  ownerCNIC: "",
  shares: "",
  price: ""
});

const [formErrors, setFormErrors] = useState({
  propertyId: "",
  ownerCNIC: "",
  shares: "",
  price: ""
});


const validateForm = () => {
  let valid = true;
  const errors = {};

  if (formData.propertyId == "") {
    errors.propertyId = "Field is required";
    valid = false;
  } else if (formData.propertyId < 1) {
    errors.propertyId = "ID must not be less then 1";
    valid = false;
  }

  if (formData.ownerCNIC == "") {
    errors.ownerCNIC = "Field is required";
    valid = false;
  } else if (formData.ownerCNIC < 1) {
    errors.ownerCNIC = "Value must not be less then 1";
    valid = false;
  }

  if (formData.shares == "") {
    errors.shares = "Field is required";
    valid = false;
  } else if (formData.shares < 1) {
    errors.shares = "Value must between 1 to 100";
    valid = false;
  } else if (formData.shares > 100) {
    errors.shares = "Value must between 1 to 100";
    valid = false;
  }

  if (formData.price == "") {
    errors.price = "Field is required";
    valid = false;
  } else if (formData.price < 1) {
    errors.price = "Value must not be less then 1";
    valid = false;
  }

  let checkValidID = formData.propertyId.toString();
  if (checkValidID.length != 12) {
    errors.propertyId = "ID must be valid 12 digits Uniqe Identification number";
    valid = false;
  }
  let checkValidCnic = formData.ownerCNIC.toString();
  if (checkValidCnic.length != 13) {
    errors.ownerCNIC = "Cnicn Must be Valid";
    valid = false;
  }


  if (block == 'none') {
    setAlert({
      status: true,
      msg: "All fields are required",
      type: "error"
    })
    valid = false;
  }

  if (province == "none") {
    setAlert({
      status: true,
      msg: "All fields are required",
      type: "error"
    })
    valid = false;
  }
  if (distric == 'none') {
    setAlert({
      status: true,
      msg: "All fields are required",
      type: "error"
    })
    valid = false;
  }
  if (society == 'none') {
    setAlert({
      status: true,
      msg: "All fields are required",
      type: "error"
    })
    valid = false;
  }

  // if (!formData.agree) {
  //   errors.agree = "You must agree to the terms and conditions";
  //   valid = false;
  // }

  setFormErrors(errors);

  return valid;
};


const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: type === "checkbox" ? checked : value
  }));
};

<TextField
  fullWidth
  required
  id="propertyId"
  name="propertyId"
  label="Property ID"
  type="number"
  value={formData.propertyId}
  onChange={handleChange}
  inputProps={{ min: 0 }}
  error={Boolean(formErrors.propertyId)}
  helperText={formErrors.propertyId}
/>


<TextField
                fullWidth
                required
                id="ownerCNIC"
                name="ownerCNIC"
                label="Seller CNIC"
                type="number"
                value={formData.ownerCNIC}
                onChange={handleChange}
                inputProps={{ min: 0 }}
                error={Boolean(formErrors.ownerCNIC)}
                helperText={formErrors.ownerCNIC}
              />



              <TextField
              fullWidth
              required
              id="reqNum"
              name="reqNum"
              label="Request Number"
              type="number"
              value={formData.reqNum}
              onChange={handleChange}
              inputProps={{ min: 0 }}
              error={Boolean(formErrors.reqNum)}
              helperText={formErrors.reqNum}
            />
            
                        </Grid>