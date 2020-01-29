const Model = require('./Model');

module.exports = class Policy extends Model {
	constructor (host) {
		super(host)
		host.power = this
	}

	/**	Get a list of supported policies for power up the host.

		@param	{function} cb		A callback function.
		@para	{object} opts		Options for the command.
	 */
	get (cb, opts) {
		if (this.policies !== undefined) {
			cb(null, this.policies);
		} else this.host.run_now("chassis policy list", opts).then((res) => {
			console.log(JSON.stringify(res));
			let kv = res[0].split(':')[1].trim().split(' ');
			this.policies = kv;
			cb(null, kv);
		}).catch((err) => {
			cb(err);
		})
	}

	static make (host) {
		return host.policy ? host.policy : new Policy(host);
	}
};
