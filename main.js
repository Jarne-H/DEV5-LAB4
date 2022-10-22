//*********************SETUP*********************//
import './style.css'
import * as THREE from 'THREE'
import { OrbitControls } from 'THREE/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader } from 'THREE/examples/jsm/loaders/GLTFLoader.js';
import createHouse from './src/js/house.js';
import background from './src/js/background.js';
import ground from './src/js/ground.js';
import road from './src/js/road.js';
import roadCube from './src/js/roadcube';
import clouds from './src/js/clouds';
import pirateShip from './src/js/pirate';
import { houseLight, directionalLight } from './src/js/lights.js';

//prate ship downloaded at: https://sketchfab.com/3d-models/pirate-ship-6b32fb0dac4c4e79a2a09a93559302e8

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

//radius of the space
const radius = 10;

//add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//set boundaries to orbit controls
controls.minDistance = 0.1;
controls.maxDistance = radius/2;

//don't let orbit control go under y = 0.001
controls.maxPolarAngle = Math.PI / 2.1;

//*********************LIGHTS*********************//
scene.add(houseLight())
scene.add(directionalLight());

//*********************BACKGROUND*********************//
scene.add(background(radius));

//*********************GROUND*********************//
scene.add(ground());

//*********************ROAD*********************//
scene.add(road());
scene.add(roadCube(0.5));
scene.add(roadCube(1.5));

//*********************PRATESHIP*********************//
scene.add(pirateShip());

//*********************CLOUDS*********************//
for (let i = 0; i < radius; i++) {
  scene.add(clouds(radius));
}


//*********************HOUSE*********************//

//create a house with planes
//create 6 flats for walls
var houseX = 0;
var houseY = 0;
var houseZ = 0;
//set houseWidth to #houseWidth value
var houseWidth = document.getElementById("houseWidth").value;

var houseHeight = 1;
var houseDepth = 1;


//if no house is created, create house
function createHouset() {
  var houseCreated = false;
  if (houseCreated == false) {
    
    //loop through array of 6
    for (let i = 0; i < 6; i++) {
      scene.add(createHouse(houseX, houseY, houseZ, houseWidth, houseHeight, houseDepth)[i]);
    }
    houseCreated = true;
  }
}
createHouset();


//if houseWidth or houseHeight or housedepth is changed, remove old house and create new house
function changeHouse() {
  houseWidth = document.getElementById("houseWidth").value;
  houseHeight = document.getElementById("houseHeight").value;
  houseDepth = document.getElementById("houseDepth").value;
  HouseClass.createHouse(houseX, houseY, houseZ, houseWidth, houseHeight, houseDepth).forEach(function (wall) {
    scene.remove(wall);
  });
  HouseClass.createHouse(houseX, houseY, houseZ, houseWidth, houseHeight, houseDepth).forEach(function (wall) {
    scene.add(wall);
  });
}
if (document.getElementById("houseWidth").value != houseWidth || document.getElementById("houseHeight").value != houseHeight || document.getElementById("houseDepth").value != houseDepth) {
  changeHouse();
}

//*******animation******* */
function animate(item) {
  requestAnimationFrame( animate );

renderer.render( scene, camera );
};
animate();
