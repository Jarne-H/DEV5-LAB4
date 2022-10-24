import * as THREE from 'three';

//create function to create house
export default function bGround(radius) {
    //create ball 50 wide
    const geometryBall = new THREE.SphereGeometry(radius/2, 32, 32);
    const materialBall = new THREE.MeshStandardMaterial({ color: 0x87ceff });
    const bGroundSphere = new THREE.Mesh(geometryBall, materialBall);
    //show inside
    bGroundSphere.material.side = THREE.BackSide;
    return(bGroundSphere);
}