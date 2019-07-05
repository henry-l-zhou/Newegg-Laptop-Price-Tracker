var express = require('express');
var router = express.Router();
var db = require('./queries');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/api/laptops', db.getAllLaptops);
router.get('/api/distinctlaptops', db.getAllLaptopsDistinct);
router.get('/api/laptops/:name', db.getLaptopByName)
router.get('/api/distinctlaptops/:id', db.getLaptopByDistinctId)
router.get('/api/distinctlaptopsname/:name', db.getLaptopByDistinctName)
module.exports = router;
