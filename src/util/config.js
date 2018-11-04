
module.exports = {
    getServerPort,
    getUserUrl,
    getPolicyUrl,
    getJwtSecret,
};

function getServerPort() {
    return parseInt(process.env.PORT, 10) || 3000;
}

function getUserUrl() {
    return `${process.env.DATA_SERVICE_URL}${process.env.DATA_SERVICE_USERS}` || 'http://www.mocky.io/v2/5808862710000087232b75ac';
}

function getPolicyUrl() {
    return `${process.env.DATA_SERVICE_URL}${process.env.DATA_SERVICE_POLICIES}` || 'http://www.mocky.io/v2/580891a4100000e8242b75c5';
}
function getJwtSecret() {
    return process.env.JWT_SECRET || 'changeForProd';
}
