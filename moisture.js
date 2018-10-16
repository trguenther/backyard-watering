var mcpadc = require('mcp-spi-adc');

var moistureSensor = mcpadc.open(2, {speedHz: 20000}, function (err) {
    if (err) throw err;

    var moistureValues = [];

    setInterval(function () {
        moistureSensor.read(function (err, reading) {
            if (err) throw err;
            var mvoltage = reading.rawValue,
		voltage  = mvoltage / 1000,
                range    = (voltage / 0.8) * 100,    // Using 3.3V; will differ for 5V
		moistMax = 0,
		moistMin = 0,
		moistDiff = 0;
            moistureValues.push(voltage.toFixed(3));
            moistMax = Math.max.apply(null, moistureValues);
            moistMin = Math.min.apply(null, moistureValues);
	    moistDiff = moistMax - moistMin;
            //console.log("Voltage: " + voltage.toFixed(4) + " => " + range.toFixed(1) + "%");
	    console.log("Current: " + voltage.toFixed(3) + "V, Min: " + moistMin + "V, Max: " + moistMax + "V => Difference: " + moistDiff.toFixed(3));
        });
    }, 1000);
});
