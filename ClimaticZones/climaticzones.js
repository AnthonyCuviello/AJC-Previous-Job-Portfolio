//Constants
const CANVASSIZE = 500; //length of each side of square canvas in px, CHANGE THIS TO RESIZE CANVAS

const POLARCOLOR = "#2e9fcb";
const TEMPERATECOLOR = "#ff7f27";
const TROPICALCOLOR = "#ec1c24";

//Vars
var ctx;
var cv;

var clientX = 0.0;
var clientY = 0.0;

var bgImg = new Image;

var arrowWidth = CANVASSIZE/20; //3.5
var arrowHeight = CANVASSIZE/30; //25
var arrowSpacing = CANVASSIZE/17; //50
var startArrow = CANVASSIZE/2.2;

var thermometerPos = Math.round(CANVASSIZE/10.7143);
var thermometerRadius = CANVASSIZE/12.5;
var thermometerLength = Math.round(CANVASSIZE/1.3043);
var thermColorPadding = CANVASSIZE/60;

var tTick1 = Math.round(CANVASSIZE/5);
var tTick2 = Math.round(CANVASSIZE/1.1538);
var tTicky = Math.round(CANVASSIZE/25);
var thermometerColorLength = tTick2 - tTick1;
var tscale = thermometerColorLength / 70;
var newLength = 0;

var tempColor;

var spanLat = 0;
var spanTemp = 0;

var southPole = Math.round(CANVASSIZE/1.0163);
var antarticCircle = Math.round(CANVASSIZE/1.1364);
var tropicOfCapricorn = Math.round(CANVASSIZE/1.4368);
var equator = Math.round(CANVASSIZE/1.6835);
var tropicOfCancer = Math.round(CANVASSIZE/2.0408);
var articCircle = Math.round(CANVASSIZE/3.52468);
var northPole = Math.round(CANVASSIZE/4.717)-7;

var earthSize = southPole - northPole;
var scale = earthSize/180;

//Constructor that creates chunks for latitude and temperature
function latChunk(y, latitude, temperature) {
    this.y = y;
    this.latitude = latitude;
    this.temperature = temperature;
}

//Temperature values
const TEMPS = [-23.39, -22.93, -22.47, -22.01, -21.55, -21.09, -20.62, -20.16, -19.70, -19.24, -18.78, -18.32, -17.85, -17.39, -16.93, -16.47, -16.01, -15.55, -15.08, -14.62, -11.61, -9.57, -8.62, -9.04, -4.77, -4.50, -4.23, -3.96, -2.69, -2.09, -1.32, -0.55, 0.21, 0.98, 1.75, 2.52, 3.29, 4.06, 4.83, 5.60, 6.37, 7.14, 7.91, 8.48, 9.45, 10.22, 10.99, 11.75, 12.52, 13.29, 14.06, 14.93, 15.60, 16.37, 17.12, 17.88, 18.63, 19.39, 20.15, 20.90, 21.27, 22.29, 22.87, 23.57, 24.26, 24.95, 25.64, 26.34, 26.37, 26.77, 27.17, 27.57, 27.96, 28.36, 28.76, 29.15, 29.55, 29.95, 30.34, 30.74, 31.14, 31.54, 31.93, 32.33, 32.73, 33.12, 33.52, 33.92, 34.31, 34.71, 34.62, 32.53, 31.44, 30.34, 29.25, 28.16, 27.07, 25.98, 24.89, 23.79, 23.70, 23.61, 23.52, 23.43, 23.33, 23.24, 23.15, 23.06, 22.97, 22.88, 22.78, 22.69, 22.60, 22.51, 22.42, 22.33, 22.23, 22.14, 22.05, 21.96, 21.87, 21.77, 21.68, 19.14, 18.03, 17.13, 16.82, 16.45, 16.87, 16.63, 14.84, 11.98, 13.34, 12.92, 11.14, 10.46, 10.40, 11.83, 8.28, 9.72, 9.10, 9.05, 5.91, 4.62, 1.42, 2.28, 0.03, -1.37, -2.77, -4.18, -5.59, -7.00, -11.77, -14.25, -16.73, -17.45, -18.16, -18.88, -19.60, -20.32, -21.03, -21.75, -22.47, -23.19, -23.90, -24.62, -25.34, -26.06, -26.78, -27.49, -28.21, -28.93, -29.65, -30.36, -31.08, -31.80, -32.52, -33.23, -33.95, -34.67, -35];

//Iterator and generator that creates objects using the constructor
const p = [...Array(181).keys()].map(i => new latChunk(Math.round(northPole + scale * i), 90 - i, TEMPS[i]));

function init() {
    cv = document.getElementById('myCanvas')
    ctx = cv.getContext("2d");
    ctx.canvas.width = CANVASSIZE;
    ctx.canvas.height = CANVASSIZE;
    bgImg.src = 'background.png';
    for (var z=0; z<p.length; z++) {
        if (p[z].latitude == -90) {
            break;
        }
        else {
            console.log(p[z].temperature, p[z].latitude, p[z+1].latitude);
        }
    }
}

function drawThermometer(pos, radius) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(pos, pos, radius, 0, 2*Math.PI);
    ctx.fillRect(pos+(radius/1.2), pos-(radius/2), thermometerLength, radius);
    ctx.fill();
    ctx.closePath();
}

function thermometerColor(pos, radius, color, length) {
    radius -= thermColorPadding;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(pos, pos, radius, 0, 2*Math.PI);
    radius -= thermColorPadding;
    ctx.fillRect(pos+(radius/1.2), pos-(radius/2), length, radius);
    ctx.fill();
    ctx.closePath();
}

