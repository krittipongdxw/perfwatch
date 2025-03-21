let userSettings = {
    general: {
        startOnWindows: true,
        startMinimized: false,
    },

    performance: {
        cpuThreshold: 75,
        gpuThreshold: 95,
        ramUsage: 85,
    }
}

let cpuNotified = false;
let gpuNotified = false;
let ramNotified = false;

function loadSettings() {
    const userSettingsString = localStorage.getItem('userSettings');

    if (userSettingsString) {
        userSettings = JSON.parse(userSettingsString);
        applySettingsToInterface();
    }
}

function saveSettings() {
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
}

function applySettingsToInterface() {
    document.getElementById('run-on-start').checked = userSettings.general.startOnWindows;
    document.getElementById('start-minimized').checked = userSettings.general.startMinimized;

    document.getElementById('cpu-alert-temp').value = userSettings.performance.cpuThreshold;
    document.getElementById('gpu-alert-temp').value = userSettings.performance.gpuThreshold;
    document.getElementById('ram-alert-usage').value = userSettings.performance.ramUsage;
}

setTimeout(async () => {
    try {
        // const info = await window.hardware.getHardwareInfo();
        // const mainboard = await window.hardware.getMainboardModel();
        // // const cpuTemp = await window.hardware.getCPUTemp();
        // // const avgClock = await window.hardware.getCPUAvgClock();
        // const memoryList = await window.ram.getList();
        // console.log(memoryList);
        // applySettingsToInterface();
        // console.log(userSettings);
    } catch (error) {
        console.error('Error getting hardware info:', error);
    }
}, 500);

function setPcMonitoringButtonColor(color) {
    document.querySelector(".pc-monitoring-button svg").style.fill = color;
    document.querySelector(".pc-monitoring-button p").style.color = color;
}

function setSystemSpecsButtonColor(color) {
    document.querySelector(".system-specs-button p").style.color = color;
    document.querySelectorAll(".system-specs-button svg path").forEach(element => {
        element.setAttribute("stroke", color);
    });
}

function setSettingsButtonColor(color) {
    document.querySelector(".settings-button p").style.color = color;
    document.querySelectorAll(".settings-button svg path").forEach(element => {
        element.setAttribute("fill", color);
    });
}

function initInputEventHandler() {
    const runOnStartInput = document.getElementById('run-on-start');
    const startMinimizedInput = document.getElementById('start-minimized');

    const cpuAlertTempInput = document.getElementById('cpu-alert-temp');
    const gpuAlertTempInput = document.getElementById('gpu-alert-temp');
    const ramAlertUsageInput = document.getElementById('ram-alert-usage');

    runOnStartInput.addEventListener('change', () => {
        userSettings.general.startOnWindows = runOnStartInput.checked;
        saveSettings();
    })

    startMinimizedInput.addEventListener('change', () => {
        userSettings.general.startMinimized = startMinimizedInput.checked;
        saveSettings();
    })

    cpuAlertTempInput.addEventListener('input', () => {
        let value = parseInt(cpuAlertTempInput.value, 10);
        if (value < cpuAlertTempInput.min) cpuAlertTempInput.value = cpuAlertTempInput.min;
        if (value > cpuAlertTempInput.max) cpuAlertTempInput.value = cpuAlertTempInput.max;
    })
    cpuAlertTempInput.addEventListener('change', () => {
        userSettings.performance.cpuThreshold = parseInt(cpuAlertTempInput.value, 10);

        saveSettings();
    })

    gpuAlertTempInput.addEventListener('input', () => {
        let value = parseInt(gpuAlertTempInput.value, 10);
        if (value < gpuAlertTempInput.min) gpuAlertTempInput.value = gpuAlertTempInput.min;
        if (value > gpuAlertTempInput.max) gpuAlertTempInput.value = gpuAlertTempInput.max;
    })
    gpuAlertTempInput.addEventListener('change', () => {
        userSettings.performance.gpuThreshold = parseInt(gpuAlertTempInput.value, 10);

        saveSettings();
    })

    ramAlertUsageInput.addEventListener('input', () => {
        let value = parseInt(ramAlertUsageInput.value, 10);
        if (value < ramAlertUsageInput.min) ramAlertUsageInput.value = ramAlertUsageInput.min;
        if (value > ramAlertUsageInput.max) ramAlertUsageInput.value = ramAlertUsageInput.max;
    })
    ramAlertUsageInput.addEventListener('change', () => {
        console.log(ramAlertUsageInput.value);
        
        userSettings.performance.ramUsage = parseInt(ramAlertUsageInput.value, 10);

        saveSettings();
    })
}

