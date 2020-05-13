//This is a unfuctional code to keep a record proposed exercises from "Diseño Ágil con TDD Edición 2020 Carlos Blé Jurado"
//The page numeration is from PDF spanish version
//Test running with Jest

//Test file frame
import myClass from "path";

describe('Class Definition', function () {
  //Write tests here
});

//Functions file frame
export default class myClass {
  //Write functions here
}


//Exercise 1 CsvFilter
  //Page 9 Test 1 CsvFilter
  test('allow_for_correct_lines_only', function(){
    let headerLine = "Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
    let invoiceLine = "1,02/05/2019,1000,810,19,,ACER Laptop,B76430134,";
    let elementList = [headerLine, invoiceLine];

    let myCsvFilter = new CsvFilter();

    let result = myCsvFilter.filter(elementList);

    expect(result).toEqual(elementList);
  });

  //Page 10 Red code 1
  filter(lines){

  }

  //Page 10 Green code 1
    filter(lines){
      return lines;
    }

  //Page 10 Test 2 CsvFilter
  test('exclude_lines_with_both_tax_fields_popoulated_as_they_are_exclusive', function(){
    let headerLine = "Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
    let invoiceLine = "1,02/05/2019,1000,810,19,8,ACER Laptop,B76430134,";
    let elementList = [headerLine, invoiceLine];

    let myCsvFilter = new CsvFilter();

    let result = myCsvFilter.filter(elementList);

    expect(result).toEqual([headerLine]);
  });

  //Page 10 Red code (Same code Green code 1)

  //Page 11 Green code 2
  filter(lines){
    var result = [];
    result.push(lines[0]);
    var invoice = lines[1];
    var fields = invoice.split(",");
    if(!fields[4] || !fields[5]){
      result.push(lines[1]);
    }
    return result;
  }

  //Page 11 Test 3 CsvFilter
  test('exclude_lines_with_both_tax_fields_empty_as_one_is_required', function(){
    let headerLine = "Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
    let invoiceLine = "1,02/05/2019,1000,810,,,ACER Laptop,B76430134,";
    let elementList = [headerLine, invoiceLine];

    let myCsvFilter = new CsvFilter();

    let result = myCsvFilter.filter(elementList);

    expect(result).toEqual([headerLine]);
  });

  //Page 10 Red code (Same code Green code 2)

  //Page 11 Green code 3
  filter(lines){
    var result = [];
    result.push(lines[0]);
    var invoice = lines[1];
    var fields = invoice.split(",");
    if((!fields[4] || !fields[5]) && (!(!fields[4] && !fields[5]))){
      result.push(lines[1]);
    }
    return result;
  }

  //Page 12 Refactor 1
  filter(lines){
    var result = [];
    result.push(lines[0]);
    var invoice = lines[1];
    var fields = invoice.split(",");
    var ivaFieldIndex = 4;
    var igicFieldIndex = 5;

    var taxFieldsAreMutuallyExclusive =
        (!fields[ivaFieldIndex] || !fields[igicFieldIndex])
        && (!(!fields[ivaFieldIndex] && !fields[igicFieldIndex]));

    if(taxFieldsAreMutuallyExclusive){
      result.push(lines[1]);
    }
    return result;
  }

  //Page 13 Test 4 CsvFilter
  test('exclude_lines_with_non_decimal_tax_fields', function(){
    let invoiceLine = "1,02/05/2019,1000,810,XYZ,,ACER Laptop,B76430134,";
    let elementList = [headerLine, invoiceLine];

    let myCsvFilter = new CsvFilter();

    let result = myCsvFilter.filter(elementList);

    expect(result).toEqual([headerLine]);
  });

  //Page 13 Red code (Same code Green code 3)

  //Page 13 Green code 4
  filter(lines){
    var result = [];
    result.push(lines[0]);
    var invoice = lines[1];
    var fields = invoice.split(",");
    var ivaFieldIndex = 4;
    var igicFieldIndex = 5;
    var ivaField = fields[ivaFieldIndex];
    var igicField = fields[igicFieldIndex];
    var decimalRegex = new RegExp("\\d+(\\.\\d+)?");

    var taxFieldsAreMutuallyExclusive =
        (decimalRegex.test(ivaField) || decimalRegex.test(igicField))
        &&  (!(decimalRegex.test(ivaField) && decimalRegex.test(igicField)));

    if(taxFieldsAreMutuallyExclusive){
      result.push(lines[1]);
    }
    return result;
  }

  //Page 14 Test 5 CsvFilter
  test('exclude_lines_with_non_decimal_tax_fields_populated_even_if_non_decimal', function(){
    let invoiceLine = "1,02/05/2019,1000,810,XYZ,12,ACER Laptop,B76430134,";
    let elementList = [headerLine, invoiceLine];

    let myCsvFilter = new CsvFilter();

    let result = myCsvFilter.filter(elementList);

    expect(result).toEqual([headerLine]);
  });

  //Page 13 Red code (Same code Green code 4)

  //Page 14 Green code 5
  filter(lines){
    var result = [];
    result.push(lines[0]);
    var invoice = lines[1];
    var fields = invoice.split(",");
    var ivaFieldIndex = 4;
    var igicFieldIndex = 5;
    var ivaField = fields[ivaFieldIndex];
    var igicField = fields[igicFieldIndex];
    var decimalRegex = new RegExp("\\d+(\\.\\d+)?");

    var taxFieldsAreMutuallyExclusive =
        (decimalRegex.test(ivaField) || decimalRegex.test(igicField))
        &&  (!ivaField || !igicField);

    if(taxFieldsAreMutuallyExclusive){
      result.push(lines[1]);
    }
    return result;
  }

  //Page 37,38,39 refactor missing. Didnt find a satisfactory solution in JS
