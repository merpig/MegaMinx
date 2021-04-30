import {dToR} from './utils';

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

    const faces = {
        face1 : {
            corner1 : {
                p1 : [0, size*ratio],
                p2 : [x1,y1],
                p3 : [0, size],
                p4 : [-x1,y1]
            },
            corner2 : {
                p1 : [
                        0*Math.cos(dToR(72))-size*ratio*Math.sin(dToR(72)),
                        size*ratio*Math.cos(dToR(72))+0*Math.sin(dToR(72))
                    ],
                p2 : [
                        x1*Math.cos(dToR(72))-y1*Math.sin(dToR(72)),
                        y1*Math.cos(dToR(72))+x1*Math.sin(dToR(72))
                    ],
                p3 : [
                        0*Math.cos(dToR(72))-size*Math.sin(dToR(72)),
                        size*Math.cos(dToR(72))+0*Math.sin(dToR(72))
                    ],
                p4 : [
                        -x1*Math.cos(dToR(72))-y1*Math.sin(dToR(72)),
                        y1*Math.cos(dToR(72))+-x1*Math.sin(dToR(72))
                    ]
            },
            corner3 : {
                p1 : [
                    0*Math.cos(dToR(72*2))-size*ratio*Math.sin(dToR(72*2)),
                    size*ratio*Math.cos(dToR(72*2))+0*Math.sin(dToR(72*2))
                ],
                p2 : [
                        x1*Math.cos(dToR(72*2))-y1*Math.sin(dToR(72*2)),
                        y1*Math.cos(dToR(72*2))+x1*Math.sin(dToR(72*2))
                    ],
                p3 : [
                        0*Math.cos(dToR(72*2))-size*Math.sin(dToR(72*2)),
                        size*Math.cos(dToR(72*2))+0*Math.sin(dToR(72*2))
                    ],
                p4 : [
                        -x1*Math.cos(dToR(72*2))-y1*Math.sin(dToR(72*2)),
                        y1*Math.cos(dToR(72*2))+-x1*Math.sin(dToR(72*2))
                    ]
                },
            corner4 : {
                p1 : [
                    0*Math.cos(dToR(72*3))-size*ratio*Math.sin(dToR(72*3)),
                    size*ratio*Math.cos(dToR(72*3))+0*Math.sin(dToR(72*3))
                ],
                p2 : [
                        x1*Math.cos(dToR(72*3))-y1*Math.sin(dToR(72*3)),
                        y1*Math.cos(dToR(72*3))+x1*Math.sin(dToR(72*3))
                    ],
                p3 : [
                        0*Math.cos(dToR(72*3))-size*Math.sin(dToR(72*3)),
                        size*Math.cos(dToR(72*3))+0*Math.sin(dToR(72*3))
                    ],
                p4 : [
                        -x1*Math.cos(dToR(72*3))-y1*Math.sin(dToR(72*3)),
                        y1*Math.cos(dToR(72*3))+-x1*Math.sin(dToR(72*3))
                    ]
                },
            corner5 : {
                p1 : [
                    0*Math.cos(dToR(72*4))-size*ratio*Math.sin(dToR(72*4)),
                    size*ratio*Math.cos(dToR(72*4))+0*Math.sin(dToR(72*4))
                ],
                p2 : [
                        x1*Math.cos(dToR(72*4))-y1*Math.sin(dToR(72*4)),
                        y1*Math.cos(dToR(72*4))+x1*Math.sin(dToR(72*4))
                    ],
                p3 : [
                        0*Math.cos(dToR(72*4))-size*Math.sin(dToR(72*4)),
                        size*Math.cos(dToR(72*4))+0*Math.sin(dToR(72*4))
                    ],
                p4 : [
                        -x1*Math.cos(dToR(72*4))-y1*Math.sin(dToR(72*4)),
                        y1*Math.cos(dToR(72*4))+-x1*Math.sin(dToR(72*4))
                    ]
                },
        }
    }
    return faces[face][corner];
}

export default CornerDimensions;