function initButtonsEventHandler() {
    const pcMonitoringPage = document.querySelector(".pc-monitoring-page");
    const systemSpecsPage = document.querySelector(".system-specs-page");
    const settingsPage = document.querySelector(".settings-page");

    document.querySelector(".pc-monitoring-button").addEventListener("click", () => {
        systemSpecsPage.style.display = "none";
        settingsPage.style.display = "none";
        pcMonitoringPage.style.display = "flex";

        setPcMonitoringButtonColor("#FFCC00");
        setSystemSpecsButtonColor("white");
        setSettingsButtonColor("white");
    });

    document.querySelector(".system-specs-button").addEventListener("click", () => {
        pcMonitoringPage.style.display = "none";
        settingsPage.style.display = "none";
        systemSpecsPage.style.display = "block";

        setPcMonitoringButtonColor("white");
        setSystemSpecsButtonColor("#FFCC00");
        setSettingsButtonColor("white");
    });

    document.querySelector(".settings-button").addEventListener("click", () => {
        pcMonitoringPage.style.display = "none";
        systemSpecsPage.style.display = "none";
        settingsPage.style.display = "block";

        setPcMonitoringButtonColor("white");
        setSystemSpecsButtonColor("white");
        setSettingsButtonColor("#FFCC00");
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadSettings();

    initInputEventHandler();
    initButtonsEventHandler();
});

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
        cpuFan.innerHTML = fan != null ? `${Math.round(fan)}RPM` : "N/A";
    }
    if (cpuFanBar) {
        cpuFanBar.style.width = fan != null ? `${(fan / 2000) * 100}%` : "0%";
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
        gpuFan.innerHTML = fan != null ? `${Math.round(fan)}RPM` : "N/A";
    }
    if (gpuFanBar) {
        gpuFanBar.style.width = fan ? `${(fan / 2000) * 100}%` : "0%";
    }

    const gpuLoad = document.getElementById("gpu-load");
    const gpuLoadBar = document.getElementById("gpu-load-bar");
    if (gpuLoad) {
        gpuLoad.innerHTML = load != null ? `${Math.round(load)}%` : "N/A";
    }
    if (gpuLoadBar) {
        gpuLoadBar.style.backgroundImage = load != null ? `conic-gradient(#FFCC00 ${(load / 100) * 270}deg, #121214 ${(load / 100) * 270}deg)` : "conic-gradient(#FFCC00 0deg, #121214 0deg)";
    }
}

function updateMemory(used, total, load) {
    const memoryLoad = document.getElementById("memory-load");
    const memoryLoadBar = document.getElementById("memory-load-bar");
    if (memoryLoad) {
        memoryLoad.innerHTML = load != null ? `${Math.round(load)}%` : "N/A";
    }
    if (memoryLoadBar) {
        memoryLoadBar.style.backgroundImage = load != null ? `conic-gradient(#FFCC00 ${(load / 100) * 270}deg, #121214 ${(load / 100) * 270}deg)` : "conic-gradient(#FFCC00 0deg, #121214 0deg)";
    }

    const memoryUsed = document.getElementById("memory-used");
    if (memoryUsed) {
        memoryUsed.innerHTML = used != null && total != null ? `${Math.round(used * 10) / 10}/${Math.round(total * 10) / 10}GB` : "N/A";
    }
}

