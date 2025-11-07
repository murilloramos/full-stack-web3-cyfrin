# 🚀 Full Stack Web3 Development Crash Course by Cyfrin Updraft

## About This Repository

Welcome to my public learning journal! This repository serves as a **daily progress tracker** where I document my journey through the Cyfrin Updraft Full Stack Web3 Development Crash Course.

The primary use for this is to serve as motivation for my own progress

### So here we will:

- **📝 Daily commits** with new code, notes, and new learnings
- **💡 Code examples** and projects built during the course
- **📚 Knowledge repository** for future reference and consultation

As the time goes by, I will keep updating this everyday NONSTOP!

##

#### DAY 1️⃣ - Last Commit [HERE](https://github.com/murilloramos/full-stack-web3-cyfrin/commit/f39ea44a9908cbc09b06ca8ac7097c8ed04bdc1e)
- Created a simple "Connect" button to test blockchain wallet connections
- Since I use WSL, I had to go beyond simply opening the index.html file and learned to run a server inside my project folder - something I didn't know was possible before
- Using WSL is significantly increasing my capabilities for software testing within my applications
- Learned how to connect MetaMask (or pretty much any EVM wallet) to my own website

#### DAY 2️⃣ - Last Commit [HERE](https://github.com/murilloramos/full-stack-web3-cyfrin/commit/546ae4cea50c54df8129625e386ec5d1ffe186b6)
- Started working with the fund function, which is essentially the practice of sending money to a smart contract so I can test its functionality
- Learned how to use the createPublicClient function of Viem, that is a way for me to talk with the blockchain by connecting the network using a RPC so I can have access to reading and simulating blockchain data
- Also used the createWalletClient function so I can send transactions
- Before sending "real transactions" I had access to the simulateContract function, that has the capability for simulating a function call, adding some values like the current chain, address of the contract, ABI and so on
- Specifically for this chain that I am simulating with the previous mentioned function, I had to use the getCurrentChain function because Viem is designed to be **explicit** and **modular** so basically it doesn't assume what chain the MetaMask is currently connected on. So I need to define by myself by pasing a "chain object"
#### DAY 3️⃣ - Last Commit [HERE](https://github.com/murilloramos/full-stack-web3-cyfrin/commit/1e9441caef742ddbdd5525affa4a471a53aecf4b)
- I broke my head a lot trying to import the first anvil node account inside my Metamask so I can easily make my transactions, but for some reason I was getting an error on Metamask that was basically saying that I was duplicating that account because that private key was already on my wallet. It turns out it was the Hardhat fake account that had the same address, I had put this account some time ago when i was building a supply chain application with Hardhat, so I just renamed this Hardhat account to Anvil lol
- The fund function of the smart contract has been sent to my blockchain local node of Anvil. To do this, I first had to run a local Anvil node in my terminal. I also had to confirm the transaction in MetaMask (because of the walletClient setup), and the transaction hash was logged to the console
#### DAY 4️⃣ - Last Commit [HERE](https://github.com/murilloramos/full-stack-web3-cyfrin/commit/5d1d7d20cb8ce0dccaa213353018d78fb22f8ba1)
- Learned how to run a local blockchain  with Anvil but with persistant state using the flag "--local-state", which means that the contract address that I am deploying (in this case fundMe) will be the same every time I restart Anvil, this is good for continous testing and implementation of new features of the project UI, in cases where I need to show information so I can test new designs.
- I was having an issue that my buttons weren't functioning, so I made a simple function just to view the balance of the Ether that I had already funded but for some reason the button wasn't doing what it was supposed to. Did some research and found out about an event called "DOMContentLoaded" so the browser reads the HTML first, then execute the JS functionalities. This is happening because since I am running my VSCode with WSL, specifically the Ubuntu distro, I have to run the command "http-server" on my terminal so I can run the index.html file 'cause WSL/Ubuntu doens't have a graphical interface, so I can't "double-click" the file as I would in normal Windows
- Just after the button problem resolution, had to create a simple getBalance function just to check the current ETH value inside the smart contract. Functioning with no problems whatsoever
### DAY 5️⃣ - Last Commit [HERE]()
- Created a withdraw function, capable of getting all the ETH funded inside the contract, also had to create a quick test "Withdraw" button on the html file
- Worked a little with typescript, the concept of compiling a typescript file, so it turns to a javascript file for the web browser to understand it, since it only understand .js files
- Had to spend a lot of time trying to figure it out how this whole thing of ts for js works, so this took me a giant amount of time
- Used Vite a modern frontend built to, that acts like a "bundler" where basically it takes all my typescript files and compile it to javascript, a amazing tool because I don't need tok keep manually compiling all the js files
  