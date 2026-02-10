require("dotenv").config();
const express = require("express");
const ping = require("ping");

const app = express();
const port = 3001;

//Add back once get all of them
/*const services = [
  { name: "ecom-http", host: "192.168.1.10", port: 80 },
  { name: "mail-pop3", host: "192.168.1.11", port: 25 },
  { name: "2022-ftp", host: "192.168.1.12", port: 21 },
  { name: "ad-dns", host: "192.168.1.13", port: 53 },
  { name: "splunk-http", host: "192.168.1.14", port: 3306 },
  { name: "2019-http", host: "192.168.1.15", port: 22 },
  { name: "mail-smtp", host: "192.168.1.11", port: 143 },
];*/
//const services = [
 // { name: "ecom-http", host: "192.12.206.140", port: 8006}];

const net = require("net");

function checkService(service) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(3000);

    socket.connect(service.port, service.host, () => {
      socket.destroy();
      resolve({ ...service, status: "UP" });
    });

    socket.on("error", () => {
      resolve({ ...service, status: "DOWN" });
    });

    socket.on("timeout", () => {
      socket.destroy();
      resolve({ ...service, status: "DOWN" });
    });
  });

  let currentStatus = [];

async function checkAllServices() {
  const results = await Promise.all(
    services.map((service) => checkService(service))
  );

  currentStatus = results;
  console.log("Updated service status:", currentStatus);
}

checkAllServices();

//Run every 2 minutes
//setInterval(checkAllServices, 2 * 60 * 1000);
setInterval(checkAllServices, 30 * 1000);


app.get("/api/status", (req, res) => {
  res.json(currentStatus);
});

}