// Generates 25 random moves
// Rules:
// 1. No more than 3 of the same move in a row
// 2. No move immediately inversed (more advanced checking later)
const scramble = () => {
    let moves = [];

    while(moves.length<25){
        const lastIndex = moves.length-1;
        const secondToLastIndex = moves.length-2;

        let randomFace = Math.floor(Math.random() * 12)+1;
        let randomDir  = Math.floor(Math.random() * 2);

        let move = `${randomFace}${randomDir?"":"'"}`;
        let inverse = `${randomFace}${randomDir?"'":""}`;

        if(inverse===moves[lastIndex]){
            // No move added
        }
        else if(moves.length>2){
            if (move===moves[lastIndex]&&
                move===moves[secondToLastIndex]){
                    // No move added
            }
            else {
                moves.push(move)
            }
        }
        else {
            moves.push(move)
        }
    }
    return moves;
}

export default scramble;