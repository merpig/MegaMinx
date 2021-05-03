import {dToR,rotate_point} from './utils';

const CornerDimensions = (size,face,corner,offset) =>{

    Math.csc = function(x) { return 1 / Math.sin(x); }

    // Degrees to Radians

    let ratio = 2.25;

    if(offset){
        size=size*1.075;
        ratio=ratio*.95
    }


    //const distToEdge = n*ratio*Math.cos(degreesToRadians(36))
    let halfPoint = ((size*ratio)-size)/2;
    let c = Math.csc(dToR(36))*halfPoint;
    let x1 = c*Math.sin(dToR(54))
    let y1 = size+halfPoint;

    let [p1x,p1y] = [0, size*ratio];
    let [p2x,p2y] = [x1,y1];
    let [p3x,p3y] = rotate_point(x1,y1,-144,{x:0,y:size});
    let [p4x,p4y] = rotate_point(0,size*ratio,-144,{x:-x1,y:y1});

    let [p1xb,p1yb] = rotate_point(0,0,-72,{x:-x1,y:y1});
    let [p2xb,p2yb] = rotate_point(0,0,-72,{x:0,y:size*ratio});

    let [holdX1,holdY1] = rotate_point(0,0,-72,{x:x1,y:y1});
    let [holdX2,holdY2] = rotate_point(0,0,-72,{x:0,y:size});

    let [p3xb,p3yb] = rotate_point(p2xb,p2yb,144,{x:holdX1,y:holdY1});
    let [p4xb,p4yb] = rotate_point(p1xb,p1yb,144,{x:holdX2,y:holdY2});


    const faces = {
        face1 : {
            corner1 : {
                p1 : [0, size*ratio],
                p2 : [x1,y1],
                p3 : [0, size],
                p4 : [-x1,y1]
            },
            corner2 : {
                p1 : rotate_point(0,0,-72,{x:0,y:size*ratio}), 
                p2 : rotate_point(0,0,-72,{x:x1,y:y1}),
                p3 : rotate_point(0,0,-72,{x:0,y:size}),
                p4 : rotate_point(0,0,-72,{x:-x1,y:y1})
            },
            corner3 : {
                p1 : rotate_point(0,0,-72*2,{x:0,y:size*ratio}), 
                p2 : rotate_point(0,0,-72*2,{x:x1,y:y1}),
                p3 : rotate_point(0,0,-72*2,{x:0,y:size}),
                p4 : rotate_point(0,0,-72*2,{x:-x1,y:y1})
            },
            corner4 : {
                p1 : rotate_point(0,0,-72*3,{x:0,y:size*ratio}), 
                p2 : rotate_point(0,0,-72*3,{x:x1,y:y1}),
                p3 : rotate_point(0,0,-72*3,{x:0,y:size}),
                p4 : rotate_point(0,0,-72*3,{x:-x1,y:y1})
            },
            corner5 : {
                p1 : rotate_point(0,0,-72*4,{x:0,y:size*ratio}), 
                p2 : rotate_point(0,0,-72*4,{x:x1,y:y1}),
                p3 : rotate_point(0,0,-72*4,{x:0,y:size}),
                p4 : rotate_point(0,0,-72*4,{x:-x1,y:y1})
            },
        },
        sides : {
            side1a : {
                p1: rotate_point(0,0,36,{x:p1x,y:p1y}),
                p2: rotate_point(0,0,36,{x:p2x,y:p2y}),
                p3: rotate_point(0,0,36,{x:p3x,y:p3y}),
                p4: rotate_point(0,0,36,{x:p4x,y:p4y})
            },
            side1b : {
                p1: rotate_point(0,0,36,{x:p1xb,y:p1yb}),
                p2: rotate_point(0,0,36,{x:p2xb,y:p2yb}),
                p3: rotate_point(0,0,36,{x:p3xb,y:p3yb}),
                p4: rotate_point(0,0,36,{x:p4xb,y:p4yb})
            },
        }
    }
    return faces[face][corner];
}

export default CornerDimensions;