// Changes decaObject directly
let swapColors = (face,deca,speed) =>{

    // Pulls the hex color value from piece
    let hex = piece => piece.material.color.getHex();

    // Copies b's color to a
    let setColor = (a,b) => a.material.color.set(hex(b));

    // Variables used for rotating front colors
    let front =  deca[face].front;
    let tempColor = hex(front[3]);
    let tempColor2 = hex(front[13]);

    // Swaps all the front facing colors
    if(speed>0){
        setColor(front[3],front[5]);
        setColor(front[5],front[7]);
        setColor(front[7],front[9]);
        setColor(front[9],front[11]);
        front[11].material.color.set(tempColor);

        setColor(front[13],front[15]);
        setColor(front[15],front[17]);
        setColor(front[17],front[19]);
        setColor(front[19],front[21]);
        front[21].material.color.set(tempColor2);
    }else{
        setColor(front[3],front[11]);
        setColor(front[11],front[9]);
        setColor(front[9],front[7]);
        setColor(front[7],front[5]);
        front[5].material.color.set(tempColor);

        setColor(front[13],front[21]);
        setColor(front[21],front[19]);
        setColor(front[19],front[17]);
        setColor(front[17],front[15]);
        front[15].material.color.set(tempColor2);
    }

    // Converts color to side number
    let side = color => {
        let colors = {
            "blue": 1,
            "pink": 2,
            "yellow": 3,
            "red": 4,
            "green": 5,
            "lightpurple":6,
            "lightblue":7,
            "lightbrown":8,
            "lightgreen":9,
            "orange":10,
            "purple":11,
            "white":12
        }
        return colors[color];
    }

    // extracts piece information given side and piece numbers
    let extractEdge = (sideColor,pieces) => {
        return {
            left: deca[`face${side(sideColor)}`].front[pieces[0]],
            center: deca[`face${side(sideColor)}`].front[pieces[1]],
            right: deca[`face${side(sideColor)}`].front[pieces[2]]
        }
    }

    // Rotate colors around clockwise or counterclockwise depending on speed
    let swap = (e1,e2,e3,e4,e5,speed) => {
        let tempLeft = hex(e1.left);
        let tempCenter = hex(e1.center);
        let tempRight = hex(e1.right);

        if(speed>0){
            //left edge
            setColor(e1.left,e2.left);
            setColor(e2.left,e3.left);
            setColor(e3.left,e4.left);
            setColor(e4.left,e5.left);
            e5.left.material.color.set(tempLeft);

            //center edge
            setColor(e1.center,e2.center);
            setColor(e2.center,e3.center);
            setColor(e3.center,e4.center);
            setColor(e4.center,e5.center);
            e5.center.material.color.set(tempCenter);

            setColor(e1.right,e2.right);
            setColor(e2.right,e3.right);
            setColor(e3.right,e4.right);
            setColor(e4.right,e5.right);
            e5.right.material.color.set(tempRight);
        }else{
            //left edge
            setColor(e1.left,e5.left);
            setColor(e5.left,e4.left);
            setColor(e4.left,e3.left);
            setColor(e3.left,e2.left);
            e2.left.material.color.set(tempLeft);

            //center edge
            setColor(e1.center,e5.center);
            setColor(e5.center,e4.center);
            setColor(e4.center,e3.center);
            setColor(e3.center,e2.center);
            e2.center.material.color.set(tempCenter);

            setColor(e1.right,e5.right);
            setColor(e5.right,e4.right);
            setColor(e4.right,e3.right);
            setColor(e3.right,e2.right);
            e2.right.material.color.set(tempRight);
        }
    }

    // Variables for edge data
    let edge1,edge2,edge3,edge4,edge5;

    // Controls which side edge colors will be rotated with each front face
    switch(face){
        
        // Front half
        case 'face1': // blue
            edge1 = extractEdge("green",[9,17,7]); 
            edge2 = extractEdge("red",[9,17,7]);
            edge3 = extractEdge("yellow",[9,17,7]);
            edge4 = extractEdge("pink",[9,17,7]);
            edge5 = extractEdge("lightpurple",[9,17,7]);
            swap(edge1,edge2,edge3,edge4,edge5,speed)
            break;

        case 'face2': // pink
            edge1 = extractEdge("lightbrown",[5,13,3]); 
            edge2 = extractEdge("lightpurple",[11,19,9]);
            edge3 = extractEdge("blue",[11,19,9]);
            edge4 = extractEdge("yellow",[7,15,5]);
            edge5 = extractEdge("lightgreen",[3,21,11]);
            swap(edge1,edge2,edge3,edge4,edge5,speed)
            break;

        case 'face3': // yellow
            edge1 = extractEdge("lightgreen",[5,13,3]); 
            edge2 = extractEdge("pink",[11,19,9]);
            edge3 = extractEdge("blue",[9,17,7]);
            edge4 = extractEdge("red",[7,15,5]);
            edge5 = extractEdge("orange",[3,21,11]);
            swap(edge1,edge2,edge3,edge4,edge5,speed)
            break;

        case 'face4': // red
            edge1 = extractEdge("orange",[5,13,3]); 
            edge2 = extractEdge("yellow",[11,19,9]);
            edge3 = extractEdge("blue",[7,15,5]);
            edge4 = extractEdge("green",[7,15,5]);
            edge5 = extractEdge("purple",[3,21,11]);
            swap(edge1,edge2,edge3,edge4,edge5,speed)
            break;

        case 'face5': // green
            edge1 = extractEdge("purple",[5,13,3]); 
            edge2 = extractEdge("red",[11,19,9]);
            edge3 = extractEdge("blue",[5,13,3]);
            edge4 = extractEdge("lightpurple",[7,15,5]);
            edge5 = extractEdge("white",[3,21,11]);
            swap(edge1,edge2,edge3,edge4,edge5,speed)
            break;

        case 'face6': // green
            edge1 = extractEdge("white",[5,13,3]); 
            edge2 = extractEdge("green",[11,19,9]);
            edge3 = extractEdge("blue",[3,21,11]);
            edge4 = extractEdge("pink",[7,15,5]);
            edge5 = extractEdge("lightbrown",[3,21,11]);
            swap(edge1,edge2,edge3,edge4,edge5,speed)
            break;
        
        // Back half
        case 'face7': // light blue
            edge1 = extractEdge("orange",[9,17,7]); 
            edge2 = extractEdge("purple",[9,17,7]);
            edge3 = extractEdge("white",[9,17,7]);
            edge4 = extractEdge("lightbrown",[9,17,7]);
            edge5 = extractEdge("lightgreen",[9,17,7]);
            swap(edge1,edge2,edge3,edge4,edge5,speed)
            break;

        case 'face8': // light brown
            edge1 = extractEdge("pink",[5,13,3]); 
            edge2 = extractEdge("lightgreen",[11,19,9]);
            edge3 = extractEdge("lightblue",[11,19,9]);
            edge4 = extractEdge("white",[7,15,5]);
            edge5 = extractEdge("lightpurple",[3,21,11]);
            swap(edge1,edge2,edge3,edge4,edge5,speed)
            break;

        case 'face9': // light green
            edge1 = extractEdge("yellow",[5,13,3]); 
            edge2 = extractEdge("orange",[11,19,9]);
            edge3 = extractEdge("lightblue",[3,21,11]);
            edge4 = extractEdge("lightbrown",[7,15,5]);
            edge5 = extractEdge("pink",[3,21,11]);
            swap(edge1,edge2,edge3,edge4,edge5,speed)
            break;

        case 'face10': // orange
            edge1 = extractEdge("red",[5,13,3]); 
            edge2 = extractEdge("purple",[11,19,9]);
            edge3 = extractEdge("lightblue",[5,13,3]);
            edge4 = extractEdge("lightgreen",[7,15,5]);
            edge5 = extractEdge("yellow",[3,21,11]);
            swap(edge1,edge2,edge3,edge4,edge5,speed)
            break;

        case 'face11': // purple
            edge1 = extractEdge("green",[5,13,3]); 
            edge2 = extractEdge("white",[11,19,9]);
            edge3 = extractEdge("lightblue",[7,15,5]);
            edge4 = extractEdge("orange",[7,15,5]);
            edge5 = extractEdge("red",[3,21,11]);
            swap(edge1,edge2,edge3,edge4,edge5,speed)
            break;

        case 'face12': // yellow
            edge1 = extractEdge("lightpurple",[5,13,3]); 
            edge2 = extractEdge("lightbrown",[11,19,9]);
            edge3 = extractEdge("lightblue",[9,17,7]);
            edge4 = extractEdge("purple",[7,15,5]);
            edge5 = extractEdge("green",[3,21,11]);
            swap(edge1,edge2,edge3,edge4,edge5,speed)
            break;
        default:
    }
}

export default swapColors;