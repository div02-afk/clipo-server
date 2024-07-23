const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const clipboardSchema = new Schema({
    id : String,
    text : String,
});



module.exports = mongoose.model('Clipboard', clipboardSchema);

