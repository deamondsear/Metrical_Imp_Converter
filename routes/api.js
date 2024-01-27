'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let input = req.query.input;

    if (!input || !convertHandler.getUnit(input) && !convertHandler.getNum(input)) {
      res.send('invalid number and unit')
    } else if (!convertHandler.getNum(input)) {
      res.send('invalid number')
    } else if (!convertHandler.getUnit(input)) {
      res.send('invalid unit')
    } else {
      res.send({ initNum: convertHandler.getNum(input), initUnit: convertHandler.getUnit(input), returnNum: convertHandler.convert(input), returnUnit: convertHandler.getReturnUnit(input), string: convertHandler.getString(input) });
    }
  });
}
