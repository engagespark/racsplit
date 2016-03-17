#!/usr/bin/env node


var Ractive = require('ractive');
var rcu = require('rcu');
var sander = require('sander');
var argumentParser = require("node-argument-parser");
var argv = argumentParser.parse("./arguments.json", process);

if (argv.help) {
    process.exit();
}

// first arg goes to index 2 process.arg[2]
// types [css|script|modules|imports|template]
var VALID_TYPES = ['css', 'script', 'modules', 'imports', 'template'];
var TYPE_EXTRACTER = {
    css: function(parsed) {
        return parsed.css;
    },
    script: function(parsed) {
        return parsed.script;
    },
    modules: function(parsed) {
        return parsed.modules;
    },
    imports: function(parsed) {
        return parsed.imports;
    },
    template: function(parsed) {
        return parsed.template;
    },
};

var type = argv.type;
var filePath = argv.path;

if (VALID_TYPES.indexOf(type) < 0) {
   console.error('Invalid type. Valid types are: ' + VALID_TYPES.join(', '));
   process.exit();
}

if (!filePath) {
    console.error('Invalid file path.');
    process.exit();
}

var func = sander.readFile(filePath).then(String).then(function(fileContent) {
    rcu.init(Ractive);

    return rcu.parse(fileContent);
}).then(function(parsed) {
    var result = TYPE_EXTRACTER[type](parsed);
    console.log(result);
}, function(error) {
    console.error(error);
    process.exit();
});
