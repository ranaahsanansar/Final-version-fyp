import nodeProviderUrl, { getAllDistricURL, getAllProvienceURL, getAreaNameURL, getAreaURL, getContractURL, getSocietyURL, landInspectorContractAddress, govermentAuthorityContractAddress } from "../../dataVariables";

const [areaOptions, setAreaOptions] = useState([])
const [provinceOptions, setPropvinceOptions] = useState([]);
const [districOptions, setDistricOptions] = useState([]);
const [societyOtpions, setSocietyOptions] = useState([]);

const [areaName, setAreaName] = useState("none");



const handleChangeProvience = (event) => {
  setProvince(event.target.value);

  const fetchData = async () => {
    let url = getAllDistricURL + event.target.value;
    // console.log("URL")
    // console.log(url)
    const data = await fetch(url);
    // console.log("Data")
    // console.log(data);


    const json = await data.json();
    setDistricOptions(json)
  }
  fetchData();

};

const handleChangeDistric = (event) => {

  setDistric(event.target.value);
  const fetchData = async () => {
    let url = getSocietyURL + event.target.value;
    // console.log("URL")
    // console.log(url)
    const data = await fetch(url);
    // console.log("Data")
    // console.log(data);


    const json = await data.json();
    setSocietyOptions(json)
  }
  fetchData();
};

const handleChangeSociety = (event) => {
  setSociety(event.target.value);
  const fetchData = async () => {
    let url = getAreaURL + event.target.value;
    // console.log("URL")
    // console.log(url)
    const data = await fetch(url);
    // console.log("Data")
    // console.log(data);


    const json = await data.json();
    setAreaOptions(json)
  }
  fetchData();
};

const handleChangeBlock = (event) => {
  setBlock(event.target.value);
  const fetchData = async () => {
    let url = getAreaNameURL + event.target.value;
    // console.log("URL")
    // console.log(url)
    const data = await fetch(url);
    const json = await data.json();
    // console.log("Data")
    // console.log(json.name);
    let _name = json.name;
    // console.log(_name)
    setAreaName(_name)
    // console.log("Area Name: ");
    // console.log(areaName)
  }
  fetchData();

  const fetchContracts = async () => {
    let url = getContractURL + event.target.value;
    // console.log("URL")
    // console.log(url)
    const data = await fetch(url);

    const json = await data.json();
    // console.log("Data")
    // console.log(json.name);
    let _landInspector = json[0].landInspector
    console.log("Land")
    console.log(_landInspector)
    setLockContractAddress(_landInspector);
    // setAreaName(_name)
    // console.log("Area Name: ");
    // console.log(areaName)
  }
  fetchContracts();


  // setAreaName(event.target.value);

  // setLockContractAddress(landInspectorContractAddress);

};



useEffect(() => {

  // provinceOptions.push({id: "2" , name: "Ahsan"})
  var array;

  const fetchData = async () => {

    const data = await fetch(getAllProvienceURL);

    const json = await data.json();
    setPropvinceOptions(json)
  }
  fetchData()
  // console.log(array);
  // setPropvinceOptions(array)
  // console.log(provinceOptions)

}, [])



  // Provience 
  < FormControl fullWidth >
                <InputLabel id="province-label">Province</InputLabel>

                <Select
                  fullWidth
                  required
                  labelId="province-label"
                  id="province"
                  value={province}
                  label="province"
                  onChange={handleChangeProvience}
                >
                  <MenuItem value="none">None</MenuItem>

                  {
                    provinceOptions.map((e) => {
                      return (<MenuItem value={e._id}>{e.name}</MenuItem>)

                    })
                  }
                  {/* <MenuItem value="punjab">punjab</MenuItem>
                  <MenuItem value="sindh">Karachi</MenuItem>
                  <MenuItem value="balochistan">Sialkot</MenuItem>
                  <MenuItem value="KPK">KPK</MenuItem> */}
                </Select>
              </FormControl >



// Distric 
<FormControl fullWidth>
                <InputLabel id="distric-label">District</InputLabel>

                <Select
                  fullWidth
                  required
                  labelId="distric-label"
                  id="distric"
                  value={distric}
                  label="Distric"
                  onChange={handleChangeDistric}
                >

                  <MenuItem value="none">None</MenuItem>

                  {
                    districOptions.map((e) => {

                      return (<MenuItem value={e._id}>{e.name}</MenuItem>)

                    })
                  }

                  {/* <MenuItem value="lahore">Lahore</MenuItem>
                  <MenuItem value="karachi">Karachi</MenuItem>
                  <MenuItem value="sialkot">Sialkot</MenuItem> */}
                </Select>
              </FormControl>

// Society 
<FormControl fullWidth>
                <InputLabel id="society-label">Society</InputLabel>

                <Select
                  fullWidth
                  required
                  labelId="society-label"
                  id="society"
                  value={society}
                  label="society"
                  onChange={handleChangeSociety}
                >
                  <MenuItem value="none">None</MenuItem>
                  {
                    societyOtpions.map((e) => {

                      return (<MenuItem value={e._id}>{e.name}</MenuItem>)

                    })
                  }

                  {/* <MenuItem value="park-view">Park View</MenuItem>
                  <MenuItem value="bahria">Bahria</MenuItem>
                  <MenuItem value="rehman-garden">Rehman Garden</MenuItem>
                  <MenuItem value="iqbal-town">Iqbal Town</MenuItem> */}
                </Select>
              </FormControl>

// Block 
<FormControl fullWidth>
                <InputLabel id="block-label">Block</InputLabel>

                <Select
                  fullWidth
                  required
                  labelId="block-label"
                  id="block"
                  value={block}
                  label="block"
                  onChange={handleChangeBlock}
                >
                  <MenuItem value="none">None</MenuItem>
                  {
                    areaOptions.map((e) => {

                      return (<MenuItem value={e._id}>{e.name}</MenuItem>)

                    })
                  }
                  {/* <MenuItem value="bahria-1-A">A Block</MenuItem>
                  <MenuItem value="bahria">B Block</MenuItem>
                  <MenuItem value="rehman-garden">X Block</MenuItem>
                  <MenuItem value="iqbal-town">Y Block</MenuItem> */}
                </Select>
              </FormControl>


// setAreaContractAddress
let _areaContractAddress = json[0].areaContract

setAreaContractAddress(_areaContractAddress)