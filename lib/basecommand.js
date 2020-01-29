/** Basecommand

	Interface to the 'ipmitool' command line program.

	$ ipmitool -H 10.20.30.40 -U root -P root help
	ipmitool> ?
	Commands:
		raw		Send a RAW IPMI request and print response
		i2c		Send an I2C Master Write-Read command and print response
		spd		Print SPD info from remote I2C device
		lan		Configure LAN Channels
		chassis		Get chassis status and set power state
		power		Shortcut to chassis power commands
		event		Send pre-defined events to MC
		mc		Management Controller status and global enables
		sdr		Print Sensor Data Repository entries and readings
		sensor		Print detailed sensor information
		fru		Print built-in FRU and scan SDR for FRU locators
		gendev		Read/Write Device associated with Generic Device locators sdr
		sel		Print System Event Log (SEL)
		pef		Configure Platform Event Filtering (PEF)
		sol		Configure and connect IPMIv2.0 Serial-over-LAN
		tsol		Configure and connect with Tyan IPMIv1.5 Serial-over-LAN
		isol		Configure IPMIv1.5 Serial-over-LAN
		user		Configure Management Controller users
		channel		Configure Management Controller channels
		session		Print session information
		dcmi		Data Center Management Interface
		nm		Node Manager Interface
		sunoem		OEM Commands for Sun servers
		kontronoem	OEM Commands for Kontron devices
		picmg		Run a PICMG/ATCA extended cmd
		fwum		Update IPMC using Kontron OEM Firmware Update Manager
		firewall	Configure Firmware Firewall
		delloem		OEM Commands for Dell systems
		shell		Launch interactive IPMI shell
		exec		Run list of commands from file
		set		Set runtime variable for shell and exec
		hpm		Update HPM components using PICMG HPM.1 file
		ekanalyzer	run FRU-Ekeying analyzer using FRU files
		ime		Update Intel Manageability Engine Firmware
		vita		Run a VITA 46.11 extended cmd
		lan6		Configure IPv6 LAN Channels
 */
function Basecommand(commandname, opts) {
	this.cmdname = commandname;
	this.options = opts;

	this.result = null;
}

Basecommand.prototype.makeCommand = function(command) {
	var args = '';
	// need to format the options to ipmitool format
	for (var variable in this.options) {
		args += " -" + variable + " " + this.options[variable];
	}

	// since ipmitool requires commands to be in specific order
	args += ' ' + command;

	return this.cmdname + " " + args.trim();
};

Basecommand.prototype.setOptions = function (options) {
	this.options = options;
};

module.exports = Basecommand;
