import * as THREE from 'three'

function houseLight() {
    //add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.x = 1;
    directionalLight.position.z = 1;
    return (directionalLight);
}

function directionalLight() {
        
    //*********************LIGHTS*********************//

    //add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.x = 1;
    directionalLight.position.z = 1;
    return (directionalLight);
}

export { houseLight, directionalLight };