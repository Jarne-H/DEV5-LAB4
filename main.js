//*********************SETUP*********************//
import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {createHouse} from './public/src/js/house.js';
import bGround from './public/src/js/bGround.js';
import ground from './public/src/js/ground.js';
import road from './public/src/js/road.js';
import roadCube from './public/src/js/roadcube';
import clouds from './public/src/js/clouds';
import { houseLight, directionalLight } from './public/src/js/lights.js';

//prate ship downloaded at: https://sketchfab.com/3d-models/pirate-ship-6b32fb0dac4c4e79a2a09a93559302e8

//******************************************** */
//*****> YOU CAN CHANGE THESE VARIABLES <***** */
//******************************************** */
//size of house
var houseWidth = 1;
var houseDepth = 1;
var houseHeight = 1;
//size of world
const radius = 10;
//******************************************** */
//******************************************** */


//*******STARTUP******* */
const scene = new THREE.Scene();
//add camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.y = 0.5;
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

//add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);


//add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//set boundaries to orbit controls
controls.minDistance = 0.1;
controls.maxDistance = radius/2;

//don't let orbit control go under y = 0.001
controls.maxPolarAngle = Math.PI / 2.1;

//resize window when window is resized
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

//*********************SPACE*********************//
scene.add(houseLight())
scene.add(directionalLight());
scene.add(bGround(radius));
scene.add(ground(radius));
scene.add(road(radius));
scene.add(roadCube(radius, 0.5));
scene.add(roadCube(radius, 1.5));
for (let i = 0; i < radius*2; i++) {
  scene.add(clouds(radius));
}

//*********************PRATESHIP*********************//

const loader = new GLTFLoader();
loader.load('./public/src/models/scene.gltf', function (gltf) {
  var ship = gltf.scene;
  ship.scale.set(0.1, 0.1, 0.1);
  ship.position.x = 2.5;
  ship.position.y = 0.1;
  ship.position.z = 0.7;
  ship.rotation.y = Math.PI / 3;
  scene.add(ship);
});
console.log(loader);

//*********************HOUSE*********************//

//create a house
var houseX = 0;
var houseY = 0;
var houseZ = 0;

//if no house is created, create house
function House() {
  var houseCreated = false;
  if (houseCreated == false) {
    
    //loop through array of 6
    for (let i = 0; i < 6; i++) {
      scene.add(createHouse(houseX, houseY, houseZ, houseWidth, houseHeight, houseDepth)[i]);
    }
    houseCreated = true;
  }
}
House();

//*******ANIMATION******* */
function animate() {
  requestAnimationFrame( animate );

  renderer.render(scene, camera);
};
animate();