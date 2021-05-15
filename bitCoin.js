const axios = require('axios');
const config = require('./config');


function readBitcoinData(base) {
    return axios.get(config.BITCOIN_API).then( response => {
        return response;
    }).catch( error => {
        
    });
}

module.exports = {
    readBitcoinData
};