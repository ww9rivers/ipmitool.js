// -*- js-indent-level: 8; -*-
const Model = require('./Model');

module.exports = class Power extends Model {
	/**	Constructor of the Power model.

		@param {} host
	 */
	constructor (host) {
		super(host);
		host.power = this;
	}

	/**	Get a list of supported policies for power up the host.

		@param	{function} cb		A callback function.
		@para	{object} opts		Options for the command.
	 */
	get (cb, opts) {
		if (this.power_status !== undefined) {
			cb(null, this.power_status);
		} else this.host.run_now("power status", opts).then((res) => {
			console.log(JSON.stringify(res));
			let kv = res[0].split(' ').pop();
			this.power_status = kv;
			cb(null, { status: kv });
		}).catch((err) => {
			cb(err);
		})
	}

	/**	Turn off the host.
	 */
	turn_off () {
		let err = "Host can only be turned off from inside.";
		console.log(err);
		throw err;
	}

	/**	Turn on the host.

		@return	A promise to run the command to turn on host.
	 */
	turn_on () {
		return this.host.run_now("power on");
	}

	/**
		Model hook for creating/getting a power model.
	 */
	static make (host) {
		return host.power ? host.power : new Power(host)
	}
};
