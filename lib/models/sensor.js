/**
ipmitool> sensor
CPU0_TEMP        | na         | degrees C  | na    | na        | na        | na        | na        | 80.000    | na
CPU1_TEMP        | na         | degrees C  | na    | na        | na        | na        | na        | 80.000    | na
SR5650_TEMP      | na         | degrees C  | na    | na        | na        | na        | na        | 98.000    | na
DIMM1 INLET_TEMP | na         | degrees C  | na    | na        | na        | na        | na        | 85.000    | na
CPU0 INLET_TEMP  | na         | degrees C  | na    | na        | na        | na        | na        | 80.000    | na
CPU1 INLET_TEMP  | na         | degrees C  | na    | na        | na        | na        | na        | 80.000    | na
H0_VDD_CORE_RUN  | na         | Volts      | na    | na        | 0.736     | na        | na        | 1.344     | na
H1_VDD_CORE_RUN  | na         | Volts      | na    | na        | 0.736     | na        | na        | 1.344     | na
V1P8_MEM0        | na         | Volts      | na    | na        | 1.520     | na        | na        | 2.000     | na
V1P8_MEM1        | na         | Volts      | na    | na        | 1.520     | na        | na        | 2.000     | na
P1V8_LAN         | na         | Volts      | na    | na        | 1.696     | na        | na        | 1.904     | na
VDD_3.3_RUN      | na         | Volts      | na    | na        | 3.120     | na        | na        | 3.632     | na
VDD_5_ALW        | na         | Volts      | na    | na        | 4.488     | na        | na        | 5.472     | na
VDD_5_RUN        | na         | Volts      | na    | na        | 4.488     | na        | na        | 5.472     | na
VBAT             | na         | Volts      | na    | na        | 2.624     | na        | na        | 3.536     | na
VDD_RD890_1.8RUN | na         | Volts      | na    | na        | 1.600     | na        | na        | 2.000     | na
VDD_SB700_1.2RUN | na         | Volts      | na    | na        | 1.048     | na        | na        | 1.352     | na
VDD_HT1_RUN      | na         | Volts      | na    | na        | 1.048     | na        | na        | 1.352     | na
VDD_RD890_1.1RUN | na         | Volts      | na    | na        | 1.000     | na        | na        | 1.200     | na
VDDHTTX_RD890    | na         | Volts      | na    | na        | 1.056     | na        | na        | 1.368     | na
VDD_3P3_DUAL     | na         | Volts      | na    | na        | 3.120     | na        | na        | 3.632     | na
SYS FAN 1        | na         |            | na    | na        | 1000.000  | na        | na        | na        | na
SYS FAN 2        | na         |            | na    | na        | 1000.000  | na        | na        | na        | na
SYS FAN 3        | na         |            | na    | na        | 1000.000  | na        | na        | na        | na
SYS FAN 4        | na         |            | na    | na        | 1000.000  | na        | na        | na        | na
Ear Temp 1       | na         |            | na    | na        | na        | na        | na        | 50.000    | na
Ear Temp 2       | na         |            | na    | na        | na        | na        | na        | 50.000    | na
SEL Fullness     | na         | discrete   | na    | na        | na        | na        | na        | na        | na
Memory           | na         | discrete   | na    | na        | na        | na        | na        | na        | na
*/
var fields = ["name", "value", "unit", "status", "type", "state", "lower_nonrec",
              "lower_crit", "lower_noncrit", "upper_crit", "upper_nonrec", "asserts_enabled", "deasserts_enabled"  ];
var type = ["string", "number", "string", "string", "number", "number", "number", "number", "number", "number"];

function Sensor(data) {
	data = typeof data !== 'undefined' ? data : null;
	this.data = data;
}

Sensor.prototype.setData = function(data) {
	this.data = data;
};

Sensor.prototype.getData = function() {
	return this.data;
};

Sensor.parse = function(line) {
	var data = {};
	var parts = line.split('|');
	var i = 0;
	for(i=0;i<parts.length;i++) {
		if(type[i] == "number")
			data[fields[i]] = Number(parts[i].trim());
		else
			data[fields[i]] = parts[i].trim();
	}

	var sensor = new Sensor(data);
	//sensors.setData(data);
	return sensor;
};

module.exports = Sensor;
