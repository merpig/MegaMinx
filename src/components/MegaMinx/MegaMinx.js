import { useEffect } from "react";
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

    //const [menuId,setMenuId] = useState(0);
    Math.csc = function(x) { return 1 / Math.sin(x); }
    function degreesToRadians (degrees) {
        return degrees*(Math.PI/180)
    }

    useEffect(()=>{
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
        document.body.children[1].appendChild( renderer.domElement );

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

        let testPiece = [];
        let testEdges = [];

        function pentagonMesh(n,translate,rotate,color,i)
        {
            let pentagonMesh,pentagonMesh2;
            const lineWidth = .97;
            n=n?n:1;
            color=color?color:"grey";
            const pentagon = new THREE.Shape();
            const pentagon2 = new THREE.Shape();
            const loader = new THREE.TextureLoader();

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

            pentagonMesh.translateZ(translate?.z||0)

            pentagonMesh.rotateZ(rotate?.z||0)
            pentagonMesh.rotateY(rotate?.y||0)
            
            pentagonMesh.translateY(translate?.y||0)
            pentagonMesh.translateX(translate?.x||0)

            pentagonMesh.rotateX(rotate?.x||0)

            pentagonMesh.translateZ(-translate?.y/2+.21||0)
            pentagonMesh.translateY(translate?.y/2-.83||0)

            i<6?
                pentagonMesh2.translateZ(translate?.z+.01||0):
                pentagonMesh2.translateZ(translate?.z-.01||0)

            pentagonMesh2.rotateZ(rotate?.z||0)
            pentagonMesh2.rotateY(rotate?.y||0)
            
            pentagonMesh2.translateY(translate?.y||0)
            pentagonMesh2.translateX(translate?.x||0)

            pentagonMesh2.rotateX(rotate?.x||0)

            pentagonMesh2.translateZ(-translate?.y/2+.21||0)
            pentagonMesh2.translateY(translate?.y/2-.83||0)
            


            scene.add(pentagonMesh,pentagonMesh2);
            if(i===0){
                testPiece.push(pentagonMesh,pentagonMesh2);
            }
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

            squareMesh.rotateZ(rotate?.z||0)
            squareMesh.rotateY(rotate?.y||0)
            
            squareMesh.translateY(translate?.y||0)
            squareMesh.translateX(translate?.x||0)

            squareMesh.rotateX(rotate?.x||0)

            squareMesh.translateZ(-translate?.y/2+.21||0)
            squareMesh.translateY(translate?.y/2-.83||0)

            i<6?
                squareMesh2.translateZ(translate?.z+.01||0):
                squareMesh2.translateZ(translate?.z-.01||0)

            squareMesh2.rotateZ(rotate?.z||0)
            squareMesh2.rotateY(rotate?.y||0)
            
            squareMesh2.translateY(translate?.y||0)
            squareMesh2.translateX(translate?.x||0)

            squareMesh2.rotateX(rotate?.x||0)

            squareMesh2.translateZ(-translate?.y/2+.21||0)
            squareMesh2.translateY(translate?.y/2-.83||0)
            

            scene.add(squareMesh,squareMesh2);
            if(i===0){
                //scene.add(squareMesh,squareMesh2);
                testPiece.push(squareMesh,squareMesh2);
            }
                
            if(i>0&&i<6&&(piece===3||piece===4||piece===8)){
                //scene.add(squareMesh,squareMesh2);
                testEdges.push({object:squareMesh,face:i},{object:squareMesh2,face:i});
            }
            
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
            "blue",
            "pink",
            "yellow",
            "red",
            "green",
            "#E9D3FF",//light purple

            "#4fc3f7",//light blue
            "#C39B77",//light brown
            "#64dd17",//light green
            "orange",
            "purple",
            "white"
        ]
        
        function decaFace(n,translate,rotate,color,i){
            
            // Place holder until middle edges are completed
            //pentagonMesh(n*2.25,"orange",translate,rotate);

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
        }

        facePos.forEach((set,i)=>decaFace(1,set.translate,set.rotate,faceColors[i],i));

        //scene.add( tempCube );
        let speed = 2;
        let animate = () => {

            testPiece.forEach((piece,i)=>{
                piece.rotateZ(dToR(speed));
            })
            testEdges.forEach((piece)=>{ // needs lots of work
                let position = piece.object.position;
                let face = piece.face;
                

                let xPrime = position.x*Math.cos(dToR(speed)) - position.y*Math.sin(dToR(speed));
                let yPrime = position.x*Math.sin(dToR(speed)) + position.y*Math.cos(dToR(speed));
                
                piece.object.rotateX(-facePos[face].rotate?.x||0)
                position.x = xPrime;
                piece.object.rotateZ(dToR(speed));
                position.y = yPrime;
                piece.object.rotateX(facePos[face].rotate?.x||0)

            })

            requestAnimationFrame( animate );
            controls.update();
            renderer.render( scene, camera );
        };

        animate();
    },[]);

    
  

    return (
        <div>
            {
                // menuId === 1?<SolveMenu/>:
                // menuId === 2?<ColorPickerMenu/>:
                // menuId === 3?<AlgorithmMenu/>:
                // <MainMenu/>
            }
        </div>
    );
}

export default MegaMinx;