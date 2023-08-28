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

const numeral_switch = (c) => {
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
const roman_numerals_recurse = (str) => {
    const n = numeral_switch(str[0]);
    if (str.length < 2)
        return n;

    const n_plus = numeral_switch(str[1]);
    if (n_plus > n)
        return roman_numerals_recurse(str.substring(1)) - n;
    else
        return roman_numerals_recurse(str.substring(1)) + n;
}

const num_obj = { "I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000 };
const roman_numerals_recurse_2 = (str, i) => {
    if (i == str.length - 1)
        return num_obj[str[i]]
    const n_i = num_obj[str[i]];
    const n_plus = num_obj[str[i + 1]];
    return roman_numerals_recurse(str, i + 1) + (n_plus > n_i ? n_i * -1 : n_i);
}

const get_numeral = (character) => (value) => (str) => {
    let count = 0;
    for (let i = 0; i < str.length; i++)
        if (str[i] === character)
            count++;
    return value * count - (count > 3 ? value : 0);
}
const get_I = get_numeral("I")(1);
const get_V = get_numeral("V")(5);
const get_X = get_numeral("X")(10);
const get_L = get_numeral("L")(50);
const get_C = get_numeral("C")(100);
const get_D = get_numeral("D")(500);
const get_M = get_numeral("M")(1000);
const roman_numerals_currying = (str) => {
    return get_M(str) + get_D(str) + get_C(str) + get_L(str) + get_X(str) + get_V(str) + get_I(str);
}


const solutions = {
    rn_1: roman_numerals_recurse,
    rn_2: roman_numerals_recurse_2,
    rn_3: roman_numerals_currying
}

const test_run = (fn) => {
    const strings = ["III", "MMMCMXCIX", "XLVIII", "MDCLXVI", "MMMCCCXXXIII"];
    const expected = [3, 3999, 48, 1666, 3333];
    for (let i = 0; i < strings.length; i++) {
        console.log(fn.name);
        const result = fn(strings[i]);
        console.log(`Expected: ${expected[i]}`, `Result: ${result}`, `Passed: ${expected[i] === result}`);
    }
}

Object.keys(solutions).forEach(key => test_run(solutions[key]))