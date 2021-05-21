

let blueStar = (piece,index) => {
    console.log("------------------------------")
    let moves = [];
    let values = Object.values(piece);
    let keys = Object.keys(piece);
    console.log(piece,index)

    let colorNames = [
        "blue",     // 1
        "pink",     // 2 pink
        "yellow",   // 3
        "red",      // 4
        "green",    // 5
        "lightpurple",  // 6 light purple
        "lightblue",  // 7 light blue
        "lightbrown",  // 8 light brown
        "lightgreen",  // 9 light green
        "orange",   // 10
        "purple",   // 11
        "white"     // 12
    ]

    if(values.includes("blue")&&values.includes("green")){

        console.log("solver for blue green here")
        
        if(index<5){
            let sideToTurn = colorNames.indexOf(keys.filter(side=>side!=="blue")[0])+1;
            if(piece.blue==="blue") moves.push("1");
            else {
                if(keys.includes("lightpurple")){
                    moves.push(`${sideToTurn}'`)
                }
                else {
                    moves.push(`${sideToTurn}`)
                }
            }
        }

        else if(index<10){ 

            let sideToTurn = colorNames.indexOf(keys.filter((key,i)=>values[i]!=="blue")[0])+1;
            if(index===5){
                if(sideToTurn===5) moves.push(`${sideToTurn}'`);
                else moves.push(`${sideToTurn}`);
            }
            if(index===6){
                if(sideToTurn===4) moves.push(`${sideToTurn}'`);
                else moves.push(`${sideToTurn}`);
            }
            if(index===7){
                if(sideToTurn===3) moves.push(`${sideToTurn}'`);
                else moves.push(`${sideToTurn}`);
            }
            if(index===8){
                if(sideToTurn===2) moves.push(`${sideToTurn}'`);
                else moves.push(`${sideToTurn}`);
            }
            if(index===9){
                if(sideToTurn===6) moves.push(`${sideToTurn}'`);
                else moves.push(`${sideToTurn}`);
            }

        }

        else if(index<20){
            let sideToTurn = colorNames.indexOf(keys.filter(key=>colorNames.indexOf(key)<6)[0])+1;
            let direction = index%2?"":"'";
            moves.push(sideToTurn+direction);
        }

        else if(index<25){
            let indexKeys = keys.map(key=>colorNames.indexOf(key)+1);
            let sideToTurn = Math.max(...indexKeys);

            if(indexKeys.includes(8)&&indexKeys.includes(12)){
                sideToTurn = 8;

            }
            moves.push(`${sideToTurn}`);
        }

        else if(index<30){
            let indexKeys = keys.map(key=>colorNames.indexOf(key)+1);
            let sideToTurn = indexKeys.filter(key=>key!==7)[0];
            moves.push(`${sideToTurn}`);
        }
    }
    else if(values.includes("blue")&&values.includes("red")){
        if(index<5){
            let indexOfBlue = keys.indexOf('blue');

            // Blue sticker is on blue side
            if(keys[indexOfBlue]===values[indexOfBlue]){
                if(index===2){
                    let set = ["5","1'","5'"];
                    moves.push(...set);
                }
                else if(index===3){
                    let set = ["5","1'","1'","5'"];
                    moves.push(...set);
                }
                else if(index===4){
                    let set = ["5","1","1","5'"];
                    moves.push(...set);
                }
            }
            else {
                if(index===1){
                    let set = ["4","1'","5","1"];
                    moves.push(...set);
                }
                else if(index===2){
                    let set = ["3","4"];
                    moves.push(...set);
                }
                else if(index===3){
                    let set = ["2","1","3","1'"];
                    moves.push(...set);
                }
                else if(index===4){
                    let set = ["6'","1'","5'","1"];
                    moves.push(...set);
                }
            }
            console.log(keys,values)
        }
        else if(index<10){
            let indexOfBlue = values.indexOf("blue");
            let face = keys.filter((key,i)=>i!==indexOfBlue)[0];
            let faceToTurn = colorNames.indexOf(face)+1;
            console.log(faceToTurn)
            if(index===5){
                if(faceToTurn===5){
                    let set = ["1'","5'","1"];
                    moves.push(...set);
                }
                else {
                    let set = ["1'","1'","6","1","1"];
                    moves.push(...set);
                }
            }
            else if(index===6){
                console.log(faceToTurn); 
                if(faceToTurn===4){
                    let set = [`${faceToTurn}'`];
                    moves.push(...set);
                }
                else{
                    let set = ["1'",`${faceToTurn}`,"1"];
                    moves.push(...set);
                }
            }
            else if(index===7){
                if(faceToTurn===3){
                    let set = ["1",`${faceToTurn}'`,"1'"];
                    moves.push(...set);
                } else {
                    let set = [`${faceToTurn}`];
                    moves.push(...set);
                }
            }
            else if(index===8){
                if(faceToTurn===2){
                    let set = ["1","1",`${faceToTurn}'`,"1'","1'"];
                    moves.push(...set);
                } else {
                    let set = ["1",`${faceToTurn}`,"1'"];  
                    moves.push(...set);
                }
            }
            else if(index===9){
                if(faceToTurn===6){
                    let set = ["1","1","1",`${faceToTurn}'`,"1'","1'","1'"];
                    moves.push(...set);
                } else {
                    let set = ["1","1",`${faceToTurn}`,"1'","1'"];  
                    moves.push(...set);
                }
            }
        }
        else if(index<20){
            
            let topSide = colorNames.indexOf(keys.filter(key=>colorNames.indexOf(key)>5)[0])+1;
            let bottomSide = colorNames.indexOf(keys.filter(key=>colorNames.indexOf(key)<6)[0])+1;

            if(index%2){
                console.log("checking middle layer",topSide,bottomSide)
                let rightOfBottomSide = bottomSide>2?bottomSide-1:6;
                let set = [`${rightOfBottomSide}`,`${topSide}'`,`${rightOfBottomSide}'`];
                console.log(set)
                moves.push(...set);
            }
            else {
                let leftOfBottomSide = bottomSide<6?bottomSide+1:2;
                let set = [`${leftOfBottomSide}'`,`${topSide}`,`${leftOfBottomSide}`];
                moves.push(...set);
            }
        }
        else if(index<25){
            let sideToTurn = Math.max(...keys.map(key=>colorNames.indexOf(key)))+1;
            if(sideToTurn===12&&keys.includes("lightbrown")) sideToTurn=8;
            console.log(sideToTurn);
            let set = [`${sideToTurn}`];
            moves.push(...set);
        }
        else {
            let sideToTurn = colorNames.indexOf(keys.filter(key=>key!=="lightblue")[0])+1;
            let set = [`${sideToTurn}`];
            moves.push(...set);
        }
    }
    else if(values.includes("blue")&&values.includes("yellow")){
        if(index<5){
            if(index===2){
                let set=["3'","1","2'","1'"];
                moves.push(...set);
            }
        }
        else if(index<10){

        }
        else if(index<20){
            
            let topSide = colorNames.indexOf(keys.filter(key=>colorNames.indexOf(key)>5)[0])+1;
            let bottomSide = colorNames.indexOf(keys.filter(key=>colorNames.indexOf(key)<6)[0])+1;

            if(index%2){
                console.log("checking middle layer",topSide,bottomSide)
                let rightOfBottomSide = bottomSide>2?bottomSide-1:6;
                let set = [`${rightOfBottomSide}`,`${topSide}'`,`${rightOfBottomSide}'`];
                console.log(set)
                moves.push(...set);
            }
            else {
                let leftOfBottomSide = bottomSide<6?bottomSide+1:2;
                let set = [`${leftOfBottomSide}'`,`${topSide}`,`${leftOfBottomSide}`];
                moves.push(...set);
            }
        }
        else if(index<25){
            let sideToTurn = Math.max(...keys.map(key=>colorNames.indexOf(key)))+1;
            if(sideToTurn===12&&keys.includes("lightbrown")) sideToTurn=8;
            console.log(sideToTurn);
            let set = [`${sideToTurn}`];
            moves.push(...set);
        }
        else {
            let sideToTurn = colorNames.indexOf(keys.filter(key=>key!=="lightblue")[0])+1;
            let set = [`${sideToTurn}`];
            moves.push(...set);
        }
    }
    else if(values.includes("blue")&&values.includes("pink")){
        if(index<5){

        }
        else if(index<10){
            
        }
        else if(index<20){
            
            let topSide = colorNames.indexOf(keys.filter(key=>colorNames.indexOf(key)>5)[0])+1;
            let bottomSide = colorNames.indexOf(keys.filter(key=>colorNames.indexOf(key)<6)[0])+1;

            if(index%2){
                console.log("checking middle layer",topSide,bottomSide)
                let rightOfBottomSide = bottomSide>2?bottomSide-1:6;
                let set = [`${rightOfBottomSide}`,`${topSide}'`,`${rightOfBottomSide}'`];
                console.log(set)
                moves.push(...set);
            }
            else {
                let leftOfBottomSide = bottomSide<6?bottomSide+1:2;
                let set = [`${leftOfBottomSide}'`,`${topSide}`,`${leftOfBottomSide}`];
                moves.push(...set);
            }
        }
        else if(index<25){
            let sideToTurn = Math.max(...keys.map(key=>colorNames.indexOf(key)))+1;
            if(sideToTurn===12&&keys.includes("lightbrown")) sideToTurn=8;
            console.log(sideToTurn);
            let set = [`${sideToTurn}`];
            moves.push(...set);
        }
        else {
            let sideToTurn = colorNames.indexOf(keys.filter(key=>key!=="lightblue")[0])+1;
            let set = [`${sideToTurn}`];
            moves.push(...set);
        }
    }
    else if(values.includes("blue")&&values.includes("lightpurple")){
        if(index<5){

        }
        else if(index<10){
            
        }
        else if(index<20){
            
            let topSide = colorNames.indexOf(keys.filter(key=>colorNames.indexOf(key)>5)[0])+1;
            let bottomSide = colorNames.indexOf(keys.filter(key=>colorNames.indexOf(key)<6)[0])+1;

            if(index%2){
                console.log("checking middle layer",topSide,bottomSide)
                let rightOfBottomSide = bottomSide>2?bottomSide-1:6;
                let set = [`${rightOfBottomSide}`,`${topSide}'`,`${rightOfBottomSide}'`];
                console.log(set)
                moves.push(...set);
            }
            else {
                let leftOfBottomSide = bottomSide<6?bottomSide+1:2;
                let set = [`${leftOfBottomSide}'`,`${topSide}`,`${leftOfBottomSide}`];
                moves.push(...set);
            }
        }
        else if(index<25){
            let sideToTurn = Math.max(...keys.map(key=>colorNames.indexOf(key)))+1;
            if(sideToTurn===12&&keys.includes("lightbrown")) sideToTurn=8;
            console.log(sideToTurn);
            let set = [`${sideToTurn}`];
            moves.push(...set);
        }
        else {
            let sideToTurn = colorNames.indexOf(keys.filter(key=>key!=="lightblue")[0])+1;
            let set = [`${sideToTurn}`];
            moves.push(...set);
        }
    }

    console.log(moves)
    return moves;
}

export default blueStar;