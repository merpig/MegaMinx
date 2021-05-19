import blueStar from "./blueStar";
import pieces from "./pieces";
import swapColors from "./swapColors";

let solve = decaObject => {
    let flattened = Object.values(decaObject).map(set=>Object.values(set)).flat(2).filter(mesh=>mesh.side);
    let extractedColors = [...flattened.map(mesh=>mesh.material.color)];


    console.log(extractedColors);
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

    let allPieces = pieces(decaObject);
    
    let findPiece = (pieceArray,pieceToFind) => {
        let piece = [];
        let index = 0;
        if(pieceToFind.length===2){
            for(let i = 0; i<pieceArray.edges.length; i++){
                let tempPiece = Object.values(pieceArray.edges[i]);
                if(tempPiece.includes(pieceToFind[0])&&tempPiece.includes(pieceToFind[1])){
                    piece = pieceArray.edges[i];
                    index = i;
                    break;
                }
            }
        }
        return [piece,index];
    }

    let updateCopy = (moveSet,deca) => {
        moveSet.forEach(move=>{
            let speed=move.includes("'")?1:-1;
            let face="face"+move.replace("'","");
            console.log(speed,face);
            swapColors(face,deca,speed);
        })
    }
 
    let isSolved = piece => {
        console.log(piece);
        let pieceKeys = Object.keys(piece);
        let pieceValues = Object.values(piece);
        let solvedPairs = pieceKeys.filter((sticker,i)=>sticker===pieceValues[i]);
        return solvedPairs.length===pieceKeys.length;
    }

    while (solveIndex<solveOrder.length){
        let allPieces = pieces(decaObject);
        let pieceToSolve = findPiece(allPieces,solveOrder[solveIndex]);

        if(isSolved(pieceToSolve[0])){
            console.log("Piece solved: ",JSON.stringify(pieceToSolve[0]))
            solveIndex++;
        }
        else if(solveIndex<5){
                let set = blueStar(...pieceToSolve);
                if(set[0]) updateCopy(set,decaObject);
                set[0]?moves.push(...set):solveIndex++; 
        }
    }


    let reversedMoves = 
        moves
        .reverse()
        .map(move=>move.includes("'")?move.replace("'",""):move+"'");
    
    updateCopy(reversedMoves,decaObject)

    return moves;
}

export default solve;