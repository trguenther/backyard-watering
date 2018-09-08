var mcpadc = require('mcp-spi-adc');

var tempSensor = mcpadc.open(5, {speedHz: 20000}, function (err) {
    if (err) throw err;

    setInterval(function () {
        tempSensor.read(function (err, reading) {
            if (err) throw err;
            var voltage = reading.value,
                degC    = (reading.value * 3.3 - 0.5) * 100,
                degF    = degC * (9 / 5) + 32;

            console.log("Voltage: " + voltage.toFixed(4) + " V => " + degC.toFixed(2) + " C (" + degF.toFixed(2) + " F)");
        });
    }, 1000);
});
