// -*- js-indent-level: 2; -*-
const IPMI = require('../lib/node-ipmi')
const Sensors = require('../lib/models/sensors')
const conf = require('./config-test')

var server1 = new IPMI(conf.host, conf.user, conf.password);
var d = new Date();
var n = d.getTime();

describe('Test 1', () => {
  it('should work', function(done) {
    this.timeout(3000)
    let sensors = Sensors.make(server1)
    sensors.get((err, sensors) => {
      if (err) {
	console.error(err)
	return done()
      }
      var d1 = new Date();
      var n1 = d1.getTime();
      console.log("done. took: " + (n1-n)/1000 + "s");
      d = new Date();
      n = d.getTime();
      console.log("Fans");
      console.log(sensors)
      console.log("Temp");
      d1 = new Date();
      n1 = d1.getTime();
      console.log(sensors.getTemperatures());
      console.log("done. took: " + (n1-n)/1000 + "s");
      done();
    });
  });
});
