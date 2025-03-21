const si = require('systeminformation');

async function fetchIPAddress() {
    const networkInterfaces = await si.networkInterfaces();
    if (networkInterfaces.length == 0) return null;

    for (let networkInterface of networkInterfaces) {
        if (networkInterface.default) return networkInterface.ip4;
    }
    
    return null;
}

async function fetchNetworkInterfaces() {
    const networkInterfaces = await si.networkInterfaces();
    return networkInterfaces;
}

async function fetchLatency() {
    const inetLatency = await si.inetLatency();
    return inetLatency;
}

async function fetchTrafficInKBps() {
    const networkStats = await si.networkStats();
    if (networkStats.length == 0) return { received: 0, transferred: 0 };

    let received = 0;
    let transferred = 0;
    for (let networkStat of networkStats) {
        if (!networkStat.rx_sec || !networkStat.tx_sec) return { received: 0, transferred: 0 };

        received += networkStat.rx_sec;
        transferred += networkStat.tx_sec;
    }

    received /= 1000;
    transferred /= 1000;

    return { received, transferred };
}

module.exports = { fetchIPAddress, fetchNetworkInterfaces, fetchTrafficInKBps, fetchLatency };