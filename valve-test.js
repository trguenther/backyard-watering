const Gpio = require('pigpio').Gpio;

const valve = new Gpio(17, {mode: Gpio.OUTPUT});

var level = 0;

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

function closeValve() {
    level = 0;
    valve.digitalWrite(0);
}

function openValve() {
    level = 1;
    valve.digitalWrite(1);
}

function toggleValve() {
    if (level == 0) {
        level = 1;
    } else {
        level = 0;
    }
    valve.digitalWrite(level);
}

function getState() {
    if (level == 1) {
        return "open";
    } else {
        return "closed";
    }
}

var curTime = getDateTime();

console.log("Testing solenoid valve opening and closing.\r\n");

closeValve();   // Make sure we start with the valve closed.

setTimeout(function() {
    curTime = getDateTime();
    openValve();
    console.log("Valve was opened at " + curTime + "\r\n");
}, 10000);

setTimeout(function() {
    curTime = getDateTime();
    closeValve();
    console.log("Valve was closed at " + curTime + "\r\n");
}, 60000);
