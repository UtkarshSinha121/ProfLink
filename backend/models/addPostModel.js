const {model, Schema} = require('../connection');

const myschema = new Schema({
    image: String,
    description: String,
    name: String,
    avtar: String,
    date: String,
    likes:{ type: Number, default: 0 },

});

 module.exports = model('addpost', myschema);