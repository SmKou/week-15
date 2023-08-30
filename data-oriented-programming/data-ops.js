const librarydata = require('./librarydata.json')

/* Write a function named getBookProperty that receives library data and ISBN and a field name and returns the value of the field for the book with the given ISBN. */
function getBookProperty(libraryData, isbn, fieldName) { 
    const infoPath = ["catalog", "booksByIsbn", isbn, fieldName];
    return _get(libraryData, infoPath);
}

/* Write a function named bookInfo that receives library data and a string and returns a JSON string that contains book information about the books whose title contains the given string, in a case insensitive way. Book information is made of: title, isbn, author full names. */
function authorNames(catalogData, book) { }

function bookInfo(catalogData, book) { }

function searchBooksByTitle(libraryData, query) {
    const catalogdata = _get(libraryData, ["catalog"]);
    const books = _get(catalogdata, "booksByIsbn");
}

/* Write a function named blockMember that receives library data and an email address and returns a new version of library data without altering the original version, where the user with the given email is blocked. */
function blockMember(libraryData, email) { }

/*  Write a function named renameKeys that receives a data entity and a key mappings and returns a new data entity, without altering the original entity, where the fields are renamed according to the key mappings. */
function renameKeys() { }

/* Write a function named mergeAndSerialize that receives two pieces of book information, one from the database and one from an external service like Open Library Books API and returns a JSON string with information from both sources.
https://openlibrary.org/dev/docs/api/books */
function mergeAndSerialize(a, b) { }

/* Write a function named diff that receives two versions of library data and returns an object that contains the diff between the two versions, in the format of your choice. */
function diff(a, b) {}

const _get = (data, path) => {
    for (const path_point of path)
        if (data.hasOwnProperty(path_point))
            data = data[path_point];
    return data;
}

const _map = (collection, fn) => { }
const _filter = (collection, fn) => { }

const ans = getBookProperty(librarydata, "978-1779501127", "title");
console.log(ans);

// I am creating lodash...

// Conclusion: When every piece of data in the system is represented with generic data structures, it is quite easy to compare recursively different data versions. - https://blog.klipse.tech/dop/2021/04/01/dop-challenges.html