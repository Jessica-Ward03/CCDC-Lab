const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();
app.use(cors());
app.use(express.json());

// Proxmox API configuration
const PROXMOX_HOST = process.env.PROXMOX_HOST;
const PROXMOX_PORT = process.env.PROXMOX_PORT || '8006';
const PROXMOX_USER = process.env.PROXMOX_USER; // e.g., 'root@pam'
const PROXMOX_TOKEN_NAME = process.env.PROXMOX_TOKEN_NAME; // e.g., 'mytoken'
const PROXMOX_TOKEN_VALUE = process.env.PROXMOX_TOKEN_VALUE; // the secret value

// Helper function to make Proxmox API requests
function proxmoxRequest(method, path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: PROXMOX_HOST,
            port: PROXMOX_PORT,
            path: `/api2/json${path}`,
            method: method,
            headers: {
                'Authorization': `PVEAPIToken=${PROXMOX_USER}!${PROXMOX_TOKEN_NAME}=${PROXMOX_TOKEN_VALUE}`
            },
            rejectUnauthorized: false // Allow self-signed certificates
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (err) {
                    reject(err);
                }
            });
        });

        req.on('error', reject);
        req.end();
    });
}

// Test endpoint - get cluster status
app.get('/api/proxmox/status', async (req, res) => {
    try {
        const result = await proxmoxRequest('GET', '/cluster/status');
        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get list of nodes
app.get('/api/proxmox/nodes', async (req, res) => {
    try {
        const result = await proxmoxRequest('GET', '/nodes');
        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get VMs on a specific node
app.get('/api/proxmox/vms/:node', async (req, res) => {
    try {
        const result = await proxmoxRequest('GET', `/nodes/${req.params.node}/qemu`);
        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(3001, () => {
    console.log('Server started on port 3001');
});

