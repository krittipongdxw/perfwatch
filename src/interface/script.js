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

function updateCPU(temp, clock, fan, load) {
    const cpuTemp = document.getElementById("cpu-temp");
    const cpuTempBar = document.getElementById("cpu-temp-bar");
    if (cpuTemp) {
        cpuTemp.innerHTML = temp ? `${Math.round(temp)}°` : "N/A";
    }
    if (cpuTempBar) {
        cpuTempBar.style.width = temp ? `${temp}%` : "0%";
    }

    const cpuClock = document.getElementById("cpu-clock");
    const cpuClockBar = document.getElementById("cpu-clock-bar");
    if (cpuClock) {
        cpuClock.innerHTML = clock ? `${Math.round(clock)}MHz` : "N/A";
    }
    if (cpuClockBar) {
        cpuClockBar.style.width = clock ? `${(clock / 4450) * 100}%` : "0%";
    }

    const cpuFan = document.getElementById("cpu-fan");
    const cpuFanBar = document.getElementById("cpu-fan-bar");
    if (cpuFan) {
        cpuFan.innerHTML = (fan != null) ? `${Math.round(fan)}RPM` : "N/A";
    }
    if (cpuFanBar) {
        cpuFanBar.style.width = (fan != null) ? `${(fan / 2000) * 100}%` : "0%";
    }

    const cpuLoad = document.getElementById("cpu-load");
    const cpuLoadBar = document.getElementById("cpu-load-bar");
    if (cpuLoad) {
        cpuLoad.innerHTML = load ? `${Math.round(load)}%` : "N/A";
    }
    if (cpuLoadBar) {
        cpuLoadBar.style.backgroundImage = load ? `conic-gradient(#FFCC00 ${(load / 100) * 270}deg, #121214 ${(load / 100) * 270}deg)` : "conic-gradient(#FFCC00 0deg, #121214 0deg)";
    }
}

function updateGPU(temp, clock, fan, load) {
    const gpuTemp = document.getElementById("gpu-temp");
    const gpuTempBar = document.getElementById("gpu-temp-bar");
    if (gpuTemp) {
        gpuTemp.innerHTML = temp ? `${Math.round(temp)}°` : "N/A";
    }
    if (gpuTempBar) {
        gpuTempBar.style.width = temp ? `${temp}%` : "0%";
    }

    const gpuClock = document.getElementById("gpu-clock");
    const gpuClockBar = document.getElementById("gpu-clock-bar");
    if (gpuClock) {
        gpuClock.innerHTML = clock ? `${Math.round(clock)}MHz` : "N/A";
    }
    if (gpuClockBar) {
        gpuClockBar.style.width = clock ? `${(clock / 2044) * 100}%` : "0%";
    }

    const gpuFan = document.getElementById("gpu-fan");
    const gpuFanBar = document.getElementById("gpu-fan-bar");
    if (gpuFan) {
        gpuFan.innerHTML = (fan != null) ? `${Math.round(fan)}RPM` : "N/A";
    }
    if (gpuFanBar) {
        gpuFanBar.style.width = fan ? `${(fan / 2000) * 100}%` : "0%";
    }

    const gpuLoad = document.getElementById("gpu-load");
    const gpuLoadBar = document.getElementById("gpu-load-bar");
    if (gpuLoad) {
        gpuLoad.innerHTML = (load != null) ? `${Math.round(load)}%` : "N/A";
    }
    if (gpuLoadBar) {
        gpuLoadBar.style.backgroundImage = (load != null) ? `conic-gradient(#FFCC00 ${(load / 100) * 270}deg, #121214 ${(load / 100) * 270}deg)` : "conic-gradient(#FFCC00 0deg, #121214 0deg)";
    }
}

function updateMemory(used, total, load) {
    const memoryLoad = document.getElementById("memory-load");
    const memoryLoadBar = document.getElementById("memory-load-bar");
    if (memoryLoad) {
        memoryLoad.innerHTML = (load != null) ? `${Math.round(load)}%` : "N/A";
    }
    if (memoryLoadBar) {
        memoryLoadBar.style.backgroundImage = (load != null) ? `conic-gradient(#FFCC00 ${(load / 100) * 270}deg, #121214 ${(load / 100) * 270}deg)` : "conic-gradient(#FFCC00 0deg, #121214 0deg)";
    }

    const memoryUsed = document.getElementById("memory-used");
    if (memoryUsed) {
        memoryUsed.innerHTML = (used != null && total != null) ? `${Math.round(used * 10) / 10}/${Math.round(total * 10) / 10}GB` : "N/A";
    }
}

