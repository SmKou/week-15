/*
Write a method that returns all of the prime numbers less than a given number. Use the Sieve of Eratosthenes.

- Create list of numbers through n
- Let prime = 2
- Start from prime, remove all multiples of prime from list
- Increment prime by 1
- End at n

https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
https://www.geeksforgeeks.org/sieve-of-eratosthenes/
*/

// const sieve = (n) => {
//     if (n == 2)
//         return [2];
//     else if (n < 2)
//         return [];

//     const primes = [];
//     const stack = [2];
//     let i = 2;
//     while (i < n) {
//         for (let i = 0; i < stack.length; i++)
//             if (stack)
//     }
//     for (let i = 2; i < n; i++)
        
//     for (let i = 0; i < n; i++)
//         primes[i] = i
//     let j = 2;
//     while (j < n) {
//         for (let l = primes.length - 1; l > -1; --l)
//             if (primes[l] % j == 0)
//                 primes.splice(l, 1);
//         j++;
//     }
//     return primes;
// }

const sieve_recursive = (n, k = 2, stack = []) => {
    if (k > n)
        return stack;
    let prime = true;
    for (let i = 0; i < stack.length; i++)
        if (k % stack[i] == 0)
            prime = false;
    if (prime)
        stack.push(k);
    return sieve_recursive(n, ++k, stack);
}

// Exceeds maximum class stack
// const sieve_2 = (n, k = 2, stack = []) => k > n ? stack : sieve_2(n, k++, ((k, stack) => {
//     if (stack.length != 0)
//         for (let i = 0; i < stack.length; i++)
//             if (k % stack[i] == 0)
//                 return stack;
//     stack.push(k);
//     return stack;
// })(k, stack))

// const sieve_closure = (n) => {
//     const k = 2;
//     const stack = [];
//     const recurse = (n, k, stack) => {
//         if (k > n)
//             return stack;
//         for (let i = 0; i < stack.length; i++)
//             if (k % stack[i] == 0)
//                 return recurse(n, ++k, stack);
//         stack.push(k);
//         return recurse(n, ++k, stack);
//     }
//     return recurse(n);
// }

const findPrimes = (n, primes = [], remainingNums = [...Array(n + 1).keys()].slice(2)) => {
    // Base case, when there are no remaining nums, return array of primes.
    if (remainingNums.length === 0) {
        return primes;
    }

    // Each recursion starts with a prime (first one is two, for example).
    const currentPrime = remainingNums[0];
    primes.push(currentPrime);
    
    // Take the current prime, splice out every num that it divides evenly into.
    let i = 0;
    while (i < remainingNums.length) {
        if (remainingNums[i] % currentPrime === 0) {
            // At the current index, remove that num.
            remainingNums.splice(i, 1);
        } else {
            i++;
        }
    }

    return findPrimes(n, primes, remainingNums);
}


const primeSift = (n) => {
  const list = [];
  for(let i = 2; i <= n; i++) {
    list.push(i);
  }
  let prime = 2;
  const endArray = [];
  const filter = (prime) => {
    if (prime === n) {
      return endArray;
    } else {
      for(let i = prime; i < list.length; i++) {
        if (list[i] % prime !== 0) {
          endArray.push(list[i]);
        }
      }
      
      return filter(prime + 1);
  }
  }
  return filter(prime);
}

const solutions = {
    ps_1: findPrimes,
    ps_4: sieve_recursive,
    // ps_5: sieve
}

const test_run = (fn) => {
    const n = [0, 1, 2, 120, 300]
    for (let i = 0; i < n.length; i++) {
        const result = fn(n[i]);
        console.log(fn.name);
        console.log(`Primes in ${n[i]}: ${result}`);
    }
}

test_run(solutions["ps_1"]);