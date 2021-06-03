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
        console.log("Top star finished.");
        return [];
    }
    else if(edgeWithTwoAdj){
        console.log(edgeWithTwoAdj);
        console.log("Moves for 3 adjacent blue top");
    }
    else if(edgeWithNoAdj){
        console.log(edgeWithNoAdj);
        if(blueTopCount===1){
            console.log("Moves for only 1 blue top");
        }
        else if(blueTopCount===3){
            console.log("Moves for arrow blue top");
        }
    }

    //console.log(edges)
    console.log("Number of lightblue on top: ", blueTopCount);
}

export default generateLastEdges;