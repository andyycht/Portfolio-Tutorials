/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

// TODO: Adjust this script so it can work with the sieve.html file.
function ah() {
  "use strict";
  var n = document.getElementById("num").value;
  var val = sieve(n);
  return val;
}

var sieve = function (n) {
  "use strict";

  var array = [],
    primes = [],
    i,
    j;

  // TODO: Implement the sieve of eratosthenes algorithm to find all the prime numbers under the given number.
  for (i = 2; i <= n; i += 1) {
    array[i] = true;
    
  }

  for (i = 2; i <= Math.sqrt(n); i += 1) {
    if (array[i] == true) {
      for (j = i * i; j <= n; j += i) {
        array[j] = false;
      }
    }
  }
  
 for (i = 2; i <= n; i += 1) {
    if(array[i]==true){
      primes[i] = i;
    }
  }
  return primes;
};

window.onload = function() {
    document.getElementById("btn").addEventListener("click", function() {
        var resultado = ah();
        document.getElementById("primes").textContent = resultado;
    });
};
