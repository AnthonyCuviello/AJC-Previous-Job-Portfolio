/* Moon Pie
Montclair State University 
by Anthony Cuviello, Summer 2020
Designed for use with ACMES Lunar Phases Module
*/

//Vars & Constants
//=================================================================
const SIZE = 600;
const moonPath = '#33cccc';
const orbit = new Path2D();

var canvas;
var ctx;

var fractionOverlay = false;
var daysOverlay = false;

var mouseX;
var mouseY;
var mouseDown = false;
                
var offsetX = 115;
var offsetY = 11;
                
var r = 125;
var smallR = 5;
            
var circleCount = 0;

var angleChecker;

var quadrant;
var currentAngle;
var prevAngle;

var moonimage = -290;
var moontextX = -210;
var moontextY = -95;

var orbitRadius = 125;
var orbitX = 115;
var orbitY = 10;

var mouseRange = 5;

var bg = new Image();
bg.src = 'images/background.png';

var Earth = new Image();
Earth.src = 'images/earth/earth.png';

var Earth2 = new Image();
Earth2.src = 'images/earth/earth2.png';

var Earth3 = new Image();
Earth3.src = 'images/earth/earth3.png';

var Earth4 = new Image();
Earth4.src = 'images/earth/earth4.png';

var Earth5 = new Image();
Earth5.src = 'images/earth/earth5.png';

var Earth6 = new Image();
Earth6.src = 'images/earth/earth6.png';

var Earth7 = new Image();
Earth7.src = 'images/earth/earth7.png';

var Earth8 = new Image();
Earth8.src = 'images/earth/earth8.png';

var earthString = '';
var stringNum;

var Moon = new Image();
Moon.src = 'images/moon/diagram/moon.png';

var new_moon = new Image();
new_moon.src = 'images/moon/close/new.png';

var waxing_crescent = new Image();
waxing_crescent.src = 'images/moon/close/waxing_crescent.png';

var waxing_crescent2 = new Image();
waxing_crescent2.src = 'images/moon/close/waxing_crescent2.png';

var waxing_crescent3 = new Image();
waxing_crescent3.src = 'images/moon/close/waxing_crescent3.png';

var first_quarter = new Image();
first_quarter.src = 'images/moon/close/first_quarter.png';

var waxing_gibbous = new Image();
waxing_gibbous.src = 'images/moon/close/waxing_gibbous.png';

var waxing_gibbous2 = new Image();
waxing_gibbous2.src = 'images/moon/close/waxing_gibbous2.png';

var waxing_gibbous3 = new Image();
waxing_gibbous3.src = 'images/moon/close/waxing_gibbous3.png';

var full_moon = new Image();
full_moon.src = 'images/moon/close/full.png';

var waning_gibbous = new Image();
waning_gibbous.src = 'images/moon/close/waning_gibbous.png';

var waning_gibbous2 = new Image();
waning_gibbous2.src = 'images/moon/close/waning_gibbous2.png';

var waning_gibbous3 = new Image();
waning_gibbous3.src = 'images/moon/close/waning_gibbous3.png';

var third_quarter = new Image();
third_quarter.src = 'images/moon/close/third_quarter.png';

var waning_crescent = new Image();
waning_crescent.src = 'images/moon/close/waning_crescent.png';

var waning_crescent2 = new Image();
waning_crescent2.src = 'images/moon/close/waning_crescent2.png';

var waning_crescent3 = new Image();
waning_crescent3.src = 'images/moon/close/waning_crescent3.png';

