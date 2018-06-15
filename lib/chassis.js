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
class Chassis extends Object {
	constructor (host) {
		super()
		this.host = host
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
		if (this.status !== undefined) {
			cb(null, this.status)
		} else Promise.resolve(this.host.run("chassis status").then((res) => {
			let st = {}
			res.forEach(line => {
				let kv = line.split(':')
				if (kv[0] && kv[1]) {
					st[kv[0].trim().replace(/[^\w]+/g, '_')] = kv[1].trim()
				}
			})
			console.log(JSON.stringify(st))
			this.status = st
			cb(null, st)
		}).catch((err) => {
			cb(err)
		}))
	}

	/**	Turn power off / on.

		@param	on	New power status to set, { on, off }
		@param	cb	Callback function.
	 */
	power (on, cb, options) {
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
}

module.exports = Chassis;
