import * as THREE from 'three';

//create 2 sides of road cube
export default function roadCube(position) {
    const roadCubeGeometry = new THREE.BoxGeometry(10, 0.03, 0.07);
    const roadCubeMaterial = new THREE.MeshStandardMaterial({ color: 0x999999 });
  
    const roadCube = new THREE.Mesh(roadCubeGeometry, roadCubeMaterial);
    roadCube.position.y = + 0.02;
    roadCube.position.z = + position;
    return (roadCube);
}