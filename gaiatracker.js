const schedule = require('node-schedule');
const WebHooks = require('node-webhooks')
const ping = require('ping');
var fs = require('fs');

// read file with hosts to monitor
var hosts = fs.readFileSync('hosts.txt').toString().split("\n");

// read json file that stores webhook URLs 
var webHooks = new WebHooks({
    db: './webHooksDB.json', 
})
 
// for tracking changes, we have to store the last ping in a hash
var status = {};

// scheduled for every minute 
var schedulePing = schedule.scheduleJob('1 * * * * *', function() {

// looking for all hosts
hosts.forEach(function(host){
    ping.sys.probe(host, function(isAlive){ // pinging and setting up the message
        var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        
        // changed or not?
        if (isAlive != status[host] && typeof status[host] !== "undefined"){
			// if changed and not clean sheet after init, then push to the webhook
	        console.log("status changed " + msg);
	        webHooks.trigger('MBD', {text: msg})
        }else{
	        console.log("status UNchanged " + msg);
	    }
	    
	    // change status to current one
       	status[host] = isAlive;
                
    });
});

})