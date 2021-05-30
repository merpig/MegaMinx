import utils from "./utils";
import pieces from "./pieces";
import generatedMoves from "./generatedMoves";

const TextFile = (genMoves) => {
    const element = document.createElement("a");
    //console.log(JSON.stringify(genMoves));
    let start = "const generatedMoves = ";
    let end = "; export default generatedMoves;";
    const file = new Blob([start + JSON.stringify(genMoves) + end], {type: 'js'});
    element.href = URL.createObjectURL(file);
    //element.download = "generatedMoves.js";
    file.text().then(text => console.log(text));
    //document.body.appendChild(element); // Required for this to work in FireFox
    //element.click();
}

const inefficientSolver = (deca) =>{
    let uGenMoves = generatedMoves;
    let updated = false;
    let newEntries = 0;
    let allMoves = [
        // "1",
        // "1'",
        "2",
        "2'",
        "3",
        "3'",
        "4",
        "4'",
        "5",
        "5'",
        "6",
        "6'",

        "7",
        "7'",
        "8",
        "8'",
        "9",
        "9'",
        "10",
        "10'",
        "11",
        "11'",
        "12",
        "12'",
    ];

    let solveOrder = [
        ["green","blue"],
        ["red","blue"],
        ["yellow","blue"],
        ["pink","blue"],
        ["lightpurple","blue"],

        ["lightpurple","green","blue"],
        ["green","red","blue"],
        ["red","yellow","blue"],
        ["yellow","pink","blue"],
        ["pink","lightpurple","blue"],

        ["lightpurple","green"],
        ["green","red"],
        ["red","yellow"],
        ["yellow","pink"],
        ["pink","lightpurple"],

        ["green","white"],
        ["green","purple"],
        ["red","purple"],
        ["red","orange"],
        ["yellow","orange"],
        ["yellow","lightgreen"],
        ["pink","lightgreen"],
        ["pink","lightbrown"],
        ["lightpurple","lightbrown"],
        ["lightpurple","white"],

        ["white","green","lightpurple"],
        ["purple","red","green"],
        ["orange","yellow","red"],
        ["lightgreen","pink","yellow"],
        ["lightbrown","lightpurple","pink"]
    ]

    let solveIndex = 0;

    let maxValue = allMoves.length - 1;
    let moveSets = [];
    let maxMoveLength = 3;
    let tempMaxLength = 1;
    let counterSum = 0;
    let totalIterations = 0;

    let checkAll = (allPieces,index) => {
        let valid = false;
        for(let i = 0; i<=index;i++){
            let pieceToSolve = utils.findPiece(allPieces,solveOrder[i]);
            if(utils.isSolved(pieceToSolve[0])){
                valid=true;
            }
            else return false;
        }
        return valid
    }

    // stop when all the counters in moveCounters reaches 23*maxMoveLength
    while (solveIndex<solveOrder.length){
        let allPieces = pieces(deca);
        let pieceToSolve = utils.findPiece(allPieces,solveOrder[solveIndex]);
        let startKeys = Object.keys(pieceToSolve[0]).join("");
        let startValues = Object.values(pieceToSolve[0]).join("");
        let possibleMoves = [];
        let checkMoves = false;
        let pieceSolved = false;

        console.log("------------------")
        console.log("Solve Index: ",solveIndex)
        console.log("Piece to solve:", pieceToSolve[0]);

        // First, check if the piece is already solved
        if(checkAll(allPieces,solveIndex)){
            console.log("Piece already solved!")
            solveIndex++;
        }

        // Then, check if moves exist for the piece at it's current position
        else if(uGenMoves[startKeys]&&uGenMoves[startKeys][startValues]){
            utils.updateDeca(uGenMoves[startKeys][startValues],deca);
            console.log("Solve set already exists!");
            moveSets.push(...uGenMoves[startKeys][startValues]);
            solveIndex++;
        }

        // If no set of moves exists create a set of moves to solve the piece
        else {
            console.log("No solved set found, generating moves..."); 

            // Check all possible moves, ranging from length 1 to maxMoveLength
            while (counterSum!==maxValue*maxMoveLength&&!pieceSolved){

                // Stop after maxMoveLength to prevent infinite loop
                if(tempMaxLength>maxMoveLength) {
                    console.log("Depth search taking too long.");
                    if(!checkMoves) solveIndex=solveOrder.length;
                    break;
                }

                console.log("Search depth: ",tempMaxLength);
        
                // keeps track of the current moveSet
                // Ex for a move length of 3:
                // start: [ 0 , 0 , 0 ]
                // end:   [ 23, 23, 23]
                let moveCounters = [];
                for(let i = 0; i<tempMaxLength;i++) moveCounters[i]=0;
                let moveCountLength = moveCounters.length-1;

                while (moveCounters.reduce((a,b)=>a+b)<=maxValue*tempMaxLength&&!pieceSolved){
                    let tempMoveSet = [];
                    for(let i = 0;i<tempMaxLength;i++) {
                        tempMoveSet[i] = allMoves[moveCounters[i]];
                    }

                    let noAdd = false; 

                    // Spins the gears on moveCounter
                    if(moveCounters.reduce((a,b)=>a+b)===maxValue*tempMaxLength);
                    else if(moveCounters[moveCountLength]===maxValue&&tempMaxLength>1){
                        for(let i = tempMaxLength-1;i>0;i--){
                            if(moveCounters[i]===maxValue){
                                if(i===tempMaxLength-1) {
                                    noAdd=true;
                                    moveCounters[i] = 0;
                                }
                                else moveCounters[i] = 0;
                                if(moveCounters[i-1] === maxValue);
                                else{
                                    moveCounters[i-1]++;
                                    i=0;
                                }
                            }
                        }
                    }
{
                    // trim sets or subsets with 3 or more of the same turn in a row
                    // if(moveCounters.length>=3){
                    //     let tempCounters = [...moveCounters];
                    //     for(let i = 0; i<= tempMaxLength-3; i++){
                    //         if(tempCounters[i]===tempCounters[i+1]&&tempCounters[i]===tempCounters[i+2]){
                    //             if(i===0&&tempCounters[i]===maxValue) break;
                    //             noAdd = true;
                    //             for(let j = i+3; j<tempCounters.length; j++){
                    //                 tempCounters[j]=0;
                    //             }
                    //             for(let k = i+2;k>=0;k--){
                    //                 if(tempCounters[k]<maxValue) {
                    //                     tempCounters[k]++;
                    //                     break;
                    //                 }
                    //                 else {
                    //                     tempCounters[k]=0;
                    //                 }
                    //             }

                    //             moveCounters = [...tempCounters];
                    //         }
                    //     }
                    // }
}
                    if(!noAdd)moveCounters[tempMaxLength-1]++;

                    totalIterations++;
                    //console.log(tempMoveSet)
                    utils.updateDeca(tempMoveSet,deca);
                    allPieces = pieces(deca);
                    pieceToSolve = utils.findPiece(allPieces,solveOrder[solveIndex]);
                    let tempPieceKeys = Object.keys(pieceToSolve[0]).join("");
                    let tempPieceVals = Object.values(pieceToSolve[0]).join("");
                    if(checkAll(allPieces,solveIndex)){
                        moveSets.push(...tempMoveSet)
                        console.log("Solved!");
                        console.log("Move Set:",tempMoveSet);

                        console.log("New moveset, updating uGenMoves");
                        updated=true;
                        newEntries++;

                        if(startKeys===startValues);

                        else if(uGenMoves[startKeys]){
                            uGenMoves[startKeys][startValues] = tempMoveSet;
                            
                        }

                        else {
                            uGenMoves[startKeys] = {};
                            uGenMoves[startKeys][startValues] = tempMoveSet;
                        }

                        solveIndex++;
                        tempMaxLength=1;
                        pieceSolved = true;
                        checkMoves=false;
                        break;
                    }
                    else {
                        // Check is an existing move subset works from this position
                        if(uGenMoves[tempPieceKeys]&&uGenMoves[tempPieceKeys][tempPieceVals]){
                            
                            let possibleSubset = uGenMoves[tempPieceKeys][tempPieceVals];

                            utils.updateDeca(possibleSubset,deca);
                            allPieces = pieces(deca);
                            pieceToSolve = utils.findPiece(allPieces,solveOrder[solveIndex]);
                            tempMoveSet.push(...possibleSubset);
                            if(checkAll(allPieces,solveIndex)){
                                possibleMoves[possibleMoves.length] = tempMoveSet;
                                checkMoves=true;
                            }        
                        }
                        tempMoveSet.reverse();
                        let reversedMoves = tempMoveSet.map(move=>move.includes("'")?move.replace("'",""):move+"'");
                        utils.updateDeca(reversedMoves,deca);
                        allPieces = pieces(deca);
                        pieceToSolve = utils.findPiece(allPieces,solveOrder[solveIndex]);
                    }
                    
                }
                
                if(pieceSolved) break;
{
                // let lastMoves = [];
                // for(let i = 0;i<tempMaxLength;i++) {
                //     lastMoves.push(allMoves[moveCounters[i]]);
                // }
                // utils.updateDeca(lastMoves,deca);
                // allPieces = pieces(deca);
                // pieceToSolve = utils.findPiece(allPieces,solveOrder[solveIndex]);
                // let tempPieceKeys = Object.keys(pieceToSolve[0]).join("");
                // let tempPieceVals = Object.values(pieceToSolve[0]).join("");
                // if(utils.isSolved(pieceToSolve[0])){
                //     moveSets.push(...lastMoves)
                //     console.log("Move Set:",lastMoves);

                //     console.log("New moveset, updating uGenMoves");
                //     updated=true;
                //     newEntries++;
                //     if(startKeys===startValues);
                //     else if(uGenMoves[startKeys]){
                //         uGenMoves[startKeys][startValues] = lastMoves;
                //     }
                //     else {
                //         uGenMoves[startKeys] = {};
                //         uGenMoves[startKeys][startValues] = lastMoves;
                //     }

                //     solveIndex++;
                //     tempMaxLength=1;
                //     pieceSolved = true;
                //     checkMoves=false;
                //     break;
                // }
                // else {
                //     // Check if an existing move subset works from this position
                //     if(uGenMoves[tempPieceKeys]&&uGenMoves[tempPieceKeys][tempPieceVals]){
                            
                //         let possibleSubset = uGenMoves[tempPieceKeys][tempPieceVals];

                //         utils.updateDeca(possibleSubset,deca);
                //         allPieces = pieces(deca);
                //         pieceToSolve = utils.findPiece(allPieces,solveOrder[solveIndex]);
                //         lastMoves.push(...possibleSubset);

                //         if(checkAll(allPieces,solveIndex)){
                //             possibleMoves.push(lastMoves);
                //             checkMoves=true;
                //         }        
                //     }
                //     lastMoves.reverse();
                //     let reversedMoves = lastMoves.map(move=>move.includes("'")?move.replace("'",""):move+"'");
                //     utils.updateDeca(reversedMoves,deca);
                //     allPieces = pieces(deca);
                // }
}
                counterSum=moveCounters.reduce((a,b)=>a+b);
                totalIterations++;
                tempMaxLength++;
            }
        }

        if(checkMoves){

            let currentIndex = solveIndex;
            let currentPiece = solveOrder[solveIndex];
            possibleMoves.filter(set=>{
                utils.updateDeca(set,deca);
                allPieces = pieces(deca);
                pieceToSolve = utils.findPiece(allPieces,currentPiece);
                set.reverse();
                let reversedMoves = set.map(move=>move.includes("'")?move.replace("'",""):move+"'");
                utils.updateDeca(reversedMoves,deca);
                return checkAll(allPieces,currentIndex);
            });
            let bestMove = possibleMoves.sort((a,b)=>a.length-b.length)[0]

            moveSets.push(...bestMove)

            utils.updateDeca(bestMove,deca);
            allPieces = pieces(deca);
            pieceToSolve = utils.findPiece(allPieces,currentPiece);

            console.log("Subset found!")
            console.log(bestMove);

            console.log("New moveset, updating uGenMoves");
            updated=true;
            newEntries++;
            if(startKeys===startValues);
            else if(uGenMoves[startKeys]){
                uGenMoves[startKeys][startValues] = bestMove;
            }
            else {
                uGenMoves[startKeys] = {};
                uGenMoves[startKeys][startValues] = bestMove;
            }

            solveIndex++;
            tempMaxLength=1;
            pieceSolved = true;
            checkMoves=false;
            break;
        }
    }
    console.log("Total searches:",totalIterations);

    moveSets.reverse();
    let reversedMoves = moveSets.map(move=>move.includes("'")?move.replace("'",""):move+"'");
    utils.updateDeca(reversedMoves,deca);
    moveSets.reverse();


    let totalMoves = 275 + 265 + 225 + 175 + 125 + 44 + 41 + 38 + 35 + 32;
    if(updated) {
        console.log("New entries",newEntries)
        let tempKeys = Object.keys(uGenMoves).sort()
        console.log(uGenMoves)
        console.log(tempKeys.map(key=>[key, Object.keys(uGenMoves[key]).length] ));
        
        
        TextFile(uGenMoves);
        console.log((tempKeys.map(key=>Object.keys(uGenMoves[key]).length).reduce((a,b)=>a+b)/totalMoves*100).toFixed(2)+"% of piece postions solved")
        console.log("Moves left to solve:",totalMoves - tempKeys.map(key=>Object.keys(uGenMoves[key]).length).reduce((a,b)=>a+b));
    }
    else{
        
        let tempKeys = Object.keys(uGenMoves).sort()
        console.log(uGenMoves)
        console.log(tempKeys.map(key=>[key, Object.keys(uGenMoves[key]).length] ));

        console.log("No new entries")
        console.log((tempKeys.map(key=>Object.keys(uGenMoves[key]).length).reduce((a,b)=>a+b)/totalMoves*100).toFixed(2)+"% of piece postions solved")
        console.log("Moves left to solve:",totalMoves - tempKeys.map(key=>Object.keys(uGenMoves[key]).length).reduce((a,b)=>a+b));
    }
    return moveSets;
}

export default inefficientSolver;