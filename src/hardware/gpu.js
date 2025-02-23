const edge = require('electron-edge-js');

const getGPUTemp = edge.func({
    assemblyFile: './lib/HardwareInfo.dll', // ต้องคอมไพล์ HardwareInfo.cs เป็น .dll ก่อน
    typeName: 'HardwareInfo',
    methodName: 'GetGPUTemp'
});

function fetchGPUTemp() {
    return new Promise((resolve, reject) => {
        getGPUTemp({}, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

const getGPUClock = edge.func({
    assemblyFile: './lib/HardwareInfo.dll', // ต้องคอมไพล์ HardwareInfo.cs เป็น .dll ก่อน
    typeName: 'HardwareInfo',
    methodName: 'GetGPUClock'
});

function fetchGPUClock() {
    return new Promise((resolve, reject) => {
        getGPUClock({}, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

const getGPUPower = edge.func({
    assemblyFile: './lib/HardwareInfo.dll', // ต้องคอมไพล์ HardwareInfo.cs เป็น .dll ก่อน
    typeName: 'HardwareInfo',
    methodName: 'GetGPUPower'
});

function fetchGPUPower() {
    return new Promise((resolve, reject) => {
        getGPUPower({}, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

const getGPULoad = edge.func({
    assemblyFile: './lib/HardwareInfo.dll', // ต้องคอมไพล์ HardwareInfo.cs เป็น .dll ก่อน
    typeName: 'HardwareInfo',
    methodName: 'GetGPULoad'
});

function fetchGPULoad() {
    return new Promise((resolve, reject) => {
        getGPULoad({}, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

const getGPUFan = edge.func({
    assemblyFile: './lib/HardwareInfo.dll', // ต้องคอมไพล์ HardwareInfo.cs เป็น .dll ก่อน
    typeName: 'HardwareInfo',
    methodName: 'GetGPUFan'
});

function fetchGPUFan() {
    return new Promise((resolve, reject) => {
        getGPUFan({}, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

const getGPUModel = edge.func({
    assemblyFile: './lib/HardwareInfo.dll', // ต้องคอมไพล์ HardwareInfo.cs เป็น .dll ก่อน
    typeName: 'HardwareInfo',
    methodName: 'GetGPUModel'
});

function fetchGPUModel() {
    return new Promise((resolve, reject) => {
        getGPUModel({}, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

module.exports = { fetchGPUTemp, fetchGPUClock, fetchGPUPower, fetchGPULoad, fetchGPUFan, fetchGPUModel };