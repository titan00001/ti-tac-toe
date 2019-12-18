import {judge} from "./judge.js";
import {getBestMove} from "./opponent.js";


window.choice = -1;
window.opponentChoice = -1;
window.conf = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
var dataSet = [-1, -1, -1, -1, -1, -1, -1, -1, -1,];
var move = 0;


var comment = document.querySelector(".comment");

function display(msg){

    comment.innerHTML = msg;
}


// ||==========================||
// ||    x = 1     o = 0       ||
// ||==========================||


function setChoice(ch){

    window.choice = ch;
    window.opponentChoice = ch ^ 1;
    console.log(window.choice)
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
        tile.style.backgroundImage = "url('images/tic-tac-toe-x.png')";
        
    }   else if(ch == 0)    {
        tile.style.backgroundImage = "url('images/tic-tac-toe-o.png')";
    }



    tile.style.backgroundSize = "cover";
    tile.style.backgroundPosition = "center center";

    window.conf[tileID.charAt(tileID.length-1)-1] = ch;
    dataSet[tileID.charAt(tileID.length-1)-1] = move; move++;

}

function chooseTile(){


    document.querySelector(".playground").addEventListener('click', function(e){

        // if player clicks on tile without a coin
        if(choice !== -1){
            
            let t = e.target.id;
            if(conf[t.charAt(t.length-1)-1] === -1){

                updatePlayground(choice, e.target.id);
                play();
                console.log("choose your tile")
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
        console.log("Judge: "+judge(conf)+"conf: "+conf)
        if(judge(conf) === opponentChoice){
            console.log(judge(conf)+" is winner");
            console.log(dataSet);
            restart();
        }


    } else if(judge(conf) === -2){

        console.log("The Game is tied");
        console.log(dataSet);
        restart();
    }

    else if(judge(conf) === choice){

        console.log(judge(conf)+" is winner");
        console.log(dataSet);
        restart();
    }

}


display("<p> welcome to The game<br> Choose one of the coin to continue </p>");

function restart(){

    document.getElementById("result")
    
}
        
function start(){
    


    choose();

    document.querySelector(".playground").addEventListener('click', function(){
        chooseTile();
    });
    
    

    // var list = [0, 0, 1, 0, 1, 1, 0, 1, 0];
    // console.log(judge(list));

    

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