// setTimeout(async () => {
//     try {
//         const info = await window.hardware.getHardwareInfo();
//         const cpuTemp = await window.hardware.getCPUTemp();
//         const avgClock = await window.hardware.getCPUAvgClock();
//         console.log(avgClock);
//     } catch (error) {
//         console.error('Error getting hardware info:', error);
//     }
// }, 500);

setInterval(async () => {
    try {
        const info = await window.hardware.getHardwareInfo();
        const cpuTemp = await window.cpu.getTemp();
        const cpuAvgClock = await window.cpu.getAvgClock();
        const cpuPower = await window.cpu.getPower();
        const cpuLoad = await window.cpu.getLoad();
        const cpuFan = await window.cpu.getFan();
        const cpuModel = await window.cpu.getModel();

        const gpuTemp = await window.gpu.getTemp();
        const gpuClock = await window.gpu.getClock();
        const gpuPower = await window.gpu.getPower();
        const gpuLoad = await window.gpu.getLoad();
        const gpuFan = await window.gpu.getFan();
        const gpuModel = await window.gpu.getModel();

        const memoryLoad = await window.ram.getLoad();
        const memoryUsed = await window.ram.getUsed();
        const memoryAvailable = await window.ram.getAvailable();
        const memoryType = await window.ram.getType();
        const memoryClock = await window.ram.getClock();

        const fsSize = await window.storage.getFsSize();

        const ip = await window.network.getIPAddress();
        const latency = await window.network.getLatency();
        const { received, transferred } = await window.network.getTrafficInKBps();

        // const cpu = document.querySelector('#cpu');
        // if (cpu) {
        //     cpu.innerHTML = Math.round(cpuTemp * 10) / 10;
        // }
    } catch (error) {
        console.error('Error getting hardware info:', error);
    }
}, 1000);