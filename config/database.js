// config/database.js

var dbase;

if (process.env.NODE_ENV === "production") {
    dbase = 'mongodb://heroku_app23668074:t9vh8msnv9diiio2o666k5j8ak@ds035897.mongolab.com:35897/heroku_app23668074';
} else {
    dbase = 'mongodb://localhost/stacking-strength';
}

module.exports = {

	'url' : dbase // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot

};