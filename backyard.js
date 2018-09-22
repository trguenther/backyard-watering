const factor = 0.855; // Using 3.3V. This will differ for 5V

var mcpadc = require('mcp-spi-adc');
var t1  = 0.0,
    m1  = 0.0,
    m2  = 0.0,
    m3  = 0.0,
    m4  = 0.0,
    m5  = 0.0,
    avg = 0.0;

var tempSensor = mcpadc.open(0, {speedHz: 20000}, function (err) {
    if (err) throw err;

    setInterval(function () {
        tempSensor.read(function (err, reading) {
            if (err) throw err;
            var voltage = reading.value,
                degC    = (reading.value * 3.3 - 0.5) * 100,
                degF    = degC * (9 / 5) + 32;

            // console.log("Ambient temperature " + degF.toFixed(2) + " F  (" + voltage.toFixed(4) + " V)");
            t1 = degF.toFixed(1);
        });
    }, 1500);
});

var moistureSensor1 = mcpadc.open(1, {speedHz: 20000}, function (err) {
    if (err) throw err;

    setInterval(function () {
        moistureSensor1.read(function (err, reading) {
            if (err) throw err;
            var voltage = reading.value,
                range   = (voltage / factor) * 100;    // Using 3.3V; will differ for 5V
            // console.log("Sensor 1: " + range.toFixed(1) + "%" + " (" + voltage.toFixed(4) + ")");
            m1 = voltage;
        });
    }, 1500);
});


var moistureSensor2 = mcpadc.open(2, {speedHz: 20000}, function (err) {
    if (err) throw err;

    setInterval(function () {
        moistureSensor2.read(function (err, reading) {
            if (err) throw err;
            var voltage = reading.value,
                range   = (voltage / factor) * 100;
            // console.log("Sensor 2: " + range.toFixed(1) + "%" + " (" + voltage.toFixed(4) + ")");
            m2 = voltage;
        });
    }, 1500);
});

/* Disable sensor 3: no plant / no drip line nearby: soil will be very dry, causing skewed average
var moistureSensor3 = mcpadc.open(3, {speedHz: 20000}, function (err) {
    if (err) throw err;

    setInterval(function () {
        moistureSensor3.read(function (err, reading) {
            if (err) throw err;
            var voltage = reading.value,
                range   = (voltage / factor) * 100;
            // console.log("Sensor 3: " + range.toFixed(1) + "%" + " (" + voltage.toFixed(4) + ")");
            m3 = voltage;
        });
    }, 1500);
});
*/

var moistureSensor4 = mcpadc.open(4, {speedHz: 20000}, function (err) {
    if (err) throw err;

    setInterval(function () {
        moistureSensor4.read(function (err, reading) {
            if (err) throw err;
            var voltage = reading.value,
                range   = (voltage / factor) * 100;
            // console.log("Sensor 4: " + range.toFixed(1) + "%" + " (" + voltage.toFixed(4) + ")");
            m4 = voltage;
        });
    }, 1500);
});

var moistureSensor5 = mcpadc.open(5, {speedHz: 20000}, function (err) {
    if (err) throw err;

    setInterval(function () {
        moistureSensor5.read(function (err, reading) {
            if (err) throw err;
            var voltage = reading.value,
                range   = (voltage / factor) * 100;
            // console.log("Sensor 5: " + range.toFixed(1) + "%" + " (" + voltage.toFixed(4) + ")");
            m5 = voltage;
        });
    }, 1500);
});

console.log("Interval: 3 seconds\r\n");

setInterval(function() {
    // avg = (m1 + m2 + m3 + m4 + m5) / 5; // Average of all five sensors
    avg = (m1 + m2 + m4 + m5) / 5;
    console.log("Ambient temperature: " + t1 + " F\nAverage soil moisture reading: " + avg.toFixed(3) + "V\r\n");
}, 3000);
