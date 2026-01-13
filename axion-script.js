document.getElementById("connectBtn").addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const walletAddress = accounts[0];
      document.getElementById(
        "walletAddress"
      ).textContent = `Connected: ${walletAddress}`;
      document.getElementById("networkStatus").textContent =
        "Connected to Ethereum";
      // Simulate token balance fetch
      document.getElementById("tokenBalance").textContent = "1,250 AXN";
    } catch (error) {
      console.error("Connection error:", error);
      document.getElementById("walletAddress").textContent =
        "Connection failed";
    }
  } else {
    alert("MetaMask not detected. Please install it to use Axion.");
  }
});
