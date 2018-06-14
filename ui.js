//-------------------------------
//-UI-ELEMENTS-------------------
//-------------------------------

function showStatistic(points) {
    $('#pointsStatistic').classList.add('on');
    proc=100/scoreInLevels.length;
    max=Math.max(...scoreInLevels);
    temp="";
    for (i=0;i<scoreInLevels.length;i++) {
        temp+="<div class=succ_"+colorInLevels[i]+" style='left:"+proc*i+"%; width:"+proc+"%; height:"+Math.floor(scoreInLevels[i]/max*100)+"%;' data-number="+scoreInLevels[i]+"</div>";
    }
    pointsStatistic.innerHTML=temp;

    //prints value of points
    $("#pointsStatisticValue").style.display="block";
    $("#pointsStatisticValue").innerHTML="Points: "+points;

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

function initGameField() {
    left = [rand() , rand(), rand() ];
    $("#right").style.background="rgb(" + left[0] + ", " + left[1] + ", " + left[2] + ")";
    $("#left").style.background=$("#right").style.background;
}

function deviceWidth() {
    if (isMobileBrowser() ) {
        $("#score").innerHTML = "Tap the screen to begin<br>";
        $("#left").onclick = () =>   userAction(/*Difficulty*/1)
        $("#right").onclick = () =>  userAction(/*Difficulty*/1)
    }
    else  {
        $("#score").innerHTML = "Press the spacebar to begin<br>";
        window.onkeypress = function(event) {
            if (event.keyCode == 32)   {
                event.preventDefault();
                userAction(/*Difficulty*/1);
            }
        }
    }
}


///
function confirmCheat() {
  test = prompt("Enter Cheat Activation Code");
  if (test == "15152") {
        alert('Powerups Unlocked');
        localStorage.achieveList="11111111111";
        localStorage.cheatMode = '1';
        location.reload()
    }
}
