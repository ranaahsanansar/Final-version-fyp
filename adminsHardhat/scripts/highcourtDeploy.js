const hre = require("hardhat");

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const unlockTime = currentTimestampInSeconds + 60;

  // const lockedAmount = hre.ethers.utils.parseEther("0.001");

  const Lock = await hre.ethers.getContractFactory("Highcourt");
  const lock = await Lock.deploy("0xf6F304847c55f0EcC3c55640FBcDe615b08fE30e");

  await lock.deployed();

  console.log(
    "HighCourt Address is : " + lock.address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 


// Goverment Property = 0x4ACCaDaa8AbFB3061A4a5844f8307d42D97FfF9c 
// 0x6AAe87ab6f2857c8b9dA2808c17d74E601bb098B


// High Court = 0x720c8D43353236Fa47fE2eb32dba3B9dbD9eE9D7 
// 0x56a5676ed8A278EA811c379E127e6FE52704eEEC



// LandInspector = 0xb8B7050CdaC5154E9d56680Db23286eaf536BE37 
// 0xc657D9aee8eBa95dFaa3c6D3AD1CB82D97Ee8A0A





// Citizens = 0x6D775f5A4008BaAEF0FdadC09dAEe96149aB301c 
// 0xC7d127cE7faD614Af410ac21546a2DbCa5f08419





// OnwerShip =  0x2604e9292a4cF4C622B806480cF41279920F56A3
// 0x70fefc19b5B632996377904f1Ba21897a3d7F0f3

