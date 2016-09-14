#!/usr/bin/env node

var opn = require('opn');
var cwd = require('cwd');
var path = require('path');
var exec = require('child_process').exec;
var name = 'workspace-' + cwd().split(path.sep).pop();

var volume = cwd() + ':/workspace crstffr/workspace:latest';

var command = 'docker run'
            + ' -itd' 
            + ' -p 80:80'
            + ' -p 8100:8100'
            + ' --name ' + name 
            + ' -v ' + volume;
            
exec(command, function(){
    
    console.log(arguments[1]);
    
    setTimeout(function(){
        opn('http://localhost');
    }, 1000);
    
});

