const edge = require('electron-edge-js');

const getCPUTemp = edge.func({
    assemblyFile: './lib/HardwareInfo.dll', // ต้องคอมไพล์ HardwareInfo.cs เป็น .dll ก่อน
    typeName: 'HardwareInfo',
    methodName: 'GetCPUTemp'
});

function fetchCPUTemp() {
    return new Promise((resolve, reject) => {
        getCPUTemp({}, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

const getCPUAvgClock = edge.func({
    assemblyFile: './lib/HardwareInfo.dll', // ต้องคอมไพล์ HardwareInfo.cs เป็น .dll ก่อน
    typeName: 'HardwareInfo',
    methodName: 'GetCPUAvgClock'
});

function fetchCPUAvgClock() {
    return new Promise((resolve, reject) => {
        getCPUAvgClock({}, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

const getCPUPower = edge.func({
    assemblyFile: './lib/HardwareInfo.dll', // ต้องคอมไพล์ HardwareInfo.cs เป็น .dll ก่อน
    typeName: 'HardwareInfo',
    methodName: 'GetCPUPower'
});

function fetchCPUPower() {
    return new Promise((resolve, reject) => {
        getCPUPower({}, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

const getCPULoad = edge.func({
    assemblyFile: './lib/HardwareInfo.dll', // ต้องคอมไพล์ HardwareInfo.cs เป็น .dll ก่อน
    typeName: 'HardwareInfo',
    methodName: 'GetCPULoad'
});

function fetchCPULoad() {
    return new Promise((resolve, reject) => {
        getCPULoad({}, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

const getCPUFan = edge.func({
    assemblyFile: './lib/HardwareInfo.dll', // ต้องคอมไพล์ HardwareInfo.cs เป็น .dll ก่อน
    typeName: 'HardwareInfo',
    methodName: 'GetCPUFan'
});

function fetchCPUFan() {
    return new Promise((resolve, reject) => {
        getCPUFan({}, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

const getCPUModel = edge.func({
    assemblyFile: './lib/HardwareInfo.dll', // ต้องคอมไพล์ HardwareInfo.cs เป็น .dll ก่อน
    typeName: 'HardwareInfo',
    methodName: 'GetCPUModel'
});

function fetchCPUModel() {
    return new Promise((resolve, reject) => {
        getCPUModel({}, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

module.exports = { fetchCPUTemp, fetchCPUAvgClock, fetchCPUPower, fetchCPULoad, fetchCPUFan, fetchCPUModel };