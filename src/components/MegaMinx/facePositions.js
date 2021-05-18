import {dToR} from "./utils.js";

let faceTilt = -63.75;
let zOffset = 2.92;
let facePos = [
    
    {
        translate : {z:zOffset},
        rotate : 0
    },
    {
        translate: {y:2*2.25*Math.cos(dToR(36)),z:zOffset},
        rotate: {z:dToR(36+72),x:dToR(faceTilt)}
    },
    {
        translate: {y:2*2.25*Math.cos(dToR(36)),z:zOffset},
        rotate: {z:dToR(36+72*2),x:dToR(faceTilt)}
    },
    {
        translate: {y:2*2.25*Math.cos(dToR(36)),z:zOffset},
        rotate: {z:dToR(36+72*3),x:dToR(faceTilt)}
    },
    {
        translate: {y:2*2.25*Math.cos(dToR(36)),z:zOffset},
        rotate: {z:dToR(36+72*4),x:dToR(faceTilt)}
    },
    {
        translate: {y:2*2.25*Math.cos(dToR(36)),z:zOffset},
        rotate: {z:dToR(36+72*5),x:dToR(faceTilt)}
    },
    {
        translate : {z:-zOffset},
        rotate : {z:dToR(180),y:dToR(180)}
    },
    {
        translate: {y:2*2.25*Math.cos(dToR(36)),z:-zOffset},
        rotate: {z:dToR(72),x:dToR(faceTilt),y:dToR(180)}
    },
    {
        translate: {y:2*2.25*Math.cos(dToR(36)),z:-zOffset},
        rotate: {z:dToR(72*2),x:dToR(faceTilt),y:dToR(180)}
    },
    {
        translate: {y:2*2.25*Math.cos(dToR(36)),z:-zOffset},
        rotate: {z:dToR(72*3),x:dToR(faceTilt),y:dToR(180)}
    },
    {
        translate: {y:2*2.25*Math.cos(dToR(36)),z:-zOffset},
        rotate: {z:dToR(72*4),x:dToR(faceTilt),y:dToR(180)}
    },
    {
        translate: {y:2*2.25*Math.cos(dToR(36)),z:-zOffset},
        rotate: {z:dToR(72*5),x:dToR(faceTilt),y:dToR(180)}
    },
]

export default facePos;