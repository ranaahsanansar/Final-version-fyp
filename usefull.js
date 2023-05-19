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
    let applicantCnic = cnic;


    const nodeProvider = new ethers.providers.JsonRpcProvider(
      nodeProviderUrl
    )

    const walletProvider = new ethers.providers.Web3Provider(
      ethereum
    )

    

    const getContractData = new ethers.Contract(
      contractAddress,
      govAuthorityContract.abi,
      nodeProvider
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


  {etherScanAlert.status ? <><Alert severity={etherScanAlert.type} sx={{ mt: 3 }}>{etherScanAlert.msg}<a href={etherScanAlert.url} target="_blank" > Click Me</a> </Alert>  </> : ''}


  useEffect(() => {
    if (etherScanAlert.status === true) {
      setTimeout(() => {
        setEtherScanAlert({
          status: false,
          msg: "",
          url: "",
          type: ""
        })
      }, 600000)
    }
  })
