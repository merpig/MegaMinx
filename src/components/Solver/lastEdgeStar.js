const colorNames = [
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
];

let rightEdge = (edge,edges) => {
    let side = Object.keys(edge).filter(side=>side!=="lightblue")[0];
    let sideNumber = colorNames.indexOf(side)+1;
    let rSideNumber = sideNumber-1;
    if(rSideNumber===7) rSideNumber=12;
    let rightSideEdge = edges.filter(edge=>edge[colorNames[rSideNumber-1]])[0];
    return rightSideEdge.lightblue==="lightblue";
}

let leftEdge = (edge,edges) => {
    let side = Object.keys(edge).filter(side=>side!=="lightblue")[0];
    let sideNumber = colorNames.indexOf(side)+1;
    let lSideNumber = sideNumber+1;
    if(lSideNumber===13) lSideNumber=8;
    let lightSideEdge = edges.filter(edge=>edge[colorNames[lSideNumber-1]])[0];
    return lightSideEdge.lightblue==="lightblue";
}

const generateLastEdges = edges => {
    let blueTopCount = 0;
    let edgeWithTwoAdj = null;
    let edgeWithNoAdj = null;

    edges.forEach(edge=>{
        if(edge.lightblue==="lightblue") {
            if(rightEdge(edge,edges) && leftEdge(edge,edges)){
                edgeWithTwoAdj=edge;
            }
            else if(!rightEdge(edge,edges) && !leftEdge(edge,edges)){
                edgeWithNoAdj=edge;
            }
            blueTopCount++;
        }
    });

    if(blueTopCount===5){
        return [];
    }
    else if(edgeWithTwoAdj){
        console.log(edgeWithTwoAdj);
        let tempKey = Object.keys(edgeWithTwoAdj).filter(side=>side!=="lightblue")[0];
        let sideNum = colorNames.indexOf(tempKey)+1;
        let front = sideNum-2;
        let right = sideNum-3;
        if(front<8) front+=5;
        if(right<8) right+=5;
        let moves = [`${front}`,"7",`${right}`,"7'",`${right}'`,`${front}'`];
        return moves;
    }
    else if(edgeWithNoAdj){
        let tempKey = Object.keys(edgeWithNoAdj).filter(side=>side!=="lightblue")[0];
        let sideNum = colorNames.indexOf(tempKey)+1;
        if(blueTopCount===1){
            let front = sideNum-1;
            let right = sideNum-2;
            if(front<8) front+=5;
            if(right<8) right+=5;
            let moves = [`${front}`,`${right}`,"7","7",`${right}'`,`${right}'`,`${front}`,`${right}`,`${front}'`,"7'","7'",`${front}'`];
            return moves;
        }
        else if(blueTopCount===3){
            let leftSide = sideNum+1;
            if(leftSide>12) leftSide-=5;
            let moves = [`${leftSide}`,`${sideNum}`,"7",`${sideNum}'`,"7'",`${leftSide}'`];
            return moves;
        }
    }
    else return ["error"];

    return [];
}

export default generateLastEdges;