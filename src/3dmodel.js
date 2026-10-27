import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(2, -2, 3);

const canvas = document.querySelector('canvas.draw');
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Essential for realistic HDRI lighting
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

// OrbitControls (must be initialized AFTER renderer)
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true; // Adds smooth rotation



// HDRI Environment Setup
const rgbeLoader = new RGBELoader();
// Using a sample HDRI from three.js repo for demonstration
rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/mirrored_hall_1k.hdr', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture; // Applies lighting to the material
    scene.background = texture;  // Sets the background
});


// add glb 
const loader = new GLTFLoader();
const gltf = await loader.loadAsync('./pixellabs-treasure-chest-4062.glb');
gltf.scene.position.y = -1.3;
scene.add(gltf.scene);


// Window Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    renderer.setAnimationLoop( animate );
    
    // Required if controls.enableDamping or controls.autoRotate are set
    controls.update(); 
    
    renderer.render( scene, camera );
}

animate();