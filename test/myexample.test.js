import myexample from "../src/myexample";

describe('myexample Class Definition', function(){
  test('Should return 10', function(){
    let myExample = new myexample();
    expect(myExample.multiply(5, 2)).toEqual(10);
  });
});
