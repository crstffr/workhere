
var fs = require('fs');
var opn = require('opn');
var cwd = require('cwd');
var path = require('path');
var _get = require('lodash/get');
var _trim = require('lodash/trim');
var exec = require('child_process').exec;

module.exports = Container;

/**
 * 
 * 
 * 
 */
function Container(data) {
    
    var _this = this;
    var _data = data || {};
    var _id = _data.Id || '';
    
    Object.defineProperties(this, {
        data: {
            get: function () {
                return _data;
            }
        },
        name: {
            get: function () {
                return _trim(_get(_data, 'Name'), '/');
            }
        },
        port: {
            get: function() {
                return _get(_data, 'NetworkSettings.Ports.80/tcp[0].HostPort');
            }
        },
        running: {
            get: function() {
                return _get(_data, 'State.Running');
            }
        }
    });
    
    this.start = function() {
        
        var volume = cwd() + ':/workspace';
        var name = 'ws-' + cwd().split(path.sep).pop();

        console.log('-------------------------------------'.cyan);
        console.log(('Starting Container: ' + name + '...').cyan);
        console.log('-------------------------------------'.cyan);
        
        var command = 'docker run'
                    + ' -itdP' 
                    + ' --name ' + name 
                    + ' -v ' + volume
                    + ' crstffr/workspace:latest';
                    
        return new Promise(function(resolve, reject) {
            
            exec(command, function(error, stdout, stderr) {
    
                if (error) {
                    return reject(String(stderr));
                }
                
                _id = String(stdout).trim();
                
                _this.getInfo().catch(function(error) {
                    
                    reject(error);
                    
                }).then(function(info) {
                    
                    setTimeout(function() {
                        resolve(info);
                    }, 2000);
                    
                });
            
            });
            
        });         
        
    }
    
    this.getInfo = function () {
        
        if (!_id) { 
            console.log('Cannot inspect container without an ID'.red);
            process.exit();
        }
        
        var command = 'docker inspect ' + _id;
        
        return new Promise(function(resolve, reject) {
            
            exec(command, function(error, stdout, stderr) {
    
                if (error) {
                    return reject(String(stderr));
                }
                
                try {
                    
                    resolve(_data = JSON.parse(stdout)[0] || {});
                    
                } catch(e) {
                    
                    reject('Unable to parse result of container inspection');
                }
                
            });
        });   
    }
    
    this.open = function() {
        
        console.log('PORT ' + _this.port);
        opn('http://localhost:' + _this.port);
        
    }
    
    this.stop = function() {
        
    }
    
}