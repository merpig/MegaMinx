import utils from "./utils";
import pieces from "./pieces";
import generatedMoves from "./generatedMoves";
import generatedMoves2 from "./generatedMoves2";
import generateLastEdges from "./generateLastEdges"

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

const revisedSolver = (deca) =>{
    let uGenMoves = generatedMoves;
    let uGenMoves2 = generatedMoves2;

    let updated = false;
    let newEntries = 0;

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
        ["lightbrown","lightpurple","pink"],

        ["white","purple","green"],
        ["purple","orange","red"],
        ["orange","lightgreen","yellow"],
        ["lightgreen","lightbrown","pink"],
        ["lightbrown","white","lightpurple"],


        ["white","purple"],
        ["purple","orange"],
        ["orange","lightgreen"],
        ["lightgreen","lightbrown"],
        ["lightbrown","white"],
    ];

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
    ];

    const lastFiveEdges = [
        ["lightblue","white"],
        ["lightblue","purple"],
        ["lightblue","orange"],
        ["lightblue","lightgreen"],
        ["lightblue","lightbrown"]
    ];

    let solveIndex = 0;
    let moveSets = [];

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

        // First, check if the piece is already solved
        if(checkAll(allPieces,solveIndex)){
            solveIndex++;
        }

        // Then, check if moves exist for the piece at it's current position
        else if(uGenMoves[startKeys]&&uGenMoves[startKeys][startValues]){
            utils.updateDeca(uGenMoves[startKeys][startValues],deca);
            moveSets.push(...uGenMoves[startKeys][startValues]);
            solveIndex++;
        }

        // If no set of moves exists the puzzle configuration is invalid
        else {
            break;
        }
    }

    
    if(solveOrder.length>solveIndex){
        console.log("Unsolvable arrangement.")
        moveSets = ["error"].concat(moveSets);
        return moveSets;
    }

    else {
        // Solve top half here
        let allPieces = pieces(deca);
        let newKey = "";
        let edges = [];

        for(let i = 0; i < lastFiveEdges.length; i++){
            let pieceToSolve = utils.findPiece(allPieces,lastFiveEdges[i])[0];
            edges[i]=pieceToSolve;
            let pKeys = Object.keys(pieceToSolve).map(key=>colorNames.indexOf(key)+1);
            let pVals = Object.values(pieceToSolve).map(val=>colorNames.indexOf(val)+1);
            newKey += (newKey===""?"":"_") + pKeys.concat(pVals).join("_");
            //console.log(pieceToSolve,newKey);
        }
        if(!uGenMoves2[newKey]) {
            generateLastEdges(edges);
            //uGenMoves2[newKey] = 1;
        }
        else {
            uGenMoves2[newKey]++;
        }

        //console.log(uGenMoves2[newKey])
        //console.log(uGenMoves2)
    }
    
    moveSets.reverse();
    let reversedMoves = moveSets.map(move=>move.includes("'")?move.replace("'",""):move+"'");
    utils.updateDeca(reversedMoves,deca);
    moveSets.reverse();
    
    // if(updated) {
    //     console.log("New entries",newEntries)
    //     let tempKeys = Object.keys(uGenMoves).sort()
    //     console.log(uGenMoves)
    //     console.log(tempKeys.map(key=>[key, Object.keys(uGenMoves[key]).length] ));
        
        
    //     TextFile(uGenMoves);
    // }
    // else{
        
    //     let tempKeys = Object.keys(uGenMoves).sort()
    //     console.log(uGenMoves)
    //     console.log(tempKeys.map(key=>[key, Object.keys(uGenMoves[key]).length] ));

    //     console.log("No new entries")
    // }
    return moveSets;
}

export default revisedSolver;