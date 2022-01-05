require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat :{
      blockGasLimit: 10000000
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${process.env.ROPSTEN_PRIVATE_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    }
  }
};
