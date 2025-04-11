var express = require('express');
var router = express.Router();
var Timestamp = require('./timestamp');

var timestamp = new Timestamp();

// rotas
router.get('/', (req, res) => timestamp.getTimestamp(req, res));
router.get('/diff/:date1/:date2?', (req, res) => timestamp.calcDiff(req, res));
router.get('/:date', (req, res) => timestamp.inputDate(req, res));
router.get('/api/geTimeZone', (req , res) => timestamp.getTimeZone(req, res));

module.exports = router;