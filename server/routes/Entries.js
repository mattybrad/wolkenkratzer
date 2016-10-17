var Router = require('express').Router;
var router = new Router();
var Entry = require('../models/Entry');

// /api/v1/entries/
router.get('/', function(req, res){
  res.send("testing");
})

module.exports = router;
