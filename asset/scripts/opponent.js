
// returns best move depending on state of game


// conf is configuration of playground
// conf = [0,-1,0, 1,1,-1, -1,-1,-1] =>        0  -1   0
                                        //     1   1  -1
                                        //    -1  -1  -1


export function getBestMove(conf){

    let m = 0;
    do  {

        m = Math.floor(Math.random(1)*9);

    }   while(conf[m] !== -1);
    
    
    return m;
}


