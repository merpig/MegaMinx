import utils from "./utils";
import pieces from "./pieces";
import generatedMoves from "./generatedMoves";
import generateLastEdges from "./generateLastEdges"


const revisedSolver = (deca) =>{
    let uGenMoves = generatedMoves;

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
        let edges = [];

        for(let i = 0; i < lastFiveEdges.length; i++){
            let pieceToSolve = utils.findPiece(allPieces,lastFiveEdges[i])[0];
            edges[i]=pieceToSolve;
        }
        let blueStarMoves = generateLastEdges(edges);
        utils.updateDeca(blueStarMoves,deca);
        moveSets.push(...blueStarMoves);
    }
    
    moveSets.reverse();
    let reversedMoves = moveSets.map(move=>move.includes("'")?move.replace("'",""):move+"'");
    utils.updateDeca(reversedMoves,deca);
    moveSets.reverse();
    
    return moveSets;
}

export default revisedSolver;