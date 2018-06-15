const exec = require('child_process').exec;
const Basecommand = require('./basecommand.js');


function extend(target) {
	let sources = [].slice.call(arguments, 1);
	sources.forEach( (source) => {
		for (let prop in source) {
			target[prop] = source[prop];
		}
	});
	return target;
}

var defaultOptions = {privilege: 'USER'};

function Connect(hostname, username, password, options) {
	hostname = typeof hostname !== 'undefined' || hostname === null ? hostname : {};
	password = typeof password !== 'undefined' || password === null ? password : {};
	username = typeof username !== 'undefined' || username === null ? username : {};
	options = typeof options !== 'undefined' || options === null ? options : {};

	//Combine defaultOptions with options
	options = extend({}, defaultOptions, options);

	this.cmdOptions = {};
	this.hostname = hostname;
	this.username = username;
	this.password = password;
	this.options = options;

	if(typeof options.privilege !== 'undefined') {
		this.cmdOptions.L = options.privilege;
	}

	if(hostname!==null)
		this.cmdOptions.H = hostname;
	if(username!==null)
		this.cmdOptions.U = username;
	if(password!==null)
		this.cmdOptions.P = password;

	//TODO: Test connection

	//Default set to null
	this.sensors = null;
}

/**	Run a function with given options.

	@param	cmd	Command to run.
	@param	options	Options for the command.
	@return	A promise to run the given command with options; The resove function will get an array of lines
		from stdout of the command output; The reject function gets an error object.
 */
Connect.prototype.run = function (cmd, options) {
	return new Promise((resolve, reject) => {
		let opts = this.cmdOptions
		let cmdx = new Basecommand("ipmitool", extend(opts, options||{})).makeCommand(cmd)
		exec(cmdx, (err, stdout, stderr) => {
			if (err) {
				console.log("child processes failed with error code: " + err.code + ' ('+cmdx+')');
				reject(err);
			} else if (stderr!=="") {
				reject(new Error(stderr))
			} else {
				resolve(stdout.split("\n"))
			}
		})
	})
}

module.exports = Connect;
