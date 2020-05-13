export default class CsvFilter {
  apply(lines) {

    if (lines.length == 1) {
      return "This file only contents one line";
    }

    if (lines.length == 0 || !lines) {
      return [];
    }

    if (lines.length > 2) {
      return this.checkForIDDuplicates(lines);
    }

    var result = [];
    result.push(lines[0]);
    var invoice = lines[1];
    var fields = invoice.split(",");

    var taxFieldsAreMutuallyExclusive = this.validateTaxes(fields);
    var identificationFieldsAreMutuallyExclusive = this.validateIdentification(fields);
    var grossNetAndTaxMatches = this.validateGrossAndNetTaxesMatches(fields);

    if (taxFieldsAreMutuallyExclusive &&
      identificationFieldsAreMutuallyExclusive &&
      grossNetAndTaxMatches) {
      result.push(lines[1]);
    }

    return result;
  }

  validateGrossAndNetTaxesMatches(fields) {
    var grossFieldIndex = 2;
    var netFieldIndex = 3;
    var grossField = fields[grossFieldIndex];
    var netField = fields[netFieldIndex];
    var taxUsed = 0;

    var decimalRegex = new RegExp("\\d+(\\.\\d+)?");
    var ivaFieldIndex = 4;
    var igicFieldIndex = 5;
    var ivaField = fields[ivaFieldIndex];
    var igicField = fields[igicFieldIndex];
    if (decimalRegex.test(ivaField)) {
      taxUsed = ivaField;
    } else if (decimalRegex.test(igicField)) {
      taxUsed = igicField;
    }

    return (grossField - (grossField * (taxUsed / 100))) == netField;
  }

  validateIdentification(fields) {
    var cifFieldIndex = 7;
    var nifFieldIndex = 8;
    var cifField = fields[cifFieldIndex];
    var nifField = fields[nifFieldIndex];
    var identificationRegex = new RegExp("^[TRWAGMYFPDXBNJZSQVHLCKE][0-9]{8}$");

    return ((identificationRegex.test(cifField) || identificationRegex.test(nifField)) &&
      (!cifField || !nifField));
  }

  validateTaxes(fields) {
    var ivaFieldIndex = 4;
    var igicFieldIndex = 5;
    var ivaField = fields[ivaFieldIndex];
    var igicField = fields[igicFieldIndex];
    var decimalRegex = new RegExp("\\d+(\\.\\d+)?");
    return (decimalRegex.test(ivaField) || decimalRegex.test(igicField)) &&
      (!ivaField || !igicField);
  }


  checkForIDDuplicates(lines) {
    for (var i = 1; i < lines.length; i++) {
      for (var j = 0; j < lines.length; j++) {
        if (i != j && lines[i].charAt(0) === lines[j].charAt(0)) {

          lines.splice(j, 1);
          lines.splice(i, 1);
          return lines;
        }
      }
    }
  }
}
