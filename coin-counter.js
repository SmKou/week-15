/*
Create a coin counter function that takes X amount of money and determines the exact amount of change in quarters, dimes, nickels and pennies.

4.99 => 499 ("coin change")

1. Use recursion
2. Use closures for each type of change
*/

// const obj = { property: value }
// obj["property"] = value *if using name of property, not variable holding name
// obj.property = value


const coinCounterAustin = (money, remainingCoins = [
  {coin: "Quarter", value: 25, amount: 0},
  {coin: "Dime", value: 10, amount: 0},
  {coin: "Nickel", value: 5, amount: 0},
  {coin: "Penny", value: 1, amount: 0} 
], index = 0) => {
  
  // Base case, return filtered coin list
  if (money === 0 || index >= remainingCoins.length) {
    return remainingCoins;
  }

  // assign current coin
  const currentCoin = remainingCoins[index];
  // Math.floor on money / currentCoin.value
  const amount = Math.floor(money / currentCoin.value)
  // assign remainder
  const remainingMoney = money - (amount * currentCoin.value)
  
  // update currentCoin list
  const updatedCoins = remainingCoins.map((coin, i) => {
    if (i === index) {
      return {...coin, amount: amount}
    }
    return coin;
  })
  
  return coinCounterAustin(remainingMoney, updatedCoins, index + 1 )
}


// node coin-counter
const coins = [
  {
    coin: "Quarter",
    amount: 0,
  },
  {
    coin: "Dime",
    amount: 0,
  },
  {
    coin: "Nickle",
    amount: 0,
  },
  {
    coin: "Penny",
    amount: 0,
  }
  ];
const coinCounter = (money) => {
    console.log("Money", money);
    if (isNaN(money)) {
    return coins;
  }
  else if (money >= 25) {
    coins[0].amount = Math.floor(money / 25);
    console.log(coins[0].amount)
    return coinCounter(money - coins[0].amount * 25);
  } else if (money >= 10) {
    coins[1].amount = Math.floor(money / 10);
    console.log(money);
    return coinCounter(money - coins[1].amount * 10);
  } else if (money >= 5) {
    coins[2].amount = Math.floor(money / 5);
    return coinCounter(money - coins[2].amount * 5);
  } else {
    coins[3].amount = money;
    return coins;
  }
}

const coin_counter = (amount) => (val) => [Math.floor(val / amount), val % amount]
const quarters = coin_counter(25)
const dimes = coin_counter(10)
const nickels = coin_counter(5)
const pennies = coin_counter(1)
const coin_currying = (val) => {
    const fn = {
        quarters,
        dimes,
        nickels,
        pennies
    }
    const coins = []
    
    for (let i = 0; i < 4; ++i) {
        const [n, r] = fn[Object.keys(fn)[i]](val);
        coins[i] = n;
        val = r;
    }

    return coins;
}

const coin_counter_closure = () => {
    const quarter = 25;
    const dime = 10;
    const nickel = 5;
    return (val) => [
        Math.floor(val / quarter),
        Math.floor((val % quarter) / dime),
        Math.floor((val % quarter % dime) / nickel),
        val % quarter % dime % nickel
    ];
}
const closure = coin_counter_closure()
const coin_closure = (val) => closure(val)

//// Coin closure GPT
const coinClosureCounterFactory = () => {
  const coinValues = [25, 10, 5, 1];
  
  const countCoins = (remainingMoney, index = 0, counts = []) => {
    // Base case: if no more coinValues, return counts
    if (index >= coinValues.length) {
      return counts;
    }

    // Count the coins for the first coin type
    const coinValue = coinValues[index];
    const count = Math.floor(remainingMoney / coinValue);
    const remaining = remainingMoney % coinValue;
    
    // Recur with the remaining coin types and remaining money
    return countCoins(remaining, index + 1, [...counts, count]);
  };
  
  return countCoins;
};

// Initialize the coin counter
const coinClosureCounter = coinCounterFactory();

// Test the function
const result = coinClosureCounter(120);
console.log(result);  // Output: [3, 2, 0, 4]
//// End of GPT coin closure


const coin_counter_sync = (val) => {
    const coin_amounts = [];
    coin_amounts.push(Math.floor(val / 25));
    val %= 25;
    coin_amounts.push(Math.floor(val / 10));
    val %= 10;
    coin_amounts.push(Math.floor(val / 5));
    val %= 5;
    coin_amounts.push(val);
    return coin_amounts;
}

const coin_recurse = (val, i, arr) => {
    if (i == arr.length)
        return arr;
    const n = arr[i];
    arr[i] = Math.floor(val / n);
    return coin_recurse(val % n, i + 1, arr);
}

const coin_counter_recurse = (val) => {
    return coin_recurse(val, 0, [25, 10, 5, 1]);
}

const solutions = {
    cc_1: coinCounter,
    cc_2: coin_currying,
    cc_3: coinCounterAustin,
    cc_4: coin_counter_sync,
    cc_5: coin_counter_recurse,
    cc_6: coin_closure
}

const test_run = (fn) => {
    const amounts = [25, 10, 5, 1, 499, 141];
    const expected = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1], [19, 2, 0, 4], [5, 1, 1, 1]];
    for (let i = 0; i < amounts.length; i++) {
        console.log(fn.name);
        const result = fn(amounts[i]);
        if (Array.isArray(result) && typeof result[0] == 'object') {
            for (let i = 0; i < result.length; ++i) {
                let value = 0;
                value = result[i].amount;
                result[i] = value;
            }
        }
        const expected_str = expected[i].join("");
        const result_str = result.join("");
        console.log(`Expected: ${expected[i]}\n`, `Result: ${result}\n`, `Passed: ${expected_str == result_str}`);
    }
}

//Object.keys(solutions).forEach(key => test_run(solutions[key]))
test_run(solutions["cc_6"]);
