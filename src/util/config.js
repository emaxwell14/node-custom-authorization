
module.exports = {
    getServerPort,
    getUserUrl,
    getPolicyUrl,
};

function getServerPort() {
    return parseInt(process.env.PORT, 10) || 3000;
}

function getUserUrl() {
    return `${process.env.DATA_SERVICE_URL}${process.env.DATA_SERVICE_USERS}` || '';
}

function getPolicyUrl() {
    return `${process.env.DATA_SERVICE_URL}${process.env.DATA_SERVICE_POLICIES}` || '';
}
