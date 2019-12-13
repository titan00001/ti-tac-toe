import {judge} from "./judge.js"


// var x = test("Sahil")
// console.log(x);

window.choice = -1;
window.conf = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

var comment = document.querySelector(".comment");

function display(msg){

    comment.innerHTML = msg;
}


// ||==========================||
// ||    x = 1     o = 0       ||
// ||==========================||


function setChoice(ch){

    window.choice = ch;
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


function updatePlayground(choice, tileID){

    var tile = document.querySelector("#"+tileID)
            
    if(choice == 1){
        tile.style.backgroundImage = "url('images/tic-tac-toe-x.png')";
        
    }
    

    else if(choice == 0){
        tile.style.backgroundImage = "url('images/tic-tac-toe-o.png')";
    }

    else {
        display("<p> No tile is chosen<br> Choose one of the tile to continue </p>");

    }


    tile.style.backgroundSize = "cover";
    tile.style.backgroundPosition = "center center";

    window.conf[tileID.charAt(tileID.length-1)-1] = choice;

    console.log(judge(conf))


}

function chooseTile(){


    document.querySelector(".playground").addEventListener('click', function(e){

        if(e.target.className != 'tiles'){
            console.log("choose a tile");
            updatePlayground()
        }
            

        console.log(e.target.id);
        updatePlayground(choice, e.target.id)
        
    }, { once : true});

}


display("<p> welcome to The game<br> Choose one of the coin to continue </p>");


        
function play(){
    


    choose();

    document.addEventListener('click', function(){
        chooseTile();
    });
    
    

    // var list = [0, 0, 1, 0, 1, 1, 0, 1, 0];
    // console.log(judge(list));

    

}

play()


