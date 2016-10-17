var Router = require('express').Router;
var Projects = require('./Projects');
var router = new Router();

router.use('/api/v1/projects', Projects);

module.exports = router;
