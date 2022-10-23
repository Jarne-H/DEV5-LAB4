//import three
import * as THREE from 'three';

//create function to create house
function createHouse(houseX, houseY, houseZ, houseWidth, houseHeight, houseDepth) {
    const house_x = new THREE.PlaneGeometry(houseWidth, houseHeight, 1);
    const house_y = new THREE.PlaneGeometry(houseDepth, houseHeight, 1);
    const house_z = new THREE.PlaneGeometry(houseWidth, houseDepth, 1);
        
    //make double sided
    //use ./src/images/Wood_Wall_003_basecolor.jpg for texture
    const texture = new THREE.TextureLoader().load('./src/images/Wood_Wall_003_basecolor.jpg');
    const materials = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide, map: texture});

      
    const front = new THREE.Mesh(house_x, materials, texture);
    const back = new THREE.Mesh(house_x, materials, texture);
    const top = new THREE.Mesh(house_z, materials, texture);
    const bot = new THREE.Mesh(house_z, materials, texture);
    const right = new THREE.Mesh(house_y, materials, texture);
    const left = new THREE.Mesh(house_y, materials, texture);
      
      
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

    //use rotated cube for roof

    //use ./src/images/Wood_Wall_003_basecolor.jpg for texture
    const roofTexture = new THREE.TextureLoader().load('./src/images/Stylized_Bricks_002_basecolor.jpg');
    const roofMaterials = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide, map: roofTexture });
    const size = Math.sqrt(houseDepth * houseDepth + houseDepth * houseDepth)/2;
    const roof = new THREE.Mesh(new THREE.BoxGeometry(houseWidth-0.001, size, size), roofMaterials);
    roof.position.x = houseX;
    roof.position.y = houseY + houseHeight;
    roof.position.z = houseZ;
    //rotate 45 degrees
    roof.rotation.x = Math.PI / 4;

    //add cube in front of house
    //use ./src/images/jarne.jpg for texture
    const jarneTexture = new THREE.TextureLoader().load('./src/images/jarne.jpg');
    const frontMaterials = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide, map: jarneTexture });
    const name = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.1), frontMaterials);
    name.position.x = houseX;
    name.position.y = houseY + houseHeight / 2;
    name.position.z = houseZ + houseDepth / 2;

      
    var house = [front, back, top, bot, right, left, roof, name];
    return (house);
}
//erport createHouse
export { createHouse };