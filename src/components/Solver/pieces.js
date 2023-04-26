

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
        "0000ff":"blue", // 1
        "ff80ce":"pink", // 2
        "d7ff72":"yellow", // 3
        "ffff00":"red", // 4
        "ffffff":"green", // 5
        "ff0000":"lightpurple", // 6
        "00d8ff":"lightblue", // 7
        "e8d7b2":"lightbrown", // 8
        "8f8983":"lightgreen", // 9
        "ff6b22":"orange", // 10
        "8b2381":"purple", // 11
        "00ff00":"white", // 12
    }

    let getColor = (color,piece) => 
        hexToColorName[decaObject[colorFace[color]]
            .front[piece]
            .material
            .color
            .getHexString()];

    // ###############################################
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

    // ###############################################
    // Edge piece 1 of 30
    pieces.edges.push({
        blue : getColor("blue",13),
        green : getColor("green",17)
    });
    // Edge piece 2 of 30
    pieces.edges.push({
        blue : getColor("blue",15),
        red : getColor("red",17)
    });
    // Edge piece 3 of 30
    pieces.edges.push({
        blue : getColor("blue",17),
        yellow : getColor("yellow",17)
    });
    // Edge piece 4 of 30
    pieces.edges.push({
        blue : getColor("blue",19),
        pink : getColor("pink",17)
    });
    // Edge piece 5 of 30
    pieces.edges.push({
        blue : getColor("blue",21),
        lightpurple : getColor("lightpurple",17)
    });
    // -----------------------------------------------
    // Edge piece 6 of 30
    pieces.edges.push({
        lightpurple : getColor("lightpurple",15),
        green : getColor("green",19)
    });
    // Edge piece 7 of 30
    pieces.edges.push({
        green : getColor("green",15),
        red : getColor("red",19)
    });
    // Edge piece 8 of 30
    pieces.edges.push({
        red : getColor("red",15),
        yellow : getColor("yellow",19)
    });
    // Edge piece 9 of 30
    pieces.edges.push({
        yellow : getColor("yellow",15),
        pink : getColor("pink",19)
    });
    // Edge piece 10 of 30
    pieces.edges.push({
        pink : getColor("pink",15),
        lightpurple : getColor("lightpurple",19)
    });
    // -----------------------------------------------
    // Edge piece 11 of 30
    pieces.edges.push({
        green : getColor("green",21),
        white : getColor("white",21)
    });
    // Edge piece 12 of 30
    pieces.edges.push({
        green : getColor("green",13),
        purple : getColor("purple",13)
    });
    // Edge piece 13 of 30
    pieces.edges.push({
        red : getColor("red",21),
        purple : getColor("purple",21)
    });
    // Edge piece 14 of 30
    pieces.edges.push({
        red : getColor("red",13),
        orange : getColor("orange",13)
    });
    // Edge piece 15 of 30
    pieces.edges.push({
        yellow : getColor("yellow",21),
        orange : getColor("orange",21)
    });
    // Edge piece 16 of 30
    pieces.edges.push({
        yellow : getColor("yellow",13),
        lightgreen : getColor("lightgreen",13)
    });
    // Edge piece 17 of 30
    pieces.edges.push({
        pink : getColor("pink",21),
        lightgreen : getColor("lightgreen",21)
    });
    // Edge piece 18 of 30
    pieces.edges.push({
        pink : getColor("pink",13),
        lightbrown : getColor("lightbrown",13)
    });
    // Edge piece 19 of 30
    pieces.edges.push({
        lightpurple : getColor("lightpurple",21),
        lightbrown : getColor("lightbrown",21)
    });
    // Edge piece 20 of 30
    pieces.edges.push({
        lightpurple : getColor("lightpurple",13),
        white : getColor("white",13)
    });
    // -----------------------------------------------
    // Edge piece 21 of 30
    pieces.edges.push({
        white : getColor("white",19),
        purple : getColor("purple",15)
    });
    // Edge piece 22 of 30
    pieces.edges.push({
        purple : getColor("purple",19),
        orange : getColor("orange",15)
    });
    // Edge piece 23 of 30
    pieces.edges.push({
        orange : getColor("orange",19),
        lightgreen : getColor("lightgreen",15)
    });
    // Edge piece 24 of 30
    pieces.edges.push({
        lightgreen : getColor("lightgreen",19),
        lightbrown : getColor("lightbrown",15)
    });
    // Edge piece 25 of 30
    pieces.edges.push({
        lightbrown : getColor("lightbrown",19),
        white : getColor("white",15)
    });
    // -----------------------------------------------
    // Edge piece 26 of 30
    pieces.edges.push({
        lightblue : getColor("lightblue",17),
        white : getColor("white",17)
    });
    // Edge piece 27 of 30
    pieces.edges.push({
        lightblue : getColor("lightblue",15),
        purple : getColor("purple",17)
    });
    // Edge piece 28 of 30
    pieces.edges.push({
        lightblue : getColor("lightblue",13),
        orange : getColor("orange",17)
    });
    // Edge piece 29 of 30
    pieces.edges.push({
        lightblue : getColor("lightblue",21),
        lightgreen : getColor("lightgreen",17)
    });
    // Edge piece 30 of 30
    pieces.edges.push({
        lightblue : getColor("lightblue",19),
        lightbrown : getColor("lightbrown",17)
    });

    return type?pieces[type]:pieces;

}

export default pieces;