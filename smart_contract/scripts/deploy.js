async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const metacardFactory = await ethers.getContractFactory("MetaCard");
  const metacardContract = await metacardFactory.deploy();

  await metacardContract.deployed();

  console.log("MetaCard address: ", metacardContract.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });