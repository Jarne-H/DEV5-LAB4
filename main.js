import './style.css'
import * as THREE from 'THREE'
import { OrbitControls } from 'THREE/examples/jsm/controls/OrbitControls.js';
//import house from './house.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

//add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

//add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


//*********************BACKGROUND******************** */
//set background to galaxy.jpg
const loader = new THREE.TextureLoader();


//create ball 50 wide
const geometryBall = new THREE.SphereGeometry(10, 32, 32);
const materialBall = new THREE.MeshStandardMaterial({ color: 0x87ceff });
const backgroundSphere = new THREE.Mesh(geometryBall, materialBall);
//show inside
backgroundSphere.material.side = THREE.BackSide;
scene.add(backgroundSphere);

//*********************GROUND******************** */
//create ground
//use grass.jpg as texture
const groundTexture = loader.load('./src/images/grass.jpg');
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(25, 25);
groundTexture.anisotropy = 16;
groundTexture.encoding = THREE.sRGBEncoding;

const groundGeometry = new THREE.PlaneGeometry(10, 10)
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x80ff80,  map: groundTexture})

const ground = new THREE.Mesh(groundGeometry, groundMaterial); 
//make backside of ground visible
ground.material.side = THREE.DoubleSide;

ground.rotation.x = - Math.PI / 2;
ground.position.y = - 0;
scene.add(ground);

//*********************HOUSE******************** */

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshLambertMaterial({ color: 0xffffff});
const cube = new THREE.Mesh(geometry, material);
cube.position.y = 0.5;
scene.add(cube);

camera.position.y = 0.5;
camera.position.z = 5;


//*********************LIGHTS******************** */

//add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.x = 1;
directionalLight.position.z = 1;
scene.add(directionalLight);

//add helper for lights
//const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
//scene.add(lightHelper);


//*******animation******* */
function animate(item) {
  requestAnimationFrame( animate );

renderer.render( scene, camera );
};
animate();
