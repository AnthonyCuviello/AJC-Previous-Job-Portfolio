/* Weather Module Simulation: Weather Forecast
Designed for use with ACMES Module 2.3 Weather
Montclair State University 
Original NetLogo version by Toni York, Summer 2019
Javascript conversion by Anthony Cuviello, Fall 2019

This note relates to the original NetLogo version
; re-uses some of the code from the Chance of Rain simulation from the same module
; mostly in the weather icons and visuals for the animation, for consistency
*/

/*Stuff from NetLogo info tab
//What is it?
=============================================================================================================
This is a simulation of a weather forecasting tool that can be run for different numbers of data points in order to generate rain forecasts for different data sets. The data sets and forecasting tool are fake. The purpose of the simulation is to see how the forecast improves as the number of data points is increased. This is similar to a classic coin tossing experiment.

//How to use it
=============================================================================================================
Choose a Data Set and a Run Size and then click Run to generate results. Click Clear to reset the results and graph.

//How to cite
=============================================================================================================
If you mention this model or the NetLogo software in a publication, we ask that you include the citations below.

For the simulation itself:
    - ACMES Group (2019). Weather Forecast NetLogo Simulation. Assimilating Computational and Mathematical Thinking into Earth and Environmental Science. Montclair State University, Montclair, NJ.

Please cite the NetLogo software as:
    - Wilensky, U. (1999). NetLogo. http://ccl.northwestern.edu/netlogo/. Center for Connected Learning and Computer-Based Modeling, Northwestern University, Evanston, IL.

//Copyright and License
=============================================================================================================
Copyright 2019 ACMES Group at Montclair State University This work is licensed under the GNU GENERAL PUBLIC LICENSE V3. Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed. To view the details of the license, you can visit https://www.gnu.org/licenses/gpl.html.

Acknowledgment This research is supported through a STEM+Computing grant from the Division of Research on Learning of the National Science Foundation (#1742125).

*/

//Vars and Constants
//===================================================
const CANVASSIZE = 400; //Change this to change the size of the animation box (square in px)
const RAINBARIN = "#33adff";
const SUNBARIN = "#ffff80";
const BGCOLOR = "white";

//Canvas Stuff (I made it so the canvas and animations are scalable)
var ctx;
var graphSize = Math.round(CANVASSIZE / 1.2);

var XaxisLeft = graphSize / 3.8461;
var XaxisRight = graphSize * 1.11;
var YaxisTop = graphSize / 16.6666;
var Xaxis = graphSize * 1.06;
var Yaxis = graphSize / 3.2258;

var T1 = Xaxis - (graphSize / 5);
var T2 = T1 - (graphSize / 5);
var T3 = T2 - (graphSize / 5);
var T4 = T3 - (graphSize / 5);
var T5 = T4 - (graphSize / 5);
var tickTxt = graphSize / 4;
var txtOffset = graphSize / 100;
var fontSize = graphSize / 31.25;

var rainyBarX = graphSize / 2.2222;
var sunnyBarX = graphSize / 1.25;
var barWidth = graphSize / 4;
var barXOffset = (barWidth / 5);

//Simulation vars
var RunSize;
var DataSet;
var RunSizeText;

var RainChance;

var count;
var randNum;

var days = {
    sunny : 0,
    rainy : 0
};

var sunnyDays = [];
var rainyDays = [];

var sunnyBarHeight;
var rainyBarHeight;

var scale;

var ticks;
var tickOffset = graphSize / 10;

var rNums;
var sNums;
var LRNums;
var LSNums;

var chunkSize = 1;
var maxTicks;

var animationLength;

var x;
var y;

var pMod;

var sunImg = new Image;
var rainImg = new Image;

var percentSunny;
var percentRainy;

function init() {
    //Get canvas context
    ctx = document.getElementById('myCanvas').getContext('2d');
    ctx.canvas.width = CANVASSIZE;
    ctx.canvas.height = CANVASSIZE;
    sunImg.src = 'sun.png';
    rainImg.src = 'rain.png';
}

