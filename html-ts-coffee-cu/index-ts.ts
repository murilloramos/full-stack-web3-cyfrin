import { 
  createWalletClient, 
  custom, 
  createPublicClient, 
  parseEther, 
  defineChain, 
  formatEther,
  WalletClient,
  PublicClient,
  Address 
} from "viem"
import { contractAddress, abi } from "./constants-ts"

// Extend Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const connectButton = document.getElementById("connectButton") as HTMLButtonElement | null;
  const fundButton = document.getElementById("fundButton") as HTMLButtonElement | null;
  const ethAmountInput = document.getElementById("ethAmount") as HTMLInputElement | null;
  const balanceButton = document.getElementById("balanceButton") as HTMLButtonElement | null;
  const withdrawButton = document.getElementById("withdrawButton") as HTMLButtonElement | null;

  console.log("Hello")

  let walletClient: WalletClient | undefined;
  let publicClient: PublicClient | undefined;

  async function connect(): Promise<void> {
    if (!connectButton) return;

    if (typeof window.ethereum !== "undefined") {
      walletClient = createWalletClient({
        transport: custom(window.ethereum)
      });
      await walletClient.requestAddresses();
      connectButton.innerHTML = "Connected!";
    } else {
      connectButton.innerHTML = "Please install the MetaMask Application!";
    }
  }

  async function withdraw(): Promise<void> {
    console.log("Withdrawing funds...");
    if (typeof window.ethereum !== "undefined") {
      walletClient = createWalletClient({
        transport: custom(window.ethereum),
      });
      const [connectedAccount] = await walletClient.requestAddresses();
      const currentChain = await getCurrentChain(walletClient);

      publicClient = createPublicClient({
        transport: custom(window.ethereum),
      });
      
      const { request } = await publicClient.simulateContract({
        address: contractAddress as Address,
        abi: abi,
        functionName: "withdraw",
        account: connectedAccount,
        chain: currentChain,
      });

      const hash = await walletClient.writeContract(request);
      console.log("Withdrawal transaction hash:", hash);
    } else {
      if (connectButton) {
        connectButton.innerHTML = "Please install MetaMask!";
      }
    }
  }

  async function fund(): Promise<void> {
    if (!ethAmountInput) return;

    const ethAmount = ethAmountInput.value;
    console.log(`Funding with ${ethAmount}...`);

    if (typeof window.ethereum !== "undefined") {
      walletClient = createWalletClient({
        transport: custom(window.ethereum)
      });
      const [connectedAccount] = await walletClient.requestAddresses();
      const currentChain = await getCurrentChain(walletClient);
      
      publicClient = createPublicClient({
        transport: custom(window.ethereum)
      });
      
      const { request } = await publicClient.simulateContract({
        address: contractAddress as Address,
        abi: abi,
        functionName: "fund",
        account: connectedAccount,
        chain: currentChain,
        value: parseEther(ethAmount),
      });

      const hash = await walletClient.writeContract(request);
      console.log(hash);
    } else {
      if (connectButton) {
        connectButton.innerHTML = "Please install the MetaMask Application!";
      }
    }
  }

  async function getCurrentChain(client: WalletClient) {
    const chainId = await client.getChainId();
    const currentChain = defineChain({
      id: chainId,
      name: "Custom Chain",
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: {
        default: {
          http: ["http://localhost:8545"],
        },
      },
    });
    return currentChain;
  }

  async function getbalance(): Promise<void> {
    if (typeof window.ethereum !== "undefined") {
      publicClient = createPublicClient({
        transport: custom(window.ethereum)
      });
      const balance = await publicClient.getBalance({
        address: contractAddress as Address
      });
      console.log(formatEther(balance));
    }
  }

  // Add null checks for event handlers
  if (connectButton) connectButton.onclick = connect;
  if (fundButton) fundButton.onclick = fund;
  if (balanceButton) balanceButton.onclick = getbalance;
  if (withdrawButton) withdrawButton.onclick = withdraw;
});