//Functions
//=================================================================
function init() {
    canvas = document.getElementById("canvas");
    moon = document.getElementById("mydiv");
    moon.style.left = p[0].x+'px';
    moon.style.top = p[0].y+'px';
    canvas.height = SIZE;
    canvas.width = SIZE;
    ctx = canvas.getContext("2d");
    ctx.translate(SIZE/2, SIZE/2);
    
    currentAngle = 0;
    
    var animationSpeed = 10;
    var a = 0;
    var b = 0;
    
    var id = setInterval(frame, animationSpeed);
    //Animation loop
    function frame() {
        if (a>=5000) {
            clearInterval(id);
            a = 0;
            id = setInterval(frame, animationSpeed);
        }
        else {
            background();

            daysOverlay = document.getElementById("days").checked;
            daysReadout(currentAngle);

            fractionOverlay = document.getElementById("fraction").checked;
            fractionReadout(currentAngle);

            if (b <= 800) {
                if (Math.ceil(b / 100) == 1) {
                    ctx.drawImage(Earth, -Earth.width/2, -Earth.height/2, Earth.width, Earth.height);
                }
                if (Math.ceil(b / 100) == 2) {
                    ctx.drawImage(Earth2, -Earth.width/2, -Earth.height/2, Earth.width, Earth.height);
                }
                if (Math.ceil(b / 100) == 3) {
                    ctx.drawImage(Earth3, -Earth.width/2, -Earth.height/2, Earth.width, Earth.height);
                }
                if (Math.ceil(b / 100) == 4) {
                    ctx.drawImage(Earth4, -Earth.width/2, -Earth.height/2, Earth.width, Earth.height);
                }
                if (Math.ceil(b / 100) == 5) {
                    ctx.drawImage(Earth5, -Earth.width/2, -Earth.height/2, Earth.width, Earth.height);
                }
                if (Math.ceil(b / 100) == 6) {
                    ctx.drawImage(Earth6, -Earth.width/2, -Earth.height/2, Earth.width, Earth.height);
                }
                if (Math.ceil(b / 100) == 7) {
                    ctx.drawImage(Earth7, -Earth.width/2, -Earth.height/2, Earth.width, Earth.height);
                }
                if (Math.ceil(b / 100) == 8) {
                    ctx.drawImage(Earth8, -Earth.width/2, -Earth.height/2, Earth.width, Earth.height);
                }
            }
            else {
                ctx.drawImage(Earth, -Earth.width/2, -Earth.height/2, Earth.width, Earth.height);
                b = 0;
            }

            angleChecker = setTimeout(function(){prevAngle = currentAngle}, animationSpeed/10);

            canvas.addEventListener('mousemove', function(e) {
                mouseX = e.clientX - offsetX;
                mouseY = e.clientY - offsetY;
            });
            if (prevAngle == 359 && currentAngle == 0) {
                document.getElementById("daysR").innerHTML = '360'+'&#176;';
                clearTimeout(angleChecker);
            }
            else {
                document.getElementById("moonPos").innerHTML = Math.round(currentAngle/12.85);
            }
            drawPhases(currentAngle);
            dragElement(moon);
            b++;
            a++;
        }
    }
    
     //W3 schools draggable html element tut
                // Make the DIV element draggable:
                function dragElement(elmnt) {
                  var pos1 = 0, pos2 = 0;
                  if (document.getElementById(elmnt.id + "header")) {
                    // if present, the header is where you move the DIV from:
                    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
                  } else {
                    // otherwise, move the DIV from anywhere inside the DIV:
                    elmnt.onmousedown = dragMouseDown;
                  }

                  function dragMouseDown(e) {
                    e = e || window.event;
                    e.preventDefault();
                    document.onmouseup = closeDragElement;
                    // call a function whenever the cursor moves:
                    document.onmousemove = elementDrag;
                  }
                    
                function elementDrag(e) {
                    e = e || window.event;
                    e.preventDefault();
                    
                    //find coords of cursor
                    pos1 = e.clientX - offsetX - 300;
                    pos2 = -(e.clientY - offsetY - 300);
                    
                    //find the quadrant its in
                    if (pos1>=0 && pos2>=0) {
                        quadrant = 1;
                    }
                    else if (pos1<0 && pos2>=0) {
                        quadrant = 2;
                    }
                    else if (pos1<0 && pos2<0) {
                        quadrant = 3;
                    }
                    else if (pos1>=0 && pos2<0) {
                        quadrant = 4;
                    }
                    
                    //find angle and adjust for quadrant
                    theta = degrees(Math.atan(pos2/pos1));
                    
                    switch(quadrant) {
                        case 1:
                            currentAngle = theta;
                            break;
                        case 2:
                            currentAngle = 180+theta;
                            break;
                        case 3:
                            currentAngle = theta+180;
                            break;
                        case 4:
                            currentAngle = 359+theta;
                            break;
                    }
                    
                    elmnt.style.top = p[currentAngle].y + "px";
                    elmnt.style.left = p[currentAngle].x + "px";
                  }

                  function closeDragElement() {
                    // stop moving when mouse button is released:
                    document.onmouseup = null;
                    document.onmousemove = null;
                  }
            }
            
}

