
module.exports = {
    getServerPort,
};

function getServerPort() {
    return parseInt(process.env.PORT, 10) || 8080;
}
