function parseSentence(words) {
    var sentence = "";
    for (var i = 1; i < words.length; i++) {
        sentence = sentence + words[i] + " ";
    }
}

function showHelp() {
    console.log(usage);
    console.log('\nOptions:\r');
    console.log('\t--version\t      ' + 'Show version number.' + '\t\t' + '[boolean]\r');
    console.log('   -l, --languages\t' + '      ' + 'List all languages.' + '\t\t' + '[boolean]\r');
    console.log('\t--help\t\t       ' + 'Show help.' + '\t\t\t' + '[boolean]\n');
}

module.exports = {
    showHelp: showHelp,
    parseSentence: parseSentence
};
