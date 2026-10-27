import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { directPointLight } from 'three/tsl';
import GUI from 'lil-gui';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let loader = new THREE.TextureLoader();
let color = loader.load("./texture/color.jpg");
let roughness = loader.load("./texture/roughness.jpg");
let normal = loader.load("./texture/normal.png");
let height = loader.load("./texture/height.png");

const geometry = new THREE.BoxGeometry(3, 1.8, 2, 3, 3);
const material = new THREE.MeshStandardMaterial({map: color, roughnessMap: roughness, normalMap:normal});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const canvas = document.querySelector('canvas');

const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

// High intensity directional light
const highintensityLight = new THREE.DirectionalLight(0xffffff, 2);
highintensityLight.position.set(10, 20, 15);
scene.add(highintensityLight);

// Helper for high intensity directional light
const highIntensityHelper = new THREE.DirectionalLightHelper(
  highintensityLight,
  2
);
scene.add(highIntensityHelper);


// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// Helper for directional light
const directionalHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  2
);
scene.add(directionalHelper);


// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);


// Point light
const pointLight = new THREE.PointLight(0xffffff, 1, 10, 2);
pointLight.position.set(2, -1, 2);
scene.add(pointLight);

// Helper for point light
const pointHelper = new THREE.PointLightHelper(
  pointLight,
  5
);
scene.add(pointHelper);

// Resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.autoRotate = true

// GUI Setup
const gui = new GUI(); 

// Material controls
const materialFolder = gui.addFolder('Material');
materialFolder.add(material, 'wireframe');
materialFolder.add(material, 'roughness', 0, 1, 0.01);
materialFolder.add(material, 'metalness', 0, 1, 0.01);

// Mesh controls
const meshFolder = gui.addFolder('Mesh');
meshFolder.add(cube, 'visible');
meshFolder.add(cube.position, 'x', -10, 10, 0.1).name('Position X');
meshFolder.add(cube.position, 'y', -10, 10, 0.1).name('Position Y');
meshFolder.add(cube.position, 'z', -10, 10, 0.1).name('Position Z');
meshFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X');
meshFolder.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y');
meshFolder.add(cube.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');
meshFolder.add(cube.scale, 'x', 0.1, 5, 0.1).name('Scale X');
meshFolder.add(cube.scale, 'y', 0.1, 5, 0.1).name('Scale Y');
meshFolder.add(cube.scale, 'z', 0.1, 5, 0.1).name('Scale Z');

// Settings (Lights & Controls)
const settingsFolder = gui.addFolder('Settings');
settingsFolder.add(highintensityLight, 'intensity', 0, 10, 0.1).name('High Light');
settingsFolder.add(directionalLight, 'intensity', 0, 5, 0.1).name('Directional Light');
settingsFolder.add(ambientLight, 'intensity', 0, 2, 0.1).name('Ambient Light');
settingsFolder.add(pointLight, 'intensity', 0, 200, 1).name('Point Light');
settingsFolder.add(controls, 'autoRotate').name('Auto Rotate');

// Animation
function animate(time) {
  window.requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

animate();