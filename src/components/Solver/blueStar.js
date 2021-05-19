

let blueStar = (piece,index) => {
    let moves = [];
    let values = Object.values(piece);
    console.log(piece,index)

    if(values.includes("blue")&&values.includes("green")){
        console.log("solver for blue green here")
        if(index<5){
            if(piece.blue==="blue") moves.push("1")
        }
    }

    console.log(moves)
    console.log("------------------------------")
    return moves;
}

export default blueStar;