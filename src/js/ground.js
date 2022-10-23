import * as THREE from 'three';

//create function to create house
export default function ground(radius) {

    //create ground
    //use grass.jpg as texture
    const loader = new THREE.TextureLoader();
    const groundTexture = loader.load('./src/images/grass.jpg');
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(25, 25);
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;

    const groundGeometry = new THREE.PlaneGeometry(radius, radius)
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x80ff80, map: groundTexture })

    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    //make backside of ground visible
    ground.material.side = THREE.DoubleSide;

    ground.rotation.x = - Math.PI / 2;
    ground.position.y = - 0;
    return (ground);
}