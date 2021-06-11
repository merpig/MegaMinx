
const solveCorners = corners => {
    const moves = [];
    let solved = 0;
    let cornerAtFirstPos;
    for(const corner of corners){
        if(!Object.keys(corner).length) return [];
        if(corner.lightblue==="lightblue") solved++;
        if(Object.keys(corner).sort().join("")==="lightbluelightbrownwhite"){
            cornerAtFirstPos=corner;
        }
    }
    let keys = Object.keys(cornerAtFirstPos).sort().join("");
    let vals = Object.values(cornerAtFirstPos).sort().join("");

    if(solved===5) {
        if(keys===vals) return moves;
        return ["7"];
    }

    if(cornerAtFirstPos.lightblue==="lightblue"){
        return ["7"];
    }
    else {
        return ["12'","6'","12","6","12'","6'","12","6"];
    }

}

export default solveCorners;