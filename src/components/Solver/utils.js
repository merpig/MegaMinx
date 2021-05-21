import swapColors from "./swapColors";

const utils = {
    updateDeca : (moveSet,deca) => {
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
        return [piece,index];
    },

    isSolved: piece => {
        let pieceKeys = Object.keys(piece);
        let pieceValues = Object.values(piece);
        let solvedPairs = pieceKeys.filter((sticker,i)=>sticker===pieceValues[i]);
        return solvedPairs.length===pieceKeys.length;
    },

    reverseMove: move => {
        console.log(move);
        return move.split('').includes("'")?move.replace("'",""):move+"'"
    }
}

export default utils;