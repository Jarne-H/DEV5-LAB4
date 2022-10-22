import * as THREE from 'three';

const maxY = 3.5;
const minY = 2.5;

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

//create full cloud
export default function clouds(radius) {
    //create 6 random clouds between y 2.5 and y 4

  
    const cloud = new THREE.Mesh(geometryCloud, materialCloud);

    //use pytagoras! :O
    var pytagorasA = Math.random() * (maxY - minY) + minY;
    const pytagorasB = radius;

    //calculate c with pytagoras
    var pytagorasC = Math.sqrt( pytagorasB * 2 - pytagorasA * 2);

    var cloudPositionY = pytagorasA;
    var cloudPositionX = (Math.random() - 0.5) * (pytagorasC - 0.05);
    var cloudPositionZ = (Math.random() - 0.5) * (pytagorasC - 0.05);
    
    console.log("pytagoras")
    console.log(cloudPositionX, cloudPositionY, cloudPositionZ);
    return (createCloud(cloudPositionX, cloudPositionY, cloudPositionZ));

}

