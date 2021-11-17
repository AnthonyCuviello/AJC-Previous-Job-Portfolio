/*  
Weather Module Simulation Hot Air Balloon
Designed for use with ACMES Module 2.3 Weather
Montclair State University Fall 2020
based on an earlier version by Toni York and Jay Singh Spring 2019
converted by Anthony Cuviello Fall 2020
*/

//Vars and constants
//============================
const CVWIDTH = 700;
const CVHEIGHT = 500;

var cv;
var ctx;

//max and min altitudes
var maxalt = 12;
var minalt = 0;

//simulation variables
var temperature = 20;
var altitude = minalt;
var density = 1200;
var flamesize = 1;
var ambienttemp = 20;
var ambientdensity = 1200;
var offsetX = 0;
var offsetY = 0;
var imgSizeX = 6;
var imgSizeY = 8;

//increment step amounts
var tempinc = 5;
var altinc = 1;
var balloonyinc = 4;
var densinc = -60;
var flameinc = 0.5;
var ambienttempinc = -5.5;
var ambientdensityinc = -50;
var offsetincX = 1.5;
var offsetincY = 4;

var bg = new Image();
bg.src = 'images/background.png';

var balloon = new Image();
balloon.src = 'images/balloon.png';

var flame = new Image();
flame.src = 'images/flame.png';

//Functions
//===================================
function init() {
    cv = document.getElementById("cv");
    cv.width = CVWIDTH;
    cv.height = CVHEIGHT;
    ctx = cv.getContext("2d");
    button1 = document.getElementById('up');
    button2 = document.getElementById('down');
    
    var animationSpeed = 10;
    
    var id = setInterval(frame, animationSpeed);
    //Animation loop
    function frame() {
        background();
        document.getElementById('tempR').innerHTML = temperature;
        document.getElementById('altR').innerHTML = altitude;
        document.getElementById('densityR').innerHTML = density;
        document.getElementById('ambienttempR').innerHTML = ambienttemp;
        document.getElementById('ambientdensityR').innerHTML = ambientdensity;
    }
}

//Draws the background
function background() {
    ctx.drawImage(bg, 0, 0, CVWIDTH, CVHEIGHT);
    hotAirBalloon(423 - (altitude*32));
    fire();
}

//Animates the balloon
function hotAirBalloon(h) {
    ctx.drawImage(balloon, 540, h, balloon.width, balloon.height);
}

//Animates the flame
function fire() {
    ctx.drawImage(flame, 286-offsetX, 338-offsetY, imgSizeX*flamesize, imgSizeY*flamesize);
}

function up() {
    move(1);
}

function down() {
    move(-1);
}

function move(direction) {
    if (checkmove(direction)) {
        temperature = temperature + (direction * tempinc);
        altitude = altitude + (direction * altinc);
        density = density + (direction * densinc);
        ambienttemp = ambienttemp + (direction * ambienttempinc);
        ambientdensity = ambientdensity + (direction * ambientdensityinc);
        flamesize = flamesize + (direction * flameinc);
        offsetX = offsetX + (direction * offsetincX);
        offsetY = offsetY + (direction * offsetincY);
    }
}

function checkmove(direction) {
    if (direction == 1) {
        if (altitude+altinc < maxalt+1) {
            return true;
        }
        else {
            return false;
        }
    }
    else if (direction == -1) {
        if (altitude-altinc > minalt-1) {
            return true;
        }
        else {
            return false;
        }
    }
}