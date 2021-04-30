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