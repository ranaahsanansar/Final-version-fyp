// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const unlockTime = currentTimestampInSeconds + 60;

  // const lockedAmount = hre.ethers.utils.parseEther("0.001");

  const Lock = await hre.ethers.getContractFactory("GovermentAuthority");
//   govermentAuthority , Highcourt Contract Address 
  const lock = await Lock.deploy("0xcc22DF0c635cFa950113dd108eE5A2DAa4fFF039");

  await lock.deployed();

  console.log(
    "Citizen Address is : " + lock.address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 

 

// Goverment Property = 0x4ACCaDaa8AbFB3061A4a5844f8307d42D97FfF9c 
// High Court = 0x720c8D43353236Fa47fE2eb32dba3B9dbD9eE9D7 
// LandInspector = 0xb8B7050CdaC5154E9d56680Db23286eaf536BE37 

// Citizens = 0x6D775f5A4008BaAEF0FdadC09dAEe96149aB301c 


// OnwerShip =  0x2604e9292a4cF4C622B806480cF41279920F56A3











// ---------------------

// 0xa3B346B764f66016dbA48570a616F398038a9076