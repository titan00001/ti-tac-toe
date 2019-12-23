import {judge} from "./judge.js";
import {getBestMove} from "./opponent.js";


var choice = -1;
var opponentChoice = -1;
var conf = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
var dataSet = [-1, -1, -1, -1, -1, -1, -1, -1, -1,];
var move = 0;

var player1Score = 0;
var player2Score = 0;

const comment = document.querySelector(".comment");

document.querySelector("#result-Btn").addEventListener('click', restart);

function display(msg){

    comment.innerHTML = msg;
}


// ||==========================||
// ||    x = 1     o = 0       ||
// ||==========================||

// player 1 choice
function setChoice(ch){

    choice = ch;
    opponentChoice = ch ^ 1;
    console.log(choice)
    if(ch == 1)     display("<p>Player 1 : X <br/> player 2 : O </p>");

    else if(ch == 0)    display("<p>Player 1 : O <br/> player 2 : X </p>");


}


function choose(){

    document.querySelector(".choose").addEventListener('click', function(event) {
 
        if(event.target.className == "x-mark"){
            setChoice(1)
        }
        else if(event.target.className == "o-mark"){
            setChoice(0)
        }
        
        else {

            display("<p> No coin is chosen<br> Choose one of the coin to continue </p>");
            choose()
        } 

    }, {once : true});


}


function updatePlayground(ch, tileID){

    var tile = document.querySelector("#"+tileID)
            
    if(ch == 1){
        tile.className = "x-mark";
    }

    else if(ch == 0)    {
        tile.className = "o-mark";
    }


    conf[tileID.charAt(tileID.length-1)-1] = ch;
    dataSet[tileID.charAt(tileID.length-1)-1] = ++move;

}

function chooseTile(){


    document.querySelector(".playground").addEventListener('click', function(e){

        // if player clicks on tile without a coin
        if(choice !== -1){
            
            let t = e.target.id;
            if(conf[t.charAt(t.length-1)-1] === -1){

                updatePlayground(choice, e.target.id);
                play();
            }
        }
        
    }, { once : true});

}

function play(){
    // 1 = X    0 = O   -1 = not complete   -2 = draw
    // judge -> opponent -> judge
    if(judge(conf) === -1){

        let m = getBestMove(conf);
        
        conf[m] = opponentChoice;
        
        updatePlayground(opponentChoice, "tile"+(m+1));

        if(judge(conf) === opponentChoice){

            getResult("Computer Won");
            setScore(player1Score, ++player2Score);
            console.log(dataSet);
        }


    } else if(judge(conf) === -2){

        getResult("The Game is tied");
    }

    else if(judge(conf) === choice){

        getResult("You Won");
        setScore(++player1Score, player2Score);  
        console.log(dataSet);
    }

}

function restart() {
    
    let s1 = player1Score;
    let s2 = player2Score;

    document.querySelector(".playground").querySelectorAll(".x-mark").forEach(function (tile) {
        tile.className = "tiles";
    });
    document.querySelector(".playground").querySelectorAll(".o-mark").forEach(function (tile) {
        tile.className = "tiles";
    });

    start()

    setScore(s1,s2);

}

function setScore(scoreP1, scoreP2) {
    document.querySelector("#ptsPlayer1").innerHTML = scoreP1;
    document.querySelector("#ptsPlayer2").innerHTML = scoreP2;
}

function getResult(msg){

    document.getElementById("result").style.display = "block";
    document.getElementById("result-dialog").innerText = msg;

}
        
function start(){
    

    setScore(player1Score, player2Score);
    document.getElementById("result").style.display = "none";

    display("<p> welcome to The game<br> Choose one of the coin to continue </p>");

    choice = -1;
    opponentChoice = -1;
    conf = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    dataSet = [-1, -1, -1, -1, -1, -1, -1, -1, -1,];
    move = 0;

    choose();

    document.querySelector(".playground").addEventListener('click', function(){
        chooseTile();
    });

}

start()

// Single player mode:
// start -> choose => chooseTile => updatePlayground
//                          play => judge => opponentMove => updatePlayground => judge - "Won"/"Lost" => STOP
//                                                                                      chooseTile

// Two player Mode:
// start => choose => player1.chooseTile => updatePlayground 
//                              play => judge => player2.chooseTile => updatePlayground => judge - "Won"/"Lost" => STOP
//                                                                                              player1.chooseTile