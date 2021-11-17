/* Building Shadows
Montclair State University 
by Anthony Cuviello, Fall 2019
Designed for use with ACMES Module 1.4 Shadows and Time
*/


//vars & constants
//=================================================================
const canvasSize = 600;
const skyColor = "#80e5ff";
const grassColor = "#33cc33";
const flagPoleColor = "#bfbfbf";
const shadowColor = "#0a290a";

var scale = 2.1;

var canvas;
var ctx;

var sun = new Image();
sun.src = 'images/sun.PNG';

var building1 = new Image();
building1.src = 'images/gym.png'

var building2 = new Image();
building2.src = 'images/bank.png'

var building3 = new Image();
building3.src = 'images/restaurant.png'

var building4 = new Image();
building4.src = 'images/hospital.png'

var building5 = new Image();
building5.src = 'images/apartment.png'

var flagHead = new Image();
flagHead.src = 'images/flag.png';

var buildingMode = false;
var buildingTime = true; //true for 2pm false for 6pm
var buildingChoice;
var buildingHeight;
var shadowLenBuilding;

var shadowWidth = 5;
var shadowExtension = 6;

var sunAngle;
var angleOfSun;
var sunH = canvasSize/1.1429; //1.1429
var sunL = canvasSize/2; //2

//Used for span tags
var tanTheta = 2; //Buillding Mode

//Animations
var sunSize = canvasSize/5.3333;
var sunOffset = sunSize/2; //Middle of the sun image
var grassHeight = canvasSize/5;
var buildingShadowY = canvasSize/6.5217;

//Buildings
var gym = new Building(20, 336);
var bank = new Building(25, 336);
var restaurant = new Building(27, 333);
var hospital = new Building(34, 347);
var apartment = new Building(40, 330);

//Functions
//=================================================================
function init() {
    canvas = document.getElementById("canvas");
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    ctx = canvas.getContext("2d");
    ctx.translate(canvas.width, canvas.height);
    flagpoleModeHTML();
    
    //Animation loop
    var id = setInterval(frame, 100);
    function frame() {
        background();
        //Check to see if building or flagpole mode
        if (buildingMode) {
            //Gives numbers 0-5
            buildingChoice = document.getElementById("buildingChoice").options.selectedIndex;
            
            //Check to see if 2pm or 6pm is checked
            if (document.getElementById("2pm").checked) {
                sunAngle = ((7)*Math.PI)/18;
                tanTheta = 2;
            }
            else if (document.getElementById("6pm").checked) {
                sunAngle = ((3)*Math.PI)/18;
                tanTheta = 0.5;
            }
            else if (document.getElementById("7pm").checked) {
                sunAngle = ((2)*Math.PI)/18;
                tanTheta = 0.3333;
            }
            
            //Draw the sun
            sunPos(sunAngle);
            
            buildingPicker(buildingChoice);
            
            document.getElementById("buildingH").innerHTML = buildingHeight;
            document.getElementById("shadowL").innerHTML = shadowLenBuilding;
            
        }
        else {
            var flagSlider = document.getElementById("flagSlider").value;
            var sunSlider = document.getElementById("sunSlider").value;
            var shadowLen = flagpoleShadowLength(flagSlider, sunSlider);
            
            //Get angle from time of day and draw the sun
            angleOfSun = ((9-sunSlider)*Math.PI)/18;
            sunPos(angleOfSun);
            
            flagPole(flagSlider*scale); //Scale shadow to left of canvas at lowest height
            drawShadow(flagSlider*scale, -shadowWidth, -canvasSize/1.9704, -canvasSize/5.7143, angleOfSun, shadowLen);
            structureHeight(flagSlider*scale, 305, 105);
            
            document.getElementById("flagH").innerHTML = flagSlider;
            document.getElementById("sunP").innerHTML = sunSlider;
            document.getElementById("shadowL2").innerHTML = shadowLen;
        }
    }
}


//Constructor for buildings with x and y values of left end for shadow
function Building(height, shadowX) {
    this.h = height;
    this.s = shadowX;
}

function buildingPicker(building) {
    switch(building) {
            case 0:
                buildingHeight = 0;
                shadowLenBuilding = 0;
                break;
            case 1:
                drawBuilding(building1, gym.h, gym.s, (gym.h/tanTheta).toFixed(1));
                buildingHeight = gym.h;
                shadowLenBuilding = (gym.h/tanTheta).toFixed(1);
                structureHeight(gym.h*scale, gym.s, buildingShadowY);
                break;
            case 2:
                drawBuilding(building2, bank.h, bank.s, (bank.h/tanTheta).toFixed(1));
                buildingHeight = bank.h;
                shadowLenBuilding = (bank.h/tanTheta).toFixed(1);
                structureHeight(bank.h*scale, bank.s, buildingShadowY);
                break;
            case 3:
                drawBuilding(building3, restaurant.h, restaurant.s, (restaurant.h/tanTheta).toFixed(1));
                buildingHeight = restaurant.h;
                shadowLenBuilding = (restaurant.h/tanTheta).toFixed(1);
                structureHeight(restaurant.h*scale, restaurant.s, buildingShadowY);
                break;
            case 4:
                drawBuilding(building4, hospital.h, hospital.s, (hospital.h/tanTheta).toFixed(1));
                buildingHeight = hospital.h;
                shadowLenBuilding = (hospital.h/tanTheta).toFixed(1);
                structureHeight(hospital.h*scale, hospital.s, buildingShadowY);
                break;
            case 5:
                drawBuilding(building5, apartment.h, apartment.s, (apartment.h/tanTheta).toFixed(1));
                buildingHeight = apartment.h;
                shadowLenBuilding = (apartment.h/tanTheta).toFixed(1);
                structureHeight(apartment.h*scale, apartment.s, buildingShadowY);
                break;
            }
}

