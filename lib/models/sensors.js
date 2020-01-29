const Model = require('./Model');
const Sensor = require('./sensor');


String.prototype.indexOfRegex = function(regex){
	var match = this.match(regex);
	return match ? this.indexOf(match[0]) : -1;
};

/**	An array of sensors.
 */
class Sensors extends Model {
	/**	Private constructor to force use of create.
	 */
	constructor (host) {
		super(host)
		host._sensors = this
	}

	/**	Run the command synchronously to get sensors.
		@params cb	Callback function to process sensors info.
		@params options	Options for running the command.
	 */
	get (cb, options) {
		if (this.sensors !== undefined) {
			cb(null, this.sensors)
		} else Promise.resolve(this.host.run("sensor").then((res) => {
			let sensrs = res.map( line => {
				return Sensor.parse(line)
			})
			console.log(JSON.stringify(sensrs))
			this.sensors = sensrs
			cb(null, sensrs)
		}).catch(err => cb(err)	))
	}

	getFans () {
		return this.filter( x => x.data.name.indexOfRegex(/.*fan.*/i)>-1 )
	}

	getNames () {
		return this.map( x => x.data.name )
	}

	getTemperatures () {
		return this.filter( x => x.data.name.indexOfRegex(/.*temp.*/i)>-1 || x.data.unit.indexOfRegex(/.*degree.*/)>-1 )
	}

	last () {
		return this[this.length - 1];
	}

	/**	Creator for sensors on a host.
	 */
	static make (host) {
		return host._sensors ? host._sensors : new Sensors(host)
	}

	max () {
		return Math.max.apply(null, this);
	}

	min () {
		return Math.min.apply(null, this);
	}
};

module.exports = Sensors;
