/*
Roman numerals:
I   1
V   5
X   10
L   50
C   100
D   500
M   1000

The value of all symbols are added, except no symbol can be more than three in a row. Ones, tens, hundreds and thousands are also separate.

1. Recursion
2. Closures and currying
*/

const numeral = (c) => {
    switch (c) {
        case "I":
            return 1;
        case "V":
            return 5;
        case "X":
            return 10;
        case "L":
            return 50;
        case "C":
            return 100;
        case "D":
            return 500;
        case "M":
            return 1000;
    }
}

const roman_numerals = (str, val) => {
    const n = numeral(str[0]);
    if (str.length < 2)
        return numeral(str[0])

    const n_plus = numeral(str[1]);
    
    
    if (str.length > 1) {
        const n_plus = numeral(str[1]);
        if (n_plus > n)
            val -= n
        else
            val += n
        return val + roman_numerals(str.substring(1), val)
    }
    else
        return numeral(str[0])
}





const solutions = {

}

const test_run = (fn) => {
    const amounts = [25, 10, 5, 1, 499, 141];
    const expected = [[1], [0, 1], [0, 0, 1], [0, 0, 0, 1], [19, 2, 0, 4], [5, 1, 1, 1]];
    for (let i = 0; i < amounts.length; i++) {
        const result = fn(amounts[i]);
        console.log(`Expected: ${expected[i]}`, `Result: ${result}`, `Passed: ${expected[i].join('') === result.join('')}`);
    }
}

Object.keys(solutions).forEach(key => test_run(solutions[key]))