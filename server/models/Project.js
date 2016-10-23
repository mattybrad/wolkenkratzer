var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  title: String,
  description: String,
  tags: [String],
  path: String
})

var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