//Draws the background image
function background() {
    ctx.drawImage(bg, -SIZE/2, -SIZE/2, canvas.width, canvas.height);
    drawOrbit();
}

//Draws the teal ring the moon is following
function drawOrbit() {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = moonPath;
    ctx.arc(0, 0, orbitRadius, 0, 2*Math.PI);
    ctx.stroke();
    ctx.closePath();
}
//Convert radians to degrees
function degrees(radians) {
    return Math.round(radians*(180/Math.PI));
}

function radians(degrees) {
    return (degrees*(Math.PI/180));
}
function drawPhases(angle) {
    if (angle > 360-mouseRange && angle < 0+mouseRange) {
        ctx.drawImage(new_moon, moonimage, moonimage);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("New Moon", moontextX, moontextY);
    }
    
    else if (angle >= 0+mouseRange && angle < 30) {
        ctx.drawImage(waxing_crescent, moonimage, moonimage);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Waxing Crescent", moontextX, moontextY);
    }
    else if (angle >= 30 && angle < 60) {
        ctx.drawImage(waxing_crescent2, moonimage, moonimage);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Waxing Crescent", moontextX, moontextY);
    }
    else if (angle >= 60 && angle <= 90-mouseRange) {
        ctx.drawImage(waxing_crescent3, moonimage, moonimage);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Waxing Crescent", moontextX, moontextY);
    }
    
    else if (angle > 90-mouseRange && angle < 90+mouseRange) {
        ctx.drawImage(first_quarter, moonimage, moonimage);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("First Quarter", moontextX, moontextY);
    }
    
    else if (angle >= 90+mouseRange && angle < 120) {
        ctx.drawImage(waxing_gibbous, moonimage, moonimage);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Waxing Gibbous", moontextX, moontextY);
    }
    else if (angle >= 120 && angle < 150) {
        ctx.drawImage(waxing_gibbous2, moonimage, moonimage);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Waxing Gibbous", moontextX, moontextY);
    }
    else if (angle >= 150 && angle <= 180-mouseRange) {
        ctx.drawImage(waxing_gibbous3, moonimage, moonimage);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Waxing Gibbous", moontextX, moontextY);
    }
    
    else if (angle > 180-mouseRange && angle < 180+mouseRange) {
        ctx.drawImage(full_moon, moonimage, moonimage);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Full Moon", moontextX, moontextY);
    }
    
    else if (angle >= 180+mouseRange && angle < 210) {
        ctx.drawImage(waning_gibbous, moonimage, moonimage);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Waning Gibbous", moontextX, moontextY);
    }
    else if (angle >= 210 && angle < 240) {
        ctx.drawImage(waning_gibbous2, moonimage, moonimage);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Waning Gibbous", moontextX, moontextY);
    }
    else if (angle >= 240 && angle <= 270-mouseRange) {
        ctx.drawImage(waning_gibbous3, moonimage, moonimage);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Waning Gibbous", moontextX, moontextY);
    }
    
    else if (angle > 270-mouseRange && angle < 270+mouseRange) {
        ctx.drawImage(third_quarter, moonimage, moonimage);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Third Quarter", moontextX, moontextY);
    }
    
    else if (angle >= 270+mouseRange && angle < 300) {
        ctx.drawImage(waning_crescent, moonimage, moonimage);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Waning Crescent", moontextX, moontextY);
    }
    else if (angle >= 300 && angle < 330) {
        ctx.drawImage(waning_crescent2, moonimage, moonimage);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Waning Crescent", moontextX, moontextY);
    }
    else if (angle >= 330 && angle <= 360-mouseRange) {
        ctx.drawImage(waning_crescent3, moonimage, moonimage);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Waning Crescent", moontextX, moontextY);
    }
    
    else {
        ctx.drawImage(new_moon, moonimage, moonimage);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("New Moon", moontextX, moontextY);
    }
}

