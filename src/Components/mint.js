import { sequence } from '0xsequence'
const { ethers } = require("ethers");

async function  mint(){

  console.log('test1');
    // Part of the ERC20 ABI, so we can encode a `transfer` call
  const erc20Interface = new ethers.utils.Interface([
    'function mint(uint256 value)'
  ])
  
  sequence.initWallet("mumbai", {
    networkRpcUrl: "https://matic-mumbai.chainstacklabs.com",
  });
  
  // Get the wallet signer interface
  const wallet = sequence.getWallet()
  const signer = wallet.getSigner()
  
  // USDC contract address on Polygon network
  const usdcContractAddress = '0xd47Ada52729fB84EE53111d0594D056d504d4d6D'
  console.log('test2');
  // Sending to a recipient address
  // const recipientAddress = '0x8b4de256180cfec54c436a470af50f9ee2813dbb'
  
  // Sending 1.50 USDC, note USDC has 6 decimal places
//   const amount = ethers.utils.parseUnits('1.50', 6)
  
  // Encode an ERC-20 token transfer to recipient of the specified amount
  const data = erc20Interface.encodeFunctionData(
    'mint', [50]
  )
  
  // Prepare Transaction object
  const tx ={
    to: usdcContractAddress,
    data: data
  }
  console.log('test3');
  // Send the transaction via the signer to the blockchain :D The signer will prompt the user
  // sign+send the transaction, and once the user confirms it will be transmitted.
  const txnResp = await signer.sendTransaction(tx)
  console.log('test4');
  // Wait for the transaction to be mined by the network
  await txnResp.wait()
  console.log('test5');
  // We're done, print the transaction hash, and open it up in your block explorer
  console.log('transaction hash:', txnResp.hash)
  console.log('test6');
  
  }

export default mint;

