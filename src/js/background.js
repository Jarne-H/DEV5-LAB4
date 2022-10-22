import * as THREE from 'three';

//create function to create house
export default function background() {
    //create ball 50 wide
    const geometryBall = new THREE.SphereGeometry(5, 32, 32);
    const materialBall = new THREE.MeshStandardMaterial({ color: 0x87ceff });
    const backgroundSphere = new THREE.Mesh(geometryBall, materialBall);
    //show inside
    backgroundSphere.material.side = THREE.BackSide;
    return(backgroundSphere);
}