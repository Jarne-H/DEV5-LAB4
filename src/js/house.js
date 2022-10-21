//import three
import * as THREE from 'three';

//create function to create house
export default function createHouse(houseX, houseY, houseZ, houseWidth, houseHeight, houseDepth) {
    const house_x = new THREE.PlaneGeometry(houseWidth, houseHeight, 1);
    const house_y = new THREE.PlaneGeometry(houseDepth, houseHeight, 1);
    const house_z = new THREE.PlaneGeometry(houseWidth, houseDepth, 1);
        
    const materials = [
        new THREE.MeshLambertMaterial({ color: 0xffd700 }),
        new THREE.MeshLambertMaterial({ color: 0xffd700 }),
        new THREE.MeshLambertMaterial({ color: 0x00ff00 }),
        new THREE.MeshLambertMaterial({ color: 0x00ff00 }),
        new THREE.MeshLambertMaterial({ color: 0xff1818 }),
        new THREE.MeshLambertMaterial({ color: 0xff1818 })
    ];
      
    materials.forEach(material => material.side = THREE.DoubleSide);
      
    const front = new THREE.Mesh(house_x, materials[0]);
    const back = new THREE.Mesh(house_x, materials[1]);
    const top = new THREE.Mesh(house_z, materials[2]);
    const bot = new THREE.Mesh(house_z, materials[3]);
    const right = new THREE.Mesh(house_y, materials[4]);
    const left = new THREE.Mesh(house_y, materials[5]);
      
      
    front.position.x = houseX;
    front.position.y = houseY + houseHeight / 2;
    front.position.z = houseZ + houseDepth / 2;
      
    back.position.x = houseX;
    back.position.y = houseY + houseHeight / 2;
    back.position.z = houseX - houseDepth / 2;
      
    top.position.x = houseX;
    top.position.y = houseY + houseHeight;
    top.position.z = houseZ;
    top.rotation.x = houseX + Math.PI / 2;
      
    bot.position.x = houseX;
    bot.position.y = houseY - 0.4995;
    bot.position.z = houseZ;
    bot.rotation.x = houseX + Math.PI / 2;
      
    right.position.x = houseX + houseWidth / 2;
    right.position.y = houseY + houseHeight / 2;
    right.position.z = houseZ;
    right.rotation.y = houseX + Math.PI / 2;
      
    left.position.x = houseX - houseWidth / 2;
    left.position.y = houseY + houseHeight / 2;
    left.position.z = houseZ;
    left.rotation.y = houseX + Math.PI / 2;
      
    var house = [front, back, top, bot, right, left];
    return (house);
}