function updateNetwork(transferred, received, latency) {
    const networkTransferred = document.getElementById("network-transferred");
    if (networkTransferred) {
        networkTransferred.innerHTML = (transferred != null) ? `${Math.round(transferred)}` : "N/A";
    }

    const networkReceived = document.getElementById("network-received");
    if (networkReceived) {
        networkReceived.innerHTML = (received != null) ? `${Math.round(received)}` : "N/A";
    }

    const networkLatency = document.getElementById("network-latency");
    if (networkLatency) {
        networkLatency.innerHTML = (latency != null) ? `${Math.round(latency)}ms` : "N/A";
    }
}

function updateStorage(fsSize) {
    if (!fsSize) return;

    const firstDriveData = fsSize[0];
    const secondDriveData = fsSize[1];
    const thirdDriveData = fsSize[2];

    if (firstDriveData) {
        const firstDrive = document.getElementById("first-drive");
        const firstDriveName = document.getElementById("first-drive-name");
        const firstDriveBar = document.getElementById("first-drive-bar");
        const firstDriveUsed = document.getElementById("first-drive-used");
        
        firstDrive.style.display = "flex";
        firstDriveName.innerHTML = `${firstDriveData.fs.toUpperCase()}\\`;
        firstDriveBar.style.width = `${firstDriveData.use}%`;
        firstDriveUsed.innerHTML = `${Math.round(firstDriveData.used / 1073741824)}GB / ${Math.round(firstDriveData.size / 1073741824)}GB`;
    }

    if (secondDriveData) {
        const secondDrive = document.getElementById("second-drive");
        const secondDriveName = document.getElementById("second-drive-name");
        const secondDriveBar = document.getElementById("second-drive-bar");
        const secondDriveUsed = document.getElementById("second-drive-used");
        
        secondDrive.style.display = "flex";
        secondDriveName.innerHTML = `${secondDriveData.fs.toUpperCase()}\\`;
        secondDriveBar.style.width = `${secondDriveData.use}%`;
        secondDriveUsed.innerHTML = `${Math.round(secondDriveData.used / 1073741824)}GB / ${Math.round(secondDriveData.size / 1073741824)}GB`;
    }

    if (thirdDriveData) {
        const thirdDrive = document.getElementById("third-drive");
        const thirdDriveName = document.getElementById("third-drive-name");
        const thirdDriveBar = document.getElementById("third-drive-bar");
        const thirdDriveUsed = document.getElementById("third-drive-used");
        
        thirdDrive.style.display = "flex";
        thirdDriveName.innerHTML = `${thirdDriveData.fs.toUpperCase()}\\`;
        thirdDriveBar.style.width = `${thirdDriveData.use}%`;
        thirdDriveUsed.innerHTML = `${Math.round(thirdDriveData.used / 1073741824)}GB / ${Math.round(thirdDriveData.size / 1073741824)}GB`;
    }
}

async function getHardwareInfo() {
    // const info = await window.hardware.getHardwareInfo();
    const cpuTemp = await window.cpu.getTemp();
    const cpuAvgClock = await window.cpu.getAvgClock();
    // const cpuPower = await window.cpu.getPower();
    const cpuLoad = await window.cpu.getLoad();
    const cpuFan = await window.cpu.getFan();

    updateCPU(cpuTemp, cpuAvgClock, cpuFan, cpuLoad);

    const gpuTemp = await window.gpu.getTemp();
    const gpuClock = await window.gpu.getClock();
    // const gpuPower = await window.gpu.getPower();
    const gpuLoad = await window.gpu.getLoad();
    const gpuFan = await window.gpu.getFan();

    updateGPU(gpuTemp, gpuClock, gpuFan, gpuLoad);

    const memoryLoad = await window.ram.getLoad();
    const memoryUsed = await window.ram.getUsed();
    const memoryAvailable = await window.ram.getAvailable();
    // const memoryType = await window.ram.getType();
    // const memoryClock = await window.ram.getClock();

    updateMemory(memoryUsed, memoryUsed + memoryAvailable, memoryLoad);

    const ip = await window.network.getIPAddress();
    const latency = await window.network.getLatency();
    const { received, transferred } = await window.network.getTrafficInKBps();

    updateNetwork(transferred, received, latency);

    const fsSize = await window.storage.getFsSize();
    updateStorage(fsSize);
}

setTimeout(async () => {
    const cpuModel = await window.cpu.getModel();
    const gpuModel = await window.gpu.getModel();

    const cpuModelEl = document.getElementById("cpu-model");
    if (cpuModelEl) {
        cpuModelEl.innerHTML = cpuModel ? cpuModel : "Undefined";
    }

    const gpuModelEl = document.getElementById("gpu-model");
    if (gpuModelEl) {
        gpuModelEl.innerHTML = gpuModel ? gpuModel : "Undefined";
    }

    setInterval(async () => {
        try {
            await getHardwareInfo();
        } catch (error) {
            console.error("Error getting hardware info:", error);
        }
    }, 1000);
}, 1000);
