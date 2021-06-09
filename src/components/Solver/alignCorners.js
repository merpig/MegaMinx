
const alignCorners = corners => {

    const moves = [];
    let cornersInPlace = 0;
    let corner1 = "lightbluelightbrownwhite";
    let corner2 = "lightbluelightbrownlightgreen";

    let corner1pos = Object.keys(corners[0]).sort().join("");
    let corner2pos = Object.keys(corners[1]).sort().join("");
    let corner3pos = Object.keys(corners[2]).sort().join("");

    let corner1InPlace = corner1===corner1pos;
    let corner2InPlace = corner2===corner2pos;

    let reverseMoves = set => set.slice().reverse().map(e=>e.includes("'")?e.replace("'",""):e+"'")
    let basePerm = (a,b) => {
        return [
            "7",`${a}`,"7'","7'",`${b}'`,"7","7",`${a}'`,"7'","7'",`${b}`,"7"
        ]
    }

    for(const corner of corners){
        let place = Object.keys(corner).sort().join("");
        let piece = Object.values(corner).sort().join("");
        let inPlace = place===piece;
        if (inPlace) cornersInPlace++;
    }

    if(cornersInPlace===5) {
        return moves;
    }
    else if(corner1InPlace&&corner2InPlace){
        let perm = basePerm(12,9);
        if(corner3pos === "lightblueorangepurple"){
            return perm;
        }
        else {
            return reverseMoves(perm);
        }
    }
    else if (corner1InPlace&&!corner2InPlace){
        let perm1 = basePerm(11,8);
        let perm2 = basePerm(12,9)

        // 3 Places it can be
        switch(corner2pos){
            case "lightblueorangepurple":
                return reverseMoves(perm1);
            case "lightbluepurplewhite":
                return perm2;
            case "lightbluelightgreenorange":
                return perm1;
            default:
        }
    }
    else if (!corner1InPlace&&corner2InPlace){
        // 3 Places it can be

        let perm1 = basePerm(12,9);
        let perm2 = basePerm(8,10);
        switch(corner1pos){
            case "lightbluelightgreenorange":
                return perm1;
            case "lightbluepurplewhite":
                return reverseMoves(perm2);
            case "lightblueorangepurple":
                return perm2;
            default:
        }
    }
    else {
        let perm1 = basePerm(9,11);
        let perm2 = basePerm(10,12);
        let perm3 = basePerm(8,10);
        // 4 Places it can be
        switch(corner1pos){
            case "lightbluelightbrownlightgreen":
                return perm1;
            case "lightbluelightgreenorange":
                return reverseMoves(perm2);
            case "lightblueorangepurple":
                return perm3;
            case "lightbluepurplewhite":
                return reverseMoves(perm3);
            default:
        }
    }

    return moves;
}

export default alignCorners;