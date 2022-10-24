//import three
import * as THREE from 'three';

//create function to create house
function createHouse(houseX, houseY, houseZ, houseWidth, houseHeight, houseDepth) {
    const house_x = new THREE.PlaneGeometry(houseWidth, houseHeight, 1);
    const house_y = new THREE.PlaneGeometry(houseDepth, houseHeight, 1);
        
    //make double sided
    //use ./public/src/images/Wood_Wall_003_basecolor.jpg for texture
    const texture = new THREE.TextureLoader().load('./public/src/images/Wood_Wall_003_basecolor.jpg');
    const materials = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide, map: texture });

    const front = new THREE.Mesh(house_x, materials, texture);
    const back = new THREE.Mesh(house_x, materials, texture);
    const right = new THREE.Mesh(house_y, materials, texture);
    const left = new THREE.Mesh(house_y, materials, texture);
    
    //use rotated cube for roof
    //use ./public/src/images/Wood_Wall_003_basecolor.jpg for texture
    const roofTexture = new THREE.TextureLoader().load('./public/src/images/Stylized_Bricks_002_basecolor.jpg');
    const roofMaterials = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide, map: roofTexture });
    const size = Math.sqrt(houseDepth * houseDepth + houseDepth * houseDepth) / 2;
    const roof = new THREE.Mesh(new THREE.BoxGeometry(houseWidth - 0.001, size, size), roofMaterials);
    //rotate 45 degrees
    roof.rotation.x = Math.PI / 4;

    //add cube in front of house
    //use ./public/src/images/jarne.jpg for texture
    const jarneTexture = new THREE.TextureLoader().load('./public/src/images/jarne.jpg');
    const frontMaterials = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide, map: jarneTexture });
    const name = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.1), frontMaterials);

      
    roof.position.x = name.position.x = front.position.x = back.position.x = houseX;
    right.position.x = houseX + houseWidth / 2;
    left.rotation.y = right.rotation.y = houseX + Math.PI / 2;
    name.position.y = front.position.y = back.position.y = right.position.y = left.position.y = houseY + houseHeight / 2;
    roof.position.y = houseY + houseHeight;
    right.position.z = left.position.z = roof.position.z = houseZ;
    name.position.z = front.position.z = houseZ + houseDepth / 2;
    back.position.z = left.position.x = houseX - houseDepth / 2;

    var house = [front, back, right, left, roof, name];
    return (house);
}
//erport createHouse
export { createHouse };