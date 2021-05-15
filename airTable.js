const axios = require('axios');
const Airtable = require('airtable');
const config = require('./config');
const db = require('./database');
let Rate = require('./model/Rate');

function getAirTableBaseId() {
    return axios.get(config.AIR_TABLE_META_DATA,{
        headers: {
            'Authorization':`Bearer ${config.API_KEY}`
        }
    }).then(response => {
        return response.data.bases[0].id;
    }).catch( (err) => {
        console.log(err);
    });
}

function writeDataToAirtable(response, base) {
    base('BTC Table').create([{
        fields:{
            Time: Date.now(),
            Rates: response.data.USD.last
        }
    }],(err, records) => {
        if(err) {
            db.save(Date.now(),response.data.USD.last);    
        }
    }); 
}

function writeDataToAirtableFromDatabse(rate, time, base) {
    base('BTC Table').create([{
        fields:{
            Time: new Date(time).getTime(),
            Rates: rate
        }
    }],(err, records) => {
        if(err) {
            console.log(err);
        }
    }); 
}

async function initAirTable() {
    Airtable.configure({
        endpointUrl: config.AIR_TABLE_API,
        apiKey: config.API_KEY
    });
    const baseId = await getAirTableBaseId();
    let base = Airtable.base(baseId);
    return base;
}

const clearRecords = (base) => {
    Rate.find( (err,records) => {
        if(err) {
            console.log("can't get the records");
        }
        else if( records.length > 0) {
            console.log('airtable ' + JSON.stringify(Airtable));
            records.forEach((record) => {
                console.log(JSON.stringify(record));
                writeDataToAirtableFromDatabse(record.rate, record.date, base);
                record.remove();
            });
        }
    });
};

module.exports = {
    initAirtable: initAirTable,
    writeDataToAirtable:writeDataToAirtable,
    getAitTableBaseId:getAirTableBaseId,
    clearRecords:clearRecords
};