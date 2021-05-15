const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Airtable = require('./airTable');
const bitCoin = require('./bitCoin');
const config = require('./config');
const db = require('./database');


let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req,res) => {
    res.json("Welcome to BTC Roei Badur");
});

app.listen(config.port , () => {
    console.log("The server is running:" + config.port);
});

init(config.API_KEY);


async function init() { 
    db.initMongoDb();
    let base = await Airtable.initAirtable(); 
    setInterval(() => handleBitcoinData(base), 1000 * 60);
}

async function handleBitcoinData(base) {
    Airtable.clearRecords(base);
    const response = await bitCoin.readBitcoinData(base);
    Airtable.writeDataToAirtable(response, base);
}





