#!/usr/bin/env node

var opn = require('opn');
var cwd = require('cwd');
var path = require('path');
var colors = require('colors');
var exec = require('child_process').exec;

var volume = cwd() + ':/workspace';
var name = 'workspace-' + cwd().split(path.sep).pop();

var command = 'docker run'
            + ' -itd' 
            + ' -p 80:80'
            + ' -p 8100:8100'
            + ' --name ' + name 
            + ' -v ' + volume
            + ' crstffr/workspace:latest';
            
exec(command, function(error, stdout, stderr){
    
    if (error) {
        console.log(String(stderr).red);
        process.exit();
    }
    
    var id = String(stdout).trim();
    console.log('Container ID: ' + id);
    
    var intval = setInterval(function(){
        console.log('Loading...');
    }, 500);
    
    setTimeout(function() {
        console.log('Done!');
        clearInterval(intval);
        opn('http://localhost');
    }, 2000);
    
});

