import {dToR,rotate_point} from './utils';

const EdgeDimensions = (size,face,edge,offset) =>{

    Math.csc = function(x) { return 1 / Math.sin(x); }

    let ratio = 2.25;
    let xOffset1 = 0;
    let xOffset2 = 0;

    if(offset===1||offset===2){
        size=size*1.05;
        ratio=ratio*.975;
        xOffset1=.05;
        xOffset2=-.05;
    }
    //}

    let halfPoint = ((size*ratio)-1)/2
    let c = Math.csc(dToR(36))*halfPoint;
    let x1 = c*Math.sin(dToR(54))
    let y1 = 1+halfPoint;

    let x2 = -x1*Math.cos(dToR(72*4))-y1*Math.sin(dToR(72*4));
    let y2 = y1*Math.cos(dToR(72*4))+-x1*Math.sin(dToR(72*4));

    let p1X = xOffset1;
    let p1Y = size;

    let p2X = xOffset2*Math.cos(dToR(72*4))-size*Math.sin(dToR(72*4));
    let p2Y = size*Math.cos(dToR(72*4))+xOffset2*Math.sin(dToR(72*4));

    let [newX1,newY1] = rotate_point(x1,y1,-144,{x:p1X,y:p1Y});
    let [newX2,newY2] = rotate_point(x2,y2,144,{x:p2X,y:p2Y});

    const faces = {
        face1: {
            edge1: {
                p1 : [p1X, p1Y],
                p2 : [x1,y1],
                p3 : [x2,y2],
                p4 : [p2X,p2Y],
            },
            edge2: {
                p1 : [xOffset1*Math.cos(dToR(72*4))-size*Math.sin(dToR(72*4)),
                    size*Math.cos(dToR(72*4))+xOffset1*Math.sin(dToR(72*4))],//c5p3
                p2 : [xOffset2*Math.cos(dToR(72*3))-size*Math.sin(dToR(72*3)),
                    size*Math.cos(dToR(72*3))+xOffset2*Math.sin(dToR(72*3))],//c4p3
                p3 : [-x1*Math.cos(dToR(72*3))-y1*Math.sin(dToR(72*3)),
                    y1*Math.cos(dToR(72*3))+-x1*Math.sin(dToR(72*3))],//c4p4
                p4 : [x1*Math.cos(dToR(72*4))-y1*Math.sin(dToR(72*4)),
                    y1*Math.cos(dToR(72*4))+x1*Math.sin(dToR(72*4))] //c5p2
            },
            edge3: {
                p1 : [xOffset1*Math.cos(dToR(72*3))-size*Math.sin(dToR(72*3)),
                    size*Math.cos(dToR(72*3))+xOffset1*Math.sin(dToR(72*3))],
                p2 : [xOffset2*Math.cos(dToR(72*2))-size*Math.sin(dToR(72*2)),
                    size*Math.cos(dToR(72*2))+xOffset2*Math.sin(dToR(72*2))],
                p3 : [-x1*Math.cos(dToR(72*2))-y1*Math.sin(dToR(72*2)),
                    y1*Math.cos(dToR(72*2))+-x1*Math.sin(dToR(72*2))],
                p4 : [x1*Math.cos(dToR(72*3))-y1*Math.sin(dToR(72*3)),
                    y1*Math.cos(dToR(72*3))+x1*Math.sin(dToR(72*3))]
            },
            edge4 : {
                p1 : [xOffset1*Math.cos(dToR(72*2))-size*Math.sin(dToR(72*2)),
                    size*Math.cos(dToR(72*2))+xOffset1*Math.sin(dToR(72*2))],
                p2 : [xOffset2*Math.cos(dToR(72))-size*Math.sin(dToR(72)),
                    size*Math.cos(dToR(72))+xOffset2*Math.sin(dToR(72))],
                p3 : [-x1*Math.cos(dToR(72))-y1*Math.sin(dToR(72)),
                    y1*Math.cos(dToR(72))+-x1*Math.sin(dToR(72))],
                p4 : [x1*Math.cos(dToR(72*2))-y1*Math.sin(dToR(72*2)),
                    y1*Math.cos(dToR(72*2))+x1*Math.sin(dToR(72*2))]
            },
            edge5 : {
                p1 : [xOffset1*Math.cos(dToR(72))-size*Math.sin(dToR(72)),
                    size*Math.cos(dToR(72))+xOffset1*Math.sin(dToR(72))],
                p2 : [xOffset2, size],
                p3 : [-x1,y1],
                p4 : [x1*Math.cos(dToR(72))-y1*Math.sin(dToR(72)),
                    y1*Math.cos(dToR(72))+x1*Math.sin(dToR(72))]
            }
        },
        sides : {
            side1 : {
                p1 : rotate_point(0,0,36,{x:newX1,y:newY1}),
                p2 : rotate_point(0,0,36,{x:x1,y:y1}),
                p3 : rotate_point(0,0,36,{x:x2,y:y2}),
                p4 : rotate_point(0,0,36,{x:newX2,y:newY2})
            }
        }
    }

    return faces[face][edge];


}

export default EdgeDimensions;