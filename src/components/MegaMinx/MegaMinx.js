import { useEffect, useState } from "react";
import * as THREE from "three";
import {CameraControls, dToR} from "./utils.js";
import Corner from "./CornerDimensions";
import Edge from "./EdgeDimensions";
import "./MegaMinx.css"
// import MainMenu from "../MainMenu/MainMenu"
// import SolveMenu from "../SolveMenu/SolveMenu"
// import ColorPickerMenu from "../ColorPickerMenu/ColorPickerMenu"
// import AlgorithmMenu from "../AlgorithmMenu/AlgorithmMenu"

const MegaMinx = () => {

    const [menuId,setMenuId] = useState(0);
    let faceToRotate = "face0";
    let moveQueue = [];
    Math.csc = function(x) { return 1 / Math.sin(x); }
    
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, .1, 1000 );
    let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    //let raycaster = new THREE.Raycaster();
    //let mouse = new THREE.Vector2();
    
    let controls = CameraControls(camera, renderer,scene);

    // Set background color and size
    renderer.setClearColor(new THREE.Color("black"),0);
    renderer.domElement.className = "canvas";
    renderer.setSize( window.innerWidth, window.innerHeight);

    camera.position.z = 15;
    camera.position.y = 0;
    camera.position.x = 0;

    camera.translateZ(-2.9275/2);
    renderer.render( scene, camera );


    window.addEventListener("resize", 
        () => {
            let tanFOV = Math.tan( ( ( Math.PI / 180 ) * camera.fov / 2 ) );
            let windowHeight = window.innerHeight;

            camera.aspect = window.innerWidth / window.innerHeight;
            
            // adjust the FOV
            camera.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( window.innerHeight / windowHeight ) );
            
            camera.updateProjectionMatrix();
            camera.lookAt( scene.position );

            renderer.setSize( window.innerWidth, window.innerHeight-10 );
            renderer.render( scene, camera );
        }, false
    );

    function pentagonMesh(n,translate,rotate,color,i)
    {
        let pentagonMesh,pentagonMesh2;
        const lineWidth = .97;
        n=n?n:1;
        color=color?color:"grey";
        const pentagon = new THREE.Shape();
        const pentagon2 = new THREE.Shape();

        // https://mathworld.wolfram.com/RegularPentagon.html
        const c1 = Math.cos((2*Math.PI)/5);
        const c2 = Math.cos(Math.PI/5);
        const s1 = Math.sin((2*Math.PI)/5);
        const s2 = Math.sin((4*Math.PI)/5);
        
        pentagon.moveTo(0, 1*n);
        pentagon.lineTo(s1*n, c1*n);
        pentagon.lineTo(s2*n, -c2*n);
        pentagon.lineTo(-s2*n, -c2*n);
        pentagon.lineTo(-s1*n, c1*n);

        pentagon2.moveTo((0)*lineWidth, (1*n)*lineWidth);
        pentagon2.lineTo((s1*n)*lineWidth, (c1*n)*lineWidth);
        pentagon2.lineTo((s2*n)*lineWidth, (-c2*n)*lineWidth);
        pentagon2.lineTo((-s2*n)*lineWidth, (-c2*n)*lineWidth);
        pentagon2.lineTo((-s1*n)*lineWidth, (c1*n)*lineWidth);
        
        const geometry = new THREE.ShapeGeometry(pentagon);
        const geometry2 = new THREE.ShapeGeometry(pentagon2);
    
        const material = new THREE.MeshBasicMaterial({
            color: "black",
            side: THREE.DoubleSide,
            depthWrite: true,
        });
        const material2 = new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.FrontSide,
            depthWrite: true,
            });
    
        pentagonMesh = new THREE.Mesh(geometry,material);
        pentagonMesh2 = new THREE.Mesh(geometry2,material2);

        let offsetZ =.205;
        let offsetY = -.81;

        pentagonMesh.translateZ(translate?.z||0)

        pentagonMesh.rotateZ(rotate?.z||0)
        pentagonMesh.rotateY(rotate?.y||0)
        
        pentagonMesh.translateY(translate?.y||0)
        pentagonMesh.translateX(translate?.x||0)

        pentagonMesh.rotateX(rotate?.x||0)

        pentagonMesh.translateZ(-translate?.y/2+offsetZ||0)
        pentagonMesh.translateY(translate?.y/2+offsetY||0)

        i<6?
            pentagonMesh2.translateZ(translate?.z+.01||0):
            pentagonMesh2.translateZ(translate?.z-.01||0)

        pentagonMesh2.rotateZ(rotate?.z||0)
        pentagonMesh2.rotateY(rotate?.y||0)
        
        pentagonMesh2.translateY(translate?.y||0)
        pentagonMesh2.translateX(translate?.x||0)

        pentagonMesh2.rotateX(rotate?.x||0)

        pentagonMesh2.translateZ(-translate?.y/2+offsetZ||0)
        pentagonMesh2.translateY(translate?.y/2+offsetY||0)
        
        scene.add(pentagonMesh,pentagonMesh2);       

        // Adds all front pieces faces in decaObject
        decaObject[`face${i+1}`].front.push(pentagonMesh,pentagonMesh2);
    }

    function squareMesh (n,position,position2,translate,rotate,color,i,piece)
    {
        const square = new THREE.Shape();
        const square2 = new THREE.Shape();

        //console.log(square.lineTo)
        square.moveTo(...position.p1,5);
        square.lineTo(...position.p2,1);
        square.lineTo(...position.p3,3);
        square.lineTo(...position.p4,4);

        square2.moveTo(...position2.p1,5);
        square2.lineTo(...position2.p2,1);
        square2.lineTo(...position2.p3,3);
        square2.lineTo(...position2.p4,4);

        const geometry = new THREE.ShapeGeometry(square);
        const geometry2 = new THREE.ShapeGeometry(square2);

        const material = new THREE.MeshBasicMaterial({
            color: "black",
            side: THREE.DoubleSide,
            depthWrite: true
        });
        const material2 = new THREE.MeshBasicMaterial({
            color: i===1&&piece===3?color:color,
            side: THREE.FrontSide,
            depthWrite: true
        });

        let squareMesh = new THREE.Mesh(geometry,material);
        let squareMesh2 = new THREE.Mesh(geometry2,material2);

        squareMesh2.scale.set(.95,.95)

        squareMesh.translateZ(translate?.z||0)
        i<6?
            squareMesh2.translateZ(translate?.z+.01||0):
            squareMesh2.translateZ(translate?.z-.01||0)

        let offsetZ =.205;
        let offsetY = -.81;
        
        squareMesh.rotateZ(rotate?.z||0)
        squareMesh.rotateY(rotate?.y||0)
        
        squareMesh.translateY(translate?.y||0)
        squareMesh.translateX(translate?.x||0)

        squareMesh.rotateX(rotate?.x||0)

        squareMesh.translateZ(-translate?.y/2+offsetZ||0)
        squareMesh.translateY(translate?.y/2+offsetY||0)

        

        squareMesh2.rotateZ(rotate?.z||0)
        squareMesh2.rotateY(rotate?.y||0)
        
        squareMesh2.translateY(translate?.y||0)
        squareMesh2.translateX(translate?.x||0)

        squareMesh2.rotateX(rotate?.x||0)

        squareMesh2.translateZ(-translate?.y/2+offsetZ||0)
        squareMesh2.translateY(translate?.y/2+offsetY||0)

        if(piece>10){
            squareMesh.rotateZ(dToR(-36+-(72*(piece-11))))
            squareMesh.rotateX(dToR(-63.2))

            squareMesh2.rotateZ(dToR(-36+-(72*(piece-11))))
            squareMesh2.rotateX(dToR(-63.2))

            squareMesh.translateZ(1.625)
            squareMesh.translateY(-1)

            squareMesh2.translateZ(1.631)
            squareMesh2.translateY(-.895)
        }

        scene.add(squareMesh,squareMesh2);

        // Adds all front pieces faces in decaObject
        piece<11?
            decaObject[`face${i+1}`].front.push(squareMesh,squareMesh2):
            decaObject[`face${i+1}`].sides.push(squareMesh,squareMesh2);

        if(piece>10) {
            squareMesh.visible=false;
            squareMesh2.visible=false;
        }
        
    }

    let decaObject = {
    }

    let faceTilt = -63.2;

    let facePos = [
        {
            translate : {z:2.9275},
            rotate : 0
        },
        {
            translate: {y:2*2.25*Math.cos(dToR(36)),z:2.9275},
            rotate: {z:dToR(36+72),x:dToR(faceTilt)}
        },
        {
            translate: {y:2*2.25*Math.cos(dToR(36)),z:2.9275},
            rotate: {z:dToR(36+72*2),x:dToR(faceTilt)}
        },
        {
            translate: {y:2*2.25*Math.cos(dToR(36)),z:2.9275},
            rotate: {z:dToR(36+72*3),x:dToR(faceTilt)}
        },
        {
            translate: {y:2*2.25*Math.cos(dToR(36)),z:2.9275},
            rotate: {z:dToR(36+72*4),x:dToR(faceTilt)}
        },
        {
            translate: {y:2*2.25*Math.cos(dToR(36)),z:2.9275},
            rotate: {z:dToR(36+72*5),x:dToR(faceTilt)}
        },
        {
            translate : {z:-2.9275},
            rotate : {z:dToR(180),y:dToR(180)}
        },
        {
            translate: {y:2*2.25*Math.cos(dToR(36)),z:-2.9275},
            rotate: {z:dToR(72),x:dToR(faceTilt),y:dToR(180)}
        },
        {
            translate: {y:2*2.25*Math.cos(dToR(36)),z:-2.9275},
            rotate: {z:dToR(72*2),x:dToR(faceTilt),y:dToR(180)}
        },
        {
            translate: {y:2*2.25*Math.cos(dToR(36)),z:-2.9275},
            rotate: {z:dToR(72*3),x:dToR(faceTilt),y:dToR(180)}
        },
        {
            translate: {y:2*2.25*Math.cos(dToR(36)),z:-2.9275},
            rotate: {z:dToR(72*4),x:dToR(faceTilt),y:dToR(180)}
        },
        {
            translate: {y:2*2.25*Math.cos(dToR(36)),z:-2.9275},
            rotate: {z:dToR(72*5),x:dToR(faceTilt),y:dToR(180)}
        },
    ]

    let faceColors = [
        "blue",     // 1
        "pink",     // 2
        "yellow",   // 3
        "red",      // 4
        "green",    // 5
        "#E9D3FF",  // 6 light purple

        "#4fc3f7",  // 7 light blue
        "#C39B77",  // 8 light brown
        "#64dd17",  // 9 light green
        "orange",   // 10
        "purple",   // 11
        "white"     // 12
    ]
    
    function decaFace(n,translate,rotate,color,i){
            //if(i>1) return
        // generate object structure on each face initialization

        pentagonMesh(n,translate,rotate,color,i);

        squareMesh(n,Corner(n,"face1","corner1"),Corner(n,"face1","corner1",1),translate,rotate,color,i,1);
        squareMesh(n,Corner(n,"face1","corner2"),Corner(n,"face1","corner2",1),translate,rotate,color,i,2);
        squareMesh(n,Corner(n,"face1","corner3"),Corner(n,"face1","corner3",1),translate,rotate,color,i,3);
        squareMesh(n,Corner(n,"face1","corner4"),Corner(n,"face1","corner4",1),translate,rotate,color,i,4);
        squareMesh(n,Corner(n,"face1","corner5"),Corner(n,"face1","corner5",1),translate,rotate,color,i,5);

        squareMesh(n,Edge(n,"face1","edge1"),Edge(n,"face1","edge1",1),translate,rotate,color,i,6)
        squareMesh(n,Edge(n,"face1","edge2"),Edge(n,"face1","edge2",1),translate,rotate,color,i,7)
        squareMesh(n,Edge(n,"face1","edge3"),Edge(n,"face1","edge3",1),translate,rotate,color,i,8)
        squareMesh(n,Edge(n,"face1","edge4"),Edge(n,"face1","edge4",1),translate,rotate,color,i,9)
        squareMesh(n,Edge(n,"face1","edge5"),Edge(n,"face1","edge5",1),translate,rotate,color,i,10)

        squareMesh(n,Edge(n,"sides","side1"),Edge(n,"sides","side1",2),translate,rotate,color,i,11);
        squareMesh(n,Edge(n,"sides","side1"),Edge(n,"sides","side1",2),translate,rotate,color,i,12);
        squareMesh(n,Edge(n,"sides","side1"),Edge(n,"sides","side1",2),translate,rotate,color,i,13);
        squareMesh(n,Edge(n,"sides","side1"),Edge(n,"sides","side1",2),translate,rotate,color,i,14);
        squareMesh(n,Edge(n,"sides","side1"),Edge(n,"sides","side1",2),translate,rotate,color,i,15);

        squareMesh(n,Corner(n,"sides","side1a"),Corner(n,"sides","side1a",1),translate,rotate,color,i,16);
        squareMesh(n,Corner(n,"sides","side1a"),Corner(n,"sides","side1a",1),translate,rotate,color,i,17);
        squareMesh(n,Corner(n,"sides","side1a"),Corner(n,"sides","side1a",1),translate,rotate,color,i,18);
        squareMesh(n,Corner(n,"sides","side1a"),Corner(n,"sides","side1a",1),translate,rotate,color,i,19);
        squareMesh(n,Corner(n,"sides","side1a"),Corner(n,"sides","side1a",1),translate,rotate,color,i,20);

        squareMesh(n,Corner(n,"sides","side1b"),Corner(n,"sides","side1b",1),translate,rotate,color,i,21);
        squareMesh(n,Corner(n,"sides","side1b"),Corner(n,"sides","side1b",1),translate,rotate,color,i,22);
        squareMesh(n,Corner(n,"sides","side1b"),Corner(n,"sides","side1b",1),translate,rotate,color,i,23);
        squareMesh(n,Corner(n,"sides","side1b"),Corner(n,"sides","side1b",1),translate,rotate,color,i,24);
        squareMesh(n,Corner(n,"sides","side1b"),Corner(n,"sides","side1b",1),translate,rotate,color,i,25);
    }

    facePos.forEach((set,i)=>{decaObject[`face${i+1}`]={front : [],sides : []}})
    facePos.forEach((set,i)=>decaFace(1,set.translate,set.rotate,faceColors[i],i));

    let facesToHide = {
        // Blue
        face1 : [
            // Pink side
            {face:2,pos:6},{face:2,pos:7},
            {face:2,pos:8},{face:2,pos:9},
            {face:2,pos:16},{face:2,pos:17},

            // Yellow side
            {face:3,pos:6},{face:3,pos:7},
            {face:3,pos:8},{face:3,pos:9},
            {face:3,pos:16},{face:3,pos:17},

            // Red side
            {face:4,pos:6},{face:4,pos:7},
            {face:4,pos:8},{face:4,pos:9},
            {face:4,pos:16},{face:4,pos:17},

            // Green side
            {face:5,pos:6},{face:5,pos:7},
            {face:5,pos:8},{face:5,pos:9},
            {face:5,pos:16},{face:5,pos:17},

            // Light purple side
            {face:6,pos:6},{face:6,pos:7},
            {face:6,pos:8},{face:6,pos:9},
            {face:6,pos:16},{face:6,pos:17},
        ],

        // Pink
        face2: [
            // Blue side
            {face:1,pos:8},{face:1,pos:9},
            {face:1,pos:18},{face:1,pos:19},
            {face:1,pos:10},{face:1,pos:11},
            
            // Yellow side
            {face:3,pos:6},{face:3,pos:7},
            {face:3,pos:14},{face:3,pos:15},
            {face:3,pos:4},{face:3,pos:5},

            // Light green side
            {face:9,pos:10},{face:9,pos:11},
            {face:9,pos:20},{face:9,pos:21},
            {face:9,pos:2},{face:9,pos:3},

            // Brown side
            {face:8,pos:2},{face:8,pos:3},
            {face:8,pos:12},{face:8,pos:13},
            {face:8,pos:4},{face:8,pos:5},
            
            // Light purple side
            {face:6,pos:8},{face:6,pos:9},
            {face:6,pos:18},{face:6,pos:19},
            {face:6,pos:10},{face:6,pos:11},
        ],

        // Yellow
        face3: [
            // Blue
            {face:1,pos:6},{face:1,pos:7},
            {face:1,pos:8},{face:1,pos:9},
            {face:1,pos:16},{face:1,pos:17},

            // Red
            {face:4,pos:4},{face:4,pos:5},
            {face:4,pos:14},{face:4,pos:15},
            {face:4,pos:6},{face:4,pos:7},

            // Orange
            {face:10,pos:2},{face:10,pos:3},
            {face:10,pos:20},{face:10,pos:21},
            {face:10,pos:10},{face:10,pos:11},

            // Green
            {face:9,pos:4},{face:9,pos:5},
            {face:9,pos:12},{face:9,pos:13},
            {face:9,pos:2},{face:9,pos:3},

            // Pink
            {face:2,pos:10},{face:2,pos:11},
            {face:2,pos:18},{face:2,pos:19},
            {face:2,pos:8},{face:2,pos:9},
        ],

        // Red
        face4: [
            // Blue
            {face:1,pos:6},{face:1,pos:7},
            {face:1,pos:14},{face:1,pos:15},
            {face:1,pos:4},{face:1,pos:5},

            // Green
            {face:5,pos:4},{face:5,pos:5},
            {face:5,pos:14},{face:5,pos:15},
            {face:5,pos:6},{face:5,pos:7},

            // Purple
            {face:11,pos:2},{face:11,pos:3},
            {face:11,pos:20},{face:11,pos:21},
            {face:11,pos:10},{face:11,pos:11},

            // Orange
            {face:10,pos:4},{face:10,pos:5},
            {face:10,pos:12},{face:10,pos:13},
            {face:10,pos:2},{face:10,pos:3},

            // Yellow
            {face:3,pos:10},{face:3,pos:11},
            {face:3,pos:18},{face:3,pos:19},
            {face:3,pos:8},{face:3,pos:9},
        ],

        // Green
        face5: [
            // Blue
            {face:1,pos:4},{face:1,pos:5},
            {face:1,pos:12},{face:1,pos:13},
            {face:1,pos:2},{face:1,pos:3},

            // Light purple
            {face:6,pos:4},{face:6,pos:5},
            {face:6,pos:14},{face:6,pos:15},
            {face:6,pos:6},{face:6,pos:7},

            // White
            {face:12,pos:2},{face:12,pos:3},
            {face:12,pos:20},{face:12,pos:21},
            {face:12,pos:10},{face:12,pos:11},

            // Purple
            {face:11,pos:4},{face:11,pos:5},
            {face:11,pos:12},{face:11,pos:13},
            {face:11,pos:2},{face:11,pos:3},

            // Red
            {face:4,pos:10},{face:4,pos:11},
            {face:4,pos:18},{face:4,pos:19},
            {face:4,pos:8},{face:4,pos:9},
        ],

        // Light purple
        face6: [
            // Blue
            {face:1,pos:2},{face:1,pos:3},
            {face:1,pos:20},{face:1,pos:21},
            {face:1,pos:10},{face:1,pos:11},

            // Pink
            {face:2,pos:4},{face:2,pos:5},
            {face:2,pos:14},{face:2,pos:15},
            {face:2,pos:6},{face:2,pos:7},

            // Brown
            {face:8,pos:2},{face:8,pos:3},
            {face:8,pos:20},{face:8,pos:21},
            {face:8,pos:10},{face:8,pos:11},

            // White
            {face:12,pos:4},{face:12,pos:5},
            {face:12,pos:12},{face:12,pos:13},
            {face:12,pos:2},{face:12,pos:3},

            // Green
            {face:5,pos:10},{face:5,pos:11},
            {face:5,pos:18},{face:5,pos:19},
            {face:5,pos:8},{face:5,pos:9},
        ],

        // Light Blue
        face7 : [
            // Brown side
            {face:8,pos:6},{face:8,pos:7},
            {face:8,pos:8},{face:8,pos:9},
            {face:8,pos:16},{face:8,pos:17},

            // Light green side
            {face:9,pos:6},{face:9,pos:7},
            {face:9,pos:8},{face:9,pos:9},
            {face:9,pos:16},{face:9,pos:17},

            // Orange side
            {face:10,pos:6},{face:10,pos:7},
            {face:10,pos:8},{face:10,pos:9},
            {face:10,pos:16},{face:10,pos:17},

            // Purple side
            {face:11,pos:6},{face:11,pos:7},
            {face:11,pos:8},{face:11,pos:9},
            {face:11,pos:16},{face:11,pos:17},

            // White purple side
            {face:12,pos:6},{face:12,pos:7},
            {face:12,pos:8},{face:12,pos:9},
            {face:12,pos:16},{face:12,pos:17},
        ],

        // Brown
        face8: [
            // Light blue side
            {face:7,pos:8},{face:7,pos:9},
            {face:7,pos:18},{face:7,pos:19},
            {face:7,pos:10},{face:7,pos:11},
            
            // White side
            {face:12,pos:6},{face:12,pos:7},
            {face:12,pos:14},{face:12,pos:15},
            {face:12,pos:4},{face:12,pos:5},

            // Light purple side
            {face:6,pos:10},{face:6,pos:11},
            {face:6,pos:20},{face:6,pos:21},
            {face:6,pos:2},{face:6,pos:3},

            // Pink side
            {face:2,pos:2},{face:2,pos:3},
            {face:2,pos:12},{face:2,pos:13},
            {face:2,pos:4},{face:2,pos:5},
            
            // Light green side
            {face:9,pos:8},{face:9,pos:9},
            {face:9,pos:18},{face:9,pos:19},
            {face:9,pos:10},{face:9,pos:11},
        ],

        // Light green
        face9: [
            // Light Blue
            {face:7,pos:2},{face:7,pos:3},
            {face:7,pos:10},{face:7,pos:11},
            {face:7,pos:20},{face:7,pos:21},

            // Brown
            {face:8,pos:4},{face:8,pos:5},
            {face:8,pos:14},{face:8,pos:15},
            {face:8,pos:6},{face:8,pos:7},

            // Pink
            {face:2,pos:2},{face:2,pos:3},
            {face:2,pos:20},{face:2,pos:21},
            {face:2,pos:10},{face:2,pos:11},

            // Yellow
            {face:3,pos:4},{face:3,pos:5},
            {face:3,pos:12},{face:3,pos:13},
            {face:3,pos:2},{face:3,pos:3},

            // Orange
            {face:10,pos:10},{face:10,pos:11},
            {face:10,pos:18},{face:10,pos:19},
            {face:10,pos:8},{face:10,pos:9},
        ],

        // Orange
        face10: [
            // Light Blue
            {face:7,pos:2},{face:7,pos:3},
            {face:7,pos:12},{face:7,pos:13},
            {face:7,pos:4},{face:7,pos:5},

            // Light Green
            {face:9,pos:4},{face:9,pos:5},
            {face:9,pos:14},{face:9,pos:15},
            {face:9,pos:6},{face:9,pos:7},

            // Yellow
            {face:3,pos:2},{face:3,pos:3},
            {face:3,pos:20},{face:3,pos:21},
            {face:3,pos:10},{face:3,pos:11},

            // Red
            {face:4,pos:4},{face:4,pos:5},
            {face:4,pos:12},{face:4,pos:13},
            {face:4,pos:2},{face:4,pos:3},

            // Purple
            {face:11,pos:10},{face:11,pos:11},
            {face:11,pos:18},{face:11,pos:19},
            {face:11,pos:8},{face:11,pos:9},
        ],

        // Purple
        face11: [
            // Light Blue
            {face:7,pos:4},{face:7,pos:5},
            {face:7,pos:14},{face:7,pos:15},
            {face:7,pos:6},{face:7,pos:7},

            // Orange
            {face:10,pos:4},{face:10,pos:5},
            {face:10,pos:14},{face:10,pos:15},
            {face:10,pos:6},{face:10,pos:7},

            // Red
            {face:4,pos:2},{face:4,pos:3},
            {face:4,pos:20},{face:4,pos:21},
            {face:4,pos:10},{face:4,pos:11},

            // Green
            {face:5,pos:4},{face:5,pos:5},
            {face:5,pos:12},{face:5,pos:13},
            {face:5,pos:2},{face:5,pos:3},

            // White
            {face:12,pos:10},{face:12,pos:11},
            {face:12,pos:18},{face:12,pos:19},
            {face:12,pos:8},{face:12,pos:9},
        ],

        // White
        face12: [
            // Light Blue
            {face:7,pos:8},{face:7,pos:9},
            {face:7,pos:16},{face:7,pos:17},
            {face:7,pos:6},{face:7,pos:7},

            // Purple
            {face:11,pos:4},{face:11,pos:5},
            {face:11,pos:14},{face:11,pos:15},
            {face:11,pos:6},{face:11,pos:7},

            // Green
            {face:5,pos:2},{face:5,pos:3},
            {face:5,pos:20},{face:5,pos:21},
            {face:5,pos:10},{face:5,pos:11},

            // Light purple
            {face:6,pos:4},{face:6,pos:5},
            {face:6,pos:12},{face:6,pos:13},
            {face:6,pos:2},{face:6,pos:3},

            // Brown
            {face:8,pos:10},{face:8,pos:11},
            {face:8,pos:18},{face:8,pos:19},
            {face:8,pos:8},{face:8,pos:9},
        ]
    }

    let colorMatchUps = {
        face1 : { // blue
            //center edge
            "1" : {side: 5,pos: 17},
            "3" : {side: 4,pos: 17},
            "5" : {side: 3,pos: 17},
            "7" : {side: 2,pos: 17},
            "9" : {side: 6,pos: 17},

            //left edge
            "11": {side: 5,pos:  9},
            "13": {side: 4,pos:  9},
            "15": {side: 3,pos:  9},
            "17": {side: 2,pos:  9},
            "19": {side: 6,pos:  9},

            //right edge
            "21": {side: 5,pos:  7},
            "23": {side: 4,pos:  7},
            "25": {side: 3,pos:  7},
            "27": {side: 2,pos:  7},
            "29": {side: 6,pos:  7},
        },
        face2 : { // pink
            //center edge
            "1": {side:8,pos:13},
            "3": {side:6,pos:19},
            "5": {side:1,pos:19},
            "7": {side:3,pos:15},
            "9": {side:9,pos:21},

            //left edge
            "11": {side: 8,pos:  5},
            "13": {side: 6,pos:  11},
            "15": {side: 1,pos:  11},
            "17": {side: 3,pos:  7},
            "19": {side: 9,pos:  3},

            //right edge
            "21": {side: 8,pos:  3},
            "23": {side: 6,pos:  9},
            "25": {side: 1,pos:  9},
            "27": {side: 3,pos:  5},
            "29": {side: 9,pos:  11},
        },
        face3 : { // Yellow
            //center edge
            "1": {side:9,pos:13},
            "3": {side:2,pos:19},
            "5": {side:1,pos:17},
            "7": {side:4,pos:15},
            "9": {side:10,pos:21},

            //left edge
            "11": {side: 9,pos:  5},
            "13": {side: 2,pos:  11},
            "15": {side: 1,pos:  9},
            "17": {side: 4,pos:  7},
            "19": {side: 10,pos:  3},

            //right edge
            "21": {side: 9,pos:  3},
            "23": {side: 2,pos:  9},
            "25": {side: 1,pos:  7},
            "27": {side: 4,pos:  5},
            "29": {side: 10,pos:  11},
        },
        face4 : { // Red
            //center edge
            "1": {side:10,pos:13},
            "3": {side:3,pos:19},
            "5": {side:1,pos:15},
            "7": {side:5,pos:15},
            "9": {side:11,pos:21},

            //left edge
            "11": {side: 10,pos:  5},
            "13": {side: 3,pos:  11},
            "15": {side: 1,pos:  7},
            "17": {side: 5,pos:  7},
            "19": {side: 11,pos:  3},

            //right edge
            "21": {side: 10,pos:  3},
            "23": {side: 3,pos:  9},
            "25": {side: 1,pos:  5},
            "27": {side: 5,pos:  5},
            "29": {side: 11,pos:  11},
        },
        face5 : { // Green
            //center edge
            "1": {side:11,pos:13},
            "3": {side:4,pos:19},
            "5": {side:1,pos:13},
            "7": {side:6,pos:15},
            "9": {side:12,pos:21},

            //left edge
            "11": {side: 11,pos:  5},
            "13": {side: 4,pos:  11},
            "15": {side: 1,pos:  5},
            "17": {side: 6,pos:  7},
            "19": {side: 12,pos:  3},

            //right edge
            "21": {side: 11,pos:  3},
            "23": {side: 4,pos:  9},
            "25": {side: 1,pos:  3},
            "27": {side: 6,pos:  5},
            "29": {side: 12,pos:  11},
        },
        face6 : { // Light purple
            //center edge
            "1": {side:12,pos:13},
            "3": {side:5,pos:19},
            "5": {side:1,pos:21},
            "7": {side:2,pos:15},
            "9": {side:8,pos:21},

            //left edge
            "11": {side: 12,pos:  5},
            "13": {side: 5,pos:  11},
            "15": {side: 1,pos:  3},
            "17": {side: 2,pos:  7},
            "19": {side: 8,pos:  3},

            //right edge
            "21": {side: 12,pos:  3},
            "23": {side: 5,pos:  9},
            "25": {side: 1,pos:  11},
            "27": {side: 2,pos:  5},
            "29": {side: 8,pos:  11},
        }
    }

    let speed = -3;

    let counter = 0;

    let rotateFace = (face) => {
        let tempSpeed = speed;

        if(!moveQueue[0]&&faceToRotate==="face0"){
            return;
        }

        if(moveQueue[0]&&faceToRotate==="face0"){
            faceToRotate=moveQueue.shift();
            return;
        }


        // Controls what happens at the end of each turn
        if(Math.abs(counter) >= 72) {
            decaObject[face].sides.forEach((piece,i)=>{
                piece.visible = false;
                if(i%2){
                    piece.translateZ(-1.631)
                    piece.translateY(.895)
                } else {
                    piece.translateZ(-1.625)
                    piece.translateY(1)
                }
                    piece.rotateX(dToR(63.2))
                counter<0?
                    piece.rotateZ(dToR(Math.abs(counter))):
                    piece.rotateZ(dToR(Math.abs(counter)*-1));
                piece.rotateX(dToR(-63.2))

                if(i%2){
                    piece.translateZ(1.631)
                    piece.translateY(-.895)
                } else {
                    piece.translateZ(1.625)
                    piece.translateY(-1)
                }
            });
            decaObject[face].front.forEach((piece,i)=>{
                counter<0?
                    piece.rotateZ(dToR(Math.abs(counter))):
                    piece.rotateZ(dToR(Math.abs(counter)*-1));
            });
            facesToHide[face].forEach(piece=>{
                decaObject[`face${piece.face}`].front[piece.pos].visible=true;
            });
            counter=0;
            faceToRotate="face0"
            
            speed = Math.floor(Math.random() * 2)?speed*-1:speed;
            return;
        }

        if((Math.abs(speed)+Math.abs(counter))>72){
            tempSpeed = (speed/Math.abs(speed))*(Math.abs(speed)+Math.abs(counter)-72)
        }

        facesToHide[face].forEach(piece=>{
            decaObject[`face${piece.face}`].front[piece.pos].visible=false;
        })
        decaObject[face].front.forEach((piece,i)=>{
            piece.rotateZ(dToR(tempSpeed));
        });
        decaObject[face].sides.forEach((piece,i)=>{
            piece.visible = true;
            
            if(i%2&&i<30) {
                
                let {side,pos} = colorMatchUps[face][`${i}`]

                //console.log(decaObject[`face${side}`].front[pos].material.color)
                piece.material.color.set(
                    decaObject[`face${side}`].front[pos].material.color
                );
            }
            if(i===111){
                piece.material.color.set(
                    "grey",
                );
            }
            if(i%2){
                piece.translateZ(-1.631)
                piece.translateY(.895)
            } else {
                piece.translateZ(-1.625)
                piece.translateY(1)
            }
                piece.rotateX(dToR(63.2))

                piece.rotateZ(dToR(tempSpeed));

                piece.rotateX(dToR(-63.2))

            if(i%2){
                piece.translateZ(1.631)
                piece.translateY(-.895)
            } else {
                piece.translateZ(1.625)
                piece.translateY(-1)
            }
            
        })
        counter+=speed;
        //squareMesh.rotateX(dToR(-58.3))
    }

    let animate = () => {

        rotateFace(faceToRotate);
        //if(counter===0) moveQueue.push(`face${Math.floor(Math.random() * 6)+1}`);

        requestAnimationFrame( animate );
        controls.update();
        renderer.render( scene, camera );
    };

        
    setTimeout(()=>{ 
        document.body.children[1].appendChild( renderer.domElement );
    },50);

    animate()
    //animate()

    let addRandomMove = () => {
        if(counter!==0) return;
        moveQueue.push(`face${Math.floor(Math.random() * 6)+1}`);
    }

    return (
        <div>
            {
                <button onClick={()=>addRandomMove()}>Random move (side 1-6)</button>
                // menuId === 1?<SolveMenu/>:
                // menuId === 2?<ColorPickerMenu/>:
                // menuId === 3?<AlgorithmMenu/>:
                // <MainMenu/>
            }
        </div>
    );
}

export default MegaMinx;