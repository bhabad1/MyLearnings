const mongoose = require('mongoose');
let dbCon;
const hostName = 'mongodb+srv://shital:6pptQ6wd4Ul9UW50@mydb.ebomurt.mongodb.net/?retryWrites=true&w=majority';
//pass = "6pptQ6wd4Ul9UW50"

try {
    dbCon = mongoose.createConnection(hostName, {
        useNewUrlParser: true,
        connectTimeoutMS: 4000,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 60000,
        useUnifiedTopology: true,
    });
} catch (error) {
    console.log("Unable to connect to dbcon db: ", error)
}

module.exports = {
    dbCon,
    jwtSecret:"sample_demo_code"
}