//Animation for the bars on the graph
function BarAnimation(barX, barHeight, barColor) {
    //Clear bars on graph
    ctx.fillStyle=BGCOLOR;
    ctx.fillRect(barX, Xaxis, barWidth, -myCanvas.height);
                
    //Generate bars
    //Border
    ctx.fillStyle="black";
    ctx.fillRect(barX, Xaxis, barWidth, Math.floor(-barHeight));
                
    //Interior
    ctx.fillStyle=barColor;
    ctx.fillRect(barX+1, Xaxis, barWidth-2, Math.floor(-(barHeight-1)));
                
    //Fix x-axis color
    ctx.strokeStyle = "black";
    ctx.moveTo(barX, Xaxis);
    ctx.lineTo(barX+barWidth, Xaxis);
    ctx.stroke();
}

//Generate the graph
function generateGraph() {
    //Clear canvas for next simulation
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    document.getElementById('Sunny').innerHTML = 0;
    document.getElementById('Rainy').innerHTML = 0;
    document.getElementById('PSunny').innerHTML = 0;
    document.getElementById('PRainy').innerHTML = 0;
    
    //Get the run size choice
    RunSize = parseInt(document.getElementById("RunSizeChooser").value);
    
    //Set background color
    ctx.fillStyle=BGCOLOR;
    ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
    
    //Make bar graph frame
    ctx.strokeStyle="black";
    ctx.beginPath();
    
    //y-axis
    ctx.moveTo(Yaxis, Xaxis);
    ctx.lineTo(Yaxis, YaxisTop);
    ctx.stroke();
    //5 tick marks on y-axis
    ctx.moveTo(XaxisLeft, T1);
    ctx.lineTo(XaxisLeft+tickOffset, T1);
    ctx.stroke();
    
    ctx.moveTo(XaxisLeft, T2);
    ctx.lineTo(XaxisLeft+tickOffset, T2);
    ctx.stroke();
    
    ctx.moveTo(XaxisLeft, T3);
    ctx.lineTo(XaxisLeft+tickOffset, T3);
    ctx.stroke();
    
    ctx.moveTo(XaxisLeft, T4);
    ctx.lineTo(XaxisLeft+tickOffset, T4);
    ctx.stroke();
    
    ctx.moveTo(XaxisLeft, T5);
    ctx.lineTo(XaxisLeft+tickOffset, T5);
    ctx.stroke();
    
    //x-axis
    ctx.moveTo(XaxisLeft, Xaxis);
    ctx.lineTo(XaxisRight, Xaxis);
    ctx.stroke();
    
    ctx.moveTo(XaxisLeft, Xaxis);
    ctx.lineTo(XaxisRight, Xaxis);
    ctx.stroke();
    ctx.closePath();
    
    //Put the images below the bars on the graph
    ctx.drawImage(sunImg, sunnyBarX+barXOffset, Xaxis+2, graphSize/7.1429, graphSize/7.8125);
    ctx.drawImage(rainImg, rainyBarX+barXOffset, Xaxis+2, graphSize/7.1429, graphSize/7.8125);
    
    //Number for text that goes next to each tick
    RunSizeText = [RunSize, (RunSize / 5 * 4), (RunSize / 5 * 3), (RunSize / 5 * 2), (RunSize / 5)];
    
    //Text on the left side of the graph
    if (RunSize == 1) {
        ctx.fillStyle = "black";
        ctx.font = fontSize.toString()+"px Verdana";
        ctx.textAlign = "right";
        ctx.fillText("0 day(s)", tickTxt, Xaxis+txtOffset);
        ctx.fillText(RunSizeText[0].toString()+" day(s)", tickTxt, (T5 + txtOffset));
    }
    else {
        ctx.fillStyle = "black";
        ctx.font = fontSize.toString()+"px Verdana";
        ctx.textAlign = "right";
        ctx.fillText("0 day(s)", tickTxt, Xaxis+txtOffset);
        ctx.fillText(RunSizeText[0].toString()+" day(s)", tickTxt, (T5 + txtOffset));
        ctx.fillText(RunSizeText[1].toString()+" day(s)", tickTxt, (T4 + txtOffset));
        ctx.fillText(RunSizeText[2].toString()+" day(s)", tickTxt, (T3 + txtOffset));
        ctx.fillText(RunSizeText[3].toString()+" day(s)", tickTxt, (T2 + txtOffset));
        ctx.fillText(RunSizeText[4].toString()+" day(s)", tickTxt, (T1 + txtOffset));
    }
}

