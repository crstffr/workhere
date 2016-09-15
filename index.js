#!/usr/bin/env node

var colors = require('colors');
var settings = require('./lib/settings');
var Container = require('./lib/container');
var container = new Container(settings.data);

if (!container.running) {
    
    startContainer();
    
} else {
    
    // The settings we have saved say this thing was running,
    // but we need to see what the current state is now.

    container.getInfo().then(function() {
        
        // Now we have up-to-date information on the container
        // so check if it's still running and open the existing
        
        if (container.running) {
            
            console.log('-------------------------------------'.cyan);
            console.log(('Opening Container: ' + container.name + '...').cyan);
            console.log('-------------------------------------'.cyan);
            
            container.open();
            
        } else {
            
            settings.write({});
            startContainer();
            
        }
      
    }).catch(function() {
        
        settings.write({});
        startContainer();
        
    });
}


function startContainer() {
    
    container.start().catch(function (err) {
        
        console.log(err.red);
        process.exit();
        
    }).then(function (containerInfo) {
        
        settings.write(containerInfo);
                    
        setTimeout(function() {
            container.open();
        }, 2000);
        
    });
    
}