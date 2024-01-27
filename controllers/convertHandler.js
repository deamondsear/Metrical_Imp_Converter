function ConvertHandler() {

  this.getUnit = function(input) {
    let unitPartArray = input.match(/[a-zA-Z]+$/);
    let unitPart;
    if (unitPartArray) {
      unitPart = unitPartArray.join('');
    }

    let units = ['gal', 'mi', 'km', 'lbs', 'kg'];
    if (!unitPart) {
      return (unitPart = false);
    }
    if (units.includes(unitPart.toLowerCase())) {
      unitPart = unitPart.toLowerCase();
      return unitPart;
    }
    if (unitPart === 'L' || unitPart === 'l') {
      unitPart = 'L';
      return unitPart;
    }
    return (unitPart = false);
  };

  this.getNum = function(input) {
    let result;
    let numberPart
    let unitPartArray = input.match(/[a-zA-Z]+$/);
    if (unitPartArray) {
      numberPart = input.slice(0, input.lastIndexOf(unitPartArray[0]))
    } else {
      numberPart = input.slice(0)
    }
    if (!numberPart) {
      numberPart = 1
    }

    if (
      /^(?:\d+\.?\d*|\d*\.\d+)(?:\/(?:\d+\.?\d*|\d*\.\d+))?$/.test(
        numberPart
      )
    ) {
      result = numberPart;
    } else if (numberPart) {
      result = false; // if input is not a number, responce 'invalid number' in /api
    }
    if (result) {
      result = eval(result);
    }// eval() resolve an expression in string format like '3/2' to 1.5
    return result;
  };

  this.getReturnUnit = function(input) {
    let result = false;
    let unitPartArray = input.match(/[a-zA-Z]+$/);
    let unitPart;
    if (unitPartArray) {
      unitPart = unitPartArray.join('').toLowerCase();
    }
    if (unitPart) {
      switch (unitPart) {
        case 'gal':
          result = 'L';
          break;
        case 'l':
          result = 'gal';
          break;
        case 'km':
          result = 'mi';
          break;
        case 'mi':
          result = 'km';
          break;
        case 'lbs':
          result = 'kg';
          break;
        case 'kg':
          result = 'lbs';
          break;
      }
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    return result = this.getReturnUnit(unit);
  };

  this.convert = function(input) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    let num = this.getNum(input);
    let unit = this.getUnit(input).toLowerCase();
    if (num && unit) {
      switch (unit) {
        case 'gal':
          result = num * galToL;
          break;
        case 'l':
          result = num / galToL;
          break;
        case 'km':
          result = num / miToKm;
          break;
        case 'mi':
          result = num * miToKm;
          break;
        case 'lbs':
          result = num * lbsToKg;
          break;
        case 'kg':
          result = num / lbsToKg;
          break;
      }
      return parseFloat(result.toFixed(5))
    }
  };

  this.getString = function(input) {
    let initNum = this.getNum(input);
    let initUnit = this.getUnit(input).toLowerCase();
    let convertedNum = this.convert(input);
    let convertedUnit = this.getReturnUnit(input);
    switch (convertedUnit) {
      case 'gal':
        initUnit = 'liters';
        convertedUnit = 'gallons';
        break;
      case 'l':
        initUnit = 'gallons';
        convertedUnit = 'liters';
        break;
      case 'km':
        initUnit = 'miles';
        convertedUnit = 'kilometers';
        break;
      case 'mi':
        initUnit = 'kilometers';
        convertedUnit = 'miles';
        break;
      case 'lbs':
        initUnit = 'kilograms';
        convertedUnit = 'pounds';
        break;
      case 'kg':
        initUnit = 'pounds';
        convertedUnit = 'kilograms';
        break;
    }
    return `${initNum} ${initUnit} converts to ${convertedNum} ${convertedUnit}`;
  };
}

module.exports = ConvertHandler;
