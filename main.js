//*********************SETUP*********************//
import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'THREE/examples/jsm/controls/OrbitControls.js';
import {createHouse} from './src/js/house.js';
import background from './src/js/background.js';
import ground from './src/js/ground.js';
import road from './src/js/road.js';
import roadCube from './src/js/roadcube';
import clouds from './src/js/clouds';
import { houseLight, directionalLight } from './src/js/lights.js';

//prate ship downloaded at: https://sketchfab.com/3d-models/pirate-ship-6b32fb0dac4c4e79a2a09a93559302e8

//*******YOU CAN CHANGE THESE VARIABLES******* */
//size of house
var houseWidth = 1;
var houseDepth = 1;
//size of world
const radius = 10;


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

//*********************LIGHTS*********************//
scene.add(houseLight())
scene.add(directionalLight());

//*********************BACKGROUND*********************//
scene.add(background(radius));

//*********************GROUND*********************//
scene.add(ground(radius));

//*********************ROAD*********************//
scene.add(road(radius));
scene.add(roadCube(radius, 0.5));
scene.add(roadCube(radius, 1.5));

//*********************PRATESHIP*********************//


//create new gltf loader
const loader = new GLTFLoader();
//load the gltf file

window.addEventListener('resize', onWindowResize, false);
loader.load('./src/models/scene.gltf', function (gltf) {
  var ship = gltf.scene;
  ship.scale.set(0.1, 0.1, 0.1);
  ship.position.x = 2.5;
  ship.position.y = 0.1;
  ship.position.z = 0.6;
  ship.rotation.y = Math.PI / 4.2;
  scene.add(ship);
});
console.log(loader);

//*********************CLOUDS*********************//
for (let i = 0; i < radius*2; i++) {
  scene.add(clouds(radius));
}

//*********************HOUSE*********************//

//create a house with planes
//create 6 flats for walls
var houseX = 0;
var houseY = 0;
var houseZ = 0;
var houseHeight = document.getElementById("houseHeight").value;


//if no house is created, create house
function House() {
  var houseCreated = false;
  if (houseCreated == false) {
    
    //loop through array of 6
    for (let i = 0; i < 8; i++) {
      scene.add(createHouse(houseX, houseY, houseZ, houseWidth, houseHeight, houseDepth)[i]);
    }
    houseCreated = true;
  }
}
House();

//*******PIRATESHIP ANIMATION******* */

//move pirate ship to y = -5.5 then teleport back to 5.5 and repeat
function moveShip() {
  if (item.position.y > -5.5) {
    item.position.y -= 0.01;
  } else {
    item.position.y = 5.5;
  }
}


//*******ANIMATION******* */
function animate() {
  requestAnimationFrame( animate );

  renderer.render(scene, camera);
  //moveShip(pirateShip);
};
animate();
