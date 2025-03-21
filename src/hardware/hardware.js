const edge = require('electron-edge-js');

const getHardwareData = edge.func({
    assemblyFile: './lib/HardwareInfo.dll', // ต้องคอมไพล์ HardwareInfo.cs เป็น .dll ก่อน
    typeName: 'HardwareInfo',
    methodName: 'GetHardwareData'
});

function fetchHardwareInfo() {
    return new Promise((resolve, reject) => {
        getHardwareData({}, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

const getMainboardModel = edge.func({
    assemblyFile: './lib/HardwareInfo.dll', // ต้องคอมไพล์ HardwareInfo.cs เป็น .dll ก่อน
    typeName: 'HardwareInfo',
    methodName: 'GetMainboardModel'
});

function fetchMainboardModel() {
    return new Promise((resolve, reject) => {
        getMainboardModel({}, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

module.exports = { fetchHardwareInfo, fetchMainboardModel };