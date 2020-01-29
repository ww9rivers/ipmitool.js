// -*- js-indent-level: 8; -*-
module.exports = class Model extends Object {
	constructor (host) {
		super()
		this.host = host
	}

	/**	Hook to create / find an instance of this object for given host.

		A subclasses of Model must implement this method. Otherwise an
		error will occur at runtime.
	 */
	static make (host) {
		throw new Error('Cannot make '+this.constructor.name)
	}
}
