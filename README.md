# gaiatracker
This keeps track of the reachability status of any IP and pushes changes to a webhook URL. 

## Installation 
npm/node.js is required, as well as some additional node packages. Just use the package.json for initialization and installing dependencies.

## Configuration
The list of IPs must be provided in a file called hosts.txt, where each line holds an IP address. 

Further, you must generate a file, webHooksDB.json, where you provide the urls to push in a format like this: 

```
{	
"Name1":["https://xxx.zz/sjduj29d2"],
"Name2":["https://xxx.zz/dfer32r22"]
}
```
Be sure to add your trigger name to the script.

## Starting the service

use the startup_gaiatracker.sh for starting, so it will restart and continue monitoring, even after unexpected crashes.
