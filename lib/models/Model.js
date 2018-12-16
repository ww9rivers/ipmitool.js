module.exports = class Model extends Object {
	constructor (host) {
		super()
		this.host = host
	}

	/**	Function to create / find an instance of this object for given host.
	 */
	static make (host) {
		throw new Error('Cannot make '+this.constructor.name)
	}
}