function updateNetwork(transferred, received, latency) {
    const networkTransferred = document.getElementById("network-transferred");
    if (networkTransferred) {
        networkTransferred.innerHTML = transferred != null ? `${Math.round(transferred)}` : "N/A";
    }

    const networkReceived = document.getElementById("network-received");
    if (networkReceived) {
        networkReceived.innerHTML = received != null ? `${Math.round(received)}` : "N/A";
    }

    const networkLatency = document.getElementById("network-latency");
    if (networkLatency) {
        networkLatency.innerHTML = latency != null ? `${Math.round(latency)}ms` : "N/A";
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

    if (!cpuNotified && cpuTemp >= userSettings.performance.cpuThreshold) {
        window.electron.sendNotification("CPU Overheating Alert!", `Your CPU temperature has exceeded ${userSettings.performance.cpuThreshold}°C as set. Please check it.`);

        cpuNotified = true;
        setTimeout(() => {
            cpuNotified = false
        }, 300000);
    }

    if (!gpuNotified && gpuTemp >= userSettings.performance.gpuThreshold) {
        window.electron.sendNotification("GPU Overheating Alert!", `Your GPU temperature has exceeded ${userSettings.performance.gpuThreshold}°C as set. Please check it.`);

        gpuNotified = true;
        setTimeout(() => {
            gpuNotified = false
        }, 300000);
    }
    
    if (!ramNotified && memoryLoad >= userSettings.performance.ramUsage) {
        window.electron.sendNotification("RAM Usage Alert!", `Your RAM usage has exceeded the set limit of ${userSettings.performance.ramUsage}%. Please check your system for any issues.`);

        ramNotified = true;
        setTimeout(() => {
            ramNotified = false
        }, 300000);
    }
}

setTimeout(async () => {
    const cpuModel = await window.cpu.getModel();
    const gpuModel = await window.gpu.getModel();
    const mainboardModel = await window.hardware.getMainboardModel();
    const memoryList = await window.ram.getList();
    const diskLayout = await window.storage.getDiskLayout();
    const networkInterfaces = await window.network.getInterfaces();

    document.querySelectorAll("#cpu-model").forEach(element => {
        element.innerHTML = cpuModel ? cpuModel : "Undefined";
    });

    document.querySelectorAll("#gpu-model").forEach(element => {
        element.innerHTML = gpuModel ? gpuModel : "Undefined";
    });

    document.querySelector("#mainboard-model").innerHTML = mainboardModel ? mainboardModel : "Undefined";

    memoryList.forEach(memory => {
        const p = document.createElement("p");
        p.className = "pl-[1.303vw] text-[#FFCC00] text-[1.737vw] font-light";
        p.textContent = `${memory.formFactor} ${memory.partNum} ${memory.type} ${memory.clockSpeed} ${Math.round(memory.size / 1073741824)}GB`;
    
        document.querySelector("#memory-list").appendChild(p);
    });

    diskLayout.forEach(disk => {
        const p = document.createElement("p");
        p.className = "pl-[1.303vw] text-[#FFCC00] text-[1.737vw] font-light";
        p.textContent = `${disk.interfaceType} ${disk.name} ${Math.round(disk.size / 1073741824)}GB`;
    
        document.querySelector("#storage-list").appendChild(p);
    });

    networkInterfaces.forEach(nwInterface => {
        const p = document.createElement("p");
        p.className = "pl-[1.303vw] text-[#FFCC00] text-[1.737vw] font-light";
        p.textContent = `${nwInterface.iface}`;
    
        document.querySelector("#network-list").appendChild(p);
    });

    setInterval(async () => {
        try {
            await getHardwareInfo();
        } catch (error) {
            console.error("Error getting hardware info:", error);
        }
    }, 1000);
}, 1000);
