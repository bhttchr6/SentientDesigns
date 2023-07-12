//Import the THREE.js library
//import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
//import { STLLoader } from "../three.js-master/examples/jsm/loaders/STLLoader.js";
import { STLLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/STLLoader.js";
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
//import { STLLoader } from '../three.js-master/examples/jsm/loaders/STLLoader.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//scene.background = new THREE.Color( 0xffffff );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 0;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI ;


//ambinet light
scene.add( new THREE.AmbientLight( 0x666666, 2) );//(color, intensity)

// point light

const light = new THREE.PointLight( 0xffffff, 3, 0, 0 );
camera.add( light );



const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

const meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xffffff,
        opacity: 0.5,
        side: THREE.DoubleSide,
        transparent: true
} );
const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );



const loader = new STLLoader();
loader.load( 'STL_Files/voxel_dremel.stl', function ( geometry ) {

        const material1 = new THREE.MeshPhongMaterial( { color: 0xff9c7c, specular: 0x494949, shininess: 200 } );
        const mesh = new THREE.Mesh( geometry, meshMaterial );
        
	mesh.position.set( 0, 0, 0.0 );
	mesh.rotation.set( 0, - Math.PI , 0 );
	mesh.scale.set( 0.05, 0.05, 0.05 );

	mesh.castShadow = true;
	mesh.receiveShadow = true;

	scene.add( mesh );

	} );


camera.position.z = 5;


function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
        

	renderer.render( scene, camera );
}

animate();
