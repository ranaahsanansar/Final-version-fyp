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

  const Lock = await hre.ethers.getContractFactory("OwnerShip");
  const lock = await Lock.deploy('0xf6F304847c55f0EcC3c55640FBcDe615b08fE30e' , '0x720c8D43353236Fa47fE2eb32dba3B9dbD9eE9D7' , '0xb8B7050CdaC5154E9d56680Db23286eaf536BE37' , '0x6D775f5A4008BaAEF0FdadC09dAEe96149aB301c' );

  await lock.deployed();

  console.log(
    "Contract Address is : " + lock.address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 



// Goverment Property = 0x4ACCaDaa8AbFB3061A4a5844f8307d42D97FfF9c Verified 
// High Court = 0x720c8D43353236Fa47fE2eb32dba3B9dbD9eE9D7 
// LandInspector = 0xb8B7050CdaC5154E9d56680Db23286eaf536BE37 

// Citizens = 0x6D775f5A4008BaAEF0FdadC09dAEe96149aB301c 


// OnwerShip = 0xcD8D44a2c5013E3BF4Ae8Aa6CEdEe15b049EaF5A 