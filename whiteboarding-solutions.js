/* 1: Turn strings into URLs
Input: "Jasmine Ann Jones"
Output: "Jasmine%20Ann%20Jones"

Edge cases:
start and/or end is space
- check index
- or trim first
multiple spaces at a time
- use second pointer
*/

// Non-recursive with string construction
const func_1 = str => {
    url = "";
    let s = 0;
    for (let i = 0; i < str.length; ++i)
        if (str[i] == " ") {
            url += str.substring(s, i);
            url += "%20";
            s = i + 1;
        }
    if (s < str.length)
        url += str.substring(s);
    return url;
}

// Non-recursive with in-place insertion
const func_2 = str => {
    str = str.split("");
    for (let i = 0; i < str.length; ++i)
        if (str[i] == " ")
            str[i] = "%20";
    return str.join("");
}

// Recursive
const func_3 = (str) => {
    if (str.length == 0)
        return "";

    if (str[0] == " ")
        return "%20" + func_3(str.substring(1));
    return str.substring(0, 1) + func_3(str.substring(1));
}

const pr1_test = "Jasmine Ann Jones";
console.log("Pr1: non-recursive:", func_1(pr1_test));
console.log("Pr1: non-recursive", func_2(pr1_test));
console.log("Pr1: recursive", func_3(pr1_test));

/* 2: Array Deduping
Input: [7, 9, "hi", 12, "hi", 7, 53]
Output: [7, 9, "hi", 12, 53]

Edge cases:
String number and number both present in array
- check if filter uses strict equality
- do not use object
*/

const func_4 = arr => {
    const c = {};
    for (let i = 0; i < arr.length; ++i)
        if (!c[arr[i]])
            c[arr[i]] = 1;
    return Object.keys(c);
}

const func_5 = (arr, c = {}) => {
    if (arr.length == 0)
        return Object.keys(c);

    if (!c[arr[arr.length - 1]])
        c[arr[arr.length - 1]] = 1;
    arr.pop();
    return func_5(arr, c);
}

const func_6 = arr => arr.filter((e, ind) => arr.indexOf(e) === ind)

// const func = arr => [...new Set(arr)]

let pr2_test = [7, 9, "hi", 12, "hi", 7, 53];
console.log("Pr2: non-recursive", func_4(pr2_test));
console.log("Pr2: recursive", func_5(pr2_test));
pr2_test = [7, 9, "hi", 12, "hi", 7, 53]
console.log("Pr2: non-recursive", func_6(pr2_test));

/* 3: Compressing Strings
input: "aaabccdddda"
output: "3ab2c4da" 

Edge cases:
no duplicates
*/

const func_7 = str => {
    const char = [];
    const count = [];
    for (let i = 0; i < str.length; ++i)
        if (char.length == 0 || str[i] != char[char.length - 1]) {
            char.push(str[i]);
            count.push(1);
        }
        else
            count[count.length - 1]++;
    str = "";
    for (let i = 0; i < char.length; ++i)
        str += (count[i] > 1 ? count[i] : "") + char[i];
    return str;
}

const func_8 = str => {
    let count = 1;
    str = str.split("");
    for (let i = str.length - 1; i > 0; --i)
        if (str[i] != str[i - 1]) {
            str[i] = (count > 1 ? count : "") + str[i];
            count = 1;
        }
        else {
            str.splice(i, 1);
            ++count;
        }   
    if (count > 1)
        str[0] = count + str[0];
    return str.join("");
}

const func_9 = (str, arr = []) => {
    if (!str)
        return;

    if (arr.length == 0) {
        arr.push(1 + str[0]);
        func_9(str.substring(1), arr);
        return arr.join("");
    }

    const char = arr[arr.length - 1]
    if (char[char.length - 1] != str[0]) {
        arr.push(str[0]);
    }
    else {
        const n = parseInt(char);
        arr[arr.length - 1] = (isNaN(n) ? 2 : n + 1) + char[char.length - 1];
    }
    func_9(str.substring(1), arr);
}

const func_10 = (str, i = 1, j = 0) => {
    if (i == str.length)
        return str;
}

const p3_test = "aaabccdddda";
console.log("P3: non-recursive", func_7(p3_test));
console.log("P3: non-recursive", func_8(p3_test));
console.log("P3: recursive", func_9(p3_test));

/* 4: Checking for Uniqueness
Input: "hello"
Output: false
Input: "copyright"
Output: true

Edge cases:
non-alphanumeric characters
empty string
*/

const func_11 = str => str.length == str.split("").filter((e, ind) => str.indexOf(e) === ind).length

const func_12 = str => {
    const set = new Set(str.split(""));
    return set.size === str.length
}

const func_13 = str => {
    const obj = {};
    for (let i = 0; i < str.length; ++i)
        if (obj[str[i]])
            return false;
        else
            obj[str[i]] == 1;
    return true;
}

const func_14 = str => str.length == [new Set(str.split(""))].length