const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  suite('number input', () => {
    test('whole number input', () => {
      assert.equal(convertHandler.getNum('3gal'), 3)
    })

    test('decimal number input', () => {
      assert.equal(convertHandler.getNum('3.1gal'), 3.1)
    })

    test('fractional input', () => {
      assert.equal(convertHandler.getNum('3/2gal'), 1.5)
    })

    test('fractional input with a decimal', () => {
      assert.equal(convertHandler.getNum('4.2/2gal'), 2.1)
    })

    test('error on a double-fraction', () => {
      assert.equal(convertHandler.getNum('3/2/3gal'), false)
    })

    test('default to a numerical input', () => {
      assert.equal(convertHandler.getNum('kg'), 1)
    })
  })
  suite('unit input', () => {
    test('each valid input unit', () => {
      const validInputs = ['gal', 'L', 'mi', 'km', 'lbs', 'kg']
      validInputs.forEach((unit) => {
        assert.notEqual(convertHandler.getUnit(unit), 'invalid unit')
      })
    })

    test('error for an invalid input unit', () => {
      assert.equal(convertHandler.getUnit('error'), false)
    })

    test('correct return unit for each valid input unit', () => {
      const validInputs = ['gal', 'L', 'mi', 'km', 'lbs', 'kg']
      validInputs.forEach((el) => {
        assert.notEqual(convertHandler.getReturnUnit(el), 'invalid unit')
      })
    })

    test('the spelled-out string unit for each valid input unit', () => {
      let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg']
      input.forEach((el) => {
        assert.equal(convertHandler.spellOutUnit(el), convertHandler.getReturnUnit(el))
      })
    })
  })

  suite('convertions', () => {
    test('gal to L', () => {
      assert.equal(convertHandler.getReturnUnit('gal'), 'L')
    })

    test('L to gal', () => {
      assert.equal(convertHandler.getReturnUnit('L'), 'gal')
    })

    test('mi to km', () => {
      assert.equal(convertHandler.getReturnUnit('mi'), 'km')
    })

    test('km to mi', () => {
      assert.equal(convertHandler.getReturnUnit('km'), 'mi')
    })

    test('lbs to kg', () => {
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg')
    })

    test('kg to lbs', () => {
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
    })
  })
});