var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Summer\'s Scenes: Your Source for Sizzling Silver Screen Selections' });
});

module.exports = router;
