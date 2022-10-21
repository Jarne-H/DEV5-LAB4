import './style.css'
import * as THREE from 'THREE'
import { OrbitControls } from 'THREE/examples/jsm/controls/OrbitControls.js';

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



//*********************BACKGROUND******************** */
//set background to galaxy.jpg
const loader = new THREE.TextureLoader();


//create ball 50 wide
const geometryBall = new THREE.SphereGeometry(5, 32, 32);
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

//*********************ROAD******************** */
//create road
//road black color
const roadGeometry = new THREE.PlaneGeometry(10, 1)
const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 })
const road = new THREE.Mesh(roadGeometry, roadMaterial);
//make backside of road visible
road.material.side = THREE.DoubleSide;
road.rotation.x = - Math.PI / 2;
road.position.y = + 0.0005;
road.position.z = + 1;
scene.add(road);

//create 2 sides of road cube
const roadCubeGeometry = new THREE.BoxGeometry(10, 0.03, 0.07);
const roadCubeMaterial = new THREE.MeshStandardMaterial({ color: 0x999999 });

const roadCube1 = new THREE.Mesh(roadCubeGeometry, roadCubeMaterial);
roadCube1.position.y = + 0.02;
roadCube1.position.z = + 0.5;
scene.add(roadCube1);


const roadCube2 = new THREE.Mesh(roadCubeGeometry, roadCubeMaterial);
roadCube2.position.y = + 0.02;
roadCube2.position.z = + 1.5;
scene.add(roadCube2);


//*********************CLOUDS******************** */
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

//*********************HOUSE******************** */

//create cube with planes
//use a loop
//sides orientation, scales, position


const house = new THREE.PlaneGeometry(1, 1, 1);

//create 6 flats for walls
var houseX = 0;
var houseY = 0.5;
var houseZ = 0;


const materials = [
  new THREE.MeshLambertMaterial({ color: 0xffd700 }),
  new THREE.MeshLambertMaterial({ color: 0xffd700 }),
  new THREE.MeshLambertMaterial({ color: 0x00ff00 }),
  new THREE.MeshLambertMaterial({ color: 0x00ff00 }),
  new THREE.MeshLambertMaterial({ color: 0xff1818 }),
  new THREE.MeshLambertMaterial({ color: 0xff1818 })
];

materials.forEach(material => material.side = THREE.DoubleSide);

const front = new THREE.Mesh(house, materials[0]);
const back = new THREE.Mesh(house, materials[1]);
const top = new THREE.Mesh(house, materials[2]);
const bot = new THREE.Mesh(house, materials[3]);
const right = new THREE.Mesh(house, materials[4]);
const left = new THREE.Mesh(house, materials[5]);


front.position.x = houseX;
front.position.y = houseY;
front.position.z = houseZ + 0.5;

back.position.x = houseX;
back.position.y = houseY;
back.position.z = houseX - 0.5;

top.position.x = houseX;
top.position.y = houseX + 1;
top.position.z = houseZ;
  top.rotation.x = houseX + Math.PI / 2;

bot.position.x = houseX;
bot.position.y = houseY - 0.5;
bot.position.z = houseZ;
  bot.rotation.x = houseX + Math.PI / 2;

right.position.x = houseX + 0.5;
right.position.y = houseY;
right.position.z = houseZ;
  right.rotation.y = houseX + Math.PI / 2;

left.position.x = houseX - 0.5;
left.position.y = houseY;
left.position.z = houseZ;
  left.rotation.y = houseX + Math.PI / 2;

scene.add(front);
scene.add(back);
scene.add(top);
scene.add(bot);
scene.add(right);
scene.add(left);

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
