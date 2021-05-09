const pieces = (decaObject,type) => {
    const edgeSections = ["front","middleFront","middle","middleBack","back"];

    const pieces = {
        corners : {
        },
        edges : {
        }
    }

    let buildCorners = section => {
        let corners = {};

        let stickerOrientation = {
            front:{
                right: [],
                left : [],
                front : []
            },
            middleFront:{
                right: [],
                left : [],
                back : []
            },
            middleBack:{
                right: [],
                left : [],
                front : []
            },
            back:{
                right: [],
                left : [],
                back : []
            }
        };

        corners = {
            corner1 : stickerOrientation[section],
            corner2 : stickerOrientation[section],
            corner3: stickerOrientation[section],
            corner4 : stickerOrientation[section],
            corner5 : stickerOrientation[section]
        }

        return corners;
    }
    let buildEdges = section =>{
        let edges = {};

        let stickerOrientation = {
            front:{
                front : [],
                back : []
            },
            middleFront:{
                right: [],
                left : [],
            },
            middle:{
                front : [],
                back : []
            },
            middleBack:{
                right: [],
                left : [],
            },
            back:{
                front : [],
                back : []
            }
        };

        edges = {
            edge1 : stickerOrientation[section],
            edge2 : stickerOrientation[section],
            edge3 : stickerOrientation[section],
            edge4 : stickerOrientation[section],
            edge5 : stickerOrientation[section]
        }

        return edges;
    };

    pieces.corners.front = buildCorners("front");
    pieces.corners.middleFront = buildCorners("middleFront");
    pieces.corners.middleBack = buildCorners("middleBack");
    pieces.corners.back = buildCorners("back");

    pieces.edges.front = buildEdges("front");
    pieces.edges.middleFront = buildEdges("middleFront");
    pieces.edges.middle = buildEdges("middle");
    pieces.edges.middleBack = buildEdges("middleBack");
    pieces.edges.back = buildEdges("back");

    console.log(pieces)
    // Corner piece 1
    pieces.corners.front.corner1.right = decaObject.face5.front[9].material.color;
    pieces.corners.front.corner1.left = decaObject.face6.front[7].material;
    pieces.corners.front.corner1.front = decaObject.face1.front[3].material;

    

    return pieces;

}

export default pieces;