function fractionMaker(num) {
    if (currentAngle <= 0+mouseRange) {
        return "0";
    }
    else if (currentAngle <= 45+mouseRange && currentAngle >= 45-mouseRange) {
        return "1/8";
    }
    else if (currentAngle <= 90+mouseRange && currentAngle >= 90-mouseRange) {
        return "1/4";
    }
    else if (currentAngle <= 135+mouseRange && currentAngle >= 135-mouseRange) {
        return "3/8";
    }
    else if (currentAngle <= 180+mouseRange && currentAngle >= 180-mouseRange) {
        return "1/2";
    }
    else if (currentAngle <= 225+mouseRange && currentAngle >= 225-mouseRange) {
        return "5/8";
    }
    else if (currentAngle <= 270+mouseRange && currentAngle >= 270-mouseRange) {
        return "3/4";
    }
    else if (currentAngle <= 315+mouseRange && currentAngle >= 315-mouseRange) {
        return "7/8";
    }
    else if (currentAngle >= 360-mouseRange) {
        return "1";
    }
    else {
        return "&nbsp";
    }
}

function fractionReadout(angle) {
    if (fractionOverlay) {
        document.getElementById("fractionR").innerHTML = fractionMaker(angle);
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#ffff00";
        ctx.arc(0, 0, orbitRadius+3, -radians(angle), 0);
        ctx.moveTo(p[currentAngle].x-293-offsetX, p[currentAngle].y-293-offsetY);
        ctx.lineTo(0, 0);
        ctx.moveTo(p[0].x-285-offsetX, p[0].y-293-offsetY);
        ctx.lineTo(0, 0);
        ctx.stroke();
        ctx.closePath();
        if (!daysOverlay) {
            ctx.beginPath();
            ctx.lineWidth = 125;
            ctx.strokeStyle = "rgba(255, 255, 0, 0.2)";
            ctx.arc(0, 0, orbitRadius-62, -radians(angle), 0);
            ctx.stroke();
            ctx.closePath;
        }
        else {
            ctx.beginPath();
            ctx.lineWidth = 113;
            ctx.strokeStyle = "#339933";
            ctx.arc(0, 0, orbitRadius-62, -radians(angle), 0);
            ctx.stroke();
            ctx.closePath;
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = "#ffff00";
            ctx.moveTo(p[currentAngle].x-293-offsetX, p[currentAngle].y-293-offsetY);
            ctx.lineTo(0, 0);
            ctx.moveTo(p[0].x-285-offsetX, p[0].y-293-offsetY);
            ctx.lineTo(0, 0);
            ctx.stroke();
            ctx.closePath();
        }
    }
    else {
        document.getElementById("fractionR").innerHTML = "&nbsp";
    }
}

function daysReadout(angle) {
    if (daysOverlay) {
        document.getElementById("daysR").innerHTML = angle+'&#176;';
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#0066ff";
        ctx.arc(0, 0, orbitRadius-3, -radians(angle), 0);
        ctx.moveTo(p[currentAngle].x-293-offsetX, p[currentAngle].y-293-offsetY);
        ctx.lineTo(0, 0);
        ctx.moveTo(p[0].x-291-offsetX, p[0].y-293-offsetY);
        ctx.lineTo(0, 0);
        ctx.stroke();
        ctx.closePath();
        if (!fractionOverlay) {
            ctx.beginPath();
            ctx.lineWidth = 125;
            ctx.strokeStyle = "rgba(0, 102, 255, 0.2)";
            ctx.arc(0, 0, orbitRadius-62, -radians(angle), 0);
            ctx.stroke();
            ctx.closePath;
        }
    }
    else {
        document.getElementById("daysR").innerHTML = "&nbsp";
    }
}
                
function coord(t) {
    this.angle = t;
    this.x = Math.round(r*Math.cos(radians(t)))+405;
    this.y = -Math.round(r*Math.sin(radians(t)))+303;
}
            
const p = [...Array(360).keys()].map(x => new coord(x));
               

