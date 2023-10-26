const portscanner = require("portscanner");
const fs = require("fs");

// Define the range of ports you want to scan
const startPort = 1;
const endPort = 65535; // Max port number

// Define the target server's IP address
const serverIP = "your-server-ip";

// Array to store open ports
const openPorts = [];

// Function to scan ports and identify which are open
function scanOpenPorts() {
  console.log(`Scanning open ports on ${serverIP}...`);

  for (let port = startPort; port <= endPort; port++) {
    portscanner.checkPortStatus(port, serverIP, (error, status) => {
      if (status === "open") {
        openPorts.push(port);
        console.log(`Port ${port} is open`);
      }
    });
  }
}

// Start the port scanning process
scanOpenPorts();

// When scanning is complete, save the open ports to a JSON file
setTimeout(() => {
  const openPortsData = JSON.stringify(openPorts);

  fs.writeFile("openPorts.json", openPortsData, (err) => {
    if (err) {
      console.error("Error writing openPorts.json:", err);
    } else {
      console.log("Open ports saved to openPorts.json");
    }
  });
}, 5000); // Adjust the delay (in milliseconds) as needed
