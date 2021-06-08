

const solveStar = edges => {

    const moves = [];
    let solved = 0;
    let edgeValues = [];
    let edgeKeys = [];
    let joinedValues = "";

    let turns = {
        "U" : "7",
        "U'" : "7'",

        "R" : "11",
        "R'" : "11'",

        "L" : "8",
        "L'" : "8'",

        "F" : "12",
        "F'" : "12'"
    }
 
    
    let reverseMoves = set => set.slice().reverse().map(e=>e.includes("'")?e.replace("'",""):e+"'")
    let parseMoveSet = set => {
        let newSet = [];
        set.replaceAll("(","").replaceAll(")","").split(" ").forEach(e=>{
            if(e.includes("2")){
                let newE = e.replace("2","");
                newSet.push(newE,newE);
            }
            else newSet.push(e);
        });
        return newSet
    }

    //console.log(parseMoveSet("R2 U2' R2' U' R2 U2' R2'"));

    // Permutation set 1 of 5
    let perm1 = "whitepurplelightgreenlightbrownorange";
    let perm2 = "whitepurplelightbrownorangelightgreen";
    let perm1Solve = [
        ["L'", "U'", "L", "L", "F", "L'", "U'", "L'", "U", "L", "F'", "L'", "U", "L"]
        .map(move=>turns[move]),
    ]
    let perm2Solve = [
        reverseMoves(perm1Solve[0])
    ]
    
    // Permutation set 2 of 5
    let perm3 = "whitelightgreenorangelightbrownpurple";
    let perm4 = "whitelightbrownorangepurplelightgreen";
    let perm3Solve = [
        ["R","R","U'","U'","R'","R'","U'","R","R","U'","U'","R'","R'"]
            .map(move=>turns[move]),
    ];
    let perm4Solve = [
        reverseMoves(perm3Solve[0])
    ];

    
    let perm7 = "whitelightgreenpurpleorangelightbrown";
    let perm8 = "whiteorangelightgreenpurplelightbrown";
    let perm7Solve = [
        parseMoveSet("(R U R' U) (R' U' R2 U') (R' U R' U) R U2'")
        .map(move=>turns[move]),
    ];
    let perm8Solve = [
        reverseMoves(perm7Solve[0])
    ];
    
    // Permutation set 3 of 5
    let perm5 = "whiteorangepurplelightbrownlightgreen";
    let perm6 = "whitelightgreenlightbrownpurpleorange";
    let perm5Solve = [
        parseMoveSet("(R U R' F') (R U R' U') (R' F R2 U' R')")
            .map(move=>turns[move]),
        perm1Solve[0]
    ];
    let perm6Solve = [
        perm1Solve[0],
        perm8Solve[0]
    ];

    let perm9 = "whitelightbrownlightgreenorangepurple";
    let perm9Solve = [
        perm1Solve[0],
        perm3Solve[0]
    ];

    let perm10 = "whiteorangelightbrownlightgreenpurple";
    let perm11 = "whitelightbrownpurplelightgreenorange";
    let perm10Solve = [
        parseMoveSet("L2' U2' L2 U' L2' U2' L2")
            .map(move=>turns[move]),
    ];
    let perm11Solve = [
        reverseMoves(perm10Solve[0])
    ];

    edges.map(edge=> delete edge.lightblue)
    edges.forEach(e=>{ 
        if(Object.keys(e)[0]===e[Object.keys(e)[0]]) solved++;
        edgeValues.push(e[Object.keys(e)[0]]);
        edgeKeys.push(Object.keys(e)[0]);
    });
    joinedValues = edgeKeys.join("");

    if(solved===5) {
        console.log("Solved!")
        return moves;
    }
    else if(perm1===joinedValues) {
        console.log("perm1");
        return perm1Solve.flat(2);
    }
    else if(perm2===joinedValues) {
        console.log("perm2");
        return perm2Solve.flat(2);
    }
    else if(perm3===joinedValues){
        console.log("perm3");
        return perm3Solve.flat(2);
    }
    else if(perm4===joinedValues){
        console.log("perm4");
        return perm4Solve.flat(2);
    }
    else if (perm5===joinedValues){
        console.log("perm5");
        return perm5Solve.flat(2);
    }
    else if (perm6===joinedValues){
        console.log("perm6");
        return perm6Solve.flat(2);
    }
    else if (perm7===joinedValues){
        console.log("perm7");
        return perm7Solve.flat(2);
    }
    else if (perm8===joinedValues){
        console.log("perm8");
        return perm8Solve.flat(2);
    }
    else if (perm9===joinedValues){
        console.log("perm9");
        return perm9Solve.flat(2);
    }
    else if (perm10===joinedValues){
        console.log("perm10");
        return perm10Solve.flat(2);
    }
    else if (perm11===joinedValues){
        console.log("perm11");
        return perm11Solve.flat(2);
    }

    console.log(edgeKeys);
    console.log(joinedValues)
    console.log(solved);

    return moves;

}

export default solveStar;