

require("dotenv").config();

const globals = {
    "Connectionstrings" : {
        // name must match ket in .env file
        "MongoDb" : process.env.CONNECTION_STRING,
    }
}

// exporting the above global func
module.exports = globals;