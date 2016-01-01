var express = require('express');
var router = express.Router();

/* route to handle all angular requests */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'MEAN Workout' });

});

module.exports = router;
