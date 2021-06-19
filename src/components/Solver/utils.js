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

    checkAll : (allPieces,index) => {
        let valid = false;
        for(let i = 0; i<=index;i++){
            let pieceToSolve = utils.findPiece(allPieces,utils.solveOrder[i])[0];

            let pieceKeys = Object.keys(pieceToSolve);
            let pieceValues = Object.values(pieceToSolve);
            let solvedPairs = pieceKeys.filter((sticker,i)=>sticker===pieceValues[i]);
            valid = solvedPairs.length===pieceKeys.length&&solvedPairs.length>0;
            if(!valid) break;
        }
        return valid;
    },

    checkFull : (allPieces) => {
        let valid = true;
        for(let i = 0; i<utils.solveOrderFull.length;i++){
            let pieceToSolve = utils.findPiece(allPieces,utils.solveOrderFull[i])[0];

            let pieceKeys = Object.keys(pieceToSolve);
            let pieceValues = Object.values(pieceToSolve);
            let solvedPairs = pieceKeys.filter((sticker,i)=>sticker===pieceValues[i]);
            valid = solvedPairs.length===pieceKeys.length&&solvedPairs.length>0;
            if(!valid) break;
        }
        return valid;
    },

    reverseMove: move => {
        return move.split('').includes("'")?move.replace("'",""):move+"'"
    },

    solveOrder: [
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
        ["lightbrown","white"]
    ],
    solveOrderFull: [
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

        ["lightblue","white"],
        ["lightblue","purple"],
        ["lightblue","orange"],
        ["lightblue","lightgreen"],
        ["lightblue","lightbrown"],

        ["lightblue","lightbrown","white"],
        ["lightblue","lightgreen","lightbrown"],
        ["lightblue","orange","lightgreen"],
        ["lightblue","purple","orange"],
        ["lightblue","white","purple"]
    ],
    colorNames: [
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
    ],

    faceColors: [
        "#015be3",     // 1
        "#ff80ce",     // 2 pink
        "yellow",   // 3
        "red",      // 4
        "green",    // 5
        "#c585f7",  // 6 light purple

        "#4fc3f7",  // 7 light blue
        "#C39B77",  // 8 light brown
        "#64dd17",  // 9 light green
        "orange",   // 10
        "#BE00FE",   // 11
        "white"     // 12
    ]
}

export default utils;