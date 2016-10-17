var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EntrySchema = new Schema({
  test: String
})

var Entry = mongoose.model('Entry', EntrySchema);

module.exports = Entry;
