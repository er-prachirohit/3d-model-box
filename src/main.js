import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 , wireframe: true});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', ()=>{
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/innerHeight;
  camera.updateProjectionMatrix(); 
})

// orbit control
const controls = new OrbitControls( camera, renderer.domElement );
//smooothness 
controls.enableDamping = true;  
controls.autoRotate = true;

 
function animate(time) {
  window.requestAnimationFrame(animate);
  // cube.rotation.x = time / 2000;
  // cube.rotation.y = time / 1000;
  
  controls.update();

  //render the scene from the ersective of the camera
  renderer.render(scene, camera);
}
animate();
