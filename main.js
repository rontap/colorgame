function $(call) {  return document.querySelector(call);        }
function $$(call) {  return document.querySelectorAll(call);    }
function rand()  {  return Math.round(Math.random() * 255);     }
function D(one,two) { return Math.abs( one - two ); }  //returns difference
Array.prototype.sum = function() {//want 
    var c=0;
    for (x = 0; x < this.length; x++) c = c + this[x];
    return c;
}


//vars
var left, right ;           //arrays holding the original values
var dst, altRight;          //left-right distance.  altRight is current color
var difficulty;
speed=120;                  //the current speed, dependent on level
space = false;              //is space pressed or clicked
loopI=0;                    //gameloop i variable
level=1;
points=0;                   //only increasing, used for  highscore

slowDownVar = 1;
giftActiveList=[false,false,false,false]; //do not write to this array, use isGiftActive instead
doomActiveList=[0,0];      //do not write to this array, use isDoomActive instead
gameStart = false;
scoreInLevels = [];         //saves how many score you had
lastRecord="";
//powerup affected VARs
timeBetweenLevels = 500 ;   //between levels gap
playtime = 0;               //game played for seconds 


//game difficulty changer 0 = RARE 1 = MEDIUM 2 = DONE 3 = WELL-DONE MIT KÁTCHUP 
loopvar = {
    score : [2500,2000,1500,1250],                 //tokens; life
    mainSpeed :[150,120,100,80],                   //the game main 
    speedGrowth :[2,1.8,1.7,1.5],
    giftOccurrance :[7,10,13,16],
    doomOccurrance : [18,15,12,9],
    doomLength : [4,5,6,7],
    slowDownChange : [1.8,1.6,1.4,1.2]
}

function setDifficulty(setDiff) {       //this HAS to run to init the game!  
   Object.keys(loopvar).forEach(function(key) {
   loopvar[key]=loopvar[key][setDiff];
   difficulty=setDiff;
  })
  setDifficulty=function(){};
}

//Lifesaver,redo color, slow down, nothing
function leftColor() {
    left = [rand() , rand(), rand() ];
      $("#left").style.background =  "rgb(" + left[0] + ", " + left[1] + ", " + left[2] + ")";
}
function rightColor() {
    right = [rand() , rand(), rand() ]
      $("#right").style.background =  "rgb(" + right[0] + ", " + right[1] + ", " + right[2] + ")";
}


// returns the value if call is not set
function isGiftActive(nth,call) {
    
    call = typeof(call) == 'undefined' ? null : call;
    if (call==null) return giftActiveList[nth];
    else {
        giftActiveList[nth]=call;
        if (call) $('fab:nth-child('+(nth+1)+')').classList.remove('hidden');
        else  $('fab:nth-child('+(nth+1)+')').classList.add('hidden');
    }

    if (giftActiveList[2] == true) {  //slowdowngame
        slowDownVar = loopvar.slowDownChange;
        setTimeout(function() {
            slowDownVar = 1;
            isGiftActive(2,false);
        }, 10000)
    }
}

function isDoomActive(nth,call) {
    
    if ( doomActiveList[nth]>0 )  $('body').classList.add('doom'+(nth))
    else  $('body').classList.remove('doom'+(nth))
    
    
    call = typeof(call) == 'undefined' ? null : call;
    if (call==null) 
        if (doomActiveList[nth]>0) return doomActiveList[nth]-- ;
        else return  doomActiveList[nth]=0 ;
    else doomActiveList[nth]=call;
 
}

function run() {
    $('body').classList.add('ingame');
    if (level > 1) leftColor();
    else changeActiveTabCall(0);
    rightColor();
    dst=[left[0] - right[0], left[1] - right[1], left[2] - right[2]];
    loop(); //main game loop
}
function doTheCombo() {
    //create combo!! here ago pls
}
function userAction(call) {
        if (!gameStart) {
            gameStart = true;
            floor.classList.add("hide");
            difficulty_selector.classList.add("hide");
            additional_info.classList.add("hide");
            setDifficulty(call);
            randomisedSpeed=loopvar.mainSpeed;
            run();
            
        } else {
            space = true;
        }
}

function isMaxHue() {   // if all of the hues have reached max
    reachedEnd=0;
    for (i in altRight) {
        if ((altRight[i]<0)||(altRight[i]>255))  reachedEnd++;
    }
    if (reachedEnd==3) return true
    else return false
}

function showStatistic() {
    $('#pointsStatistic').classList.add('on');
    proc=100/scoreInLevels.length;
    max=Math.max(...scoreInLevels);
    temp="";
    for (i=0;i<scoreInLevels.length;i++) {
        temp+="<div style='left:"+proc*i+"%; width:"+proc+"%; height:"+Math.floor(scoreInLevels[i]/max*100)+"%;' >"+scoreInLevels[i]+"</div>";
    }
    pointsStatistic.innerHTML=temp;
    
    //adds button to return to home page
    $("#returnHome").style.display = "block";
    $("#returnHome").onclick = function() { window.location.reload(); }
}


function changeActiveTabCall(call) {
   $$('footer span').forEach(function(elem){
       elem.classList.remove('on');
   });
   $$('container').forEach(function(elem){
       elem.classList.remove('on');
   });
   $$('footer span')[call].classList.add('on');
   $$('container')[call].classList.add('on');
}
function changeActiveTab(event) {
   spanOnClickVar = ($$('footer span').indexOf(event.path[0]));
   changeActiveTabCall(spanOnClickVar);
}
//evil code FUCKING EMCASCRIPT WRITERS
NodeList.prototype.indexOf = function(element) {
    ArrayObj = new Array( ...this);
    return ArrayObj.indexOf(element);
}




//window controls 


function initGameField() {
    left = [rand() , rand(), rand() ];
    $("#right").style.background="rgb(" + left[0] + ", " + left[1] + ", " + left[2] + ")";
    $("#left").style.background=$("#right").style.background;
}

function highScore() {
    if (localStorage.topscore < points || localStorage.topscore == undefined) {
        localStorage.topscore = points;
    }
    topscore.innerHTML = localStorage.topscore;
}


//changes the method of interaction based on device (desktop/laptop, mobile/tablet)
function deviceWidth() {
    if (isMobileBrowser() ) {
        $("#score").innerHTML = "Tap the screen to begin<br>";
        $("#left").onclick = function()  {
            userAction(0);
        }
        $("#right").onclick = function()  {
           userAction(0);
        }
    }
    else  {
        $("#score").innerHTML = "Press the spacebar to begin<br>";
        window.onkeypress = function(event) {
            if (event.keyCode == 32)   {
                event.preventDefault();
                userAction(0);
            }
        }
    } 
}



function isMobileBrowser() { 
 if (
    navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

initGameField();
highScore();
deviceWidth();

/* Trophies

default (zero)

+15% bonus time/effect lalala
-15% negative time/effect lalala
Bonus to Combo-s
starts at 50  level

+25% bonus AND +10% negative
starts with 1000 extra points
5% chance to auto-perfect
pause button

starts at 100 level
+10% positive AND -10% negative
more time between levels


insane difficuty
zen mode

*/


