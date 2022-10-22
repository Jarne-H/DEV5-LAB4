import './style.css'
import * as THREE from 'THREE'
import { OrbitControls } from 'THREE/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader } from 'THREE/examples/jsm/loaders/GLTFLoader.js';
import createHouse from './src/js/house.js';
import background from './src/js/background.js';
import ground from './src/js/ground.js';
import road from './src/js/road.js';
import roadCube from './src/js/roadcube';
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

//add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//set boundaries to orbit controls
controls.minDistance = 1;
controls.maxDistance = 5;

//don't let orbit control go under y = 0.001
controls.maxPolarAngle = Math.PI / 2.1;

//add lights
scene.add(houseLight())
scene.add(directionalLight());

//*********************BACKGROUND*********************//
scene.add(background());

//*********************GROUND*********************//
scene.add(ground());

//*********************ROAD*********************//
scene.add(road());
scene.add(roadCube(0.5));
scene.add(roadCube(1.5));

//*********************CLOUDS*********************//
const maxY = 4;
const minY = 3;

//create ball
const geometryCloud = new THREE.SphereGeometry(0.1, 10, 10);
const materialCloud = new THREE.MeshStandardMaterial({ color: 0xffffff });
const cloud = new THREE.Mesh(geometryCloud, materialCloud);

//create 6 random clouds between y 3 and y4
for (let i = 0; i < 6; i++) {
  const cloud = new THREE.Mesh(geometryCloud, materialCloud);
  cloud.position.x = (Math.random() - 0.5) * 4;
  cloud.position.y = Math.random() * (maxY - minY) + minY;
  cloud.position.z = (Math.random() - 0.5) * 4;
  scene.add(cloud);
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
