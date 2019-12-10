// conf is configuration of playground
// conf = [0,-1,0, 1,1,-1, -1,-1,-1] =>    0  -1   0
                                        //     1   1  -1
                                        //    -1  -1  -1

function isComplete(conf){

    let i = 0;
    while(i < 9){
        if(conf[i] == -1){
            return false;
        }

        i++;
    }
    return true;

}

// -1 = not completed 0 = o won 1 = x won

export function judge(conf){

    let i = 0;

    for(i = 0; i < 9; i = i + 3){

        if(conf[i] == conf[i+1] == conf[i+2]){
            return conf[i];
        }
    }

    for(i = 0; i < 3; i = i + 1){

        if(conf[i] == conf[i+3] == conf[i+6]){
            return conf[i];
        }
    }

    if(conf[i] == conf[i+4] == conf[i+8]){
        return conf[i];
    }

    if(conf[i] == conf[i+2] == conf[i+4]){
        return conf[i];
    }

    if(!isComplete(conf))
        return -1;

}

export function test(name){

    console.log("hello " + name);
    return "Success";
}