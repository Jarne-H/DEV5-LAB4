import * as THREE from 'three';

//create function to create house
export default function road() {
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
    return(road);
}