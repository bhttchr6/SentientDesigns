//Import the THREE.js library
//import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
//import { STLLoader } from "../three.js-master/examples/jsm/loaders/STLLoader.js";
import { STLLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/STLLoader.js";
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
//import { GUI } from 'https://cdn.skypack.dev/three@0.138.1/examples/jsm/libs/lil-gui.module.min.js'
//import { STLLoader } from '../three.js-master/examples/jsm/loaders/STLLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 10, 4, 5 );
camera.lookAt( 0, 0, 0 );
//scene.background = new THREE.Color( 0xffffff );
scene.background = new THREE.Color( 0xf0f0f0 );

const renderer = new THREE.WebGLRenderer( );
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 0;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI ;
				
const gridHelper = new THREE.GridHelper( 10, 20 );
//scene.add( gridHelper );

//ambinet light
scene.add( new THREE.AmbientLight( 0x666666, 2) );//(color, intensity)

// point light

const light = new THREE.PointLight( 0xffffff, 3, 0, 0 );
camera.add( light );

// add hemispherical light
const hemiLight = new THREE.HemisphereLight( 0x8d7c7c, 0x494966, 3 );
scene.add( hemiLight );

const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(10, 10, 0); // x, y, z
scene.add(dirLight);

const spotLight = new THREE.SpotLight();
spotLight.intensity = 3;
spotLight.angle = Math.PI /16;
spotLight.penumbra = 0.5;
spotLight.castShadow = true;
spotLight.position.set( -10, 10, 20 );
scene.add( spotLight );

// add axis to the view
//scene.add( new THREE.AxesHelper( 5 ) );
//const geometry = new THREE.BoxGeometry( 1, 1, 1 );
//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

const envTexture = new THREE.CubeTextureLoader().load([
        'img/px_50.png',
        'img/nx_50.png',
        'img/py_50.png',
        'img/ny_50.png',
        'img/pz_50.png',
        'img/nz_50.png'
    ])
    envTexture.mapping = THREE.CubeReflectionMapping
    
    const meshMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,//0xb2ffc8,
        envMap: envTexture,
        metalness: 0.8,
        roughness: 0.1,
        opacity: 1.0,
        side: THREE.DoubleSide,
        transparent: true,
        transmission: 0.99,
        clearcoat: 1.0,
        clearcoatRoughness: 0.25
    })


//const meshMaterial = new THREE.MeshLambertMaterial( {
//        color: 0xffffff,
 //       opacity: 0.5,
 //       side: THREE.DoubleSide,
 //       transparent: false
//} );

//const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );



const loader = new STLLoader();

//load the original file        
loader.load( 'STL_Files/wireframe_knot_reduced_mesh.stl', function ( geometry ) {

        const material1 = new THREE.MeshPhongMaterial( { color: 0xff9c7c, specular: 0x494949, shininess: 200 } );
        const mesh1 = new THREE.Mesh( geometry, meshMaterial );
                
        mesh1.position.set( 0, 0, 0.0 );
        mesh1.rotation.set( Math.PI/2, -Math.PI , 0 );
        mesh1.scale.set( 0.05, 0.05, 0.05 );
        
        mesh1.castShadow = true;
        mesh1.receiveShadow = true;
        
        scene.add( mesh1 );
        
                } );
camera.position.z = 5;


function animate() {
	requestAnimationFrame( animate );

	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;
        

	renderer.render( scene, camera );
}

animate();

