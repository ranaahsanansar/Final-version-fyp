import citizenContract from "../artifacts/contracts/Citizens.sol/Citizens.json";
import { ethers } from "ethers";

import nodeProviderUrl from "../dataVariables";

const [etherScanAlert, setEtherScanAlert] = useState({
  status: false,
  msg: "",
  url: "",
  type: ""
});

const [lockContractAddress, setLockContractAddress] = useState("");
{

  const { ethereum } = window;

  let contractAddress = lockContractAddress;


  const nodeProvider = new ethers.providers.JsonRpcProvider(
    nodeProviderUrl
  )
  const getContractData = new ethers.Contract(
    contractAddress,
    govAuthorityContract.abi,
    nodeProvider
  )

  const walletProvider = new ethers.providers.Web3Provider(
    ethereum
  )

  const signer = walletProvider.getSigner();

  const sendTx = new ethers.Contract(
    contractAddress,
    govAuthorityContract.abi,
    signer
  )
  console.log("Ok ha")

  const dataResult = await sendTx.rejectCitizen(applicantCnic, "only", { gasLimit: 5000000 });

  let txHash = dataResult.hash
  let scanUrl = "https://sepolia.etherscan.io/tx/" + txHash;



  setEtherScanAlert(
    {
      status: true,
      msg: "View Transaction on EtherScan",
      url: scanUrl,
      type: "success"
    }
  )

  await dataResult.wait();

  console.log(dataResult)
}

{ etherScanAlert.status ? <><Alert severity={etherScanAlert.type} sx={{ mt: 3 }}>{etherScanAlert.msg}<a href={etherScanAlert.url} target="_blank" > Click Me</a> </Alert>  </> : '' }

useEffect(() => {

  if (etherScanAlert.status === true) {
    setTimeout(() => {
      setEtherScanAlert({
        status: false,
        msg: "",
        url: "",
        type: ""
      })
    }, 60000)
  }



  
})
// =====================================================================================================

import { getAllProvienceURL } from "../../dataVariables";




const [provinceOptions, setPropvinceOptions] = useState([])

useEffect(() => {

  // provinceOptions.push({id: "2" , name: "Ahsan"})
  const fetchData = async () => {

    const data = await fetch(getAllProvienceURL);

    const json = await data.json();
    setPropvinceOptions(json)
  }
  fetchData()
  // console.log(array);
  // setPropvinceOptions(array)


}, [])

{
  provinceOptions.map((e) => {

    return (<MenuItem value={e._id}>{e.name}</MenuItem>)

  })
}


// ====================================================

const [districOptions, setDistricOptions] = useState([])



// handle CHange PRovince 
const fetchData = async () => {
  let url = getAllDistricURL + event.target.value;
  console.log("URL")
  console.log(url)
  const data = await fetch(url);
  console.log("Data")
  console.log(data);


  const json = await data.json();
  setDistricOptions(json)
}
fetchData();



{
  districOptions.map((e) => {

    return (<MenuItem value={e._id}>{e.name}</MenuItem>)

  })
}



// ==============================================

const [societyOtpions, setSocietyOptions] = useState([])


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


{
  societyOtpions.map((e) => {

    return (<MenuItem value={e._id}>{e.name}</MenuItem>)

  })
}

// ===================================================

const [areaOptions, setAreaOptions] = useState([])


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

  {
    areaOptions.map((e) => {

      return (<MenuItem value={e._id}>{e.name}</MenuItem>)

    })
  }


  // ===================================================
// 

  // get area nameSs
  const fetchData = async () => {
    let url = getAreaNameURL + event.target.value;
    // console.log("URL")
    // console.log(url)
    const data = await fetch(url);
    
    const json = await data.json();
    // console.log("Data")
    // console.log(json.name);
    let _name = json.name
    console.log(_name)
    setAreaName(_name)
    // console.log("Area Name: ");
    // console.log(areaName)
  }
  fetchData();


  =================================



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



