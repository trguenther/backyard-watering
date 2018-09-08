var mcpadc = require('mcp-spi-adc');

var moistureSensor = mcpadc.open(5, {speedHz: 20000}, function (err) {
    if (err) throw err;

    setInterval(function () {
        moistureSensor.read(function (err, reading) {
            if (err) throw err;
            var voltage = reading.value,
                range   = (voltage / 0.8) * 100;    // Using 3.3V; will differ for 5V

            console.log("Voltage: " + voltage.toFixed(4) + " => " + range.toFixed(1) + "%");
        });
    }, 1000);
});
