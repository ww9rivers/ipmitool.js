# ipmitool.js

A node.js wrapper of the command line IPMI utility, ipmitool, inspired by / stolen from
[node-ipmi](https://github.com/egeback/node-ipmi).

Further documentation will be provided as the progress is made.

Below is the original README from the node-ipmi project.

## node-ipmi.js
[![NPM version](http://img.shields.io/npm/v/node-ipmi.svg)](https://www.npmjs.org/package/node-ipmi)

node-ipmi is a commandline wrapper from ipmitool. It is designed to be used via [Node.js](http://nodejs.org) and installable via:<br />
`npm install node-ipmi`.

PLEASE NOTE: node-ipmi currently only supports sensors. 

### Quick Example

```javascript
const IPMI = require('node-ipmi');
const sensors = require('node-ipmi/lib/models/sensors');

var	options = {
	privilege: 'USER'
};

var server = new IPMI("hostname/ip", "username", "password", options);
sensors.make(server).get((err, result) => {
  console.log(sensors.getFans());
  console.log(sensors.getTemperatures());
});
```