function temperatureTick(x, y, temp) {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.font = Math.round(CANVASSIZE/30).toString()+"px Arial";
    ctx.fillText(temp, x-(CANVASSIZE/55), y-(CANVASSIZE/150));
    ctx.moveTo(x, y);
    ctx.lineTo(x, y+(CANVASSIZE/22));
    ctx.lineTo(x+(CANVASSIZE/250), y+(CANVASSIZE/22));
    ctx.lineTo(x+(CANVASSIZE/250), y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

//Draws arrow for animation (dir is either "left" or "right")
function drawArrow(x, y, color, dir) {
    var dMod;
    if (dir == "left") {
        dMod = -1;
    }
    else if (dir == "right") {
        dMod = 1;
    }
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.moveTo(x, y);
    ctx.lineTo(x, y+(CANVASSIZE/50));
    ctx.lineTo(x+(dMod*(arrowHeight)), y+(CANVASSIZE/50));
    ctx.lineTo(x+(dMod*(arrowHeight)), y+(arrowHeight));
    ctx.lineTo(x+(dMod*(arrowWidth)), y+((CANVASSIZE/50)/2));
    ctx.lineTo(x+(dMod*(arrowHeight)), y-(CANVASSIZE/75));
    ctx.lineTo(x+(dMod*(arrowHeight)), y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

function loadBackground() {
    ctx.fillRect(0, 0, CANVASSIZE, CANVASSIZE);
    ctx.fillStyle = "black";
    ctx.drawImage(bgImg, 0, 0, CANVASSIZE, CANVASSIZE);
    
    document.getElementById("Latitude").innerHTML = 0;
    document.getElementById("Temperature").innerHTML = 0;
    
    drawThermometer(thermometerPos, thermometerRadius, "white"); 
    //Make the ticks on the thermometer
    temperatureTick(tTick1, tTicky, "-35");
    temperatureTick(tTick2, tTicky, "35");
}

function setup() {
    //Allow the go function to run
    animationLock = true;
    buttonPresses = 0;
    loadBackground();
}

function go() {
    var checkBox = document.getElementById("checky");
    if (checkBox.checked == true) {
        document.getElementById("switchtxt").innerHTML = "ON";
        var i = 0;
        var id = setInterval(frame, 50);
        function frame() {
            if (checkBox.checked == false) {
                document.getElementById("switchtxt").innerHTML = "OFF";
                clearInterval(id);
            }
            else {
                //Check if arrows have moved too far to the right
                if (i >= 41) {
                    i = 0;
                }
                else {
                    //Clear the frame
                    loadBackground();

                    //Make the 5 arrows
                    drawArrow(CANVASSIZE/15 + i, startArrow, "yellow", "right");
                    drawArrow(CANVASSIZE/15 + i, (startArrow)+arrowSpacing, "yellow", "right");
                    drawArrow(CANVASSIZE/15 + i, (startArrow)+(arrowSpacing*2), "yellow", "right");
                    drawArrow(CANVASSIZE/15 + i, (startArrow)+(arrowSpacing*3), "yellow", "right");
                    drawArrow(CANVASSIZE/15 + i, (startArrow)+(arrowSpacing*4), "yellow", "right");
                    drawArrow(750 + i, 1000, "yellow", "right"); //If this arrow is removed, a white "ghost" arrow will appear where the bottom yellow arrow is

                    //Used to detect mouse coordinates
                    cv.addEventListener('mousemove', function(e) {
                        clientX = e.clientX;
                        clientY = e.clientY;
                    });
                    
                    //console.log(clientY);

                    //Get the latitude and temperature
                    for (var z=0; z<p.length-1; z++) {
                        if (clientY > p[z].y && clientY <= p[z+1].y) {
                            //Check if cursor goes off earth
                            if (clientY <= northPole) {
                                spanLat = p[0].latitude;
                                spanTemp = p[0].temperature;
                            }
                            else if (clientY >= southPole){
                                spanLat = p[180].latitude;
                                spanTemp = p[180].temperature;
                            }
                            
                            else {
                                spanLat = p[z].latitude;
                                spanTemp = p[z].temperature;
                            }
                        }
                    }
                    
                    //Update the tags
                    document.getElementById("Latitude").innerHTML = spanLat;
                    document.getElementById("Temperature").innerHTML = Math.round(spanTemp);

                    //Change the color of the arrow on right and thermometer
                    tempColor = "";
                    if ((clientY <= articCircle) || (clientY >= antarticCircle)) {
                        tempColor = POLARCOLOR;
                    }
                    else if ((clientY > articCircle && clientY <= tropicOfCancer) || (clientY >= tropicOfCapricorn && clientY < antarticCircle)) {
                        tempColor = TEMPERATECOLOR;
                    }
                    else if (clientY > tropicOfCancer && clientY < tropicOfCapricorn) {
                        tempColor = TROPICALCOLOR;
                    }
                    
                    //Keep arrow within bounds
                    if (clientY >= northPole && clientY <= southPole) {
                        drawArrow(CANVASSIZE, clientY-(CANVASSIZE/50)-5, tempColor, "left");
                    }
                    

                    //Set the length of the colored section of the thermometor
                    newLength = Math.round((Math.round(spanTemp)+35) * tscale);
                    thermometerColor(thermometerPos, thermometerRadius, tempColor, newLength+Math.round(CANVASSIZE/13.6363));

                    i++;
                }
            }
        }
    }
}