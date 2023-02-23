require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@nomiclabs/hardhat-etherscan");
// require("./hardhat.tasks.ts");
require("dotenv").config();

const infuraAuth = process.env.INFURA_API_SECRET
  ? `:${process.env.INFURA_API_SECRET}@`
  : "";

module.exports = {
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // Local Development
    hardhat: {
      accounts: {
        mnemonic:
          "release eight jacket evil theory finish more matrix dignity tuition flight arrow",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
      },
    },
    sepolia: {
      // Testnet
      url: `https://${infuraAuth}sepolia.infura.io/v3/${
        process.env.INFURA_API_KEY ?? ""
      }`,
      chainId: 11155111,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      deploy: ["deploy/testnet"],
      tags: ["testnet", "sepolia"],
    },
    goerli: {
      // Testnet
      url: `https://${infuraAuth}goerli.infura.io/v3/${
        process.env.INFURA_API_KEY ?? ""
      }`,
      chainId: 5,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      deploy: ["deploy/testnet"],
      tags: ["testnet", "goerli"],
    },
    // mainnet: {
    //   url: `https://${infuraAuth}mainnet.infura.io/v3/${
    //     process.env.INFURA_API_KEY ?? ""
    //   }`,
    //   chainId: 1,
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    //   deploy: ["deploy/mainnet"],
    //   tags: ["mainnet"],
    // },
  },
  namedAccounts: {
    deployer: 0,
    tokenHolder: 2,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "sepolia",
        chainId: 11155111,
        urls: {
          apiURL: "https://api-sepolia.etherscan.io/",
          browserURL: "https://sepolia.etherscan.io/",
        },
      },
    ],
  },
};
