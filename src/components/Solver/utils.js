import swapColors from "./swapColors";

const utils = {
    updateDeca : (moveSet,deca) => {
        //console.log(moveSet)
        moveSet.forEach(move=>{
            let speed=move.split('').includes("'")?1:-1;
            let face="face"+move.replace("'","");
            swapColors(face,deca,speed);
        })
    },

    findPiece: (pieceArray,pieceToFind) => {
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
        else if(pieceToFind.length===3){
            for(let i = 0; i<pieceArray.corners.length; i++){
                let tempPiece = Object.values(pieceArray.corners[i]);
                if(tempPiece.includes(pieceToFind[0])&&tempPiece.includes(pieceToFind[1])&&tempPiece.includes(pieceToFind[2])){
                    piece = pieceArray.corners[i];
                    index = i;
                    break;
                }
            }
        }
        return [piece,index];
    },

    isSolved: piece => {
        let pieceKeys = Object.keys(piece);
        let pieceValues = Object.values(piece);
        let solvedPairs = pieceKeys.filter((sticker,i)=>sticker===pieceValues[i]);
        return solvedPairs.length===pieceKeys.length;
    },

    reverseMove: move => {
        return move.split('').includes("'")?move.replace("'",""):move+"'"
    }
}

export default utils;