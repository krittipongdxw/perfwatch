const { ipcMain } = require("electron/main");
const { fetchHardwareInfo, fetchCPUTemp, fetchCPUAvgClock, fetchCPUPower, fetchCPULoad, fetchCPUFan, fetchCPUModel } = require('./hardware/hardware');

ipcMain.handle('get-hardware-info', async () => {
    return await fetchHardwareInfo();
});

ipcMain.handle('get-cpu-temp', async () => {
    return await fetchCPUTemp();
});

ipcMain.handle('get-cpu-avg-clock', async () => {
    return await fetchCPUAvgClock();
});

ipcMain.handle('get-cpu-power', async () => {
    return await fetchCPUPower();
});

ipcMain.handle('get-cpu-load', async () => {
    return await fetchCPULoad();
});

ipcMain.handle('get-cpu-fan', async () => {
    return await fetchCPUFan();
});

ipcMain.handle('get-cpu-model', async () => {
    return await fetchCPUModel();
});