const { contextBridge, ipcRenderer } = require('electron');
const { fetchHardwareInfo, fetchMainboardModel } = require('./hardware/hardware');
const { fetchCPUTemp, fetchCPUAvgClock, fetchCPUPower, fetchCPULoad, fetchCPUFan, fetchCPUModel } = require('./hardware/cpu');
const { fetchGPUTemp, fetchGPUClock, fetchGPUPower, fetchGPULoad, fetchGPUFan, fetchGPUModel } = require('./hardware/gpu');
const { fetchMemoryLoad, fetchMemoryUsed, fetchMemoryAvailable, fetchMemoryType, fetchMemoryList, fetchMemoryClock } = require('./hardware/ram');
const { fetchIPAddress, fetchNetworkInterfaces, fetchTrafficInKBps, fetchLatency } = require('./hardware/network');
const { fetchFsSize, fetchDiskLayout } = require('./hardware/storage');

contextBridge.exposeInMainWorld("electron", {
    sendNotification: (title, body) => ipcRenderer.send("show-notification", { title, body }),
});

contextBridge.exposeInMainWorld('hardware', {
    getHardwareInfo: async () => await fetchHardwareInfo(),
    getMainboardModel: async () => await fetchMainboardModel(),
});

contextBridge.exposeInMainWorld('cpu', {
    getTemp: async () => await fetchCPUTemp(),
    getAvgClock: async () => await fetchCPUAvgClock(),
    getPower: async () => await fetchCPUPower(),
    getLoad: async () => await fetchCPULoad(),
    getFan: async () => await fetchCPUFan(),
    getModel: async () => await fetchCPUModel(),
});

contextBridge.exposeInMainWorld('gpu', {
    getTemp: async () => await fetchGPUTemp(),
    getClock: async () => await fetchGPUClock(),
    getPower: async () => await fetchGPUPower(),
    getLoad: async () => await fetchGPULoad(),
    getFan: async () => await fetchGPUFan(),
    getModel: async () => await fetchGPUModel(),
});

contextBridge.exposeInMainWorld('ram', {
    getLoad: async () => await fetchMemoryLoad(),
    getUsed: async () => await fetchMemoryUsed(),
    getAvailable: async () => await fetchMemoryAvailable(),
    getType: async () => await fetchMemoryType(),
    getList: async () => await fetchMemoryList(),
    getClock: async () => await fetchMemoryClock(),
});

contextBridge.exposeInMainWorld('storage', {
    getFsSize: async () => await fetchFsSize(),
    getDiskLayout: async () => await fetchDiskLayout(),
});

contextBridge.exposeInMainWorld('network', {
    getIPAddress: async () => await fetchIPAddress(),
    getInterfaces: async () => await fetchNetworkInterfaces(),
    getTrafficInKBps: async () => await fetchTrafficInKBps(),
    getLatency: async () => await fetchLatency(),
});