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

let timerState = {
    endTime: 0,       // ms timestamp of when timer hits 0 (0 = not running)
    running: false,
    defaultSeconds: 600
};

app.get('/api/timer/state', (req, res) => {
    res.json(timerState);
});

app.post('/api/timer/start', (req, res) => {
    const { endTime } = req.body;
    if (!endTime) return res.status(400).json({ success: false, error: 'endTime required' });
    timerState = {
        endTime,
        running: true,
        defaultSeconds: timerState.defaultSeconds
    };
    res.json({ success: true, state: timerState });
});

app.post('/api/timer/pause', (req, res) => {
    if (timerState.running) {
        const remaining = Math.max(Math.ceil((timerState.endTime - Date.now()) / 1000), 0);
        timerState = {
            endTime: Date.now() + remaining * 1000,
            running: false,
            remainingOnPause: remaining,
            defaultSeconds: timerState.defaultSeconds
        };
    }
    res.json({ success: true, state: timerState });
});

app.post('/api/timer/reset', (req, res) => {
    timerState = {
        endTime: 0,
        running: false,
        defaultSeconds: timerState.defaultSeconds
    };
    res.json({ success: true });
});

let sharedState = {
    savedInjectsIds: [],
    savedSubmitted:  {},
    injectDeadline:  {},
};

app.get('/api/injects/state', (req, res) => {
    res.json(sharedState);
});

app.patch('/api/injects/add', (req, res) => {
    const { inject, deadline } = req.body;
    if (!inject || deadline === undefined) {
        return res.status(400).json({ success: false, error: 'inject and deadline required' });
    }
    const already = sharedState.savedInjectsIds.some(i => i.id === inject.id);
    if (!already) {
        sharedState.savedInjectsIds = [...sharedState.savedInjectsIds, inject];
        sharedState.injectDeadline  = { ...sharedState.injectDeadline, [inject.id]: deadline };
    }
    res.json({ success: true, state: sharedState });
});

app.patch('/api/injects/submit', (req, res) => {
    const { injectId, checked } = req.body;
    if (injectId === undefined || checked === undefined) {
        return res.status(400).json({ success: false, error: 'injectId and checked required' });
    }
    sharedState.savedSubmitted = { ...sharedState.savedSubmitted, [injectId]: checked };
    res.json({ success: true, state: sharedState });
});

app.post('/api/injects/reset', (req, res) => {
    sharedState = { savedInjectsIds: [], savedSubmitted: {}, injectDeadline: {} };
    timerState = { endTime: 0, running: false, defaultSeconds: timerState.defaultSeconds };
    scoreState = { totalScore: 0 }; // *** NEW: also clears score on reset ***
    res.json({ success: true });
});

let scoreState = { totalScore: 0 };

app.get('/api/score/state', (req, res) => {
    res.json(scoreState);
});


app.patch('/api/score/add', (req, res) => {
    const { points } = req.body;
    if (points === undefined) return res.status(400).json({ success: false, error: 'points required' });
    scoreState.totalScore += points;
    res.json({ success: true, state: scoreState });
});


app.post('/api/score/reset', (req, res) => {
    scoreState = { totalScore: 0 };
    res.json({ success: true });
});

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
            rejectUnauthorized: false
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

app.get('/api/proxmox/status', async (req, res) => {
    try {
        const result = await proxmoxRequest('GET', '/cluster/status');
        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/api/proxmox/nodes', async (req, res) => {
    try {
        const result = await proxmoxRequest('GET', '/nodes');
        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

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