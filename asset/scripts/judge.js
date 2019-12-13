// conf is configuration of playground
// conf = [0,-1,0, 1,1,-1, -1,-1,-1] =>    0  -1   0
                                        //     1   1  -1
                                        //    -1  -1  -1

const w = [[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]]
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


    for(let i of w){
        
        let p = i[0], q = i[1], r = i[2];

        if((conf[p] === conf[q]) && (conf[p] === conf[r]) && (conf[p] !== -1)){
            return conf[p];
        }

    }

    return -1;
}

export function test(name){

    console.log("hello " + name);
    return "Success";
}