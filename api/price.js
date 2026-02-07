import { config } from "dotenv";
import { ethers } from "ethers";

config(); // Load .env

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

const contractAddress = process.env.USDT_CONTRACT;

// Minimal ERC20 ABI to fetch decimals & balance
const abi = [
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function symbol() view returns (string)"
];

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const symbol = await contract.symbol();
    const decimals = await contract.decimals();
    const totalSupply = await contract.totalSupply();

    // Convert totalSupply to readable format
    const formattedSupply = Number(totalSupply) / 10 ** decimals;

    res.status(200).json({
      [symbol]: {
        total_supply: formattedSupply,
        last_updated_at: Math.floor(Date.now() / 1000)
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

