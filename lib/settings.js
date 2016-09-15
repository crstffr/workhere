
var cwd = require('cwd');
var fs = require('fs-extra');
var jsonfile = require('jsonfile');

var instance = new Settings();
module.exports = instance; 
instance.load();

/**
 * 
 * 
 * 
 */
function Settings() {
    
    var _this = this;
    
    var _data = {};
    var _path = cwd() + '/.c9/';
    var _file = '.container';
    
    Object.defineProperties(this, {
        file: {
            get: function() {
                return _path + _file;
            }
        }, 
        data: {
            get: function() {
                return _data;
            }
        }
    });
    
    /**
     * 
     */
    this.load = function() {
        
        try {
            
            fs.ensureFileSync(_this.file);
            _data = jsonfile.readFileSync(_this.file);
            
        } catch(e) {
            
            _this.write(_data);
            
        }
        
        return _data;
        
    }
    
    /**
     * 
     * @param {Object} data
     */
    this.write = function(data) {
        
        jsonfile.writeFileSync(_this.file, data, {spaces: 2});
        
    }
    
}