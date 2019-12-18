// configuration is configurationiguration of playground
// configuration = [0,-1,0, 1,1,-1, -1,-1,-1] =>    0  -1   0
                                        //     1   1  -1
                                        //    -1  -1  -1

const winningConfiguration = [[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]];

function isComplete(configuration){

    let i = 0;
    while(i < 9){
        if(configuration[i] == -1){
            return false;
        }

        i++;
    }
    return true;

}

// -1 = not completed 0 = o won 1 = x won -2: tie

export function judge(configuration){


    for(let i of winningConfiguration){
        
        let p = i[0], q = i[1], r = i[2];

        if((configuration[p] === configuration[q]) && (configuration[p] === configuration[r]) && (configuration[p] !== -1)){
            return configuration[p];
        }

    }

    if(isComplete(configuration) === false){
        return -1;
    }

    return -2;
}

export function test(name){

    console.log("hello " + name);
    return "Success";
}