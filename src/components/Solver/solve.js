import blueStar from "./blueStar";
import pieces from "./pieces";
import swapColors from "./swapColors";
import utils from "./utils";

let solve = decaObject => {
    let flattened = Object.values(decaObject).map(set=>Object.values(set)).flat(2).filter(mesh=>mesh.side);
    let extractedColors = [...flattened.map(mesh=>mesh.material.color)];

    let solveState = 0;
    let solveIndex = 0;

    let moves = [];

    let setSolveState = () => solveState++;
    
    let solveOrder = [
        ["green","blue"],
        ["red","blue"],
        ["yellow","blue"],
        ["pink","blue"],
        ["lightpurple","blue"]
    ]

    while (solveIndex<solveOrder.length){
        let allPieces = pieces(decaObject);
        let pieceToSolve = utils.findPiece(allPieces,solveOrder[solveIndex]);
        if(utils.isSolved(pieceToSolve[0])){
            console.log("Piece solved: ",JSON.stringify(pieceToSolve[0]))
            solveIndex++;
        }
        else if(solveIndex<5){
                let set = blueStar(...pieceToSolve);
                if(set[0]) utils.updateDeca(set,decaObject);
                set[0]?moves.push(...set):solveIndex++; 
        }
    }

    moves.reverse();
    let reversedMoves = moves.map(move=>move.includes("'")?move.replace("'",""):move+"'");
    utils.updateDeca(reversedMoves,decaObject);
    moves.reverse();

    return moves;
}

export default solve;