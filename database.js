const mongoose = require('mongoose');
let Rate = require('./model/Rate');
const airtable = require('./airTable');




const  initMongoDb = () => {
    mongoose.connect('mongodb+srv://roei:roei123@btc.euovs.mongodb.net/BTC?retryWrites=true&w=majority');
    
    mongoose.connection.on('connected', () =>{
        console.log("connected to Database MongoDB Atlas");
    });

    mongoose.connection.on('error', (err) =>{
        if(err) {
            console.log("error in DataBase connection:" +err);
        }   
    });
};
const save = (date,rate) => {
    let record = new Rate( {
        date:date,
        rate: rate
    });
    record.save( (err) => {
        console.log("Failed add record");
    });
};



module.exports = {
    initMongoDb: initMongoDb,
    save,
};