function background() {
    ctx.clearRect(0, 0, -canvas.width, -canvas.height);
    ctx.fillStyle = skyColor;
    ctx.fillRect(0, 0, -canvas.width, -canvas.height);
    ctx.fillStyle = grassColor;
    ctx.fillRect(0, 0, -canvas.width, -grassHeight);
}

function radToDegrees(x) {
    return x * (180/Math.PI);
}

function drawSun(x, y) {
    ctx.drawImage(sun, x, y, sunSize, sunSize);
}

function drawBuilding(img, h, s, text) {
    var y = canvasSize/3;
    var imgSize = 40*scale;
    var offset = 108-imgSize;
    ctx.drawImage(img, -347, -y+offset, imgSize, imgSize);
    drawShadow(h*scale, -shadowWidth, -s, -buildingShadowY, sunAngle, text);
}

function sunPos(angle) {
    drawSun(-canvasSize/6.6667-(sunH*Math.tan(angle))/10, -canvasSize/2.6667-(sunL*Math.tan(angle))/3);
}

function flagPole(h) {
    if (h/scale>6) {
        ctx.drawImage(flagHead, -304, -(106)-h, canvasSize/22.2222, canvasSize/40)
    }
    ctx.clearRect(-canvasSize/2.0305, -canvasSize/5.7143, -canvasSize/66.6667, -h);
    ctx.fillStyle = flagPoleColor;
    ctx.fillRect(-canvasSize/2.0305, -canvasSize/5.7143, -canvasSize/66.6667, -h);
    ctx.fill();
}

function drawShadow(h, w, sx, sy, angle, text) {
    var shadowLength = (h/Math.tan(angle)).toFixed(1);
    if (h/scale>1) {
        ctx.clearRect(sx, sy, -shadowLength-shadowExtension, w);
        ctx.fillStyle = shadowColor;
        ctx.fillRect(sx, sy, -shadowLength-shadowExtension, w);
        ctx.font = "16px Arial";
        ctx.fillText(text.toString()+"m", sx-14-(shadowLength/2), sy+18);
        ctx.fill();
    }
    else if (h/scale==1) {
        ctx.clearRect(sx, sy, -shadowLength-shadowExtension/1.5, w/2);
        ctx.fillStyle = shadowColor;
        ctx.fillRect(sx, sy, -shadowLength-shadowExtension/1.5, w/2);
        ctx.font = "16px Arial";
        ctx.fillText(text.toString()+"m", sx-14-(shadowLength/2), sy+18);
        ctx.fill();
    }
    else {
        ctx.clearRect(sx, sy, 0, 0);
        ctx.fillStyle = shadowColor;
        ctx.fillRect(sx, sy, 0, 0);
        ctx.font = "16px Arial";
        ctx.fillText(text.toString()+"m", sx-14-(shadowLength/2), sy+18);
        ctx.fill();
    }
}

function buildingModeHTML() {
    buildingMode = true;
    document.getElementById("building").style.display = "block";
    document.getElementById("flagpole").style.display = "none";
    background();
}

function flagpoleModeHTML() {
    buildingMode = false;
    document.getElementById("building").style.display = "none";
    document.getElementById("flagpole").style.display = "block";
    background();
}

function flagpoleShadowLength(h, time) {
    var x;
    if (time >= 2 && time <= 4) {
        x = time/4;
    }
    else if (time == 5) {
        x = 1.5
    }
    else if (time == 6) {
        x = 2
    }
    else {
        x = 3
    }
    return (h*x).toFixed(1);
}

function structureHeight(h, x, y) {
    var height = Math.round(h/scale);
    if (h/scale>1) {
        ctx.clearRect(-x, -y-shadowWidth, -canvasSize/120, -h+shadowWidth);
        ctx.fillStyle = "red";
        ctx.fillRect(-x, -y-shadowWidth, -canvasSize/120, -h+shadowWidth);
        ctx.font = "16px Arial";
        ctx.fillText(height.toString()+"m", -x-40, -y-(h/2.2));
        ctx.fill();
    }
    if (h/scale==1) {
        ctx.clearRect(-x, -y-shadowWidth, -canvasSize/120, 0);
        ctx.fillStyle = "red";
        ctx.fillRect(-x, -y-shadowWidth, -canvasSize/120, 0);
        ctx.font = "16px Arial";
        ctx.fillText(height.toString()+"m", -x-40, -y-(h/2.2));
        ctx.fill();
    }
    else {
        ctx.clearRect(-x, -y-shadowWidth, 0, 0);
        ctx.fillStyle = "red";
        ctx.fillRect(-x, -y-shadowWidth, 0, 0);
        ctx.font = "16px Arial";
        ctx.fillText(height.toString()+"m", -x-40, -y-(h/2.2));
        ctx.fill();
    }
}