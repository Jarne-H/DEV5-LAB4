import * as THREE from 'three';


//create ball
const geometryCloud = new THREE.SphereGeometry(0.1, 10, 10);
const materialCloud = new THREE.MeshStandardMaterial({ color: 0xffffff });

//function createcloud
function createCloud(cloudX, cloudY, cloudZ) {
  const cloudFull = new THREE.Group();
  //create new cloud
  const geometryCloud = new THREE.SphereGeometry(0.1, 10, 10);
  const materialCloud = new THREE.MeshStandardMaterial({ color: 0xffffff });
  
  const cloudPart1 = new THREE.Mesh(geometryCloud, materialCloud);
  cloudPart1.position.x = cloudX;
  cloudPart1.position.y = cloudY;
  cloudPart1.position.z = cloudZ;
  cloudFull.add(cloudPart1);
  
  const cloudPart2 = new THREE.Mesh(geometryCloud, materialCloud);
  cloudPart2.position.x = cloudX + 0.1;
  cloudPart2.position.y = cloudY;
  cloudPart2.position.z = cloudZ;
  cloudFull.add(cloudPart2);
  
  const cloudPart3 = new THREE.Mesh(geometryCloud, materialCloud);
  cloudPart3.position.x = cloudX - 0.1;
  cloudPart3.position.y = cloudY;
  cloudPart3.position.z = cloudZ;
  cloudFull.add(cloudPart3);
  
  const cloudPart4 = new THREE.Mesh(geometryCloud, materialCloud);
  cloudPart4.position.x = cloudX + 0.05;
  cloudPart4.position.y = cloudY + 0.05;
  cloudPart4.position.z = cloudZ;
  cloudFull.add(cloudPart4);
  
  const cloudPart5 = new THREE.Mesh(geometryCloud, materialCloud);
  cloudPart5.position.x = cloudX - 0.05;
  cloudPart5.position.y = cloudY + 0.05;
  cloudPart5.position.z = cloudZ;
  cloudFull.add(cloudPart5);

  return(cloudFull);
}

function pytagoras(a, b, c) {
  if(c === "unknown"){
    return Math.sqrt(a * a + b * b);
  } else if (a === "unknown") {
    return Math.sqrt(c * c - b * b);
  } else if (b === "unknown") {
    return Math.sqrt(c * c - a * a);
  }
}

//create full cloud
export default function clouds(radius) {
const maxY = radius/10 * 3.5;
const minY = radius/10 * 2.5;
  //create 6 random clouds between y 2.5 and y 3.5

  const cloud = new THREE.Mesh(geometryCloud, materialCloud);

  //use pytagoras! :O
  
  var cloudPositionY = Math.random() * (maxY - minY) + minY;
  
  var pytagorasX = pytagoras("unknown", cloudPositionY, radius);
  var cloudPositionX = Math.random() * (pytagorasX - (-pytagorasX)) + (-pytagorasX);
  var pytagorasZ = pytagoras("unknown", cloudPositionX, radius);
  var cloudPositionZ = Math.random() * (pytagorasZ - (-pytagorasZ)) + (-pytagorasZ);

  console.log("pytagoras");
  return (createCloud(cloudPositionX/Math.PI, cloudPositionY, cloudPositionZ/Math.PI));

}