// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var liftSchema = mongoose.Schema({
    lifter : String,
    exercise : String,
    weight : Number,
    date : Date,
    success : Boolean
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Lift', liftSchema);