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
            t1 = degF.toFixed(1);
        });
    }, 15000);
});

var moistureSensor1 = mcpadc.open(1, {speedHz: 20000}, function (err) {
    if (err) throw err;

    setInterval(function () {
        moistureSensor1.read(function (err, reading) {
            if (err) throw err;
            m1 = reading.value;
        });
    }, 15000);
});


// No plant / no drip line nearby: soil will be very dry, causing skewed average
var moistureSensor2 = mcpadc.open(2, {speedHz: 20000}, function (err) {
    if (err) throw err;

    setInterval(function () {
        moistureSensor2.read(function (err, reading) {
            if (err) throw err;
            m2 = reading.value;
        });
    }, 15000);
});


var moistureSensor3 = mcpadc.open(3, {speedHz: 20000}, function (err) {
    if (err) throw err;

    setInterval(function () {
        moistureSensor3.read(function (err, reading) {
            if (err) throw err;
            m3 = reading.value;
        });
    }, 15000);
});

var moistureSensor4 = mcpadc.open(4, {speedHz: 20000}, function (err) {
    if (err) throw err;

    setInterval(function () {
        moistureSensor4.read(function (err, reading) {
            if (err) throw err;
            m4 = reading.value;
        });
    }, 15000);
});

var moistureSensor5 = mcpadc.open(5, {speedHz: 20000}, function (err) {
    if (err) throw err;

    setInterval(function () {
        moistureSensor5.read(function (err, reading) {
            if (err) throw err;
            m5 = reading.value;
        });
    }, 15000);
});

var curTime = getDateTime();

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return hour + ":" + min + " on " + month + "/" + day + "/" + year;
}

function readoutToConsole() {
    var avg   = (m1 + m2 + m3 + m4 + m5) / 5; // Average of all five sensors
    var range = (avg / 0.8) * 100;

    console.log("At " + curTime + ":\r\nAmbient temperature: " + t1 + " deg F\nAverage soil moisture reading: " + avg.toFixed(3) + "V (" + range.toFixed(1) + "%)\nSensor 1: " + m1.toFixed(3) + "V\nSensor 2: " + m2.toFixed(3) + "V\nSensor 3: " + m3.toFixed(3) + "V\nSensor 4: " + m4.toFixed(3) + "V\nSensor 5: " + m5.toFixed(3) + "V\r\n");
}

console.log("Monitoring backyard watering system.\r\nStarted at " + curTime + "\r\nTaking readings every 5 minutes.\r\n");

// Display some readings without having to wait for the first interval (5 minutes)
// but still allow the sensors to be read (15-second intervals)
setTimeout(function() {
    readoutToConsole();
}, 20000);

setInterval(function() {
    readoutToConsole();
}, 300000);
