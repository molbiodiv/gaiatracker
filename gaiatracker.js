const schedule = require('node-schedule');
const WebHooks = require('node-webhooks')
const ping = require('ping');

var hosts = ['132.187.198.12','132.187.198.13','132.187.198.14','132.187.198.18'];

var webHooks = new WebHooks({
    db: './webHooksDB.json', // json file that store webhook URLs 
})

var status = {};

var schedulePing = schedule.scheduleJob('1 * * * * *', function() {

console.log(status)


hosts.forEach(function(host){
    ping.sys.probe(host, function(isAlive){
        var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        
        if (isAlive != status[host] && typeof status[host] !== "undefined"){
	        console.log("status changed " + msg);
	        webHooks.trigger('MBD', {text: msg})
        }else{
	        console.log("status UNchanged " + msg);
	    }
       	status[host] = isAlive;
                
    });
});

})