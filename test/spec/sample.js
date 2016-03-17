var expect = require('chai').expect;
var exec = require('child_process').exec;
var sander = require('sander');

describe('Racsplit plitter', function() {
    var file = 'test/files/input/sample.html';

    it('should split script part of the component', function(done) {
        var command = "./index.js " + file;
        var resultFilePath = 'test/files/output/sample-script.txt';

        exec(command, function(error, stdout, stderr) {
            if (error !== null) {
                done(error);
            }
            var outputFile = '';
            var read = sander.readFile(resultFilePath).then(String).then(function (output) {
                outputFile = output;
            }).then(function() {
                expect(stdout).to.equal(outputFile);
            }).then(function() {
                done();
            }, function(error) {
                done(error);
            });
            
        });
    });

    it('should split css part of the component', function(done) {
        var command = "./index.js -t css " + file;
        var resultFilePath = 'test/files/output/sample-css.txt';

        exec(command, function(error, stdout, stderr) {
            if (error !== null) {
                done(error);
            }
            var outputFile = '';
            var read = sander.readFile(resultFilePath).then(String).then(function (output) {
                outputFile = output;
            }).then(function() {
                expect(stdout).to.equal(outputFile);
            }).then(function() {
                done();
            }, function(error) {
                done(error);
            });
            
        });
    });

});
