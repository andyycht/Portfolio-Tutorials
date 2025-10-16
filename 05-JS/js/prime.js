/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

var getPrimeFactors = function () {
  "use strict";
  var n = parseInt(document.getElementById("num").value);

  function isPrime(n) {
    var i;

    for (i = 2; i <= Math.sqrt(n); i++) {
      if (n % i == 0) {
        return false;
      }
    }
    return true;
  }
 
  var i,
    sequence = [],
    factores = [];

    while (n % 2 == 0) {
      factores.push(2);
      n = n / 2;
    }

    for (i = 3; i <= Math.sqrt(n); i += 2) {
      while (n % i == 0) {
        factores.push(i);
        n = n / i;
      }
    }

    if (n > 2) {
      factores.push(n);
    }

    for (i = 0; i < factores.length; i++) {
       var val = isPrime(factores[i]);
       if (val == true) {
         sequence.push(factores[i]);
       }
  }
      document.getElementById("pf").textContent = sequence.join(" × ");

};