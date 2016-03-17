#!/usr/bin/env node

var Ractive = require('ractive');
var rcu = require('rcu');
var sander = require('sander');
var Args = require('arg-parser');

var argv = new Args(
    'Racsplit',
    require('./package.json').version,
    'Splitter for ractive.js component files.',
    'https://github.com/engagespark/racsplit'
);

argv.add({ name: 'type', desc: 'output file type, default [script], types: [css|script|modules|imports|temp]', switches: [ '-t', '--type'], value: 'type' });
argv.add({ name: 'path', desc: 'path to file', required: true });

if (!argv.parse()) {
    process.exit();
}

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

var type = argv.params.type || 'script';
var filePath = argv.params.path;

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
