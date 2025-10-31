import { createWalletClient, custom } from "https://esm.sh/viem"

const connectButton = document.getElementById("connectButton")

let walletClient

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        walletClient = createWalletClient({
            transport: custom(window.ethereum) // In the future we can put here different kinds of transports, which means more wallet compatibility within our application
        })
        await walletClient.requestAddresses()
        connectButton.innerHTML = "Connected!"

    } else {
        connectButton.innerHTML = "Please install the MetaMask Application!"
    }
}

connectButton.onclick = connect