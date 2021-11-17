/* Atmosphere
Montclair State University 
by Anthony Cuviello, Fall 2020
Designed for use with ACMES Module 2.4 Climate
*/


const CVSIZEX = 500;
const CVSIZEY = 500;

var cv;
var ctx;

var thermosphereHeight = 220;
var thermoStart = 0;

var mesosphereHeight = 60;
var mesoStart = 220;

var stratosphereHeight = 80;
var stratoStart = 280;

var troposphereHeight = 40;
var tropoStart = 360;

var grassHeight = 100;
var grassStart = 400;

var altSlider;
var altitude;
var temperature;

var rocket = new Image();
rocket.src = 'images/rocket.png';

var bg = new Image();
bg.src = 'images/background.png';

function init() {
    cv = document.getElementById('canvas');
    ctx = cv.getContext('2d');
    
    cv.width = CVSIZEX;
    cv.height = CVSIZEY;
    var id = setInterval(frame, 100);
    function frame() {
        background();
        
        altSlider = document.getElementById('altSlider').value;
        altitude = altSlider*5;
        temperature = getTemperature(altitude);
        
        drawRocket(altitude);
        
        document.getElementById('altitude').innerHTML = altitude;
        document.getElementById('temperature').innerHTML = temperature;
    }
}

//input height in km to get the corresponding temperature
function getTemperature(h) {
    if (h == 160) {
        return 304
    }
    if (h>=0 && h<5) {
        return 27;
    }
    else if (h>=5 && h<10) {
        return -14;
    }
    else if (h==10) {
        return -55;
    }
    else if (h>10 && h<=50) {
        return parseInt(1.37*(h-50));
    }
    else if (h>50 && h<=80) {
        return (-3)*h+150;
    }
    else if (h>80 && h<500) {
        return parseInt(4.92*h-483.33);
    }
}

function background() {
    ctx.clearRect(0, 0, CVSIZEX, CVSIZEY);
    ctx.drawImage(bg, 0, 0, CVSIZEX, CVSIZEY);
    labels();
}

function labels() {
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('Troposphere', 380, tropoStart+(troposphereHeight/1.8));
    ctx.fillText('Stratosphere', 380, stratoStart+(stratosphereHeight/1.8));
    ctx.fillText('Mesosphere', 380, mesoStart+(mesosphereHeight/1.8));
    ctx.fillText('Thermosphere', 380, thermoStart+(thermosphereHeight/1.8));
}

function drawRocket(h) {
    ctx.drawImage(rocket, 400, (-h*2)+380, rocket.width, rocket.height);
}