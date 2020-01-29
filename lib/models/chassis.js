/** IPMI Tool Chassis command:

    $ ipmitool -H 192.168.8.11 -U root -P root chassis status
    System Power         : on
    Power Overload       : false
    Power Interlock      : inactive
    Main Power Fault     : false
    Power Control Fault  : false
    Power Restore Policy : always-on
    Last Power Event     : ac-failed
    Chassis Intrusion    : inactive
    Front-Panel Lockout  : inactive
    Drive Fault          : false
    Cooling/Fan Fault    : false
*/
const Model = require('./Model')

class Chassis extends Model {
	constructor (host) {
		super(host)
		host._chassis = this
	}

	/**	Function to create / find an instance of this object for given host.
	 */
	static make (host) {
		return host._chassis ? host._chassis : new Chassis(host)
	}

	/**	Find the status of power.

		@param	cb	Callback function for the power status.
		@param	options	Extra options for the ipmitool command line.
	*/
	get (cb, options) {
		let st = { host: this.host.hostname }
		Promise.resolve(this.get_status(cb, options)).then(res => {
			res.forEach(line => {
				let kv = line.split(':')
				if (kv[0] && kv[1]) {
					st[kv[0].trim().replace(/[^\w]+/g, '_')] = kv[1].trim()
				}
			})
			console.log(JSON.stringify(st))
			this.status = st
			cb(null, st)
		}).catch(err => {
			st.error = true
			cb(err, st)
		})
	}

	/**	Get chassis status.

		@param	cb	Callback function for the power status.
		@param	options	Extra options for the ipmitool command line.
		@return	The status; Or a promise to get the status.
	 */
	get_status(opts) {
		if (this.status !== undefined) {
			return this.status
		}
		let st = { host: this.host.hostname }
		return this.host.run("chassis status", opts)
	}

	/**	Turn power off / on.

		@param	cb	Callback function.
		@param	on	New power status to set, { on, off }
		@param	options	Extra options, unused.
	 */
	power (cb, on, options) {
		let newst = (on == "on" || on == true) ? "on" : "off"
		this.get((err, status) => {
			if (status.System_Power != newst) {
				Promise.resolve(this.host.run("chassis power "+newst).then((res) => {
					console.log("Power turned "+newst)
					status.System_Power = newst
					cb(null, status)
				}).catch((err) => {
					cb(err, status)
				}))
			} else {
				console.log("No action: Power is already "+newst+".")
				cb(null, status)
			}
		})
	}

	/**	Power restore policy setting.

		@param	cb	Callback function.
		@param	setto	{ "list", "on", "off", "previous" }
	*/
	policy (cb, setto) {
		const tok = 'Power_Restore_Policy'
		if (["list", "always-off", "always-on", "previous"].indexOf(setto) < 0) {
			cb('Invalid power restore policy: '+setto)
		} else this.get((err, status) => {
			if (!err && status[tok] != setto) {
				Promise.resolve(this.host.run("chassis policy "+setto).then((res) => {
					console.log("Power turned "+setto)
					status[tok] = setto
					cb(null, status)
				}).catch((err) => {
					cb(err, status)
				}))
			} else {
				console.log("No action: Power restore policy is "+(status ? status[tok] : 'Unknown')+".")
				cb(err, status)
			}
		})
	}
}

module.exports = Chassis;
