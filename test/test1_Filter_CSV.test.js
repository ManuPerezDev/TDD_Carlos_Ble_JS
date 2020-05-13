import CsvFilter from "../src/test1_Filter_CSV";

var headerLine = "Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";

describe('CSV Filter Class Definition', function() {
  let filter;
  beforeEach(() => {
    filter = new CsvFilter();
  });

  test('allow_for_correct_lines_only', function() {
    let invoiceLine = "1,02/05/2019,1000,810,19,,ACER Laptop,B76430134,";
    let elementList = [headerLine, invoiceLine];

    let result = filter.apply(elementList);

    expect(result).toEqual(elementList);
  });

  test('exclude_lines_with_both_tax_fields_popoulated_as_they_are_exclusive', function() {
    let invoiceLine = "1,02/05/2019,1000,810,19,8,ACER Laptop,B76430134,";
    let elementList = [headerLine, invoiceLine];

    let result = filter.apply(elementList);

    expect(result).toEqual([headerLine]);
  });

  test('exclude_lines_with_both_tax_fields_empty_as_one_is_required', function() {
    let invoiceLine = "1,02/05/2019,1000,810,,,ACER Laptop,B76430134,";
    let elementList = [headerLine, invoiceLine];

    let result = filter.apply(elementList);

    expect(result).toEqual([headerLine]);
  });

  test('exclude_lines_with_non_decimal_tax_fields', function() {
    let invoiceLine = "1,02/05/2019,1000,810,XYZ,,ACER Laptop,B76430134,";
    let elementList = [headerLine, invoiceLine];

    let result = filter.apply(elementList);

    expect(result).toEqual([headerLine]);
  });

  test('exclude_lines_with_non_decimal_tax_fields_populated_even_if_non_decimal', function() {
    let invoiceLine = "1,02/05/2019,1000,810,XYZ,12,ACER Laptop,B76430134,";
    let elementList = [headerLine, invoiceLine];

    let result = filter.apply(elementList);

    expect(result).toEqual([headerLine]);
  });

  test('exclude_lines_with_both_identificacion_fields_populated_as_they_are_exclusive', function() {
    let invoiceLine = "1,02/05/2019,1000,810,19,,ACER Laptop,B76430134,J76430134";
    let elementList = [headerLine, invoiceLine];

    let result = filter.apply(elementList);

    expect(result).toEqual([headerLine]);
  });

  test('exclude_lines_with_identification_bad_format', function() {
    let invoiceLine = "1,02/05/2019,1000,810,19,,ACER Laptop,BV6430134,";
    let elementList = [headerLine, invoiceLine];

    let result = filter.apply(elementList);

    expect(result).toEqual([headerLine]);
  });

  test('exclude_lines_with_net_value_does_not_match_with_gross_multiply_tax', function() {
    let invoiceLine = "1,02/05/2019,1000,710,19,,ACER Laptop,B86430134,";
    let elementList = [headerLine, invoiceLine];

    let result = filter.apply(elementList);

    expect(result).toEqual([headerLine]);
  });

  test('exclude_files_with_one_only_line_and_return_error', function() {
    let invoiceLine = "1,02/05/2019,1000,810,19,,ACER Laptop,B86430134,";
    let elementList = [invoiceLine];

    let result = filter.apply(elementList);

    expect(result).toEqual("This file only contents one line");
  });

  test('exclude_lines_with_id_invoice_identification_repeat', function() {
    let invoiceLine = "1,02/05/2019,1000,810,19,,ACER Laptop,B86430134,";
    let invoiceLine2 = "1,02/05/2019,1000,810,19,,ACER Laptop,B86430134,";
    let elementList = [headerLine, invoiceLine, invoiceLine2];

    let result = filter.apply(elementList);

    expect(result).toEqual([headerLine]);
  });

  test('an_empty_list_or_null_produce_an_empty_list', function() {
    let elementList = [];

    let result = filter.apply(elementList);

    expect(result).toEqual([]);
  });
});
