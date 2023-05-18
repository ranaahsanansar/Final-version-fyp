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

    console.log(contractAddress);

    const nodeProvider = new ethers.providers.JsonRpcProvider(
      nodeProviderUrl
    )

    const walletProvider = new ethers.providers.Web3Provider(
      ethereum
    )

    const signer = walletProvider.getSigner();

    // console.log(nodeProvider , walletProvider)

    const getContractData = new ethers.Contract(
      contractAddress,
      govAuthorityContract.abi,
      nodeProvider
    )

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