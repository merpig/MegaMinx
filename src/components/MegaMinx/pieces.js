const pieces = (decaObject,type) => {

    const pieces = {
        corners : [],
        edges : []
    }

    let colorFace = {
        blue: "face1",
        pink: "face2",
        yellow: "face3",
        red: "face4",
        green: "face5",
        lightpurple: "face6",
        lightblue: "face7",
        lightbrown: "face8",
        lightgreen: "face9",
        orange: "face10",
        purple: "face11",
        white: "face12",
    }

    let hexToColorName = {
        "0000ff":"blue",
        "ff80ce":"pink",
        "ffff00":"yellow",
        "ff0000":"red",
        "008000":"green",
        "c585f7":"lightpurple",
        "4fc3f7":"lightblue",
        "c39b77":"lightbrown",
        "64dd17":"lightgreen",
        "ffa500":"orange",
        "800080":"purple",
        "ffffff":"white",
    }

    let getColor = (color,piece) => 
        hexToColorName[decaObject[colorFace[color]]
            .front[piece]
            .material
            .color
            .getHexString()];

    // Corner piece 1 of 20
    pieces.corners.push({
        blue: getColor("blue",3),
        lightpurple: getColor("lightpurple",7),
        green: getColor("green",9)
    });

    // Corner piece 2 of 20
    pieces.corners.push({
        blue: getColor("blue",5),
        green: getColor("green",7),
        red: getColor("red",9)
    });

    pieces.corners.push({
        blue: getColor("blue",7),
        red: getColor("red",7),
        yellow : getColor("yellow",9)
    });

    pieces.corners.push({
        blue: getColor("blue",9),
        yellow: getColor("yellow",7),
        pink : getColor("pink",9)
    });

    pieces.corners.push({
        blue: getColor("blue",11),
        pink: getColor("pink",7),
        lightpurple : getColor("lightpurple",9)
    });

    return type?pieces[type]:pieces;

}

export default pieces;