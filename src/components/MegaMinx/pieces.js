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

    // Corner piece 3 of 20
    pieces.corners.push({
        blue: getColor("blue",7),
        red: getColor("red",7),
        yellow : getColor("yellow",9)
    });

    // Corner piece 4 of 20
    pieces.corners.push({
        blue: getColor("blue",9),
        yellow: getColor("yellow",7),
        pink : getColor("pink",9)
    });

    // Corner piece 5 of 20
    pieces.corners.push({
        blue: getColor("blue",11),
        pink: getColor("pink",7),
        lightpurple : getColor("lightpurple",9)
    });

    // Corner piece 6 of 20
    pieces.corners.push({
        white: getColor("white",3),
        green: getColor("green",11),
        lightpurple : getColor("lightpurple",5)
    });

    // Corner piece 7 of 20
    pieces.corners.push({
        purple: getColor("purple",3),
        red: getColor("red",11),
        green : getColor("green",5)
    });

    // Corner piece 8 of 20
    pieces.corners.push({
        orange: getColor("orange",3),
        yellow: getColor("yellow",11),
        red : getColor("red",5)
    });

    // Corner piece 9 of 20
    pieces.corners.push({
        lightgreen: getColor("lightgreen",3),
        pink: getColor("pink",11),
        yellow : getColor("yellow",5)
    });

    // Corner piece 10 of 20
    pieces.corners.push({
        lightbrown: getColor("lightbrown",3),
        lightpurple: getColor("lightpurple",11),
        pink : getColor("pink",5)
    });

    // Corner piece 11 of 20
    pieces.corners.push({
        green: getColor("green",3),
        white: getColor("white",11),
        purple : getColor("purple",5)
    });

    // Corner piece 12 of 20
    pieces.corners.push({
        red: getColor("red",3),
        purple: getColor("purple",11),
        orange : getColor("orange",5)
    });

    // Corner piece 13 of 20
    pieces.corners.push({
        yellow: getColor("yellow",3),
        orange: getColor("orange",11),
        lightgreen : getColor("lightgreen",5)
    });

    // Corner piece 14 of 20
    pieces.corners.push({
        pink: getColor("pink",3),
        lightgreen: getColor("lightgreen",11),
        lightbrown : getColor("lightbrown",5)
    });

    // Corner piece 15 of 20
    pieces.corners.push({
        lightpurple: getColor("lightpurple",3),
        lightbrown: getColor("lightbrown",11),
        white : getColor("white",5)
    });

    // Corner piece 16 of 20
    pieces.corners.push({
        lightblue: getColor("lightblue",7),
        purple: getColor("purple",7),
        white : getColor("white",9)
    });

    // Corner piece 17 of 20
    pieces.corners.push({
        lightblue: getColor("lightblue",5),
        orange: getColor("orange",7),
        purple : getColor("purple",9)
    });

    // Corner piece 18 of 20
    pieces.corners.push({
        lightblue: getColor("lightblue",3),
        lightgreen: getColor("lightgreen",7),
        orange : getColor("orange",9)
    });

    // Corner piece 19 of 20
    pieces.corners.push({
        lightblue: getColor("lightblue",11),
        lightbrown: getColor("lightbrown",7),
        lightgreen : getColor("lightgreen",9)
    });

    // Corner piece 20 of 20
    pieces.corners.push({
        lightblue: getColor("lightblue",9),
        white: getColor("white",7),
        lightbrown : getColor("lightbrown",9)
    });

    return type?pieces[type]:pieces;

}

export default pieces;