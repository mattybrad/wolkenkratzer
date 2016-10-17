var Router = require('express').Router;
var router = new Router();
var Project = require('../models/Project');

router.get('/', function(req, res){
  Project.find({}).exec(function(err, result) {
    if(err) return res.status(400).send(err);
    res.send(result);
  });
})

router.get('/:projectName', function(req, res){
  Project.findOne({path:req.params.projectName}).exec(function(err, result) {
    if(err) return res.status(400).send(err);
    res.send(result);
  });
})

router.post('/', function(req, res){
  Project.create({
    title: "Testing"
  }, function(err, result) {
    if(err) return res.status(400).send(err);
    res.send(result);
  });
})

module.exports = router;
