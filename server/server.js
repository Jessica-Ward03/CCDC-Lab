const express = require('express');
const cors = require('cors');
const ping = require('ping');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ping-proxmox', async (req, res) => {
    const host = process.env.PROXMOX_HOST;

    try {
        const result = await ping.promise.probe(host);
        if (result.alive) {
            res.json({ success: true, message: `Proxmox host ${host} is reachable!` });
        } else {
            res.json({ success: false, message: `Proxmox host ${host} is NOT reachable.` });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(3001, () => {
    console.log('Server started on port 3001');
});
//setx PROXMOX_HOST (Insert IP Here)
//node server.js
//https://localhost:3001/api/ping-proxmox