const {model, Schema} = require('../connection');

const myschema = new Schema({
    name: String,
    email: String,
    password: String,
    avtar: String
   
});

 module.exports = model('users', myschema);