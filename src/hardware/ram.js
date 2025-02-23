const edge = require('electron-edge-js');
const si = require('systeminformation');

const getMemoryLoad = edge.func({
    assemblyFile: './lib/HardwareInfo.dll', // ต้องคอมไพล์ HardwareInfo.cs เป็น .dll ก่อน
    typeName: 'HardwareInfo',
    methodName: 'GetMemoryLoad'
});

function fetchMemoryLoad() {
    return new Promise((resolve, reject) => {
        getMemoryLoad({}, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

const getMemoryUsed = edge.func({
    assemblyFile: './lib/HardwareInfo.dll', // ต้องคอมไพล์ HardwareInfo.cs เป็น .dll ก่อน
    typeName: 'HardwareInfo',
    methodName: 'GetMemoryUsed'
});

function fetchMemoryUsed() {
    return new Promise((resolve, reject) => {
        getMemoryUsed({}, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

const getMemoryAvailable = edge.func({
    assemblyFile: './lib/HardwareInfo.dll', // ต้องคอมไพล์ HardwareInfo.cs เป็น .dll ก่อน
    typeName: 'HardwareInfo',
    methodName: 'GetMemoryAvailable'
});

function fetchMemoryAvailable() {
    return new Promise((resolve, reject) => {
        getMemoryAvailable({}, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

async function fetchMemoryType() {
    const memLayout = await si.memLayout();

    if (memLayout.length == 0) return 'Undefined';

    return memLayout[0].type;
}

async function fetchMemoryClock() {
    const memLayout = await si.memLayout();

    if (memLayout.length == 0) return 'N/A';

    return memLayout[0].clockSpeed;
}


module.exports = { fetchMemoryLoad, fetchMemoryUsed, fetchMemoryAvailable, fetchMemoryType, fetchMemoryClock };