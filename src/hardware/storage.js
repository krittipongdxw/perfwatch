const si = require('systeminformation');

async function fetchFsSize() {
    const fsSize = await si.fsSize();

    return fsSize;
}

async function fetchDiskLayout() {
    const diskLayout = await si.diskLayout();

    return diskLayout;
}

module.exports = { fetchFsSize, fetchDiskLayout };