//Get the RainChance from the data set choice
function rainOddsGetter() {
    //Get the data set choice
    DataSet = document.getElementById("DataSetChooser").value;
    
    //Set the chance for rain based on data set choice
    RainChance = 0;
    switch(DataSet) {
        case "DS1":
            RainChance = 30;
            break;
        case "DS2":
            RainChance = 90;
            break;
        case "DS3":
            RainChance = 10;
            break;
        case "DS4":
            RainChance = 75;
            break;
        case "DS5":
            RainChance = 50;
            break;
    }
}

//updates the height for bar animations
function updateChart() {
    if (RunSize > 100) {
        rainyBarHeight = scale * percentRainy;
        sunnyBarHeight = scale * percentSunny;
        BarAnimation(sunnyBarX, sunnyBarHeight, SUNBARIN);
        BarAnimation(rainyBarX, rainyBarHeight, RAINBARIN);
    }
    else {
        rainyBarHeight = scale * rainyDays.length;
        sunnyBarHeight = scale * sunnyDays.length;
        BarAnimation(sunnyBarX, sunnyBarHeight, SUNBARIN);
        BarAnimation(rainyBarX, rainyBarHeight, RAINBARIN);
    }
}

//recalculates the percentrainy and percentsunny
function updatePercents() {
    var percentMod = 1;
    if (RunSize > 100) {
        percentMod = RunSize/100;
    }
    percentRainy = Math.round(days.rainy / (RunSize/100));
    percentSunny = Math.round(days.sunny / (RunSize/100));
}

// generates results based on chosen inputs
// random numbers are generated per chunk size and the chunksize is also used for animations
// rainyDays and sunnyDays arrays are for animation and the days object is the actual numbers
function generate() {
    //get past the transient effect
    var n = 0;
    var m = 0;
    while (n < 100000) {
        n++;
        m *= Math.ceil(Math.random() * 100);
    }
    
    var i = 0;
    while (i<chunkSize) {
        //Simulate numbers
        randNum = Math.ceil(Math.random() * 100);
        if (randNum <= RainChance) {
            if (i % chunkSize == 0) {
                rainyDays.push(1);
            }
            days.rainy++;
        }
        else {
            if (i % chunkSize == 0) {
                sunnyDays.push(1);
            }
            days.sunny++;
        }
        updatePercents();
        i++;
    }
    updateChart();
}

//Clears the canvas
function Clear() {
    ctx = document.getElementById('myCanvas').getContext('2d');
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    
    //Update span tags
    document.getElementById('Rainy').innerHTML = 0;
    document.getElementById('Sunny').innerHTML = 0;
    document.getElementById('PRainy').innerHTML = 0;
    document.getElementById('PSunny').innerHTML = 0;
}

//Runs after hitting the run button, runs the simlulation and animation
function RunSim() {
    Clear();
    
    //Get the run size choice
    RunSize = parseInt(document.getElementById("RunSizeChooser").value);
    
    //Update vars for RNG
    sunnyDays = [];
    rainyDays = [];
    days.sunny = 0;
    days.rainy = 0;
    ticks = 0;
    
    //Set the scale for bar animations
    if (RunSize <= 100) {
        scale = graphSize / RunSize;
    }
    else {
        scale = graphSize / 100;
    }
    
    //Set the chunksize
    maxTicks = RunSize;
    if (maxTicks > 100) {
        chunkSize = RunSize / 100;
        maxTicks = 100;
    }
    else {
        chunkSize = 1;
    }
    
    //Animation interval (Change these values to change the animation speed)
    if (RunSize < 50) {
        animationLength = 200;
    }
    
    else if (RunSize => 50){
        animationLength = 2000/maxTicks;
    }
    
    generateGraph();
    rainOddsGetter();
    
    var id = setInterval(frame, animationLength);
    
    function frame() {
        if (ticks>=maxTicks) {
            document.getElementById('PSunny').innerHTML = 100-percentRainy; // This is to properly display the correct percentSunny
            clearInterval(id);
        }
        else {
            generate();
            document.getElementById('Rainy').innerHTML = days.rainy;
            document.getElementById('Sunny').innerHTML = days.sunny;
            document.getElementById('PRainy').innerHTML = percentRainy;
            document.getElementById('PSunny').innerHTML = percentSunny;
            
            ticks++;
        }
    }
}