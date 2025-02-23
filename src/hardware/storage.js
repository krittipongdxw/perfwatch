const si = require('systeminformation');

async function fetchFsSize() {
    const fsSize = await si.fsSize();

    return fsSize;
}

module.exports = { fetchFsSize };