import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const CameraControls = (camera, renderer,scene) => {
    let controls = new OrbitControls( camera , renderer.domElement);
    controls.enabled = true;
    controls.enableDamping = true;   //damping 
    controls.dampingFactor = 0.15;   //damping inertia
    controls.enableZoom = true;      //Zooming
    controls.autoRotate = false;     //Enable auto rotation
    controls.minDistance = (2+5);
    controls.maxDistance = (2+5)+20;
    controls.enablePan = false;
    controls.keys = {
        LEFT: null, //left arrow
        UP: null, // up arrow
        RIGHT: null, // right arrow
        BOTTOM: null // down arrow
    };
    controls.addEventListener("change", (e) => {
        if (renderer) renderer.render(scene, camera);
    });
    return controls;
}

export function dToR (degrees) {
    return degrees*(Math.PI/180)
}

export function rotate_point(cx,cy,angle,p){
    let s = Math.sin(dToR(angle));
    let c = Math.cos(dToR(angle));

    // translate point back to origin:
    //console.log(p,cx,cy)
    p.x -= cx;
    p.y -= cy;


    // rotate point
    let xnew = p.x * c - p.y * s;
    let ynew = p.x * s + p.y * c;

    // translate point back:
    p.x = xnew + cx;
    p.y = ynew + cy;
    //console.log(p)
    return [p.x,p.y];
}